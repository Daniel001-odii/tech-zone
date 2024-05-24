<template>
    <!-- <div> -->
        <div class="md:block md:w-28 lg:w-56 dark:bg-[#27323F]">
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
                <RouterLink to="/client/messages" >
                    <div class="nav_item relative" :class="{ 'active': isClientMessages }">
                        <i class="bi bi-chat-square-text" v-if="!isMessages"></i> 
                        <i class="bi bi-chat-square-text-fill" v-if="isMessages"></i> 
                        <span class="md:hidden lg:inline-block">Messages</span>
                        <span class=" bg-red-600 p-2 rounded-full h-2 w-2 absolute top-6 right-9 lg:relative lg:top-0 lg:right-0 text-white text-[10px] font-normal justify-center items-center flex" v-if="unreadMessagesCount" >{{ unreadMessagesCount  }}</span>
                    </div>
                </RouterLink>
                <RouterLink to="/client/jobs" >
                    <div class="nav_item" :class="{ 'active': isMyJobs }">
                        <i class="bi bi-briefcase" v-if="!isMyJobs"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isMyJobs"></i> 
                        <span class="md:hidden lg:inline-block">My Jobs</span>
                    </div>
                </RouterLink>
                <RouterLink to="/client/contracts" >
                    <div class="nav_item" :class="{ 'active': isClientContracts }">
                        <i class="bi bi-gift" v-if="!isClientContracts"></i> 
                        <i class="bi bi-gift-fill" v-if="isClientContracts"></i> 
                        <span class="md:hidden lg:inline-block">Contracts & hires</span>
                    </div>
                </RouterLink>
               

            </div>

            <!-- USER -->
            <div v-if="user.role === 'user'">
                <RouterLink to="/in/jobs" >
                    <div class="nav_item" :class="{ 'active': isWorkExplorer }">
                        <i class="bi bi-briefcase" v-if="!isWorkExplorer"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isWorkExplorer"></i>
                        <span class="md:hidden lg:inline-block">Work Explorer</span>
                    </div>
                </RouterLink>
                <RouterLink to="/in/saved" >
                    <div class="nav_item" :class="{ 'active': isSavedJobs }">
                        <i class="bi bi-bookmark-check" v-if="!isSavedJobs"></i> 
                        <i class="bi bi-bookmark-check-fill" v-if="isSavedJobs"></i> 
                        <span class="md:hidden lg:inline-block">Saved Jobs</span>
                    </div>
                </RouterLink>
                <RouterLink to="/in/messages" >
                    <div class="nav_item relative" :class="{ 'active': isMessages }">
                        <i class="bi bi-chat-square-text" v-if="!isMessages"></i> 
                        <i class="bi bi-chat-square-text-fill" v-if="isMessages"></i> 
                        <span class="md:hidden lg:inline-block">Messages</span>
                        <span class=" bg-red-600 p-2 rounded-full h-2 w-2 absolute top-6 right-9 lg:relative lg:top-0 lg:right-0 text-white text-[10px] font-normal justify-center items-center flex" v-if="unreadMessagesCount > 0">{{ unreadMessagesCount  }}</span>
                    </div>
                </RouterLink>
                <RouterLink to="/in/contracts" >
                    <div class="nav_item" :class="{ 'active': isContracts }">
                        <i class="bi bi-gift" v-if="!isContracts"></i> 
                        <i class="bi bi-gift-fill" v-if="isContracts"></i> 
                        <span class="md:hidden lg:inline-block">Contracts</span>
                    </div>
                </RouterLink>
                <!-- <RouterLink to="/in/watch" >
                    <div class="nav_item" :class="{ 'active': isWatch }">
                        <i class="bi bi-clipboard2-pulse" v-if="!isWatch"></i> 
                        <i class="bi bi-clipboard2-pulse-fill" v-if="isWatch"></i> 
                        <span class="md:hidden lg:inline-block">Task Watch</span>
                    </div>
                </RouterLink> -->
            </div>

            <div v-if="user.role != 'user' && user.role != 'employer'">
                <div class=" md:h-20"></div>
                <RouterLink to="/jobs" >
                    <div class="nav_item" :class="{ 'active': isPublicWorkExplorer }">
                        <i class="bi bi-briefcase" v-if="!isPublicWorkExplorer"></i> 
                        <i class="bi bi-briefcase-fill" v-if="isPublicWorkExplorer"></i>
                        <span class="md:hidden lg:inline-block">Work Explorer</span>
                    </div>
                </RouterLink>
            </div>
            
        </div>
    <!-- </div> -->
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: "LeftnavBar",
    
    computed: {
        isPublicWorkExplorer() { return this.$route.path.startsWith("/jobs"); },
        isWorkExplorer() { return this.$route.path.startsWith("/in/jobs"); },
        isSavedJobs() { return this.$route.path.startsWith("/in/saved"); },
        isContracts() { return this.$route.path.startsWith("/in/contracts"); },
        isMessages() { return this.$route.path.startsWith("/in/messages") },
        isWatch() { return this.$route.path.startsWith("/in/watch") },

        // EMPLOYER....
        isDashboard() { return this.$route.path.startsWith("/client/dashboard"); },
        isMyJobs() { return this.$route.path.startsWith("/client/jobs"); },
        isClientMessages() { return this.$route.path.startsWith("/client/messages") },
        isClientContracts() { return this.$route.path.startsWith("/client/contracts") },


        // unread messages...
        ...mapGetters(['unreadMessagesCount']),
    },
    data(){
        return{
            user: '',
            unread_msg: 0,
            
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
    created(){
        this.getUserData();

    }
    
}
</script>
<style scoped>
    .active{
        @apply border-l-tz_blue text-[#81AAEA] bg-tz_light_blue font-bold 
    }

    .nav_item{
        @apply  h-20 hover:bg-tz_light_blue flex md:justify-center pl-8 md:p-0 lg:pl-8 lg:justify-start justify-start items-center gap-3  border-l-8 dark:border-l-[#27323F];
    }
</style>