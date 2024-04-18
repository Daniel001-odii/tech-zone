<template>
    <HomeNavbar/>
    <div>
        <div class="flex flex-row justify-center items-center bg-[#EDEFF3] h-[300px]" >
            <div class="p-5 w-full text-center justify-center flex flex-col items-center">
                <p class="text-sm m-0 p-0">ABOUT US</p>
                <h1 class="font-bold text-2xl m-0 p-0">Our <span class=" text-tz_blue">vision</span> is to empower companies<br/> and IT Professionals <br/>through innovative networking </h1>
                <p class=" max-w-[500px] text-[12px] text-center">ApexTex is a platform where talent meets opportunities, propelling Nigeria’s IT industry to new heights of excellence and prosperity. It bridges the gap between companies and IT Professionals.</p>
            </div>
        </div>

        <div class=" flex flex-row  gap-5 p-8 flex-wrap justify-between items-start">
            <p class=" p-8 grow w-[50%]">
                Apextexs has revolutionised the job market for IT professionals in Nigeria. Our platform provides unlimited job access, connecting employers with a diverse pool of IT talent across different regions. With features like Task Watch, our job monitoring system, we ensure transparency and integrity throughout the hiring process, including rigorous vetting and verification of both jobs and candidates. Join us and experience seamless, legitimate, and efficient recruitment processes tailored to meet the needs of both employers and IT professionals.
ApexTex bridges the gap between companies and IT Professionals, facilitating meaningful connections that drive growth, innovation and success. ApexTex is a platform where talent meets opportunities, propelling Nigeria’s IT industry to new heights of excellence and prosperity. 
            </p>
            <img class="hidden md:inline-block" src="../assets/images/to_the_moon.png">
        </div>

        <div class="bg-[#EDEFF3] flex flex-col  gap-5 p-8 flex-wrap justify-center items-center">
            <h1 class="font-bold text-3xl text-center">Meet the team</h1>
            <div class="flex flex-row flex-wrap justify-center gap-6">
                <div class="flex flex-col justify-center items-center text-center gap-3">
                    <div class="rounded-full h-[150px] w-[150px] bg-red-300"></div>
                    <div>
                        <h3 class="font-bold">Bob Charles</h3>
                        <span class="text-sm">Ui/Ux Designer</span>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-center gap-3">
                    <div class="rounded-full h-[150px] w-[150px] bg-purple-300"></div>
                    <div>
                        <h3 class="font-bold">Dannie</h3>
                        <span class="text-sm">Ui/Ux Designer</span>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-center gap-3">
                    <div class="rounded-full h-[150px] w-[150px] bg-blue-300"></div>
                    <div>
                        <h3 class="font-bold">Anonymous</h3>
                        <span class="text-sm">Ui/Ux Designer</span>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-center gap-3">
                    <div class="rounded-full h-[150px] w-[150px] bg-green-300"></div>
                    <div>
                        <h3 class="font-bold">Anonymous</h3>
                        <span class="text-sm">Ui/Ux Designer</span>
                    </div>
                </div>
            </div>
        </div>



    </div>
 <Footer/>
</template>
<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'

export default {
    name: "AboutPageView",
    components: { 
        Alert,
        HomeNavbar, 
        Footer,
    },
}
</script>
<style scoped>
   h2{
     @apply font-bold text-2xl
   }

   p{
    @apply mb-5
   }
</style>