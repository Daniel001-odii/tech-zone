<template>
<Modal :name="'Create an Account'" :modal_active="signup_modal">
    <template #body>
        <p class="text-3xl">user account not found, please <RouterLink to="register/decide" class="underline text-blue-500">signup</RouterLink> as either a freelancer or employer</p>
    </template>
    <template #footer>
        <button @click="signup_modal = !signup_modal" class="bg-red-500 text-white py-3 px-6 rounded-md text-lg font-bold">Close</button>
    </template>
</Modal>

<!-- TOAST HERE -->
<Toast/>
<!-- ********* -->

   <FullPageLoading v-if="loading"/>
<div class=" min-h-screen bg-[#E7F1FF] flex flex-col">
    
   <div class=" my-auto mx-0 flex flex-col justify-center items-center">
        <div class=" mt-3 w-[90%] md:w-[70%] rounded-xl flex flex-row py-3 px-3 bg-white max-w-4xl">
            
        </div>
    </div>

     <!-- MINI FOOTER STARTS HERE -->
        <MiniFooter class="self-end justify-self-end"/>
    <!-- MINI FOOTER ENDS HERE -->
</div>
</template>
<script>
import Alert from '@/components/Alert.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';
import LoaderButton from '@/components/LoaderButton.vue';
import Modal from '@/components/Modal.vue';
import SiteLogo from '@/components/SiteLogo.vue';
import axios from 'axios';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
// import {  } from 'vue3-google-login';

import MiniFooter from '@/components/MiniFooter.vue';
import Toast from 'primevue/toast';


export default {
    name: "LoginView",
    components: { 
        FullPageLoading, 
        Alert, 
        LoaderButton, 
        Modal, 
        SiteLogo, 
        MiniFooter,
        Toast, 
    },
    data() {
        return {
            error: '',
            loading: false,

            form_data: {
                email: '',
                password: ''
            },
            callback: this.googleAuth,
            signup_modal: false,
        };
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                const response = await axios.post(`${this.api_url}/login`, this.form_data);
                // console.log(response);
               
                // alert('login successful!');
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login Successful', life: 3000 });

                setTimeout(function(){
                if(response.data.user.role == "user"){
                    localStorage.setItem('life-gaurd', response.data.accessToken);
                    window.location.reload();
                    this.$router.push('/in/jobs');

                    if(!response.data.user.profile.title){
                        alert("please update your profile");
                    }
                   
                }else if(response.data.user.role == "employer"){
                    localStorage.setItem('life-gaurd', response.data.accessToken);
                    window.location.reload();
                    this.$router.push('/client/dashboard');
                }}, 2000);
                
                this.loading = false;

            }
            catch (error) {
                console.log("Login error: ", error.response);
                this.error = error.response.data.message;
                
                if(error.response.status == 500){
                    this.error = "invalid email or password"
                    this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Login Failed', life: 3000 });
                }
                this.loading = false;
            }
        },

        async googleLogin(){
            this.loading = true;
            try{
                const response = await googleAuthCodeLogin();
                console.log("response from google: ", response);
                const auth_code = { code: response.code }
                const newResponse = await axios.post(`${this.api_url}/google-auth`, auth_code );
                console.log("response from backend: ", newResponse.data);
                this.loading = false;
                localStorage.setItem("life-gaurd", newResponse.data.token);
                // alert('login successful!');

                // if user hasnt updated profle yet redirect to profile completion page..
                if(!newResponse.data.user.profile.title){
                        alert("please update your profile");
                        this.$router.push("/profile/complete");
                        window.location.reload();
                }  

                // else continue with normal login...
                else if(newResponse.data.role == "user"){
                    console.log("login respo: ", newResponse);
                    this.$router.push("/in/jobs");
                    window.location.reload();
                }
                
                if(newResponse.data.role == "employer"){
                    this.$router.push("/client/dashboard");
                    window.location.reload();
                }
                
            }catch(error){
                // alert(error);
                this.loading = false;
                if(error.response.status == 404){
                    this.signup_modal = true;
                }
            }
        },
    },
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }

    input[type = "text"]{
        background: transparent !important;
    }

    .form_input_new{
        @apply rounded-xl border border-[#666666] bg-transparent p-3
    }
</style>