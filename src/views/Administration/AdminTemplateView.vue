<template>
    <div class="flex flex-row h-screen bg-tz_light_blue dark:bg-[#27323F] dark:text-white">

        <!-- LEFT SIDE BAR  -->
        <div class=" w-[350px] h-full flex flex-col bg-[#27323F]  dark:bg-[#1f2a36] dark:text-white p-3 items-center">
            <img src="../../../public/apex-tek-white.svg" class=" w-[150px] mt-14">
            <div class=" mt-[100px] flex flex-col gap-3 text-white w-full h-full overflow-y-scroll">

                <RouterLink to="/admin/dashboard" class="side_nav_item" :class="{ 'active_page': isDashboard }">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </RouterLink>

                <RouterLink to="/admin/settings" class="side_nav_item" :class="{ 'active_page': isSettings }">
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-people"></i>
                    <span>Users</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-buildings"></i>
                    <span>Employers</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-briefcase"></i>
                    <span>Jobs</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-gift"></i>
                    <span>Contracts</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-key"></i>
                    <span>Admin Users</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-send-exclamation"></i>
                    <span>tickets</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-chat-left-dots"></i>
                    <span>Messages</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-envelope-at"></i>
                    <span>Emails</span>
                </RouterLink>

                <RouterLink to="#" class="side_nav_item text-gray-500">
                    <i class="bi bi-exclamation-triangle"></i>
                    <span>Alerts</span>
                </RouterLink>
            </div>
       
        </div>

        <!--  RIGHT CONTENT & NAVBAR  -->
        <div class="flex flex-col h-full w-full">
            <!-- NAVBAR -->
            <div class="flex flex-row p-3 w-full items-center justify-between bg-white  dark:bg-[#1f2a36] dark:text-white">
                <div>
                    <span>25th December 2024</span>
                </div>
                <div class="flex flex-row gap-8 items-center justify-end">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <div class=" h-[50px] w-[50px] bg-blue-300 rounded-full"></div>
                        <div class="flex flex-col">
                            <span class="font-bold">Admin</span>
                            <span class="text-blue-500">xenithheight@gmail.com</span>
                        </div>
                    </div>
                    <button class=" bg-gray-200 p-4 rounded-full flex justify-center items-center h-10 w-10">
                        <i class="bi bi-moon-fill"></i>
                    </button>

                    <button class=" bg-gray-200 p-4 rounded-full flex justify-center items-center h-10 w-10">
                        <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>

            <!-- PAGE CONTENT -->
            <div class="flex flex-col h-full w-full overflow-y-scroll">
                
                <router-view></router-view>

            </div>
        </div>
    </div>
</template>

<script>
import AdminStat from '@/components/AdminStat.vue'
import SiteLogo from '@/components/SiteLogo.vue'


export default {
    name: "AdminTemplateView",
    components: { AdminStat, SiteLogo },
    computed: {
        isDashboard() { return this.$route.path.startsWith("/admin/dashboard"); },
        isSettings() { return this.$route.path.startsWith("/admin/settings"); },
    },
}
</script>

<style scoped>
.side_nav_item{
    @apply p-3 flex flex-row gap-3 text-xl rounded-lg
}

.active_page{
    @apply bg-tz_light_blue font-bold text-blue-300
}
</style>