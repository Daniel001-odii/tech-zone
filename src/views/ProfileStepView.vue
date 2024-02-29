<template>
    <div>
        <TemplateView :left-nav="false">
            <template #page-title>Profile Update</template>
            <template #page-contents>
                <div class="flex justify-center items-center h-full p-8">
                    <div class=" w-96 text-left">
                        <div></div>
                        <div>
                            <form @submit.prevent="updateUserProfile">
                                <div class="flex flex-col h-96">
                                    <div class="flex flex-row mb-5 justify-between items-center">
                                        <span class=" h-14 w-14 border rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 0 ? 'bg-blue text-white':'bg-gray-200'">1</span>
                                            <span class=" h-2 w-20 rounded-xl" :class="step >= 1 ? 'bg-blue':' bg-gray-200'"></span>
                                        <span class=" h-14 w-14 border rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 1 ? 'bg-blue text-white':'bg-gray-200'">2</span>
                                            <span class=" h-2 w-20 rounded-xl" :class="step >= 2 ? 'bg-blue':'bg-gray-200'"></span>
                                        <span class=" h-14 w-14 border rounded-full flex justify-center items-center font-bold text-2xl" :class="step >= 2 ? 'bg-blue text-white':'bg-gray-200'">3</span>
                                       
                                    </div>

                                    <div v-if="step === 0">
                                        <div class="form-section">
                                            <div class="form-control">
                                                <label for="title">profile title</label>
                                                <input class="p-3 rounded-lg border" type="text" name="title" id="title" v-model="user_form.profile.title" placeholder="Expereinced Copywriter">
                                            </div>
                                            <div class="form-control">
                                                <label for="bio">profile bio</label>
                                                <textarea class="p-3 rounded-lg border h-20" type="text" name="bio" id="bio" v-model="user_form.profile.bio" placeholder="A very brief and descriptive bio"></textarea>
                                            </div>
                                        </div>

                                        <div class="form-section">
                                            <div class="form-control">
                                                <label for="skills">skills & expertise</label>
                                                <input class="p-3 rounded-lg border" type="text" name="skills" id="skills" v-model="user_form.profile.skills" placeholder="Copy writing, Technical writing, Graphic Design">
                                            </div>
                                        </div>

                                    </div>


                                    <div v-if="step === 1">
                                        <div class="flex flex-row gap-3 mb-3">
                                            <div class="w-3/6 flex flex-col">
                                                <label for="firstname">State</label>
                                                <select class="text-black p-3 border" v-model="user_form.profile.location.state">
                                                    <option value="">Select state</option>
                                                    <option class="text-black p-3" v-for="(state, index) in nigerianStates" :key="index" :value="state">{{ state }}</option>
                                                </select>
                                            </div>

                                            <div class="w-3/6 flex flex-col">
                                                <label for="firstname">City</label>
                                                <input class="p-3 rounded-lg border " type="name" name="firstname" id="firstname" :value="user_form.profile.location.city">
                                            </div>
                                        </div>

                                        <div class="form-section">
                                            <div class="form-control">
                                                <label for="address">address line</label>
                                                <input class="p-3 rounded-lg border" type="text" name="address" id="address" v-model="user_form.profile.location.address" placeholder="No. 27 John Doe Avenue, block 123">
                                            </div>
                                        </div>
                                    
                                    </div>

                                   
                                   
                                    <div v-if="step === 2">
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
                                    

                                </div>
                            </form>
                        </div>
                        <div class="flex flex-row justify-between">
                            <button class="btn" v-if="step > 0" @click="step -= 1">Previous</button>
                            <button class="btn" v-if="step < 2" @click="step += 1">Next</button>
                            <LoaderButton @click="updateUserProfile" v-if="step == 2" :buttonText="'Finish'" :loading="user_form.loading"/>
                        </div>
                    </div>
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import TemplateView from './TemplateView.vue';
import { nigerianStates } from '../utils/states'
import LoaderButton from '@/components/LoaderButton.vue';

export default {
    name: "ProfileStepView",
    components: { TemplateView, LoaderButton },
    data(){
        return{
            step: 0,
            user: '',
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

                nigerianStates,
        }
    },

    methods: {
        async updateUserProfile(){
            this.user_form.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/user/profile`, this.user_form, { headers });
                console.log(response)
                this.user_form.loading = false;
            }
            catch(error){
                // display any possible error here...
            }
        },
    }
}
</script>
<style scoped>
    
</style>