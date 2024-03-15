<template>

<div class="dark:bg-[#27323F]">


    <div>
        <nav v-if="!user" class="bg-white start-0 border-b border-gray-200  dark:border-gray-600 relative z-30 dark:bg-[#1F2A36]">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <SiteLogo/>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div class="flex justify-self-end md:flex gap-3 md:m-0">
                    <RouterLink to="/login">
                        <button class="btn rounded-md text-tz_blue hover:text-tz_blue hover:bg-tz_light_blue">Login</button>
                    </RouterLink>
                    <RouterLink to="/register/decide">
                        <button class="btn rounded-md bg-tz_blue hover:bg-tz_dark_blue text-white">Sign Up</button>
                    </RouterLink>
                </div>
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>

            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                        <RouterLink to="/" class="block py-2 px-3 text-gray-900 bg-tz_blue-700 rounded md:bg-transparent md:text-tz_blue-700 md:p-0 md:dark:text-tz_blue-500 dark:text-white">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/jobs" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-tz_blue-700 md:p-0 md:dark:hover:text-tz_blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find Job</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/register/decide" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-tz_blue-700 md:p-0 md:dark:hover:text-tz_blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Post Job</RouterLink>
                    </li>
                </ul>
            </div>

            </div>
        </nav>
    </div>

    <div class="flex justify-center items-center w-full bg-white dark:bg-[#1F2A36] dark:text-white  border-gray-200  dark:border-gray-600" style="margin: 0 auto;">
        <!-- this navbar here displays only on mobile views. -->
        <div v-if="mobile_nav && user" class="flex flex-col fixed h-screen bg-white top-0 left-0 w-screen z-30 md:hidden py-8 px-4 dark:bg-[#1F2A36] dark:text-white">
            <button @click="mobile_nav = !mobile_nav" class=" text-3xl absolute right-5 top-4 border">
                <span class="">&times;</span>
            </button>
        
            <div class="flex flex-col gap-2 mt-8 w-full p-2 " @click="mobile_nav = !mobile_nav">
                <!-- <div> -->
                    <!-- <span>Overview</span> -->
                    <!-- <div class="flex flex-col gap-8"> -->
                <RouterLink to="/" class="nav_link">
                    Work Explorer
                </RouterLink>

                <RouterLink to="/saved-jobs" class="nav_link">
                    Saved Jobs
                </RouterLink>

                <RouterLink to="/messages" class="nav_link">
                    Messages
                </RouterLink>

                <RouterLink to="/contracts" class="nav_link">
                    Contracts
                </RouterLink>

                <RouterLink to="/" class="nav_link">
                Notifications
                </RouterLink>

                <RouterLink :to="'/users/' + user._id" class="nav_link">
                    My Profile
                </RouterLink>

                <RouterLink to="/jobs/applications" class="nav_link">
                    My Applications
                </RouterLink>

                <RouterLink to="/settings" class="nav_link">
                    Settings
                </RouterLink>

                <RouterLink to="/" class="nav_link">
                    Help & Support
                </RouterLink>

                <button @click="logout" class="menu_item"><i class="bi bi-box-arrow-right"></i> Logout</button>
                
            
            </div>
        </div>

        <nav v-if=" !loading && user">
            <div class="flex flex-row w-full justify-between p-3 items-center">
                <SiteLogo/>

                <!-- <div @submit.prevent="searchJob" class="border rounded-md hidden md:flex flex-row items-center h-12 overflow-hidden"> -->
                <div class="border-4 rounded-md hidden md:flex flex-row items-center h-12 overflow-hidden dark:border-gray-600">
                    <input type="search" placeholder="saerch for jobs" v-model="job_search" class="p-3 bg-slate-100 border-none form_input">
                    <button @click="handleSearch" class="flex flex-row gap-2 border-l dark:border-gray-500 h-full px-3 items-center hover:bg-slate-50 dark:hover:bg-tz_light_blue">
                        <i class="bi bi-search"></i>
                        <span>Search</span>
                    </button>
                </div>

                <div v-if="!user">Loading...</div>
                <div  v-if="user" class="flex flex-row items-center gap-1">

                    <div class="relative" v-click-outside="closeDropdown" >
                        <div class=" h-4 w-4 flex justify-center items-center text-white border-2 border-white rounded-full bg-red-500 absolute right-[0] -top-1 z-10" v-if="notifications && notifications.length > 0"></div>
                        
                        <i class="bi bi-bell border-2 rounded-full h-10 w-10 flex justify-center items-center relative group/notifications " @click="notify_menu = !notify_menu"></i>
                        
                        <div v-if="notify_menu" class=" max-w-[300px] w-[250px] border absolute bg-white top-9 -right-8 rounded-lg p-1 flex  flex-col gap-2 z-10 dark:bg-[#1F2A36] dark:border-gray-600">
                           <span class="text-center p-2 border-b w-full dark:border-gray-600">Notifications</span>
                           <div v-for="(notification, notify_id) in notifications.slice(0,3)" :key="notify_id" class="p-3 hover:bg-slate-50 rounded-md flex flex-row gap-3 justify-between items-start group/notify dark:hover:bg-tz_light_blue">
                            <div class="flex flex-col">
                                <span class="text-sm font-bold">{{  notification.message }}</span>
                                <span class="text-sm text-gray-400">{{ realTimeFormat(notification.created)  }}</span>
                            </div>
                            <button @click="markNotificationAsRead(notification._id)" class="text-lg font-bold hidden group-hover/notify:block">
                                <span>&times;</span>
                            </button>
                            
                           </div>

                            <div class=" text-center text-gray-400 h-[150px] flex flex-col justify-center items-center" v-if="notifications.length == 0">
                                <i class="bi bi-bell text-3xl"></i>
                                <p class="text-xl font-bold">You are all caught up</p>
                                <span>No new notifications</span>
                            </div>

                           <RouterLink to="/notifications" class="text-center mb-3 border-t p-3 dark:border-gray-600">
                                <span class="text-center text-tz_blue">see all notifications</span>
                           </RouterLink>
                        </div>

                        

                    </div>
                    
                    <i class="bi bi-three-dots-vertical"></i>
                    <div class="flex flex-row items-center gap-3 relative group">
                        <img @click="mobile_nav = !mobile_nav" v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" rounded-full h-9">
                        <UserDropDownMenu class=" hidden md:block" :username="user.firstname + ' ' + user.lastname" :email="user.email"/>
                    </div>
                

                </div>
            </div>
            
        </nav>
    </div>

