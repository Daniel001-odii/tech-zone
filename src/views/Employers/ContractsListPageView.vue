<template>
    <PageTitle>Contracts & hires</PageTitle>
    <div>
        <!-- <TemplateView :leftNav="true">
            <template #page-title>All Contracts</template>
            <template #page-contents> -->
                <div>
                    <div class="gap-2 flex flex-row p-2 md:p-5  border-b dark:border-gray-600">
                        <input type="search" class=" form_input" placeholder="Search all types of jobs" v-model="search_term">
                    </div>
                </div>

                <div v-if="loading && !contracts" v-for="box in 2">
                    <SkeletonLoader/>
                </div>


                <div v-if="contracts" class="flex flex-col overscroll-y-scroll" v-for="(contract, contract_id) in contract_list()">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue dark:border-gray-500">
                        <div class="flex flex-row justify-between items-center">
                            <RouterLink :to="'/client/contracts/' + contract._id">
                                <div class="text-2xl font-bold text-tz_blue underline">{{ contract.job.title }}</div>
                            </RouterLink>
                            <!-- <button class="border rounded-full h-14 w-14 hover:bg-gray-200 ">
                                <i class="bi bi-three-dots"></i>
                            </button> -->
                        </div>
                        <div>
                            <div class="text-xl font-bold" v-if="contract.employer">Employer {{ contract.employer.firstname }} {{ contract.employer.lastname }}</div>
                            <div class="text-xl font-bold" v-if="contract.user">Freelancer {{ contract.user.firstname }} {{ contract.user.lastname }}<span class="text-sm font-medium"> - {{  contract.type }} </span><br/> <span class=" font-thin text-sm">{{ contract.user.email }}</span></div>
                            <div>{{ contract.employer.company_name }} </div>
                            <div>₦{{ contract.job.budget.toLocaleString() }} Budget</div>
                        </div>
                        <div class="flex flex-row gap-3">
                            <ContractStatus :type="contract.status"/>
                            
                        </div>
                    </div>
                </div>

                <!-- {{  contract_list  }} -->
                <div v-if="search_term && !contract_list().length" class=" p-8 text-center text-red-400">No matches found!</div>
                
                <div v-if="contracts && contracts.length <= 0">
                    <div class="flex flex-col justify-center items-center w-full mt-6">
                        <img class=" h-40 w-40" src="../../assets/images/empty open mailbox.svg">
                        <span class="font-bold mt-4 text-gray-400">You Have No Contracts Yet</span>
                    </div>
                </div>

            <!-- </template>
        </TemplateView> -->
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import PageTitle from '@/components/PageTitle.vue';

export default {
    name: "ContractPageView",
    components: { TemplateView, ContractStatus, SkeletonLoader, PageTitle },
    data(){
        return{
            contracts: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            search_term: '',
            loading: null,
        }
    },
    methods:{
        // get all user contracts...
        contract_list() {
            if(this.contracts){
                return this.contracts.filter((contract) => 
                contract.job.title.toLowerCase().includes(this.search_term.toLowerCase())
                || contract.job.description.toLowerCase().includes(this.search_term.toLowerCase())
                );
            }
        },

        async getContracts(){
            this.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts`,  { headers } );
                console.log("contracts :", response);
                this.contracts = response.data.contracts.reverse();
                this.loading = false;
            }catch(error){
                console.log("contracts :", error);
                this.loading = false;
            }
        }
    },
    created(){
        this.getContracts();
    }
}
</script>
<style scoped>
    
</style>