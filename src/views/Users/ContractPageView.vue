<template>
    <PageTitle>Contracts</PageTitle>
    <FullPageLoading v-if="loading"/>

    <Modal :title="'Submit a review'" :modal_active="feedbackModal">
        <template #body>
            <form @submit.prevent="submitFeedback">
                <div class="flex flex-col gap-3 text-2xl">
                    <p class=" text-blue-500">Rate your experience with the client</p>
                        <div class="modal-body mt-3" @submit.prevent="sendClientFeedBack">
                                <div>
                                    <!-- Example 1: Communication -->
                                    <div class="feedback_row" v-for="(feedback, feedback_id) in review_type" :key="feedback_id">
                                        <span>{{ feedback }}:</span>
                                        <div class="rating flex flex-row gap-2">
                                            <label v-for="value in 5" :key="value" class="">
                                            <input type="radio" :value="value" v-model="rating[feedback_id]" :id="value" :name="value" class="sr-only" />
                                            <div :class="{ 'selected': value <= rating[feedback_id] }" class="custom-rating-box tz_rate" @click="selected(value, 'grade_a')">
                                                {{ value }}
                                            </div>
                                            </label>
                                        </div>
                                    </div>
                                    Total Score: {{ rating.reduce((acc, value) => {return acc + value }, 0) / 5 }}
                                </div>
                            </div>
                    <p>Write an honest review to the client</p>
                    <span class=" text-sm bg-blue-100 text-blue-700 p-3 rounded-md">The client will be able to see your review once submitted</span>
                    <textarea v-model="feedback.review" placeholder="a very honest review about your experience working with this person" class="form_input text-xl"></textarea>
                </div>
            </form>
        </template>
        <template #footer>
            <button type="button" class="btn" @click="submitFeedback" :disabled="rating.length < 5 || feedback.review == ''">Submit Feedback</button>
            <!-- <button type="button" class="btn" @click="ratingScore">Submit Feedback</button> -->
        </template>
    </Modal>

    <!-- <<<<<<<<<>>>>>>>>> -->
    <div>
                
                <div v-if="!contract" class="p-5 gap-3 flex flex-col">
                    <SkeletonLoader/>
                    <div class="flex flex-row gap-5 justify-start m-5">
                        <button class="font-bold border rounded-2xl px-6 py-3 bg-gray-300 text-transparent">Decline Offer</button>
                        <button class="font-bold rounded-2xl px-6 py-3 bg-gray-300 text-transparent">Accept Offer</button>
                    </div>
                </div>
                <!-- LOADED CONTRACT HERE -->
                <!-- CONTRACT VIEWING FOR USERS.... -->
                <p class="text-left pt-5 pl-8 text-gray-400">contract status: {{ contract.status }}</p>
                <div v-if="contract && user.role == 'user'" class="flex flex-col p-5 text-left">
                    
                    <span v-if="contract.action == 'accepted'" class=" bg-green-200 text-green-700 p-5 rounded-lg m-3"> You accepted this offer </span>
                    <span v-if="contract.action == 'declined'" class=" bg-red-100 text-red-700 p-5 rounded-lg m-3"> You declined this offer </span>

                    <h1 v-if="contract.action == 'pending'" class="text-3xl font-bold p-3">{{ user.firstname }} you received a job contract offer!</h1>

                   <div class="text-left gap-3 flex flex-col p-5">
                    <p class="font-bold text-xl">{{ contract.job.title }}</p>
                    <p>Budget - ${{ contract.job.budget.toLocaleString() }}</p>
                    <p>ApexTek Service fee: -$5</p>
                    <p>Expected amount you will receive: ${{ (contract.job.budget - 5).toLocaleString() }}</p>
                    <div>
                        <p>Contract offer from</p>
                        <!-- <p>{{ contract.employer }}</p> -->
                        <div class="flex flex-row items-center gap-3">
                            <div class=" h-8 w-8 rounded-lg overflow-hidden">
                                <img :src="contract.employer.profile.image_url">
                            </div>
                            <div>
                                <p class=" block">{{ contract.employer.profile.company_name }}</p>
                                <p class=" blocks">{{ contract.employer.firstname }} {{ contract.employer.lastname }}</p>
                            </div>
                        </div>
                        <p class=" text-sm text-gray-400 mt-3">sent {{ readableTimeFormat(contract.created) }}</p>
                       
                    </div>
                    <div class="mt-6">
                        <p class="text-gray-600">Once you accept the offer you can begin working on the contract right away</p>
                        <div class="flex flex-row gap-5 justify-start mt-3">
                            <button @click="declineOffer" class="font-bold border rounded-2xl px-6 py-3 hover:bg-slate-50 disabled:bg-gray-200 disabled:text-gray-400 " :disabled="contract.action != 'pending'">Decline Offer</button>
                            <button @click="acceptOffer" class="font-bold rounded-2xl px-6 py-3 bg-tz_blue text-white hover:bg-tz_dark_blue disabled:bg-gray-200 disabled:text-gray-400" :disabled="contract.action != 'pending'">Accept Offer</button>
                        </div>
                    </div>
                    <div v-if="contract.action == 'accepted'" class="mt-6">
                        <h2 class="font-bold text-xl">Feedback & Review</h2>
                        <p class="text-gray-600 mt-3 bg-tz_light_blue p-3 rounded-lg text-tz_blue">
                           <i class="bi bi-exclamation-circle"></i> Feedback submission will only be available when contract is completed.
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button @click="feedbackModal = !feedbackModal" class="font-bold rounded-2xl px-6 py-3 bg-tz_blue text-white hover:bg-tz_dark_blue disabled:bg-gray-200 disabled:text-gray-400" :disabled="contract.status != 'completed' || contract.employer_feedback.review">
                                <span v-if="contract.employer_feedback.review">Feedback sent</span>
                                <span v-else>Send Feedback to client</span>
                            </button>
                        </div>
                        
                    </div>
                   </div>
                </div>

                <!-- CONTRACT VIEWING FOR EMPLOYERS.... -->
                <div v-if="contract && user.role == 'employer'" class="flex flex-col p-5 text-left">
                    <span v-if="contract.action == 'accepted'" class=" bg-green-200 text-green-700 p-5 rounded-lg m-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} accepted this offer </span>
                    <span v-if="contract.action == 'declined'" class=" bg-red-100 text-red-700 p-5 rounded-lg m-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} declined this offer </span>

                    <h1 v-if="contract.action == 'pending'" class="text-3xl font-bold p-3">you sent {{ contract.user.firstname }} {{ contract.user.lastname }} a job contract offer!</h1>

                   <div class="text-left gap-3 flex flex-col p-5">
                    <p class="font-bold text-xl">{{ contract.job.title }}</p>
                    <p>Your Budget - ${{ contract.job.budget.toLocaleString() }}</p>
                    <p>ApexTek Service fee: -$5</p>
                    <p>Expected amount Freelancer will receive: ${{ (contract.job.budget - 5).toLocaleString() }}</p>
                    <p class=" text-sm text-gray-400">sent {{ readableTimeFormat(contract.created) }}</p>
                       
                    
                    <div class="mt-6">
                        <h2 class="font-bold text-xl">Contract Actions</h2>
                        <p class="text-gray-600 mt-3 bg-tz_light_blue p-3 rounded-lg text-tz_blue">
                           <i class="bi bi-exclamation-circle"></i> The Freelancer will be notified for any action you perform on the contract
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button v-if="contract.action == 'accepted'" @click="markAsComplete" class="font-bold rounded-2xl px-6 py-3 bg-tz_blue text-white hover:bg-tz_dark_blue disabled:bg-gray-200 disabled:text-gray-400" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed'">Mark as complete</button>
                            <button v-if="contract.action == 'accepted'" @click="pauseContract" class="font-bold border rounded-2xl px-6 py-3 hover:bg-slate-50 disabled:bg-gray-200 disabled:text-gray-400 " :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed' ">Pause contract</button>
                            <button v-if="contract.action == 'accepted' && contract.status == 'paused'" @click="resumeContract" class="font-bold border rounded-2xl px-6 py-3 hover:bg-slate-50 disabled:bg-gray-200 disabled:text-gray-400 " :disabled="contract.status == 'closed' || contract.status == 'completed' ">Resume contract</button>
                            <button @click="closeContract" class="font-bold border border-red-500 text-red-500 rounded-2xl px-6 py-3 hover:bg-red-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:border-none" :disabled="contract.action == 'declined' || contract.status == 'completed' || contract.status == 'closed'">Close</button>
                        </div>
                        <!-- <p>close - Pause - Mark as complete - Fund</p> -->
                    </div>

                    <div v-if="contract.action == 'accepted'" class="mt-6">
                        <h2 class="font-bold text-xl">Feedback & Review</h2>
                        <p class="text-gray-600 mt-3 bg-tz_light_blue p-3 rounded-lg text-tz_blue">
                           <i class="bi bi-exclamation-circle"></i>  Feedback submission will only be available when contract is completed.
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button @click="feedbackModal = !feedbackModal" class="font-bold rounded-2xl px-6 py-3 bg-tz_blue text-white hover:bg-tz_dark_blue disabled:bg-gray-200 disabled:text-gray-400" :disabled="contract.status != 'completed' || contract.user_feedback.review">
                                <span v-if="contract.user_feedback.review">Feedback sent</span>
                                <span v-else>Send Feedback to Freelancer</span>
                            </button>
                        </div>
                    </div>
                   </div>
                    
                </div>

                <!-- contract tracker -->
                <ol v-if="false" class="flex items-center">
                    <li class="relative w-full mb-6">
                        <div class="flex items-center">
                            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg class="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </div>
                            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div class="mt-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Step 1</h3>
                        </div>
                    </li>
                    <li class="relative w-full mb-6">
                        <div class="flex items-center">
                            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg class="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </div>
                            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div class="mt-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
                        </div>
                    </li>
                    <li class="relative w-full mb-6">
                        <div class="flex items-center">
                            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg class="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </div>
                            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div class="mt-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
                        </div>
                    </li>
                    <li class="relative w-full mb-6">
                        <div class="flex items-center">
                            <div class="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-0 ring-white dark:bg-gray-700 sm:ring-8 dark:ring-gray-900 shrink-0">
                                <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Step 3</h3>
                        </div>
                    </li>
                </ol>

    </div>  
