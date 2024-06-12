<template>
<!-- TOAST -->
    <Toast/>
<!-- ***** -->
    <FullPageLoading v-if="loading"/>

    <!-- Job assignment modal... -->
    <Modal :name="`Select a Job to assign to ${current_user.name}`" :modal_active="assign_job_modal">
        <template #body>
            <span v-if="message" class="text-orange-400 my-3">{{ message }}</span>
            <div class=" flex flex-col gap-3">
                <div class="flex flex-col gap-3 rounded-md group hover:bg-gray-100 p-3 items-start justify-between dark:hover:bg-tz_light_blue" v-for="(job, job_id) in jobs" :key="job_id">
                    <div clas="flex flex-col">
                        <div class=" text-lg font-bold text-tz_blue">{{ job.title }}</div>
                        <div class=" text-lg">#{{ job.budget.toLocaleString() }}</div>
                        <p class=" text-sm text-gray-300">posted {{ job.created }}</p>
                    </div>
                   <button @click="assignJob(current_user.id, job._id)" class="btn hidden group-hover:block">Assign</button>

                </div>
            </div>
          
        </template>
        <template #footer>
            <button @click="assign_job_modal = !assign_job_modal" class=" bg-red-500 text-white hover:bg-red-700 py-3 px-6 rounded-md ">close</button>
        </template>
    </Modal>

    <Modal :name="'Interview Confirmation'" :modal_active="interview_modal">
        <template #body>
            <div class="p-3 flex flex-col gap-3">
                <span class="text-2xl mb-4"> Are you sure you want to start an interview session with {{ current_user.name }}</span>
                <p class="text-blue-500 p-3 border border-blue-500 rounded-xl">
                    sending a message means initiating an interview with the talent, which can further lead to the start of the contract if the interview is successful
                    confirm if you really want to start a message with  <b>{{ current_user.name }}</b>
                </p>
            </div>
          
        </template>
        <template #footer>
            <div class="flex flex-row gap-3">
                <button @click="interview_modal = !interview_modal" class="bg-tz_light_blue p-3 rounded-md">cancel</button>
                <button @click="startMessageRoom(current_job.title, current_user.id, getUserData.user._id)" class="btn">Send Message</button>
            </div>
        </template>
    </Modal>

    <Modal :name="'Contract Offer Confirmation'" :modal_active="contract_modal">
        <template #body>
            <span v-if="message" class="text-orange-400 my-3">{{ message }}</span>
            <div class="flex flex-row justify-center items-center gap-5">
                <div>
                    <Vue3Lottie
                            :animationData="blankMessagePage"
                            :height="200"
                            :width="200"
                        />
                </div>
                <span class="text-2xl mb-4 block"> Are you sure you want to Send the contract offer for the job <b class="text-blue-500">{{  current_job.title }}</b> to <b class="text-blue-500">{{ current_user.name }}</b>?</span>
            </div>
            
        </template>
        <template #footer>
            <div class="flex flex-row gap-3">
                <button @click="contract_modal = !contract_modal" class="bg-tz_light_blue p-3 rounded-md">cancel</button>
                <button @click="sendContractAndHired(current_user.id, current_job._id)" class="btn">Send Offer</button>
            </div>
        </template>
    </Modal>

