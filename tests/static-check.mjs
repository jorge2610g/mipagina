import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');for(const marker of ['loadMenuFromCloud','restaurant_products','create-restaurant-payment','delivery_zones'])if(!html.includes(marker))throw new Error(`Falta módulo crítico: ${marker}`);if(!/<\/html>/i.test(html))throw new Error('HTML incompleto');console.log('Menú cliente validado');
