# Tienda Online Retail — implementación — 2026-09-23

## Respaldo original preservado

La copia anterior a cualquier trabajo de supermercado/minimarket quedó fijada en:

`backup-original-pre-retail-2026-09-23`

Commit base:
`b2640aab4123847669d67c323f57418f91238152`

También continúan disponibles los respaldos intermedios de la etapa retail.

## Versión cliente

`v1.6.23`

La PWA mantiene la misma identidad instalable. Se renovó únicamente el caché a:
`yummypro-client-v1623-retail-store`

## Detección automática

`menu.yummypro.online` consulta `restaurants.business_type`.

### restaurant
Conserva el flujo existente de menú/restaurante.

### supermarket / minimarket
Carga la tienda online retail sin mezclar productos de restaurante.

## Catálogo público

RPC:
`get_public_retail_catalog`

Devuelve únicamente productos activos del negocio con:
- nombre;
- código de barra;
- SKU;
- categoría;
- marca;
- unidad;
- precio;
- stock;
- stock mínimo;
- imagen;
- soporte para cantidades fraccionadas.

Los productos se agrupan automáticamente por categoría y usan el buscador ya existente.

El stock mostrado procede del backend. El checkout vuelve a validarlo y bloquearlo transaccionalmente para evitar sobreventa.

## Carrito retail

El carrito:
- impide superar el stock disponible;
- admite las cantidades permitidas por el producto;
- conserva retiro o delivery;
- mantiene cálculo de delivery;
- no confía en precios enviados por el navegador.

## Checkout online

RPC:
`retail_create_online_order`

El navegador envía únicamente producto + cantidad. El servidor:
1. valida el negocio;
2. valida la suscripción;
3. bloquea cada producto;
4. comprueba stock;
5. toma el precio almacenado en base de datos;
6. calcula delivery;
7. crea pedido y líneas;
8. reserva/descuenta stock;
9. genera movimientos de inventario;
10. devuelve un token privado de seguimiento.

Estados:
- `pending_payment`
- `received`
- `preparing`
- `ready`
- `delivered`
- `cancelled`

## Pagos

### Efectivo
El pedido se registra inmediatamente. Al marcarlo entregado, el panel exige una caja abierta, registra el movimiento de caja y confirma el pago.

### Métodos manuales
Transferencia u otros métodos configurados por el negocio pueden marcarse como “Pago recibido” desde Pedidos Online.

### Mercado Pago
Edge Functions:
- `create-retail-payment`
- `retail-payment-webhook`
- `refund-retail-payment`

Reglas:
- requiere cuenta de cliente;
- crea preferencia usando las credenciales del negocio;
- reserva stock durante el pago;
- webhook valida el pago con Mercado Pago;
- pago aprobado cambia el pedido a `received`;
- pago rechazado/cancelado libera stock;
- el panel puede devolver el pago antes de la entrega.

### QR Bolivia / VeriPagos
Edge Functions:
- `create-retail-veripagos-payment`
- `verify-retail-veripagos-payment`
- `veripagos-retail-webhook`

El webhook compartido `veripagos-restaurant-webhook` también reconoce `scope=retail_order`.

El stock queda reservado temporalmente mientras se confirma el QR. El proveedor y la verificación manual pueden acreditar el pedido.

## Reservas y liberación de stock

RPC:
- `retail_release_expired_online_orders`
- `retail_cancel_online_order`
- función interna de service role `retail_release_online_order_internal`

Si un pago online vence o se cancela:
- vuelve el stock;
- se registra `online_release`;
- el pedido queda cancelado.

Movimiento al reservar:
`online_order`

## Seguimiento

El navegador guarda únicamente:
- id del pedido;
- token de seguimiento;
- restaurante;
- estado.

RPC:
`retail_get_online_order_status`

Para clientes autenticados:
`retail_get_my_online_orders`

“Mis compras” combina pedidos del dispositivo y pedidos asociados a la cuenta.

El cliente actualiza estados periódicamente y muestra:
- esperando pago;
- recibido;
- preparando;
- listo;
- entregado;
- cancelado.

La cancelación desde cliente solo está permitida en estados tempranos y cuando el pago no fue aprobado.

## Notificaciones

`send-order-push` v11 admite:
- `retail_restaurant`
- `retail_customer`

El negocio puede recibir Web Push por una nueva compra.
El cliente autenticado puede recibir Web Push cuando el negocio cambia el estado, además del seguimiento periódico.

## Demo

Tienda:
`Minimarket Demo YummyPro`

Slug:
`minimarket-demo-yummypro`

La tienda demo está forzada abierta y tiene delivery fijo para facilitar pruebas.

Productos demo:
- 7801234500010 — Agua mineral 500 ml
- 7801234500027 — Bebida cola 1.5 L
- 7801234500034 — Arroz 1 kg

## Prueba realizada

Se creó un pedido online temporal contra el minimarket demo y después se canceló con su tracking token.

Resultado:
- pedido creado correctamente;
- stock disminuyó al reservar;
- cancelación aceptada;
- stock volvió exactamente a su valor original;
- datos temporales de QA fueron eliminados.

## Seguridad

Las tablas de pedidos online tienen RLS.

Acceso anónimo deliberado:
- catálogo público;
- crear compra;
- consultar compra con token;
- cancelar compra con token cuando todavía corresponde.

Acceso anónimo bloqueado:
- cambiar estados como negocio;
- consultar historial de cuenta;
- ejecutar liberación interna de stock.

No se envían precios confiables desde JavaScript: el servidor calcula el total.

## No modificado

El flujo de restaurantes sigue utilizando sus tablas, pedidos, Mercado Pago, QR de mesa, cocina y delivery anteriores. La tienda retail es una rama por `business_type`.

## Rollback

Frontend:
restaurar `backup-original-pre-retail-2026-09-23`.

Base de datos:
los cambios son aditivos. No eliminar tablas con datos reales sin exportarlas primero.
