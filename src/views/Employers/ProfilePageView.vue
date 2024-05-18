<template>
    <div>
        <!-- PROFILE EDIT MODAL HERE -->
        <Modal :title="'Edit your profile'" :modal_active="profile_edit_menu">
            <template #body>
                <div>
                <form @submit.prevent="updateUserProfile" v-if="user">
                    <div>
                        <div class="flex flex-row flex-wrap gap-3 mb-3">
                            <div class="w-3/6 flex flex-col grow">
                                <label for="firstname">firstname</label>
                                <input class="form_input " type="name" name="firstname" id="firstname" :value="user.firstname" disabled>
                            </div>

                            <div class="w-3/6 flex flex-col grow">
                                <label for="firstname">lastname</label>
                                <input class="form_input" type="name" name="lastname" id="lastname" :value="user.lastname" disabled>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="email">email</label>
                                <input class="form_input" type="email" name="email" id="email" :value="user.email" disabled>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="company_name">company name</label>
                                <input class="form_input" type="text" name="company_name" id="company_name" v-model="user_form.profile.company_name" placeholder="Company Name here">
                            </div>
                            <div class="form-control">
                                <label for="tag_line">company tag line</label>
                                <input class="form_input" type="text" name="tag_line" id="tag_line" v-model="user_form.profile.tag_line" placeholder="Company Tag line here">
                            </div>
                        </div>

                        <div class="form-section">
                            <label for="bio">Company Description</label>
                            <textarea class="form_input h-40 max-h-52" type="text" name="bio" id="bio" v-model="user_form.profile.description" placeholder="A very brief description about your company"></textarea>
                        </div>

                        <div class="flex flex-row gap-3 mb-3">
                            <div class="w-3/6 flex flex-col">
                                <label for="firstname">State</label>
                                <select class="form_input " v-model="user_form.profile.location.state">
                                    <option value="">Select state</option>
                                    <option class="p-3" v-for="(state, index) in nigerianStates" :key="index" :value="state">{{ state }}</option>
                                </select>
                            </div>

                            <div class="w-3/6 flex flex-col">
                                <label for="city">City</label>
                                <input class="form_input" type="text" name="city" id="city" v-model="user_form.profile.location.city">
                            </div>
                        </div>
                        <div v-if="user_form.profile"class="form-section">
                            <div class="form-control">
                                <label for="address">address line</label>
                                <input class="form_input" type="text" name="address" id="address" v-model="user_form.profile.location.address" placeholder="No. 27 John Doe Avenue, block 123">
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-control">
                                <label for="phone">phone</label>
                                <input class="form_input" type="phone" name="phone" id="phone" v-model="user_form.profile.phone" placeholder="+2348156074667">
                            </div>

                            <div class="form-control">
                                <label for="phone">social</label>
                                <input class="form_input" type="text" name="social" id="social" v-model="user_form.profile.social" placeholder="https://facebook.com/johndoe">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
           
            </template>
            <template #footer>
                <LoaderButton type="button" @click="updateUserProfile" class="btn" :buttonText="'save'" :loading="user_form.loading"></LoaderButton>
            </template>
           
        </Modal>

            <div v-if="!user">loading user data...</div>

            <div class="" v-if="user">
                <div class=" flex flex-col items-center gap-8 p-5">

                    <div class="flex w-full rounded-xl justify-evenly items-start  flex-col md:flex-row p-4 md:p-8 lg:w-3/4 border border-gray-300  dark:border-gray-600">
                        <div class="flex flex-row justify-start md:justify-center items-center p-5 gap-3 flex-wrap">
                            
                            <div v-if="user.profile.image_url" :style="`background-image: url(${user.profile.image_url})`" class=" group relative h-28 w-28 rounded-full border-4 outline outline-tz_blue bg-cover bg-gray-100 flex justify-center items-center">
                                <!-- <div class="bg-black absolute top-0 bottom-0 h-full w-full rounded-full hidden justify-center items-center opacity-50 group-hover:flex">
                                    <i class="bi bi-camera text-2xl"></i>
                                </div> -->
                                <span class="text-5xl font-bold text-gray-500">{{ user.firstname[0] }}{{ user.lastname[0] }}</span>
                            </div>
                                <!-- <img v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" h-28 w-28 rounded-full"> -->
                            
                            <div class="flex flex-col items-start text-start">
                                <h1 class="font-bold text-4xl">{{ user.firstname }} {{ user.lastname }}</h1>
                                <h2 class="text-sm text-gray-500">{{ user.profile.company_name }}</h2>
                                <p>{{ user.email }}</p>
                                <div clas="flex flex-row gap-3">
                                    <p class="inline-block mr-2 text-tz_blue" v-html="userStars(user.ratings)"></p>
                                    <span>({{ userRating(user.ratings) }}) {{ user.ratings.length }} reviews</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="border-l border-gray-300  dark:border-gray-600 md:inline-block md:h-[200px] hidden"></div>
                        <div class=" flex flex-col items-start justify-center text-left p-5">
                            <div>
                                <span v-if="user.is_verified">Account verified</span>
                                <span v-else="user.is_verified">Account is not verified</span>
                            </div>
                            <p>Joined: {{ formatTimestampWithoutTime(user.created) }}</p>
                            <p v-if="user.profile.location">Location: {{ user.profile.location.city }} {{ user.profile.location.state }}</p>
                            
                            <!-- PROFILE PROGRESS PERCENTAGE -->
                            <div class="flex flex-col mt-3">
                                <p>Profile Completion - {{  profile_completion  }}%</p>
                                <!-- <div class=" h-3 w-52 rounded-full overflow-hidden bg-green-700">
                                    <div class=" h-full bg-green-400" :class="`w-[${profile_completion}%]`"></div>
                                </div> -->
                            </div>
                            <div class="flex flex-row flex-wrap gap-3 mt-3">
                                <button class="btn" @click="profile_edit_menu = !profile_edit_menu">Edit Profile</button>
                            </div>
                        </div>
                    </div>

                    <div class=" w-full lg:w-3/4">
                        <div class="border rounded-xl p-3 text-left  border-gray-300  dark:border-gray-600">
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
import nigerianStates from '@/utils/states.json';

