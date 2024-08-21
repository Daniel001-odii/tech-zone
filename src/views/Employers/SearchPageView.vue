<template>
    <PageTitle>
        Search Users
    </PageTitle>
    <div>
        

        <form @submit.prevent="searchUsers" class="flex justify-start items-center gap-3 p-5">
            <input id="user_search" v-model="keywords" @keyup="searchUsers" type="search" class="form_input w-[400px]" placeholder="search for username, title skills or user ID" onfocus="true">
        </form>

       
        

        <div class="flex justify-start p-3 flex-col">

            <div v-if="results.length <= 0" class="w-full flex justify-center items-center h-[400px]">
                <span v-if="loading">
                    <SpinnerComponent/>
                </span>  
                <div v-else class="flex justify-center items-center flex-col text-xl text-gray-400">
                    <i class="bi bi-search text-4xl mb-3"></i>
                    <p>Start by searching for users</p>
                </div>
            </div>

            <!-- {{ results }} -->
            <div v-if="results.length > 0" v-for="user in results" class="flex flex-row gap-3 items-center p-5 w-full mb-1 hover:bg-tz_light_blue relative border-b border-t border-gray-600">
                <RouterLink :to="`/users/${user._id}`" target="_blank">
                    <img :src="user.profile.image_url" class="!size-20 rounded-full">
                </RouterLink>
                <div class="flex flex-col">
                    <RouterLink :to="`/users/${user._id}`" target="_blank">
                        <span class="text-xl font-bold hover:text-blue-500">{{ user.firstname }} {{ user.lastname }}</span>
                    </RouterLink>
                    <span class="text-blue-300">{{ user.profile.title }}</span>
                    <span class="text-sm">{{ user.profile.skills }}</span>
                    <span>{{  user.profile.bio }}</span>
                    <div class="flex text-sm text-gray-400 mt-3">
                       <span v-if="user.createdAt">joined {{ formatDistanceToNow(user.createdAt) }} ago</span>
                       <span v-else>joined {{ formatDistanceToNow(user.created) }} ago</span>
                    </div>
                </div>
                
                <button class="absolute top-5 right-5 text-xl" @click="saveUser(user._id)">
                    <i  v-if="userIsSaved(user._id)" class="bi bi-bookmark-fill"></i>
                    <i v-else class="bi bi-bookmark"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../../components/PageTitle.vue'
import SpinnerComponent from '../../components/SpinnerComponent.vue';
import { useToast } from 'vue-toastification'
import { formatDistanceToNow } from 'date-fns'

    export default {
        name: "SearchPageView",
        components: {
            PageTitle,
            SpinnerComponent
        },
        data(){
            return{
                toast: useToast(),
                loading: false,
                keywords: '',
                results: [],
                formatDistanceToNow,
                headers: {
                    'Authorization':`JWT ${localStorage.getItem('life-gaurd')}`
                },
                saved_users: [],
            }
        },
        methods:{
            userIsSaved(user_id){
                return this.saved_users.includes(user_id)
            },

            async searchUsers(){
                try{
                    this.loading = true;
                    const response = await axios.get(`${this.api_url}/users/search?keywords=${this.keywords}`);
                    console.log(`your results: ${response}`);
                    this.results = response.data.users;
                    if(!response.data){
                        this.results = []
                    }
                    this.loading = false;
                }catch(error){
                    this.loading = false;
                    console.log("error searching: ", error);
                }
            },


            async saveUser(user_id){
                const headers = this.headers;
                try{
                    const response = await axios.post(`${this.api_url}/employer/${user_id}/save-user`, {}, { headers });
                
                    this.getSavedUsers();
                    // this.userIsSaved(user_id);

                    this.toast.success(response.data.message);
                }catch(error){ 
                    console.log("error saving user: ", error);
                    this.toast.error(error.response.data.message);
                }
            },

            async getSavedUsers(){
                const headers = this.headers;
                try{
                    const response = await axios.get(`${this.api_url}/employer/users/saved/id_only`, { headers });
                    console.log("saved users: ", response.data)
                    this.saved_users = response.data.saved_users;
                }catch(error){
                    // console.log("get saved users error: ", error);
                    this.toast.error(error.response.data.message);
                    this.loading_saved_users = false;
                }
            },
        },

        mounted(){
            document.getElementById("user_search").focus(),
            this.getSavedUsers()
        }
    }
</script>

<style scoped>

</style>