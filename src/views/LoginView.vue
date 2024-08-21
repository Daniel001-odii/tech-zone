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
    <!-- <div class=" dark:text-white bg-[#E7F1FF] dark:bg-[#121212]"> -->
    <div class=" min-h-screen bg-[#E7F1FF] flex flex-col">
        
       <div class=" my-auto mx-0 flex flex-col justify-center items-center">
            <!-- <div class=" mt-6 w-[90%] md:w-[70%] rounded-xl flex flex-row py-3 px-3 bg-white dark:bg-[#0E0E0E] max-w-4xl"> -->
            <div class=" mt-3 w-[90%] md:w-[70%] rounded-xl flex flex-row py-3 px-3 bg-white max-w-4xl">
                <div class="flex flex-col w-full md:w-[50%] p-5">
                    <RouterLink to="/" class="w-fit">
                        <!-- <img src="../../public/apex-tek-white.svg" class=" h-[50px] self-start hidden dark:inline-block"> -->
                        <img src="../../public/apex-tek.svg" class=" h-[50px] self-start inline-block">
                    </RouterLink>
    
                    <!-- MAIN CONTENT STARTS HERE -->
                    <div class="mt-3">
                        <h1 class="text-3xl font-bold">Create an account</h1>
                        <!-- <span>{{ this.$route.query }}</span> -->
                        <p>Already have an account? <RouterLink to="/login">Login</RouterLink> </p>
    
                        <div class="text-red-500 mt-6 bg-red-500 bg-opacity-10 p-3 rounded-md flex flex-row gap-3" v-if="error">
                            <i class="bi bi-exclamation-triangle-fill"></i>
                            {{ error }}
                        </div>
    
                        <form class="flex flex-col gap-4 w-full mt-4" @submit.prevent="login()">
                            <div class="flex flex-col gap-3">
                                <div class="tz_form_control">
                                    <label for="email">Email Address</label>
                                    <input class="form_input_new" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                                </div>
    
                                <div class="tz_form_control">
                                    <label for="password">password</label>
                                    <div class=" relative ">
                                        <button type="button" @click="reveal_password = !reveal_password" class=" absolute top-3 right-3">
                                            <span v-if="reveal_password">
                                                <i class="bi bi-eye"></i>
                                            </span>
                                            <span v-else>
                                                <i class="bi bi-eye-slash"></i>
                                            </span>
                                        </button>
                                        <input class="form_input_new w-full" :type="reveal_password ? 'text':'password'" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="flex flex-row gap-5 justify-between flex-wrap">
                                <!-- <div class="flex flex-row-reverse gap-1 items-center justify-center">
                                    <label for="rem-details">Remember me</label>
                                    <input name="rem-details" id="rem-details" type="checkbox"/>
                                </div> -->
                                <RouterLink to="/password/forgot" class=" text-sm text-tz_blue">Forgot password?</RouterLink>
                            </div>
                            
                            <button class="p-3 text-white bg-tz_blue w-full rounded-full">Sign in</button> 
                            
                            <!-- or -->
                            <div class="flex flex-row justify-center items-center gap-5">
                                <div class="border grow"></div>
                                <div class="">OR</div>
                                <div class="border grow"></div>
                            </div>
                            
                            <!-- GOOGLE BUTTON STARTS HERE -->
                            <div class="">
                                <!-- <button @click="googleLogin" type="button" class="w-full border rounded-full font-medium text-sm px-5 py-3.5 text-center flex flex-row justify-center items-center gap-3 hover:bg-slate-50 dark:hover:bg-gray-700"> -->
                                <button @click="googleLogin" type="button" class="w-full border rounded-full font-medium text-sm px-5 py-3.5 text-center flex flex-row justify-center items-center gap-3 hover:bg-slate-50">
                                    <img src="../assets/images/google.svg" class="h-5"/>
                                    Continue with Google<div></div></button>
                            </div>
                            <!-- GOOGLE BUTTON ENDS HERE -->
    
    
                            <div class="text-center">
                                <p>Don't have account yet? <RouterLink to="/register/decide" class=" decoration-tz_blue">Sign up</RouterLink> </p>
                            </div>                      
                        </form>
                    </div>
                    <!-- MAIN CONTENT ENDS HERE -->
                </div>
                <div class="justify-center items-center w-[50%]  hidden md:flex rounded-lg">
                    <RouterLink to="/">
                        <img src="../assets/images/dot_logo.svg" class=" h-[200px] w-[200px]">
                    </RouterLink>
                </div>
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

    import { useToast } from 'vue-toastification'
    
    
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
                toast: useToast(),
                error: '',
                loading: false,
    
                form_data: {
                    email: '',
                    password: ''
                },
                callback: this.googleAuth,
                signup_modal: false,

                reveal_password: false,
            };
        },
        methods: {
            revealOrHidePassword(){

            },


            async login() {
                this.loading = true;
                try {
                    const response = await axios.post(`${this.api_url}/login`, this.form_data);
                    // console.log(response);
                   
                    // alert('login successful!');
                    this.toast.success(response.data.message);
    
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
                    
                    this.loading = true;
    
                }
                catch (error) {
                    console.log("Login error: ", error);
                    this.error = error.response.data.message;
                    
                    if(error.response.status == 500){
                        this.error = "invalid email or password"
                        this.toast.error(error.response.data.message);
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
    
            async verifyEmail(){
                if(this.$route.query.email){
                    try{
                        const response = await axios.post(`${this.api_url}/email/${this.$route.query.email}/verify`);
                        console.log("verifying email: ", response)
                        this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });
                    }catch(error){
                        this.$toast.add({ severity: 'erro', summary: 'Error Message', detail: 'Verification failed', life: 3000 });
                        console.log("error verifying email: ", error)
                    }
                }
            }
        },
    
        mounted(){
            this.verifyEmail();
        }
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