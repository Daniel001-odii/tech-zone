<template>
     <!-- ALERTS AND NOTIFICS -->
     <div class="fixed bottom-10 right-0 left-0 flex justify-center">
            <div v-for="alert in alerts" class="flex flex-col gap-3 relative">
                <DismissableAlert  :type="alert_type">{{ alert_message }}</DismissableAlert>
            </div>
    </div>

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

    <div>
                
        <div v-if="!contract" class="p-5 gap-3 flex flex-col">
            <SkeletonLoader/>
            <div class="flex flex-row gap-5 justify-start m-5">
                <button class="font-bold border rounded-2xl px-6 py-3 bg-gray-300 text-transparent">Decline Offer</button>
                <button class="font-bold rounded-2xl px-6 py-3 bg-gray-300 text-transparent">Accept Offer</button>
            </div>
        </div>

        <!-- LOADED CONTRACT HERE -->        
        <div v-if="contract" class="flex flex-col p-5">
            <!-- TALENT DECISION TOAST -->
            <span v-if="contract.action == 'accepted'" class=" bg-green-300 bg-opacity-20 text-green-300 p-5 rounded-lg mb-3"> You accepted this offer </span>
            <span v-if="contract.action == 'declined'" class=" bg-red-300 bg-opacity-20 text-red-300 p-5 rounded-lg mb-3"> You declined this offer </span>



            <!-- if contract is still pending -->
            <Vue3Lottie v-if="contract.action == 'pending'"
                :animationData="contractOffer"
                :height="200"
                :width="200"
            />

            <h1 v-if="contract.action == 'pending'" class="text-3xl font-bold p-3">{{ user.firstname }} you received a job contract offer!</h1>
            <h1 class="font-bold text-2xl bg-tz_light_blue p-5 rounded-lg">{{ contract.job.title }}</h1>

            <div class="gap-3 flex flex-col md:flex-row p-3">
                <div class="flex flex-col md:w-[50%]">
                    <!-- <div>
                        <h2 class="font-bold text-lg">Descripton</h2>
                        <p>{{  contract.job.description }}</p>
                    </div> -->

                    <div class="mt-3">
                        <h2 class="font-bold text-lg">Contract Details</h2>
                        <div>
                            <table>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Start Date</td>
                                        <td class="px-6 py-4">09/05/2024</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">End Date</td>
                                        <td class="px-6 py-4">09/05/2024</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Job Type</td>
                                        <td class="px-6 py-4">
                                            <span v-if="contract.job.location.remote">Remote</span>
                                            <span v-else>On site</span>
                                        </td>
                                    </tr>
                                
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Budget</td>
                                        <td class="px-6 py-4">₦{{ contract.job.budget.toLocaleString() }}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">ApexTek Service Fee</td>
                                        <td class="px-6 py-4">-15%</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Amount you should receive</td>
                                        <td class="px-6 py-4">₦{{ (contract.job.budget - (contract.job.budget * 15)/100).toLocaleString() }}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Budget Type</td>
                                        <td class="px-6 py-4">{{ contract.job.budget_type }}</td>
                                    </tr>

                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Job Location</td>
                                        <td class="px-6 py-4">
                                            <span v-if="contract.job.location.remote">Remote</span>
                                            <span v-else>{{ contract.job.location.state }}</span>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Job Category</td>
                                        <td class="px-6 py-4">Not categorised yet...</td>
                                    </tr>
                                    <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Working Hours</td>
                                        <td class="px-6 py-4"></td>
                                    </tr> -->
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Offer Date</td>
                                        <td class="px-6 py-4">{{ contract.createdAt }}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4 text-red-500">Offer Expiry</td>
                                        <td class="px-6 py-4 text-red-500">{{ contract.createdAt }}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">Contract terms</td>
                                        <td class="px-6 py-4">ApexTek terms of service</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- CONTRACT ACCEPT AND DECLINE BUTTON -->
                    <div class="mt-3 flex flex-col justify-center" v-if="contract.action == 'pending'">
                        <p class="text-gray-400">Once you accept the offer you can begin working on the contract right away</p>
                        <div class="flex flex-row gap-3 mt-3 items-stretch justify-stretch">
                            <button @click="declineOffer" class="font-bold px-12 rounded-md py-2 border border-tz_blue text-tz_blue" :disabled="contract.action != 'pending'">Decline Offer</button>
                            <button @click="acceptOffer" class="font-bold px-12 rounded-md py-2 bg-tz_blue text-white" :disabled="contract.action != 'pending'">Accept Offer</button>
                        </div>
                    </div>
                
                    <!-- FEEDBACK AND REVIEW  -->
                    <div v-if="contract.action == 'accepted'" class="mt-6">
                        <h2 class="font-bold text-xl">Feedback & Review</h2>
                        <p class=" bg-blue-300 bg-opacity-20 p-3 rounded-lg text-blue-500 dark:text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> Feedback submission will only be available when contract is completed.
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button @click="feedbackModal = !feedbackModal" class="font-bold px-12 rounded-md py-2 bg-tz_blue text-white" :disabled="contract.status != 'completed' || contract.employer_feedback.review">
                                <span v-if="contract.status == 'completed' && contract.employer_feedback.review">Feedback sent</span>
                                <span v-else>Send Feedback to client</span>
                            </button>
                        </div>
                        
                        
                        <h2 class="font-bold text-xl mt-6">Contract Watch</h2>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <RouterLink :to="`/in/contracts/${contract._id}/watch`">
                                <button class="font-bold px-12 rounded-md py-2 bg-tz_blue text-white">
                                    <i class="bi bi-stopwatch"></i>
                                    Watch Contract
                                </button>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- EMPLOYER DETAIL AREA -->
                <div class="flex flex-col md:w-[50%] md:items-center mt-6 md:m-0">
                    <div class="flex flex-row flex-wrap gap-3">
                        <!-- <div class="border-4 border-tz_blue h-20 w-20 rounded-full overflow-hidden p-1"> -->
                            <img :src="contract.employer.profile.image_url" class="rounded-full w-14 h-14 outline outline-blue-500 outline-offset-4">
                        <!-- </div> -->
                        <div>
                            <p class=" block text-xl font-bold">{{ contract.employer.profile.company_name }}</p>
                            <p class=" blocks">{{ contract.employer.firstname }} {{ contract.employer.lastname }}</p>
                            <p class=" text-sm text-gray-400 mt-1">sent {{ readableTimeFormat(contract.created) }}</p>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        

       
 

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
import DismissableAlert from '@/components/DismissableAlert.vue';
import contractOffer from '../../lottie/contract-offer.json';

