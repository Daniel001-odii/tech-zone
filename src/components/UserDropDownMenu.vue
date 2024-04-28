<template>
    <div>
        <div class=" w-[250px] border absolute bg-white top-9 right-3 rounded-lg p-1 hidden group-hover:block z-50 dark:bg-[#1F2A36] dark:border-gray-600">
            <div class="flex flex-col text-left gap-1">
                <div @click="sub_items = !sub_items" class="menu_item flex flex-row justify-between px-1 cursor-pointer">
                    <div class="flex flex-col">
                        <span>{{ username }}</span>
                        <span class="text-tz_blue text-sm">{{ email }}</span>
                        <span class="text-slate-400 capitalize">{{ user_type }}</span>
                    </div>
                    <i :class="sub_items ? 'bi bi-caret-up-fill':'bi bi-caret-down-fill'" class=""></i>
                </div>

                <!-- MENU FOR USER ... -->
                <div v-if="sub_items && user_type == 'user'">
                    <RouterLink :to="'/in/users/' + user._id">
                        <div class="menu_item"><i class="bi bi-person"></i>My Profile</div>
                    </RouterLink>

                    <RouterLink to="/in/applications">
                        <div class="menu_item"><i class="bi bi-sticky"></i> My Applications</div>
                    </RouterLink>
                    
                    <RouterLink to="/in/overview">
                        <div class="menu_item"><i class="bi bi-compass"></i> Overview</div>
                    </RouterLink>
                    
                    <!-- <RouterLink to="/earnings">
                        <div class="menu_item"><i class="bi bi-cash-stack"></i> Earnings</div>
                    </RouterLink> -->

                    <RouterLink to="/in/settings">
                        <div class="menu_item"><i class="bi bi-gear"></i> Settings</div>
                    </RouterLink>
                </div>


                <!-- MENU FOR EMPLOYERS>... -->
                <div v-if="sub_items && user_type == 'employer'">
                    <RouterLink to="/client/profile">
                        <div class="menu_item"><i class="bi bi-person"></i> Profile</div>
                    </RouterLink>

                    <RouterLink to="/client/contracts">
                        <div class="menu_item"><i class="bi bi-sticky"></i> Contracts & Hires</div>
                    </RouterLink>
                    
                    <div class="menu_item text-slate-300"><i class="bi bi-compass"></i> Billings & Payments</div>

                    <RouterLink to="/client/settings">
                        <div class="menu_item"><i class="bi bi-gear"></i> Settings</div>
                    </RouterLink>
                </div>
              
                <RouterLink to="/support">
                    <div class="menu_item"><i class="bi bi-question-circle"></i> Help & Support</div>
                </RouterLink>
                <button @click="logout" class=" bg-tz_light_blue font-bold p-3 rounded-md text-blue-900 dark:text-blue-300"><i class="bi bi-box-arrow-right"></i> Logout</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'



export default {
    name: "UserDropDownMenu",
    props: {
        username: String,
        email: String,
    },
    data(){
        return{
            sub_items: false,
            user_type: '',
            user: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("life-gaurd");
            this.$router.push('/');
            window.location.reload();
        },

        async getUserData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`,  { headers });
                this.user = response.data.user;
                this.user_type =response.data.user.role;
            }catch(error){
                console.log("user data error from drop down menu:", error)
            }
        },
    },
    mounted(){
        this.getUserData()
    }
}
</script>
<style scoped>
    .menu_item{
        @apply hover:bg-tz_light_blue p-3 rounded-md text-left
    }

</style>