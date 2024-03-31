<template>
    <div>
        <!-- PROFILE EDIT MODAL HERE -->
        <Modal :title="'Edit your profile'" :modal_active="profile_edit_menu">
            <template #body>
                <div>
                <form @submit.prevent="updateUserProfile" v-if="user">
                    <div>
                        <div class="flex flex-row gap-3 mb-3">
                            <div class="w-3/6 flex flex-col">
                                <label for="firstname">firstname</label>
                                <input class="p-3 rounded-lg border " type="name" name="firstname" id="firstname" :value="user.firstname" disabled>
                            </div>

                            <div class="w-3/6 flex flex-col">
                                <label for="firstname">lastname</label>
                                <input class="p-3 rounded-lg border" type="name" name="lastname" id="lastname" :value="user.lastname" disabled>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="email">email</label>
                                <input class="p-3 rounded-lg border" type="email" name="email" id="email" :value="user.email" disabled>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="title">profile title</label>
                                <input class="p-3 rounded-lg border" type="text" name="title" id="title" v-model="user_form.profile.title" placeholder="Expereinced Copywriter">
                            </div>
                            <div class="form-control">
                                <label for="bio">profile bio</label>
                                <textarea class="p-3 rounded-lg border h-40 max-h-52" type="text" name="bio" id="bio" v-model="user_form.profile.bio" placeholder="A very brief and descriptive bio"></textarea>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="skills">skills & expertise</label>
                                <input class="p-3 rounded-lg border" type="text" name="skills" id="skills" v-model="user_form.profile.skills" placeholder="Copy writing, Technical writing, Graphic Design">
                            </div>
                        </div>


                        <div class="form-section">
                           

                            <div class="form-control">
                                <label for="phone">phone</label>
                                <input class="p-3 rounded-lg border" type="phone" name="phone" id="phone" v-model="user_form.profile.phone" placeholder="+2348156074667">
                            </div>

                            <div class="form-control">
                                <label for="phone">social</label>
                                <input class="p-3 rounded-lg border" type="text" name="social" id="social" v-model="user_form.profile.social" placeholder="https://facebook.com/johndoe">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
           
            </template>
            <template #footer>
                <LoaderButton @click="updateUserProfile" class="btn" :buttonText="'save'" :loading="user_form.loading"></LoaderButton>
            </template>
           
        </Modal>

