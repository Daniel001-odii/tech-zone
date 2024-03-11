<template>
<div>
    <div class=" h-[90vh] flex flex-col">
        <div class=" w-full bg-red-100 text-left p-5 text-3xl border-b flex items-center pl-3">
            <span class="flex gap-5">
                <button @click="$router.go(-1)">
                    <i class="bi bi-arrow-left"></i>
                </button>
                
                <slot name="page-title">Work Explorer</slot>
            </span>
        </div>

        <div class="flex flex-col h-full overflow-y-scroll">
            <slot name="page-contents">
                    Page contents here...
            </slot>
            
        </div>
    </div>
</div>
           
        
</template>
<script>
import LeftNavBar from '@/components/LeftNavBar.vue';
import Navbar from '@/components/Navbar.vue';
import SiteLogo from '@/components/SiteLogo.vue';
import UserDropDownMenu from '@/components/UserDropDownMenu.vue'

export default {
    name: "TemplateView",
    components: { SiteLogo, UserDropDownMenu, Navbar, LeftNavBar },
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
 

</style>