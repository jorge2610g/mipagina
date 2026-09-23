import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');for(const marker of ['currencyDigits','minimumFractionDigits:shown','maximumFractionDigits:shown','default-dark-menu-v167','pill.closed','savedTheme===\"light\"?\"light\":\"dark\"','loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones','product_id:String(v.it.id','restaurant_product_option_groups','restaurant_product_options','mapCloudProduct'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');console.log('Menú cliente validado');

for(const marker of ['pwa-install-btn','installCustomerPwa','yummypro_last_restaurant','/yummypro-client-v1619.webmanifest?v=1619','/yummypro-client-v1619-sw.js','yummypro_client_pwa_identity_v1619','Versión v1.6.19'])if(!html.includes(marker))throw new Error('Falta PWA cliente actual: '+marker);

for(const marker of ['/yummypro-client-v1619.webmanifest?v=1619','/yummypro-client-v1619-sw.js','yummypro_client_pwa_identity_v1619','Versión v1.6.19'])if(!html.includes(marker))throw new Error('Falta identidad PWA cliente v1.6.18: '+marker);

const clientManifest=readFileSync('yummypro-client-v1619.webmanifest','utf8');for(const marker of ['"id": "/"','"start_url": "/"','"scope": "/"','"display": "standalone"'])if(!clientManifest.includes(marker))throw new Error('Manifest cliente no alineado a WebAPK: '+marker);
