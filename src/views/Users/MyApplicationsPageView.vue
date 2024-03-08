<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>My Applications</template>
            <template #page-contents>
                <SkeletonLoader v-if="loading"/>
                <div class="p-5" v-if="!loading && applications.length <= 0">You haven't applied for any job yet</div>
                <div v-if="!loading && applications " class="flex flex-col overscroll-y-scroll" v-for="application in applications">
                    <div class="flex flex-col text-left gap-3 border-b p-6 hover:bg-light_blue">
                        <div>{{ formattedTime(application.created) }}</div>
                        <div class="flex flex-row justify-between items-center">
                            <div class="text-2xl font-bold">
                                <RouterLink :to="'/jobs/' + application._id + '/application'">
                                    {{ application.title }}
                                </RouterLink>
                            </div>
                            <!-- <div class="text-lg gap-4 flex flex-row-reverse">
                                <button class="icon_btn">
                                    <i class="bi bi-bookmark-check-fill"></i>
                                </button>
                                <button class="icon_btn">
                                    <i class="bi bi-hand-thumbs-down"></i>
                                </button>
                            </div> -->
                        </div>
                        <div class="flex flex-row gap-2">
                            <span class=" bg-light_blue p-2 rounded-md">
                                <i class="bi bi-wallet"></i> <span>#{{ application.budget.toLocaleString() }}</span>
                            </span>
                            <span class=" bg-blue p-2 rounded-md text-white">
                                <i class="bi bi-briefcase"></i> <span>{{ application.period }}</span>
                            </span>
                        </div>
                        <div>
                            {{ application.description.substring(0, 200) }}
                        </div>
                    </div>
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import TemplateView from '../TemplateView.vue';
import axios from 'axios';
import { formatToRelativeTime } from '@/utils/dateFormat';

export default {
    name: "MyApplicationsPage",
    components: { TemplateView, SkeletonLoader },
    data(){
        return{
            loading: false,
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            applications: '',
        }
    },
    methods: {
        async getAllApplications(){
            const headers = this.headers;
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/jobs/applied`, { headers });
                console.log(response.data)
                this.applications = response.data.applications.reverse();
                this.loading = false;
            } catch(error){
                // handle error here...
                this.loading = false;
            }
        },

        formattedTime(time){
            return formatToRelativeTime(time);
        }
    },

    mounted(){
        this.getAllApplications();
    }
}
</script>
<style scoped>
    
</style>