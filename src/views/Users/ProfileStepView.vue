<template>

    <FullPageModal v-if="profile_is_complete" :type="'success'">
        <template #text-content>Profile Completed successfully</template>
        <template #button>
            <RouterLink to="/in/jobs">
                <button class="btn">Continue to Work Explorer</button>
            </RouterLink>
        </template>
    </FullPageModal>

    <div class="flex flex-col justify-center items-center min-h-screen overflow-y-auto p-8 dark:bg-[#000] dark:text-white">
        <form @submit.prevent="updateUserProfile" class="max-w-[500px]">
            <h1 class="font-bold text-3xl p-5 text-center">Lets Get Started!</h1>
            <div class="flex flex-col">
                <div class="flex flex-row mb-5 gap-2 justify-between items-center dark:text-gray-600 border-b pb-8 dark:border-b-gray-500">
                    <span class=" h-10 w-10  rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 0 ? 'bg-tz_blue text-white':'bg-gray-200'">1</span>
                        <span class="h-1 grow rounded-xl" :class="step >= 1 ? 'bg-tz_blue':' bg-gray-200'"></span>
                    <span class=" h-10 w-10  rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 1 ? 'bg-tz_blue text-white':'bg-gray-200'">2</span>
                        <span class=" h-1 grow rounded-xl" :class="step >= 2 ? 'bg-tz_blue':'bg-gray-200'"></span>
                    <span class=" h-10 w-10  rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 2 ? 'bg-tz_blue text-white':'bg-gray-200'">3</span>
                </div>

                <div v-if="step === 0">
                    <h1 class="font-bold text-xl p-5 text-center">Tell us about yourself</h1>
                    <p>Lets get to know you a bit and have a view of your perspective of the world.</p>
                    <div class="form-section" v-if="!user.firstname || !user.lastname">
                        <div class="form-control">
                            <label for="firstname">firstname</label>
                            <input class="form_input" type="text" name="firstname" id="firstname" minlength="2" maxlength="35" v-model="user_form.firstname" placeholder="John">
                        </div>
                        <div class="form-control">
                            <label for="lastname">lastname</label>
                            <input class="form_input" type="text" name="lastname" id="lastname" minlength="2" v-model="user_form.lastname" placeholder="Doe">
                        </div>
                    </div>
                    <div class="form-section">
                        <div class="form-control">
                            <label for="title">profile title</label>
                            <input class="form_input" type="text" name="title" id="title" minlength="12" maxlength="35" v-model="user_form.profile.title" placeholder="Technical Copywriter">
                        </div>
                        <div class="form-control">
                            <label for="bio">profile bio</label>
                            <textarea class="form_input min-h-[150px]" type="text" name="bio" id="bio" minlength="15" v-model="user_form.profile.bio" placeholder="A very brief and descriptive bio"></textarea>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="form-control">
                            <label for="skills">skills & expertise (seperated with commas)</label>
                            <input class="form_input" type="text" name="skills" id="skills" minlength="15" v-model="user_form.profile.skills" placeholder="Copy writing, Technical writing, Graphic Design">
                        </div>
                    </div>
                    
                    <div class="flex flex-row gap-3">
                        <button type="button" @click="step += 1":disabled="!user_form.profile.title || !user_form.profile.skills || !user_form.profile.bio" class="btn w-full">Next</button>
                    </div>
                    
                </div>


                <div v-if="step === 1">
                    <h1 class="font-bold text-xl p-5 text-center">Lets Know your location</h1>
                    <p>This helps us to tailor the right jobs for you and help employers get to you faster. </p>
                    <div class="flex flex-row flex-wrap gap-3 mb-3">

                       
                        <div class="w-3/6 flex flex-col">
              
                            <label for="firstname">State</label>
                            <select class="form_input " v-model="user_form.profile.location.state">
                                <option value="" disabled>Select state</option>
                                <option class="p-3" v-for="(state, index) in NaijaStates.states()" :key="index" :value="state">{{ state }}</option>
                            </select>
                        </div>

                        <div class="w-3/6 flex flex-col">
                            <label for="firstname">LGA</label>
                            <select class="form_input " v-model="user_form.profile.location.LGA">
                                <option value="" disabled>Select LGA</option>
                                <option v-if="user_form.profile.location.state" class="p-3" v-for="lga in NaijaStates.lgas(user_form.profile.location.state).lgas" :value="lga">{{ lga }}</option>
                            </select>
                        </div>

                        
                    </div>

                    <div class="form-section">
                        <label for="city">City</label>
                        <input class="form_input" type="text" name="city" id="city" v-model="user_form.profile.location.city">
                    </div>

                    <div class="form-section">
                        <div class="form-control">
                            <label for="address">address line</label>
                            <input class="form_input" type="text" name="address" id="address" v-model="user_form.profile.location.address" placeholder="No. 27 John Doe Avenue, block 123">
                        </div>
                    </div>
                
                    <div class="flex flex-row gap-3">
                        <button type="button" class="btn" @click="step -= 1">Back</button>
                        <button type="button" @click="step += 1" :disabled="!user_form.profile.location.state || !user_form.profile.location.city || !user_form.profile.location.address" class="btn w-full">Next</button>
                    </div>
                   
                </div>

                
                
                <div v-if="step === 2">
                    <h1 class="font-bold text-xl p-5 text-center">Can we have your contact?</h1>
                    <p>We promise not to share it with the general public, it will only be used for record keeping and reference purposes.</p>
                    <div class="form-section">
                        <div class="form-control">
                            <label for="phone">phone</label>
                            <input class="form_input" type="phone" name="phone" id="phone"  min="11" maxlength="11"  v-model="user_form.profile.phone" placeholder="+2348156074667">
                        </div>

                        <div class="form-control">
                            <label for="phone">social</label>
                            <input class="form_input" type="text" name="social" id="social" v-model="user_form.profile.social" placeholder="https://facebook.com/johndoe">
                        </div>
                    </div>
                    <div class="flex flex-row gap-3">
                        <button type="button" class="btn" @click="step -= 1">Back</button>
                        <button type="button" @click="updateUserProfile" :disabled="!user_form.profile.phone || !user_form.profile.social" class="btn w-full">Complete</button>
                    </div>
                </div>
                

            </div>
        </form>
    </div>
