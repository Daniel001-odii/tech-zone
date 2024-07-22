<template>

<!-- PASSWORD 2FA FOR FUNDS WITHDRAWAL -->
<div v-if="requested_withdrawal" class="flex flex-col fixed left-0 h-screen bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center">
    <form @submit.prevent="checkPassword" class="flex flex-col bg-white dark:bg-black rounded-lg p-12 gap-3">
        <h1 class="text-xl ">Please input your password to continue</h1>
        <input name="password" id="password" type="password" class="form_input" v-model="fwp_password">
        <div class="flex flex-row gap-3">
            <button @click="requested_withdrawal = !requested_withdrawal" class="bg-gray-100 dark:bg-gray-600 p-3 rounded-md font-bold">cancel</button>
            <button type="submit" class="btn w-full" :disabled="fwp_password == ''">continue</button>
        </div>
      
    </form>
</div>
   


    <PageTitle>Settings</PageTitle>
    <div class="h-full flex flex-col relative">
        <FullPageLoading v-if="loading"/>
       
        <div class=" bg-white tab flex ps-2 flex-row flex-wrap gap-2 dark:bg-[#1F2A36] border-b dark:border-gray-500 sticky top-0">
            <!-- <button @click="active_tab = 1" :class="active_tab == 1 ? 'active_tab':''" class="tab_button">Appearance & theme</button> -->
            <button @click="active_tab = 2" :class="active_tab == 2 ? 'active_tab':''" class="tab_button">Profile & Account</button>
            <button @click="active_tab = 3" :class="active_tab == 3 ? 'active_tab':''" class="tab_button">Notifications</button>
            <button @click="bankInfoUpdate" :class="active_tab == 4 ? 'active_tab':''" class="tab_button">Funds Withdrawal</button>
            <button @click="active_tab = 5" :class="active_tab == 5 ? 'active_tab':''" class="tab_button">ID & Verification</button>
        </div>


        <div class=" flex flex-col p-3 gap-5">
            <div v-if="active_tab == 1" class="section">
                <h1 class="font-bold mb-3 text-lg">Select Preffered theme</h1>
                
                <div class="  flex flex-row gap-5">
                    <button @click="system_mode" :class="!current_mode ? 'active_theme':''" class="theme-toggle">System</button>
                    <button @click="light_mode()" :class="current_mode == 'light' ? 'active_theme':''" class="theme-toggle">
                        <i class="pi pi-sun"></i>
                    </button>
                    <button @click="dark_mode()" :class="current_mode == 'dark' ? 'active_theme':''" class="theme-toggle">
                        <i class="pi pi-moon"></i>
                    </button>
                </div>
            </div>

            <!-- PROFILE ACCOUNT -->
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
                
                <form class="" @submit.prevent="updatePassword">
                    <h1 class="font-bold mb-3 text-lg mt-3">Password & Security</h1>
                   
                  
                    
                    <div class="flex flex-col max-w-sm">
                        <label for="email">Current Password</label>
                        <input class="form_input" type="password" name="password" id="password" v-model="security.password">
                    </div>

                    <div class="flex flex-col max-w-sm mt-5">
                        <label>New Password</label>
                            <Password 
                        inputClass="form_input w-full"
                        panelClass="form_input"
                        v-model="security.new_password"/>                    
                    </div>

                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="new_password_confirmation">Confirm New Password</label>
                        <input class="form_input" type="password" name="new_password_confirmation" id="new_password_confirmation" v-model="security.new_password_confirmation">
                    </div>
                    <div class="text-red-500 py-5" type="danger" v-if="password_errors">{{  password_errors }}</div>
                    <button type="button" @click="updatePassword" class="btn mt-3">Change Account Password</button>
                </form>

                <div class=" mt-3 pb-3">
                    <h1 class="font-bold mb-3 text-lg mt-3">Account & Profile</h1>
                    <p class=" text-red-700 bg-red-100 rounded-lg p-3">
                    <strong>Warning</strong><br/>
                    <span>Deleting your account cannot be undone. Any personally identifiable information will be deleted and any in-progress data will be lost.</span>
                    </p>
                    <button type="submit" class=" bg-red-500 text-white hover:bg-red-700 rounded-md p-3 mt-3">Delete Account</button>
                </div>
            </div>

            <!-- NOTIFICATIONS -->
            <form @submit.prevent="updateUserData" v-if="active_tab == 3" class="section mb-3">
                <h1 class="font-bold mb-3 text-lg">Notification Settings</h1>
                <!-- <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Contract Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow ApexTeks send you email notifications for contract actions and updates.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.contracts">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div> -->

                <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Message Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow ApexTeks send you email notifications for messages.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.messages">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div class=" flex flex-row items-center justify-between justify-center">
                    <div class="flex flex-col">
                        <span class="font-bold">Email Notifications</span>
                        <span class="text-sm w-72 text-gray-400">Allow ApexTeks send you email notifications for updates and activities related to your account.</span>
                    </div>
                    
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" @change="updateUserData" v-model="settings.notifications.emails">
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </form>

            <!-- FUNDS WITHDRAWAL -->
            <form @submit.prevent="updateUserData" v-if="active_tab == 4" class="section mb-3">
                
                <div class="mt-3">
                    <h1 class="font-bold mb-3 text-lg">Bank information</h1>
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>Available funds will be sent to the provided bank account details when withdrawal is initiated</div>
                    </div>
                    <div class="flex flex-col max-w-sm">
                        <label for="bank-name">Bank name</label>                        
                        <select class="form_input" v-model="bank.name" @change="setBankCode">
                            <option value="" disbaled>select bank</option>
                            <option v-for="bank in banks" :value="bank.name">{{ bank.name }}</option>
                        </select>
                    </div>

                    <div class="flex flex-col max-w-sm mt-5" v-if="bank.name">
                        <label for="sort-code">Bank code</label>
                        <input class="form_input" type="number" name="sort-code" id="sort_code" v-model="bank.code" disabled>
                    </div>
                    <div class="flex flex-col max-w-sm mt-5">
                        <label for="account-number">Account number</label>
                        <input class="form_input" type="number" name="account-number" id="account_number" v-model="settings.bank.account_number">
                    </div>
                    <button type="button" @click="updateUserData" class="btn mt-3 w-fit" :disabled="user.settings.bank.name == bank.name">update bank info</button>
                </div>

                

                <div class="mt-3">
                    <h1 class="font-bold mb-3 text-lg">Withdrawal & Payout</h1>
                

                    <div class="flex items-center p-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>Funds withdrawal is only available on weekends</div>
                    </div>
                    <div class="py-4 ">Wallet Balance: NGN {{ Math.floor(account_balance).toLocaleString() }}</div>

                    <div class="flex flex-col w-fit">
                        <button type="button" @click="requested_withdrawal = !requested_withdrawal" v-if="!password_approved" class="btn">Initiate withdrawal</button>
                        <form @submit.prevent="withdrawFunds" class="flex flex-col gap-3 border p-4 rounded-lg dark:border-gray-600" v-if="password_approved">
                            <span>{{ withdrawal_errors }}</span>
                            <input type="number" class="form_input" v-model="withdrawal_amount" :placeholder="'NGN '+account_balance">
                            <button type="submit" class="btn">Withdraw Funds</button>
                        </form>
                        <!-- <span class="app_spinner"></span> -->
                    </div>

                </div>

            </form>

            

            <!-- ID & VERIFICATION -->
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
                                <input class="form_input" type="text" name="nin-number" id="nin-number" v-model="settings.KYC.NIN_number" :disabled="settings.KYC.is_verified">
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

