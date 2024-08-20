<template>
<SessionExpiredModal v-if="session_expired_modal"/>

<div class="bg-transparent border-b border-gray-600">
    <!-- <div class="  max-w-screen-2xl mx-auto my-0 w-full "> -->
        <!-- THE DUMMY NAVBAR BELOW SHOWS AS A LOADER ONLY WHEN USER INFO IS NOT AVAILABLE -->
        <div v-if="is_authenticated && !user">
            <nav>
                <div class="flex flex-row w-full justify-between p-3 items-center border-b border-gray-200  dark:border-gray-600">
                    <SiteLogo/>
                    <!-- <div class="skeleton text-transparent border-4 rounded-md hidden md:flex flex-row items-center h-12 overflow-hidden dark:border-gray-600">
                        <input type="search" v-model="job_search" class="p-3 bg-slate-100 border-none form_input">
                        <button @click="handleSearch" class="flex flex-row gap-2 border-l dark:border-gray-500 h-full px-3 items-center hover:bg-slate-50 dark:hover:bg-tz_light_blue">
                            <i class="bi bi-search"></i>
                            <span>Search</span>
                        </button>
                    </div> -->
                    <div class="skeleton flex flex-row items-center gap-1 md:mr-2">
                        <div class=" h-10 w-10 bg-gray-300 rounded-full"></div>
                        <i class="bi bi-three-dots-vertical"></i>
                        <div class=" h-10 w-10 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </nav>
        </div>

        <!-- NAVBAR FOR MAIN APPLICATION AND AUTHENTICATED USERS -->
        <!-- <div class="flex justify-center items-center w-full bg-white dark:bg-[#1F2A36] dark:text-white " style="margin: 0 auto;"> -->
            <!-- this navbar here displays only on mobile views. -->
        
            <div v-if="mobile_nav && user" class="flex flex-col fixed h-screen bg-white top-0 left-0 w-screen z-30 md:hidden py-8 px-4 dark:bg-[#1F2A36] dark:text-white">
                <button @click="mobile_nav = !mobile_nav" class=" text-3xl absolute right-5 top-4 border">
                    <span class="">&times;</span>
                </button>
            
                <div class="text-center">
                <div class="flex flex-col text-left gap-2 mt-8 w-full p-2 " @click="mobile_nav = !mobile_nav" v-if="user_type == 'user'">
                    <RouterLink to="/in/jobs" class="nav_link">Work Explorer</RouterLink>

                    <RouterLink to="/in/saved" class="nav_link">Saved Jobs</RouterLink>

                    <RouterLink to="/in/messages" class="nav_link">Messages</RouterLink>

                    <RouterLink to="/in/contracts" class="nav_link">Contracts</RouterLink>

                    <RouterLink :to="'/in/users/' + user._id" class="nav_link">My Profile</RouterLink>

                    <RouterLink to="/in/applications" class="nav_link">My Applications</RouterLink>

                    <RouterLink to="/in/overview" class="nav_link">Overview</RouterLink>

                    <RouterLink to="/in/notifications" class="nav_link">Notifications</RouterLink>

                    <RouterLink to="/in/settings" class="nav_link">Settings</RouterLink>

                    <RouterLink to="/support" class="nav_link">Help & Support</RouterLink>
                </div>
                <div class="flex flex-col text-left gap-2 mt-8 w-full p-2 " @click="mobile_nav = !mobile_nav" v-if="user_type == 'employer'">
                    <RouterLink to="/client/dashboard" class="nav_link">Dashboard</RouterLink>
                    <RouterLink to="/client/jobs" class="nav_link">My Jobs</RouterLink>
                    <RouterLink to="/messages" class="nav_link">Messages</RouterLink>
                    <RouterLink to="/client/profile" class="nav_link">My Profile</RouterLink>
                    <RouterLink to="/client/contracts" class="nav_link">Contracts & Hires</RouterLink>
                    <RouterLink to="/client/billings" class="nav_link"><i class="bi bi-compass"></i> Billings & payments</RouterLink>
                    <RouterLink to="/client/settings" class="nav_link"> Settings</RouterLink>

                </div>

                    <button @click="logout" class="menu_item mt-5"><i class="bi bi-box-arrow-right"></i> Logout</button>
                    
                
                </div>
            </div>

            <nav v-if="user">
                <div class="flex flex-row w-full justify-between p-3 items-center">
                    
                    <SiteLogo/>

                    <!-- <div @submit.prevent="searchJob" class="border rounded-md hidden md:flex flex-row items-center h-12 overflow-hidden"> -->
                    
                    <!-- ADD Link to search page to redirect on click -->
                    <RouterLink to="/client/search">
                        <div class="border rounded-md hidden md:flex flex-row items-center h-12 overflow-hidden dark:border-gray-600">
                            <input type="search" :placeholder="user.role == 'user' ? 'Search for jobs':'Search for Talents'" v-model="job_search" class="p-3 bg-slate-100 border-none form_input">
                            <button @click="handleSearch" class="flex flex-row gap-2 border-l dark:border-gray-600 h-full px-3 items-center hover:bg-slate-50 dark:hover:bg-tz_light_blue">
                                <i class="bi bi-search"></i>
                                <span>Search</span>
                            </button>
                        </div>
                    </RouterLink>


                    <div  v-if="user" class="flex flex-row items-center gap-3">
                        <button @click="updateTheme" class="p-2 md:hidden rounded-full w-10 h-10 dark:bg-gray-700 bg-gray-200 flex justify-center items-center">
                            <span>
                                <span class="dark:hidden">
                                    <i class="pi pi-sun"></i>
                                </span>
                                <span class="hidden dark:inline-block">
                                    <i class="pi pi-moon"></i>
                                </span>
                            </span>
                        </button>
                        <div class="relative">
                            <!-- <div class=" h-3 w-3 flex justify-center items-center text-white  rounded-full bg-red-600 absolute right-[0] top-0 z-10" v-if="notifications && notifications.length > 0"></div> -->
                            
                            <!-- NOTIFICATION MENU AND BELL ICON AS TRIGGER -->
                            <CustomDropdown>
                                <template #trigger>
                                    <i class="bi bi-bell border-2 rounded-full h-10 w-10 flex dark:border-gray-400 justify-center items-center relative group/notifications " ></i>
                                </template>
                                <template #menu>
                                    <div class=" max-w-[300px] w-[250px] border bg-white rounded-lg p-1 flex  flex-col gap-2 z-50 dark:bg-[#1F2A36] dark:border-gray-600 ">
                                        <span class="text-center p-2 border-b w-full dark:border-gray-600">Notifications</span>
                                        <div class=" max-h-[250px] overflow-y-auto">
                                            <div v-for="(notification, notify_id) in notifications.slice(0,3)" :key="notify_id" class="flex flex-row p-3 hover:bg-slate-50 rounded-md gap-3 justify-between items-start group/notify dark:hover:bg-tz_light_blue">
                                                <div class="flex flex-col gap-2 w-[88%]">
                                                    <span class="text-sm font-bold">{{  notification.message }}</span>
                                                    <span class="text-sm text-gray-400">{{ realTimeFormat(notification.created)  }}</span>
                                                </div>
                                                <button @click="markNotificationAsRead(notification._id, notify_id)" class="text-lg font-bold hidden group-hover/notify:block">
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div class=" text-center text-gray-400 h-[150px] flex flex-col justify-center items-center" v-if="notifications.length == 0">
                                            <i class="bi bi-bell text-3xl"></i>
                                            <p class="text-xl font-bold">You are all caught up</p>
                                            <span>No new notifications</span>
                                        </div>

                                        <RouterLink v-if="user.role == 'user'" to="/in/notifications" class="text-center border-t p-3 dark:border-gray-600">
                                                <span class="text-center text-tz_blue">see all notifications</span>
                                        </RouterLink>
                                        <RouterLink v-else to="/client/notifications" class="text-center border-t p-3 dark:border-gray-600">
                                                <span class="text-center text-tz_blue">see all notifications</span>
                                        </RouterLink>
                                    </div>
                                </template>
                            </CustomDropdown>
                            
                        </div>
                        
                        <i class="bi bi-three-dots-vertical"></i>
                        <div class="flex flex-row items-center gap-3 relative group">
                            <!-- USER MENU AND PROFILE IAMGE AS TRIGGER -->
                            <CustomDropdown>
                                <template #trigger>
                                    <img @click="mobile_nav = !mobile_nav" v-if="user.role == 'user' && user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" rounded-full h-9">
                                    <div @click="mobile_nav = !mobile_nav" v-else class="rounded-full h-9 w-9 flex font-bold justify-center cursor-pointer items-center bg-slate-200 text-slate-600">{{ user.firstname[0] }}{{ user.lastname[0] }}</div>
                                </template>
                                <template #menu>
                                    <UserDropDownMenu class=" hidden md:block" :username="user.firstname + ' ' + user.lastname" :email="user.email"/>
                                </template>
                            </CustomDropdown>
                     
                            
                        </div>
                    </div>
                </div>
            </nav>
            <div v-if="!is_authenticated && !user" class=" bg-white dark:bg-[#131920] border-b border-gray-200  dark:border-gray-600">
                <HomeNavbar />
            </div>
            
