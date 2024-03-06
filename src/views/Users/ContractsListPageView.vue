<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>All Contracts</template>
            <template #page-contents>
                <div>
                    <div class="flex flex-row gap-2 p-5 border-b">
                        <input type="search" class="px-4 py-2 bg-light_blue rounded-md" placeholder="Search all types of jobs">
                        <button class="bg-light_blue text-blue px-4 py-2 rounded-md hover:bg-blue hover:text-white">
                            <i class="bi bi-search"></i> <span>Search</span>
                        </button>
                    </div>
                </div>

                <div v-if="!contracts">Loading Contracts...</div>
                <div v-if="contracts" class="flex flex-col overscroll-y-scroll" v-for="(contract, contract_id) in contracts">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-light_blue">
                        <div class="flex flex-row justify-between items-center">
                            <RouterLink :to="'/contracts/' + contract._id">
                                <div class="text-2xl font-bold text-blue underline">{{ contract.job.title }}</div>
                            </RouterLink>
                            <!-- <button class="border rounded-full h-14 w-14 hover:bg-gray-200 ">
                                <i class="bi bi-three-dots"></i>
                            </button> -->
                        </div>
                        <div>
                            <div class="text-xl font-bold">Employer {{ contract.employer.firstname }} {{ contract.employer.lastname }}</div>
                            <div class="text-xl font-bold">Freelancer {{ contract.user.firstname }} {{ contract.user.lastname }} <br/> <span class=" font-thin text-sm">{{ contract.user.email }}</span></div>
                            <div>{{ contract.employer.company_name }}</div>
                            <div>${{ contract.job.budget.toLocaleString() }} Budget</div>
                        </div>
                        <div class="flex flex-row gap-3">
                            <span class="px-4 py-1 text-white rounded-md text-xl" 
                            :class="[contract.status == 'open'?'bg-blue':'', 
                                    contract.status == 'paused'?'bg-orange-500':'',
                                    contract.status == 'completed'?'bg-green':'',
                                    contract.status == 'closed'?'bg-gray-500':''
                                    ]">
                                {{ contract.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';

export default {
    name: "ContractPageView",
    components: { TemplateView, ContractStatus },
    data(){
        return{
            contracts: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
        }
    },
    methods:{
        // get all user contracts...
        async getContracts(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts`,  { headers } );
                console.log("contracts :", response);
                this.contracts = response.data.contracts.reverse();
            }catch(error){
                console.log("contracts :", error);
            }
        }
    },
    mounted(){
        this.getContracts();
    }
}
</script>
<style scoped>
    
</style>