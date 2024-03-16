import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/css/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import vue3GoogleLogin from 'vue3-google-login';

import clickOutside from './utils/clickOutside'

import Vue from 'vue';
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
})



const app = createApp(App);




app.use(vue3GoogleLogin, {
    clientId: '546104205241-g4vtopr689l3vb5cfjmphard09e1ia2k.apps.googleusercontent.com'
})

// Declare a global variable
app.config.globalProperties.api_url = process.env.VUE_APP_API_URL;

app.use(store).use(router).mount('#app');

app.directive('click-outside', clickOutside)