import { formatTimestampWithoutTime } from '@/utils/dateFormat';

export default {
    name: "ProfilePage",
    components: { Navbar, TemplateView, JobReviewCard, Modal, LoaderButton, SkeletonLoader },
    data(){
        return{
            user: null,

            profile_edit_menu: false,
            profile_completion: 80,
            loading: false,
            nigerianStates,

            user_form: {
                preffered_job_types: '',
                profile: {
                    company_name: '',
                    tag_line: '',
                    description: '',
                    location: {
                        city: '',
                        state: '',
                        address: '',
                        },
                    phone: '',
                    social: '',
                    },
                },

                contracts: '',
                isAllowed: false,
                formatTimestampWithoutTime,

            headers: {Authorization: `JWT ${localStorage.getItem('life-gaurd')}`}
        }
    },
    methods: {
        async getPublicUserData(){
            try{
                const response = await axios.get(`${this.api_url}/user/${this.$route.params.user_id}`);
                this.user = response.data.user;
                console.log("pulic user: ", response);
                // this.checkCurrentViewer();
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
                const user = response.data.user;
                const profile = response.data.user.profile;
                const form = this.user_form;

                form.profile.company_name = profile.company_name;
                form.profile.tag_line = profile.tag_line;
                form.profile.description = profile.description;
                if(profile.location){
                    form.profile.location = profile.location
                }
                form.profile.phone = profile.phone;
                form.profile.social = profile.social;
                // this.user_form = response.data.user;

                this.calculateProfileCompletion();
                // this.checkCurrentViewer();
                
            }
            catch(error){
                console.error(error)
            }
        },

        async updateUserProfile(){
            this.user_form.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.patch(`${this.api_url}/employer/profile/update`, this.user_form, { headers });
                console.log(response)
                this.user_form.loading = false;
            }
            catch(error){
                // display any possible error here...
                console.log("error updating profile data");
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

        calculateProfileCompletion(){
            const profile = this.user.profile;
            let percentage = 10;

            if(this.user){
                if(profile){
                    percentage += 0;
                }
                if(profile.tag_line){
                    percentage += 10;
                }
                if(profile.description){
                    percentage += 10;
                }
                if(profile.location){
                    percentage += 40;
                }
                if(profile.phone){
                    percentage += 10
                }
                if(profile.social){
                    percentage += 10
                }
                if(profile.link){
                    percentage += 10
                }
                
                this.profile_completion = percentage;
                // return percentage;
            }
    },



       


    },
    mounted(){
        if(this.$route.params.user_id){
            this.getPublicUserData();
        } else{
            this.getUserData();
        }
      
        this.getActiveAndCompletedContracts();

        // check profile completion percentage ...
        
        
       
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