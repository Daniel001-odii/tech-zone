<template>



    <!--NAVBAR -->
    <HomeNavbar/>
    <!-- NAVBAR ENDS HERE -->




    <div class="pt-20 w-full text-black bg-white">
        <div class="flex flex-col justify-center items-center max-w-screen-2xl mt-10" style="margin: 0 auto;">
        
            <section class="flex flex-col">
                <div data-aos="zoom-in" class="section_container">
                    <div class="flex flex-col text-center md:text-left justify-center items-center md:items-start gap-6 md:w-[50%]">
                        <div class="text-sm bg-tz_light_blue p-2 text-center text-tz_blue rounded-md w-fit">
                            <i class="bi bi-hand-thumbs-up-fill"></i> <span>Best Job Solution Platform</span>
                        </div>
                        <div class=" text-6xl font-medium leading-[85px] ">
                            Find Your <span class="relative"> dream <StrikeLineSvg class="absolute top-[55px] left-0 right-0 li"/></span> Job.<br/> Hire the right talents.
                        </div>
                        <div class=" text-[16px]">
                            At Apex Technologies, we serve as a comprehensive marketplace, <br/>
                            facilitating seamless connections between companies seeking tech expertise and skilled professionals
                             looking for temporary contract opportunities. Through our platform, companies can find the right talent for their projects,
                             whether they're large corporations embarking on ambitious ventures or small businesses in need of specialized skills. 
                        </div>
                        <GetStartedNow/>
                    </div>
                  
                    <div class="w-full md:w-[50%] relative flex justify-center items-center">
                        <div class="floating bg-white hidden md:flex p-5 w-52 absolute top-6 -left-[60px] z-10 rounded-xl shadow-lg items-center gap-3">
                            <div>
                                <i class="bi bi-check text-2xl bg-green-100 p-3 rounded-lg text-green-500"></i>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-2xl"><b>1K+</b></span>
                                <span class="text-sm">Talents Hired</span>
                            </div>
                        </div>
                        <div class="floating bg-white hidden md:flex p-5 w-52 absolute bottom-5 -right-10 z-10 rounded-xl shadow-lg items-center gap-3">
                            <div>
                                <i class="bi bi-briefcase text-2xl bg-tz_light_blue p-3 rounded-lg text-blue-500"></i>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-2xl"><b>3K+</b></span>
                                <span class="text-sm">Jobs Available</span>
                            </div>
                        </div>
                        <img data-aos="zoom-in" src="../assets/images/hero-image.jpg" class=" rounded-[40px] w-[600px]">
                    </div>
                    <!-- <img data-aos="zoom-in" src="../assets/images/Group 303.png" class="section_img"> -->
                    
                </div>

                <div class="w-[90%] h-28  bg-white shadow-lg flex flex-row p-10 rounded-lg justify-center items-center gap-3">
                    <div class="flex flex-row items-center gap-3 w-[50%] border-b">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Search Jobs here" class="border-none w-full">
                    </div>
                    <div class="border-l h-full"></div>
                    <div class="flex flex-row items-center gap-3 w-[50%] border-b">
                        <i class="bi bi-geo-alt-fill"></i>
                        <input type="text" placeholder="Search Jobs here" class="border-none w-full">
                    </div>
                    <button class="btn">Search</button>
                </div>
                
            </section>

            <!-- STEPS FOR USERS -->
            <section  class=" bg-[#EDEFF3]">
                <div data-aos="fade-up" class="flex flex-col text-center py-6">
                    <div class="text-center flex flex-col-reverse">
                        <span class="font-medium text-[16px] capitalize">We are here to help you, Just follow these steps</span>
                        <h1 class="font-bol text-[30px] font-medium">Looking for your next paid job?</h1>
                    </div>
                    <div class="flex flex-col md:flex-row justify-center items-center mt-8 ">
                        <!-- <div class="flex flex-row"> -->
                            <StepBox :number="1">
                                <template #icon>
                                    <i class="bi bi-file-earmark-person"></i>
                                </template>
                            </StepBox>
                            <StepBox :number="2">
                                <template #icon>
                                    <i class="bi bi-person-check"></i>
                                </template>
                                <template #title>Complete User Profile</template>
                                <template #content></template>
                            </StepBox>
                            <StepBox :number="3">
                                <template #icon>
                                    <i class="bi bi-search"></i>
                                </template>
                                <template #title>
                                    Search Your Job Type
                                </template>
                            </StepBox>
                            <StepBox :number="4">
                                <template #icon>
                                    <i class="bi bi-clipboard-check"></i>
                                </template>
                                <template #title>
                                    Search Your Job Type
                                </template>
                            </StepBox>
                        <!-- </div> -->
                    </div>
                </div>
                
            </section>


            <!-- STEPS FOR EMPLOYERS -->
            <section class=" bg-[#EDEFF3] border-t-2 border-dashed border-blue-700">
                <div data-aos="fade-up" class="flex flex-col text-center py-6">
                    <div class="text-center flex flex-col-reverse">
                        <span class="font-medium text-[16px] capitalize">We are here to help you, Just follow these steps</span>
                        <h1 class="font-bol text-[30px] font-medium">Looking for seasoned professionals for your next project?</h1>
                    </div>
                    <div class="flex flex-col md:flex-row justify-center items-center mt-8 ">
                        <!-- <div class="flex flex-row"> -->
                            <StepBox :number="1">
                                <template #icon>
                                    <i class="bi bi-file-earmark-person"></i>
                                </template>
                            </StepBox>
                            <StepBox :number="2">
                                <template #icon>
                                    <i class="bi bi-person-check"></i>
                                </template>
                                <template #title>Complete User Profile</template>
                                <template #content></template>
                            </StepBox>
                            <StepBox :number="3">
                                <template #icon>
                                    <i class="bi bi-search"></i>
                                </template>
                                <template #title>
                                   Post Job
                                </template>
                            </StepBox>
                            <StepBox :number="4">
                                <template #icon>
                                    <i class="bi bi-clipboard-check"></i>
                                </template>
                                <template #title>
                                    Hire Talent
                                </template>
                            </StepBox>
                        <!-- </div> -->
                    </div>
                </div>
                
            </section>



            <section>
                <div class="flex flex-col justify-center md:flex-row-reverse items-center p-5">
                    <img data-aos="fade-up" src="../assets/images/Group 285.png" alt="lady-image" class="section_img w-96">
                    <div data-aos="fade-up" class="md:w-fit text-left gap-8 flex flex-col" >
                        <h1 class="text-[30px]">Unlock your next career move!<br/> <span class=" text-[#AF8669] font-bold">Upload your CV</span>  to stand out to recruiters and impact your job search.</h1>
                        <button class="btn">Upload CV Now</button>
                    </div>
                </div>
            </section>

            <section class=" bg-[#EDEFF3]">
                <div data-aos="zoom-in-up" class="flex flex-col">
                    <!-- <div data-aos="zoom-out"> -->
                    <div class="text-center">
                        <span class="font-medium text-[16px] capitalize">Jobs By Category</span>
                        <h1 class="font-bol text-[30px] font-medium">Explore Our Divers Job Categories</h1>
                    </div>
                
                    <div class="flex flex-row gap-8 justify-center flex-wrap mt-10 bg-white rounded-lg p-5">
                        <JobCat :jobs_avaialble="900" >
                        </JobCat>
                        <JobCat :jobs_avaialble="400">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                        <JobCat :jobs_avaialble="400">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                        <JobCat :jobs_avaialble="90">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                        <JobCat :jobs_avaialble="900"></JobCat>
                        <JobCat :jobs_avaialble="400">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                        <JobCat :jobs_avaialble="400">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                        <JobCat :jobs_avaialble="90">
                            <template #icon></template>
                            <template #title></template>
                        </JobCat>
                    </div>
                </div>
            </section>

            <section class=" bg-white">
                    <div data-aos="zoom-in-up" class="text-left flex flex-col gap-5  w-full">
                        <div class="flex flex-col justify-around">
                            <span class="text-[16px] capitalize">FEATURED JOBS</span>
                            <div class="flex flex-col gap-4 md:flex-row items-start justify-between">
                                <h2 class="section_subtitle">Get access to high in-demand jobs<br/> in realtime</h2>
                                <RouterLink to="/jobs">
                                    <button class="btn bg-white text-tz_blue hover:text-white flex flex-row gap-1">
                                        Browse All jobs <i class="bi bi-arrow-right"></i> 
                                    </button>
                                </RouterLink>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center md:flex-row relative gap-3border border-red-200">
                            <button @click="prevJob" class=" bg-tz_blue text-white p-3 rounded-lg absolute -left-5 border border-tz_blue disabled:text-tz_blue">
                                <i class="bi bi-arrow-left"></i>
                            </button>


                           <!-- {{  job  }} -->
                           <span v-if="loading_jobs">loading...</span>


                                <LpJobCard v-if="jobs"  :key="index"
                                :company = "jobs[job_index].employer.profile.company_name"
                                :job_time = "formatTimestamp(jobs[job_index].created)"
                                :job_title = "jobs[job_index].title"
                                :job_location = "jobs[job_index].location"
                                :job_duration = "jobs[job_index].period"
                                :job_description = "jobs[job_index].description"
                                :job_url = "'/'"
                                :budget = "jobs[job_index].budget"
                                />


                            <button @click="nextJob" class="bg-tz_blue text-white p-3 rounded-lg absolute -right-5 disabled:bg-white border border-tz_blue">
                                <i class="bi bi-arrow-right"></i>
                            </button>

                            <!-- <LpJobCard v-for="(job, index) in jobPostings" :key="index"
                            :company = "job.company"
                            :job_time = "job.job_time"
                            :job_title = "job.job_title"
                            :job_location = "job.job_location"
                            :job_duration = "job.job_duration"
                            :job_description = "job.job_description"
                            :job_url = "'/'"
                            :budget = "job.budget"
                            /> -->
                        </div>
