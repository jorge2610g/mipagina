import {readFileSync} from 'node:fs';

const html=readFileSync('index.html','utf8');
for(const marker of ['currencyDigits','minimumFractionDigits:shown','maximumFractionDigits:shown','default-dark-menu-v167','pill.closed','savedTheme==="light"?"light":"dark"','loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones','product_id:String(v.it.id','restaurant_product_option_groups','restaurant_product_options','mapCloudProduct'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);
if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');
console.log('Menú cliente validado');

for(const marker of ['pwa-install-btn','installCustomerPwa','yummypro_last_restaurant','/manifest.webmanifest?v=1621','/pwa-sw.js','yummypro_client_pwa_identity_v1621','customer-pwa-v1621','Versión v1.6.21'])if(!html.includes(marker))throw new Error('Falta PWA cliente actual: '+marker);

const pwaManifest=readFileSync('manifest.webmanifest','utf8');
for(const marker of ['"id": "/"','"start_url": "/?source=pwa"','"scope": "/"','"display": "standalone"','"/icon-192.png"','"/icon-512.png"','"purpose": "maskable"'])if(!pwaManifest.includes(marker))throw new Error('Manifest PWA cliente v1.6.21 incompleto: '+marker);

const pwaSw=readFileSync('pwa-sw.js','utf8');
for(const marker of ['yummypro-client-v1621-installfix','SKIP_WAITING','/offline.html','/icon-192.png','/icon-512.png'])if(!pwaSw.includes(marker))throw new Error('Service Worker PWA cliente v1.6.21 incompleto: '+marker);

if(!html.includes('["pwa","client-pwa-v2","client-pwa-v3"]'))throw new Error('El inicio PWA no conserva el último restaurante');
