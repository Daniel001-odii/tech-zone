<template>
    <!-- ALERTS AND NOTIFICS -->
    <div class="fixed flex-col bottom-10 right-0 left-0 flex justify-center items-center z-50">
            <div v-for="alert in alerts" class="flex flex-col gap-3 relative">
                <DismissableAlert  :type="alert_type">{{ alert_message }}</DismissableAlert>
            </div>
    </div>
   


    <PageTitle>Settings</PageTitle>
    <div class="h-full flex flex-col relative">
        <FullPageLoading v-if="loading"/>
       
        <div class=" tab flex ps-2 flex-row flex-wrap gap-2 dark:bg-[#1F2A36] border-b dark:border-gray-500">
            <button @click="active_tab = 1" :class="active_tab == 1 ? 'active_tab':''" class="tab_button">Appearance & theme</button>
            <button @click="active_tab = 2" :class="active_tab == 2 ? 'active_tab':''" class="tab_button">Profile & Account</button>
            <button @click="active_tab = 3" :class="active_tab == 3 ? 'active_tab':''" class="tab_button">Notifications</button>
            <button @click="active_tab = 4" :class="active_tab == 4 ? 'active_tab':''" class="tab_button">Funds Withdrawal</button>
            <button @click="active_tab = 5" :class="active_tab == 5 ? 'active_tab':''" class="tab_button">ID & Verification</button>
        </div>


        <div class=" flex flex-col p-3 gap-5 overflow-y-scroll">
            <div v-if="active_tab == 1" class="section">
                <h1 class="font-bold mb-3 text-lg">Select Preffered theme</h1>
                
                <div class="  flex flex-row gap-5">
                    <button @click="system_mode" :class="!current_mode ? 'active_theme':''" class="theme-toggle">System</button>
                    <button @click="light_mode" :class="current_mode == 'light' ? 'active_theme':''" class="theme-toggle">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button @click="dark_mode" :class="current_mode == 'dark' ? 'active_theme':''" class="theme-toggle">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="active_tab == 2" class="section">
                <form @submit.prevent="updateUserData" class=" mt-3">
                    <h1 class="font-bold mb-3 text-lg">General Information</h1>
                    <div class="flex flex-row gap-3 mb-3">
                        <div class="w-3/6 flex flex-col">
                            <label for="firstname">firstname</label>
                            <!-- <input class="form_input" type="name" name="firstname" id="firstname" :value="user.firstname" disabled>? -->
                            <div class="form_input">{{ user.firstname }}</div>
                        </div>

                        <div class="w-3/6 flex flex-col">
                            <label for="firstname">lastname</label>
                            <!-- <input class="form_input" type="name" name="lastname" id="lastname" :value="user.lastname" disabled> -->
                            <div class="form_input">{{ user.lastname }}</div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="email">Email</label>
                        <input class="form_input" type="email" name="email" id="email" :value="user.email">
                    </div>
                    <div class="flex flex-col w-full mt-3">
                        <label for="email">Phone Number</label>
                        <input v-if="user.profile" class="form_input" type="phone" name="phone" id="phone" v-model="user.profile.phone">
                    </div>
                    <button class="btn mt-3" type="submit">Update</button>
                </form>

                <div @submit.prevent="updateUserData" class="mt-3">
                    <h1 class="font-bold mb-3 text-lg">Profile visibility</h1>
                    <!-- settings: {{ user.settings }} -->
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>In case of account inactivity your profile is automaitcally set private</div>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-radio-1" type="radio" value="public" name="profile-visibility" @change="updateUserData" v-model="settings.profile_visibility"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-1" class="ms-2 text-lg  font-medium text-gray-900 dark:text-gray-300">Public</label>
                    </div>
                    <div class="flex items-center">
                        <input id="default-radio-2" type="radio" value="private" name="profile-visibility" @change="updateUserData" v-model="settings.profile_visibility"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Private</label>
                    </div>
                </div>
                
                <form class="">
                    <h1 class="font-bold mb-3 text-lg mt-3">Password & Security</h1>
                    <div class="flex flex-col max-w-sm">
                        <label for="email">Current Password</label>
                        <input class="form_input" type="password" name="password" id="password" :value="password">
                    </div>
                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="new_password">New Password</label>
                        <input class="form_input" type="password" name="new_password" id="new_password" :value="new_password">
                    </div>
                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="confirm_new_password">Confirm New Password</label>
                        <input class="form_input" type="password" name="confirm_new_password" id="confirm_new_password" :value="confirm_new_password">
                    </div>
                    <button type="submit" class="btn mt-3">Change Account Password</button>
                </form>

                <div class=" mt-3">
                    <h1 class="font-bold mb-3 text-lg mt-3">Account & Profile</h1>
                    <p class=" text-red-700 bg-red-100 rounded-lg p-3">
                    <strong>Warning</strong><br/>
                    <span>Deleting your account cannot be undone. Any personally identifiable information will be deleted and any in-progress data will be lost.</span>
                    </p>
                    <button type="submit" class=" bg-red-500 text-white hover:bg-red-700 rounded-md p-3 mt-3">Delete Account</button>
                </div>
            </div>

            <form @submit.prevent="updateUserData" v-if="active_tab == 3" class="section mb-3">
                <h1 class="font-bold mb-3 text-lg">Notification Settings</h1>
                <!-- <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Contract Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for contract actions and updates.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.contracts">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div> -->

                <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Message Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for messages.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.messages">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Email Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for updates and activities related to your account.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.emails">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </form>

            <form @submit.prevent="updateUserData" v-if="active_tab == 4" class="section mb-3">
                
                <div class="  mt-3">
                    <h1 class="font-bold mb-3 text-lg">Withdrawal Information</h1>
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>Available funds will be sent to the provided bank account details when withdrawal is initiated</div>
                    </div>
                    <div class="flex flex-col max-w-sm">
                        <label for="bank-name">Bank name</label>
                        <input class="form_input" type="text" name="bank-name" id="bank_name" v-model="settings.bank.name">
                    </div>
                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="sort-code">Bank Sort code</label>
                        <input class="form_input" type="number" name="sort-code" id="sort_code" v-model="settings.bank.sort_code">
                    </div>
                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="account-number">Account number</label>
                        <input class="form_input" type="number" name="account-number" id="account_number" v-model="settings.bank.account_number">
                    </div>
                </div>
                <button class="btn mt-3 w-fit">Save bank info</button>
            </form>

            <form @submit.prevent="updateUserData"  v-if="active_tab == 5" class="section mb-3">
                
                <div class="mt-3">
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>Your NIN number would be used for verifying your account once provided..</div>
                    </div>
                    <!-- {{ settings.KYC }} -->
                    <h1 class="font-bold mb-3 text-lg">NIMC Information</h1>
                    <div class=" ">
                        <label for="nin-number">NIN Number</label>
                        <div class="flex flex-row items-center gap-3">
                            <div class="flex flex-col w-full">
                                <input class="form_input" type="number" name="nin-number" id="nin-number" v-model="settings.KYC.NIN_number" :disabled="settings.KYC.is_verified">
                            </div>
                            <svg v-if="settings.KYC.is_verified" class="w-6 h-6 text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                            </svg>
                            <svg v-else class="w-6 h-6 text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        
                        

                    </div>
                    

                    <button type="submit" class="btn mt-3" :disabled="settings.KYC.is_verified">
                        <span v-if="settings.KYC.is_verified">Verified Successfully</span>
                        <span v-else>Verify now</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import FullPageLoading from '@/components/FullPageLoading.vue'
