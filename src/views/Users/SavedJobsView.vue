<template>
    <div>
            <!-- TOAST -->
                <Toast/>
            <!-- TOAST STOPS HERE -->


                <PageTitle>Saved Jobs</PageTitle>
                <div class="gap-2 flex flex-row p-2 md:p-5  border-b dark:border-gray-600">
                    <input type="search" class=" form_input" placeholder="Search all types of jobs" v-model="search_term">
                </div>


                <SkeletonLoader v-if="loading"/>
                <div class="p-8" v-if="!loading && jobs.length <= 0">
                    <div class="flex flex-col justify-center items-center w-full mt-6">
                        <img class=" h-40 w-40" src="../../assets/images/empty open mailbox.svg">
                        <span class="font-bold mt-4 text-gray-400">Saved Jobs Not Available</span>
                    </div>
                </div>

                <div v-if="!loading" class="flex flex-col overscroll-y-scroll" v-for="(job, job_index) in job_list()" :key="job_index">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue dark:border-gray-600">
                        <div>posted {{ formatDistanceToNow(job.createdAt, {addSuffix: true}) }}</div>
                        <div class="flex flex-row justify-between items-center">
                            <div class="text-2xl font-bold">
                                <RouterLink :to="'/in/jobs/' + job._id + '/application'">
                                    {{ job.title }}
                                </RouterLink>
                            </div>
                            <div class="text-lg gap-4 flex flex-row-reverse">
                                <button class="icon_btn" @click="addJobToSaves(job._id)">
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
                                <i class="bi bi-wallet"></i> <span>₦{{ job.budget.toLocaleString() }}</span>
                            </span>
                            <span class=" bg-tz_blue p-2 rounded-md text-white">
                                <i class="bi bi-briefcase"></i> <span>{{ job.period }}</span>
                            </span>
                        </div>
                        <div>
                            {{ job.description.substring(0, 300) }}...
                            
                        </div>

                        <span v-if="applied_jobs && applied_jobs.includes(job._id)" class="text-sm bg-green px-3 py-1 bg-green-500 text-white rounded-full w-fit">applied</span>
                    </div>
                </div>

                <div v-if="search_term && !job_list().length" class=" p-8 text-center text-red-400">No matches found!</div>
            <!-- </template>
        </TemplateView> -->
    </div>
</template>
<script>
import TemplateView from '../TemplateView.vue';
import axios from 'axios';
import { formatToRelativeTime } from '@/utils/dateFormat';
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import PageTitle from '@/components/PageTitle.vue';
import DismissableAlert from '@/components/DismissableAlert.vue';

import Toast from 'primevue/toast';
import { formatDistanceToNow } from 'date-fns'
import { useToast } from 'vue-toastification';

export default {
    name: "SavedJobsView",
    components: { 
        TemplateView,
        SkeletonLoader, 
        PageTitle, 
        DismissableAlert,
        Toast 
    },
    data(){
        return{
            toast: useToast(),
            formatDistanceToNow,
            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

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

            applied_jobs: [],
        }
    },
    methods:{
        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },


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
                const response = await axios.post(`${this.api_url}/jobs/${job_id}/save`, {}, { headers } );
                
                this.getSavedJobs();
                if(response.status == 201){
                    this.toast.success(response.data.message);
                } else {
                    this.toast.warning(response.data.message);
                }
           }catch(error){
            this.toast.error(error.response.data.message);
           }
        },

        async getAllApplications(){
            const headers = this.headers;
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/applied`, { headers });
                console.log("your applications: ", response.data)
                this.applied_jobs = response.data.applications.map(job => job._id);
                // this.applications = response.data.applications;
                // console.log("applied jobs id: ", this.applied_jobs);
                this.loading = false;
            } catch(error){
                this.loading = false;
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

    created(){
        this.getUserData();
        this.getSavedJobs();
        this.getAllApplications();
    }
}
</script>
<style scoped>

</style>