import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App);


// GOOGLE LOGIN FOR GOOGLE AUTH...
import vue3GoogleLogin from 'vue3-google-login';

// CLICK OUTSIDE FOR MENUS AND DROPDOWNS...
import clickOutside from './utils/clickOutside'

// LOTTIE ANIMATIONS FOR SVGS
import Vue3Lottie from "vue3-lottie";


// CROPPER FOR PROFILE IMAGES....
import 'vue-advanced-cropper/dist/style.css';
// import 'vue-advanced-cropper/dist/theme.classic.css';



// CONFIGURE AXIOS
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL




// SOCKET IO FOR REAL TIME COMMS
// import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'
const socket = io(process.env.VUE_APP_ROOT_API_URL, {
  withCredentials: true,
  autoConnect: true,
});
// app.config.globalProperties.socket = socket;

/*
app.use(new VueSocketIO({
    connection: process.env.VUE_APP_ROOT_API_URL
  }));
*/

// PRIME VUE THE ULTIMATE COMPONENT STUFF
import 'primevue/resources/themes/aura-light-green/theme.css'



import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'


// toast notification plugin...
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here...
};

// IMPORT PRIMEVUE ACCORDION
// app.use(PrimeVue, {
//   unstyled: true
// });


import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'



// GOOGLE LOGIN.....
app.use(vue3GoogleLogin, {
    clientId: '1037365822432-afrdrmnt083r2p096veokhoj2omcd4ql.apps.googleusercontent.com'
})

app.use(Vue3Lottie);

app.use(VueFileAgentNext);


// Declare a global variable
app.config.globalProperties.api_url = process.env.VUE_APP_API_URL;
app.config.globalProperties.msg_api_url = process.env.VUE_APP_MSG_API_URL;

app.mixin({
    data() {
      return {
        title: 'Apexteks',
      };
    },
    mounted(){
      var title = this.$route.name
      document.title = title
    },
});

app.use(store).use(router).mount('#app');


app.use(PrimeVue);
app.use(ToastService);

app.use(Toast, options)

app.directive('click-outside', clickOutside);