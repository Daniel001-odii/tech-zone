<template>

    <!-- TOAST -->
    <Toast/>
    <!--  -->

    <FullPageModal v-if="application_sent" :type="'success'" />

    <div class="h-full flex flex-col">
        <!-- <PageTitle>Application</PageTitle> -->
        <div class=" top-0 bottom-0 right-0 flex flex-col h-full">
            <FullPageLoading v-if="!job && loading"/>
            <div class="h-full overflow-y-scroll">
                
                <div v-if="is_application" class=" m-3 bg-green-100 p-4 rounded-lg text-green-700  mb-3 text-start flex flex-row gap-4">
            <i class="bi bi-exclamation-circle-fill"></i>
            <span>
                You already submitted an application
            </span>
        </div>

        <div v-if="job" class="flex flex-col md:flex-row px-5 py-3" >
            <div :class="job.status == 'closed' ? 'md:w-full':'md:w-2/4'">
                <div>
                    <div class="flex flex-col border h-full p-3 text-left gap-3 rounded-md dark:border-gray-600">
                        <!-- <div class="border border-red-300 w-full">image here</div> -->
                        <div class="flex flex-col gap-3">
                            <div class="flex flex-row justify-between items-center">
                                <span class="font-bold text-2xl">
                                    <slot name="job-title">
                                        {{ job.title }} 
                                        <span v-if="job.status == 'closed'" class="text-sm font-medium bg-red-500 rounded-full px-2 py-1 text-white">{{ job.status }}</span>
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
                                    <span v-if="job.location.remote">remote</span>
                                    <span v-else>{{ job.location.address }}, {{ job.location.state }}</span>
                                </div>
                                <div>
                                    <i class="bi bi-arrow-clockwise"></i> <span>{{ formatDistanceToNow(job.createdAt) }} ago</span>
                                </div>
                                <div>
                                    <i class="bi bi-wallet"></i> <span>N{{ job.budget.toLocaleString()}} {{ job.budget_type }}</span>
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
                                <p v-html="job.description" class="whitespace-pre-line"></p>
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
                            <div class="flex flex-row justify-start items-start gap-4">
                                <img :src="job.employer.profile.image_url" class=" h-14 w-14 rounded-full">
                                <div class="flex flex-col text-sm">
                                    <span>{{ job.employer.profile.company_name }}</span>
                                    <span>{{ job.employer.profile.tag_line }}</span>
                                    <span class="text-gray-400">member since: {{ formatDistanceToNow(job.employer.createdAt, { addSuffix: true }) }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-3">
                            <span class="font-bold">Job Location in Map</span>
                            <div>
                                <button @click="drawJobMap()">See job in map</button>
                                <div v-show="job_map_is_visible" class=" h-80 w-full bg-tz_light_blue flex justify-center items-center p-2">
                                    <div  ref="map" class="h-full w-96">map loading...</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span class="font-bold">Activity On This Job</span>
                            <div>Number of application: {{ job.no_of_applications }}</div>
                            <div>Users Assigned: {{ job.no_of_assigned }}</div>
                            <div>Hires: {{ job.no_of_hires }}</div>
                        </div>

                        


                        <div>
                            <span class="font-bold">Share this job</span><br/>
                            <input type="text" id="job_link" :value="jobLink" class="bg-tz_light_blue p-3 border rounded-md w-[200px] overflow-hidden cursor-not-allowed" disabled/><br/>
                            <button @click="copyJobLink">copy link</button>
                        </div>
                    </div>
                </div>
            </div>
            <form v-if="job.status != 'closed'" @submit.prevent="sumbitApplication" class=" md:w-2/4 md:p-5 mt-6 md:m-0 flex flex-col gap-5">
                
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
                        <div v-if="!is_application" class="flex items-center justify-center w-full">
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

                        <!-- <button class="btn" @click="uploadFiles">Upload files</button> -->

                        <div v-if="!is_application" class="flex flex-col w-full">
                            <div class="w-full min-h-4 mt-3" >
                                <p>Selected Files:</p>
                                <ul class="flex flex-row flex-wrap justify-start gap-2 text-sm">
                                    <li class=" text-blue-300 flex flex-row items-center justify-between bg-tz_light_blue p-1 px-3 rounded-lg hover:bg-tz_blue hover:text-white" v-for="(file, index) in selectedFiles" :key="index">
                                        {{ file.name }} 
                                        <button type="button" @click="removeFile(index)" class="p-2"><i class="bi bi-x-lg"></i></button>
                                        
                                    </li>
                                </ul>
                            </div>
                            <!-- <button type="button" @click="uploadFiles" class=" bg-blue-500 p-3">upload files</button> -->
                        </div>
                        <!-- {{ application_form }} -->
                        <div v-if="is_application && application_form.attachments">
                            <span v-if="application_form.attachments.length > 0"><i class="bi bi-lock"></i> your attached files are secured..</span>
                        </div>
                        <!-- <div v-else>No attachments</div> -->
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
                    <button type="submit" class="bg-tz_blue py-3 px-6 text-white rounded-md hover:bg-tz_dark_blue disabled:bg-gray-300" :disabled="is_application || submit_loading">
                        <span v-if="submit_loading">Loading...</span>
                        <span v-else>Submit Application</span>
                    </button>
                    </div>

               
            </form>

            <!-- <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                    <p>Drag and drop files to here to upload.</p>
                </template>
            </FileUpload> -->
            <!-- {{ application_form }} -->

            
        </div>
            </div>
        </div>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import axios from 'axios'
import { formatToRelativeTime } from '@/utils/dateFormat';
import FullPageModal from '@/components/FullPageModal.vue'
import FullPageLoading from '@/components/FullPageLoading.vue';
import PageTitle from '@/components/PageTitle.vue';

import Toast from 'primevue/toast';

import FileUpload from 'primevue/fileupload';

import { formatDistanceToNow } from 'date-fns'
import { useToast } from 'vue-toastification';

export default {
    name: "ApplicationPageView",
    components: { 
        TemplateView, 
        JobDetailCard, 
        FullPageModal, 
        FullPageLoading, 
        PageTitle, 
        FileUpload,
        Toast 
    },
    data(){
        return{
            formatDistanceToNow,
            loading: false,
            hasCounterOffer: false,
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },

            job: '',

            application_form: {
                cover_letter: '',
                counter_offer: '',
                reason_for_co: '',
                attachments: '',
            },

            is_application: false,
            upload_progress: '',

            formatToRelativeTime,

            application_attachments: '',

            selectedFiles: [],

            application_sent: false,

            submit_loading: false,

            job_map_is_visible: false,
        }
    },
    methods: {
        copyJobLink(){
            // Get the text field
            let copyText = document.getElementById("job_link");

            // Select the text field
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);

            // alert user on success
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: "Job link copied successfuly!", life: 3000 });
            
        },

        handleFileChange(event) {
            this.application_attachments = event.target.files;
             // Update the selectedFiles array with the names of the selected files
            for (let i = 0; i < this.application_attachments.length; i++) {
                this.selectedFiles.push(this.application_attachments[i]);
            }
        },

        removeFile(index) {
            this.selectedFiles.splice(index, 1);
        },

        async uploadFiles() {
            // Create a FormData object to append files
            const formData = new FormData();
            for (let file of this.application_attachments) {
                formData.append('attachments', file);
            }

            try {
                // Make a POST request to the server endpoint
                const response = await axios.post(`${this.api_url}/application/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });
                console.log(response.data); // Handle server response
                this.application_form.attachments = response.data.fileUrls;
                alert("files uploaded securely...");

            } catch (error) {
                // console.error('Error uploading files:', error);
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
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
                // console.log("error getting applications for job: ", error)
                // this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
            }
        },

        async sumbitApplication(){
            this.submit_loading = true;
            const headers = this.headers;
            const form_data = this.application_form;

            console.log("attachments raw: ", form_data);

            try{
                // upload files here...
                if(this.selectedFiles.length > 0 ){
                    try{
                        this.uploadFiles();
                    }catch(error){
                        console.log("error uploading files");
                    }
                }
                const response = await axios.post(`${this.api_url}/jobs/${this.$route.params.job_id}/apply`, this.application_form, { headers });
                console.log("application sent: ", response.data);
                this.submit_loading = false;
                this.application_sent = true;
            }catch(error){
                // console.log("error submitting application: ", error)
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
                this.submit_loading = false;
            }
        },

        drawJobMap() {
            const google = window.google;

            // Create a map instance
            const map = new google.maps.Map(this.$refs.map, {
                center: { lat: 0, lng: 0 }, // Default center coordinates
                mapId: 'Map_preview',
                zoom: 13 // Default zoom level
            });

            // Get the user's location (assuming it's available)
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Coordinates of the job location (replace with actual job coordinates)
                const jobLat = this.job.location.latitude;
                const jobLng = this.job.location.longitude;

                // Create instances for user marker and job marker
                const userMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: parseFloat(userLat), lng: parseFloat(userLng) },
                    map: map,
                    title: 'Your Current Location',
                });

                // create custom icon for job marker....
                const job_icon_img = document.createElement("img");
                job_icon_img.src = "https://raw.githubusercontent.com/Daniel001-odii/odiiDaniel/main/images/apextek.png"

                const jobMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: parseFloat(jobLat), lng: parseFloat(jobLng) },
                    map: map,
                    title: 'Job Location',
                    content: job_icon_img,
                });

                // Create a DirectionsService object to use the route from user's location to job location
                const directionsService = new google.maps.DirectionsService();

                // Create a DirectionsRenderer object to display the route
                const directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: '#4e79bc',
                    strokeOpacity: 1,
                    strokeWeight: 5
                }
                });

                // Set the route between user's location and job location
                const request = {
                    origin: { lat: parseFloat(userLat), lng: parseFloat(userLng) },
                    destination: { lat: parseFloat(jobLat), lng: parseFloat(jobLng) },
                    travelMode: google.maps.TravelMode.DRIVING // Specify the travel mode
                };

                directionsService.route(request, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(response);
                    } else {
                        console.error('Error:', status);
                    }
                });

            });

            this.job_map_is_visible = true;
        },

                


    
    },

    computed: {
        jobLink(){
            return window.location.href;
        }
    },

    created(){
        this.getCurrentJobDetails();
        this.getApplicationDetails();

    }
}
</script>
<style scoped>


</style>