</template>
<script>
import TemplateView from '../TemplateView.vue';
import nigerianStates from '@/utils/states.json';
import LoaderButton from '@/components/LoaderButton.vue';
import axios from 'axios';
import FullPageModal from '@/components/FullPageModal.vue';
import DismissableAlert from '@/components/DismissableAlert.vue';

import { useToast } from 'vue-toastification'

import NaijaStates from 'naija-state-local-government';

export default {
    name: "ProfileStepView",
    components: { 
        TemplateView, 
        LoaderButton, 
        FullPageModal, 
        DismissableAlert 
    },

    data(){
        return{
            toast: useToast(),
            step: 0,
            user: '',
            alerts: [],
            loading: false,
            user_form: {
            preffered_job_types: '',
            firstname: '',
            lastname: '',

            location: {
                LGA: '',
                city: '',
                state: '',
                address: '',
            },

            profile: {
                title: '',
                bio: '',
                location: {
                    LGA: '',
                    city: '',
                    state: '',
                    address: '',
                },
                phone: '',
                social: '',
                skills: '',
                },
        },

            nigerianStates,
            NaijaStates,
            headers: {Authorization: `JWT ${localStorage.getItem('life-gaurd')}`},

            profile_is_complete: '',
        }
    },

    methods: {

        async updateUserProfile(){
            this.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.patch(`${this.api_url}/user/profile`, this.user_form, { headers });
                // console.log(response);
                this.profile_is_complete = true;
                this.loading = false;
                // display toast..
                this.toast.success(response.data.message);
            }
            catch(error){
                // display any possible error here...
                console.log("error updating profile: ", error);
                this.loading = false;
            }
        },

        async getUserData(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/user`, { headers });
                const user = response.data.user;
                const profile = this.user.profile;

                this.user_form.firstname = user.firstname;
                this.user_form.lastname = user.lastname;

                // prefill form...

                console.log("user data: ", response)
            }catch(error){
                // display toast..
                this.toast.error(error.response.data.message);
            }
        },
    },
    created(){
        this.getUserData();
    }
}
</script>
<style scoped>
    .form-section{
        @apply mt-5
    };
</style>