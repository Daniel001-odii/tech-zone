<template>
    <!-- TOAST HERE -->
        <Toast/>
    <!-- *********** -->

    <PageTitle>Contracts</PageTitle>
    <FullPageLoading v-if="loading"/>

    <Modal :name="'Submit a review'" :modal_active="feedbackModal">
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
                    <p>Write an honest review to the Talent</p>
                    <span class=" text-sm bg-blue-100 text-blue-700 p-3 rounded-md">The talent will be able to see your review once submitted</span>
                    <textarea v-model="feedback.review" :placeholder="`a very honest review about your experience working with ${contract.user.firstname} ${contract.user.lastname}`" class="form_input text-xl"></textarea>
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
             <span v-if="contract.action == 'accepted'" class=" bg-green-300 bg-opacity-20 text-green-700 dark:text-green-300 p-5 rounded-lg mb-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} accepted this offer </span>
            <span v-if="contract.action == 'declined'" class=" bg-red-300 bg-opacity-20 text-red-700 dark:text-red-300 p-5 rounded-lg mb-3"> {{ contract.user.firstname }} {{ contract.user.lastname }} declined this offer </span>

            <h1 v-if="contract.action == 'pending'" class="text-3xl font-bold p-3">you sent {{ contract.user.firstname }} {{ contract.user.lastname }} a job contract offer!</h1>
            <h1 class="font-bold text-2xl bg-tz_light_blue p-5 rounded-lg">{{ contract.job.title }}</h1>

            <div class="flex flex-col md:flex-row gap-3">
                <div class="text-left gap-3 flex flex-col mt-3 md:w-[70%]">
                    <table>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Start Date</td>
                                <td class="px-6 py-4">{{ formatTimestampWithoutTime(contract.createdAt) }}</td>
                            </tr>
                            <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">End Date</td>
                                <td class="px-6 py-4">09/05/2024</td>
                            </tr> -->
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Job Type</td>
                                <td class="px-6 py-4">
                                    <span v-if="contract.job.location.remote">Remote</span>
                                    <span v-else>On site</span>
                                </td>
                            </tr>
                        
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Your Budget</td>
                                <td class="px-6 py-4">₦{{ contract_budget.toLocaleString() }}</td>
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
                                <td class="px-6 py-4">Not categorised</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Requires Taskwatch</td>
                                <td class="px-6 py-4">{{ contract.job.requires_taskwatch }}</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Funding Status</td>
                                <td class="px-6 py-4">
                                    <span v-if="contract.funded" class="rounded-md text-white bg-green-500 px-4 py-1">funded</span>
                                    <span v-else class="rounded-md text-white bg-red-500 px-4 py-1">not funded</span>
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Contract Status</td>
                                <td class="px-6 py-4">
                                    <span class="rounded-md text-white px-4 py-1" 
                                    :class="{'bg-blue-500':contract.status == 'open', 'bg-orange-500':contract.status == 'paused', 'bg-red-500': contract.status == 'closed', 'bg-green-500':contract.status == 'completed'}"> {{ contract.status }} </span>
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Offer Date</td>
                                <td class="px-6 py-4">{{ formatTimestampWithoutTime(contract.createdAt) }}</td>
                            </tr>
                            <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 text-red-500">Offer Expiry</td>
                                <td class="px-6 py-4 text-red-500">{{ contract.createdAt }}</td>
                            </tr> -->
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">Contract terms</td>
                                <td class="px-6 py-4">ApexTek terms of service</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- CONTRACT BUDGET -->
                    <div class="mt-6" v-if="contract.status != 'closed' && contract.status != 'completed'">
                        <h2 class="font-bold text-xl">Contract Budget</h2>
                        <p class="flex flex-row gap-3 mt-3 bg-tz_light_blue p-3 rounded-lg text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> 
                            <span>The contract budget should only be modified when the freelancer has proposed a counter offer.<br/>This will update the contracts budget accordingly while the job budget remains thesame.</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-3 justify-start mt-3">
                            <form @submit.prevent="updateContractBudget" class="flex flex-row flex-wrap gap-3">
                                <div class="flex flex-row items-center border pl-3 rounded-md dark:border-gray-600 justify-center ">
                                    <div class=" border-r pr-3 h-full dark:border-gray-500 flex justify-center items-center">&#8358;</div>
                                    <input type="number" class="bg-transparent border-none" v-model="contract_budget" :disabled="contract.funded">
                                </div>
                               

                                <button class="btn" :disabled="contract.budget == contract_budget">Save changes</button>
                                <!-- <SplitButton
                                class="border dark:border-gray-600 pl-3"
                                pt:ptMenu="dark:bg-gray-600 text-red-500"
                                :label="funding_loading ? 'loading...':'Save changes'" @click="updateContractBudget" :model="items" outlined/> -->
                
                            </form>
                        </div>
                    </div>

                    
                    <!-- CONTRACT ACTIONS -->
                    <div class="mt-6" v-if="contract.status != 'closed' && contract.status != 'completed'">
                        <h2 class="font-bold text-xl">Contract Actions</h2>
                        <p class="flex flex-row gap-3 mt-3 bg-tz_light_blue p-3 rounded-lg text-blue-300">
                            <i class="bi bi-exclamation-circle"></i> 
                            <span>The Freelancer will be notified for any action you perform on the contract.</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-3 justify-start mt-3">
                            <form @submit.prevent="performContractAction" class="flex flex-row gap-3">
                                <select class="form_input" v-model="contract_action">
                                    <option  disabled value="">Select Action</option>
                                    <option v-if="!contract.funded" value="fund">Fund Contract</option>
                                    <option v-if="contract.action == 'accepted' && contract.status == 'paused'" value="resume" :disabled="contract.status == 'closed' || contract.status == 'completed' ">Resume Contract</option>
                                    <option value="pause" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed' ">Pause Contract</option>
                                    <option value="complete" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed'">Mark as complete Contract</option>
                                    <option  value="close" :disabled="contract.action == 'declined' || contract.status == 'completed' || contract.status == 'closed'">Close Contract</option>
                                </select>

                                <button class="btn" :disabled="contract_action == ''">
                                    <span v-if="contract_action == 'fund'">Fund now</span>
                                    <span v-else>Save changes</span>
                                </button>
                            </form>
                            <!-- <div class="flex flex-row gap-3 w-full">
                                <button v-if="contract.action == 'accepted'" @click="pauseContract" class="contract_activity_btn border border-tz_blue text-blue-400" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed' ">Pause contract</button>
                                <button @click="closeContract" class="bg-red-500 rounded-md px-12 font-bold" :disabled="contract.action == 'declined' || contract.status == 'completed' || contract.status == 'closed'">Close</button>
                            </div>
                            <button v-if="contract.action == 'accepted'" @click="markAsComplete" class="contract_activity_btn bg-green-500" :disabled="contract.action == 'declined' || contract.status == 'paused' || contract.status == 'closed' || contract.status == 'completed'">Mark as complete</button>
                            <button v-if="contract.action == 'accepted' && contract.status == 'paused'" @click="resumeContract" class="contract_activity_btn bg-tz_blue" :disabled="contract.status == 'closed' || contract.status == 'completed' ">Resume contract</button> -->
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
                            <span> Feedback submission will only be available when contract is completed or closed.</span>
                        </p>
                        <div class="flex flex-row flex-wrap gap-5 justify-start mt-3">
                            <button v-if="!contract.user_feedback.review" @click="feedbackModal = !feedbackModal" class="btn" :disabled="contract.status != 'completed' && contract.status != 'closed'">
                                Send Feedback to Freelancer
                            </button>
                            <button v-else class="btn" disabled>
                                feedback sent successfully
                            </button>
                        </div>
                    </div>

                </div>

                <!-- CONTRACT USER DETAILS AREA -->
                <div class="flex flex-col md:w-[30%] md:items-center mt-6 md:m-0 md:pl-5">
                    <div class="flex flex-row items-start gap-6 mt-6 flex-wrap">
                        <RouterLink :to="`/users/${contract.user._id}`">
                            <img :src="contract.user.profile.image_url" class="rounded-full w-14 h-14 outline outline-blue-500 outline-offset-4">
                        </RouterLink>
                        <div>
                            <RouterLink :to="`/users/${contract.user._id}`">
                                <p class="text-xl font-bold">{{ contract.user.firstname }} {{ contract.user.lastname }}</p>
                            </RouterLink>
                            <p class="text-gray-300">{{  contract.user.profile.title }}</p>
                            <p class="text-gray-300">joined: {{  formatTimestampWithoutTime(contract.user.created) }}</p>
                            <p class="text-white bg-blue-500 rounded-full px-5 w-fit">Freelancer</p>
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
import { formatTimestampWithoutTime } from '@/utils/dateFormat';

