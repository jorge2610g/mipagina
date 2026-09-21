# Documentación técnica · YummyPro Cliente / Menú

> Guía de la aplicación que ve el cliente final. Actualizar este documento cuando cambie el flujo de compra, pago o seguimiento.

## Archivo principal
`index.html` contiene la interfaz pública, estilos y JavaScript del menú/compra.

## Carga del restaurante y menú
`loadMenuFromCloud()` obtiene restaurante, categorías, productos y configuración desde Supabase.
La interfaz debe trabajar siempre con el restaurante indicado por la URL/slug y nunca mezclar datos entre locales.

## Tema y presentación
`applyMenuThemePalette()` aplica colores configurados por el restaurante.
`toggleMenuTheme()` cambia modo visual.
`colorContrast()`, `contrastRatio()` y funciones relacionadas ayudan a mantener texto legible con colores personalizados.

## Carrito
`saveCart()` y `restoreCart()` conservan el carrito.
`addLine()`, `renderCart()` y `update()` administran productos y cantidades.
`totals()` calcula totales.
`openDetail()`, `detailHTML()`, `refreshDetail()` manejan producto, variantes/extras y detalle.
No confiar únicamente en totales calculados en navegador para operaciones sensibles: el backend debe validar importes cuando corresponda.

## Delivery y ubicación
`toggleDelivery()` cambia modalidad.
`initRestaurantAddressAutocomplete()` configura búsqueda de dirección.
`openDeliveryMapPicker()` abre selector de mapa.
`setDeliveryMapPoint()` guarda punto seleccionado.
`haversineKm()` calcula distancia aproximada y `applyDeliveryFee()` aplica costo según configuración.
Mantener retiro y delivery como flujos separados.

## Cuenta del cliente
`syncCustomerUI()` sincroniza sesión/interfaz.
`setAccountTab()` cambia vistas de cuenta.
`loadCustomerOrders()` carga historial.
`openOrderDetail()` abre el detalle.
`startOrderRealtime()` escucha cambios de estado.
`statusLabel()` transforma estados internos a texto para el cliente.

## Notificaciones
`enableOrderNotifications()`, `registerCustomerPush()` y `notifyCustomerOrder()` administran avisos de cambios del pedido.

## Pagos
`renderPaymentButtons()` muestra únicamente métodos disponibles.
`syncPaymentMethodUI()` actualiza la interfaz según método.
`saveOrderToCloud()` crea/guarda el pedido.
`verifyMercadoPagoReturn()` procesa el retorno de Mercado Pago.
Los pagos QR configurados para comprobante/WhatsApp deben respetar ese flujo y no fingir aprobación automática.
Mercado Pago solo debe mostrarse cuando el restaurante y país tienen configuración válida.

## WhatsApp
`buildMessage()` construye el detalle del pedido y `refreshLink()` actualiza el enlace de WhatsApp. Revisar siempre nombre, cantidades, total, modalidad, dirección/retiro y método de pago antes de cambiar este formato.

## Estados
Mantener separados:
- estado operativo del pedido;
- estado del pago;
- verificación de comprobante/reembolso.
La interfaz de “Mis pedidos” debe reflejar el backend y no inventar estados localmente.

## Seguridad y edición
1. Crear respaldo del último commit estable.
2. Incrementar versión visible para cambios de código.
3. No incluir service-role, secretos de Mercado Pago ni tokens privados.
4. Escapar contenido dinámico antes de insertarlo en HTML.
5. Probar con sesión y sin sesión.
6. Probar retiro, delivery, WhatsApp, QR y Mercado Pago por separado.
7. Probar retorno desde la app móvil de Mercado Pago.
8. Verificar carrito después de pago aprobado para evitar duplicados.

## Orden recomendado al depurar una compra
Restaurante cargado → producto/opciones → carrito → modalidad → dirección/costo delivery → sesión → método de pago → creación del pedido → proveedor de pago → retorno/webhook → historial/realtime.