<PageTitle>Dashboard</PageTitle>
    <div>
    
        <div class="bg-tz_light_blue p-3 flex flex-col gap-3 overflow-y-auto">
            <div class="p-8 py-12 rounded-lg bg-tz_light_blue flex flex-row justify-between items-center flex-wrap  dark:bg-[#1F2A36]">
                <div class="text-left">
                    <p>Welcome back,</p>
                    <!-- {{ getUserData }} -->
                    <h1 class="text-3xl font-bold capitalize" v-if="getUserData">{{ getUserData.user.firstname }} {{ getUserData.user.lastname }}</h1>
                </div>
                <div>
                    <RouterLink to="/client/job">
                        <button class="btn">+ Create Job</button>
                    </RouterLink>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-row w-full rounded-lg bg-white items-stretch  dark:border-gray-600  dark:bg-[#1F2A36] ">
                    <button @click="switchTab('jobs')" :class="{ 'active_tab': current_tab == 'jobs' }" class="tab_btn ">
                        <i class="bi bi-activity"></i>
                        <span>Jobs Activity</span>
                    </button>
                    <button @click="switchTab('saved')" :class="{ 'active_tab': current_tab == 'saved' }" class="tab_btn ">
                        <i class="bi bi-people"></i>
                        <span>Saved Freelancers ({{saved_users.length}})</span>
                    </button>
                </div>
                <div>
                    <div v-if="current_tab == 'jobs'" class="p-3 rounded-lg mt-3">
                        <div v-if="loading_posted_jobs">Loading your jobs...</div>
                        <div v-if="jobs && jobs.length > 0">
                            <!-- {{ jobs }} -->
                            <div class=" bg-white p-2 rounded-2xl mb-4  hover:border-tz_blue dark:border-gray-600  dark:bg-[#1F2A36] dark:hover:border-[#769BBF]" v-for="(job, job_id) in jobs" :key="job_id">
                                <!-- {{ showApplicants(job._id) }} -->
                                <div class="w-full p-3 bg-slate-50 rounded-lg text-left flex flex-row-reverse justify-start items-center dark:bg-tz_light_blue">
                                    <!-- <button @click="show_applicants(job_id, job._id)" class=" text-tz_blue bg-tz_light_blue p-2 rounded-full ml-3 flex justify-center items-center h-10 w-10">
                                        <i class="bi bi-caret-down-fill"></i>
                                    </button> -->
                                    <div class="flex flex-row justify-between flex-wrap w-full">
                                        <span class="text-lg font-bold" :class="job.is_deleted ? 'text-red-500':''">{{ job.title }}</span>
                                        <span>posted {{ formattedDate(job.created) }}</span>
                                    </div>
                                </div>
                                <div class="p-3 text-left">{{ job.description.substring(0, 200) }}..</div>
                                <div class="flex flex-row justify-start m-3 mb-3">
                                    <button v-if="job.no_of_applications" @click="show_applicants(job_id, job._id)" type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <i v-if="!jobs[job_id].show_applicants" class="bi bi-eye-fill mr-3"></i> 
                                        <i v-else class="bi bi-eye-slash-fill mr-3"></i> 
                                        See {{ job.no_of_applications }} Applications
                                    </button>
                                    <!-- <span class="p-2 rounded-lg bg-slate-200 text-sm dark:bg-tz_light_blue">applications: {{ job.no_of_applications }}</span> -->
                                </div>
                                
                                <div class="flex flex-col gap-3" v-if="job.show_applicants">
                                    <div class="w-full p-3 bg-slate-50 rounded-lg text-lg font-bold text-left flex flex-row justify-center items-center dark:bg-tz_light_blue relative">
                                        <div>
                                            <i class="bi bi-people mr-3"></i>
                                            <span>Applicants</span>
                                        </div>
                                        <button @click="getJobApplicants(job._id, job_id)" class=" absolute right-5 font-thin text-sm rounded-full p-1 hover:bg-gray-500 w-5 h-5 flex justify-center items-center"><i class="bi bi-arrow-clockwise"></i></button>
                                    </div>
                                    <!-- ALL APPLICANTS SHOULD BE LISTED BELOW HERE -->
                                    <div class="p-3 flex flex-row flex-wrap gap-3 hover:bg-slate-50 rounded-xl w-full border relative items-start dark:hover:bg-tz_light_blue dark:border-gray-500" v-for="(application, application_id) in applicants[job_id]" :key="application_id">
                                        <!-- <div  > -->
                                            <a v-if="application.user" :href="`/users/${application.user._id}`" target="_blank">
                                                <img :src="application.user.profile.image_url" class=" h-16 w-16 bg-tz_blue rounded-full">
                                            </a>
                                        <!-- </div> -->
                                        <div v-if="application.user" class="flex flex-col text-start">
                                            <div class="flex flex-row justify-between items-start flex-wrap gap-3 ">
                                                <div>
                                                    <!-- {{  application.job }} -->
                                                    <a :href="`/users/${application.user._id}`" target="_blank" class="text-xl font-bold cursor-pointer">{{ application.user.firstname }} {{ application.user.lastname }}</a>
                                                    <p class="text-gray-400">{{ application.user.profile.title }}</p>
                                                    <p class="text-gray-400">{{ application.user.rating }}</p>
                                                </div>
                                                <span class="rounded-lg bg-orange-100 text-orange-700 p-2 absolute right-5 top-5" v-if="application.counter_offer">counter offer</span>
                                            </div>
                                            <div>
                                                <p><b>Cover Letter:</b> {{ application.cover_letter }}</p>
                                                <p><b>Attachments({{ application.attachments.length }}):</b> 
                                                    <!-- <span>{{ application.attachments.forEach(file => file.split("/")) }}</span> -->
                                                    <a v-for="file in application.attachments" :href="file" target="_blank" class="underline text-blue-500 p-2">{{ file.split("-")[file.split("-").length - 1] }} <br/></a>

                                                    <!-- <div v-for="(attachment, attachment_id) in application.attachments" :key="attachment_id">
                                                        <a class=" text-tz_blue" :href="attachment.url" target="_blank">({{attachment_id}}) {{ attachment }}</a>
                                                    </div> -->
                                                </p>
                                                <p v-if="application.counter_offer"><b>Counter offer:</b> {{ application.counter_offer.toLocaleString() }}</p>
                                                <p><b>Reason:</b> {{ application.reason_for_co }}</p>
                                            </div>
                                            <div class="flex flex-row flex-wrap gap-3 mt-3">
                                                <button v-if="!userIsSaved(application.user._id)" class="btn" @click="saveUser(application.user._id, job._id, job_id)">save freelancer</button>
                                                <button class="bg-tz_light_blue border border-tz_blue p-3 rounded-md" @click="sendUserMessage(application.user._id, `${application.user.firstname} ${application.user.lastname}`, job.title)">Interview</button>
                                                <button @click="confirmContractOfferModal(application.user._id, `${application.user.firstname} ${application.user.lastname}`, job)" class="btn">Send Contract Offer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="jobs && jobs.length <= 0" class="text-center p-5 flex flex-col justify-center items-center gap-3">
                            <img src="../../assets/images/empty open mailbox.svg" class=" h-48">
                            You have not posted any job yet. <RouterLink to="/client/job" class="underline text-blue-500">Post now</RouterLink>
                        </div>
                    </div>
                    <div v-if="current_tab == 'saved'" class="p-3 bg-white rounded-lg mt-3 flex flex-col gap-3 dark:bg-transparent">

                        <p v-if="!saved_users && loading_saved_users"> loading your saved users...</p>

                        <div v-if="saved_users" class="p-3 flex flex-col gap-3 rounded-xl w-full border items-start dark:bg-[#1F2A36] dark:border-gray-500 dark:hover:bg-none " v-for="(user, user_id) in saved_users" :key="user_id">
                            
                            <div class="flex flex-row text-start gap-3">
                                <div class=" h-16 w-16 bg-tz_blue rounded-full overflow-hidden">
                                    <a :href="`/users/${user._id}`" target="_blank">
                                        <img :src="user.profile.image_url">
                                    </a>
                                </div>
                                <div class="flex flex-col justify-between items-start flex-wrap">
                                    <a :href="`/users/${user._id}`" target="_blank" class="text-xl font-bold">{{ user.firstname }} {{ user.lastname }}</a>
                                    <p class="text-gray-400">{{ user.profile.title }}</p>
                                    <Rating class="p-rating-item" :modelValue="user.rating" readonly :cancel="false"></Rating>
                                    <p class="text-gray-400">{{ user.rating }}</p>
                                    <div class="flex flex-row gap-3">
                                        <RouterLink to="/client/messages">
                                            <button class="bg-white border-tz_blue p-3 border rounded-md hover:bg-slate-100 dark:bg-tz_light_blue dark:hover:bg-tz_dark_blue">Message</button>
                                        </RouterLink>
                                        <button class="btn" @click="jobAssignmentModal(user._id, user.firstname)">Assign Job</button>
                                        <button @click="saveUser(user._id)" class="border p-3 rounded-md">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div v-if="saved_users && saved_users.length <= 0">
                            <div class="text-center p-5 flex flex-col justify-center items-center gap-3">
                                <img src="../../assets/images/empty open mailbox.svg" class=" h-48">
                                You have not saved any freelancer yet.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TemplateView from '../TemplateView.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import Modal from '@/components/Modal.vue';
import { formatToRelativeTime } from '@/utils/dateFormat';
import { generateStarRating } from '@/utils/ratingStars';
import PageTitle from '@/components/PageTitle.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';

import blankMessagePage from '../../lottie/blankMessagePage.json';

// prime vue rating component
import Rating from 'primevue/rating';
import Toast from 'primevue/toast';

export default {
    name: "ClientDashboardPage",
    components: { 
        TemplateView, 
        SkeletonLoader, 
        Modal, 
        PageTitle, 
        FullPageLoading, 
        Rating,
        Toast, 
    },
    data(){
        return{
            store: useStore(),
            loading: false,
            user: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            jobs: '',

            current_tab: 'jobs',
            applicants: [],
            saved_users: '',

            assign_job_modal: false,
            current_user: {
                name: '',
                id: '',
            },
            current_job: {
                title: '',
            },

            interview_modal: false,

            contract_modal: false,

            loading_posted_jobs: false,
            loading_saved_users: false,

            message: '',
            blankMessagePage,
        }
        
    },
    methods:{
        switchTab(tab){
            this.current_tab = tab;
            if(tab == 'saved'){
                this.getSavedUsers();
            }
        },

        getUser(){
            this.store.dispatch('fetchUserData');
            // this.user = this.store.getters.getUserData.user;
        },

        formattedDate(dateToFormat) {
            return formatToRelativeTime(dateToFormat);
        },

        show_applicants(index, job_id) {
            this.jobs[index].show_applicants = !this.jobs[index].show_applicants;
            this.getJobApplicants(job_id, index);
        },

        jobAssignmentModal(user_id, user_name){
            this.assign_job_modal = true;
            this.current_user.name = user_name;
            this.current_user.id = user_id;
        },

        sendUserMessage(user_id, user_name, job_title){
            this.interview_modal = !this.interview_modal;
            this.current_user.name = user_name;
            this.current_user.id = user_id;
            this.current_job.title = job_title;
            // startMessageRoom(job.title, application.user._id, getUserData.user._id)
        },

        confirmContractOfferModal(user_id, user_name, job){
            this.contract_modal = !this.contract_modal;
            this.current_job = job;
            this.current_user.id = user_id;
            this.current_user.name = user_name;
        },

        async getJobsByEmployer(){
            const headers = this.headers;
            this.loading_posted_jobs = true;
            try{
                const response = await axios.get(`${this.api_url}/employer/jobs`, { headers });
                console.log("my posted jobs : ", response);
                this.jobs = response.data.jobs.reverse();
                this.jobs.forEach(job => {
                    job.show_applicants = false;
                });
                this.loading_posted_jobs = false;
            }catch(error){
                console.log(error);
                this.loading_posted_jobs = false;
            }
        },

        async getJobApplicants(job_id, index){
            const headers = this.headers;
            try{
                const response  = await axios.get(`${this.api_url}/employer/jobs/${job_id}/applications`, { headers });
                console.log("application for current job: ", response.data)
                const applications = response.data.applications;
                this.applicants[index] = applications;
            }catch(error){
                console.log(error)
            }
        },

        async saveUser(user_id, job_id, index){
            const headers = this.headers;
            try{
                const res = await axios.post(`${this.api_url}/employer/${user_id}/save-user`, {}, { headers });
                // console.log(res);
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${res.data.message}`, life: 3000 });
                this.getSavedUsers();
                // this.getJobsByEmployer();
                if(job_id && index){
                    this.getJobApplicants(job_id, index);
                }
            }catch(error){ 
                // console.log("user saving error: ", error);
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },

        async getSavedUsers(){
            this.loading_saved_users = true;
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/employer/users/saved`, { headers });
                console.log("saved users: ", response.data)
                this.saved_users = response.data.saved_users;
                this.loading_saved_users = false;
            }catch(error){
                // console.log("get saved users error: ", error);
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
                this.loading_saved_users = false;
            }
        },

        async sendContractAndHired(user_id, job_id){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${user_id}/${job_id}/send`, {}, { headers });
                // console.log("res from sending contract: ", response);
                // this.message = response.data.message;
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });
                this.contract_modal = !this.contract_modal
                // alert(response.data.message);
            }catch(error){
                // console.log("error sending Contract:", error);
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },

        async assignJob(user_id, job_id){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${user_id}/${job_id}/assign`, {}, { headers });
                // console.log("res from sending contract: ", response)
                // this.message = response.data.message;
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });
            }catch(error){
                console.log("error sending Contract:", error);
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },

        async startMessageRoom(name, userId, employerId){
            this.loading = true;
            console.log("user: ", userId, "employer: ", employerId);
            try{
                const response = await axios.post(`${this.api_url}/message/create-room`, { name, userId, employerId }, {});
                console.log("new room response: ", response);
                this.loading = false;
                this.$router.push("/client/messages");
            }catch(error){
                console.log("error creating room: ", error);
                if(error.response.status == 400){
                    this.$router.push("/client/messages");
                }
                this.loading = false;
            }
        },

        
        userIsSaved(user_id){
            if(this.getUserData){
                return this.getUserData.user.saved_users.includes(user_id);
            }
        },

        seeUserProfile(user_id) {
            const route = this.$router.resolve({name: "Public profile", params: { user_id: user_id } });
            window.open(route.href, '_blank');
        }
    

    },
    computed: {
        getUserData(){
            return this.store.getters.getUserData
        },

    },

    created(){
        this.getUser();
        this.getJobsByEmployer();
        this.getSavedUsers();
    }

}
</script>
<style scoped>
.tab_btn{
    @apply p-3 rounded-lg w-64 text-start flex flex-row gap-3 items-center 
}
.active_tab{
    @apply bg-tz_blue text-white hover:bg-tz_dark_blue dark:hover:bg-tz_light_blue;
}
</style>