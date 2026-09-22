# Guía del código · YummyPro Cliente

## Propósito
Menú público/cliente: catálogo, carrito, autenticación, retiro/delivery, pago y seguimiento de pedidos.

## Flujo general
1. Se identifica el restaurante solicitado.
2. Se cargan configuración, categorías y productos.
3. El cliente selecciona variantes/extras y agrega al carrito.
4. Define retiro o delivery.
5. Para pagos que requieren cuenta se valida sesión.
6. Se crea/procesa el pedido.
7. El cliente consulta “Mis pedidos” y sus estados.

## Datos que no deben mezclarse
Toda consulta de productos, categorías, pedidos, configuración y pagos debe estar asociada al restaurante actual. Nunca mostrar datos de otro restaurante por reutilizar estado anterior.

## Carrito
El total debe recalcular productos, variantes, extras y delivery. Después de un pago confirmado se limpia el carrito; no limpiarlo solamente por abrir Mercado Pago.

## Autenticación
Registro/login de esta aplicación corresponde a clientes. No convertir automáticamente cuentas de restaurante o administrador en clientes. Si el pago exige sesión, después de autenticar se debe continuar el flujo pendiente sin pedir al usuario empezar de nuevo.

## Mercado Pago
El checkout de pedidos utiliza configuración del restaurante cuando corresponda. Al volver desde la app de Mercado Pago, verificar el estado real del pago; no asumir aprobación por el simple retorno de URL.

## Delivery y ubicación
La dirección/ubicación alimenta cálculo de zona/costo cuando está habilitado. Mantener separadas dirección legible y coordenadas.

## Estados
El cliente puede recibir cambios de pedido en tiempo real: nuevo/aceptado/preparación/listo/en camino/entregado/cancelado según el flujo disponible.

## Seguridad
No incluir claves privadas en frontend. Supabase service-role, access tokens privados y secretos de pasarelas pertenecen al backend.

## Reglas para cambios
1. Crear backup del commit estable.
2. Incrementar versión visible.
3. Commit descriptivo por cambio.
4. Probar móvil y escritorio.
5. Probar restaurante correcto, carrito, login, retiro, delivery, pago, retorno y Mis pedidos.
6. No declarar producción correcta hasta verificar la publicación.

## Diagnóstico
Si “Mis pedidos” pide login después de iniciar sesión, revisar restauración de sesión antes del render. Si Mercado Pago queda en “conectando”, revisar retorno/deep-link y verificación del pago. Si faltan productos, revisar filtro por restaurante/categoría y disponibilidad.

## Tema y colores del restaurante
La personalización del restaurante se aplica únicamente al **modo claro**. En `applyMenuThemePalette()`:
- `theme_primary_color` controla la portada/acento principal.
- `theme_secondary_color` controla el acento secundario.
- `theme_text_color` solo se usa si mantiene contraste suficiente con el color principal; de lo contrario se calcula blanco/negro automáticamente.
- El texto general del sitio se mantiene oscuro sobre fondos claros para evitar combinaciones ilegibles.

El **modo oscuro no hereda los colores del restaurante**: usa fondo negro, superficies oscuras y texto blanco como base fija. Esto evita que una configuración de marca vuelva ilegible el menú al cambiar de tema.

Los botones/píldoras de la portada usan `--hero-bg` y `--hero-ink` para mantener contraste, y los botones secundarios usan `--on-secondary`.

