# Changelog YummyPro — Cliente

## 2026-09-25/26 — 1.6.56 — Pruebas

- Se corrigió la detección del restaurante al abrir directamente la raíz de GitHub Pages de Pruebas.
- El nombre del repositorio `yummy-cliente-pruebas` ya no se interpreta erróneamente como slug de restaurante.
- El enlace genérico de Cliente Pruebas vuelve a cargar el primer negocio activo si no se pasa `?r=`.
- Los enlaces específicos con `?r=slug` continúan abriendo exactamente el negocio solicitado.
- Producción no fue modificada.

## 2026-09-25/26 — 1.6.55 — Pruebas

- Se corrigieron las tarjetas de **Más vendidos** en móvil: imagen más contenida, altura automática y títulos sin recorte.
- Se compactaron las ilustraciones de las tarjetas de productos para evitar que se vean demasiado anchas.
- El menú respeta la configuración del restaurante: solo Retiro, solo Delivery o ambos.
- Si Delivery está apagado se ocultan su selector, dirección y costo de envío; si Retiro está apagado se oculta esa opción.
- El checkout valida nuevamente que el tipo de pedido siga habilitado antes de enviar o cobrar.
- Este cambio permanece en Pruebas hasta un release explícito.

## 2026-09-25/26 — 1.6.54 — Pruebas

- Se formalizó el flujo **Pruebas → Release → Producción**.
- Se prohibieron cambios directos en `main` durante el desarrollo normal.
- Se documentó separación de Supabase entre Pruebas y Producción.
- Se añadió selección segura del backend por hostname: Producción usa `gulctljitzlwokqydigx`; Pruebas usa `wodqqheeesrelsbacmgx`.
- Se reforzó el control de versión y la obligación de documentar cambios.
- Este cambio permanece en `staging` hasta que el propietario autorice el próximo release.

### Nota operativa
El primer release permitió validar el mecanismo de promoción. La revisión posterior detectó que el código promovido conservaba el endpoint de Supabase Staging. La corrección de enrutamiento por ambiente se hizo únicamente en Pruebas y deberá llegar a Producción mediante un release explícito.
