<template>
    <PageTitle>
        Search Users
    </PageTitle>
    <div>
        <form @submit.prevent="searchUsers" class="flex justify-start items-center gap-3 p-5">
            <input v-model="keywords" @keydown="searchUsers" type="search" class="form_input" placeholder="search for clients" onfocus="true">
            <button class="btn">
                <span v-if="loading">loading...</span>    
                <span v-else>search</span>
            </button>
        </form>


        <div class="flex justify-start p-3">
            <!-- {{ results }} -->
            <div v-if="results.length > 0" v-for="user in results" class="flex flex-row gap-3 items-center p-5 w-full mb-1 hover:bg-tz_light_blue">
                <RouterLink :to="`/users/${user._id}`" target="_blank">
                    <img :src="user.profile.image_url" class="!size-20 rounded-full">
                </RouterLink>
                <div class="flex flex-col">
                    <RouterLink :to="`/users/${user._id}`" target="_blank">
                        <span class="text-xl font-bold">{{ user.firstname }} {{ user.lastname }}</span>
                    </RouterLink>
                    <span>{{ user.profile.title }}</span>
                    <span class="text-sm">{{ user.profile.skills }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../../components/PageTitle.vue'


    export default {
        name: "SearchPageView",
        components: {
            PageTitle
        },
        data(){
            return{
                loading: false,
                keywords: '',
                results: [],
            }
        },
        methods:{
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
            }
        }
    }
</script>

<style scoped>

</style>