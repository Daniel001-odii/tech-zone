<template>
   
   <FullPageLoading v-if="loading"/>

    <!-- <div class="flex flex-row"> -->
       
        <div class=" min-h-screen bg-[#E7F1FF] flex flex-col">
            <div class=" my-auto mx-0 flex flex-col justify-center items-center">

                <div class=" w-fit p-8 max-w-md bg-white  rounded-xl" v-if="!message">
                    <RouterLink to="/">
                        <img src="../../public/apex-tek.svg" class=" h-10 w-full">
                    </RouterLink>
                        <div class="w-full mb-5">
                            <h1 class="text-2xl font-bold mb-4 mt-5">Forgot your password?</h1>
                            <span class="">Enter the email address associated with your account, If we find an associated account, we will email you a link to reset your password.</span>
                        </div>
                        
                        
                        <form @submit.prevent="sendResetLink" class="flex flex-col gap-4">
                            <div class="flex flex-col gap-3">
                                <div class="tz_form_control">
                                    <label for="email">Email Address</label>
                                    <input class="form_input" type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model="email" required>
                                </div>
                            </div>
                            <Alert :type="'danger'" :message="`${error}`" v-if="error"/>
                            <button type="submit" class=" bg-tz_blue text-white font-medium p-3 rounded-full">Send Reset Link</button>
                            <!-- <LoaderButton type="button" @click="sendResetLink"  :buttonText="loading ? 'Loading...' : 'Send Reset Link'" :loading="loading"/> -->
                        </form>
                </div>
                <div v-if="message">
                    <div class="text-center flex flex-col justify-center items-center  w-full mb-5">
                        <img src="../assets/images/paper-plane.png" class=" h-52">
                            <h1 class="text-3xl font-bold mb-4">Password Reset Link sent!</h1>
                            <span class="p-5">An email has been sent to {{  email }} with instructions for resetting your password.</span>
                        </div>
                </div>

            </div>


        </div>
    
       

</template>
<script>
import Alert from '@/components/Alert.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';
import LoaderButton from '@/components/LoaderButton.vue';
import axios from 'axios';


export default {
    name: "SendPassResetEmailView",
    components: { FullPageLoading, Alert, LoaderButton },
    data() {
        return {
            error: '',
            loading: false,
            email: '',

            message: false,

        };
    },
    methods: {

        async sendResetLink(){
            this.loading = true;
            try{
                const form = {
                    email: this.email,
                };
                const response = await axios.post(`${this.api_url}/password/forgot`,  form );
                console.log(response);
                this.loading = false;
                this.message = true;
            }catch(error){
                console.log("error sending request link :", error);
                this.loading = false;
                this.error = error.response.data.message;
            }
        }
       
    },
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }

    .wallpaper{
        background: url('../assets/images/white_background.png');
        background-position: center;
        background-repeat: no-repeat;
    }
</style>