# Tienda Online Retail — preparación — 2026-09-23

## Respaldo
Rama:
`backup/pre-retail-infra-2026-09-23`

Base exacta:
`b2640aab4123847669d67c323f57418f91238152`

## Estado actual
El menú cliente de restaurante no fue mezclado todavía con el flujo de supermercado.

Esto es intencional: la primera etapa creó correctamente la fuente de datos retail en backend y el POS/inventario en el panel del negocio antes de construir la tienda pública.

## Fuente de datos preparada
La futura tienda retail podrá consumir:
- `retail_products`
- precio;
- categoría;
- marca;
- imagen;
- stock;
- disponibilidad;
- código de barra interno.

Las ventas físicas ya se registran en:
- `retail_sales`
- `retail_sale_items`

## Próxima implementación en este repositorio
Cuando se active la segunda etapa, el cliente deberá detectar `business_type`:

### Restaurante
Mantener exactamente el flujo actual:
menú → carrito → pedido → pago/delivery.

### Supermercado / Minimarket
Mostrar una tienda retail:
- búsqueda;
- categorías;
- marcas;
- productos;
- precio;
- stock;
- carrito;
- cantidad;
- retiro/delivery;
- pago;
- historial del cliente.

## Regla importante
La venta online retail deberá usar una función transaccional de backend para reservar/descontar stock. No se debe confiar en el stock calculado solo desde JavaScript.

## Funciones futuras
- búsqueda rápida;
- favoritos;
- productos destacados;
- ofertas;
- reemplazo de producto agotado;
- peso/cantidad fraccionada;
- delivery por zona;
- retiro en tienda;
- pago online;
- pedido preparado/listo/entregado;
- catálogo compartido de códigos de barra.

## No eliminado
No se cambió la PWA actual del menú cliente ni el flujo de restaurante.