<!-- 
        <TemplateView :leftnav="true">
            <template #page-title>Profile</template>
            
            <template #page-contents> -->
                <div v-if="!user">loading user data...</div>
                <div class="p-5" v-if="user">
                    <div class=" flex flex-col items-center gap-8">

                        <div class="flex w-full rounded-xl justify-evenly items-start  flex-col md:flex-row p-4 md:p-8 lg:w-3/4 border">
                            <div class="flex flex-row justify-start md:justify-center items-center p-5 gap-3 flex-wrap">
                                <!-- <div class=" h-28 w-28 rounded-full border-4 outline outline-tz_blue bg-cover"></div> -->
                                <!-- <div v-if="user.profile.image_url" :style="`background-image: url(${user.profile.image_url})`" class=" h-28 w-28 rounded-full border-4 outline outline-tz_blue bg-cover"></div> -->
                                    <img v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" h-28 w-28 rounded-full">
                               
                                <div class="flex flex-col items-start text-start">
                                    <h1 class="font-bold text-4xl">{{ user.firstname }} {{ user.lastname }}</h1>
                                    <h2 class="text-sm text-gray-500">{{ user.profile.title }}</h2>
                                    <p>{{ user.email }}</p>
                                    <div clas="flex flex-row gap-3">
                                        <p class="inline-block mr-2 text-tz_blue" v-html="userStars(user.ratings)"></p>
                                        <span>({{ userRating(user.ratings) }}) {{ user.ratings.length }} reviews</span>
                                    </div>
                                  
                                </div>
                            </div>
                            <div class="border"></div>
                            <div class=" flex flex-col items-start justify-center text-left p-5">
                                <div>
                                    <span v-if="user.is_verified">user is verified</span>
                                    <span v-else="user.is_verified">user is not verified</span>
                                </div>
                                <p>Joined: {{ user.created }}</p>
                                <p v-if="user.profile.location">Location: {{ user.profile.location.city }} {{ user.profile.location.state }}</p>
                                <div class="flex flex-row flex-wrap gap-3 mt-3">
                                    <button v-if="isAllowed" class="btn" @click="profile_edit_menu = !profile_edit_menu">Edit Profile</button>
                                </div>
                            </div>
                        </div>

                        <div class=" w-full lg:w-3/4">
                            <div class="border rounded-xl p-3 text-left">
                                <h1 class="font-bold"><i class="bi bi-person"></i> Profile</h1>
                            </div>

                            <div>
                                <div class="profile_section">
                                    <h2 class="font-bold">About Me</h2>
                                    <div>
                                        {{ user.profile.bio }}
                                        <span v-if="!user.profile.bio">No content...</span>
                                    </div>
                                </div>

                                <div class="profile_section">
                                    <h2 class="font-bold">Phone Number</h2>
                                    <div>
                                        {{ user.profile.phone }}
                                    </div>
                                </div>

                                <div class="profile_section">
                                    <h2 class="font-bold">Email Address</h2>
                                    <div>
                                        {{ user.email }}
                                    </div>
                                </div>

                                <div class="profile_section">
                                    <h2 class="font-bold">Connected Accounts</h2>
                                    <a :href="user.profile.social" class="text-tz_blue">
                                       {{ user.profile.social }}
                                    </a>
                                </div>


                                <div class="profile_section">
                                    <h2 class="font-bold">Date Joined</h2>
                                    <div>
                                        {{ user.created }}
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                    </div>
                </div>
            <!-- </template>
        </TemplateView> -->
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import TemplateView from '../TemplateView.vue';
import JobReviewCard from '@/components/JobReviewCard.vue';
import Modal from '@/components/Modal.vue';
import axios from 'axios';
import LoaderButton from '@/components/LoaderButton.vue';
import { generateStarRating } from '@/utils/ratingStars';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
    name: "ProfilePage",
    components: { Navbar, TemplateView, JobReviewCard, Modal, LoaderButton, SkeletonLoader },
    data(){
        return{
            user: null,

            profile_edit_menu: false,

            user_form: {
                loading: false,
                preffered_job_types: '',
                profile: {
                    title: '',
                    bio: '',
                    location: {
                        city: '',
                        state: '',
                        address: '',
                    },
                    phone: '',
                    social: '',
                    skills: '',
                    },
                },

                contracts: '',
                isAllowed: false,

            headers: {Authorization: `JWT ${localStorage.getItem('life-gaurd')}`}
        }
    },
    methods: {
        async getPublicUserData(){
            try{
                const response = await axios.get(`${this.api_url}/user/${this.$route.params.user_id}`);
                this.user = response.data.user;
                console.log("pulic user: ", response);
                this.checkCurrentViewer();
            }catch(error){
                console.log("error fetching public user data", error)
            }
        },

        async getUserData(){
            try{
                 // Get the token from localStorage
                const token = localStorage.getItem('life-gaurd');
                const headers = {
                    Authorization: `JWT ${token}`, // Assuming it's a JWT token
                };

                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("profile page :", response);
                // push to user variable..
                this.user = response.data.user;
                this.user_form = response.data.user;
                
            }
            catch(error){
                console.error(error)
            }
        },

        async updateUserProfile(){
            this.user_form.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.patch(`${this.api_url}/user/profile`, this.user_form, { headers });
                console.log(response)
                this.user_form.loading = false;
            }
            catch(error){
                // display any possible error here...
            }
        },

        async getActiveAndCompletedContracts(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts/good/${this.$route.params.user_id}`, { headers });
                // console.log("good contracts: ", response);
                this.contracts = response.data.contracts;
            }catch(error){
                console.log(error)
            }
        },

        userRating(ratings){
            if(ratings > 0){
                const sum = ratings.reduce((acc, rating) => acc + rating, 0);
                return sum / ratings.length;
            } else {
                return 0
            }
            
        },

        userStars(ratings){
            return generateStarRating(ratings);
        },

        checkCurrentViewer(){
            const token = localStorage.getItem('life-gaurd');
            const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
            // console.log("user roleeee: ", user_id, "parsed data: ", parsed_item);
            if(user.id == this.$route.params.user_id || user.googleId == this.user.googleId){
                this.isAllowed = true;
            }
            else{this.isAllowed = false};
        },

       


    },
    mounted(){
        if(this.$route.params.user_id){
            this.getPublicUserData();
        } else{
            this.getUserData();
        }
      
        this.getActiveAndCompletedContracts();
        this.checkCurrentViewer();
        
       
    },

    computed:{
        
    }
}
</script>
<style>

    input:disabled{
        @apply text-gray-400
    }
    .profile_section{
        @apply text-left p-3 mt-5
    }

    .form-section{
        @apply flex flex-col gap-3 capitalize justify-between flex-wrap mb-3
    }

    .form-control{
        @apply flex flex-col justify-start w-full
    }
</style>