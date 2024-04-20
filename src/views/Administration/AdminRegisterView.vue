<template>
    <div class="flex flex-row">
         <div class=" h-screen w-full lg:w-3/6 flex flex-col justify-center items-center dark:bg-[#27323F] dark:text-white">
            <div class=" w-fit p-8">
                <div class="text-start  w-full mb-5">
                    <h1 class="text-3xl font-bold">Apex-tek Admistration</h1>
                    <span>Please fill in the fields below to create your account</span>
                </div>
            
                <Alert :type="'danger'" :message="error" v-if="error"/>
    
                <form class="mt-3 flex flex-col gap-4"  @submit.prevent="register">
                    <div class="flex flex-col gap-3">
                        <div class=" flex flex-row flex-wrap gap-3">
                            <div class="tz_form_control grow">
                                <label for="firstname">First Name</label>
                                <input class="form_input" type="text" name="firstname" id="firstname" placeholder="John" v-model="form_data.firstname" required>
                            </div>
    
                            <div class="tz_form_control grow">
                                <label for="lastname">Last Name</label>
                                <input class="form_input" type="text" name="lastname" id="lastname" placeholder="Doe" v-model="form_data.lastname" required>
                            </div>
                        </div>
                       
    
                        <div class="tz_form_control">
                            <label for="email">Email Address</label>
                            <input class="form_input" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                        </div>
    
                        <div v-if='passHint && passwordValidation.errors.length > 0' class='hints'>
                            <small v-for='error in passwordValidation.errors'>{{ error }}<br/></small>
                        </div>
    
                        <div class="tz_form_control">
                            <label for="password">password</label>
                            <input @click="passHint = true" class="border p-3 rounded-md form_input" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                        </div>
                    </div>
                    <button class="btn w-full" :disabled="!passwordValidation.valid">Continue</button> 
    
                    <div class="text-center">
                        <p>Already have an account? <RouterLink to="/site/login">Login</RouterLink> </p>
                    </div>                      
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
    
    export default {
        name: "AdminRegisterView",
        components: { Alert, SiteLogo },
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
                    const response = await axios.post(`${this.api_url}/register/admin`, this.form_data);
                    console.log(response);
                    localStorage.setItem('life-gaurd', response.data.accessToken);
                    alert('registration successful, please login')
                    this.$router.push('/site/login')
                }
                catch(error){
                    // alert(error)
                    console.log("error registering: ", error);
                    this.error = error.response.data.message;
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