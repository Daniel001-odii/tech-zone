<template>
    <div class="flex flex-col justify-center items-center min-h-screen gap-3">
        <p class="text-red-500 p-3" v-if="error">{{ error }}</p>
        <p class="font-bold text-3xl text-green-700"><b>{{ message }} </b></p>
        <span class="text-2xl">{{  $route.params.email  }}</span>
        <RouterLink to="/">
            <button class="btn mt-5">Continue</button>
        </RouterLink>
    </div>
</template>

<script>
import axios from 'axios'


    export default {
        data(){
            return{
                email: this.$route.params.email,
                token: this.$route.params.token,
                error: '',
                message: '',
            }
        },

        methods:{
            async verifyEmail(){
                try{
                    const response = await axios.get(`/email/${this.email}/${this.token}/verify/native`);
                    this.message = response.data.message;

                } catch (error){
                    this.error = error.response.data.message;
                }
            }
        },

        created(){
            this.verifyEmail();
        }
    }
</script>

<style scoped>

</style>