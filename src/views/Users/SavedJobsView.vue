<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Saved Jobs</template>
            <template #page-contents>
                <!-- {{ jobs }} -->
                <!-- {{  getUserData }} -->
                <SkeletonLoader v-if="loading"/>
                <div class="p-8" v-if="!loading && jobs.length <= 0">You have no saved jobs</div>

                <div v-if="!loading" class="flex flex-col overscroll-y-scroll" v-for="(job, job_index) in jobs" :key="job_index">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-light_blue">
                        <div>posted {{ formatTime(job.created) }}</div>
                        <div class="flex flex-row justify-between items-center">
                            <div class="text-2xl font-bold">
                                <RouterLink :to="'/jobs/' + job._id + '/application'">
                                    {{ job.title }}
                                </RouterLink>
                            </div>
                            <div class="text-lg gap-4 flex flex-row-reverse">
                                <button class="icon_btn bg-light_blue" @click="addJobToSaves(job._id)">
                                    <i v-if="checkIfJobIsSaved(job._id)" class="bi bi-bookmark-check-fill text-blue"></i>
                                    <i v-else class="bi bi-bookmark-check"></i>
                                </button>
                                <button class="icon_btn">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-row gap-2">
                            <span class=" bg-light_blue p-2 rounded-md">
                                <i class="bi bi-wallet"></i> <span>#{{ job.budget.toLocaleString() }}</span>
                            </span>
                            <span class=" bg-blue p-2 rounded-md text-white">
                                <i class="bi bi-briefcase"></i> <span>{{ job.period }}</span>
                            </span>
                        </div>
                        <div>
                            {{ job.description }}
                            
                        </div>
                    </div>
                    
                    
                </div>
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
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            jobs: '',
            is_saved: false,
        }
    },
    methods:{
        getUser(){
            this.store.dispatch('fetchUserData')
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
            return this.getUserData.saved_jobs.includes(job_id)
            // console.log(this.getUserData)
        }
    },
    computed: {
        getUserData(){
            return this.store.getters.getUserData.user
        },
    },

    mounted(){
        this.getUser();
        this.getSavedJobs();
    }
}
</script>
<style scoped>

</style>