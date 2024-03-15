<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>All Jobs</template>
            <template #page-contents>
                <div>
                    <div class="flex flex-row gap-2 p-5 border-b dark:border-gray-500">
                        <input type="search" class="form_input" placeholder="Search all types of jobs">
                    </div>
                </div>

                <div v-if="!jobs" v-for="box in 4">
                    <SkeletonLoader/>
                </div>

                <div v-if="jobs" class="flex flex-col overscroll-y-scroll" v-for="(job, job_id) in jobs" :key="job_id">
                    <!-- {{ job }} -->
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue dark:border-gray-500">
                        <div class="flex flex-row justify-between items-center">
                            <!-- <RouterLink :to="'/jobs/' + contract._id"> -->
                                <div class="text-2xl font-bold text-tz_blue underline">{{ job.title }}</div>
                            <!-- </RouterLink> -->
                            <button  :id="`dropdownHoverButton`" :data-dropdown-toggle="`dropdownHover${job_id}`" >
                                <i class="bi bi-three-dots"></i>
                            </button>
                           
                            <!-- Dropdown menu -->
                        <div :id="`dropdownHover${job_id}`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                            <li>
                                <span class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i class="bi bi-pencil-fill"></i>
                                    Edit Job
                                </span>
                            </li>
                            <li>
                                <span class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i class="bi bi-x-circle-fill"></i>
                                    Close Job</span>
                            </li>
                            <li>
                                <span class="block cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-700">
                                    <i class="bi bi-trash-fill"></i>
                                    Delete Job
                                </span>
                            </li>
                            </ul>
                        </div>

                        </div>
                        <div>
                            <div class="text-sm">{{ job.description.substring(0, 400) }}..</div>
                            <div class="font-bold mt-3">${{job.budget.toLocaleString() }} Budget</div>
                            <div class="mt-2">posted {{job.created }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="jobs && jobs.length <= 0">
                    <div class="flex flex-col justify-center items-center w-full mt-6">
                        <img class=" h-40 w-40" src="../../assets/images/empty open mailbox.svg">
                        <span class="font-bold mt-4 text-gray-400">You Have No Contracts Yet</span>
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
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
    name: "JobsListPageView",
    components: { TemplateView, ContractStatus, SkeletonLoader },
    data(){
        return{
            jobs: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
        }
    },
    methods:{
        // get all clients jobs...
        async getJobsByEmployer(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/employer/jobs`, { headers });
                console.log(response)
                this.jobs = response.data.jobs.reverse();
                this.jobs.forEach(job => {
                    job.show_applicants = false;
                });
            }catch(error){
                console.log(error)
            }
        },
    },
    mounted(){
        this.getJobsByEmployer();
    }
}
</script>
<style scoped>
    
</style>