<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Saved Jobs</template>
            <template #page-contents>
                <!-- {{ jobs }} -->
                <!-- {{  getUserData }} -->
                <div class="gap-2 flex flex-row p-2 md:p-5  border-b">
                    <input type="search" class=" min-w-28 px-4 py-2 bg-tz_light_blue rounded-md" placeholder="Search all types of jobs" v-model="search_term">
                </div>


                <SkeletonLoader v-if="loading"/>
                <div class="p-8" v-if="!loading && jobs.length <= 0">
                    <div class="flex flex-col justify-center items-center w-full mt-6">
                        <img class=" h-40 w-40" src="../../assets/images/empty open mailbox.svg">
                        <span class="font-bold mt-4 text-gray-400">Saved Jobs Not Available</span>
                    </div>
                </div>

                <div v-if="!loading" class="flex flex-col overscroll-y-scroll" v-for="(job, job_index) in job_list()" :key="job_index">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue">
                        <div>posted {{ formatTime(job.created) }}</div>
                        <div class="flex flex-row justify-between items-center">
                            <div class="text-2xl font-bold">
                                <RouterLink :to="'/jobs/' + job._id + '/application'">
                                    {{ job.title }}
                                </RouterLink>
                            </div>
                            <div class="text-lg gap-4 flex flex-row-reverse">
                                <button class="icon_btn bg-tz_light_blue" @click="addJobToSaves(job._id)">
                                    <i v-if="checkIfJobIsSaved(job._id)" class="bi bi-bookmark-check-fill text-tz_blue"></i>
                                    <i v-else class="bi bi-bookmark-check"></i>
                                </button>
                                <button class="icon_btn">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <span class=" bg-tz_light_blue p-2 rounded-md">
                                <i class="bi bi-wallet"></i> <span>#{{ job.budget.toLocaleString() }}</span>
                            </span>
                            <span class=" bg-tz_blue p-2 rounded-md text-white">
                                <i class="bi bi-briefcase"></i> <span>{{ job.period }}</span>
                            </span>
                        </div>
                        <div>
                            {{ job.description.substring(0, 300) }}...
                            
                        </div>
                    </div>
                </div>

                <div v-if="search_term && !job_list().length" class=" p-8 text-center text-red-400">No matches found!</div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import TemplateView from '../TemplateView.vue';
import axios from 'axios';
import { formatToRelativeTime } from '@/utils/dateFormat';
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
    name: "SavedJobsView",
    components: { TemplateView, SkeletonLoader },
    data(){
        return{
            loading: false,
            store: useStore(),
            user: '',
            savedJobs: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            jobs: '',
            is_saved: false,

            search_term: '',
        }
    },
    methods:{
        job_list() {
            if(this.jobs){
                return this.jobs.filter((job) => 
                job.title.toLowerCase().includes(this.search_term.toLowerCase())
                || job.description.toLowerCase().includes(this.search_term.toLowerCase())
                );
            }
        },

        async getUserData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("user data from saved jobs: ", response);
                this.user = response.data.user;
                this.savedJobs = response.data.user.saved_jobs;
            }catch(error){
                console.log(error)
            }
        },

        async getSavedJobs(){
            this.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/saved`, { headers });
                this.loading = false;
                this.jobs = response.data.savedJobs.reverse();
            }catch(error){

            }
        },

        async addJobToSaves(job_id){
          try{
               const headers = this.headers;
               const res = await axios.post(`${this.api_url}/jobs/${job_id}/save`, {}, { headers } );
            //    console.log(res)
                this.getSavedJobs();
          }catch(error){
           console.log(error)
          }
       },

        formatTime(time){
            return formatToRelativeTime(time);
        },

        // function to check if the job with arg id is saved... 
        checkIfJobIsSaved(job_id){
            return this.savedJobs.includes(job_id)
        }
    },
    computed: {

    },

    mounted(){
        this.getUserData();
        this.getSavedJobs();
    }
}
</script>
<style scoped>

</style>