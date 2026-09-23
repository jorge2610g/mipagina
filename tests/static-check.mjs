import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');for(const marker of ['currencyDigits','minimumFractionDigits:shown','maximumFractionDigits:shown','default-dark-menu-v167','pill.closed','savedTheme===\"light\"?\"light\":\"dark\"','loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones','product_id:String(v.it.id','restaurant_product_option_groups','restaurant_product_options','mapCloudProduct'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');console.log('Menú cliente validado');

for(const marker of ['manifest.webmanifest','pwa-install-btn','installCustomerPwa','yummypro_last_restaurant','Versión v1.6.16'])if(!html.includes(marker))throw new Error('Falta PWA cliente: '+marker);

if(!html.includes('/manifest.webmanifest?v=1615'))throw new Error('Falta manifest versionado PWA cliente');

for(const marker of ['/client.webmanifest?v=1616','/client-pwa-sw.js','Versión v1.6.16'])if(!html.includes(marker))throw new Error('Falta identidad PWA cliente nueva: '+marker);
