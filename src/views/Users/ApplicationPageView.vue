<template>
    <div>

        <FullPageModal v-if="application_sent" :type="'success'" />
        
        <TemplateView :leftNav="true">
            <template #page-title>Application</template>
            <template #page-contents>
                <div>
                    
                </div>

                <div v-if="!job && loading" class="text-center w-full h-[90vh] border border-red-400 flex justify-center items-center dark:bg-[rgb(0,0,0,70%)] bg-white">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <!-- <FullPageLoading/> -->

                <div v-if="is_application" class=" m-3 bg-green-100 p-4 rounded-lg text-green-700  mb-3 text-start flex flex-row gap-4">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    <span>
                        You already submitted an application
                    </span>
                </div>

                <div v-if="job" class="flex flex-col md:flex-row px-5 py-3" >
                    <div class=" md:w-2/4">
                        <div>
                            <div class="flex flex-col border h-full p-3 text-left gap-3 rounded-md dark:border-gray-600">
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
                                        <span>{{ job.employer.ratings}}</span>
                                    </div>
                                    <div class="flex flex-row gap-3 flex-wrap">
                                        <div>
                                            <i class="bi bi-geo-alt mr-1"></i> 
                                            <span v-if="job.location.remote == 'true'">remote</span>
                                            <span v-else>{{ job.location.address }}, {{ job.location.state }}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-arrow-clockwise"></i> <span>{{ formatTimeFormat(job.created) }}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-wallet"></i> <span>N{{ job.budget.toLocaleString()}}</span>
                                        </div>
                                        <div>
                                            <i class="bi bi-briefcase"></i> <span>{{ job.period }}</span>
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
                                    <div class="flex flex-row flex-wrap gap-3">
                                        <span v-for="(tag, tag_index) in job.skills
                                        " class="bg-tz_light_blue text-tz_blue px-3 py-2 rounded-md">{{ tag }}</span>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-bold">Job Id</span>
                                    <div>{{ job._id }}</div>
                                </div>

                                <div>
                                    <span class="font-bold">Job Type</span>
                                    <div v-if="job.type">{{ job.type }}</div>
                                    <div v-else>not specified</div>
                                </div>

                                <div>
                                    <span class="font-bold">Job Duration</span>
                                    <div>{{ job.period }}</div>
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
                                    <div class=" h-80 w-80 bg-tz_light_blue"></div>
                                </div>

                                <div>
                                    <span class="font-bold">Activity On This Job</span>
                                    <div>Number of application:</div>
                                    <div>Users Assigned:</div>
                                    <div>Hires:</div>
                                </div>

                                


                                <div>
                                    <span class="font-bold">Share this job</span>
                                    <div class="bg-tz_light_blue p-3 border rounded-md w-fit cursor-not-allowed">{{ this.$route.path }}</div>
                                    <button>copy link</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="sumbitApplication" class=" md:w-2/4 md:p-5 mt-6 md:m-0 flex flex-col gap-5">
                        
                         <div class="flex flex-col text-left gap-3">
                            <span class="font-bold text-2xl">Cover Letter</span>
                            <textarea class=" h-52 max-h-96 p-4 border rounded-md disabled:text-gray-400 form_input" placeholder="A very detailed cover letter" v-model="application_form.cover_letter" :disabled="is_application" required></textarea>
                         </div>
                         <div class="flex flex-col text-left gap-3">
                            <span class="font-bold text-2xl">Attachments</span>
                            <div class=" h-fit rounded-md flex flex-col justify-center items-center py-4">
                                <!-- <div v-if="upload_progress !== ''">
                                    <p>Upload Progress: {{ upload_progress }}%</p>
                                </div> -->
                                <div  v-if="!is_application" class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" multiple @change="handleFileChange"/>
                                    </label>
                                </div> 
                                <div v-if="!is_application" class="flex flex-col w-full">
                                    <div class="w-full min-h-4 mt-3" >
                                        <p>Selected Files:</p>
                                        <ul class="flex flex-row flex-wrap justify-start gap-2 text-sm">
                                            <li class=" text-tz_blue flex flex-row items-center justify-between bg-tz_light_blue p-1 px-3 rounded-lg hover:bg-tz_blue hover:text-white" v-for="(file, index) in selectedFiles" :key="index">
                                                {{ file.name }} 
                                                <button type="button" @click="removeFile(index)" class="p-2"><i class="bi bi-x-lg"></i></button>
                                                
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <!-- {{ application_form }} -->
                                <div v-if="is_application && application_form.attachments">
                                    <span v-if="application_form.attachments.length > 0">you attached files are secured..</span>
                                </div>
                                <div v-else>No attachments</div>
                            </div>
                         </div>
                         <div class="flex flex-col text-left gap-3">
                            <div class="flex flex-row gap-3">
                                <input type="checkbox" name="counterOffer" id="counterOffer" @change="hasCounterOffer = !hasCounterOffer" :checked="is_application && hasCounterOffer" :disabled="is_application">
                                <label for="counterOffer">Counter budget/offer</label>
                            </div>
                            <div v-if="hasCounterOffer">
                                <span class="font-bold text-2xl">Counter Offer</span>
                                <div class="flex flex-col justify-center gap-5 mt-3">
                                    <div class="flex flex-col">
                                            <span class="text-xl">Requesting Fee</span>
                                            <input type="text" placeholder="100,000.00" class="form_input" v-model="application_form.counter_offer" :disabled="is_application">
                                            <span class="font-sm text-gray-500">Input the amount you want to get paid for the job</span>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-xl">Reason</span>
                                        <textarea type="text" placeholder="a good reason for the counter offer" class="form_input" v-model="application_form.reason_for_co" :disabled="is_application"></textarea>
                                        <span class="font-sm text-gray-500">Input the amount you want to get paid for the job</span>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div class="flex ">
                            <button type="submit" class="bg-tz_blue py-3 px-6 text-white rounded-md hover:bg-tz_dark_blue disabled:bg-gray-300" :disabled="is_application">
                                <span v-if="loading">Loading...</span>
                                <span v-else>Submit Application</span>
                            </button>
                         </div>
                    </form>

                   
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import axios from 'axios'
import { formatToRelativeTime } from '@/utils/dateFormat';
import FullPageModal from '@/components/FullPageModal.vue'
import FullPageLoading from '@/components/FullPageLoading.vue';