import Password from 'primevue/password'
import Alert from '@/components/Alert.vue';

import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';

import { useToast } from 'vue-toastification'

export default {
    name: "SettingsPageView",
    components: { 
        TemplateView, 
        ContractStatus, 
        PageTitle, 
        FullPageLoading, 
        DismissableAlert, 
        Password, 
        Alert, 
        AutoComplete,
        Dropdown 
    },
    data(){
        return{
            toast: useToast(),
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
            active_tab: 4,

            user: {
                profile:{
                    phone: '',
                },
                settings: {
                    bank: '',
                    name: '',
                }
            },

            security: {
                password: '',
                new_password: '',
                new_password_confirmation: '',
            },

            password_errors: '',

            bank: {
                name: '',
                code: '',
            },

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

            banks: [],

            // user wallet and balance...
            account_balance: 0,
            fwp_password: '',
            requested_withdrawal: false,
            password_approved: false,
            withdrawal_errors: '',
            withdrawal_amount: '',
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
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove("dark");
            
        },

        dark_mode(){
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add("dark");
        },

        bankInfoUpdate(){
            this.active_tab = 4;
            this.getBanks();
        },

        setBankCode() {
            const bank = this.banks.find(b => b.name === this.bank.name);
            this.bank.code = bank ? bank.code : '';
            this.settings.bank.name = this.bank.name;
            this.settings.bank.sort_code = this.bank.code;
        },

        async getBanks(){
            try{
                this.loading = true;
                const response = await axios.get(`${this.api_url}/contracts/banks/list`);
                console.log("bank lists: ", response);
                this.banks = response.data.banks;
                this.loading = false;
            }catch(error){
                this.loading = false;
                this.toast.error(error.response.data.message);
            }
        },

        async getUserData(){
            this.loading = true;   
            const headers = this.headers;
            try{    
                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("user data: ", response)
                this.user = response.data.user;

                if(this.user.settings){
                    this.settings.profile_visibility = this.user.settings.profile_visibility;
                    // this.user.settings.
                    if(this.user.settings.bank){
                        this.settings.bank = this.user.settings.bank
                        this.bank.name = this.settings.bank.name;
                        this.bank.code = this.settings.bank.sort_code;
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
                };

                
                this.getUserWallet();
                
                
                this.loading = false;
            }catch(error){
                this.toast.error(error.response.data.message);
                this.loading = true;
            }
        },


        // GET USER WALLET FOR BALANCE DISPLAY...
        async getUserWallet(){
            try{
                const headers = this.headers;
                const response  = await axios.get(`${this.api_url}/user/wallet/get`, { headers });
                // console.log("user wallet: ", response.data.wallet);
                this.account_balance = response.data.wallet.balance;
            }catch(error){
                console.error("erro getting user wallet: ", error);
            }
        },


        async updateUserData(){
            this.loading = true;
            const headers = this.headers;
            try{
                const user = this.user;
                user.settings = this.settings;
                const response = await axios.patch(`${this.api_url}/user/profile`, user, { headers });
                // console.log("set successful: ", response);
                this.toast.success(response.data.message);
                this.loading = false;
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        },

        async updatePassword(){
            
            try{
                if(this.security.password == '' || this.security.new_password == '' || this.security.new_password_confirmation == ''){
                    this.toast.error("invalid data provided!");
                } else {
                const headers = this.headers;
                this.loading = true;
                const response = await axios.post(`${this.api_url}/user/password/change`, this.security, { headers });
                console.log("password response: ", response);
                alert("Password Updated Successfully!")
                this.loading = false;
                this.toast.success(response.data.message);
                }
            }catch(error){
                // console.log("error changing password: ", error);
                this.toast.error(error.response.data.message);
                this.password_errors = error.response.data.message;
                this.loading = false;
            }
        },

        async checkPassword(){
            try{
                const headers = this.headers;
                const response = await axios.post(`${this.api_url}/password/check`, {password: this.fwp_password}, { headers });
                console.log("from pass checker: ", response);
                this.requested_withdrawal = false,
                this.password_approved = response.data.authenticated;
                this.fwp_password = ''
                // this.toast.info(response.data.message);
            }catch(error){
                // console.log("problem with pass checker: ", error)
                this.requested_withdrawal = false,
                this.fwp_password = ''
                this.toast.error(error.response.data.message);
            }
        },

        async withdrawFunds(){
            try{
                const headers = this.headers;
                const response = await axios.post(`${this.api_url}/funds/withdraw`, { amount: this.withdrawal_amount }, { headers });
                this.toast.success(response.data.message);
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        }
       
    },
    computed(){

    },

    created(){
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
        @apply  w-24 h-24 p-5 flex justify-center items-center rounded-xl border-4 dark:border-gray-400 dark:bg-tz_light_blue hover:bg-tz_blue hover:text-white ;
    }
    .active_theme{
        @apply border-blue-500 bg-tz_light_blue 
    }
</style>