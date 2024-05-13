<template>
    <div class="h-full flex flex-col">

        <!-- ALERTS AND NOTIFICS -->
        <div class="fixed right-0 z-50 flex flex-col m-3">
            <div v-for="alert in alerts" class="flex flex-col gap-3 relative">
                <DismissableAlert  :type="alert_type">{{ alert }}</DismissableAlert>
            </div>
        </div>
       
       <Modal :title="'Job Filters'" :modal_active="job_filter_modal" >
            <template #body>
                <div class="flex flex-col gap-3 md:min-w-full">
                    <div class="flex flex-row flex-wrap gap-3">              
                        <div class=" flex flex-col grow">
                            <span class="font-bold text-lg">Minimum Budget</span>
                            <input class="form_input" type="number" name="min_budget" placeholder="0.00" v-model="job_filter_form.budgetMin">
                        </div>
                        <div class=" flex flex-col grow">
                            <span class="font-bold text-lg">Maximum Budget</span>
                            <input class="form_input" type="number" name="max_budget" placeholder="999.00" v-model="job_filter_form.budgetMax">
                        </div>
                    </div>

                    <div class="flex flex-row flex-wrap gap-3 mt-3">
                        <div class="grow flex flex-col">
                            <span class="font-bold text-lg">Job Location</span>
                            <MultiSelect v-model="job_filter_form.location.state" 
                            :options="nigerianStatesObject" 
                            optionLabel="name" 
                            optionValue="name" 
                            placeholder="Select Cities"
                            filter 
                            :maxSelectedLabels="3" class="form_input" />
                        </div>  


                        <div class="grow flex flex-col">
                            <!-- {{ job_filter_form.type }} -->
                            <span class="font-bold text-lg">Job Type</span>
                            <MultiSelect v-model="job_filter_form.type" 
                            :options="jobTypesObject" 
                            optionLabel="name" 
                            optionValue="name" 
                            placeholder="Select Job type"
                            :maxSelectedLabels="3" class="form_input" />
                        </div>

                        <div class="grow flex flex-col">
                            <!-- {{ job_filter_form.type }} -->
                            <span class="font-bold text-lg">Budget Type</span>
                            <MultiSelect v-model="job_filter_form.budget_type" 
                            :options="budget_type" 
                            optionLabel="name" 
                            optionValue="name" 
                            placeholder="Select Job type"
                            :maxSelectedLabels="3" class="form_input" />
                        </div>
                    </div>

                    <div class="grow flex flex-col">
                        <span class="font-bold text-lg">Job Category</span>
                        <MultiSelect v-model="job_filter_form.categories" 
                        :options="jobCategories" 
                        optionLabel="name" 
                        optionValue="name" 
                        placeholder="Select Job Category"
                        :maxSelectedLabels="3" class="form_input" />
                    </div>


                    <!-- <select class="p-3 rounded-md" >
                        <option>Select category</option>
                        <option v-for="category in jobCategories">{{ category }}</option>
                    </select> -->
                </div>
            </template>
            <template #footer>
                <div class="flex flex-row gap-3">
                    <button class="btn bg-transparent" @click="clearFilters">Clear Filters</button>
                    <button class="btn" @click="applyFilter">Apply Filter</button>
                </div>
            </template>
       </Modal>
                
    
                <div class="relative">
                    <PageTitle>Work Explorer</PageTitle>
                    <div>
                        <div class="flex flex-row gap-2 p-2 md:p-2 border-b dark:border-gray-600">

                            <button @click="removeBudgetFilter" v-if="job_filter_form.budgetMax || job_filter_form.budgetMin" class=" bg-tz_light_blue text-blue-300 border border-blue-300 px-4 py-2 rounded-md">
                                <i class="bi bi-cash-stack"></i> 
                                <!-- <span class="hidden md:inline-block ">${{ job_filter_form.budgetMin + ' - $' + job_filter_form.budgetMax}}</span> -->
                            </button>
                            <button @click="job_filter_form.period = ''" v-if="job_filter_form.period" class=" bg-tz_light_blue text-blue-300 border border-blue-300 px-4 py-2 rounded-md">
                                <i class="bi bi-arrow-clockwise"></i> 
                                <!-- <span class="hidden md:inline-block ">{{job_filter_form.period}}</span> -->
                            </button>
                            <button @click="job_filter_form.location.state = ''" v-if="job_filter_form.location.state" class=" bg-tz_light_blue text-blue-300 border border-blue-300 px-4 py-2 rounded-md">
                                <i class="bi bi-geo-alt-fill"></i> 
                                <!-- <span class="hidden md:inline-block ">{{job_filter_form.location.state}}</span> -->
                            </button>
                            <button @click="job_filter_form.posted = ''" v-if="job_filter_form.posted" class=" bg-tz_light_blue text-blue-300 border border-blue-300 px-4 py-2 rounded-md">
                                <i class="bi bi-clock-history"></i> 
                                <!-- <span class="hidden md:inline-block ">{{job_filter_form.posted}}</span> -->
                            </button>

                            <form @submit.prevent="searchJob" class="gap-2 flex flex-row overflow-x-auto md:overflow-visible">
                                <input type="search" class=" min-w-28 px-4 py-2 bg-tz_light_blue rounded-md form_input" placeholder="Search all types of jobs" v-model="job_search">
                                <button type="submit" class="bg-tz_light_blue text-tz_blue px-4 py-2 rounded-md hover:bg-tz_blue hover:text-white dark:text-white">
                                    <i class="bi bi-search"></i> 
                                    <span  class="hidden md:inline-block">Search</span>
                                </button>
                            </form>
                            <button @click="job_filter_modal = !job_filter_modal" class="border text-black px-4 py-2 rounded-md dark:text-white">
                                <i class="bi bi-funnel"></i> <span class="hidden md:inline-block "> Filters</span>
                            </button>
                        </div>

                        <!-- <div class="flex flex-row h-14 pl-5 border-b items-end dark:border-gray-600"> -->
                            <div class="flex flex-row gap-4 overflow-x-scroll md:overflow-x-visible w-full">
                            <div class="flex flex-row flex-wrap gap-4 w-full">
                                <button @click="showTab = 'tab-1'" :class="{ 'active_tab': showTab == 'tab-1' }" class="p-2 border-b-4 border-b-transparent">Available</button>
                                <button v-if="user" @click="showTab = 'tab-2'" :class="{ 'active_tab': showTab == 'tab-2' }" class="p-2 border-b-4 border-b-transparent">Applied</button>
                                <button v-if="user" @click="showTab = 'tab-3'" :class="{ 'active_tab': showTab == 'tab-3' }" class="p-2 border-b-4 border-b-transparent">Assigned</button>
                                <button v-if="user" @click="showTab = 'tab-4'" :class="{ 'active_tab': showTab == 'tab-4' }" class="p-2 border-b-4 border-b-transparent">Completed</button>
                                <button v-if="user" @click="showTab = 'tab-5'" :class="{ 'active_tab': showTab == 'tab-5' }" class="p-2 border-b-4 border-b-transparent">Declined</button>
                            </div>
                        </div>
                    </div>
                </div> 
                
              <div class=" top-0 bottom-0 right-0 flex flex-col h-full">

                <div v-if="!loading && jobs.length <= 0" class=" text-center p-8 dark:text-gray-300 flex flex-col justify-center items-center">
                    <img src="../../assets/images/no-match-found.png" class=" w-52 h-52">
                    <span class="font-bold text-lg">No job matched your search query</span>
                    <span class="text-gray-500">Try using a different search keyword or filter</span>
                </div>

                <div v-if="jobs.length > 0" class="flex flex-col justify-start p-3 h-full">
                    
                    <div v-if="showTab == 'tab-1'" class="h-full flex flex-row gap-3 relative">
                        <div class="h-full absolute w-full md:w-3/6 overflow-y-scroll flex flex-col">
                            <div class=" h-full items-start flex flex-col gap-3">
                                <div v-for="(job, job_index) in jobs" :key="job_index" class="w-full">
                                    <div v-if="!job.is_deleted" class="w-full">
                                        <!-- @saveJob="addJobToSaves(job._id)" -->
                                        <!-- is saved: {{checkIfJobIsSaved(job._id)}} -->
                                        <MainJobCard  @click="showJobDetail(job_index)" class="w-full"
                                        :class="selectedJob == job_index ? 'bg-tz_light_blue':''" 
                                        :company="job.employer.profile.company_name" :rating="5" 
                                        @flagJob="console.log('job flagged')"
                                        :budget="job.budget" 
                                        :period="job.period" 
                                        :remote="job.location.remote"
                                        :is_applied="checkIfJobIsApplied(job._id)">
                                            <template #save-button>
                                                <button class="icon_btn" @click="addJobToSaves(job._id)">
                                                    <i v-if="checkIfJobIsSaved(job._id)" class="bi bi-bookmark-check-fill text-tz_blue"></i>
                                                    <i v-else class="bi bi-bookmark-check"></i>
                                                </button>
                                            </template>
                                            <template #job-title>
                                            <RouterLink :to="'/in/jobs/' + job._id + '/application'"> {{ job.title }}</RouterLink>
                                            </template>
                                            <template #job-location>
                                                <span v-if="job.location.remote == 'true'">remote</span>
                                                <span v-else>{{  job.location.address }}, {{  job.location.state }}</span>
                                            </template>
                                            <template #job-description>{{  job.description.substring(0, 200) }}...
                                            </template>
                                            <template #job-posting-time>{{  formattedDate(job.created) }}</template>
                                        </MainJobCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-full w-full md:w-3/6 hidden md:flex absolute right-0">
                            
                                <JobDetailCard class="h-full w-full"
                                @visitJobPost="this.$router.push('/in/jobs/' + jobs[selectedJob]._id + '/application')"
                                :company="jobs[selectedJob].employer.profile.company_name" 
                                :remote="jobs[selectedJob].location.remote"
                                :location="`${jobs[selectedJob].location.address} ${jobs[selectedJob].location.state}`" 
                                :posted="formattedDate(jobs[selectedJob].created)" 
                                :period="jobs[selectedJob].period" 
                                :budget="`${jobs[selectedJob].budget.toLocaleString()} ${jobs[selectedJob].budget_type}`"
                                :is_applied="checkIfJobIsApplied(jobs[selectedJob]._id)"
                                :skills="jobs[selectedJob].skills"
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

                    <!-- ----------APPLIED JOBS------------ -->
                    <div v-if="showTab == 'tab-2'" class="h-full flex flex-row gap-3 relative">
                        <div class="h-full absolute w-full overflow-y-scroll flex flex-col">
                            <div class=" h-full items-start flex flex-col gap-3">
                            <div v-for="(job, index) in applications" :key="index" class="w-full">
                                <MainJobCard  @click="showJobDetail(job_index)" class="w-full"
                                        :class="selectedJob == job_index ? 'bg-tz_light_blue':''" 
                                        
                                        @flagJob="console.log('job flagged')"
                                        :budget="job.budget" 
                                        :period="job.period" 
                                        :remote="job.location.remote"
                                        :is_applied="checkIfJobIsApplied(job._id)">
                                            <template #save-button>
                                                <button class="icon_btn" @click="addJobToSaves(job._id)">
                                                    <i v-if="checkIfJobIsSaved(job._id)" class="bi bi-bookmark-check-fill text-tz_blue"></i>
                                                    <i v-else class="bi bi-bookmark-check"></i>
                                                </button>
                                            </template>
                                            <template #job-title>
                                            <RouterLink :to="'/in/jobs/' + job._id + '/application'"> {{ job.title }}</RouterLink>
                                            </template>
                                            <template #job-location>
                                                <span v-if="job.location.remote == 'true'">remote</span>
                                                <span v-else>{{  job.location.address }}, {{  job.location.state }}</span>
                                            </template>
                                            <template #job-description>{{  job.description.substring(0, 200) }}...
                                            </template>
                                            <template #job-posting-time>{{  formattedDate(job.created) }}</template>
                                        </MainJobCard>
                            </div>
                            <div v-if="applications.length <= 0">No applied jobs</div>
                        </div>
                        </div>
                    </div>

                    <!-- ------------ASSIGNED JOBS---------- -->
                    <div v-if="showTab == 'tab-3'">
                        <div class="flex flex-col gap-3">
                            <div v-for="contract in contracts" :key="contract._id">
                                <div v-if="contract.type == 'assigned'">
                                    <div v-if="contracts" class="flex flex-col overscroll-y-scroll">
                                        
                                        <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue dark:border-gray-700">
                                            <div class="flex flex-row justify-between items-center">
                                                <RouterLink :to="'/in/contracts/' + contract._id">
                                                    <div class="text-2xl font-bold text-tz_blue underline">{{ contract.job.title }}</div>
                                                </RouterLink>
                                            </div>
                                            <div>
                                                {{ contract.job.title.substring(0, 200) }}...
                                            </div>
                                            <div>
                                                <div>{{ contract.employer.company_name }}</div>
                                                <div>₦{{ contract.job.budget.toLocaleString() }} Budget</div>
                                            </div>
                                            <div class="flex flex-row gap-3">
                                                <ContractStatus :type="contract.status"/>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div v-if="!contracts" class="flex flex-col justify-center items-center w-full mt-6">
                                <img class=" h-40 w-40" src="../../assets/images/empty tin can.svg">
                                <span class="font-bold mt-4 text-gray-400">Assigned Jobs Not Available</span>
                            </div>
                        </div>
                    </div>

                    <!-- ------------COMPLETED JOBS--------- -->
                    <div v-if="showTab == 'tab-4'">
                        <div class="flex flex-col">
                            <div v-for="contract in contracts" :key="contract._id">
                                <div v-if="contract.status == 'completed'">
                                    <div v-if="contracts" class="flex flex-col overscroll-y-scroll">
                                        
                                        <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue  dark:border-gray-700">
                                            <div class="flex flex-row justify-between items-center">
                                                <RouterLink :to="'/in/contracts/' + contract._id">
                                                    <div class="text-2xl font-bold text-tz_blue underline">{{ contract.job.title }}</div>
                                                </RouterLink>
                                            </div>
                                            <div>
                                                {{ contract.job.title.substring(0, 200) }}...
                                            </div>
                                            <div>
                                                <div>{{ contract.employer.company_name }}</div>
                                                <div>₦{{ contract.job.budget.toLocaleString() }} Budget</div>
                                            </div>
                                            <div class="flex flex-row gap-3">
                                                <ContractStatus :type="contract.status"/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ------------DECLINDED JOBS------- -->
                    <div v-if="showTab == 'tab-5'">
                        <div class="flex flex-col gap-3">
                            <div v-for="contract in contracts" :key="contract._id">
                                <div v-if="contract.action == 'declined'">
                                    <div v-if="contracts" class="flex flex-col overscroll-y-scroll">
                                        
                                        <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-tz_light_blue  dark:border-gray-700">
                                            <div class="flex flex-row justify-between items-center">
                                                <RouterLink :to="'/in/contracts/' + contract._id">
                                                    <div class="text-2xl font-bold text-tz_blue underline">{{ contract.job.title }}</div>
                                                </RouterLink>
                                            </div>
                                            <div>
                                                {{ contract.job.title.substring(0, 200) }}...
                                            </div>
                                            <div>
                                                <div>{{ contract.employer.company_name }}</div>
                                                <div>₦{{ contract.job.budget.toLocaleString() }} Budget</div>
                                            </div>
                                            <div class="flex flex-row gap-3">
                                                <ContractStatus :type="contract.status"/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              </div> 

    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import MainJobCard from '@/components/MainJobCard.vue';
