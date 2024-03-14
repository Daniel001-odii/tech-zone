<template>
    <div>
        <div class="flex flex-row justify-center items-center w-screen  mt-20">

            <!-- <div class="flex flex-col justify-center items-center text-start md:w-3/6  h-full md:p-8"> -->
                <div class="w-full lg:w-96 flex flex-col gap-3 p-4">
                    <div class="text-start  w-full">
                        <h1 class="text-3xl font-bold">Welcome</h1>
                        <span>Please fill in the fields below to create your account</span>
                    </div>
                
                    <Alert :type="'danger'" :message="error" v-if="error"/>

                    <form class="flex flex-col gap-4"  @submit.prevent="register">
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="firstname">First Name</label>
                                <input class="border p-3 rounded-md outline:tz_blue" type="text" name="firstname" id="firstname" placeholder="John" v-model="form_data.firstname" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="lastname">Last Name</label>
                                <input class="border p-3 rounded-md outline:tz_blue" type="text" name="lastname" id="lastname" placeholder="Doe" v-model="form_data.lastname" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="email">Email Address</label>
                                <input class="border p-3 rounded-md outline:tz_blue" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                            </div>

                            <div v-if='passHint && passwordValidation.errors.length > 0' class='hints'>
                                <small v-for='error in passwordValidation.errors'>{{ error }}<br/></small>
                            </div>

                            <div class="tz_form_control">
                                <label for="password">password</label>
                                <input @click="passHint = true" class="border p-3 rounded-md" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                            </div>
                        </div>
                        <button class="btn w-full" :disabled="!passwordValidation.valid || !acceptedTOS">Continue</button> 
                        <!-- GOOGLE SIGN IN -->
                        <div class="">
                            <button @click="googleLogin" type="button" class="text-white w-full bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center justify-center"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Continue with Google<div></div></button>
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

                        <div class="text-center">
                            <p>Already have an account? <RouterLink to="/login">Login</RouterLink> </p>
                        </div>                      
                    </form>
                </div>
                
            <!-- </div> -->

            <div class=" bg-tz_light_blue hidden lg:flex flex-col justify-center items-center w-3/6  h-full">
                <div>
                    <img src="../assets/images/tech-zone.svg">
                </div>
            </div>
        </div>
    </div>
 
</template>
<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';

export default {
    name: "SignUpView",
    components: { Alert },
    data(){
        return{
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
                alert('registration successful, please login')
                this.$router.push('/login')
            }
            catch(error){
                alert(error)
            }
        },

        async googleLogin(){
            try{
                const response = await googleAuthCodeLogin();
                console.log("response from google: ", response);
                const auth = { code: response.code, role: "user" }
                const res = await axios.post(`${this.api_url}/google-auth`, auth );
                if(res.data.message == "Sign-in successful"){
                    // alert user of successful sign login..
                    alert("Login Successfull");
                    // save user token...
                    localStorage.setItem("life-gaurd", res.data.token);
                    // redirect to user profile...
                    this.$router.push("/profile")
                } else if(res.data.message == "User registered successfully"){
                    alert("Registration successful!");
                    this.$router.push("/profile")
                }
                console.log("response from backend: ", res)

            }catch(error){
                // alert(error);
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
</style>