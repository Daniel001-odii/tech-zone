<template>
    <PageTitle>Notifications</PageTitle>
    <!-- TOAST -->
        <Toast/>
    <!-- ***** -->
    <div>
    
                <div class="p-3 flex flex-col gap-3 justify-start text-left items-start">
                    <div class="flex flex-row-reverse justify-between w-full">

                        
                        <button @click="clearAllNotifications" class="btn rounded-md px-6 py-2 text-white bg-tz_blue"  :disabled="!notifications || notifications.length <= 0">clear all</button>
                        
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
                        <div v-if="!showAllNotifications" class="p-5 bg-slate-50 border border-slate-100 dark:bg-gray-600 flex flex-row justify-start items-start mb-3 hover:bg-gray-50 rounded-lg dark:hover:bg-tz_light_blue dark:border-gray-600 w-full gap-3 relative" :class="notification.isRead ? 'opacity-30':''">
                            <div class="text-xl">
                                <i class="bi bi-gift-fill" v-if="notification.type == 'contract'"></i>
                                <i class="bi bi-briefcase-fill" v-if="notification.type == 'job'"></i>
                                <i class="bi bi-person-fill" v-if="notification.type == 'account'"></i>
                                <i class="bi bi-cash-stack" v-if="notification.type == 'payment'"></i>
                                <i class="bi bi-chat-left-text-fill" v-if="notification.type == 'message'"></i>
                                <img src="../assets/images/dot_logo.svg" class=" !size-5" v-if="notification.type == 'platform'"/>
                            </div>
                            <div class="flex flex-col w-[80%]" >
                                <RouterLink :to="`/in${notification.link_url}`" target="_blank">
                                {{ notification.message }}
                                </RouterLink>
                                <br/>
                                <span class="text-gray-400">{{ formatTimestamp(notification.createdAt) }}</span>
                                <!-- <RouterLink class="text-tz_blue" v-if="notification.link_url" :to="notification.link_url">see more</RouterLink> -->
                            </div>
                            <button v-if="!notification.isRead"  @click="markNotificationAsRead(notification._id, notify_id)" class="absolute right-2 top-2 p-3 rounded-xl hover:bg-gray-500">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <!-- ONLY UNREADS -->
                        <div v-if="showAllNotifications && !notification.isRead" class="p-5 border flex flex-row justify-between mb-3 hover:bg-gray-50 rounded-lg dark:hover:bg-tz_light_blue dark:border-gray-600 w-full" :class="notification.isRead ? 'opacity-30':''">
                            <div class="flex flex-col" >
                                {{ notification.message }} <br/>
                                <span class="text-gray-400">{{ formatTimestamp(notification.created) }}</span>
                                <RouterLink class="text-tz_blue" v-if="notification.link_url" :to="notification.link_url">see more</RouterLink>
                            </div>
                            <button v-if="!notification.isRead"  @click="markNotificationAsRead(notification._id, notify_id)">Mark as read</button>
                        </div>
                    </div>

                    <div class="text-center w-full p-5" v-if="notifications.length <= 0 || !notifications">
                        <div class=" text-center text-gray-400 h-[150px] flex flex-col justify-center items-center" v-if="notifications.length == 0">
                            <i class="bi bi-bell text-3xl"></i>
                            <p class="text-xl font-bold">You are all caught up</p>
                            <span>No new notifications</span>
                        </div>
                    </div>
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

import { useToast } from 'vue-toastification';

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
            toast: useToast(),
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
                this.toast.success(`${response.data.message}`);
                this.getNotifications();
                
            }catch(error){
                this.toast.error(`${response.data.message}`);
            }
        },

        async clearAllNotifications(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/notifications/clear`, {}, { headers } );
                console.log("user notifications: ", response);
                this.getNotifications();
                this.toast.success(`${response.data.message}`);
               

            }catch(error){
                this.toast.error(`${response.data.message}`);
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