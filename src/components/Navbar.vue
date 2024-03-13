<template>
    <div class="flex justify-center items-center p-3 border w-full bg-white" style="margin: 0 auto;">
        <nav v-if="type === 'wesbite' && !user">
            <!-- <div style="margin: 0 auto;" class="flex flex-col justify-between items-start md:items-center text-left md:flex-row"> -->
            <div style="margin: 0 auto;" class=" flex flex-col md:flex-row justify-between border border-red-400">
                <div class="flex flex-row justify-between items-center w-full md:w-[30%]">
                    <SiteLogo/>
                    <button  @click="nav_visible = !nav_visible" class=" flex font-bold inline-block text-lg md:hidden">
                        <i v-if="!nav_visible" class="bi bi-list"></i>
                        <i v-if="nav_visible" class="bi bi-x-lg"></i>
                    </button>
                </div>

            
                <div  :class="nav_visible ? 'flex':'hidden'" class="md:flex items-center justify-evenly flex-col md:flex-row md:gap-8 border border-red-400 md:w-[90%]">
                    <div class="flex md:flex-row text-center md:flex px-8 flex-col mt-8 md:flex-row md:gap-8 md:mt-0 transition-transform transform duration-300 ease-in-out">
                        <RouterLink to="/" class="nav_link">
                            Home
                        </RouterLink>

                        <RouterLink to="/jobs" class="nav_link">
                            Find Job
                        </RouterLink>

                        <RouterLink to="/register/decide" class="nav_link">
                            Post Job
                        </RouterLink>

                        <RouterLink to="/jobs" class="nav_link">
                            Browse Categories
                        </RouterLink>
                    </div>

                    <div class="flex justify-self-end md:flex gap-3 md:m-0">
                        <RouterLink to="/login">
                            <button class="btn rounded-md text-blue hover:text-blue hover:bg-light_blue">Login</button>
                        </RouterLink>
                        <RouterLink to="/register/decide">
                            <button class="btn rounded-md bg-blue hover:bg-dark_blue text-white">Sign Up</button>
                        </RouterLink>
                    </div>
                </div>

            </div>
        </nav>

        <nav v-if="type === 'app' && !loading && user">
            <div class="flex flex-row w-full justify-between items-center">
                <SiteLogo/>
                <div class="border rounded-md hidden md:block">
                    <input type="search" placeholder="saerch for jobs" class="p-3">
                </div>
                <div v-if="!user">Loading...</div>
                <div  v-if="user" class="flex flex-row items-center gap-1">
                    <div class="border border-2 rounded-full h-10 w-10 flex justify-center items-center relative group">
                        <i class="bi bi-bell"></i>
                        <div class="menu max-w-[300px] h-24 border absolute bg-white top-9 right-0 rounded-lg p-5 hidden group-hover:block">
                           notifications: {{ notifications }}
                        </div>
                    </div>
                    
                    <i class="bi bi-three-dots-vertical"></i>
                    <div class="flex flex-row items-center gap-3 relative group ">
                        <img v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" rounded-full h-9">
                        <!-- <div class=" h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center text-2xl">{{ user.firstname[0] }}</div> -->
                        <!-- I HAVE DELIBERATELY REMOVED THE USERNAME AND EMAIL HERE -->
                        <!-- <div class="flex flex-col text-left">
                            <span>Odii Daniel</span>
                            <span class="text-blue">odiidaniel@gmail.com</span>
                        </div> -->
                        <UserDropDownMenu :username="user.firstname + ' ' + user.lastname" :email="user.email"/>
                    </div>
                    <button @click="toggleNavbar" class="border border-2 rounded-full h-10 w-10 flex justify-center items-center md:hidden">
                        <i v-if="!left_nav_open" class="bi bi-ui-checks-grid"></i>
                        <i v-if="left_nav_open" class="bi bi-x-lg"></i>
                    </button>
                   
                </div>
            </div>
            
        </nav>
    </div>


</template>
<script>
import SiteLogo from './SiteLogo.vue';
import UserDropDownMenu from './UserDropDownMenu.vue';
import axios from 'axios'
import { io } from 'socket.io-client';

export default {
    name: "Navbar",
    props: {
        type: String,
    },
    data() {
        return {
            nav_visible: false,
            left_nav_open: false,

            user: null,
            loading: null,

            notifications: '',
        };
    },
    components: { SiteLogo, UserDropDownMenu },
    methods: {
        toggleNavbar(){
            this.left_nav_open = !this.left_nav_open;
            this.$emit('toggle-nav');
        },

        async getUserData(){
            try{
                 // Get the token from localStorage
                const token = localStorage.getItem('life-gaurd');
                const headers = {
                    Authorization: `JWT ${token}`, // Assuming it's a JWT token
                };

                const response = await axios.get(`${this.api_url}/user`, { headers });
                this.user = response.data.user;
            }
            catch(error){
                // console.log("error from navbar :", error);
            }
        },
    },
    mounted(){
        this.getUserData();
        const socket = io(`http://localhost:8000`);
        socket.on('notification', (data) => {
            this.notifications = data;
            console.log("received notification", data)
        })
    }
}
</script>
<style scoped>
    .btn{
        @apply px-5 py-2 font-bold;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-light_blue text-black font-medium hover:font-bold;
    }
</style>