<template>
    <HomeNavbar/>
    <div class="pt-20 h-full max-w-screen-2xl mx-auto my-0">
        <div class="flex flex-row justify-center items-center bg-[#EDEFF3] min-h-[300px] hero" >
            <div class="p-5 w-full text-center justify-center flex flex-col items-center">
                <p class="text-sm m-0 p-0">LEGAL INFORMATION</p>
                <h1 class="font-bold text-2xl m-0 p-0">Apex Technologies Privacy Policies</h1>
                <p class=" max-w-[500px] text-[12px] text-center">We value your Privacy</p>
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
                Privacy Policy for APEX TECHNOLOGIES 

Last Updated: 02/03/2024 

 

Welcome to APEX TECHNOLOGIES. This Privacy Policy is designed to inform you about the types of information we collect, how we use and protect that information, and your choices regarding your information. By using our Website, you agree to the terms of this Privacy Policy. 

 

 Information We Collect: 

 Personal Information: 

Personal Information (Name, Date of Birth) 

Contact Information (email address, phone number, address) 

Resume/CV details (education, work experience, skills, etc.) 

Professional memberships and certifications 

Employment preferences and goals 

 Sensitive Information: 

ApexTeks may collect certain sensitive information with your explicit consent, such as disability status or other relevant information for job accommodations. 

Usage Information 

IP address, browser type, and device information 

Usage patterns and interactions with Tech-Zone 

 

 How We Use Your Information: 

 Job Matching: 

Matching your profile with relevant job opportunities 

Providing personalized job recommendations 

 Communication: 

Sending job alerts, newsletters, and updates 

Responding to inquiries and providing support 

 Improving Services: 

Analyzing user behavior to enhance and customize user experience 

Conducting research and analysis to improve our services 

 Legal Compliance: 

Complying with applicable laws and regulations 

Protecting our legal rights and preventing fraud 

 

 Data Security: 

 ApexTeks will implement technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, and destruction. 

ApexTeks will Regularly review and update our security practices to ensure the ongoing confidentiality and integrity of your data. 

 

4. Information Sharing: 

 Employers and Recruiters: 

ApexTeks may share your profile and resume with potential employers or recruiters only with your explicit consent. 

 Service Providers: 

ApexTeks engaging third-party service providers to assist in our operations, subject to strict confidentiality obligations. 

 Legal Obligations: 

ApexTeks may disclose information in response to legal requests, court orders, or government regulations. 

 

5. Your Choices: 

 Access and Control: 

You have the right to access, correct, or delete your personal information. 

You have the right to opt-out of communications or withdraw consent. 

 Cookie Settings: 

You have the right to manage your cookie preferences through your browser settings 

 

 Children's Privacy: 

ApexTeks services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. 

 

 Changes to this Privacy Policy: 

We reserve the right to update and modify this Privacy Policy. We will notify you of significant changes through our Website or other means. 

 

Contact Information: 

If you have any questions or concerns about this Privacy Policy, please contact us at [support@ApexTeks.com / 08080367860]. 

 

 

By using our Website, you consent to the terms of this Privacy Policy. 
            </div>
            <div v-if="current_tab == 'cookies'" class=" w-[70%] flex flex-col overflow-y-auto h-[500px]">
                Cookies Policy for ApexTeks 

This Cookies Policy explains how ApexTeks ("we," "us," or "our") uses cookies and similar technologies on our website to enhance user experience, analyze website performance, and provide personalized services. By using our website, you consent to the use of cookies as described in this policy. 

 

What Are Cookies? 

Cookies are small text files placed on your device (such as a computer, smartphone, or tablet) when you visit our website. They serve various purposes, including remembering user preferences, improving website functionality, and tracking user behavior. 

 

Types of Cookies We Use 

 

Essential Cookies: These cookies are necessary for the basic functioning of our website and cannot be disabled. They include session cookies that help maintain your session and ensure proper navigation. 

Functional Cookies: These cookies enhance the usability of our website by remembering your preferences, such as language settings, and providing personalized features. 

Analytics Cookies: We use analytics cookies to gather information about how visitors interact with our website, such as the pages visited, time spent on each page, and referral sources. This data helps us analyze website performance and improve user experience. 

Advertising Cookies: Third-party advertising partners may place cookies on your device to deliver targeted ads based on your interests and browsing behavior. These cookies enable us to display relevant advertisements and measure ad effectiveness. 

 

Managing Cookies 

You have the option to accept or reject cookies through your web browser settings. Most web browsers allow you to control cookie preferences, including blocking or deleting cookies from specific websites. However, please note that disabling certain cookies may impact the functionality and user experience of our website. 

 

Your Consent 

By continuing to use our website, you consent to the use of cookies as outlined in this Cookies Policy. You can change your cookie preferences at any time by adjusting your browser settings or using the cookie consent tool provided on our website. 

 

Third-Party Cookies 

Some cookies on our website may be placed by third-party service providers, such as analytics platforms and advertising networks. These third parties may collect information about your browsing activity across different websites to deliver personalized content and advertisements. We do not have control over third-party cookies, and their use is subject to their respective privacy policies. 

 

Updates to this Policy 

We may update this Cookies Policy from time to time to reflect changes in our cookie practices or legal requirements. We encourage you to review this policy periodically for any updates. Your continued use of our website after such changes constitute your acceptance of the revised Cookies Policy. 

 

Contact Us 

If you have any questions or concerns about our use of cookies, please contact us at [contact@email.com]. For more information about your privacy rights and data protection practices, please refer to our Privacy Policy. 
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

export default {
    name: "PrivacyPolicyPage",
    components: { 
        Alert,
        HomeNavbar, 
        Footer,
    },
    data(){
        return{
            current_tab: 'privacy'
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
        background-image: url('../assets/images/Privacy_hero.png');
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