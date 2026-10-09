
import html
import logging
import requests

from django.conf import settings

logger = logging.getLogger(__name__)


def send_order_received_email(order):
    api_key = getattr(settings, "BREVO_API_KEY", "")
    sender_email = getattr(settings, "DEFAULT_FROM_EMAIL", "")
    logo_url = getattr(settings, "EMAIL_LOGO_URL", "")

    if not api_key or not sender_email:
        logger.warning(
            "Brevo no está configurado. Pedido: %s",
            order.order_number,
        )
        return False

    # Datos de contacto
    contact_phone = "+58 416-1212869"
    whatsapp_url = "https://wa.me/584161212869"

    # Escapar valores dinámicos para evitar HTML no deseado
    customer_name = html.escape(order.customer_name)
    order_number = html.escape(order.order_number)
    safe_logo_url = html.escape(logo_url, quote=True)

    items_html = ""

    for item in order.items.select_related("product").all():
        title = html.escape(item.product.title)

        items_html += f"""
            <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;">
                    {title} × {item.quantity}
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;text-align:right;white-space:nowrap;">
                    ${item.subtotal:.2f}
                </td>
            </tr>
        """

    # Logo alojado en una URL pública HTTPS
    logo_html = ""

    if safe_logo_url:
        logo_html = f"""
            <img
                src="{safe_logo_url}"
                alt="Blume Care"
                width="180"
                style="display:block;width:180px;max-width:100%;height:auto;margin:0 auto;"
            />
        """
    else:
        logger.warning(
            "EMAIL_LOGO_URL no está configurada. Pedido: %s",
            order.order_number,
        )

    html_content = f"""
    <!DOCTYPE html>
    <html lang="es">
    <body style="margin:0;padding:0;background:#f7f7f2;font-family:Arial,sans-serif;color:#252525;">

        <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;">

            <!-- ENCABEZADO CON LOGO -->
            <div style="background:#a0a004;padding:30px 20px;text-align:center;">
                {logo_html}
            </div>

            <!-- CONTENIDO -->
            <div style="padding:32px 26px;">

                <h2 style="margin-top:0;">¡Hola, {customer_name}!</h2>

                <p style="line-height:1.7;color:#555555;">
                    Hemos recibido tu pedido correctamente.
                    Gracias por elegir Blume Care.
                </p>

                <!-- ESTADO DEL PEDIDO -->
                <div style="background:#f7f7f2;padding:16px;border-radius:10px;margin:24px 0;">
                    <p style="margin:0;color:#666666;font-size:13px;">
                        NÚMERO DE PEDIDO
                    </p>

                    <strong style="font-size:22px;">
                        {order_number}
                    </strong>

                    <p style="margin-bottom:0;color:#a0a004;font-weight:bold;">
                        Pedido recibido
                    </p>
                </div>

                <!-- PRODUCTOS -->
                <h3>Resumen de tu pedido</h3>

                <table style="width:100%;border-collapse:collapse;">
                    {items_html}
                </table>

                <p style="text-align:right;font-size:20px;font-weight:bold;margin-top:20px;">
                    Total: ${order.total:.2f}
                </p>

                <!-- LLAMADO A LA ACCIÓN -->
                <div style="background:#f7f7f2;padding:22px;border-radius:12px;margin-top:28px;">

                    <h3 style="margin-top:0;">
                        ¡Solo falta un paso!
                    </h3>

                    <p style="line-height:1.7;color:#555555;">
                        Para finalizar tu compra, contáctanos por WhatsApp.
                        Nuestro equipo te ayudará a coordinar la confirmación
                        del pago y los detalles de entrega.
                    </p>

                    <div style="text-align:center;margin:24px 0;">
                        <a
                            href="{whatsapp_url}"
                            style="display:inline-block;background:#a0a004;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:10px;font-weight:bold;"
                        >
                            Finalizar compra por WhatsApp
                        </a>
                    </div>

                    <p style="margin-bottom:0;font-weight:bold;color:#a0a004;line-height:1.6;">
                        Tu pedido aún está pendiente de confirmación de pago.
                    </p>

                </div>

                <p style="font-size:13px;color:#888888;margin-top:30px;line-height:1.6;">
                    Este correo confirma la recepción de tu pedido,
                    no la acreditación del pago.
                </p>

            </div>

            <!-- PIE DE PÁGINA Y CONTACTO -->
            <div style="background:#252525;padding:26px 20px;text-align:center;">

                <p style="color:#ffffff;margin:0 0 12px;font-size:15px;font-weight:bold;">
                    ¿Tienes alguna pregunta?
                </p>

                <p style="color:#eeeeee;margin:0 0 8px;font-size:14px;">
                    Contáctanos por WhatsApp:
                </p>

                <p style="margin:0 0 18px;">
                    <a
                        href="{whatsapp_url}"
                        style="color:#d7d783;text-decoration:none;font-size:16px;font-weight:bold;"
                    >
                        {contact_phone}
                    </a>
                </p>

                <div style="border-top:1px solid #555555;padding-top:18px;">
                    <p style="color:#ffffff;margin:0;font-size:13px;">
                        Blume Care · Gracias por tu confianza
                    </p>
                </div>

            </div>

        </div>

    </body>
    </html>
    """

    payload = {
        "sender": {
            "name": "Blume Care",
            "email": sender_email,
        },
        "to": [
            {
                "email": order.customer_email,
                "name": order.customer_name,
            }
        ],
        "subject": f"Pedido recibido | {order.order_number}",
        "htmlContent": html_content,
        "textContent": (
            f"Hola {order.customer_name}, hemos recibido tu pedido "
            f"{order.order_number}. Total: ${order.total:.2f}. "
            "Para finalizar la compra, contáctanos por WhatsApp "
            f"al {contact_phone}: {whatsapp_url}. "
            "Tu pedido está pendiente de confirmación de pago."
        ),
    }

    try:
        response = requests.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={
                "api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            json=payload,
            timeout=10,
        )

        response.raise_for_status()

        logger.info(
            "Correo de pedido enviado a Brevo: %s",
            order.order_number,
        )

        return True

    except requests.RequestException:
        logger.exception(
            "No se pudo enviar el correo del pedido %s",
            order.order_number,
        )
        return False
