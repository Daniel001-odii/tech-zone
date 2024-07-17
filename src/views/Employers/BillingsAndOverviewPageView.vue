<template>
    <div>
        <PageTitle>{{this.$route.name}}</PageTitle>

        <div v-if="loading">Loading...</div>
        <div v-else class="font-bold text-3xl">TOTAL SPENT: {{ employer.total_spent.toLocaleString() }}</div>
        <div>
            <p>contracts:</p>
            <div class="border m-4 text-2xl font-bold" v-for="contract in contracts">
                {{ contract.job.title }}<br/>
                {{ contract.budget }}<br/>
                {{ contract.user.firstname }}
                {{ contract.user.lastname }}
            </div>
            {{ contracts }}
        </div>
    </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue'
import axios from 'axios'

import { useToast } from 'vue-toastification'

    export default {
        name: "BillingsAndOVerviewPageView",
        components: {
            PageTitle,
        },

        data(){
            return{
                loading: false,
                contracts: [],
                employer: '',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`,
                },
                toast: useToast(),
            }
        },
        
        methods: {
            async getprojects(){
                try{
                    this.loading = true;
                    const headers = this.headers;
                    const response = await axios.get(`${this.api_url}/contracts/funded/all`, { headers });
                    console.log("funded contracts: ", response);
                    this.contracts = response.data.contracts;
                    this.employer = response.data.employer;
                    this.loading = false;
                }catch(error){
                    this.toast.error(error.response.data);
                    this.loading = false;
                }
            }
        },

        created(){
            this.getprojects();
        }
    }
</script>

<style scoped>

</style>