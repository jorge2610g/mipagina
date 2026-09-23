import {readFileSync} from 'node:fs';

const html=readFileSync('index.html','utf8');
for(const marker of ['currencyDigits','minimumFractionDigits:shown','maximumFractionDigits:shown','default-dark-menu-v167','pill.closed','savedTheme==="light"?"light":"dark"','loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones','product_id:String(v.it.id','restaurant_product_option_groups','restaurant_product_options','mapCloudProduct'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);
if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');
console.log('Menú cliente validado');

for(const marker of ['pwa-install-btn','installCustomerPwa','yummypro_last_restaurant','/manifest.webmanifest?v=1622','/pwa-sw.js','yummypro_client_pwa_identity_v1622','customer-pwa-v1623','Versión v1.6.29'])if(!html.includes(marker))throw new Error('Falta PWA cliente actual: '+marker);

const pwaManifest=readFileSync('manifest.webmanifest','utf8');
for(const marker of ['"id": "/"','"start_url": "/?source=pwa"','"scope": "/"','"display": "standalone"','"/icon-192.png"','"/icon-512.png"','"purpose": "maskable"'])if(!pwaManifest.includes(marker))throw new Error('Manifest PWA cliente v1.6.23 incompleto: '+marker);

const pwaSw=readFileSync('pwa-sw.js','utf8');
for(const marker of ['yummypro-client-v1629-professional-payments','SKIP_WAITING','/offline.html','/icon-192.png','/icon-512.png'])if(!pwaSw.includes(marker))throw new Error('Service Worker PWA cliente v1.6.25 incompleto: '+marker);

if(!html.includes('["pwa","client-pwa-v2","client-pwa-v3"]'))throw new Error('El inicio PWA no conserva el último restaurante');

for(const marker of ['trackClientEvent','trackClientError','log_app_event','log_app_error'])if(!html.includes(marker))throw new Error('Falta observabilidad cliente: '+marker);

for(const marker of ['get_public_retail_catalog','retail_create_online_order','retail_get_online_order_status','retail_get_my_online_orders','create-retail-payment','create-retail-veripagos-payment','verify-retail-veripagos-payment','RETAIL_ORDER_REFS_KEY','retail-cancel-order','window.__businessType'])if(!html.includes(marker))throw new Error('index.html: falta tienda online retail '+marker);

for(const marker of ['professional-booking-app','professional-booking-mode','get_public_professional_catalog','get_professional_public_catalog','get_professional_available_slots','create_public_professional_appointment','renderProfessionalPublicBooking','professional_service_selected','professional_booking_created','create-professional-appointment-payment','yummypro_professional_payment_return','get_public_professional_appointment_status','mercadopago_configured',':root[data-theme="dark"] .professional-booking',':root[data-theme="dark"] .professional-booking-card',':root[data-theme="dark"] .professional-choice','professional-theme','professional-account','professional-reservations','professional-login-form','professional-register-form','syncProfessionalCustomer','loadProfessionalCustomerReservations','startProfessionalReservationsRealtime','customer_reservations_load_failure','professional-payment-methods','professional-mp-pay','select_professional_appointment_payment_method','payment_amount_due','paid_amount'])if(!html.includes(marker))throw new Error('index.html: falta reserva pública profesional '+marker);
if((html.match(/<\/html>/gi)||[]).length!==1||!html.trim().endsWith('</html>'))throw new Error('index.html: HTML duplicado o contenido después de </html>');
