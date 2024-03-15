<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Settings</template>
            <template #page-contents>

                <div class=" tab flex ps-2 flex-row flex-wrap gap-2 dark:bg-[#1F2A36]">
                    <button @click="active_tab = 1" :class="active_tab == 1 ? 'active_tab':''" class="tab_button">Appearance & theme</button>
                    <button @click="active_tab = 2" :class="active_tab == 2 ? 'active_tab':''" class="tab_button">Profile & Account</button>
                    <button @click="active_tab = 3" :class="active_tab == 3 ? 'active_tab':''" class="tab_button">Notifications</button>
                    <button @click="active_tab = 4" :class="active_tab == 4 ? 'active_tab':''" class="tab_button">Payments</button>
                </div>


                <div class=" flex flex-col p-3 gap-5">
                    
                    <div v-if="active_tab == 1" class="section">
                        <h1 class="font-bold mb-3 text-lg">Appearance & theme</h1>
                        
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
                        <div class=" mt-3">
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
                            <div class="flex flex-col max-w-sm">
                                <label for="email">Email</label>
                                <input class="form_input" type="email" name="email" id="email" :value="user.email">
                            </div>
                            <button class="btn mt-3">Update</button>
                        </div>
                        
                        <div class="">
                            <h1 class="font-bold mb-3 text-lg mt-3">Password & Security</h1>
                            <div class="flex flex-col max-w-sm">
                                <label for="email">Current Password</label>
                                <input class="form_input" type="password" name="password" id="password" :value="settings.password">
                            </div>
                            <div class="flex flex-col max-w-sm mt-5">
                                <label for="email">New Password</label>
                                <input class="form_input" type="password" name="password" id="new_password" :value="settings.new_password">
                            </div>
                            <button type="submit" class="btn mt-3">Change Account Password</button>
                        </div>

                        <div class="   mt-3">
                            <h1 class="font-bold mb-3 text-lg mt-3">Account & Profile</h1>
                           <p class=" text-red-700 bg-red-100 rounded-lg p-3">
                            <strong>Warning</strong><br/>
                            <span>Deleting your account cannot be undone. Any personally identifiable information will be deleted and any in-progress data will be lost.</span>
                           </p>
                            <button type="submit" class=" bg-red-500 text-white hover:bg-red-700 rounded-md p-3 mt-3">Delete Account</button>
                        </div>
                    </div>

                    <div v-if="active_tab == 3" class="section mb-3">
                        <h1 class="font-bold mb-3 text-lg">Notification Settings</h1>
                        <div class=" flex flex-row items-center justify-between justify-center">
                            <div class="flex flex-col">
                                <span class="font-bold">Contract Notifications</span>
                                <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for contract actions and updates.</span>
                            </div>
                            
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" v-model="settings.notifications.contracts" checked>
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div class=" flex flex-row items-center justify-between justify-center">
                            <div class="flex flex-col">
                                <span class="font-bold">Message Notifications</span>
                                <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for messages.</span>
                            </div>
                            
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" v-model="settings.notifications.messages" checked>
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div class=" flex flex-row items-center justify-between justify-center">
                            <div class="flex flex-col">
                                <span class="font-bold">Email Notifications</span>
                                <span class="text-sm w-72 text-gray-400">Allow Apex-tek send you email notifications for updates and activities related to your account.</span>
                            </div>
                            
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" v-model="settings.notifications.emails" checked>
                                <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    <div  v-if="active_tab == 4" class="section mb-3">
                        
                        <div class="  mt-3">
                            <h1 class="font-bold mb-3 text-lg">Payment Information</h1>
                            <p>Your Card details..</p>
                            <form class="max-w-sm">
                                <label for="card-number-input" class="sr-only">Card number:</label>
                                <div class="relative">
                                    <input type="text" id="card-number-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z"/></svg>
                                    </div>
                                </div>
                                <div class="grid grid-cols-3 gap-4 my-4">
                                    <div class="relative max-w-sm col-span-2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <label for="card-expiration-input" class="sr-only">Card expiration date:</label>
                                        <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/23" required />
                                    </div>
                                    <div class="col-span-1">
                                        <label for="cvv-input" class="sr-only">Card CVV code:</label>
                                        <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CVV" required />
                                    </div>
                                </div>
                                <!-- <button type="submit" class="text-white bg-tz_blue hover:bg-tz_dark_blue focus:ring-4 focus:ring-tz_light_blue font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-tz_blue dark:hover:bg-tz_blue focus:outline-none dark:focus:ring-tz_dark_blue">save</button> -->
                                <button type="submit" class="btn">save</button>
                            </form>
                        </div>
                    </div>

                    
                </div>
            </template>
        </TemplateView>
    </div>
</template>
<script>
import JobDetailCard from '@/components/JobDetailCard.vue';
import TemplateView from '../TemplateView.vue';
import ContractStatus from '@/components/ContractStatus.vue';
import axios from 'axios';

export default {
    name: "SettingsPageView",
    components: { TemplateView, ContractStatus },
    data(){
        return{
            contracts: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            current_mode: '',
            active_tab: 2,

            user: {},
            settings:{
                card: {
                    number: '',
                    date: '',
                    cvv: ''
                },
                notifications:{
                    contracts: true,
                    messages: true,
                    email: true,
                }
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

        async getUserData(){
            const headers = this.headers;
            try{    
                const response = await axios.get(`${this.api_url}/user`, { headers });
                // console.log(response)
                this.user = response.data.user
            }catch(error){
                console.log("error getting user details: ", error)
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
        @apply flex flex-col p-2 gap-5
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