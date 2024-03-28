<template>  
<div class="bg-white dark:bg-[#27323F] dark:text-white h-full">
    <!-- navbar -->
    <Navbar/>  
    <div class="flex flex-row w-full h-full">
        <!-- left sidebar -->
        <!-- <LeftNavBar :class="nav_active ? 'block':'hidden'" class="md:block"/> -->
        <!-- page contents -->
        <!-- <router-view></router-view> -->
    </div>
</div>

        
</template>
<script>
import LeftNavBar from '@/components/LeftNavBar.vue';
import Navbar from '@/components/Navbar.vue';
import SiteLogo from '@/components/SiteLogo.vue';
import UserDropDownMenu from '@/components/UserDropDownMenu.vue'
import PageTitle from '@/components/PageTitle.vue'


export default {
    name: "TemplateView",
    components: { SiteLogo, UserDropDownMenu, Navbar, LeftNavBar, PageTitle },
    data(){
        return{
            nav_active: false,
        }
    },
    props: {
        leftNav: Boolean,
    }
}
</script>
<style scoped>
 
 *{
    @apply dark:border-[#C8C6C6]
 }

</style>