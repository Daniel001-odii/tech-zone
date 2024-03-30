<template>
    <nav class="bg-white start-0 relative z-30 dark:bg-[#1F2A36]">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <SiteLogo/>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div class="flex justify-self-end md:flex gap-3 md:m-0">
                <RouterLink to="/login">
                    <button class="nav_btn rounded-md w-fit text-tz_blue hover:text-tz_blue hover:bg-tz_light_blue">Login</button>
                </RouterLink>
                <RouterLink to="/register/decide">
                    <button class="nav_btn rounded-md bg-tz_blue hover:bg-tz_dark_blue text-white">Sign Up</button>
                </RouterLink>
            </div>
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>

        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                    <RouterLink to="/" class="block py-2 px-3 text-gray-900 bg-tz_blue-700 rounded md:bg-transparent md:text-tz_blue-700 md:p-0 md:dark:text-tz_blue-500 dark:text-white">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/jobs" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-tz_blue-700 md:p-0 md:dark:hover:text-tz_blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find Job</RouterLink>
                </li>
                <li>
                    <RouterLink to="/register/decide" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-tz_blue-700 md:p-0 md:dark:hover:text-tz_blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Post Job</RouterLink>
                </li>
            </ul>
        </div>

        </div>
    </nav>

    <div class=" w-full dark:bg-[#27323F] dark:text-white">
        <div class="flex flex-col justify-center items-center max-w-screen-2xl " style="margin: 0 auto;">
        <div class="py-4 mt-12 md:px-4 flex justify-center items-center flex-col">
        <section>
            <div class="section_container">
                <div class="flex flex-col text-center md:text-left justify-center items-center md:items-start gap-6">
                    <div class="text-sm bg-tz_light_blue p-2 text-center text-tz_blue rounded-md w-fit">
                        <i class="bi bi-hand-thumbs-up-fill"></i> <span>Best Job Solution Platform</span>
                    </div>
                    <div class=" text-7xl font-bold">
                        Find Your <span class="relative"> dream <StrikeLineSvg class="absolute top-12 right-3 li"/></span> Job.<br/> Hire the right talents.
                    </div>
                    <div class=" text-xl">
                        At Apex Technologies, we serve as a comprehensive marketplace, facilitating seamless connections between companies seeking tech expertise and skilled professionals looking for temporary contract opportunities. Through our platform, companies can find the right talent for their projects, whether they're large corporations embarking on ambitious ventures or small businesses in need of specialized skills. 
                    </div>
                    <GetStartedNow/>
                </div>
                <img src="../assets/images/Group 284.png" class="section_img w-96">
            </div>
            
        </section>

        <section style="background-image: linear-gradient(#1B2E40, #4e79bc );">
            <div class="flex flex-col">
                <div>
                <!-- <div data-aos="zoom-out"> -->
                    <span class="text-2xl text-white">How it works</span>
                    <h3 class="section_subtitle text-white">We are here to help you,<br/> just follow these steps!</h3>
                </div>
                <div class="flex flex-col flex-wrap justify-center items-center md:flex-row mt-8">
                    <StepBox :number="1"></StepBox>
                    <StepBox :number="2">
                        <template #title>Complete User Profile</template>
                        <template #content></template>
                    </StepBox>
                    <StepBox :number="3">
                        <template #title>
                            Search Your Job Type
                        </template>
                    </StepBox>
                    <StepBox :number="4">
                        <template #title>
                            Search Your Job Type
                        </template>
                    </StepBox>
                </div>
            </div>
            
        </section>

        <section>
            <div class="section_container" data-aos="zoom-in">
                <img src="../assets/images/Group 285.png" alt="lady-image" class="section_img w-96">
                <div class="md:w-fit text-left gap-8 flex flex-col">
                    <h1 class="section_subtitle">Unlock your next career move! <br/> Upload your CV to stand out to recruiters and impact your job search.</h1>
                    <button class="btn">Upload CV Now</button>
                </div>
            </div>
        </section>

        <section>
            <div class="flex flex-col">
                <!-- <div data-aos="zoom-out"> -->
                <div>
                    <span class="font-bold uppercase text-xl ">Jobs By Category</span>
                    <h1 class="font-bol text-5xl font-bold">Explore Our Divers Job Categories</h1>
                </div>
               
                <div class="flex flex-row gap-8 justify-center flex-wrap mt-10">
                    <JobCat :jobs_avaialble="900" data-aos="fade-up" data-aos-delay="200"></JobCat>
                    <JobCat :jobs_avaialble="400" data-aos="fade-up" data-aos-delay="300">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                    <JobCat :jobs_avaialble="400" data-aos="fade-up" data-aos-delay="400">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                    <JobCat :jobs_avaialble="90" data-aos="fade-up" data-aos-delay="500">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                    <!-- <br/> -->
                    <JobCat :jobs_avaialble="900" data-aos="fade-up" data-aos-delay="600"></JobCat>
                    <JobCat :jobs_avaialble="400" data-aos="fade-up" data-aos-delay="700">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                    <JobCat :jobs_avaialble="400" data-aos="fade-up" data-aos-delay="800">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                    <JobCat :jobs_avaialble="90" data-aos="fade-up" data-aos-delay="900">
                        <template #icon></template>
                        <template #title></template>
                    </JobCat>
                </div>
            </div>
        </section>

        <section style="background-image: linear-gradient(#1B2E40, #4e79bc );">
                <div class="text-left flex flex-col gap-5">
                    <div class="flex flex-col justify-around">
                        <span class="text-2xl text-white">FEATURED JOBS</span>
                        <div class="flex flex-col gap-4 md:flex-row items-start justify-between">
                            <h2 class="section_subtitle text-white">Get access to high in-demand jobs in realtime</h2>
                            <RouterLink to="/jobs">
                                <button class="btn bg-white text-tz_blue hover:text-white flex flex-row gap-1">
                                    Browse All jobs <i class="bi bi-arrow-right"></i> 
                                </button>
                            </RouterLink>
                        </div>
                    </div>

                    <div class="flex flex-col flex-wrap justify-center items-center md:flex-row gap-3">
                        <LpJobCard v-for="(job, index) in jobPostings" :key="index"
                        :company = "job.company"
                        :job_time = "job.job_time"
                        :Job_title = "job.job_title"
                        :job_location = "job.job_location"
                        :job_duration = "job.job_duration"
                        :job_description = "job.job_description"
                        :job_url = "'/'"
                        :budget = "job.budget"
                        />
                    </div>

                    <div class="flex flex-row justify-center gap-3 p-5">
                        <button class="slide_btn">
                            <i class="bi bi-arrow-left"></i>
                        </button>
                        <button class="slide_btn sb_active">
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
        </section>

        <section>
            <div class="section_container">
                <div class="md:w-fit text-left gap-8 flex flex-col" data-aos="fade-in">
                    <h2 class="section_subtitle">Take the next step in your professional career.<br/>Sign-in to unlock limitless opportunities.</h2>
                    <GetStartedNow/>
                </div>
                <img src="../assets/images/Group 281.png" alt="lady image" class="section_img w-96">
            </div>
        </section>
    </div>
    <Footer/>
    </div>
    
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


