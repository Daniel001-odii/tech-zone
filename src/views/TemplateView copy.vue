<template>        
<div class=" h-screen flex flex-row bg-white dark:bg-[#27323F] dark:text-white">
    <div class=" flex h-full">
        <LeftNavBar :class="nav_active ? 'block':'hidden'" class="md:block"/>
        <!-- <LeftNavBar v-if="leftNav" :class="nav_active ? 'block':'hidden'" class="md:block"/> -->
    </div>
    <div class=" flex w-full relative top-0 h-screen flex-col h-full">
        <!-- <PageTitle></PageTitle> -->
        <div class=" w-full text-left p-5 text-3xl border-b flex items-center pl-3 dark:border-gray-600">
            <span class="flex gap-5">
                <button @click="$router.go(-1)">
                    <i class="bi bi-arrow-left text-[20px]"></i>
                </button>
                
                <slot name="page-title">Default Title</slot>
            </span>
        </div>

        <div class="flex flex-col h-full overflow-y-scroll w-full ">
            <slot name="page-contents">
                    Page contents here...
            </slot>
            <!-- <router-view></router-view> -->
        </div>
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