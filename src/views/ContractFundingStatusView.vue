<template>
    <div class=" min-h-screen w-full flex flex-col justify-center items-center p-8" :class="{'successful' : isSuccessful, 'failed' : isFailed }">
        
       

        <div  class="flex flex-col max-w-[500px] bg-white rounded-lg p-8">
            <span v-if="loading">Loading...</span>
            <div v-else class="flex flex-col">
                <div v-if="isSuccessful">
                    <i class="bi bi-check-circle-fill text-4xl mb-3"></i>
                    <h1 class="font-bold text-3xl mb-5">Payment Successful!</h1>
                    <p class="text-lg">We processed your payment, thank you!<br/>You will be redirected in {{ time }} secs</p>
                </div>
                    <div v-if="isFailed" class="flex flex-col max-w-[500px] bg-white rounded-lg p-8">
                        <i class="bi bi-exclamation-circle-fill text-4xl mb-3"></i>
                        <h1 class="font-bold text-3xl mb-5">Payment Failed</h1>
                        <p class="text-lg">hey there. We tried to process your payment but ran into a problem, please try again later and hopefully it works.
                            <br/>You will be redirected in {{ time }} secs
                        </p>
                    </div>
<!--                 
                <RouterLink to="/">
                    <button class="btn bg-black mt-3" style="background: black !important;">Return to home</button>
                </RouterLink> -->

                <small class="mt-4">have a question? <RouterLink to="/support" class="text-blue-500">Contact Support</RouterLink></small>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';


    export default {
        name: "ContractFundingStatusView",
        data(){
            return{
                loading: false,
                time: 5,
            }
        },

        methods: {
            countDown(){
                let time = this.time;
                const timer = setInterval(() => {
                    time -= 1;
                    this.time = time;

                    if(time <= 0){
                        clearInterval(timer);
                        this.$router.push(`/client/contracts/${this.$route.params.contract_id}`);
                    }
                }, 1000);
            },

            async getContractFundingStatus(){
                try{
                    this.loading = true;
                    const response = await axios.get(`${this.api_url}/contracts/${this.$route.params.contract_id}/funds/status`);
                    console.log("response: ", response);
                    this.loading = false;
                    this.countDown();
                }catch(error){
                    console.log("error getting funding status: ", error);
                    this.loading = false;
                }
            }
        },  

        computed:{
           isSuccessful(){
            const result = this.$route.params.status == 'success' ? true : false;
            return result
           },

           isFailed(){
            const result = this.$route.params.status == 'failed' ? true : false;
            return result
           }


        },

        mounted(){
            this.getContractFundingStatus();
        }
    }
</script>

<style scoped>
    .successful{
        @apply bg-green-500
    }

    .failed{
        @apply bg-red-500
    }
</style>