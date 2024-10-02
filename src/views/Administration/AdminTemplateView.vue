<template>
   <div class="flex flex-row h-screen items-stretch justify-stretch bg-[#27323F]  dark:bg-[#1f2a36] dark:text-white">
    <div class="flex flex-col bg-black min-w-[300px] p-5">
        <div class="w-full flex justify-center items-center h-[150px]">
            <img src="../../../public/apex-tek-white.svg" class=" w-[150px]">
        </div>
       
            <div class=" mt-8 flex flex-col gap-3 text-white w-full text-sm">

                <RouterLink v-if="adminLevel_one" to="/admin/dashboard" class="side_nav_item" :class="{ 'active_page': isDashboard }">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="/admin/waitlist" class="side_nav_item" :class="{ 'active_page': isEarlyUsers }">
                    <i class="bi bi-people"></i>
                    <span>Early Users</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="/admin/users" class="side_nav_item" :class="{ 'active_page': isUsers }">
                    <i class="bi bi-people"></i>
                    <span>Users</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="/admin/employers" class="side_nav_item" :class="{ 'active_page': isEmployers }">
                    <i class="bi bi-buildings"></i>
                    <span>Employers</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-briefcase"></i>
                    <span>Jobs</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-gift"></i>
                    <span>Contracts</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_one" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-send-exclamation"></i>
                    <span>tickets</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_three" to="/admin/all" class="side_nav_item" :class="{ 'active_page': isAdmins }">
                    <i class="bi bi-key"></i>
                    <span>Admin Users</span>
                </RouterLink>

               

                <RouterLink v-if="adminLevel_two" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-chat-left-dots"></i>
                    <span>Messages</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_two" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-envelope-at"></i>
                    <span>Emails</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_two" to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-exclamation-triangle"></i>
                    <span>Alerts</span>
                </RouterLink>

                <RouterLink v-if="adminLevel_three" to="/admin/settings" class="side_nav_item" :class="{ 'active_page': isSettings }">
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </RouterLink>
            </div>
    </div>
    <div class="flex flex-col bg-white  dark:bg-[#1f2a36] w-[80%]">
         <!-- NAVBAR -->
         <div class="flex flex-row p-3 w-full items-center justify-between bg-white  dark:bg-[#1f2a36] dark:text-white border-b dark:border-b-gray-900">
                <div>
                    <span>{{ currentDate }}</span>
                </div>
                <div class="flex flex-row gap-8 items-center justify-end">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <div class=" size-[40px] bg-blue-300 rounded-full flex font-bold justify-center items-center text-blue-800">{{ admin_initials }}</div>
                        <div class="flex flex-col">
                            <div class="font-bold">{{ admin.firstname }} {{ admin.lastname }}   <span class=" bg-yellow-500 text-white py-1 px-3 w-fit text-sm rounded-xl">{{  admin.role  }}</span></div>
                            <span class="text-blue-500 text-sm">{{  admin.email  }}</span>
                           
                        </div>
                    </div>
                    <button class=" bg-gray-200 p-4 rounded-full flex justify-center items-center h-10 w-10 dark:bg-tz_light_blue">
                        <i class="bi bi-moon-fill"></i>
                    </button>

                    <button @click="logout" class=" bg-gray-200 p-4 rounded-full flex justify-center items-center h-10 w-10 dark:bg-tz_light_blue">
                        <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>

            <!-- PAGE CONTENT -->
            <div class="flex flex-col w-full overflow-y-auto p-5 h-full">
                
                <router-view></router-view>

            </div>
    </div>
   </div>
</template>

<script>
import AdminStat from '@/components/AdminStat.vue'
import SiteLogo from '@/components/SiteLogo.vue'
import axios from 'axios';

export default {
    name: "AdminTemplateView",
    components: { AdminStat, SiteLogo },
    data(){
        return{
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            admin: '',
            currentDate: '',
            admin_initials: '?',
            token: `JWT ${localStorage.getItem('life-gaurd')}`,
        }
    },
    computed: {
        isDashboard() { return this.$route.path.startsWith("/admin/dashboard"); },
        isSettings() { return this.$route.path.startsWith("/admin/settings"); },
        isEarlyUsers() { return this.$route.path.startsWith("/admin/waitlist"); },
        isUsers() { return this.$route.path.startsWith("/admin/users"); },
        isEmployers() { return this.$route.path.startsWith("/admin/employers"); },
        isJobs() { return this.$route.path.startsWith("/admin/jobs"); },
        isContracts() { return this.$route.path.startsWith("/admin/contracts"); },
        isAdmins() { return this.$route.path.startsWith("/admin/all"); },

        // "admin", "manager", "moderator", "team-lead", "team-member"
        adminLevel_one(){
            const userRole = this.token ? JSON.parse(atob(this.token.split('.')[1])).role : null;
            if(userRole == 'admin' || userRole == 'manager' || userRole == 'moderator' || userRole == 'team-lead' || userRole == 'team-member'){
                return true
            }
        },

        adminLevel_two(){
            const userRole = this.token ? JSON.parse(atob(this.token.split('.')[1])).role : null;
            if(userRole == 'admin' || userRole == 'manager' || userRole == 'moderator'){
                return true
            }
        },

        adminLevel_three(){
            const userRole = this.token ? JSON.parse(atob(this.token.split('.')[1])).role : null;
            if(userRole == 'admin' || userRole == 'manager'){
                return true
            }
        }
        
    },
    methods:{
        logout(){
            localStorage.removeItem('life-gaurd');
            this.$router.push('/site/login');
        },

        getCurrentDate() {
            const dateObject = new Date(); // Create a new Date object
            const formattedDate = dateObject.toDateString(); // Get the date in a human-readable format
            this.currentDate = formattedDate; // Update currentDate with the formatted date
        },

        async getAdminData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/admin/data`, { headers} );
                // console.log("admin data: ", response)
                this.admin = response.data.user;
                this.admin_initials = `${response.data.user.firstname[0]}${response.data.user.lastname[0]}`;

            }catch(error){
                console.error("error getting admin data: ", error);
                if(error.response.status == 401){
                    localStorage.removeItem('life-gaurd');
                    this.$router.push("/site/login")
                }
            }
        }
    },

    created(){
        this.getAdminData();
        this.getCurrentDate();
    }
}
</script>

<style scoped>
.side_nav_item{
    @apply p-3 flex flex-row gap-3 text-lg rounded-lg
}

.active_page{
    @apply bg-tz_blue font-bold text-white
}
</style>

<!-- 

"admin", "manager", "moderator", "team-lead", "team-member"

    ADMIN PERMISSION LEVELS
    dashboard - all
    earl users - all
    users - [all]
    employers - [all]
    jobs - [all]
    contracts - [all]
    tickets - [all]

    admin-users - [admin, manager]
    settings - [admin, manager]

   
    alerts - [admin, manager, moderator]
    emails - [admin, manager, moderator]
    messages - [admin, manager, moderator]


-->