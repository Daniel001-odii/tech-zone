<template>
    <PageTitle>Notifications</PageTitle>
    <!-- TOAST -->
        <Toast/>
    <!-- ***** -->
    <div>
    
                <div class="p-3 flex flex-col gap-3 justify-start text-left items-start">
                    <div class="flex flex-row justify-between w-full">

                        
                        <button @click="clearAllNotifications" class="rounded-md px-6 py-2 text-white bg-tz_blue" :disabled="!notifications || notifications.length <= 0">clear all</button>
                        
                        <div class=" flex flex-row gap-3 items-center justify-between">
                            <div class="flex flex-col">
                                <span class="font-bold">Show only unread</span>
                            </div>
                            
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" v-model="showAllNotifications">
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    <div v-for="(notification, notification_id) in notifications" :key="notification_id" class="w-full">
                        <div v-if="!showAllNotifications" class="p-3 border flex flex-row justify-between mb-3 hover:bg-gray-50 rounded-lg dark:hover:bg-tz_light_blue dark:border-gray-600 w-full">
                            <div class="flex flex-col" :class="notification.isRead ? 'text-gray-500':''">
                                {{ notification.message }} <br/>
                                {{ formatTimestamp(notification.created) }} <br/>
                                <!-- <RouterLink class="text-tz_blue" v-if="notification.link_url" :to="notification.link_url">see more</RouterLink> -->
                            </div>
                            <button v-if="!notification.isRead"  @click="markNotificationAsRead(notification._id, notify_id)">Mark as read</button>
                        </div>

                        <!-- ONLY UNREADS -->
                        <div v-if="showAllNotifications && !notification.isRead" class="p-3 border flex flex-row justify-between mb-3 hover:bg-gray-50 rounded-lg dark:hover:bg-tz_light_blue dark:border-gray-600 w-full">
                            <div class="flex flex-col" :class="notification.isRead ? 'text-gray-500':''">
                                {{ notification.message }} <br/>
                                {{ formatTimestamp(notification.created) }} <br/>
                                <RouterLink class="text-tz_blue" v-if="notification.link_url" :to="notification.link_url">see more</RouterLink>
                            </div>
                            <button v-if="!notification.isRead"  @click="markNotificationAsRead(notification._id, notify_id)">Mark as read</button>
                        </div>
                    </div>

                    <div class="text-center w-full p-5" v-if="notifications.length <= 0 || !notifications">No new notifications</div>
                </div>
               <!-- {{ notifications }} -->
              
            <!-- </template>
        </TemplateView> -->
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from './TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import PageTitle from '@/components/PageTitle.vue';
import { formatTimestamp } from '@/utils/dateFormat';
import { formatToRelativeTime } from '@/utils/dateFormat';
import DismissableAlert from '@/components/DismissableAlert.vue';
import Toast from 'primevue/toast';

export default {
    name: "NotificationsPageView",
    components: { 
        TemplateView, 
        ContractStatus, 
        PageTitle, 
        DismissableAlert,
        Toast,
    },
    data(){
        return{
            showAllNotifications: false,
            notifications: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            formatTimestamp,
            formatToRelativeTime,
            alerts: [],
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


        async markNotificationAsRead(notification_id, index){
            console.log(notification_id);

            this.notifications.splice(index, 1);
            console.log("removed notifications: ", notification_id, " index: ", index)

            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/notifications/${notification_id}/read`, {}, { headers });
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });
                this.getNotifications();
                
            }catch(error){
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },

        async clearAllNotifications(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/notifications/clear`, {}, { headers } );
                console.log("user notifications: ", response);
                this.getNotifications();
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });

            }catch(error){
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },
    },
    created(){
        this.getNotifications();
    }
}
</script>
<style scoped>
    
</style>