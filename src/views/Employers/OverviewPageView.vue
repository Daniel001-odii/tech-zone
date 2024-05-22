<template>
    <FullPageLoading v-if="loading"/>

    <Modal :name="'Contract Review'" :modal_active="show_review_modal">
        <template #body>
          <div class="flex flex-row gap-3 w-96">
            <img :src="employer.profile.image_url" class="h-10 w-10 rounded-full"/>
            <div class="flex flex-col">
                <p>{{ employer.company_name }}</p>
                <div class="flex flex-col">
                    <p class="inline-block mr-2 text-tz_blue" v-html="generateStarRatingFromInteger(feedback.rating)"></p>
                    <span class=" italic">"{{ feedback.review }}"</span>
                </div>
            </div>
          </div>
        </template>
        <template #footer></template>
    </Modal>

    <!--HTML NAIRA SIGN--- &#8358; &#x20A6; -->
    <div class="h-full flex flex-col relative">
       <PageTitle>Overview & Earnings</PageTitle>
       <div class="relative h-full flex flex-col p-5">
           <div class="flex flex-row flex-wrap gap-3">
                <div class="flex flex-row items-center justify-center gap-3 bg-blue-500 bg-opacity-20 p-3 min-w-60">
                    <div class="p-3 rounded-full bg-blue-500 h-12 w-12 flex justify-center items-center text-white">
                        <span class="font-bold">&#8358;</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-lg">Total Expenses</span>
                        <span>&#8358;0.00</span>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-center gap-3 bg-orange-500 bg-opacity-20 p-3 min-w-60">
                    <div class="p-3 rounded-full bg-orange-500 h-12 w-12 flex justify-center items-center text-white">
                        <i class="bi bi-briefcase"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-lg">Total Jobs Posted</span>
                        <span>{{ user.jobs_posted }}</span>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-center gap-3 bg-green-500 bg-opacity-20 p-3 min-w-60">
                    <div class="p-3 rounded-full bg-green-500 h-12 w-12 flex justify-center items-center text-white">
                        <i class="bi bi-bookmark-star"></i>
                        
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-lg">Average Rating</span>
                        <span>{{ user.rating }}</span>
                    </div>
                </div>
           </div>

           <div class="flex flex-col mt-5">   
                <span></span>
                <div v-if="!loading && contracts.length > 0">
                    <h2 class="font-bold">Contracts Details</h2>
                
                    <div class="flex overflow-x-auto overflow-y-visible">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <!-- <th scope="col" class="p-4">
                                        <div class="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                        </div>
                                    </th> -->
                                    <th scope="col" class="px-6 py-3">
                                        Contract Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Rating
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Earnings
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                    Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(contract, contract_id) in contracts" :key="contract_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <!-- <img class="h-10 w-10 rounded-full" :src="contract.employer.profile.image_url" alt="company image"> -->
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{{ contract.job.title }}</div>
                                            <div class="font-normal text-gray-500">{{ contract.type }} - {{ contract.user.firstname }} {{ contract.user.lastname }} </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="contract.employer_feedback.rating > 0">{{ contract.employer_feedback.rating }}</span>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="px-6 py-4">
                                    N0.00
                                    </td>
                                    <td class="px-6 py-4">
                                        <ContractStatus :type="`${contract.status}`"/>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button class="btn min-w-[180px]" v-if="contract.employer_feedback.rating > 0" @click="showContractReview(contract.user, contract.employer_feedback)">open review <i class="bi bi-arrow-right ml-2"></i></button>
                                        <span v-else>No review yet</span>
                                    </td>
                                    <td class="px-6 py-4 relative">
                                        <ActionDropdown>
                                            <RouterLink :to="`/client/contracts/${contract._id}`" class="hover:bg-slate-100 dark:hover:bg-slate-600 p-3">
                                                <i class="bi bi-gift"></i> 
                                                View Contract
                                            </RouterLink>
                                            <RouterLink :to="`/client/contracts/${contract._id}/watch`" class="hover:bg-slate-100 dark:hover:bg-slate-600 p-3">
                                                <i class="bi bi-clock-history"></i> 
                                                Open in Taskwatch
                                            </RouterLink>
                                        </ActionDropdown>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="!loading && contracts.length <= 0" class="flex flex-col justify-center items-center mt-5">
                    
                    <Vue3Lottie
                        :animationData="emptyBox"
                        :height="200"
                        :width="200"
                    />
                    <span class="text-gray-400">You have no contracts yet...</span>
                </div>
           </div>
       </div>

    </div>



</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';
import PageTitle from '@/components/PageTitle.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';

import { Dropdown } from 'flowbite';

import ActionDropdown from '@/components/ActionDropdown.vue';
import Modal from '@/components/Modal.vue';

import { generateStarRatingFromInteger } from '@/utils/ratingStars';
import emptyBox from '../../lottie/emptyBox.json'

export default {
    name: "OverviewPageView",
    components: { 
        TemplateView, 
        ContractStatus, 
        PageTitle, 
        FullPageLoading, 
        ActionDropdown,
        Modal,
     },
    data(){
        return{
            contracts: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            completed_contracts: [],
            user: '',
            loading: false,

            dropdown: [],
            show_review_modal: false,

            employer: '',
            feedback: {
                review: '',
                rating: ''
            },
            generateStarRatingFromInteger,
            emptyBox,
        }
    },
    methods:{
        showContractReview(employer, employer_feedback){
            this.feedback = employer_feedback;
            this.employer = employer;
            this.show_review_modal = !this.show_review_modal;
        },
        // get user...
        async getUser(){
            try{
                const headers = this.headers;
                const response = await axios.get(`${this.api_url}/user`, { headers });
                this.user = response.data.user;
                console.log("user :", response);
            }catch(error){
                console.log("error getting user: ", error);
            }
        },

         // get all user contracts...
         async getContracts(){
            this.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts`,  { headers } );
                console.log("contracts :", response);
                this.contracts = response.data.contracts.reverse();

                // get completed contract...
                const completed = [];
                this.contracts.forEach(contract => {
                    if(contract.status == 'completed'){
                        completed.push(contract);
                        this.completed_contracts = completed.length;
                    }
                });
                this.loading = false;
            }catch(error){
                console.log("contracts :", error);
                this.loading = false;
            }
        }
       
    },
 
    mounted(){
     
    },
    created() {
        this.getContracts();
        this.getUser();
    },
}
</script>
<style scoped>
    
</style>