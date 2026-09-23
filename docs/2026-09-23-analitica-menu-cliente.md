# Registro técnico — Analítica y diagnóstico del menú cliente
Fecha: 2026-09-23

## Respaldo
Rama creada antes de esta etapa:
`backup/pre-observability-2026-09-23`

## Versión
Menú cliente: v1.6.22.

La configuración PWA instalable de v1.6.21 se conserva:
- manifest con identidad estable;
- PNG 192x192 y 512x512;
- SVG maskable;
- Service Worker `/pwa-sw.js`.

La v1.6.22 agrega observabilidad sin cambiar el diseño ni el flujo de pedidos.

## Interacciones registradas
El menú cliente registra de manera agregable:
- vista del menú;
- cuenta/login/registro;
- categorías;
- productos;
- carrito;
- checkout;
- delivery/ubicación;
- métodos de pago;
- pedidos y seguimiento.

Esto permite que el admin vea cuáles son las secciones que más usan los clientes.

## Diagnóstico de errores
Se registran:
- fallos al cargar un restaurante;
- excepciones JavaScript;
- promesas rechazadas;
- fallos inesperados de login/registro.

Se separan de los errores de uso:
- contraseña incorrecta;
- cuenta existente;
- usar una cuenta de restaurante/admin en el login de cliente.

Los errores de uso no disparan una alerta técnica.

## Alertas
Cuando se acumulan fallos técnicos repetidos, el frontend solicita al servicio `observability-admin-alert` evaluar el umbral. Si corresponde, el administrador recibe un correo sin necesidad de tener abierto el panel.

La función aplica deduplicación para evitar alertas repetidas.

## Privacidad y seguridad
No se registran contraseñas, tokens, datos completos de pago ni secretos. Los eventos se relacionan con restaurante/usuario cuando existe sesión para poder diagnosticar, pero las tablas no se exponen directamente al navegador.

## Rollback
La rama `backup/pre-observability-2026-09-23` conserva la versión anterior. Revertir el frontend no requiere borrar los datos ya registrados.