</div>
</template>
<script>
import { formatToRelativeTime } from '@/utils/dateFormat';
import SiteLogo from './SiteLogo.vue';
import UserDropDownMenu from './UserDropDownMenu.vue';
import axios from 'axios'
import { io } from 'socket.io-client';

import SessionExpiredModal from './SessionExpiredModal.vue'
import HomeNavbar from './HomeNavbar.vue';

import CustomDropdown from '../components//CustomDropdown'

export default {
    name: "Navbar",
    components: { 
        SiteLogo, 
        UserDropDownMenu, 
        SessionExpiredModal,
        HomeNavbar, 
        CustomDropdown
    },
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

            is_authenticated: false,

            user_type: '',
            session_expired_modal: false,

            
        };
    },

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
                this.user_type = response.data.user.role;
            }
            catch(error){
                console.log("error from navbar :", error);
                if(error.response.status == '401' && localStorage.getItem('life-gaurd')){
                    
                    localStorage.removeItem('life-gaurd');
                    this.session_expired_modal = true;
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

        async markNotificationAsRead(notification_id, index){
            console.log(notification_id);

            this.notifications.splice(index, 1);
            console.log("removed notifications: ", notification_id, " index: ", index)

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
            localStorage.removeItem("theme");
            this.$router.push('/login');
            window.location.reload();
        },

        updateTheme(){
            if(localStorage.theme == 'light'){
                // dark_mode(){
                    localStorage.setItem('theme', 'dark');
                    document.documentElement.classList.add("dark");
                    this.theme = true;
                // };
            } else {
                localStorage.setItem('theme', 'light');
                document.documentElement.classList.remove("dark");
                this.theme = false;
            }
        },

        realTimeFormat(time){
            return formatToRelativeTime(time)
        },

        // Method to clear the interval
        stopNotifications() {
            clearInterval(this.notificationInterval);
        }

    },
    created(){
        this.getUserData();
        this.getNotifications();
        if(localStorage.getItem('life-gaurd')){
            this.is_authenticated = true;
        };

        // get notifications...
        this.getNotifications();
        
    },

    unmounted() {
        this.stopNotifications();
    },
}
</script>
<style scoped>
    .nav_btn{
        @apply px-5 py-2 font-bold;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-tz_light_blue font-medium hover:font-bold;
    }

    .menu_item{
    
    }

    @keyframes skeletonLoading {
    0% {
        opacity: 0.4;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.4;
    }
    }

    .skeleton {
    animation: skeletonLoading 1.5s infinite;
    }
    
</style>