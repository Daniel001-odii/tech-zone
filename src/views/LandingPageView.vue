<template>



    <!--NAVBAR -->
    <HomeNavbar/>
    <!-- NAVBAR ENDS HERE -->




    <div class="pt-20 w-full text-black bg-white">
        <div class="flex flex-col justify-center items-center mt-10" style="margin: 0 auto;">
        
            <section class="flex flex-col">
                <div data-aos="zoom-in" class="section_container container">
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
                        <!-- <img data-aos="zoom-in" src="../assets/images/hero-image.jpg" class=" rounded-[40px] w-[600px]"> -->
                        <img data-aos="zoom-in" src="../assets/images/waitList_hero.png" class=" rounded-[40px] w-[600px]">
                    </div>
                    <!-- <img data-aos="zoom-in" src="../assets/images/Group 303.png" class="section_img"> -->
                    
                </div>

                <div class="h-28 container  bg-white shadow-lg flex flex-row p-10 rounded-lg justify-center items-center gap-3">
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
                                <template #title></template>
                                <template #content>
                                    Register on our platform to access its features and benefits, opening doors to a world of opportunities and possibilities.
                                </template>
                            </StepBox>
                            <StepBox :number="2">
                                <template #icon>
                                    <i class="bi bi-person-check"></i>
                                </template>
                                <template #title>Complete User Profile</template>
                                <template #content>
                                    Complete your Know Your Customer (KYC) process to verify your identity and unlock access to our platform's full functionality.
                                </template>
                            </StepBox>
                            <StepBox :number="3">
                                <template #icon>
                                    <i class="bi bi-search"></i>
                                </template>
                                <template #title>
                                    Search Your Job Type
                                </template>
                                <template #content>
                                    Explore job listings matching your preferences and qualifications by utilizing our search functionality to find your desired position.
                                </template>
                            </StepBox>
                            <StepBox :number="4">
                                <template #icon>
                                    <i class="bi bi-clipboard-check"></i>
                                </template>
                                <template #title>
                                    Apply For Dream Job
                                </template>
                                <template #content>
                                    Apply for your dream job by submitting your application through our platform, taking a step closer to achieving your career aspirations.
                                </template>
                            </StepBox>
                        <!-- </div> -->
                    </div>
                </div>
                
            </section>


            <!-- STEPS FOR EMPLOYERS -->
            <section class="">
                <div data-aos="fade-up" class="flex flex-col text-center py-6">
                    <div class="text-center flex flex-col-reverse">
                        <span class="font-medium text-[16px] capitalize">We are here to help you, Just follow these steps</span>
                        <h1 class="font-bol text-[30px] font-medium">Looking for Temporary Tech Professionals for your next project?</h1>
                    </div>
                    <div class="flex flex-col md:flex-row justify-center items-center mt-8 ">
                        <!-- <div class="flex flex-row"> -->
                            <StepBox :number="1">
                                <template #icon>
                                    <i class="bi bi-file-earmark-person"></i>
                                </template>
                                <template #content>
                                    Register on our platform to access its features and benefits, opening doors to a world of opportunities and possibilities.
                                </template>
                            </StepBox>
                            <StepBox :number="2">
                                <template #icon>
                                    <i class="bi bi-person-check"></i>
                                </template>
                                <template #title>Complete User Profile</template>
                                <template #content>
                                    Complete your Know Your Customer (KYC) process to verify your identity and unlock access to our platform's full functionality.
                                </template>
                            </StepBox>
                            <StepBox :number="3">
                                <template #icon>
                                    <i class="bi bi-search"></i>
                                </template>
                                <template #title>
                                   Post Job
                                </template>
                                <template #content>
                                    Post the temporary job vacancy within our company, encouraging eligible candidates to apply and join your team for the specified duration.
                                </template>
                            </StepBox>
                            <StepBox :number="4">
                                <template #icon>
                                    <i class="bi bi-clipboard-check"></i>
                                </template>
                                <template #title>
                                    Hire Talent
                                </template>
                                <template #content>
                                    Recruit top talents for your company's open positions, ApexTeks ensures that you get the most qualified individuals to join your team for the specified duration.
                                </template>
                            </StepBox>
                        <!-- </div> -->
                    </div>
                </div>
                
            </section>


            <section class=" bg-[#EDEFF3]">
                <div data-aos="zoom-in-up" class="flex flex-col container">
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
                    <div data-aos="zoom-in-up" class="text-left flex flex-col gap-5  w-full container">
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
                            <button @click="prev" class="absolute z-50 -left-5 top-1/2 transform -translate-y-1/2 bg-tz_blue text-white p-2 rounded-md">
                                <i class="bi bi-arrow-left"></i>
                            </button>
                            <div class="testimonial-slider relative overflow-x-hidden w-full ">
                                <div class="flex flex-row gap-3 transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }">
                                    <div v-for="(job, index) in jobs" :key="index" class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 flex items-center justify-center">
                                        <LpJobCard class="w-full" v-if="jobs"  :key="index"
                                        :company = "job.employer.profile.company_name"
                                        :job_time = "formatTimestamp(job.created)"
                                        :job_title = "job.title"
                                        :job_location = "job.location"
                                        :job_duration = "job.period"
                                        :job_description = "job.description"
                                        :job_url = "'/'"
                                        :budget = "job.budget"
                                        >
                                       <div class="flex flex-col gap-3">
                                            <span>
                                                <i class="bi bi-geo-alt-fill mr-1"></i> 
                                                <span v-if="job.location.remote"> remote</span>
                                                <span v-else> {{ job.location.address }}, {{  job.location.state }}</span>
                                            </span>
                                            <span>
                                                <i class="bi bi-clock mr-1"></i> <span>{{job.period}}</span>
                                            </span>
                                       </div>
                                        
                                    </LpJobCard>
                                    </div>
                                </div>
                            </div>
                            <button @click="next" class="absolute z-50 -right-5 top-1/2 transform -translate-y-1/2 bg-tz_blue text-white p-2 rounded-md">
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
            </section>
            
            <section>
                <div class="container flex flex-col justify-center md:flex-row items-center p-5 gap-5">
                    <img data-aos="fade-up" src="../assets/images/pexels-shkrabaanthony-5816293.png" alt="section-image" class="section_img w-96">
                    <div data-aos="fade-up" class="md:w-fit text-left gap-8 flex flex-col" >
                        <h2 class="section_subtitle">Precision matching for tech professionals and companies</h2>
                        <div>We deliver personalized matchmaking services through a blend of advanced algorithms and human expertise, we ensure optimal matches between companies and tech professionals. By evaluating skills, experience, cultural fit and project requirements, we enhance he quality of connections and foster mutually beneficial collaborations.</div>
                    </div>
                </div>
            </section>


            <section>
                <div class="container flex flex-col justify-center md:flex-row-reverse items-center p-5 gap-5">
                    <img data-aos="fade-up" src="../assets/images/team-3639693_1280 1.png" alt="section-image" class="section_img w-96">
                    <div data-aos="fade-up" class="md:w-fit text-left gap-8 flex flex-col" >
                        <h2 class="section_subtitle">What Sets Us Apart?</h2>
                        <div>Our unwavering commitment to quality networking distinguishes us. We understand that successful partnerships are built on trust, reliability and compatibility. That is why we prioritize the human element in our matchmaking process, going beyond mere skill matching to consider the nuanced dynamics of company culture and project objectives. </div>
                    </div>
                </div>
            </section>


            <section>
                <div class="container flex flex-col justify-center md:flex-row items-center p-5 gap-5">
                    <img data-aos="fade-up" src="../assets/images/Group 285.png" alt="lady-image" class="section_img w-96">
                    <div data-aos="fade-up" class="md:w-fit text-left flex flex-col" >
                        <h1 class="section_subtitle">Unlock your next career move!</h1>
                        <div class="flex flex-col">
                            <span>
                                <span class=" text-[#AF8669] font-bold">Upload your CV</span>  
                            to stand out to recruiters and impact your job search.
                            </span>
                            <RouterLink to="/login">
                                 <button class="btn mt-3">Upload CV Now</button>
                            </RouterLink>
                           
                        </div>
                        
                    </div>
                </div>
            </section>

          

          

            <section class=" bg-[#EDEFF3]">
                <div class="flex flex-col container">
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
                        <p class="font-bold text-[30px]">Seamless and Reliable User Experience</p>
                        <span>Experience unparalleled ease and reliability as you seamlessly connect with top-tier professionals and employers on our platform.</span>
                       </div>

                       




                    </div>

                </div>
            </section>

            <section>
                <div class=" flex items-center flex-col md:flex-row-reverse container gap-5">
                    <div data-aos="fade-up" class="md:w-fit text-left gap-8 flex flex-col">
                        <h2 class="section_subtitle">Join us today!</h2>
                        <p>Whether you are a company looking to expand your tech team or an IT professional seeking your next challenge, ApexTeks invites you to join our growing community and be part of the future of tech employment in Nigeria. Together, we can unlock the full potential of Nigeria’s tech industry and pave the way for a brighter, more prosperous future </p>
                        <GetStartedNow/>
                    </div>
                    <img data-aos="fade-up" src="../assets/images/foot_illustration.png" alt="lady image" class="section_img w-96">
                </div>
            </section>

            <section>
                <div class=" flex items-center justify-center flex-col container gap-5">
                    <h2 class="section_subtitle">Frequently Asked Questions</h2>
                    <div class="w-full mt-5">
                        <div v-for="(question, question_id) in generalFAQs" :key="question_id">
                            <div class="flex flex-row justify-between mt-3">
                                <h4 class="font-bold text-lg max-w-90%">{{ question.text }}</h4>
                                <button @click="show_answer(question_id)" class="">
                                    <i v-if="answer_active[question_id]" class="bi bi-dash"></i>
                                    <i v-else class="bi bi-plus"></i>
                                </button>
                            </div>
                        
                            <p v-if="answer_active[question_id]" class="w-[90%]">{{ question.answer }}</p>
                        </div>
                    </div>
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

            currentIndex: 0,
            testimonials: [
            { message: "This is a fantastic product!", author: "John Doe" },
            { message: "I loved the service!", author: "Jane Smith" },
            { message: "Highly recommend to everyone.", author: "Bob Johnson" },
            { message: "Exceptional quality and support!", author: "Alice Brown" },
            { message: "Five stars for sure!", author: "Chris Wilson" }
            ],
            generalFAQs: [
                    { text: "Is there a free trial available?",
                    answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible." },

                    { text: "How do I find jobs on the platform?", 
                    answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},

                    {
                        text: "How can I upload my CV to the platform?",
                        answer: "Simply go to your profile page and click on the <Resume> button. You'll find option to upload and view your CV "
                    },

                    {
                        text: "How can I apply for a job listing ",
                        answer: "To apply for a job listing as a Talent on the platform, follow these steps: 1. Log in to your account and navigate to the Work Explorer page. 2. Browse through the active job listings to find a job that interests you. 3. Click on the job listing to view more details. 4. Use the <apply> here button provided on the job listing page to start and complete the application process. "
                    },

                    {
                        text: "How can I save job listings for later ",
                        answer: "To save job listings for later viewing: 1. Go to the Work Explorer page on the platform. 2. Look for the job listing you want to save. 3. Next to the job listing, you'll see a save icon. Click on this icon to save the job for later. 4. If you wish to remove a job from your saved list, click on the save icon again to deselect it and remove it from your saved list. "
                    },

                    {
                        text: "How do I post a job listing as an employer ",
                        answer: "To post a job listing as an employer, follow these steps: 1. Go to the Employers Console on the platform. 2. Click on the <Post Job> link located in the navigation bar. This action will direct you to the Post Job page. 3. Follow the provided instructions and steps on the Post Job page to successfully create and post your job listing. "
                    },

                    {
                        text: "Are there any fees associated with employers posting jobs? ",
                        answer: "No, there are no charges for posting jobs on ApexTeks. The platform is free for both employers and talents. However, there is a 15% charge applied to every completed work order."
                    },
                    {
                        text: "Does Apex-Teks have any undisclosed fees or charges? ",
                        answer: "ApexTeks operates with transparency, and all potential fees are explicitly outlined. Double confirmation is necessary for crucial actions related to payments to prevent inadvertent actions. "
                    },
                    {
                        text: "What is the billing process? ",
                        answer: "Billing is mainly directed at employers, who are charged the full job listing fee upon a successful job posting. This is facilitated through an escrow payment system. In case a job is canceled 24 hours before its scheduled start, the entire payment is refunded. However, if the work order is canceled within 24 hours of starting, 20 percent of the total payment made will be deducted. Employers are required to provide a valid debit card for payments, and they can manage payment options in the billing information page. All relevant information regarding billing actions is provided for transparency and clarity. "
                    },

            ],
            answer_active: [],
            visibleCount: 3,
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

        show_answer(index){
                this.answer_active[index] = !this.answer_active[index];
                
            },
        
        async getAllJobs(){
            try{
                this.loading_jobs = true;
                const response = await axios.get(`${this.api_url}/jobs`);
                this.jobs = response.data.jobs.splice(0, 5);
                console.log("fetched jobs: ", this.jobs);
                this.loading_jobs = false;
            }catch(error){
                console.log("error getting jobs: ", error);
                this.loading_jobs = false;
            }
        },

        prev() {
            const maxIndex = this.jobs.length - this.visibleCount;
            this.currentIndex = (this.currentIndex === 0) ? maxIndex : this.currentIndex - 1;
        },
        next() {
            const maxIndex = this.jobs.length - this.visibleCount;
            this.currentIndex = (this.currentIndex === maxIndex) ? 0 : this.currentIndex + 1;
        },
        updateVisibleCount() {
            this.visibleCount = this.responsiveVisibleCount;
        }
    },

    computed: {
      responsiveVisibleCount() {
        if (window.innerWidth >= 1024) {
          return 3;
        } else if (window.innerWidth >= 768) {
          return 1;
        } else {
          return 1;
        }
      }
    },

    created() {
        AOS.init();

        this.getAllJobs();

        this.updateVisibleCount();
        window.addEventListener('resize', this.updateVisibleCount);

        // setInterval(function(){
        //     this.currentIndex += 1;
        // }, 2000);
    },

  beforeDestroy() {
      window.removeEventListener('resize', this.updateVisibleCount);
    }
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
        @apply md:w-[55%] relative rounded-3xl hover:-top-3
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