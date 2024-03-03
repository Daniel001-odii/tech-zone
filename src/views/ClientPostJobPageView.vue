<template>
    <div class="flex flex-row justify-center items-center">
        {{ form_errors }}
            <!-- FOR SECTION 1 JOB TITLE -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 0" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Job Title</h1>
                        <p class="text-2xl font-bold">Give your job a very descriptive Name.</p>
                        <span>Giving a descriptive name helps attract the right talent and save you time</span>
                    </div>
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>Write a name for your job posting</p>
                        <textarea class="border rounded-lg p-3 h-40" placeholder="A very descriptive title" v-model="job_post.title" required></textarea>
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
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>Search Skill here or Manually add your own</p>
                        <!-- {{ job_post.skills }} -->
                        
                        <input class="border rounded-lg p-3" placeholder="Skill seperated by comma e.g HTML, CSS, JavaScript" v-model="inputValue" @keyup.enter="addTag">
                        <div class="flex flex-row flex-wrap gap-2">
                            <div v-for="(tag, index) in tags" :key="index" class="p-3 rounded-xl bg-light_blue">
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
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>How long will the job last?</p>
                        <select class="border rounded-lg p-3" placeholder="Product Designer" v-model="job_post.period">
                            <option>Less than a month</option>
                            <option>1 to 3 months</option>
                            <option>3 to 6 months</option>
                            <option>6 months plus</option>
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
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>Select the budget type</p>
                        <div class="flex flex-row gap-6">
                            <label for="fixed-price" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'fixed-price' ? 'bg-light_blue border-blue':''">
                                <input type="radio" value="fixed-price" id="fixed-price" name="budget-type" v-model="job_post.budget_type">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-receipt"></i> <span>Fixed Price</span>
                                </div>
                            </label>
                            <label for="hourly" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'hourly' ? 'bg-light_blue border-blue':''">
                                <input type="radio" value="hourly" id="hourly" name="budget-type" v-model="job_post.budget_type">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-clock"></i> <span>Hourly Rate</span>
                                </div>
                            </label>
                        </div>
                        <p class="mt-3">Project Budget <span v-if="job_post.budget_type == 'hourly'">per hour</span></p>
                        <input placeholder="$100,000" class="border rounded-lg p-3" v-model="job_post.budget" required>
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
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>write a correct and exisitng location, dont stress the talents...</p>
                        <div class="flex flex-row gap-6">
                            <!-- {{ job_post.location.remote }} -->
                            <label for="remote" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote === 'true' ? 'bg-light_blue border-blue':''">
                                <input type="radio" value="true" id="remote" name="job-location" v-model="job_post.location.remote">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-geo-alt-fill"></i> <span>Remote</span>
                                </div>
                            </label>
                            <label for="on-site" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote == 'false' ? 'bg-light_blue border-blue':''">
                                <input type="radio" value="false" id="on-site" name="job-location" v-model="job_post.location.remote">
                                <div class="flex flex-row gap-3">
                                    <i class="bi bi-buildings"></i> <span>On Site</span>
                                </div>
                            </label>
                        </div>
                        <div v-if="job_post.location.remote != 'true'" class="flex flex-col gap-3">
                            <input type="address" name="address" v-model="job_post.location.address" placeholder="No. 6 Aba Road, Umuahia" class="border p-3 rounded-lg">
                            <select @change="whatState" v-model="job_post.location.state" class="p-3 border rounded-md ">
                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                            </select>
                            <!-- <select class="" @change="whatState" v-model="job_post.location.state" :disabled="isRemote">
                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                            </select> -->
                            <div class=" bg-cyan-100 p-3 rounded-md text-cyan-700 border border-cyan-200">
                                <i class="bi bi-exclamation-circle-fill"></i>
                                In order to help the talents locate this place, this location would be displayed on a map in the job post. Please be precise</div>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- FOR SECTION 6 JOB DESCRIPTION -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 5" class="form_section">
                    <div class=" w-full md:w-3/6 h-full p-5 text-start">
                        <h1>Job Description</h1>
                        <p class="text-2xl font-bold">Final Step, Write a clear description of the job, including deliverables, skills, experience and other necessary details..</p>
                    </div>
                    <div class="border"></div>
                    <div class=" w-full md:w-3/6 h-full p-5 text-start gap-3 flex flex-col">
                        <p>Describe your job</p>
                        <textarea class="border rounded-lg p-3 h-40" placeholder="Dscribe the job in full details here" v-model="job_post.description" required></textarea>
                    </div>
                </div>
            </Transition>

            <!-- FORM SECTION 7 JOB REVIEW -->
            <Transition name="formSlide">
                <div v-if="currentIndex === 6" class="form_section">
                
                    <!-- LEFT -->
                    <div class=" flex flex-col text-left w-full md:w-3/6">
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
                                    <textarea class="border rounded-lg p-3 h-40" placeholder="A very descriptive title" v-model="job_post.title"></textarea>
                                    <span class="text-sm text-gray-400">Examples : Product Designer, Web Designer, Flutter Developer</span>
                                </div>
                            </div>

                            <!-- REVIEW SECTION 2 -->
                            <!-- <div class="border p-2">
                                <div class="w-full flex flex-row justify-between p-3">
                                    <span  class="font-bold text-lg">Skills</span>
                                    <button type="button" @click="prev_skills = !prev_skills"><i class="bi bi-pen"></i></button>
                                </div>
                                <div v-if="prev_skills" class=" w-full h-full p-2 text-start gap-3 flex flex-col">
                                    <p>Search Skill here or Manually add your own</p>
                                    <input class="border rounded-lg p-3" placeholder="Product Designer" v-model="job_post.skills">
                                    <span class="text-sm text-gray-400">Selected Skills : Product Designer, Web Designer, Flutter Developer</span>
                                </div>
                            </div> -->

                            <!-- REVIEW SECTION 3 -->
                            <div class="border p-2">
                                <div class="w-full flex flex-row justify-between p-3">
                                    <span  class="font-bold text-lg">Period</span>
                                    <button type="button" @click="prev_period = !prev_period"><i class="bi bi-pen"></i></button>
                                </div>
                                <div v-if="prev_period" class=" w-full h-full p-5 text-start gap-3 flex flex-col">
                                    <p>How long will the job last?</p>
                                    <select class="border rounded-lg p-3" placeholder="Product Designer" v-model="job_post.period">
                                        <option>Less than a month</option>
                                        <option>1 to 3 months</option>
                                        <option>3 to 6 months</option>
                                        <option>6 months plus</option>
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
                                        <label for="fixed-price" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'fixed-price' ? 'bg-light_blue border-blue':''">
                                            <input type="radio" value="fixed-price" id="fixed-price" name="budget-type" v-model="job_post.budget_type">
                                            <div class="flex flex-row gap-3">
                                                <i class="bi bi-receipt"></i> <span>Fixed Price</span>
                                            </div>
                                        </label>
                                        <label for="hourly" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.budget_type == 'hourly' ? 'bg-light_blue border-blue':''">
                                            <input type="radio" value="hourly" id="hourly" name="budget-type" v-model="job_post.budget_type">
                                            <div class="flex flex-row gap-3">
                                                <i class="bi bi-clock"></i> <span>Hourly Rate</span>
                                            </div>
                                        </label>
                                    </div>
                                    <p class="mt-3">Project Budget</p>
                                    <input placeholder="$100,000" class="border rounded-lg p-3" v-model="job_post.budget">
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
                                            <label for="remote" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote === 'true' ? 'bg-light_blue border-blue':''">
                                                <input type="radio" value="true" id="remote" name="job-location" v-model="job_post.location.remote">
                                                <div class="flex flex-row gap-3">
                                                    <i class="bi bi-geo-alt-fill"></i> <span>Remote</span>
                                                </div>
                                            </label>
                                            <label for="on-site" class="border p-4 flex flex-col w-fit justify-end items-end rounded-lg" :class="job_post.location.remote == 'false' ? 'bg-light_blue border-blue':''">
                                                <input type="radio" value="false" id="on-site" name="job-location" v-model="job_post.location.remote">
                                                <div class="flex flex-row gap-3">
                                                    <i class="bi bi-buildings"></i> <span>On Site</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div v-if="job_post.location.remote != 'true'" class="flex flex-col gap-3">
                                            <input type="address" name="address" v-model="job_post.location.address" placeholder="No. 6 Aba Road, Umuahia" class="border p-3 rounded-lg">
                                            <select @change="whatState" v-model="job_post.location.state" class="p-3 border rounded-md ">
                                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                                            </select>
                                            <!-- <select class="" @change="whatState" v-model="job_post.location.state" :disabled="isRemote">
                                                <option v-for="state in states" :value="state" :key="state" >{{ state }}</option>
                                            </select> -->
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
                                        <textarea class="border rounded-lg p-3 h-40" placeholder="Dscribe the job in full details here" v-model="job_post.description"></textarea>
                                    </div>
                                </div>

                                <button type="button" @click="submitJob" class=" p-3 bg-green text-white rounded-md">Post Job</button>
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
                                {{ job_post.description }}
                            </template>
                            <!-- :skills="job_post.skills"  -->
                        </JobDetailCard>
                    </div>
                </div>
            </Transition>
    

    </div>
    <div class="flex p-4 flex-col justify-center  items-center gap-6 w-full">
        <div class=" w-4/5 h-4 bg-blue rounded-lg"></div>
        <div class="w-full justify-between flex flex-row">
            <button type="button" class="bg-blue py-3 px-6 rounded-3xl text-white disabled:bg-gray-300" @click="prev" :disabled="currentIndex === 0">Previous</button>
            <button type="button" class="bg-blue py-3 px-6 rounded-3xl text-white disabled:bg-gray-300" @click="next" :disabled="currentIndex === 6" >Next</button>
          
        </div>
    </div>

    
</template>

<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import axios from 'axios'

    export default {
        name: "ClientPostJobView",
        components: { JobDetailCard },
        data(){
            return{
                currentIndex: 1,
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
                        remote: 'true',
                        state: 'Select State',
                        city: '',
                        address: '',
                    },
                    budget: '',
                    budget_type: 'fixed-price',
                    description: '',
                },
            
                states: ['Select State',
                    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
                    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
                    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
                    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
                    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
                ],
                // tags for job skills...
                tags: [],
                inputValue: '',
                form_errors: '',
                added_skills: [],
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
                input.innerHTML += `<span class='p-3 rounded-xl bg-light_blue'>${tag}</span>`
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

            // post job..
            async submitJob(){
                const headers = {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
                }
                try{
                    const response = await axios.post(`${this.api_url}/jobs`, this.job_post, { headers })
                    console.log(response);
                }catch(error){
                    // handle error..
                    this.form_errors = error;
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
</style>