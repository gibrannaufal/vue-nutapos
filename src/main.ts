import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/textfield/filled-text-field.js';

import '@material/web/icon/icon.js';

import '@material/web/button/filled-tonal-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';

import '@material/web/checkbox/checkbox.js';
import '@material/web/switch/switch.js';

import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

import '@material/web/radio/radio.js';


import '@material/web/dialog/dialog.js'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Buat instance Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount('#app')