import PageTitle from '@/components/PageTitle.vue';
import DismissableAlert from '@/components/DismissableAlert.vue';


export default {
    name: "SettingsPageView",
    components: { TemplateView, ContractStatus, PageTitle, FullPageLoading, DismissableAlert },
    data(){
        return{
            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

            loading: false,
            contracts: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            current_mode: '',
            active_tab: 1,

            user: {
                profile:{
                    phone: '',
                }
            },

            password: '',
            new_password: '',
            confirm_new_password: '',

            settings:{
                bank: {
                    name: '',
                    sort_code: '',
                    account_number: '',
                },
                card: {
                    number: '',
                    date: '',
                    cvv: ''
                },
                notifications:{
                    contracts: true,
                    messages: true,
                    email: true,
                },
                KYC: {
                    NIN_number: '',
                    is_verified: true,
                },
                profile_visibility: '',
            },
        }
    },
    methods:{
        // get all user contracts...
        theme(){
            const mode = localStorage.getItem('theme');
            this.current_mode = mode;
            if(!mode){
                this.current_mode = null
            }
            console.log("current theme: ", this.current_mode)
        },

        system_mode(){
            localStorage.removeItem('theme');
            window.location.reload()
        },

        light_mode(){
            window.location.reload()
            localStorage.setItem('theme', 'light');
            localStorage.theme = 'light'
            
        },

        dark_mode(){
            window.location.reload()
            localStorage.setItem('theme', 'light');
            localStorage.theme = 'dark'
            
        },

        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },

        async getUserData(){
            this.loading = true;
            const headers = this.headers;
            try{    
                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log(response)
                this.user = response.data.user;

                if(this.user.settings){
                    this.settings.profile_visibility = this.user.settings.profile_visibility;
                    if(this.user.settings.bank){
                        this.settings.bank = this.user.settings.bank
                    }
                    if(this.user.settings.card){
                        this.settings.bank = this.user.settings.bank
                    }
                    if(this.user.settings.notifications){
                        this.settings.notifications = this.user.settings.notifications
                    }
                    if(this.user.settings.KYC){
                        this.settings.KYC = this.user.settings.KYC
                    }
                }
                
                
                this.loading = false;
            }catch(error){
                console.log("error getting user details: ", error);
                this.loading = true;
            }
        },

        async updateUserData(){
            this.loading = true;
            const headers = this.headers;
            try{
                const user = this.user;
                user.settings = this.settings;

                // console.log(user)

                const response = await axios.patch(`${this.api_url}/user/profile`, user, { headers });
                // console.log("set successful: ", response);
                this.showAlertBox("success", "settings updated successfully!");
                this.loading = false;
            }catch(error){
                // console.log("error updating user profile: ", error);
                showAlertBox("danger", "error updating settings");
            }
        }
       
    },
    computed(){

    },

    mounted(){
        this.theme();
        this.getUserData()

    }
}
</script>
<style scoped>
    .section{
        @apply h-full flex flex-col p-2 gap-5
    }

    .tab_button{
        @apply p-3
    }

    .active_tab{
        @apply  border-tz_blue border-b-4
    }

    .theme-toggle{
        @apply  w-24 h-24 p-5 flex justify-center items-center rounded-xl border-4 dark:border-gray-400 dark:bg-tz_light_blue hover:border-blue-500 hover:bg-tz_dark_blue;
    }
    .active_theme{
        @apply border-blue-500 bg-tz_light_blue 
    }
</style>