<!-- 
                        <div class="flex flex-row justify-center gap-3 p-5">
                            <button class="slide_btn">
                                <i class="bi bi-arrow-left"></i>
                            </button>
                            <button class="slide_btn sb_active">
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div> -->
                    </div>
            </section>

            <section class=" bg-[#EDEFF3]">
                <div class="flex flex-col">
                    <!-- <div data-aos="zoom-out"> -->
                    <div class="text-center">
                        <span class="font-medium text-[16px] capitalize">Revolutionize Collaboration, <br/> Connecting Companies and Tech Pros Seamlessly</span>
                        <h1 class="font-bol text-[30px] font-medium">What we offer you</h1>
                    </div>
                
                    <div class="flex flex-row gap-8 justify-center items-start flex-wrap mt-10 rounded-lg p-5">
                       <div data-aos="flip-left"  class=" flex flex-col justify-center text-center items-center max-w-[300px]">
                        <img src="../assets/images/sss1.svg">
                        <p class="font-bold text-[30px]">Tech Connections Redefined</p>
                        <span>Dynamic online platform that serves as a bridge between large and small scale companies and tech professionals</span>
                       </div>

                       <div data-aos="flip-left" data-aos-delay="100" class=" flex flex-col justify-center text-center items-center max-w-[350px]">
                        <img src="../assets/images/ss2.svg">
                        <p class="font-bold text-[30px]">Streamlined Contract Networking</p>
                        <span>Our innovative approach allows tech companies easily connect with skilled tech professionals on a contract basis</span>
                       </div>

                       <div data-aos="flip-left" data-aos-delay="200" class=" flex flex-col justify-center text-center items-center max-w-[350px]">
                        <img src="../assets/images/ss3.svg">
                        <p class="font-bold text-[30px]">Dynamic Partnership Platform</p>
                        <span>We provide flexibility for both parties to collaborate. From Quick Projects to Extended Engagements, Flexibility Reigns</span>
                       </div>

                       <div data-aos="flip-left" data-aos-delay="300" class=" flex flex-col justify-center text-center items-center max-w-[350px]">
                        <img src="../assets/images/ss4.svg">
                        <p class="font-bold text-[30px]">Secure Alliances</p>
                        <span>Establishing Trustworthy Interactions. Ensuring Secure Communication Between Employers and Technical Professionals on the Platform</span>
                       </div>

                       
                       <div data-aos="flip-left" data-aos-delay="400" class=" flex flex-col justify-center text-center items-center max-w-[350px]">
                        <img src="../assets/images/ss5.svg">
                        <p class="font-bold text-[30px]">Secure Alliances</p>
                        <span>Establishing Trustworthy Interactions. Ensuring Secure Communication Between Employers and Technical Professionals on the Platform</span>
                       </div>

                       




                    </div>

                </div>
            </section>

            <section>
                <div class=" flex items-center flex-col md:flex-row-reverse">
                    <div data-aos="fade-up" class="md:w-fit text-left gap-8 flex flex-col">
                        <h2 class="section_subtitle">Join us today!</h2>
                        <p>Whether you are a company looking to expand your tech team or an IT professional seeking your next challenge, ApexTeks invites you to join our growing community and be part of the future of tech employment in Nigeria. Together, we can unlock the full potential of Nigeria’s tech industry and pave the way for a brighter, more prosperous future </p>
                        <GetStartedNow/>
                    </div>
                    <img data-aos="fade-up" src="../assets/images/foot_illustration.png" alt="lady image" class="section_img w-96">
                </div>
            </section>
        
    
        </div>


    <Footer/>
    </div>
    <!-- <Navbar :type="'wesbite'"/> -->

