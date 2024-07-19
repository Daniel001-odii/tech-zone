<template>
    <FullPageModal v-if="job_is_posted" :type="'success'">
        <RouterLink to="/client/dashboard">
            <button class="btn">Return to home</button>
        </RouterLink>
    </FullPageModal>

<PageTitle>Edit Job</PageTitle>
<div class="flex flex-col justify-between dark:bg-[#27323F] dark:text-white w-full h-full">

<div class="flex flex-col gap-3">

    <div v-if="form_errors" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 m-8" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium"> {{ form_errors }}</span> 
        </div>
    </div>

    <!-- <span>index: {{ currentIndex }}</span> -->

    <div class="flex flex-row justify-center items-center">
            <!-- FOR SECTION 1 JOB TITLE -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 0" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Job Title</h1>
                        <p class="text-2xl font-bold">Give your job a very descriptive Name.</p>
                        <span>Giving a descriptive name helps attract the right talent and save you time</span>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="job_title">
                        <p>Write a name for your job posting</p>
                        <textarea @input="validateText(job_post.title)" class="form_input max-h-[200px]" placeholder="A very descriptive title" v-model="job_post.title" required></textarea>
                        <span class="text-sm text-gray-400">Examples : Product Designer, Web Designer, Flutter Developer</span>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 2 SKILLS -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 1" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Skills</h1>
                        <p class="text-2xl font-bold">Give a list of skills required for your job.</p>
                        <span>Skills, qualifications, necessary tools required should be listed here,  For more reach and better result, input 3 or more skills..</span>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="skills">
                        <p>Search Skill here or Manually add your own</p>
                        <!-- {{ job_post.skills }} -->
                        
                        <input @input="validateText(inputValue)" class="form_input" placeholder="Skill seperated by comma e.g HTML, CSS, JavaScript" v-model="inputValue" @keyup.enter="addTag">
                        <div class="flex flex-row flex-wrap gap-2">
                            <div v-for="(tag, index) in tags" :key="index" class="p-3 rounded-xl bg-tz_light_blue">
                                {{ tag }}<span class="ml-3" @click="removeTag(index)">&times;</span>
                            </div>
                        </div>
                        <!-- <span class="text-sm text-gray-400">Selected Skills : Product Designer, Web Designer, Flutter Developer</span> -->
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 3 PERIOD -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 2" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Work Period</h1>
                        <p class="text-2xl font-bold">Estimate the period the work will last for.</p>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="period">
                        <p>How long will the job last?</p>
                        <select class="form_input" placeholder="Product Designer" v-model="job_post.period">
                            <option value="" disabled>select job period</option>
                            <option value="less than a month">less than a month</option>
                            <option value="1 to 3 months">1 to 3 months</option>
                            <option value="3 to 5 months">3 to 6 months</option>
                            <option value="6 months plus">6 months plus</option>
                        </select>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 4 BUDGET & BUDGET TYPE -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 3" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Budget</h1>
                        <p class="text-2xl font-bold">What is your budget for the job?</p>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="budget">
                        <p>Select the budget type</p>
                        <div class="flex flex-row gap-6">
                            <label for="fixed-price" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'fixed-price' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="fixed-price" id="fixed-price" name="budget-type" v-model="job_post.budget_type" @change="updateTracker">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-receipt"></i> <span>Fixed Price</span>
                                </div>
                            </label>
                            <label for="hourly" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'hourly' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="hourly" id="hourly" name="budget-type" v-model="job_post.budget_type" @change="updateTracker">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-clock"></i> <span>Hourly Rate</span>
                                </div>
                            </label>
                        </div>
                        <p class="mt-3">Project Budget <span v-if="job_post.budget_type == 'hourly'">per hour</span></p>
                        <input type="number" placeholder="N100,000" class="form_input" v-model="job_post.budget" required>
                        <!-- <AmountInput v-model="job_post.budget"/> -->
                        <span>
                            After Project is completed  and satisfied, payment will be released to talent.
                        </span>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 5 JOB LOCATION -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 4" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Job Location</h1>
                        <p class="text-2xl font-bold">Where will this job be carried out?</p>
                        <!-- <span>Giving a descriptive name helps attract the right talent and save you time</span> -->
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="location">
                        <p>write a correct and exisitng location, dont stress the talents...</p>
                        <div class="flex flex-row gap-6">
                            <!-- {{ job_post.location.remote }} -->
                            <label for="remote" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote === 'true' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="true" id="remote" name="job-location" v-model="job_post.location.remote" @change="updateTracker">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-geo-alt-fill"></i> <span>Remote</span>
                                </div>
                            </label>
                            <label for="on-site" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote == 'false' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="false" id="on-site" name="job-location" v-model="job_post.location.remote" @change="updateTracker">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-buildings"></i> <span>On Site</span>
                                </div>
                            </label>
                        </div>
                        <div v-if="job_post.location.remote != 'true'" class="flex flex-col gap-3">
                            <div class="flex flex-row items-center gap-3 relative">
                                <input @keyup="location_found = false" type="address" name="address" v-model="job_post.location.address" placeholder="Address line or Str. No, City" class="form_input w-full">
                                <i v-if="location_found" class="bi bi-check-circle-fill absolute text-green-400 right-3"></i>
                            </div>
                            <select @change="location_found = false" v-model="job_post.location.state" class="form_input ">
                                <option value="" disabled>Select State</option>
                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                            </select>
                            <button v-if="location_found == false" class="btn" @click.prevent="getJobCordinates" :disabled="loading_g_location || job_post.location.address == ''">
                                <span v-if="loading_g_location">searching...</span>
                                <span v-if="!loading_g_location">confirm location</span>
                            </button>
                            <div class=" bg-cyan-100 p-3 rounded-md text-cyan-700 border border-cyan-200">
                                <i class="bi bi-exclamation-circle-fill"></i>
                                In order to help the talents locate this place, this location would be displayed on a map in the job post. Please be precise</div>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 5 TASK WATCH -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 5" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Task watch</h1>
                        <p class="text-2xl font-bold">Will you require the talent to track time while working on the project?</p>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="location">
                        <p>our time tracking system allows users track the time spent while working on a task or project.</p>
                        <div class="flex flex-row gap-6">
                            <label for="require_tracker" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.requires_taskwatch == 'true' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="true" id="require_tracker" name="tracker" v-model="job_post.requires_taskwatch">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-clock-history"></i> <span>Track time</span>
                                </div>
                            </label>
                            <label for="require_no_tracker" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.requires_taskwatch == 'false' ? 'bg-tz_light_blue border-tz_blue':''">
                                <input type="radio" value="false" id="require_no_tracker" name="tracker" v-model="job_post.requires_taskwatch">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-x-circle"></i> <span>No need</span>
                                </div>
                            </label>
                        </div>
                        <div class="flex flex-col gap-3">
                            <span v-if="job_post.budget_type == 'hourly'">We have suggested to track time since its an hourly budget payment.</span>
                            <div class=" bg-cyan-100 p-3 rounded-md text-cyan-700 border border-cyan-200">
                                <i class="bi bi-exclamation-circle-fill"></i>
                                Jobs that are on-site, and have an hourly budget have the time tracker feature turned on by default.
                                otherwise it is optional. this is to enable process the  talents pay per hour.
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- FOR SECTION 6 JOB DESCRIPTION -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 6" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Job Description</h1>
                        <p class="text-2xl font-bold">Final Step, Write a clear description of the job, including deliverables, skills, experience and other necessary details..</p>
                    </div>
                    <div class="border-l border-gray-600"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col" id="description">
                        <p>Describe your job</p>
                        <textarea @input="validateText(job_post.description)" class="form_input h-[350px] max-h-[400px]" placeholder="Dscribe the job in full details here" v-model="job_post.description" required></textarea>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 7 JOB REVIEW -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 7" class="form_section">
                
                    <!-- LEFT -->
                    <div class=" flex flex-col text-left w-full md:w-3/6 overflow-y-auto h-[600px]">
                        <h1>Job Review</h1>
                        <div class="w-full flex flex-col gap-2">
                            <!-- REVIEW ESCTION 1 -->
                            <div class="border p-2">
                                <div class="w-full flex flex-row justify-between p-3">
                                    <span class="font-bold text-lg">Job Title</span>
                                    <button type="button" @click="prev_title = !prev_title"><i class="bi bi-pen"></i></button>
                                    
                                </div>
                                <div v-if="prev_title" class=" w-full p-2 text-start gap-3 flex flex-col">
                                    <p>Write a name for your job posting</p>
                                    <textarea class="form_input h-40" placeholder="A very descriptive title" v-model="job_post.title" required></textarea>
                                    <span class="text-sm text-gray-400">Examples : Product Designer, Web Designer, Flutter Developer</span>
                                </div>
                            </div>

                            <!-- REVIEW SECTION 3 -->
                            <div class="border p-2">
                                <div class="w-full flex flex-row justify-between p-3">
                                    <span  class="font-bold text-lg">Period</span>
                                    <button type="button" @click="prev_period = !prev_period"><i class="bi bi-pen"></i></button>
                                </div>
                                <div v-if="prev_period" class=" w-full h-full p-5 text-start gap-3 flex flex-col">
                                    <p>How long will the job last?</p>
                                    <select class="form_input" v-model="job_post.period">
                                        <option value="" disabled>Select job period</option>
                                        <option value="less than a month">Less than a month</option>
                                        <option value="1 to 3 months">1 to 3 months</option>
                                        <option value="3 to 6 months">3 to 6 months</option>
                                        <option value="6 months plus">6 months plus</option>
                                    </select>
                                </div>
                            </div>

                            <!-- REVIEW SECTION 4 -->
                            <div class="border p-2">
                                <div class="w-full flex flex-row justify-between p-3">
                                    <span  class="font-bold text-lg">Budget and Budget type</span>
                                    <button type="button" @click="prev_budget = !prev_budget"><i class="bi bi-pen"></i></button>
                                </div>
                                <div v-if="prev_budget" class=" w-full h-full p-5 text-start gap-3 flex flex-col">
                                    <p>Select the budget type</p>
                                    <div class="flex flex-row gap-6">
                                        <label for="fixed-price" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'fixed-price' ? 'bg-tz_light_blue border-tz_blue':''">
                                            <input type="radio" value="fixed-price" id="fixed-price" name="budget-type" v-model="job_post.budget_type">
                                            <div class="flex flex-row gap-3">
                                                <i class="bi bi-receipt"></i> <span>Fixed Price</span>
                                            </div>
                                        </label>
                                        <label for="hourly" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'hourly' ? 'bg-tz_light_blue border-tz_blue':''">
                                            <input type="radio" value="hourly" id="hourly" name="budget-type" v-model="job_post.budget_type">
                                            <div class="flex flex-row gap-3">
                                                <i class="bi bi-clock"></i> <span>Hourly Rate</span>
                                            </div>
                                        </label>
                                    </div>
                                    <p class="mt-3">Project Budget</p>
                                    <input placeholder="$100,000" class="form_input" v-model="job_post.budget">
                                    <span>
                                        After Project is completed  and satisfied, payment will be released to talent.
                                    </span>
                                </div>
                            </div>

                            <!-- REVIEW SECTION 3 -->
                                <div class="border p-2">
                                    <div class="w-full flex flex-row justify-between p-3">
                                        <span  class="font-bold text-lg">Job Location</span>
                                        <button type="button" @click="prev_location= !prev_location"><i class="bi bi-pen"></i></button>
                                    </div>
                                    <div v-if="prev_location" class=" w-full h-full p-5 text-start gap-3 flex flex-col">
                                        <p>write a correct and exisitng location, dont stress the talents...</p>
                                        <div class="flex flex-row gap-6">
                                            <!-- {{ job_post.location.remote }} -->
                                            <label for="remote" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote === 'true' ? 'bg-tz_light_blue border-tz_blue':''">
                                                <input type="radio" value="true" id="remote" name="job-location" v-model="job_post.location.remote">
                                                <div class="flex flex-row gap-3">
                                                    <i class="bi bi-geo-alt-fill"></i> <span>Remote</span>
                                                </div>
                                            </label>
                                            <label for="on-site" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote == 'false' ? 'bg-tz_light_blue border-tz_blue':''">
                                                <input type="radio" value="false" id="on-site" name="job-location" v-model="job_post.location.remote">
                                                <div class="flex flex-row gap-3">
                                                    <i class="bi bi-buildings"></i> <span>On Site</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div v-if="job_post.location.remote != 'true'" class="flex flex-col gap-3">
                                            <div>
                                                <input type="address" name="address" v-model="job_post.location.address" placeholder="Address line or Str. No, City" class="form_input">
                                                <i class="bi bi-check"></i>
                                            </div>
                        
                                            <select @change="updateJobState" v-model="job_post.location.state" class="form_input ">
                                                <option value="" disbaled>select state</option>
                                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                                            </select>
                                            <div class=" bg-cyan-100 p-3 rounded-md text-cyan-700 border border-cyan-200">
                                                <i class="bi bi-exclamation-circle-fill"></i>
                                                In order to help the talents locate this place, this location would be displayed on a map in the job post. Please be precise</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- REVIEW SECTION 4 -->
                                <div class="border p-2">
                                    <div class="w-full flex flex-row justify-between p-3">
                                        <span  class="font-bold text-lg">Job Description</span>
                                        <button type="button" @click="prev_description = !prev_description"><i class="bi bi-pen"></i></button>
                                    </div>
                                    <div v-if="prev_description" class=" w-full h-full p-5 text-start gap-3 flex flex-col">
                                        <p>Describe your job</p>
                                        <textarea class="form_input h-40" placeholder="Dscribe the job in full details here" v-model="job_post.description"></textarea>
                                    </div>
                                </div>

                                <button v-if="this.$route.params.job_id" type="button" @click="updateJob" class=" p-3 font-bold bg-green-500 hover:bg-green-700 text-white rounded-md">Update Job</button>
                                <button v-else type="button" @click="submitJob" class=" p-3 font-bold bg-green-500 hover:bg-green-700 text-white rounded-md">Post Job</button>
                        </div>
                    </div>



                    <!-- RIGHT -->
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <JobDetailCard class="h-full"
                            :company="'Your company name here'"
                            :remote="job_post.location.remote ? true : false"
                            :location="job_post.location" 
                            :posted="'now'" 
                            :period="job_post.period" 
                            :budget="job_post.budget">
                            <template #job-title>
                                {{ job_post.title }}
                            </template>
                            <template #job-description>
                                {{ job_post.description.substring(0, 500) }}...
                            </template>
                            <!-- :skills="job_post.skills"  -->
                        </JobDetailCard>
                    </div>
                </div>
            </Transition>
    

    </div>

   
