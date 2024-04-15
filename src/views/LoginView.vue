<template>
<Modal :title="'Create an Account'" :modal_active="signup_modal">
    <template #body>
        <p class="text-3xl">user account not found, please <RouterLink to="register/decide" class="underline text-blue-500">signup</RouterLink> as either a freelancer or employer</p>
    </template>
    <template #footer>
        <button @click="signup_modal = !signup_modal" class="bg-red-500 text-white py-3 px-6 rounded-md text-lg font-bold">Close</button>
    </template>
</Modal>


   <FullPageLoading v-if="loading"/>

    <!-- <div class="w-full h-screen flex justify-center items-center dark:text-white dark:bg-[#27323F] "> -->
        <div class=" w-[90%] md:w-[70%] rounded-xl flex flex-row py-8 px-3 dark:bg-[#1f2a36]">
            <div class="flex flex-col w-full md:w-[50%] p-5">
                <img src="../../public/apex-tek-white.svg" class=" h-[50px] self-start">
                <div class="mt-3">
                    <h1 class="text-3xl font-bold">Welcome back</h1>
                    <span>Please enter your login details</span>

                    <form class="flex flex-col gap-4 w-full mt-4" @submit.prevent="login">
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="email">Email Address</label>
                                <input class="form_input" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="password">password</label>
                                <input class="form_input" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                            </div>
                        </div>
                        <div class="flex flex-row gap-5 justify-between flex-wrap">
                            <div class="flex flex-row-reverse gap-1 items-center">
                                <label for="rem-details">Remember me</label>
                                <input name="rem-details" id="rem-details" type="checkbox" />
                            </div>
                            <RouterLink to="/password/forgot">Forgot password ?</RouterLink>
                        </div>
                        <!-- <LoaderButton class="rounded-full"  :buttonText="loading ? 'Loading...' : 'Sign in'" :loading="loading"/> -->
                        <button class="p-3 text-white bg-tz_blue w-full rounded-full">Sign in</button> 
                        <!-- GOOGLE SIGN IN -->
                        <div class="">
                            <!-- <GoogleLogin class="!w-full" :callback="callback" auto-login/> -->
                                <button @click="googleLogin" type="button" class="w-full border rounded-full font-medium text-sm px-5 py-3.5 text-center flex flex-row justify-center items-center gap-5 hover:bg-slate-50 dark:hover:bg-gray-700">
                                    <img src="../assets/images/google.svg" class="h-5"/>
                                    Continue with Google<div></div></button>
                            <!-- </GoogleLogin> -->
                            
                        </div>
                        <div class="text-center">
                            <p>Don't have account yet? <RouterLink to="/register/decide" class=" decoration-tz_blue">Sign up</RouterLink> </p>
                        </div>                      
                    </form>
                </div>
            </div>
            <div class="justify-center items-center w-[50%] bg-tz_light_blue hidden md:flex rounded-lg">
                <img src="../assets/images/dot_logo.svg" class=" h-[200px] w-[200px]">
            </div>
        </div>
    <!-- </div> -->
       

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

export default {
    name: "LoginView",
    components: { FullPageLoading, Alert, LoaderButton, Modal, SiteLogo },
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
                console.log(response);
                localStorage.setItem('life-gaurd', response.data.accessToken);
                alert('login successful!');
                if(response.data.user.role == "user"){
                    window.location.reload();
                    this.$router.push('/in/jobs');

                    if(!response.data.user.profile.title){
                        alert("please update your profile");
                    }
                   
                }else if(response.data.user.role == "employer"){
                    window.location.reload();
                    this.$router.push('/client/dashboard');
                }
                
                this.loading = false;

            }
            catch (error) {
                console.log("Login error: ", error.response)
                this.error = error.response.data.message;
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
</style>