<template>
    <div>
        <div class="flex flex-row justify-center items-center h-screen">

            <div class="w-full p-5 flex flex-col justify-center items-center text-start md:w-3/6  h-full md:p-8">
                <div class="w-full lg:w-96 flex flex-col gap-3">
                    
                    <div class="text-start  w-full">
                        <h1 class="text-3xl font-bold">Welcome back</h1>
                        <span>Please enter your login details</span>
                    </div>
                    <!-- <Alert :type="'danger'" :message="`${error}`" v-if="error"/> -->
                    <span v-if="error" class="p-3 rounded-lg bg-red-100 text-red-700">
                        {{ error }}
                    </span>
                    <form class="flex flex-col gap-4" @submit.prevent="login">
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="email">Email Address</label>
                                <input class="border p-3 rounded-md outline:blue" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="password">password</label>
                                <input class="border p-3 rounded-md" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                            </div>
                        </div>
                        <div class="flex flex-row justify-between flex-wrap">
                            <div class="flex flex-row-reverse gap-1 items-center">
                                <label for="rem-details">Remember details</label>
                                <input name="rem-details" id="rem-details" type="checkbox" />
                            </div>
                            <RouterLink to="/#">Forgot password ?</RouterLink>
                        </div>
                        <LoaderButton  :buttonText="loading ? 'Loading...' : 'Sign in'" :loading="loading"/>
                        <!-- <button class="btn w-full" disabled>Sign in</button>  -->
                        <!-- GOOGLE SIGN IN -->
                        <div class="">
                            <!-- <GoogleLogin class="!w-full" :callback="callback" auto-login/> -->
                                <button @click="googleLogin" type="button" class="text-white w-full bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-3.5 text-center flex flex-row justify-center items-center"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Continue with Google<div></div></button>
                            <!-- </GoogleLogin> -->
                            
                        </div>
                        <div class="text-center">
                            <p>Don't have account yet? <RouterLink to="/register/decide" class=" decoration-blue">Sign up</RouterLink> </p>
                        </div>                      
                    </form>
                </div>
                
            </div>

            <div class=" bg-light_blue hidden lg:flex flex-col justify-center items-center w-3/6  h-full">
                <div>
                    <img src="../assets/images/tech-zone.svg" width="100px">
                </div>
            </div>
        </div>
    </div>
 
</template>
<script>
import Alert from '@/components/Alert.vue';
import LoaderButton from '@/components/LoaderButton.vue';
import axios from 'axios';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
// import {  } from 'vue3-google-login';

export default {
    name: "LoginView",
    components: {},
    data() {
        return {
            error: '',
            loading: false,

            form_data: {
                email: '',
                password: ''
            },
            callback: this.googleAuth,
        };
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                const response = await axios.post(`${this.api_url}/login`, this.form_data);
                console.log(response);
                localStorage.setItem('life-gaurd', response.data.accessToken);
                // alert('login successful!');
                if(response.data.user.role == "user"){
                    window.location.reload();
                    this.$router.push('/jobs');
                   
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
            try{
                const response = await googleAuthCodeLogin();
                console.log("response from google: ", response);
                const auth_code = { code: response.code }
                const res = await axios.post(`${this.api_url}/google-auth`, auth_code );
                if(res.data.message == "Sign-in successful"){
                    // alert user of successful sign login..
                    alert("Login Successfull");
                    // save user token...
                    localStorage.setItem("life-gaurd", res.data.token);

                    // redirect to respective user or employer profile...

                    if(res.data.user.model == "User"){
                        window.location.reload();
                        this.$router.push("/jobs")
                    } else if(res.data.user.model == "Employer"){
                        window.location.reload();
                        this.$router.push("/client/dashboard")
                    }

                } else if(res.data.message == "User registered successfully"){
                    alert("Registration successful!");
                  
                  
                }
                console.log("response from backend: ", res)

            }catch(error){
                alert(error);
            }
        },
    },
    components: { Alert, LoaderButton }
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }
</style>