import Toast from 'primevue/toast';
import InputNumber from 'primevue/inputnumber';

import { useToast } from "vue-toastification";

import SplitButton from 'primevue/splitbutton';

export default {
    name: "ContractsListPageView",
    components: { 
        TemplateView, 
        SkeletonLoader, 
        Modal, 
        FullPageLoading, 
        PageTitle, 
        DismissableAlert,
        Toast,
        InputNumber,
        SplitButton
    },
    data(){
        return{
            funding_loading: false,
            contract_action: '',
            contract_budget: '',

            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

            formatTimestampWithoutTime,

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
            contractOffer,
            toast: useToast(),
            items: [
                {
                    label: 'Save and Fund Contract',
                    command: () => {
                        this.updateContractBudget();
                    }
                },
                
            ]
        }
    },
    methods: {
        
        showAlertBox(){
            this.$toast("I'm a toast!");
        },

        readableTimeFormat(time){
            return formatToRelativeTime(time);
        },

        selected(value, section) {
            this.rating[section] = value;
        },

        performContractAction(){
            const action = this.contract_action;
            if(action == 'pause'){
                this.pauseContract();
            } else if(action == 'close'){
                this.closeContract();
            } else if(action == 'complete'){
                this.markAsComplete();
            } else if(action == 'resume'){
                this.resumeContract();
            } else if(action == 'fund'){
                // fund contract...
                this.fundContract();
            }
        },

        async fundContract(){
            try{
                this.loading = true;
                const headers = this.headers;
                const response = await axios.post(`${this.api_url}/contracts/${this.contract._id}/funds`, { headers });
                window.location.href = response.data.checkout_url;
                console.log("response from funding: ", response);
            }catch(error){
                this.toast.error(error.response.data.message);
                console.log("error funding contract: ", error);
                this.loading = false;
            }
        },

        async updateContractBudget(){
            const headers = this.headers;
            const form = {
                budget: this.contract_budget,
            }
            try{
                const response = await axios.patch(`${this.api_url}/contracts/${this.contract._id}/budget`, form, { headers });
                console.log("updated budget: ", response);
                this.toast.success(response.data.message);
            }catch(error){
                console.log("error updating budget: ", error.response);
                this.toast.error(error.response.data.message);
            }
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
                console.log("the contract: ", response);
                const contract = response.data.contract;
                this.contract = response.data.contract;
                if(contract.budget){
                    this.contract_budget = contract.budget;
                } else {
                    this.contract_budget = contract.job.budget;
                }
            }catch(error){
                console.log(error);
                if(error.response.status == 404){
                    this.$router.push("/404");
                }
            }
        },

        async markAsComplete(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/complete`, {}, { headers } );
                console.log("accept contract res: ", response);
                this.toast.success(response.data.message);
                window.location.reload();
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        },

        async pauseContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/pause`, {}, { headers } );
                console.log("accept contract res: ", response);
                this.toast.success(response.data.message);
                setTimeout(function(){
                        window.location.reload()
                    }, 3000)
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        },

        async closeContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/close`, {}, { headers } );
                // console.log("accept contract res: ", response);
                this.toast.success(response.data.message);
                setTimeout(function(){
                        window.location.reload()
                    }, 3000)
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        },

        async resumeContract(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/resume`, {}, { headers } );
                console.log("accept contract res: ", response);
                this.toast.success(response.data.message);
                setTimeout(function(){
                        window.location.reload()
                    }, 3000)
            }catch(error){
                this.toast.error(error.response.data.message);
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
                try{
                    const response = await axios.post(`${this.api_url}/contracts/${this.$route.params.contract_id}/employer-feedback`, this.feedback, { headers });
                    console.log("feedback sent: ", response);
                    this.loading = false;
                    this.toast.success(response.data.message);

                    setTimeout(function(){
                        window.location.reload()
                    }, 3000)
                    
                }catch(error){
                    console.log(error);
                    this.toast.error(error.response.data.message);
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

.contract_activity_btn{
    @apply font-bold rounded-md px-12 py-3 dark:disabled:bg-gray-600 disabled:text-gray-400
}

</style>