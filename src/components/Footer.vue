<template>
    <div>
        <!-- <div class="flex flex-col-reverse gap-10 md:flex-row justify-between bg-white max-w-screen-2xl" data-aos="fade-up" data-aos-delay="200"> -->
        <div class="flex flex-col-reverse md:flex-row justify-between p-8 max-w-screen-2xl" style="margin: 0 auto;">
            <div class="">
                <ul class="list">
                    <li class="list_header">About Tech-zone</li>
                    <li>
                        In Nigeria, the burgeoning tech industry holds immense promise for both companies seeking skilled professionals and individuals equipped with tech expertise. However, amidst this potential lies a challenge: unemployment among tech professionals persists, even as companies struggle to find the right talent for their projects. Enters Apex Technologies, a pioneering platform on a mission to revolutionize the tech employment landscape in Nigeria. 
                        Whether you're a company looking to expand your tech team or an IT professional seeking your next challenge, Apex Technologies invites you to join our growing community and be part of the future of tech employment in Nigeria. Together, we can unlock the full potential of Nigeria's tech industry and pave the way for a brighter, more prosperous future. 
                    </li>
                </ul>
                <div class="w-full flex items-start gap-8 mb-5">
                    <i class="bi bi-twitter"></i>
                    <i class="bi bi-facebook"></i>
                    <i class="bi bi-instagram"></i>
                    <i class="bi bi-github"></i>
                </div>
            </div>

            <div class="flex flex-row  flex-wrap gap-10">

                <ul class="list">
                    <li class="list_header">Job by type</li>
                    <li v-for="(job, index) in onsiteJobs" :key="index">{{ job }}</li>
                </ul>

                <ul class="list">
                    <li class="list_header">Job by location</li>
                    <li v-for="(state, index) in availableStates" :key="index">{{ `Jobs in ${state}` }}</li>
                </ul>

                <ul class="list">
                    <li class="list_header">Company</li>
                    <RouterLink to='/about'><li>About Us</li></RouterLink>
                    <RouterLink to='/vision'><li>Our Vision</li></RouterLink>
                    <li>Team</li>
                </ul>
            </div>
        </div>

            
    </div>
</template>
<script>
export default {
    name: "Footer",
    data(){
        return{
            onsiteJobs: [
            "Web Developer",
            "UI/UX Designer",
            "Mobile App Developer",
            "Graphic Designer",
            "Digital Marketing Specialist",
            "Data Analyst",
            "Software Engineer (Full Stack)",
            "Content Writer",
            "Network Administrator",
            "Video Editor",
            "SEO Specialist",
            "Game Developer",
            ],

            availableStates: [
            "Lagos",
            "Abuja",
            "Rivers",
            "Kano",
            "Oyo",
            "Enugu",

            ],
        }
    }
}
</script>
<style scoped>
.section_title{
    @apply font-bold
}

.list{
    @apply text-left text-lg md:max-w-80
}
.list_header{
    @apply font-bold text-xl uppercase mb-3
}

li{
    @apply py-2
}
   
</style>