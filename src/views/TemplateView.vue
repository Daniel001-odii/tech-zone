<template>
   <div class="template h-screen bg-white dark:bg-[#27323F] dark:text-white flex flex-col fixed bottom-0 top-0 right-0 left-0">
        <div class="navbar h-fit">
            <Navbar/> 
           
        </div>

        <div class="page flex flex-row h-full border-t dark:border-gray-600">
            <div class="sidebar max-w-[300px] h-full border-r dark:border-gray-600">
                <LeftNavBar :class="nav_active ? 'block':'hidden'" class="md:block"/>
            </div>
            <div class="page-content  h-full w-full relative ">
                <div class="h-full w-full flex flex-col justify-start overflow-y-auto absolute bottom-5 top-0 left-0">
                    <!-- <div v-for="item in 10" :key="item.id">
                        {{ item }}
                        <div class=" h-[200px] bg-orange-700"></div>
                    </div> -->
                    <router-view></router-view>
                </div>
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

 /* .template{
    height: 100vh;
    background: red;
    display: flex;
    flex-direction: column;
 } */

 /* .navbar{
    min-height: 80px;
    background: green;
 } */

 /* .page{
    display: flex;
    flex-direction: row;
    background: yellow;
    height: 100%;
 } */

 /* .sidebar{
    max-width: 300px;
    height: 100%;
    background: blue;
 } */

 /* .page-content{
    height: 100%;
    background: red;
    width: 100%;
 } */

</style>