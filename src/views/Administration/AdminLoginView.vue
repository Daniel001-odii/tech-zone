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
    
        <div class="flex flex-row">
            <div class=" h-screen w-full lg:w-3/6 flex flex-col justify-center items-center dark:bg-[#27323F] dark:text-white">
                <div class=" w-fit p-8">
                        <div class="text-start  w-full mb-5">
                            <h1 class="text-3xl font-bold">Welcome back</h1>
                            <span>Please enter your login details</span>
                        </div>
                        <Alert :type="'danger'" :message="`${error}`" v-if="error"/>
                 
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
                            <LoaderButton  :buttonText="loading ? 'Loading...' : 'Sign in'" :loading="loading"/>
                                     
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
    
    export default {
        name: "AdminLoginView",
        components: { Alert, SiteLogo, LoaderButton },
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