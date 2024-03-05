<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Work Explorer</template>
            <template #page-contents>
                <!-- <div class="border border-red-200 h-full"> -->
                    <div class="flex flex-row gap-2 p-2 md:p-5 border-b">
                        <div class="gap-2 flex flex-row overflow-x-scroll md:overflow-visible">
                            <input type="search" class=" min-w-28 px-4 py-2 bg-light_blue rounded-md" placeholder="Search all types of jobs">
                            <button class="bg-light_blue text-blue px-4 py-2 rounded-md hover:bg-blue hover:text-white">
                                <i class="bi bi-search"></i> <span  class="hidden md:inline-block">Search</span>
                            </button>
                        </div>
                        <button class="border text-black px-4 py-2 rounded-md ">
                            <i class="bi bi-funnel"></i> <span class="hidden md:inline-block">Filters</span>
                        </button>
                    </div>

                    <!-- <div class="flex flex-row h-14 gap-4 pl-5 border-b items-end overflow-x-scroll md:overflow-x-visible"> -->
                    <div class="flex flex-row h-14 pl-5 border-b items-end">
                        <div class="flex flex-row gap-4 overflow-x-scroll md:overflow-x-visible w-full">
                            <button @click="showTab = 'tab-1'" :class="{ 'active_tab': showTab == 'tab-1' }" class="p-2 border-b-4 border-b-transparent">Available</button>
                            <button @click="showTab = 'tab-2'" :class="{ 'active_tab': showTab == 'tab-2' }" class="p-2 border-b-4 border-b-transparent">Assigned</button>
                            <button @click="showTab = 'tab-3'" :class="{ 'active_tab': showTab == 'tab-3' }" class="p-2 border-b-4 border-b-transparent">Completed</button>
                            <button @click="showTab = 'tab-4'" :class="{ 'active_tab': showTab == 'tab-4' }" class="p-2 border-b-4 border-b-transparent">Declined</button>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start p-3 h-full">
                        
                        <div v-if="showTab == 'tab-1'" class="h-full">

                            <div class="flex flex-col md:flex-row gap-3 h-full">
                                <div class=" lg:w-3/4 h-full overflow-y-scroll items-start flex flex-col gap-3">
                                    <div v-if="loading" class="w-full">
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </div>
                                   
                                    <!-- :job_is_saved="checkIfJobIsSaved(job._id)" -->
                                   
                                    <div v-for="(job, job_index) in jobs" :key="job_index">
                                        <!-- is job saved: {{ checkIfJobIsSaved(job._id) }} -->
                                        <MainJobCard v-if="job" @click="showJobDetail(job_index)"
                                        :class="selectedJob == job_index ? 'bg-light_blue':''" 
                                        @saveJob="addJobToSaves(job._id)" 
                                        :job_is_saved="checkIfJobIsSaved(job._id)" 
                                        :company="job.employer.profile.company_name" :rating="5" 
                                        @flagJob="console.log('job flagged')"
                                        :budget="job.budget" 
                                        :period="job.period" 
                                        :remote="job.location.remote"
                                        :is_applied="checkIfJobIsApplied(job._id)"
                                        >
                                            <template #job-title>
                                            <RouterLink :to="'/jobs/' + job._id + '/application'"> {{ job.title }}</RouterLink>
                                            </template>
                                            <template #job-location>
                                                <span v-if="job.location.remote == 'true'">remote</span>
                                                <span v-else>{{  job.location.address }}, {{  job.location.state }}</span>
                                            </template>
                                            <template #job-description>{{  job.description.substring(0, 300) }}...
                                            </template>
                                            <template #job-posting-time>{{  formattedDate(job.created) }}</template>
                                        </MainJobCard>
                                    </div>
                                    
                                </div>

                                <div class="hidden lg:flex lg:w-10/12 h-full">
                                   <JobDetailCard v-if="jobs" class="h-full"
                                   @visitJobPost="this.$router.push('/jobs/' + jobs[selectedJob]._id + '/application')"
                                   :company="jobs[selectedJob].employer.profile.company_name" 
                                   :remote="jobs[selectedJob].location.remote"
                                   :location="jobs[selectedJob].location" 
                                   :posted="formattedDate(jobs[selectedJob].created)" 
                                   :period="jobs[selectedJob].period" 
                                   :budget="jobs[selectedJob].budget.toLocaleString()"
                                   :is_applied="checkIfJobIsApplied(jobs[selectedJob]._id)"
                                   >
                                        <template #job-title>
                                            {{ jobs[selectedJob].title }}
                                        </template>
                                        <template #job-description>
                                            {{ jobs[selectedJob].description }}
                                        </template>
                                   </JobDetailCard>
                                </div>
                            </div>
                        </div>


                        <!-- ---------------------- -->
                        <div v-if="showTab == 'tab-2'">
                            <div class="flex flex-row gap-3">
                                <p> Tab 2 contents</p>
                            </div>
                        </div>
                        <!-- --------------------- -->
                        <div v-if="showTab == 'tab-3'">
                            <div class="flex flex-row gap-3">
                                <p> Tab 3 contents</p>
                            </div>
                        </div>

                        <!-- ------------------- -->
                        <div v-if="showTab == 'tab-4'">
                            <div class="flex flex-row gap-3">
                                <p> Tab 4 contents</p>
                            </div>
                        </div>
                    </div>


                <!-- </div> -->
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from './TemplateView.vue';
import MainJobCard from '@/components/MainJobCard.vue';
import axios from 'axios';
import { formatToRelativeTime } from '../utils/dateFormat'
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
    name: "JobsPageView",
    components: { TemplateView, MainJobCard, JobDetailCard, SkeletonLoader },
    data(){
        return{
            store: useStore(),
            loading: false,
            user: '',
            selectedJob: 0,
            showTab: "tab-1",
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            jobs: '',
            saved_jobs: '',
            applied_jobs: '',
        }
        
    },
    methods:{
        getUser(){
            this.store.dispatch('fetchUserData')
        },

        showJobDetail(index){
            this.selectedJob = index;
        },

        async getUserData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`, { headers });
                this.user = response.data.user;
                this.saved_jobs = this.user.saved_jobs;
            }catch(error){
                console.log("user data error:", error)
            }
        },

        async getJobs(){
            this.loading = true;
            const headers = this.headers;
            console.log("checking for user: ", this.user)
            if(this.user){
                try{
                    const response = await axios.get(`${this.api_url}/user/jobs`, { headers } )
                    // console.log(response.data.jobs)
                    this.jobs = response.data.jobs.reverse();
                    this.loading = false;
                }catch(error){
                    // handle error here...
                    this.loading = true;
                }
            } else if(!this.user){
                try{
                    const response = await axios.get(`${this.api_url}/jobs`);
                    // console.log(response)
                    this.jobs = response.data.jobs;
                    this.loading = false;
                }catch(error){
                    // handle error here...
                    this.loading = true;
                }
            }
            
        },

        async addJobToSaves(job_id){
          
           try{
                const headers = this.headers;
                const res = await axios.post(`${this.api_url}/jobs/${job_id}/save`, {}, { headers } );
                console.log(res)
           }catch(error){
            console.log(error)
           }
        },

        async getAllApplications(){
            const headers = this.headers;
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/applied`, { headers });
                console.log(response.data)
                this.applied_jobs = response.data.applications.map(job => job._id);
                console.log("applied jobs id: ", this.applied_jobs);
                this.loading = false;
            } catch(error){
                this.loading = false;
            }
        },

        formattedDate(dateToFormat) {
            return formatToRelativeTime(dateToFormat);
        },

        checkIfJobIsSaved(job_id){
            if(this.user.role == 'user'){
                return this.saved_jobs.includes(job_id)
            }
        },

        checkIfJobIsApplied(job_id){
            if(this.user.role == 'user'){
                return this.applied_jobs.includes(job_id)
            }
        }

    },
    computed: {
        // getUserData(){
        //     return this.store.getters.getUserData
        // },

    },

    mounted(){
        this.getUserData()
        this.getJobs();
        this.getAllApplications();
        
    }

}
</script>
<style scoped>
    .active_tab{
        @apply border-b-4 rounded-sm border-b-blue
    }
</style>