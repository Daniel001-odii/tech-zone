<template>
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
                            <button @click="current_tab = 'jobs'" :class="{ 'active_tab': current_tab == 'jobs' }" class="tab_btn">
                                <i class="bi bi-activity"></i>
                                <span>Jobs Activity</span>
                            </button>
                            <button @click="current_tab = 'saved'" :class="{ 'active_tab': current_tab == 'saved' }" class="tab_btn ">
                                <i class="bi bi-people"></i>
                                <span>Saved Freelancers</span>
                            </button>
                        </div>
                        <div>
                            <div v-if="current_tab == 'jobs'" class="p-3 rounded-lg mt-3">
                                <div v-if="jobs.length > 0">
                                    <!-- {{ jobs }} -->
                                    <div class=" bg-white p-2 rounded-2xl mb-4" v-for="(job, job_id) in jobs" :key="job_id">
                                        <div class="w-full p-3 bg-slate-50 rounded-lg text-left flex flex-row-reverse justify-start items-center">
                                            <button @click="show_applicants(job_id)" class=" text-blue bg-light_blue p-2 rounded-full ml-3 flex justify-center items-center h-10 w-10">
                                                <i class="bi bi-caret-down-fill"></i>
                                            </button>
                                            
                                            <div class="flex flex-row justify-between flex-wrap w-full">
                                                <span class="text-lg font-bold">{{ job.title }}</span>
                                                <span>posted: {{ job.created }}</span>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="p-3">{{ job.description }}</div>
                                        
                                        <div class="flex flex-col gap-3" v-if="job.show_applicants">
                                            <div class="w-full p-3 bg-slate-50 rounded-lg text-lg font-bold text-left flex flex-row justify-center items-center">
                                                <i class="bi bi-people mr-3"></i>
                                                <span>Applicants</span>
                                            </div>
                                            <!-- ALL APPLICANTS SHOULD BE LISTED BELOW HERE -->
                                            <div class="p-3 flex flex-row gap-3 hover:bg-slate-50 rounded-xl w-full border items-start" v-for="user in 1">
                                                <div class=" h-16 w-20 bg-blue rounded-lg"></div>
                                                <div class="flex flex-col text-start w-full">
                                                    <div class="flex flex-row w-full justify-between items-start flex-wrap gap-3">
                                                        <div>
                                                            <p class="text-xl font-bold">Odii Daniel(test)</p>
                                                            <p class="text-gray-400">web Developer</p>
                                                        </div>
                                                        <span class="rounded-lg bg-orange-100 text-orange-700 p-2">counter offer</span>
                                                    </div>
                                                    <div>
                                                        <p>Cover Letter: lorem ipsum dolor sit amet..</p>
                                                        <p>Attachments: book1.pdf</p>
                                                        <p>Counter offer: 50000</p>
                                                        <p>Reason: abeg bros</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>You have not posted any job yet. Post now</div>
                            </div>
                            <div v-if="current_tab == 'saved'" class="p-3 bg-white rounded-lg mt-3 flex flex-col gap-3">
                                Saved Freelancers here...
                                <div class="p-3 flex flex-row gap-3 hover:bg-slate-50 rounded-xl w-full border items-start" v-for="user in 3">
                                    <div class=" h-16 w-20 bg-blue rounded-lg"></div>
                                    <div class="flex flex-col text-start w-full">
                                        <div class="flex flex-row w-full justify-between items-start flex-wrap gap-3">
                                            <div>
                                                <p class="text-xl font-bold">Odii Daniel</p>
                                                <p class="text-gray-400">web Developer</p>
                                                <p class="text-gray-400">Rating *****</p>
                                                <p class="text-gray-400">Earned: $5000000</p>
                                            </div>
                                            <div class="flex flex-row gap-3">
                                                <button class="bg-white border-blue p-3 border rounded-md hover:bg-slate-100">Message</button>
                                                <button class="btn">Assign Job</button>
                                                <button class="border p-3 rounded-md">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import TemplateView from './TemplateView.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
    name: "ClientDashboardPage",
    components: { TemplateView, SkeletonLoader },
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
        }
        
    },
    methods:{
        switchTab(tab){
            this.current_tab = tab;
        },
        getUser(){
            this.store.dispatch('fetchUserData');
            // this.user = this.store.getters.getUserData.user;
        },
        formattedDate(dateToFormat) {
        return formatToRelativeTime(dateToFormat);
        },

        show_applicants(index) {
            this.jobs[index].show_applicants = !this.jobs[index].show_applicants;
        },

        async getJobsByEmployer(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/employer/jobs`, { headers });
                // console.log(response)
                this.jobs = response.data.jobs;
                this.jobs.forEach(job => {
                    job.show_applicants = false;
                    // job.showDetails = false;
                });
            }catch(error){
                console.log(error)
            }
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