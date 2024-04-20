<template>
      

       <FullPageLoading v-if="loading"/>
    
        <div class="flex flex-row">
            <div class=" h-screen w-full lg:w-3/6 flex flex-col justify-center items-center dark:bg-[#27323F] dark:text-white">
                <Alert :type="'danger'" :message="`${error}`" v-if="error"/>
                <div class=" w-fit p-8" v-if="login_stage == 0">
                        <div class="text-start  w-full mb-5">
                            <h1 class="text-3xl font-bold">Welcome back</h1>
                            <span>Please enter your login details</span>
                        </div>
                        
                 
                        <form class="flex flex-col gap-4" @submit.prevent="login">
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
                                    <label for="rem-details">Remember details</label>
                                    <input name="rem-details" id="rem-details" type="checkbox" />
                                </div>
                                <RouterLink to="/password/forgot">Forgot password ?</RouterLink>
                            </div>
                            <LoaderButton  :buttonText="loading ? 'Loading...' : 'Continue'" :loading="loading"/>
                                     
                        </form>
                </div>
                <div class=" w-fit p-8 flex flex-col justify-center text-center gap-4" v-if="login_stage == 1">
                    <h1 class="text-3xl font-bold">Enter Your OTP</h1>
                    <form @submit.prevent="OTP_Test" class="max-w-sm mx-auto">
                        <div class="flex justify-center mb-2 space-x-2 rtl:space-x-reverse">
                            <!-- class="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required /> -->
                            <input
                                v-for="(input, index) in otpInputs"
                                :key="index"
                                v-model="otpInputs[index]"
                                @input="handleInput(index)"
                                @keydown="handleKeyDown(index)"
                                maxlength="1"
                                :ref="'otpInput' + index"
                                class= "block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text"
                            />
                        </div>
                        <span>Please enter the One time passcode sent to your registered email to complete your login</span>
                        <button type="button" @click="OTP_Test" class="btn w-full mt-3">Login</button>
                    </form>
                    
                </div>
            </div>
    
            <div class=" bg-tz_light_blue hidden lg:flex flex-col justify-center items-center w-3/6 dark:bg-[#1F2A36]">
                <div>
                    <SiteLogo/>
                </div>
            </div>
               
        </div>
           
    
</template>

<script>
    import axios from 'axios';
    import Alert from '@/components/Alert.vue';
    import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
    import SiteLogo from '@/components/SiteLogo.vue';
    import LoaderButton from '@/components/LoaderButton.vue';
    import FullPageLoading from '@/components/FullPageLoading.vue';
    import DismissableAlert from '@/components/DismissableAlert.vue';

    export default {
        name: "AdminLoginView",
        components: { Alert, SiteLogo, LoaderButton, FullPageLoading, DismissableAlert },
        data(){
            return{
                error: '',
                acceptedTOS: false,
                form_data: {
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
                loading: false,

                admin_OTP: null,
                login_stage: 0,
                otpInputs: [,,,,,,],
            }
        },
        methods: {
           async login(){
            this.loading = false;
            try{
                const response = await axios.post(`${this.api_url}/login/admin`, this.form_data);
                console.log("login response :", response);
                this.token = response.data.token;
                this.login_stage = 1;
                this.loading = false;
            }catch(error){
                console.log(error);
                this.error = error.response.data.message;
                this.loading = false;
            }
           },

           async OTP_Test(){
            const login_code = this.otpInputs.join('');
            this.loading = true;
            try{
                const response = await axios.post(`${this.api_url}/OTP/admin`, { login_code });
                console.log(response);
                if(response.status == 200){
                    localStorage.setItem('life-gaurd', this.token);
                    this.$router.push('/admin/dashboard')
                }
                this.loading = false;
            }catch(error){
                console.log("error verifying OTP", error);
                this.error = error.response.data.message;
                this.otpInputs = [,,,,,,];
                this.loading = false;
            }
           },

           handleInput(index) {
            const nextIndex = index + 1;
            if (this.otpInputs[index] && nextIndex < this.otpInputs.length) {
                // Focus on the next input box if current one is filled
                this.$refs['otpInput' + nextIndex][0].focus();
            }
            },
            
            handleKeyDown(index) {
            const prevIndex = index - 1;
            if (event.key === 'Backspace' && index > 0 && !this.otpInputs[index]) {
                // Focus on the previous input box if backspace is pressed and current box is empty
                this.$refs['otpInput' + prevIndex][0].focus();
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