</template>
<script>
import TemplateView from '../TemplateView.vue';
import axios from 'axios';
import { formatToRelativeTime } from '@/utils/dateFormat';
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import Modal from '@/components/Modal.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';
import PageTitle from '@/components/PageTitle.vue';

export default {
    name: "ContractsListPageView",
    components: { TemplateView, SkeletonLoader, Modal, FullPageLoading, PageTitle },
    data(){
        return{
            loading: '',
            user: '',
            contract: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`,
            },

            feedback: {
                rating: '',
                review: '',
            },

            feedbackModal: false,

            rating: [],
            review_type: [
                "Communication",
                "Requirements",
                "Payment Promptness",
                "Project Clarity and Scope",
                "Overall Satisfaction"
            ],
        }
    },
    methods: {
        readableTimeFormat(time){
            return formatToRelativeTime(time);
        },

        selected(value, section) {
            this.rating[section] = value;
        },


        async getUser(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`, { headers });
                // console.log("user data: ", response)
                this.user = response.data.user;
            }catch(error){
                console.log(error)
            }
        },

        async getContract(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts/${this.$route.params.contract_id}`, { headers });
                console.log(response);
                this.contract = response.data.contract;
            }catch(error){
                console.log(error);
                if(error.response.status == 404){
                    this.$router.push("/404");
                }
            }
        },

        async acceptOffer(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/accept/${this.$route.params.contract_id}`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("accept contract error: ", error)
            }
        },

        async declineOffer(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/decline/${this.$route.params.contract_id}`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("accept contract error: ", error)
            }
        },

        async markAsComplete(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/complete`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("complete contract error: ", error)
            }
        },

        async pauseContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/pause`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("pause contract error: ", error)
            }
        },

        async closeContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/close`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("close contract error: ", error)
            }
        },

        async resumeContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/resume`, {}, { headers } );
                console.log("accept contract res: ", response);
                alert(response.data.message);
                window.location.reload();
            }catch(error){
                console.log("close contract error: ", error)
            }
        },

        async submitFeedback(){
            this.loading = true;
            const headers = this.headers;
            // console.log(this.user.role, this.feedback);

            // CALCULATE THE OVER ALL RATING....
                if(this.rating.length >= 5){
                    const calculated_rating = this.rating.reduce((acc, value) => {return acc + value }, 0) / 5;
                    // console.log("calcuated rating: ", calculated_rating);
                    this.feedback.rating = calculated_rating;
                };
            // RATING CALCULATION ENDS HERE....


            // LOGGED IN AS USER AND RATING THE EMPLOYER >>>>>>>>>
            if(this.user.role == 'user'){
                try{
                    const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/user-feedback`, this.feedback, { headers });
                    // console.log(response);
                    this.loading = false;
                    window.location.reload()
                }catch(error){
                    console.log(error)
                }
            } 
            // LOGGED IN AS EMPLOYER AND RATING THE USER >>>>>>>>>>
            if(this.user.role == 'employer'){
                try{
                    const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/employer-feedback`, this.feedback, { headers });
                    // console.log(response);
                    this.loading = false;
                    window.location.reload()
                }catch(error){
                    console.log(error)
                }
            }
        }
    },
    computed: {
        
    },
    mounted(){
        this.getUser();
        this.getContract();
        
    }
}
</script>
<style scoped>
    /* This style is used to visually represent the rating as custom-designed boxes */

.rating{
    @apply flex flex-row justify-between w-[300px] text-xl gap-4
}

.rating-item {
  @apply relative cursor-pointer
}

.sr-only{
    @apply absolute opacity-0 w-[1px] h-[1px] -m-[1px] p-0 overflow-hidden
}

/* Style for the custom-designed rating boxes */
.custom-rating-box {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.selected {
 @apply bg-tz_blue text-white
}


.feedback_row{
    @apply flex flex-row flex-wrap gap-3 mb-3 border-b pb-3 dark:border-b-gray-500
}
.closeBtn{
    right: 0px !important;
}

.tz_rate {
    @apply border dark:border-gray-500 rounded-md w-[35px] h-[35px] flex justify-center items-center cursor-pointer;
}
</style>