import axios from 'axios';
import { formatToRelativeTime } from '../../utils/dateFormat'
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import DismissableAlert from '@/components/DismissableAlert.vue';
import PageTitle from '@/components/PageTitle.vue';
import Modal from '@/components/Modal.vue';
import { nigerianStates } from '../../utils/states';

import ContractStatus from '@/components/ContractStatus.vue';

import MultiSelect from 'primevue/multiselect';

import jobCategories from '../../utils/jobCategories.json';

export default {
    name: "JobsPageView",
    components: { 
        MainJobCard, 
        JobDetailCard, 
        SkeletonLoader, 
        DismissableAlert, 
        PageTitle, 
        Modal, 
        MultiSelect,
        ContractStatus 
    },
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
            contracts: '',

            job_search: '',
            applications: '',

            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

            job_filter_modal: false,

            job_filter_form: {
                budgetMin: '',
                budgetMax: '',
                type: '',
                location: {
                    state: '',
                },
                posted: '',
                budget_type: '',
                categories: '',
            },
            nigerianStates,
            job_type: ["small", "medium", "large"],
            budget_type: [{name: "fixed-price"}, {name: "hourly"}],
            job_categories: [],

            jobCategories,

            states_to_filter: '',
            // job_time: ["under 24 hrs", "under a week", "under a month", "over a month"]
        }
        
    },
    methods:{
        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },

        getUser(){
            this.store.dispatch('fetchUserData')
        },

        showJobDetail(index){
            this.selectedJob = index;
        },

        applyFilter(){
            this.job_filter_modal = !this.job_filter_modal;
            this.searchJob();
        },

        clearFilters(){
            this.job_filter_form = {
                budgetMin: '',
                budgetMax: '',
                period: '',
                location: {
                    state: '',
                },
                posted: '',
            },
            this.searchJob();
        },
        removeBudgetFilter(){
            this.job_filter_form.budgetMax = '';
            this.job_filter_form.budgetMin = '';
        },

        async getUserData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`, { headers });
                this.user = response.data.user;
                if(!this.user.profile.title){
                    this.$router.push("/profile/complete");
                } 
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
                    this.jobs = response.data.jobs.reverse();
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
                console.log(res);
                this.getSavedJobs();
                this.showAlertBox("success", res.data.message);
           }catch(error){
            console.log(error)
           }
        },

        async getAllApplications(){
            const headers = this.headers;
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/applied`, { headers });
                console.log("your applications: ", response.data)
                this.applied_jobs = response.data.applications.map(job => job._id);
                this.applications = response.data.applications;
                // console.log("applied jobs id: ", this.applied_jobs);
                this.loading = false;
            } catch(error){
                this.loading = false;
            }
        },
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
        },

        async searchJob(){
            this.showTab = "tab-1";
            this.loading = true;
            const filters = this.job_filter_form;
            try{
                const response = await axios.get(`${this.api_url}/jobs/search`, {
                params: {
                    keywords: this.job_search,
                    budgetMin: filters.budgetMin,
                    budgetMax: filters.budgetMax,
                    jobType: filters.type,
                    location: filters.location.state,
                    posted: filters.posted
                }});

                console.log(response);
                this.jobs = response.data.jobs;
                this.loading = false;
                // this.$router.push('/jobs');

            }catch(error){
                console.log(error)
            }
        },

        async getSavedJobs(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/saved`, { headers });
                // console.log("your saved jobs id: ", response.data.savedJobs)
                this.saved_jobs = response.data.savedJobs.map(job => job._id);
            }catch(error){
                console.log("error saving job")
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
                return this.applied_jobs.includes(job_id);
            }
        }

    },
    computed: {

        nigerianStatesObject(){
             const object = this.nigerianStates.map(state => ({ name: state }));
             return object
        },

        jobTypesObject(){
             const object = this.job_type.map(type => ({ name: type }));
             return object
        }

    },

    mounted(){
        this.getUserData()
        this.getJobs();
        this.getAllApplications();
        this.getContracts();
        this.getSavedJobs();

        if(this.$route.params.tab == 'assigned'){
            this.showTab = 'tab-2';
        }
        if(this.$route.params.tab == 'completed'){
            this.showTab = 'tab-3';
        }
        if(this.$route.params.tab == 'declined'){
            this.showTab = 'tab-4';
        }
         


        
    }

}
</script>
<style scoped>
    .active_tab{
        @apply border-b-4 rounded-sm border-b-tz_blue
    }

    .icon_btn{
        @apply p-2 hover:bg-tz_light_blue h-10 w-10 rounded-full
    }

</style>