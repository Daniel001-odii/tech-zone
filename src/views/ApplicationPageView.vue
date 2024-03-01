<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Application</template>
            <template #page-contents>
                <div class="flex flex-col md:flex-row p-5" >
                    <div class=" md:w-2/4">
                        <!-- <div class=" h-52" 
                        style="background-image: url('../assets/images/Group\ 281.png');
                        background-position: center;
                        background-size: cover;">
                        ...
                        </div> -->
                        <div v-if="job">
                            <div class="flex flex-col border h-full p-3 text-left gap-3 rounded-md">
                                <div class="flex flex-col gap-3">
                                    <div class="flex flex-row justify-between items-center">
                                        <span class="font-bold text-2xl">
                                            <slot name="job-title">
                                                {{ job.title }}
                                            </slot>
                                        </span>
                                    
                                    </div>
                                    <div v-if="job.employer">
                                       {{ job.employer.profile.company_name}}
                                        <span>Rating here...</span>
                                    </div>
                                    <div class="flex flex-row gap-3 flex-wrap">

                                        <div>
                                            <i class="bi bi-geo-alt mr-3"></i> 
                                            <span v-if="job.location.remote">remote</span>
                                            <span v-else>{{ job.location }}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-arrow-clockwise"></i> <span>{{ job.created }}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-wallet"></i> <span>N{{ job.budget.toLocaleString()}}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-briefcase"></i> <span>{{ job.period}}</span>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div class="font-bold">
                                    Job Description
                                </div>
                                <div>
                                    <slot name="job-description">
                                      {{ job.description }}
                                    </slot>
                                </div>

                                <div>
                                    <!-- <span class="font-bold">{{  job.skills }}</span> -->
                                    <div class="flex flex-row flex-wrap gap-3">
                                        <span v-for="(tag, tag_index) in job.skills
                                        " class="bg-light_blue text-blue px-3 py-2 rounded-md">{{ tag }}</span>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-bold">Project Type</span>
                                    <div>Medium [a period of 30 months]</div>
                                </div>

                                <div>
                                    <span class="font-bold">Payment Type</span>
                                    <div>{{ job.budget_type }}</div>
                                </div>

                                <div>
                                    <span class="font-bold">About Recruiter</span>
                                    <div class="flex flex-row justify-start items-center gap-4">
                                        <img :src="job.employer.profile.image_url" class=" h-14">
                                        <div class="flex flex-col">
                                            <span>{{ job.employer.profile.company_name }}</span>
                                            <span>{{ job.employer.profile.tag_line }}</span>
                                            <span>member since: {{ job.employer.created }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-bold">Job Location in Map</span>
                                    <div class=" h-80 w-80 bg-light_blue"></div>
                                </div>

                                <div>
                                    <span class="font-bold">Activity On This Job</span>
                                    <div>Number of application:</div>
                                    <div>Users Assigned:</div>
                                    <div>Hires:</div>
                                </div>

                                <div>
                                    <span class="font-bold">Share this job</span>
                                    <div class="bg-light_blue p-3 border rounded-md w-fit cursor-not-allowed">{{ this.$route.path }}</div>
                                    <button>copy link</button>
                                </div>

                                

                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="sumbitApplication" class=" md:w-2/4 md:p-5 mt-6 md:m-0 flex flex-col gap-5">
                         <div class="flex flex-col text-left gap-3">
                            <span class="font-bold text-2xl">Cover Letter</span>
                            <textarea class=" h-52 max-h-96 p-4 border rounded-md" placeholder="A very detailed cover letter" v-model="application_form.cover_letter" required>

                            </textarea>
                         </div>

                         <div class="flex flex-col text-left gap-3">
                            <span class="font-bold text-2xl">Attachments</span>
                            <div class=" h-52 border border-dotted rounded-md flex flex-col justify-center items-center">
                                <div class="flex flex-col justify-center items-center">
                                    <i class="bi bi-cloud-arrow-up-fill text-4xl text-black"></i>
                                    <span>Drag & Drop files here</span>
                                    <button class="bg-black w-72 rounded-md px-12 py-2 text-white">
                                      <i class="bi bi-file-earmark-arrow-up-fill"></i> Upload
                                    </button>
                                </div>
                            </div>
                         </div>

                         <div class="flex flex-col text-left gap-3">
                            <div class="flex flex-row gap-3">
                                <input type="checkbox" @change="hasCounterOffer = !hasCounterOffer">
                                <p>Do you want to counter the client's budget/offer?</p>
                            </div>
                          
                            <div v-if="hasCounterOffer">
                                <span class="font-bold text-2xl">Counter Offer</span>
                                <div class="flex flex-col justify-center gap-5 mt-3">
                                    <div class="flex flex-col">
                                            <span class="text-xl">Requesting Fee</span>
                                            <input type="text" placeholder="100,000.00" class="border rounded-md p-5" v-model="application_form.counter_offer">
                                            <span class="font-sm text-gray-500">Input the amount you want to get paid for the job</span>
                                    </div>

                                    <div class="flex flex-col">
                                            <span class="text-xl">Reason</span>
                                            <textarea type="text" placeholder="a good reason for the counter offer" class="border rounded-md p-5" v-model="application_form.reason_for_co"></textarea>
                                            <span class="font-sm text-gray-500">Input the amount you want to get paid for the job</span>
                                    </div>
                                </div>
                            </div>
                           
                         </div>
                         <div class="flex ">
                            <button type="submit" class="bg-blue py-3 px-6 text-white rounded-md hover:bg-dark_blue">Submit Application</button>
                         </div>
                         
                        </form>

                   
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from './TemplateView.vue';
import axios from 'axios'

export default {
    name: "ApplicationPageView",
    components: { TemplateView, JobDetailCard },
    data(){
        return{
            hasCounterOffer: false,
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },

            job: '',
            application_form: {
                cover_letter: '',
                counter_offer: '',
                reason_for_co: ''
            },
            application: '',
        }
    },
    methods: {
        async getCurrentJobDetails(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/jobs/${this.$route.params.job_id}`, { headers });
                console.log(response);
                this.job = response.data.job;

            }
            catch(error){
                // handle response here....
                console.log(error)
            }
        },

        async getApplicationDetails(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/jobs/${this.$route.params.job_id}/application`, { headers });
                console.log("application details: ", response);
            } catch(error){
                // handle error here...
            }
        },

        async sumbitApplication(){
            const headers = this.headers;
            try{
                const response = await axios.post(`${this.api_url}/jobs/${this.$route.params.job_id}/apply`, this.application_form,  { headers });
                console.log(response)
            } catch(error){
                console.log(error);
            }
        }
    },

    mounted(){
        this.getCurrentJobDetails();
        this.getApplicationDetails();
    }
}
</script>
<style scoped>
    
</style>