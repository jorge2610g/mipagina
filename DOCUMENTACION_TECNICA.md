# Guía técnica · YummyPro Cliente / Menú

> Documento para mantenimiento humano. Actualizado: 21-09-2026.

## Propósito
Aplicación web que ve el cliente final: menú del restaurante, productos, carrito, autenticación, retiro/delivery, pago y seguimiento de pedidos.

## Flujo mental
1. Identificar restaurante por URL/slug.
2. Cargar configuración, categorías y productos.
3. Mostrar variantes/extras disponibles.
4. Construir carrito.
5. Solicitar modalidad de entrega/retiro y datos necesarios.
6. Si el método exige sesión/pago online, validar autenticación.
7. Crear pedido.
8. Redirigir/procesar pago.
9. Confirmar estado real del pago antes de tratar el pedido como aprobado.
10. Mostrar historial/seguimiento del cliente.

## Menú
El catálogo debe depender siempre del restaurante activo. Nunca mezclar productos, categorías, QR o pedidos entre restaurantes.

## Carrito
Al modificar productos, variantes o extras, recalcular el total desde el estado real del carrito. No confiar en un total enviado por el navegador para operaciones sensibles del backend.

## Autenticación
La cuenta creada aquí corresponde al rol cliente. No permitir que una cuenta administrativa/restaurante obtenga acceso de cliente únicamente porque comparte un registro genérico de usuario.

## Mercado Pago
Reglas críticas:
- El cobro de un pedido usa las credenciales del restaurante correspondiente.
- Si el restaurante no tiene una configuración válida, ocultar Mercado Pago.
- Volver desde la app de Mercado Pago no equivale por sí solo a pago aprobado.
- Limpiar carrito solo cuando el backend confirme el pago.
- “Mis pedidos” debe reflejar pedidos que correspondan al cliente autenticado y su estado real.

## Delivery y ubicación
La ubicación elegida por el cliente alimenta dirección/coordenadas y, cuando corresponda, zona/tarifa de delivery. No asumir una tarifa del frontend si el backend dispone de reglas por zona.

## Tiempo real
Los cambios de estado del pedido deben reflejar el estado persistido: recibido/aceptado, preparación, listo, en camino, entregado o cancelado según el flujo configurado.

## Multi-país
Moneda y métodos de pago dependen del restaurante/país. No fijar CLP, Bs o Mercado Pago globalmente si la configuración del restaurante indica otra cosa.

## Seguridad
No incluir service-role ni secretos de proveedores en el cliente. Toda verificación de pagos y acciones privilegiadas debe hacerse en backend.

## Regla de cambios
Antes de modificar producción: backup de `main`, incremento de versión visible, commit separado y verificación posterior del despliegue y del flujo móvil.
