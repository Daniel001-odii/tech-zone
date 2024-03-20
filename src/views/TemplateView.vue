<template>        
<div class="flex flex-row bg-white dark:bg-[#27323F] dark:text-white absolute top-0 right-0 left-0 bottom-0">
    <LeftNavBar :class="nav_active ? 'block':'hidden'" class="md:block"/>
    <div class="h-full w-full">
        <router-view></router-view>
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