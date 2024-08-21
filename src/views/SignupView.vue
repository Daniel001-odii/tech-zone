<template>


    <!-- <div class="flex flex-col min-h-screen justify-between items-center  dark:text-white bg-[#E7F1FF] dark:bg-[#121212]"> -->
    <div class="flex flex-col min-h-screen bg-[#E7F1FF]">
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
                        <p>Already have an account? <RouterLink to="/login">Login</RouterLink> </p>

                        <div class="text-red-500 mt-6" v-if="error">{{ error }}</div>

                        <form class="flex flex-col gap-4 mt-6"  @submit.prevent="register">
                            <div class="flex flex-col gap-3">
                                <div class=" flex flex-row gap-3">
                                    <div class="">
                                        <label for="firstname">First Name</label>
                                        <input class="rounded-xl p-3 dark:bg-transparent w-full" type="text" name="firstname" id="firstname" placeholder="John" v-model="form_data.firstname" required>
                                    </div>

                                    <div class="">
                                        <label for="lastname">Last Name</label>
                                        <input class="rounded-xl p-3 dark:bg-transparent w-full" type="text" name="lastname" id="lastname" placeholder="Doe" v-model="form_data.lastname" required>
                                    </div>
                                </div>
                                

                                <div class="tz_form_control">
                                    <label for="email">Email Address</label>
                                    <input class="rounded-xl p-3 dark:bg-transparent w-full" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                                </div>

                                <div v-if='passHint && passwordValidation.errors.length > 0' class='hints'>
                                    <small v-for='error in passwordValidation.errors'>{{ error }}<br/></small>
                                </div>

                                <div class="tz_form_control">
                                    <label for="password">password</label>
                                    <input @click="passHint = true" class="rounded-xl p-3 dark:bg-transparent w-full" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                                </div>
                            </div>

                            <div>
                                <label for="agreeWithTOS" class="flex flex-row items-start justify-start gap-2">
                                    <input type="checkbox" id="agreeWithTOS" v-model="acceptedTOS"> 
                                    <p class="p-0 m-0">
                                        By clicking Sign up or continue with google I agree to  
                                        <RouterLink class="text-tz_blue" to="#">Tech-zone Terms and Conditions</RouterLink> and
                                        <RouterLink class="text-tz_blue" to="#">Privacy Policy</RouterLink>
                                    </p>
                                </label>
                            </div>


                            <button class="p-3 text-white bg-tz_blue w-full rounded-full" :disabled="!passwordValidation.valid || !acceptedTOS">Register</button> 
                            
                            
                            <!-- or -->
                            <div class="flex flex-row justify-center items-center gap-5">
                                <div class="border-t grow dark:border-[#666666]"></div>
                                <div class="">OR</div>
                                <div class="border-t grow  dark:border-[#666666]"></div>
                            </div>

                            <!-- GOOGLE BUTTON STARTS HERE -->
                            <div class="">
                                <button @click="googleLogin" type="button" class="w-full border rounded-full font-medium text-sm px-5 py-3.5 text-center flex flex-row justify-center items-center gap-3 hover:bg-slate-50">
                                    <img src="../assets/images/google.svg" class="h-5"/>
                                    Continue with Google<div></div></button>
                            </div>
                            <!-- GOOGLE BUTTON ENDS HERE -->                  
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
        <MiniFooter/>
    </div>
  
</template>
<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
import SiteLogo from '@/components/SiteLogo.vue';

import MiniFooter from '@/components/MiniFooter.vue'
import { useToast } from 'vue-toastification'


export default {
    name: "SignUpView",
    components: { Alert, SiteLogo, MiniFooter },
    data(){
        return{
            toast: useToast(),
            error: '',
            acceptedTOS: false,
            form_data: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },

            passHint: false,
            rules: [
				{ message:'One lowercase letter required.', regex:/[a-z]+/ },
				{ message:"One uppercase letter required.",  regex:/[A-Z]+/ },
				{ message:"8 characters minimum.", regex:/.{8,}/ },
				{ message:"One number required.", regex:/[0-9]+/ }
			],
        }
    },
    methods: {
        async register(){
            try{
                const response = await axios.post(`${this.api_url}/register/user`, this.form_data);
                console.log(response);
                localStorage.setItem('life-gaurd', response.data.accessToken);
                
                // display toast..
                this.toast.success(response.data.message);
                setTimeout(() => {
                    this.$router.push('/login');
                }, 3000);
                
            }
            catch(error){
                this.error = error.response.data.message;
                // display toast..
                this.toast.error(response.data.message);
                console.log("error registering: ", error);
            }
        },

        async googleLogin(){
            try{
                const response = await googleAuthCodeLogin();
                console.log("response from google: ", response);
                const auth = { code: response.code, role: "employer" }
                const res = await axios.post(`${this.api_url}/google-auth`, auth );
                if(res.data.message == "Sign-in successful"){
                    // alert user of successful sign login..
                    // display toast..
                    this.toast.success(response.data.message);
                    // save user token...
                    localStorage.setItem("life-gaurd", res.data.token);
                    // redirect to user profile...
                    this.$router.push("/in/jobs");
                    window.location.reload();
                } else if(res.data.message == "User registered successfully"){
                    this.$router.push("/in/jobs");
                    window.location.reload();
                }
                console.log("response from backend: ", res)

            }catch(error){
                // display toast..
                this.toast.error(response.data.message);
            }
        },
    },

    computed:{
        passwordValidation () {
			let errors = []
			for (let condition of this.rules) {
				if (!condition.regex.test(this.form_data.password)) {
					errors.push(condition.message)
				}
			}
			if (errors.length === 0) {
				return { valid:true, errors }
			} else {
				return { valid:false, errors }
			}
		}
    }
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }

    button:disabled{
        @apply bg-gray-400
    }


</style>