export default {
    name: "ApplicationPageView",
    components: { TemplateView, JobDetailCard, FullPageModal, FullPageLoading },
    data(){
        return{
            loading: false,
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

            is_application: false,
            upload_progress: '',
            application_attachments: '',
            selectedFiles: [],

            application_sent: false,
        }
    },
    methods: {
        handleFileChange(event) {
            this.application_attachments = event.target.files;
             // Update the selectedFiles array with the names of the selected files
            for (let i = 0; i < this.application_attachments.length; i++) {
                this.selectedFiles.push(this.application_attachments[i]);
                // this.uploadSingleFile(this.application_attachments[i]);
            }
        },

        removeFile(index) {
            this.selectedFiles.splice(index, 1);
        },

        formatTimeFormat(time){
            return formatToRelativeTime(time)
        },

        async getCurrentJobDetails(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/jobs/${this.$route.params.job_id}`, { headers });
                console.log(response);
                this.job = response.data.job;

            }
            catch(error){
                // handle response here....
                if(error.response.status === 404){
                    this.$router.push('/404');
                }
            }
        },

        async getApplicationDetails(){
            // this.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/jobs/${this.$route.params.job_id}/application`, { headers });
                console.log("application details: ", response);
                if(response.data.application){
                    this.application_form = response.data.application;
                    if(response.data.application.counter_offer){
                        this.hasCounterOffer = true;
                    }
                }
               
                // this.loading = false;
                if(this.application_form.job === this.$route.params.job_id){
                    this.is_application = true;
                }
                
            } catch(error){
                // handle error here...
                console.log("error getting applications for job: ", error)
                // if(error.response.status === 404){
                //     this.$router.push('/404');
                // }
            }
        },

        async sumbitApplication(){
            this.loading = true;
            const formData = new FormData();
            formData.append('cover_letter', this.application_form.cover_letter);
            formData.append('counter_offer', this.application_form.counter_offer);
            formData.append('reason_for_co', this.application_form.reason_for_co);
            for (let i = 0; i < this.application_attachments.length; i++) {
                formData.append('attachments', this.application_attachments[i]);
            }

            const config = {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
                },
                onUploadProgress: (progressEvent) => {
                        this.upload_progress = Math.round((progressEvent.loaded / progressEvent.total ) * 100);
                }
            };
            try{
                const response = await axios.post(`${this.api_url}/jobs/${this.$route.params.job_id}/apply`, formData, config);
                console.log(response)
                this.loading = false;
                this.application_sent = true;
            } catch(error){
                console.log(error);
            }
        },

        createMetaTag(property, content){
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            metaTag.setAttribute('content', content);
            window.document.head.appendChild(metaTag);
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