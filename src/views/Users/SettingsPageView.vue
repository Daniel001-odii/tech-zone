<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Settings</template>
            <template #page-contents>
                <div class=" flex flex-col">
                    <div class="flex flex-col p-5">
                        <h1 class="font-bold mb-3 text-lg">Appearance & theme</h1>
                        <div class=" ml-3 flex flex-row gap-5">
                            <button class=" p-5 rounded-xl bg-slate-50 border-2">System</button>
                            <button class=" p-5 rounded-xl bg-slate-50 border-2">Dark</button>
                            <button class=" p-5 rounded-xl bg-slate-50 border-2">Light</button>
                        </div>
                    </div>

                    <div class="flex flex-col p-5">
                        <h1 class="font-bold mb-3 text-lg">General Information</h1>
                        <div class=" ml-3">
                            <div class="flex flex-row gap-3 mb-3">
                                <div class="w-3/6 flex flex-col">
                                    <label for="firstname">firstname</label>
                                    <input class="rounded-lg border focus:border-blue-500 p-3" type="name" name="firstname" id="firstname" :value="user.firstname">
                                </div>

                                <div class="w-3/6 flex flex-col">
                                    <label for="firstname">lastname</label>
                                    <input class="p-3 rounded-lg border" type="name" name="lastname" id="lastname" :value="user.lastname">
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <label for="firstname">Email Address</label>
                                <input class="p-3 rounded-lg border" type="name" name="lastname" id="lastname" :value="user.lastname">
                            </div>
                            <button class="btn mt-3">Update</button>
                        </div>
                    </div>

                    <div class="flex flex-col p-5">
                        <h1 class="font-bold mb-3 text-lg">Password & Security</h1>
                        <div class=" ml-3">
                            <div class="flex flex-col max-w-sm">
                                <label for="email">Current Password</label>
                                <input class="p-3 rounded-lg border" type="email" name="email" id="email" :value="user.email">
                            </div>
                            <div class="flex flex-col max-w-sm mt-5">
                                <label for="email">New Password</label>
                                <input class="p-3 rounded-lg border" type="email" name="email" id="email" :value="user.email">
                            </div>
                            <button type="submit" class="btn mt-3">Change Password</button>
                        </div>
                    </div>

                    <div class="flex flex-col p-5 mb-3">
                        <h1 class="font-bold mb-3 text-lg">Payment Information</h1>
                        <p>Your Card details..</p>
                        <div class=" ml-3 mt-3">
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

                    <div class="flex flex-col p-5">
                        <h1 class="font-bold mb-3 text-lg">Account & Profile</h1>
                        <div class=" ml-3">
                           <p class=" text-red-700 bg-red-100 rounded-lg p-3">
                            <strong>Warning</strong><br/>
                            <span>Deleting your account cannot be undone. Any personally identifiable information will be deleted and any in-progress data will be lost.</span>
                           </p>
                            <button type="submit" class=" bg-red-500 text-white hover:bg-red-700 rounded-md p-3 mt-3">Delete Account</button>
                        </div>
                    </div>

                    <div class="h-20"></div>


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

            user: {

            }
        }
    },
    methods:{
        // get all user contracts...
       
    },
    mounted(){

    }
}
</script>
<style scoped>
    
</style>