export default {
    name: "ContractsListPageView",
    components: { TemplateView, SkeletonLoader, Modal, FullPageLoading, PageTitle, DismissableAlert },
    data(){
        return{
            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

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
            contractOffer
        }
    },
    methods: {
        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },

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
                // if(!this.user.profile.title){
                //     alert("please update your profile");
                //     this.$router.push("/profile/complete");
                // }
            }catch(error){
                console.log(error)
            }
        },

        async getContract(){
            const headers = this.headers;
            try{
                this.loading = true;
                const response = await axios.get(`${this.api_url}/contracts/${this.$route.params.contract_id}`, { headers });
                console.log(response);
                this.contract = response.data.contract;
                this.loading = false;
            }catch(error){
                console.log(error);
                this.loading = false;
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
                this.showAlertBox("success", response.data.message);
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
                this.showAlertBox("danger",response.data.message);
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
                this.showAlertBox("success", response.data.message);
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
                this.showAlertBox("warning", response.data.message);
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
                this.showAlertBox("danger", response.data.message);
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
                this.showAlertBox("success",response.data.message);
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
                    this.showAlertBox("success", "Feedback sent!");
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
                    this.showAlertBox("success", "Feedback sent!");
                    window.location.reload()
                }catch(error){
                    console.log(error)
                }
            }
        }
    },
    computed: {
        
    },
    created(){
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

button:disabled{
    @apply cursor-not-allowed
}

.contrac_activity_btn{
    @apply font-bold rounded-2xl px-6 py-3 bg-tz_blue text-white hover:bg-tz_dark_blue  dark:disabled:bg-gray-600 disabled:text-gray-400
}
</style>