</template>
<script>
import GetStartedNow from '@/components/GetStartedNow.vue';
import JobCat from '@/components/JobCat.vue';
import Navbar from '@/components/Navbar.vue';
import StatsBox from '@/components/StatsBox.vue';
import StepBox from '@/components/StepBox.vue';
import StrikeLineSvg from '@/components/StrikeLineSvg.vue'
import Footer from '@/components/Footer.vue'
import SiteLogo from '@/components/SiteLogo.vue';
// animate onscroll library
import AOS from 'aos'
import 'aos/dist/aos.css'
import LpJobCard from '@/components/LpJobCard.vue';
import HomeNavbar from '@/components/HomeNavbar.vue';

import { formatTimestamp } from '@/utils/dateFormat';

import axios from 'axios';

export default {
    name: "LandingPage",
    components: { Navbar, StatsBox, StepBox, JobCat, StrikeLineSvg, GetStartedNow, Footer, LpJobCard, SiteLogo, HomeNavbar },
    data(){
        return{
            jobs:'',
            alert_banner: true,
            mobile_menu: false,

            job_index: 1,
            loading_jobs: false,
            formatTimestamp,
        }
    },

    methods:{
        prevJob(){
            if(this.job_index > 0){
                this.job_index -= 1;
            }
        },

        nextJob(){
            if(this.job_index < this.jobs.length - 1){
                this.job_index += 1;
            }
        },
        
        async getAllJobs(){
            try{
                this.loading_jobs = true;
                const response = await axios.get(`${this.api_url}/jobs`);
                this.jobs = response.data.jobs;
                console.log("fetched jobs: ", this.jobs);
                this.loading_jobs = false;
            }catch(error){
                console.log("error getting jobs: ", error);
                this.loading_jobs = false;
            }
        }
    },

    mounted() {
    AOS.init();

    this.getAllJobs();
  },
}
</script>
<style scoped>
    /* @font-face {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    src: url('../assets/fonts/Inconsolata-VariableFont_wdth\,wght.ttf');
    } */

    *{
        font-family: "Poppins", sans-serif;
    }

    .nav_btn{
        @apply px-5 py-2 font-medium;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-tz_light_blue font-medium hover:font-medium;
    }

    .text-sm{
        font-size: 12px !important;
    }
    .btn{
        @apply bg-tz_blue hover:bg-tz_dark_blue text-white py-3 px-5 rounded-md font-medium w-52 border border-transparent
    }
    .slide_btn{
        @apply border border-tz_blue p-3 rounded-md text-tz_blue font-medium text-xl hover:bg-tz_blue hover:text-black;
    }

    .sb_active{
        @apply bg-tz_blue text-white
    }

    .section_container{
        @apply flex flex-col-reverse md:flex-row justify-center items-center gap-10 w-full
    }

    .section_img{
        @apply md:w-[55%]
    }

    .section_subtitle{
        @apply text-[30px] font-medium
    }

    section{
        @apply flex justify-center items-center mx-0 my-auto p-8 w-full
    }


    .floating {  
        animation-name: floating;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        margin-left: 30px;
        margin-top: 5px;
    }
    
    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }    
    }
</style>