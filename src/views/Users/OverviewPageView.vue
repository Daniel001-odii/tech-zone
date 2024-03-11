<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Overview</template>
            <template #page-contents>
               <p class="p-5">Your overview..</p>
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
    name: "OverviewPageView",
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
       
    },
    mounted(){

    }
}
</script>
<style scoped>
    
</style>