</div>

<div class="flex p-4 flex-col justify-center  items-center gap-6 w-full">

    <!-- STEP COUNTER -->
    <div class=" w-4/5 h-4 dark:bg-gray-600 bg-gray-gray-300 rounded-lg overflow-hidden">
        <div class="h-full bg-tz_blue rounded-full"role="progressbar" :style="{ width: (currentIndex + 1) * 14 + '%' }" :aria-valuenow="(currentIndex + 1) * 14" aria-valuemin="0" aria-valuemax="100"></div>
    </div>


    <div class="w-full justify-between flex flex-row">
        <button type="button" class="bg-tz_blue py-3 px-6 rounded-3xl text-white disabled:bg-gray-300" @click="prev" :disabled="currentIndex == 0">Previous</button>
        <button type="button" class="bg-tz_blue py-3 px-6 rounded-3xl text-white disabled:bg-gray-300" @click="next" :disabled="checkCurrentIndex" >Next</button>
        
    </div>
</div>

</div>
    
</template>

<script>
import FullPageModal from '@/components/FullPageModal.vue';
import JobDetailCard from '@/components/JobDetailCard.vue';
import PageTitle from '@/components/PageTitle.vue';
import axios from 'axios'

import states from '../../utils/states.json'

import AmountInput from '@/components/AmountInput.vue';

    export default {
        name: "ClientPostJobView",
        components: { 
            JobDetailCard, 
            FullPageModal, 
            AmountInput,
            PageTitle },
        data(){
            return{
                currentIndex: 0,
                prev_title: false,
                prev_skills: false,
                prev_period: false,
                prev_budget: false,
                prev_description: false,
                prev_location: false,

                // job post form..
                job_post: {
                    title: '',
                    skills: [],
                    period: '',
                    location: {
                        remote: 'false',
                        state: 'Select State',
                        city: '',
                        address: '',
                        latitude: '',
                        longitude: '',
                    },
                    budget: '',
                    budget_type: 'fixed-price',
                    description: '',
                    requires_taskwatch: false,
                    category: '',
                },

                states,
            
                
                // tags for job skills...
                tags: [],
                inputValue: '',
                form_errors: '',
                added_skills: [],
                job_is_posted: false,

                preview: {
                    title: '',
                },

                loading_g_location: false,
                location_found: false,

                is_valid_text: false,
            }
        },
        methods:{
            prev() {
                this.currentIndex--;
            },
            next() {
                this.currentIndex++;
            },

            new_skill(){
                const input = document.getElementById("skill_box");
                const tag = input.innerHTML;
                console.log(tag);
                input.innerHTML += `<span class='p-3 rounded-xl bg-tz_light_blue'>${tag}</span>`
            },

            addTag(){
                if (this.inputValue.trim() !== '') {
                    this.tags.push(this.inputValue.trim());
                    this.job_post.skills.push(this.inputValue.trim().toString());
                    this.inputValue = '';
                }
            },
            removeTag(index){
                this.tags.splice(index, 1)
                this.job_post.skills.splice(index, 1);
            },

            validateText(dynamic_model){
                const trimmed_msg = dynamic_model.trim();
                this.is_valid_text = trimmed_msg.length > 0;
            },

            updateTracker(){
                if(this.job_post.budget_type == "hourly"){
                    this.job_post.requires_taskwatch = 'true';
                } else if(this.job_post.budget_type == "fixed-price"){
                    this.job_post.requires_taskwatch = 'false';
                }
                
                if(this.job_post.location.remote == 'false'){
                    this.job_post.requires_taskwatch = 'true';
                };
            },

            // post job..
            async submitJob(){
                const headers = {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
                }
                try{
                    const response = await axios.post(`${this.api_url}/jobs`, this.job_post, { headers })
                    console.log(response);
                    this.job_is_posted = true;
                }catch(error){
                    // handle error..
                    // console.log(error.response.data.message)
                    this.form_errors = error.response.data.message;
                }
            },

            // edit job...
            async updateJob(){
                const headers = {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
                }
                try{
                    const response = await axios.patch(`${this.api_url}/jobs/${this.$route.params.job_id}`, this.job_post, { headers })
                    console.log(response);
                    this.job_is_posted = true;
                }catch(error){
                    // handle error..
                    console.log(error.response.data.message)
                    this.form_errors = error.response.data.message;
                }
            },

            // get job details [only for job editing]
            async getCurrentJobDetails(){
                const headers = this.headers;
                try{
                    const response = await axios.get(`${this.api_url}/jobs/${this.$route.params.job_id}`, { headers });
                    console.log(response);
                    this.job_post = response.data.job;
                    this.tags = this.job_post.skills;

                }
                catch(error){
                    // handle response here....
                    if(error.response.status === 404){
                        this.$router.push('/404');
                    }
                }
            },

            
            async getJobCordinatesOld() {
                this.loading_g_location = true;
                const geocoder = new google.maps.Geocoder();
                const address = this.job_post.location.address;

                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK' && results && results.length > 0) {
                    const { lat, lng } = results[0].geometry.location;
                    this.location_found = true;
                    this.job_post.location.latitude = lat();
                    this.job_post.location.longitude = lng();
                    console.log("Lat: ", lat(), "Long: ", lng());
                    this.loading_g_location = false;
                    } else{
                    alert("geo code was not successful...");
                    this.location_found = false;
                    }
                });
                this.loading_g_location = false;
            },

            async getJobCordinates() {
                try {
                    this.loading_g_location = true;
                    const geocoder = new google.maps.Geocoder();
                    const address = this.job_post.location.address;
                    const state = this.job_post.location.state;
                    const country = "Nigeria";

                    // Combine address, state, and country to form a complete address
                    const fullAddress = `${address}, ${state}, ${country}`;

                    geocoder.geocode({ address: fullAddress }, (results, status) => {
                        if (status === 'OK' && results && results.length > 0) {
                            const { lat, lng } = results[0].geometry.location;
                            this.job_post.location.latitude = lat();
                            this.job_post.location.longitude = lng();
                            console.log("Lat: ", lat(), "Long: ", lng(), "general result: ");
                            this.location_found = true;
                        } else {
                            alert("Geocode was not successful: " + status);
                            this.location_found = false;
                        }
                        this.loading_g_location = false;
                    });
                } catch (error) {
                    console.error("Error in getJobCoordinates:", error);
                    alert("An error occurred while fetching the coordinates.");
                    this.loading_g_location = false;
                    this.location_found = false;
                }
            }


            
        },
        created(){
            if(this.$route.params.job_id){
                this.getCurrentJobDetails();
            }
        },
        computed:{
            checkCurrentIndex(){
                if(this.currentIndex == 0){
                    if(this.job_post.title == '' || this.is_valid_text == false){
                        return true
                    } 
                };

                if(this.currentIndex == 1){
                    if(this.is_valid_text == false || this.tags.length <= 0){
                        return true
                    }
                    return false
                };

                if(this.currentIndex == 2 && this.job_post.period == ''){
                    return true
                };

                if(this.currentIndex == 3 && this.job_post.budget == ''){
                    return true
                };

                if(this.currentIndex == 4 && this.job_post.location.remote !=  'true'){
                    if(this.job_post.location.address == '' || this.job_post.location.state == ''){
                        return true
                    } else if(this.location_found != true){
                        return true
                    }
                    return false
                }
                if(this.currentIndex == 6 && this.is_valid_text == false){
                    return true
                };
                if(this.currentIndex == 7){
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
    .form_section{
        @apply flex flex-col md:flex-row min-h-96 w-4/5 mt-20 rounded-xl
    }

    .formSlide-enter-active, .formSlide-leave-active {
        transition: all 0.8s;
        margin-left: 0px;
        opacity: 0.8;
    }
    .formSlide-enter-from, .formSlide-leave-to {
        opacity: 0;
        margin-left: -80%;
    }

    .border{
        @apply dark:border-gray-500
    }
    button{
        @apply disabled:dark:bg-tz_light_blue
    }
</style>