export default {
    name: "LandingPage",
    components: { Navbar, StatsBox, StepBox, JobCat, StrikeLineSvg, GetStartedNow, Footer, LpJobCard, SiteLogo },
    data(){
        return{
            jobPostings: [
            {
                company: 'Tech Solutions Ltd',
                job_time: '2 days ago',
                job_title: 'Web Developer',
                job_location: 'Lagos, Lagos State',
                job_duration: '3 months',
                job_description: 'Exciting opportunity for a skilled web developer to join our team.',
                budget: 5000, // Replace with a random amount as needed
            },
            {
                company: 'Design Innovations',
                job_time: '1 month ago',
                job_title: 'Graphic Designer',
                job_location: 'Abuja, FCT',
                job_duration: '6 months',
                job_description: 'Looking for a creative graphic designer to work on exciting projects.',
                budget: 8000, // Replace with a random amount as needed
            },
            {
                company: 'Mobile Apps Co.',
                job_time: '15 days ago',
                job_title: 'Mobile App Developer',
                job_location: 'Port, Rivers State',
                job_duration: '4 months',
                job_description: 'Join our mobile app development team and contribute to cutting-edge projects.',
                budget: 6000, // Replace with a random amount as needed
            },
            {
                company: 'Data Analytics',
                job_time: '3 months ago',
                job_title: 'Data Analyst',
                job_location: 'Ibadan, Oyo State',
                job_duration: '2 months',
                job_description: 'Exciting opportunity for a data analyst to work on interesting data projects.',
                budget: 7000, // Replace with a random amount as needed
            },
                ],
        }
    },
  

    mounted() {
    AOS.init()
  },
}
</script>
<style scoped>
    @font-face {
    font-family: homeFont;
    src: url('../assets/fonts/Inconsolata-VariableFont_wdth\,wght.ttf');
    }

    *{
        font-family: homeFont;
    }

    .nav_btn{
        @apply px-5 py-2 font-bold;
    }

    .nav_link{
        @apply p-3 rounded-md hover:bg-tz_light_blue font-medium hover:font-bold;
    }

    .text-sm{
        font-size: 12px !important;
    }
    .btn{
        @apply bg-tz_blue hover:bg-tz_dark_blue text-white py-3 px-5 rounded-md font-bold w-52 border border-transparent
    }
    .slide_btn{
        @apply border border-yellow-400 p-3 rounded-md text-yellow-400 font-bold text-xl hover:bg-yellow-400 hover:text-black;
    }

    .sb_active{
        @apply bg-yellow-400 text-black
    }

    .section_container{
        @apply flex flex-col-reverse md:flex-row justify-center items-center gap-10 w-full
    }

    .section_img{
        @apply md:w-[45%]
    }

    .section_subtitle{
        @apply text-4xl font-bold
    }

    section{
        @apply flex justify-center items-center mx-0 my-auto p-8
    }
</style>