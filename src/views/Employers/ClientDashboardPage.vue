<template>
    <!-- Job assignment modal... -->
    <Modal :title="`Select a Job to assign to ${current_user.name}`" :modal_active="assign_job_modal">
        <template #body>
            <div class=" flex flex-col gap-3">
                <div class="flex flex-row group hover:bg-gray-100 p-3 items-start justify-between" v-for="(job, job_id) in jobs" :key="job_id">
                    <div clas="flex flex-col">
                        <div class=" text-lg font-bold text-blue">{{ job.title }}</div>
                        <div class=" text-lg">#{{ job.budget.toLocaleString() }}</div>
                        <p class=" text-sm text-gray-300">posted {{ job.created }}</p>
                    </div>
                   <button @click="assignJob(current_user.id, job._id)" class="btn hidden group-hover:block">Assign</button>

                </div>
            </div>
          
        </template>
        <template #footer></template>
    </Modal>


    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Dashboard</template>
            <template #page-contents>
                <div class="bg-light_blue p-3 flex flex-col gap-3">
                    <div class="p-8 py-12 rounded-lg bg-light_blue flex flex-row justify-between items-center flex-wrap">
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
                        <div class="flex flex-row w-full rounded-lg bg-white items-stretch">
                            <button @click="switchTab('jobs')" :class="{ 'active_tab': current_tab == 'jobs' }" class="tab_btn">
                                <i class="bi bi-activity"></i>
                                <span>Jobs Activity</span>
                            </button>
                            <button @click="switchTab('saved')" :class="{ 'active_tab': current_tab == 'saved' }" class="tab_btn ">
                                <i class="bi bi-people"></i>
                                <span>Saved Freelancers</span>
                            </button>
                        </div>
                        <div>
                            <div v-if="current_tab == 'jobs'" class="p-3 rounded-lg mt-3">
                                <div v-if="jobs.length > 0">
                                    <!-- {{ jobs }} -->
                                    <div class=" bg-white p-2 rounded-2xl mb-4" v-for="(job, job_id) in jobs" :key="job_id">
                                        <!-- {{ showApplicants(job._id) }} -->
                                        <div class="w-full p-3 bg-slate-50 rounded-lg text-left flex flex-row-reverse justify-start items-center">
                                            <button @click="show_applicants(job_id, job._id)" class=" text-blue bg-light_blue p-2 rounded-full ml-3 flex justify-center items-center h-10 w-10">
                                                <i class="bi bi-caret-down-fill"></i>
                                            </button>
                                            <div class="flex flex-row justify-between flex-wrap w-full">
                                                <span class="text-lg font-bold">{{ job.title }}</span>
                                                <span>posted {{ formattedDate(job.created) }}</span>
                                            </div>
                                        </div>
                                        <div class="p-3 text-left">{{ job.description.substring(0, 200) }}..</div>
                                        <div class="flex flex-row justify-end">
                                            <span class="p-2 rounded-lg bg-slate-200 text-sm">applications: {{ job.no_of_applications }}</span>
                                        </div>
                                        
                                        <div class="flex flex-col gap-3" v-if="job.show_applicants">
                                            <div class="w-full p-3 bg-slate-50 rounded-lg text-lg font-bold text-left flex flex-row justify-center items-center">
                                                <i class="bi bi-people mr-3"></i>
                                                <span>Applicants</span>
                                            </div>
                                            <!-- ALL APPLICANTS SHOULD BE LISTED BELOW HERE -->
                                            <div class="p-3 flex flex-row gap-3 hover:bg-slate-50 rounded-xl w-full border items-start" v-for="(application, application_id) in applicants[job_id]" :key="application_id">
                                                <div v-if="application.user" class=" h-16 w-20 bg-blue rounded-lg overflow-hidden">
                                                    <img :src="application.user.profile.image_url">
                                                </div>
                                                <div v-if="application.user" class="flex flex-col text-start w-full">
                                                    <div class="flex flex-row w-full justify-between items-start flex-wrap gap-3">
                                                        <div>
                                                            <!-- {{  application.job }} -->
                                                            <RouterLink :to="'user/'">{{ application.user._id }}</RouterLink>
                                                            <p class="text-xl font-bold">{{ application.user.firstname }} {{ application.user.lastname }}</p>
                                                            <p class="text-gray-400">{{ application.user.profile.title }}</p>
                                                        </div>
                                                        <span class="rounded-lg bg-orange-100 text-orange-700 p-2" v-if="application.counter_offer">counter offer</span>
                                                    </div>
                                                    <div>
                                                        <p><b>Cover Letter:</b> {{ application.cover_letter }}</p>
                                                        <p><b>Attachments({{ application.attachment.length }}):</b> 
                                                            <!-- {{ application.attachments }} -->
                                                            <!-- <span>{{ application.attachments.forEach(file => file.split("/")) }}</span> -->

                                                            <div v-for="(attachment, attachment_id) in application.attachment" :key="attachment_id">
                                                                <a class=" text-blue" :href="attachment.url" target="_blank">({{attachment_id}}) {{ attachment.name }}</a>
                                                            </div>
                                                        </p>
                                                        <p><b>Counter offer:</b> {{ application.counter_offer.toLocaleString() }}</p>
                                                        <p><b>Reason:</b> {{ application.reason_for_co }}</p>
                                                    </div>
                                                    <div class="flex flex-row gap-3 mt-3">
                                                        <button v-if="!userIsSaved(application.user._id)" class="btn" @click="saveUser(application.user._id)">save</button>
                                                        <button class="bg-white border border-blue p-3 rounded-md hover:bg-slate-100">Interview</button>
                                                        <button @click="sendContractAndHired(application.user._id, application.job)" class="btn">Send Contract Offer & Hire</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>You have not posted any job yet. Post now</div>
                            </div>
                            <div v-if="current_tab == 'saved'" class="p-3 bg-white rounded-lg mt-3 flex flex-col gap-3">

                                <p v-if="!saved_users"> loading your saved users...</p>
                                <div v-if="saved_users" class="p-3 flex flex-row gap-3 hover:bg-slate-50 rounded-xl w-full border items-start" v-for="(user, user_id) in saved_users" :key="user_id">
                                    <div class=" h-16 w-20 bg-blue rounded-lg overflow-hidden">
                                        <img :src="user.profile.image_url">
                                    </div>
                                    <div class="flex flex-col text-start w-full">
                                        <div class="flex flex-row w-full justify-between items-start flex-wrap gap-3">
                                            <div>
                                                <p class="text-xl font-bold">{{ user.firstname }} {{ user.lastname }}</p>
                                                <p class="text-gray-400">{{ user.profile.title }}</p>
                                                <p class="text-sm flex flex-row gap-1 text-orange-500" v-html="userStars(user.ratings)"></p>
                                                <p class="text-gray-400">Earned: ${{ user.earned }}</p>
                                            </div>
                                            <div class="flex flex-row gap-3">
                                                <button class="bg-white border-blue p-3 border rounded-md hover:bg-slate-100">Message</button>
                                                <button class="btn" @click="jobAssignmentModal(user._id, user.firstname)">Assign Job</button>
                                                <button @click="saveUser(user._id)" class="border p-3 rounded-md">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!saved_users && saved_users.length <= 0">You have no saved users yet</div>
                            </div>
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
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import Modal from '@/components/Modal.vue';
import { formatToRelativeTime } from '@/utils/dateFormat';
import { generateStarRating } from '@/utils/ratingStars';

