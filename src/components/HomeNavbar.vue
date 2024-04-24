<template>
        <p v-if="alert_banner" class=" bg-green-500 text-white text-sm p-3 flex flex-row justify-between">
            <span class="w-full text-center"> We have a <strong>new look</strong> for prelaunch!</span>
            <button @click="alert_banner = !alert_banner">
                <i class="bi bi-x-lg"></i>
            </button>
        </p>
    
   <nav>
        <div class="bg-white text-black start-0 relative z-30 shadow-xl">
        <div class="p-3 flex flex-row justify-between items-center mx-auto my-0 max-w-screen-2xl">
            <!-- <SiteLogo/> -->
            <img src="../../public/apex-tek.svg" class=" h-[35px] md:h-[50px] ">
            
            <div class="bg-white w-full flex-col md:flex-row justify-between md:flex absolute z-10 top-16 left-0 flex md:top-0 md:relative pb-6 md:p-0 h-0 opacity-0 md:h-fit md:opacity-100 transition-all duration-500 ease-out shadow-lg md:shadow-none" :class="mobile_menu ? 'h-fit opacity-100':'h-0 opacity-0'">
                <div class=" flex flex-col md:flex-row gap-6 md:items-center md:mx-auto md:my-0 p-5 md:p-0">
                    <RouterLink to="/" class="" :class="isHome ? 'border-tz_blue border-b-4  text-tz_blue':''">Home</RouterLink>
                    <!-- <RouterLink to="/jobs" class="" :class="isJobs ? 'border-tz_blue border-b-4  text-tz_blue':''"> FInd Job</RouterLink> -->
                    <RouterLink to="/about" class="" :class="isAbout ? 'border-tz_blue border-b-4  text-tz_blue':''">About Us</RouterLink>
                    <RouterLink to="/support" :class="isFAQ ? 'border-tz_blue border-b-4 text-tz_blue':''">FAQ</RouterLink>
                </div>
                <div class="flex flex-row gap-3 p-5 md:p-0">
                    <RouterLink to="/login">
                        <button class="nav_btn rounded-md w-fit text-tz_blue hover:text-tz_blue hover:bg-tz_light_blue">Login</button>
                    </RouterLink>
                    <RouterLink to="/register/decide">
                        <button class="nav_btn rounded-md bg-tz_blue hover:bg-tz_dark_blue text-white">Sign Up</button>
                    </RouterLink>
                </div>
            </div>
            <button class="text-4xl md:hidden" @click="mobile_menu = !mobile_menu">
                <i class="bi bi-x text-3xl" v-if="mobile_menu"></i>
                <i class="bi bi-list text-3xl" v-else></i>
            </button>
        </div>
        </div>
    </nav>
</template>

<script>
import SiteLogo from '../components/SiteLogo';

    export default {
        name: "HomeNavbar",
        data(){
            return{
                mobile_menu: false,
                alert_banner: true,
            }
        },
        components:{
            SiteLogo,
        },

        computed:{
            isHome(){ return this.$route.path == '/' },
            isJobs(){ return this.$route.path.startsWith("/jobs"); },
            isAbout(){ return this.$route.path.startsWith("/about"); },
            isFAQ(){ return this.$route.path.startsWith("/support"); },
        },
    }
</script>

<style scoped>
    .nav_btn{
        @apply px-5 py-2 font-medium;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-tz_light_blue font-medium hover:font-medium;
    }

    .text-sm{
        font-size: 12px !important;
    }
    .btn{
        @apply bg-tz_blue hover:bg-tz_dark_blue text-white py-3 px-5 rounded-md font-medium w-52 border border-transparent
    }
    .slide_btn{
        @apply border border-tz_blue p-3 rounded-md text-tz_blue font-medium text-xl hover:bg-tz_blue hover:text-black;
    }

    .sb_active{
        @apply bg-tz_blue text-white
    }
</style>