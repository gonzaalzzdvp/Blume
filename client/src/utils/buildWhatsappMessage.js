export function buildWhatsappMessage(
  order,
  cartItems
) {
  const lines = [];

  lines.push("🌸 *NUEVO PEDIDO BLUME*");
  lines.push("");

  lines.push(
    `📦 Pedido: ${order.order_number}`
  );

  lines.push(
    `👤 Cliente: ${order.customer_name}`
  );

  lines.push(
    `📱 Teléfono: ${order.customer_phone}`
  );

  lines.push(
    `🪪 Cédula: ${order.customer_document}`
  );

  lines.push("");

  lines.push("🛍️ *PRODUCTOS*");

  cartItems.forEach((item) => {
    lines.push(
      `• ${item.title}`
    );

    lines.push(
      `  Cantidad: ${item.quantity}`
    );

    lines.push(
      `  Precio: $${item.price}`
    );

    lines.push(
      `  Subtotal: $${(
        item.price *
        item.quantity
      ).toFixed(2)}`
    );

    lines.push("");
  });

  lines.push(
    `💵 Total: $${order.total}`
  );

  lines.push("");

  lines.push(
    `💳 Pago: ${order.payment_method}`
  );

  lines.push(
    `🚚 Envío: ${order.shipping_method}`
  );

  if (order.shipping_method === "delivery") {
    lines.push(
      `📍 Estación: ${order.delivery_zone}`
    );
  }

  if (order.shipping_method === "agency") {
    lines.push(
      `🏢 Agencia: ${order.agency_name}`
    );

    lines.push(
      `📌 Sucursal: ${order.agency_address}`
    );
  }

  return encodeURIComponent(
    lines.join("\n")
  );
}