</div>
</template>
<script>
import { formatToRelativeTime } from '@/utils/dateFormat';
import SiteLogo from './SiteLogo.vue';
import UserDropDownMenu from './UserDropDownMenu.vue';
import axios from 'axios'
import { io } from 'socket.io-client';



export default {
    name: "Navbar",
    props: {
        type: String,
        jobs_from_search: '',
    },
    data() {
        return {
            nav_visible: false,
            left_nav_open: false,

            notify_menu: false,
            user_menu: false,

            user: null,
            loading: null,

            notifications: '',
            mobile_nav: false,
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            job_search: '',

            
        };
    },
    components: { SiteLogo, UserDropDownMenu },
    methods: {
        toggleNavbar(){
            this.left_nav_open = !this.left_nav_open;
            this.$emit('toggle-nav');
        },

        closeDropdown(){
            this.notify_menu = false;
        },

        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true, // Use 12-hour format
            };
            return date.toLocaleDateString(undefined, options);
        },

        async getUserData(){
            try{
                 // Get the token from localStorage
                const token = localStorage.getItem('life-gaurd');
                const headers = {
                    Authorization: `JWT ${token}`, // Assuming it's a JWT token
                };

                const response = await axios.get(`${this.api_url}/user`, { headers });
                this.user = response.data.user;
            }
            catch(error){
                console.log("error from navbar :", error);
                if(error.response.status == '401' && localStorage.getItem('life-gaurd')){
                    alert('Your session expired please login again')
                    localStorage.removeItem('life-gaurd');
                    this.$router.push('/login');
                }
            }
        },

        async getNotifications(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/notifications/unread`, { headers } )
                console.log("user notifications: ", response);
                this.notifications = response.data.notifications.reverse();

            }catch(error){
                console.log(error);
            }
        },

        async markNotificationAsRead(notification_id){
            console.log(notification_id)
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/notifications/${notification_id}/read`, {}, { headers });
                console.log(response);
                this.getNotifications();
            }catch(error){
                console.log("error marking notification as read...", error)
            }
        },

        async searchJob(){
            try{
                const response = await axios.get(`${this.api_url}/jobs/search`, {
                params: {
                    keywords: this.job_search,
                }});

                console.log(response);
                this.jobs_from_search = response.data.jobs;
                this.$router.push('/jobs');

            }catch(error){
                console.log(error)
            }
        },

        handleSearch() {
            this.$emit('search', {
                keywords: this.job_search
        })},

        logout(){
            localStorage.removeItem("life-gaurd");
            this.$router.push('/');
            window.location.reload();
        },

        realTimeFormat(time){
            return formatToRelativeTime(time)
        },

    },
    mounted(){
        this.getUserData();
        this.getNotifications();
        
    },
}
</script>
<style scoped>
    .btn{
        @apply px-5 py-2 font-bold;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-tz_light_blue font-medium hover:font-bold;
    }
    
</style>