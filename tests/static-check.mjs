import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');for(const marker of ['currencyDigits','minimumFractionDigits:shown','maximumFractionDigits:shown','default-dark-menu-v167','pill.closed','savedTheme===\"light\"?\"light\":\"dark\"','loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones','product_id:String(v.it.id','restaurant_product_option_groups','restaurant_product_options','mapCloudProduct'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');console.log('Menú cliente validado');

for(const marker of ['pwa-install-btn','installCustomerPwa','yummypro_last_restaurant','/manifest.webmanifest?v=1620','/pwa-sw.js','yummypro_client_pwa_identity_v1620','Versión v1.6.20'])if(!html.includes(marker))throw new Error('Falta PWA cliente actual: '+marker);

for(const marker of ['/manifest.webmanifest?v=1620','/pwa-sw.js','yummypro_client_pwa_identity_v1620','Versión v1.6.20'])if(!html.includes(marker))throw new Error('Falta identidad PWA cliente v1.6.18: '+marker);

const clientManifest=readFileSync('yummypro-client-v1619.webmanifest','utf8');for(const marker of ['"id": "/"','"start_url": "/"','"scope": "/"','"display": "standalone"'])if(!clientManifest.includes(marker))throw new Error('Manifest cliente no alineado a WebAPK: '+marker);

const pwaManifest=readFileSync('manifest.webmanifest','utf8');for(const marker of ['"id": "/yummypro-client-v1620"','"start_url": "/?source=client-pwa-v1620"','"scope": "/"','"display": "standalone"','"prefer_related_applications": false','"/pwa-icon.svg"'])if(!pwaManifest.includes(marker))throw new Error('Manifest PWA cliente v1.6.20 incompleto: '+marker);
if(!html.includes('/manifest.webmanifest?v=1620')||!html.includes('/pwa-sw.js')||!html.includes('yummypro_client_pwa_identity_v1620'))throw new Error('Identidad PWA cliente v1.6.20 incompleta');
