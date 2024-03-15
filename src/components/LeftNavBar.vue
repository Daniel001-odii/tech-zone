<template>
    <div>
        <div class=" md:block md:w-28 lg:w-56 border-r border-b md:border-b-0 h-full dark:border-gray-600">
            <div class=" md:h-20"></div>
            <!-- EMPLOYER -->
            <div v-if="user.role === 'employer'">
                <RouterLink to="/client/dashboard" >
                    <div class="nav_item" :class="{ 'active': isDashboard }">
                        <i class="bi bi-box" v-if="!isDashboard"></i> 
                        <i class="bi bi-box-fill" v-if="isDashboard"></i> 
                        <span class="md:hidden lg:inline-block">Dashboard</span>
                    </div>
                </RouterLink>
                <RouterLink to="/client/jobs" >
                    <div class="nav_item" :class="{ 'active': isMyJobs }">
                        <i class="bi bi-briefcase" v-if="!isMyJobs"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isMyJobs"></i> 
                        <span class="md:hidden lg:inline-block">My Jobs</span>
                    </div>
                </RouterLink>
                <RouterLink to="/messages" >
                    <div class="nav_item" :class="{ 'active': isMessages }">
                        <i class="bi bi-chat-square-text" v-if="!isMessages"></i> 
                        <i class="bi bi-chat-square-text-fill" v-if="isMessages"></i> 
                        <span class="md:hidden lg:inline-block">Messages</span>
                    </div>
                </RouterLink>

            </div>

            <!-- USER -->
            <div v-if="user.role === 'user'">
                <RouterLink to="/jobs" >
                    <div class="nav_item" :class="{ 'active': isWorkExplorer }">
                        <i class="bi bi-briefcase" v-if="!isWorkExplorer"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isWorkExplorer"></i>
                        <span class="md:hidden lg:inline-block">Work Explorer</span>
                    </div>
                </RouterLink>
                <RouterLink to="/saved-jobs" >
                    <div class="nav_item" :class="{ 'active': isSavedJobs }">
                        <i class="bi bi-bookmark-check" v-if="!isSavedJobs"></i> 
                        <i class="bi bi-bookmark-check-fill" v-if="isSavedJobs"></i> 
                        <span class="md:hidden lg:inline-block">Saved Jobs</span>
                    </div>
                </RouterLink>
                <RouterLink to="/messages" >
                    <div class="nav_item" :class="{ 'active': isMessages }">
                        <i class="bi bi-chat-square-text" v-if="!isMessages"></i> 
                        <i class="bi bi-chat-square-text-fill" v-if="isMessages"></i> 
                        <span class="md:hidden lg:inline-block">Messages</span>
                    </div>
                </RouterLink>
                <RouterLink to="/contracts" >
                    <div class="nav_item" :class="{ 'active': isContracts }">
                        <i class="bi bi-gift" v-if="!isContracts"></i> 
                        <i class="bi bi-gift-fill" v-if="isContracts"></i> 
                        <span class="md:hidden lg:inline-block">Contracts</span>
                    </div>
                </RouterLink>
            </div>

            <div v-if="user.role != 'user' && user.role != 'employer'">
                <RouterLink to="/jobs" >
                    <div class="nav_item" :class="{ 'active': isWorkExplorer }">
                        <i class="bi bi-briefcase" v-if="!isWorkExplorer"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isWorkExplorer"></i>
                        <span class="md:hidden lg:inline-block">Work Explorer</span>
                    </div>
                </RouterLink>
            </div>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "LeftnavBar",
    
    computed: {
        isWorkExplorer() { return this.$route.path.startsWith("/jobs"); },
        isSavedJobs() { return this.$route.path.startsWith("/saved-jobs"); },
        isContracts() { return this.$route.path.startsWith("/contracts"); },
        isMessages() { return this.$route.path.startsWith("/messages"); },

        // EMPLOYER....
        isDashboard() { return this.$route.path.startsWith("/client/dashboard"); },
        isMyJobs() { return this.$route.path.startsWith("/client/jobs"); },
    },
    data(){
        return{
            user: '',
        }
    },
    methods: {
        async getUserData(){
            try{
                const headers = {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`, // Assuming it's a JWT token
                };
                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("from sidenav: ", response.data.user)
                this.user = response.data.user;
            }
            catch(error){
                // console.log("error from sidenav :", error);
            }
        },
    },
    mounted(){
        this.getUserData();
    }
    
}
</script>
<style scoped>
    .active{
        @apply border-l-tz_blue text-tz_blue bg-tz_light_blue font-bold
    }

    .nav_item{
        @apply  h-20 hover:bg-tz_light_blue flex md:justify-center pl-8 md:p-0 lg:pl-8 lg:justify-start justify-start items-center gap-3 border-l-8;
    }
</style>