export default {
    name: "ClientDashboardPage",
    components: { TemplateView, SkeletonLoader, Modal },
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

        async getJobsByEmployer(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/employer/jobs`, { headers });
                // console.log(response)
                this.jobs = response.data.jobs.reverse();
                this.jobs.forEach(job => {
                    job.show_applicants = false;
                });
            }catch(error){
                console.log(error)
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

        async saveUser(user_id){
            const headers = this.headers;
            try{
                const res = await axios.post(`${this.api_url}/employer/${user_id}/save-user`, {}, { headers });
                // console.log(res);
                alert(res.data.message);
                this.getSavedUsers();
            }catch(error){ 
                console.log("user saving error: ", error);
            }
        },

        async getSavedUsers(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/employer/users/saved`, { headers });
                console.log("saved users: ", response.data)
                this.saved_users = response.data.saved_users;
            }catch(error){
                console.log("get saved users error: ", error);
            }
        },

        async sendContractAndHired(user_id, job_id){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${user_id}/${job_id}/send`, {}, { headers });
                // console.log("res from sending contract: ", response)
                alert(response.data.message)
            }catch(error){
                console.log("error sending Contract:", error)
            }
        },

        async assignJob(user_id, job_id){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/contracts/${user_id}/${job_id}/assign`, {}, { headers });
                // console.log("res from sending contract: ", response)
                alert(response.data.message)
            }catch(error){
                console.log("error sending Contract:", error)
            }
        },

        
        userIsSaved(user_id){
            if(this.getUserData){
                return this.getUserData.user.saved_users.includes(user_id);
            }
        },

        userStars(ratings){
            return generateStarRating(ratings);
        }
    

    },
    computed: {
        getUserData(){
            return this.store.getters.getUserData
        },

    },

    mounted(){
        this.getUser();
        this.getJobsByEmployer();
    }

}
</script>
<style scoped>
.tab_btn{
    @apply p-3 rounded-lg w-64 text-start flex flex-row gap-3 hover:bg-slate-50 items-center
}
.active_tab{
    @apply bg-blue text-white hover:bg-dark_blue;
}
</style>