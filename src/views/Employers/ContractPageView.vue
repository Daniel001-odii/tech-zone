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
        <SkeletonLoader v-if="!contract && loading"/>
           
        <!-- LOADED CONTRACT HERE -->


        <!-- CONTRACT VIEWING FOR EMPLOYERS.... -->
        <div v-if="contract" class="flex flex-col p-5 text-left">
             <!-- TALENT DECISION TOAST -->
             <span v-if="contract.action == 'accepted'" class=" bg-green-300 bg-opacity-20 text-green-300 p-5 rounded-lg mb-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} accepted this offer </span>
            <span v-if="contract.action == 'declined'" class=" bg-red-300 bg-opacity-20 text-red-300 p-5 rounded-lg mb-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} declined this offer </span>

            <h1 v-if="contract.action == 'pending'" class="text-3xl font-bold p-3">you sent {{ contract.user.firstname }} {{ contract.user.lastname }} a job contract offer!</h1>
            <h1 class="font-bold text-2xl bg-tz_light_blue p-5 rounded-lg">{{ contract.job.title }}</h1>

            <div class="flex flex-col md:flex-row gap-3">
                <div class="text-left gap-3 flex flex-col mt-3 md:w-[70%]">
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
                                <td class="px-6 py-4">Your Budget</td>
                                <td class="px-6 py-4">₦{{ contract.job.budget.toLocaleString() }}</td>
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
                    
                    <!-- CONTRACT ACTIONS -->
                    <div class="mt-6">
                        <h2 class="font-bold text-xl">Contract Actions</h2>
                        <p class="flex flex-row gap-3 mt-3 bg-tz_light_blue p-3 rounded-lg text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> 
                            <span>The Freelancer will be notified for any action you perform on the contract.</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-3 justify-start mt-3">
                            <div class="flex flex-row gap-3 w-full">
                                <button v-if="contract.action == 'accepted'" @click="pauseContract" class="contrac_activity_btn border border-tz_blue text-blue-400" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed' ">Pause contract</button>
                                <button @click="closeContract" class="bg-red-500 rounded-md px-12 font-bold" :disabled="contract.action == 'declined' || contract.status == 'completed' || contract.status == 'closed'">Close</button>
                            </div>
                            <button v-if="contract.action == 'accepted'" @click="markAsComplete" class="contrac_activity_btn bg-green-500" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed'">Mark as complete</button>
                            <button v-if="contract.action == 'accepted' && contract.status == 'paused'" @click="resumeContract" class="contrac_activity_btn bg-tz_blue" :disabled="contract.status == 'closed' || contract.status == 'completed' ">Resume contract</button>
                        </div>
                    </div>

                    <!-- CONTRACT WATCH -->
                    <div v-if="contract.action == 'accepted'" class="mt-6">
                        <h2 class="font-bold text-xl mt-6">Contract Watch</h2>
                        <p class="flex flex-row gap-3 mt-3 bg-tz_light_blue p-3 rounded-lg text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> 
                            <span>Review tracked time spent on completing the contract by the Freelancer</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <RouterLink :to="`/client/contracts/${contract._id}/watch`">
                                <button class="font-bold px-12 rounded-md py-2 bg-tz_blue text-white">
                                    <i class="bi bi-stopwatch"></i>
                                   Review Contract watch
                                </button>
                            </RouterLink>
                        </div>
                    </div>

                    <!-- FEEDBACK AND REVIEW -->
                    <div v-if="contract.action == 'accepted'" class="mt-6">
                        <h2 class="font-bold text-xl">Feedback & Review</h2>
                        <p class="flex flex-row gap-3 mt-3 bg-tz_light_blue p-3 rounded-lg text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> 
                            <span>Feedback submission will only be available when contract is completed.</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button @click="feedbackModal = !feedbackModal" class="contrac_activity_btn" :disabled="contract.status != 'completed' || contract.user_feedback.review">
                                <span v-if="contract.user_feedback.review">Feedback sent</span>
                                <span v-else>Send Feedback to Freelancer</span>
                            </button>
                        </div>
                    </div>

                    
                    <p class="text-gray-400">contract status: {{ contract.status }}</p>
                </div>

                <!-- CONTRACT USER DETAILS AREA -->
                <div class="flex flex-col md:w-[30%] md:items-center mt-6 md:m-0">
                    <div class="flex flex-row items-start gap-6 mt-6 flex-wrap">
                        <img :src="contract.user.profile.image_url" class="rounded-full w-14 h-14 outline outline-blue-500 outline-offset-4">
                        <div>
                            <p class="text-xl font-bold">{{ contract.user.firstname }} {{ contract.user.lastname }}</p>
                            <p class="text-gray-300">{{  contract.user.profile.title }}</p>
                            <p class="text-gray-300">{{  contract.user.created }}</p>
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

.contrac_activity_btn{
    @apply font-bold rounded-md px-12 py-3 dark:disabled:bg-gray-600 disabled:text-gray-400
}
</style>