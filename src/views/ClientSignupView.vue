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

                        
                        <div class="text-red-500 mt-6 bg-red-500 bg-opacity-10 rounded-md border-red-500 p-3 flex flex-row" v-if="error">
                            <i class="bi bi-exclamation-triangle-fill mr-3"></i>
                            <span>{{ error }}</span>
                        </div>

                        <form class="flex flex-col gap-4 mt-6"  @submit.prevent="register">
                            <div class="flex flex-col gap-3">
                                <div class=" flex flex-row gap-3">
                                    <div class="">
                                        <label for="firstname">First Name</label>
                                        <input class="rounded-xl p-3 dark:bg-transparent w-full"  :class="firstnameError ? 'border-red-500 text-red-500':''" type="text" name="firstname" id="firstname" @change="validateFirstname" placeholder="John" v-model="form_data.firstname" required>
                                    </div>

                                    <div class="">
                                        <label for="lastname">Last Name</label>
                                        <input class="rounded-xl p-3 dark:bg-transparent w-full" :class="lastnameError ? 'border-red-500 text-red-500':''" type="text" name="lastname" id="lastname" @change="validateLastname" placeholder="Doe" v-model="form_data.lastname" required>
                                    </div>
                                </div>
                                <span v-if="firstnameError" class="text-red-500 text-small">{{ firstnameError }}</span>
                                <span v-if="lastnameError" class="text-red-500 text-small">{{ lastnameError }}</span>
                                

                                <div class="tz_form_control">
                                    <label for="email">Email Address</label>
                                    <input class="rounded-xl p-3 dark:bg-transparent w-full" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                                </div>

                                <div class="tz_form_control">
                                    <label for="company_name">Company Name</label>
                                    <input class="rounded-xl p-3 dark:bg-transparent w-full" type="text" name="company_name" id="company_name" placeholder="John Doe & Co." v-model="form_data.company_name" required>
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

                            <button class="p-3 text-white bg-tz_blue w-full rounded-full flex justify-center items-center" :disabled="!passwordValidation.valid || !acceptedTOS || loading || firstnameError || lastnameError">
                                <span v-if="loading" class="p-3"><SpinnerComponent/></span>
                                <span v-else>Register</span>
                            </button> 
                            
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
import { useToast } from 'vue-toastification';


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
                password: '',
                company_name: '',
            },

            firstnameError: '',
            lastnameError: '',

            passHint: false,
            rules: [
				{ message:'One lowercase letter required.', regex:/[a-z]+/ },
				{ message:"One uppercase letter required.",  regex:/[A-Z]+/ },
				{ message:"8 characters minimum.", regex:/.{8,}/ },
				{ message:"One number required.", regex:/[0-9]+/ }
			],
            loading: false,
        }
    },
    methods: {
        validateFirstname() {
            const usernamePattern = /^[a-zA-Z0-9_]+$/;
            if (!usernamePattern.test(this.form_data.firstname)) {
                this.firstnameError = 'firstname must not contain special characters';
            } else {
                this.firstnameError = '';
            }
        },

        validateLastname() {
            const usernamePattern = /^[a-zA-Z0-9_]+$/;
            if (!usernamePattern.test(this.form_data.lastname)) {
                this.lastnameError = 'lastname must not contain special characters';
            } else {
                this.lastnameError = '';
            }
        },

        async register(){
            try{
                this.loading = true;
                const response = await axios.post(`${this.api_url}/register/employer`, this.form_data);
                console.log(response);
                localStorage.setItem('life-gaurd', response.data.accessToken);
                this.toast.success(response.data.message);
                this.$router.push('/login');
            }
            catch(error){
                this.loading = false;
                this.error = error.response.data.message;
                this.toast.error(error.response.data.message);
            }
        },


        async googleLogin(){
            try{
                const response = await googleAuthCodeLogin();
                console.log("response from google: ", response);
                const auth = { code: response.code, role: "employer" }
                const res = await axios.post(`${this.api_url}/google-auth`, auth );
                if(res.status == 200){
                    // alert user of successful sign login..
                    // display toast..
                    this.toast.success(res.data.message);
                    // save user token...
                    localStorage.setItem("life-gaurd", res.data.token);
                  /*   // redirect to user profile...
                    if(res.data.role == 'user'){
                       
                        this.$router.push("/in/jobs");
                        // window.location.reload();
                    } else if(res.data.role == 'employer'){
                        this.$router.push("/client/dashboard");
                        // window.location.reload();
                    }; */
                    
                    console.log('google login: ',)
                    window.location.reload();
                } else if(res.status == 201){
                   /*  this.$router.push("/client/dashboard");
                    // display toast..
                    this.toast.success(res.data.message);
                    // save user token...
                    localStorage.setItem("life-gaurd", res.data.token);
                    // redirect to user profile...
                 
                    // window.location.reload(); */
                    localStorage.setItem("life-gaurd", res.data.token)
                    window.location.reload();
                }
                console.log("response from backend: ", res)

            }catch(error){
                // display toast..
                console.log('error with google sign-in: ', error)
                this.toast.error(error.response.data.message);
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