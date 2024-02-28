<template>
    <div>
        <!-- PROFILE EDIT MODAL HERE -->
        <Modal :title="'Edit your profile'" :modal_active="profile_edit_menu">
            <div>
                <form @submit.prevent="editUserProfile">
                    <input type="text">
                </form>
            </div>
        </Modal>


        <TemplateView :leftnav="true">
        <!-- <TemplateView :leftNav="false"> -->
            <template #page-title>Profile</template>
            
            <template #page-contents>
                <div v-if="!user">loading user data...</div>
                <div class="p-5" v-if="user">
                    <div class=" flex flex-col items-center gap-8">

                        <div class="flex w-full rounded-xl justify-evenly items-start  flex-col md:flex-row p-4 md:p-8 lg:w-3/4 border">
                            <div class="flex flex-row justify-start md:justify-center items-center p-5 gap-3 flex-wrap">
                                <!-- <div class=" h-28 w-28 rounded-full border-4 outline outline-blue bg-cover"></div> -->
                                <!-- <div v-if="user.profile.image_url" :style="`background-image: url(${user.profile.image_url})`" class=" h-28 w-28 rounded-full border-4 outline outline-blue bg-cover"></div> -->
                                    <img v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" height="100px" class=" rounded-full">
                               
                                <div class="flex flex-col items-start">
                                    <h1 class="font-bold text-4xl">{{ user.firstname }} {{ user.lastname }}</h1>
                                    <h2 class="text-xl text-gray-500">{{ user.profile.title }}</h2>
                                    <p>{{ user.email }}</p>
                                </div>
                            </div>
                            <div class="border"></div>
                            <div class=" flex flex-col items-start justify-center text-left p-5">
                                <div>
                                    <span v-if="user.is_verified">user is verified</span>
                                    <span v-else="user.is_verified">user is not verified</span>
                                </div>
                                <p>Joined: {{ user.created }}</p>
                                <p>Location: {{ user.profile.location }}</p>
                                <div class="flex flex-row flex-wrap gap-3 mt-3">
                                    <button class="btn" @click="profile_edit_menu = !profile_edit_menu">Edit Profile</button>
                                    <button class="btn_white">Resume</button>
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
                                    <h2 class="font-bold">Skills</h2>
                                    <div>
                                        {{ user.profile.skills }}
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
                                    <div>
                                       lorem ipsum ...
                                    </div>
                                </div>


                                <div class="profile_section">
                                    <h2 class="font-bold">Date Joined</h2>
                                    <div>
                                        {{ user.created }}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class=" w-full lg:w-3/4">
                            <div class="border rounded-xl p-3 text-left">
                                <h1 class="font-bold"><i class="bi bi-briefcase"></i> Work History</h1>
                            </div>

                            <div class="profile_section">
                                <h2 class="font-bold">Completed Jobs</h2>
                                <div>
                                    <div class="flex flex-col gap-3 overscroll-y-scroll" v-for="saved in 2">
                                        <JobReviewCard/>
                                    </div>
                                </div>
                            </div>

                            <div class="profile_section">
                                <h2 class="font-bold">Assgined Jobs</h2>
                                <div>
                                    <div class="flex flex-col overscroll-y-scroll" v-for="saved in 1">
                                        <JobReviewCard/>
                                    </div>
                                </div>
                            </div>

                            <div class="profile_section">
                                <h2 class="font-bold">Declined Jobs</h2>
                                <div>
                                    <div class="flex flex-col overscroll-y-scroll" v-for="saved in 2">
                                        <JobReviewCard/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import TemplateView from './TemplateView.vue';
import JobReviewCard from '@/components/JobReviewCard.vue';
import Modal from '@/components/Modal.vue';
import axios from 'axios';

export default {
    name: "ProfilePage",
    components: { Navbar, TemplateView, JobReviewCard, Modal },
    data(){
        return{
            user: null,

            profile_edit_menu: false,
            user_form: {
                preffered_job_types: '',
                phone: '',
                social: '',
                skills: '',
                profile: {
                title: '',
                bio: '',
                location: {
                    city: '',
                    state: '',
                    address: '',
                        },
                    }
                },
        }
    },
    methods: {
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
            }
            catch(error){
                console.error(error)
            }
        },

    },
    mounted(){
        this.getUserData();
    }
}
</script>
<style scoped>
    .profile_section{
        @apply text-left p-3 mt-5
    }
</style>