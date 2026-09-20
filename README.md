# YummyPro — Menú del cliente

## Propósito
Frontend público que muestra el menú de cada restaurante y gestiona la experiencia del cliente: categorías, productos, carrito, checkout, pedidos por WhatsApp, pagos online y seguimiento.

## Cambios implementados hasta 20-09-2026
- Menú público multi-restaurante y diseño responsivo para móvil/escritorio.
- Productos y categorías dinámicos desde Supabase.
- Opciones/variantes de producto preservando el ID real del producto.
- Carrito persistente y checkout con validación de nombre/teléfono.
- Modalidades Delivery y Retiro en local.
- Pedidos por WhatsApp y flujo de Mercado Pago.
- Mercado Pago se muestra solo cuando el restaurante tiene conexión válida.
- Verificación pública/segura del estado de Mercado Pago.
- Recuperación del checkout al volver desde la app/web de Mercado Pago y verificación del pago.
- Separación de cuentas por rol: esta web acepta clientes; administradores/restaurantes usan sus paneles correspondientes.
- “Mis pedidos” y seguimiento para pagos online.
- Modo demostración sin ejecutar pedidos/pagos reales y CTA hacia registro de restaurantes.
- Eliminación del panel administrativo heredado de este repositorio.
- Mejoras de responsive, interfaz profesional, monitoreo y pruebas automáticas.

## Reglas de pagos
- Los pagos de pedidos pertenecen al restaurante y usan la configuración Mercado Pago de ese restaurante.
- Las suscripciones del sistema NO se cobran desde este frontend ni con las credenciales del restaurante.
- Los pedidos Mercado Pago operativos deben tratarse como pagados únicamente cuando el pago está aprobado.

## Integración
- Backend/datos: Supabase.
- Panel del restaurante/landing: repositorio `jorge2610g/yummy-restaurante`.
- Administración global: repositorio `jorge2610g/yummy-admin`.

## Historial técnico
Los commits conservan cada corrección/versionado para permitir rollback. Entre los hitos recientes están v1.4.51–v1.4.63, mejoras de monitoreo, responsive, roles y recuperación del checkout de Mercado Pago.

## Importante
No colocar Access Tokens, Service Role Keys ni secretos de Mercado Pago en el frontend o en esta documentación.
