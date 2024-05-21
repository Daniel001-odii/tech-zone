<template>
    <HomeNavbar/>
    <div class="pt-20 h-full max-w-screen-2xl mx-auto my-0">
        <div class="flex flex-row justify-center items-center bg-[#EDEFF3] min-h-[300px] hero" 
        :style="{'background-image': `url(${getImageUrl()})`}"
        >
            <div class="p-5 w-full text-center justify-center flex flex-col items-center">
                <p class="text-sm m-0 p-0">LEGAL INFORMATION</p>
                <h1 class="font-bold text-2xl m-0 p-0">
                    <span v-if="current_tab == 'privacy'">Apex Technologies Privacy Policies</span>
                    <span v-if="current_tab == 'cookies'">Apex Technologies Cookies Policies</span>
                    <span v-if="current_tab == 'software'">Use of Software Terms & Condition</span>
                    <span v-if="current_tab == 'billing'">Billing / Payment Terms & Condition</span>
                </h1>
                <p class=" max-w-[500px] text-[12px] text-center">
                    <span v-if="current_tab == 'privacy'">We value your Privacy</span>
                    <span v-else>These are the rules guiding the use of Apex Technologies software </span>
                </p>
            </div>
        </div>

        <div class=" flex flex-row gap-5 p-8 justify-between items-start">
            <div class=" w-[30%]">
                <h2>Legal Information</h2>
                <div class="flex flex-col gap-y-3 mt-3 text-left">
                    <button class="text-left" @click="current_tab = 'privacy'" :class="current_tab == 'privacy' ? 'text-blue-500':''">Privacy Policy</button>
                    <button class="text-left" @click="current_tab = 'cookies'" :class="current_tab == 'cookies' ? 'text-blue-500':''">Cookies Policy</button>
                    <button class="text-left" @click="current_tab = 'software'" :class="current_tab == 'software' ? 'text-blue-500':''">Use of Software <br/>Terms and Condition</button>
                    <button class="text-left" @click="current_tab = 'billing'" :class="current_tab == 'billing' ? 'text-blue-500':''">Billing and Payment <br/> Terms and Condition</button>
                </div>
            </div>
            <div v-if="current_tab == 'privacy'" class=" w-[70%] flex flex-col overflow-y-auto h-[500px]">
                <PrivacyPolicyText/>
            </div>
            <div v-if="current_tab == 'cookies'" class=" w-[70%] flex flex-col overflow-y-auto h-[500px]">
                <CookiesPolicyText/>
            </div>
            <div v-if="current_tab == 'software'" class=" w-[70%] flex flex-col overflow-y-auto h-[500px]">
                Use of Software Terms and conditions
            </div>
            <div v-if="current_tab == 'billing'" class=" w-[70%] flex flex-col overflow-y-auto h-[500px]">
                Billing Terms and conditions
            </div>
        </div>



        <Footer/>

    </div>

</template>
<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import { googleAuthCodeLogin, decodeCredential } from 'vue3-google-login';
import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'

import PrivacyPolicyText from '@/components/PrivacyPolicyText'
import CookiesPolicyText from '@/components/CookiesPolicyText'


export default {
    name: "PrivacyPolicyPage",
    components: { 
        Alert,
        HomeNavbar, 
        Footer,
        PrivacyPolicyText,
        CookiesPolicyText
    },
    data(){
        return{
            current_tab: 'privacy'
        }
    },
    methods: {
        getImageUrl() {
            if (this.current_tab === 'privacy') {
                return require('../assets/images/Privacy_hero.png');
            } else if (this.current_tab === 'cookies') {
                return require('../assets/images/policy_b.png');
            } else if (this.current_tab === 'software') {
                return require('../assets/images/policy_c.png');
            } else if (this.current_tab === 'billing') {
                return require('../assets/images/policy_d.png');
            }
             else {
                // Default image URL if none of the conditions match
                return require('../assets/images/Privacy_hero.png');
            }
        }
    },
    mounted(){
        window.scrollTo(0, 0);
    }
}
</script>
<style scoped>
   h2{
     @apply font-bold text-2xl
   }

   p{
    @apply mb-5
   }

   .hero{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center top;
    }


    /* width */
::-webkit-scrollbar {
  width: 15px;
  border-radius: 40px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #EDEFF3;
    border-radius: 40px; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #4E79BC99;
    border-radius: 40px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>