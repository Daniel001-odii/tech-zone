<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Notifications</template>
            <template #page-contents>
                <div class="p-3">
                    <div class="p-3 border mb-3 hover:bg-gray-50 rounded-lg dark:hover:bg-tz_light_blue dark:border-gray-500" v-for="notification in notifications" :key="notification._id">
                        {{ notification.message }} <br/>
                        {{ notification.created }} <br/>
                        <RouterLink class="text-tz_blue" v-if="notification.link_url" :to="notification.link_url">see more</RouterLink>
                    </div>
                </div>
               <!-- {{ notifications }} -->
              
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from './TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: "NotificationsPageView",
    components: { TemplateView, ContractStatus },
    data(){
        return{
            notifications: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
        }
    },
    methods:{
        // get all user notifications...
        async getNotifications(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/notifications`, { headers } )
                console.log("user notifications: ", response);
                this.notifications = response.data.notifications.reverse();

            }catch(error){
                console.log(error);
            }
        },
       
    },
    mounted(){
        this.getNotifications();
    }
}
</script>
<style scoped>
    
</style>