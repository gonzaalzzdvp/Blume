export function buildWhatsappMessage(order, cartItems, choices) {
  const lines = [];

  const getLabel = (options, value) => {
    return options.find((option) => option.value === value)?.label || value;
  };

  const paymentLabel = getLabel(choices.payment_methods, order.payment_method);

  const shippingLabel = getLabel(
    choices.shipping_methods,
    order.shipping_method,
  );

  const deliveryZoneLabel = getLabel(
    choices.delivery_zones,
    order.delivery_zone,
  );

  const agencyLabel = getLabel(choices.agencies, order.agency_name);

  lines.push("*NUEVO PEDIDO BLUME*");
  lines.push("");

  lines.push(`Pedido: ${order.order_number}`);

  lines.push(`Cliente: ${order.customer_name}`);

  lines.push(`Teléfono: ${order.customer_phone}`);

  lines.push(`Cédula: ${order.customer_document}`);

  lines.push("");

  lines.push("*PRODUCTOS*");

  cartItems.forEach((item) => {
    lines.push(`• ${item.title}`);

    lines.push(`  Cantidad: ${item.quantity}`);

    lines.push(`  Precio: $${item.price}`);

    lines.push(`  Subtotal: $${(item.price * item.quantity).toFixed(2)}`);

    lines.push("");
  });

  lines.push(`Total: $${order.total}`);

  lines.push("");

  lines.push(`Pago: ${paymentLabel}`);

  lines.push(`Envío: ${shippingLabel}`);

  if (order.shipping_method === "delivery") {
    lines.push(`Estación: ${deliveryZoneLabel}`);
  }

  if (order.shipping_method === "agency") {
    lines.push(`Agencia: ${agencyLabel}`);

    lines.push(`Sucursal: ${order.agency_address}`);
  }

  return encodeURIComponent(lines.join("\n"));
}
