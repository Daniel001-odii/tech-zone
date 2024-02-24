import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/css/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(store).use(router).mount('#app');

// Declare a global variable
app.config.globalProperties.api_url = 'http://127.0.0.1:8000/api';
