<template>
    <!--HTML NAIRA SIGN--- &#8358; &#x20A6; -->
    <div class="h-full flex flex-col relative">
       <PageTitle>Overview & Earnings</PageTitle>
       <div class="relative h-full flex flex-col p-5">
            <!-- <FullPageLoading/> -->
            <p class="text-2xl">Total Earnings: ₦ 0.00 </p>
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

export default {
    name: "OverviewPageView",
    components: { TemplateView, ContractStatus, PageTitle, FullPageLoading },
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
       
    },
    mounted(){

    }
}
</script>
<style scoped>
    
</style>