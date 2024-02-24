<template>
    <div>
        <div class="flex flex-row justify-center items-center h-screen">

            <div class="flex flex-col justify-center items-center text-start md:w-3/6  h-full md:p-8">
                <div class="w-full lg:w-96 flex flex-col gap-3">
                    <div class="text-start  w-full">
                        <h1 class="text-3xl font-bold">Welcome</h1>
                        <span>Please fill in the fields below to create your account</span>
                    </div>
                
                    <Alert :type="'danger'" :message="error" v-if="error"/>

                    <form class="flex flex-col gap-4"  @submit.prevent="register">
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="firstname">First Name</label>
                                <input class="border p-3 rounded-md outline:blue" type="text" name="firstname" id="firstname" placeholder="John" v-model="form_data.firstname" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="lastname">Last Name</label>
                                <input class="border p-3 rounded-md outline:blue" type="text" name="lastname" id="lastname" placeholder="Doe" v-model="form_data.lastname" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="email">Email Address</label>
                                <input class="border p-3 rounded-md outline:blue" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="form_data.email" required>
                            </div>

                            <div class="tz_form_control">
                                <label for="password">password</label>
                                <input class="border p-3 rounded-md" type="password" name="password" id="password" placeholder="a very strong password" v-model="form_data.password" required>
                            </div>
                        </div>
                        <button class="btn w-full">Continue</button> 
                        <!-- GOOGLE SIGN IN -->
                        <div class="">
                            <button type="button" class="text-white w-full bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center justify-center"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Continue with Google<div></div></button>
                        </div>
                        <div class="text-center">
                            <p>Already have an account? <RouterLink to="/login">Login</RouterLink> </p>
                        </div>                      
                    </form>
                </div>
                
            </div>

            <div class=" bg-light_blue hidden lg:flex flex-col justify-center items-center w-3/6  h-full">
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

export default {
    name: "SignUpView",
    components: { Alert },
    data(){
        return{
            form_data: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async register(){
            try{
                const response = await axios.post("http://localhost:8000/api/register", this.form_data);
                console.log(response);
                localStorage.setItem('life-gaurd', response.data.accessToken);
                alert('registration successful, please login')
                this.$router.push('/login')
            }
            catch(error){
                alert(error)
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