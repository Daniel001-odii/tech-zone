<template>

<!-- PASSWORD 2FA FOR ACCOUNT DELETE -->
<div v-if="requested_account_delete" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center">
    <form @submit.prevent="checkPassword" class="flex flex-col bg-white dark:bg-black rounded-lg p-12 gap-3">
        <h1 class="text-xl ">Please input your password to continue</h1>
        <input name="password" id="password" type="password" class="form_input" v-model="fwp_password">
        <div class="flex flex-row gap-3">
            <button type="button" @click="requested_account_delete = !requested_account_delete" class="bg-gray-100 dark:bg-gray-600 p-3 rounded-md font-bold">cancel</button>
            <button type="submit" class="btn w-full" :disabled="fwp_password == ''">continue</button>
        </div>
    </form>
</div>

<!-- PASSWORD 2FA FOR FUNDS WITHDRAWAL -->
<div v-if="requested_withdrawal" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center">
    <form @submit.prevent="checkPassword" class="flex flex-col bg-white dark:bg-black rounded-lg p-12 gap-3">
        <h1 class="text-xl ">Please input your password to continue</h1>
        <input name="password" id="password" type="password" class="form_input" v-model="fwp_password">
        <div class="flex flex-row gap-3">
            <button type="button" @click="requested_withdrawal = !requested_withdrawal" class="bg-gray-100 dark:bg-gray-600 p-3 rounded-md font-bold">cancel</button>
            <button type="submit" class="btn w-full" :disabled="fwp_password == ''">continue</button>
        </div>
    </form>
</div>


<!-- CARD UPDATE MODAL -->
<transition name="formSlide">
    <div v-if="edit_card_details" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center p-3">
        <div class="flex flex-col w-fit">
            <div class="card flex flex-col rounded-t-xl w-auto relative bg-blue-500 p-6 text-white">
                <button @click="edit_card_details = !edit_card_details" class="absolute right-4 top-4">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="text-xl mt-6">{{ user.settings.bank.account_number }}</div>
                <div class="mt-5">
                    <span class=" opacity-70 uppercase text-[12px]">account name</span>
                    <div>
                        <span v-if="user.settings.bank.account_name">{{ user.settings.bank.account_name }}</span>
                        <span v-else>{{ user.firstname }} {{ user.lastname }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-white dark:bg-gray-800">
                <form @submit.prevent="updateUserAccount" class="p-5 flex flex-col gap-5">
                    <div class="flex flex-col">
                        <span class=" text-gray-500 text-sm">ACCOUNT NUMBER</span>
                        <div class="border-b border-black">
                            <input class="border-b border-none outline-none w-full bg-transparent" type="number" name="account-number" v-model="user.settings.bank.account_number">
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <span class=" text-gray-500 text-sm">ACCOUNT NAME</span>
                        <div class="border-b border-black">
                            <input class="border-b border-none !outline-none w-full bg-transparent" type="text" name="account-name" v-model="user.settings.bank.account_name">
                        </div>
                    </div>
                    <div class="flex flex-row flex-wrap gap-3 justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-gray-500 text-sm">BANK NAME</span>
                            <div class="border-b border-black  bg-transparent">
                                <select class="p-3 border-none"v-model="bank.name" @change="setBankCode">
                                    <option value="" disabled>select bank</option>
                                    <option v-for="bank in banks" :value="bank.name">{{ bank.name }}</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div>
                            <span class="text-gray-500 text-sm">
                                BANK CODE
                            </span>
                            <div class="py-2 text-gray-500 border-b border-black">{{ bank.code }}</div>
                        </div> -->
                    </div>
                </form>
                <button type="button" @click="updateUserAccount" class=" bg-tz_blue text-white p-5 uppercase font-bold text-sm">update card</button>
            </div>
        </div>
    </div>
</transition>


 <!-- REQUEST WITHDRAW MODAL -->
<transition name="formSlide">
    <form v-if="withdraw_funds_modal" @submit.prevent="instantWithdrawFunds" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center">
        <div class="flex flex-col p-12 rounded-lg bg-white dark:bg-gray-800 w-fit md:w-[80vw] max-w-[1050px]  max-h-[90vh] relative overflow-auto">
            <button @click="withdraw_funds_modal = !withdraw_funds_modal" type="button" class="absolute top-4 text-xl right-4">
                <i class="bi bi-x-lg"></i>
            </button>

            <div class="flex flex-col md:flex-row gap-3 mt-6">
                <div class=" flex flex-col w-full md:w-[50%]">
                    <h1 class="font-bold">Withdrawal Method</h1>
                  <div class="flex flex-col w-full p-5">
                    <div class="flex flex-row gap-3 mb-6 text-[12px]">
                        <label for="account_1" class="flex justify-center items-center gap-3">
                            <span>Account 1</span>
                            <input type="radio" id="account_1" value="account_1" name="accounts" checked>
                        </label>
                        <label for="account_2" class="flex justify-center items-center gap-3">
                            <span class="text-gray-300">Account 2</span>
                            <input type="radio" id="account_2" value="account_2" name="accounts" disabled>
                        </label>
                    </div>
                    <div class="flex flex-col">
                        <form class=" flex flex-col gap-5">
                            <div class="flex flex-col">
                                <span class=" text-gray-500 text-sm">ACCOUNT NUMBER</span>
                                <div class="border-b border-gray-400 dark:border-gray-600 py-3 text-gray-300 uppercase">
                                    {{ user.settings.bank.account_number }}
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <span class=" text-gray-500 text-sm">ACCOUNT NAME</span>
                                <div class="border-b border-gray-400 dark:border-gray-600 py-3 text-gray-300 uppercase">
                                    {{ user.firstname }}
                                    {{ user.lastname }}
                                    <!-- {{ user.settings.bank.account_number }} -->
                                </div>
                            </div>
                            <div class="flex flex-row gap-3 justify-between items-center w-full">
                                <div class="flex flex-col w-full">
                                    <span class="text-gray-500 text-sm">BANK NAME</span>
                                    <div class="border-b border-gray-400 dark:border-gray-600 py-3 text-gray-300">
                                        {{ user.settings.bank.name }}
                                    </div>
                                </div>
                                <!-- <div>
                                    <span class="text-gray-500 text-sm">
                                        BANK CODE
                                    </span>
                                    <div class="border-b border-gray-400 dark:border-gray-600 py-3 text-gray-300">
                                        {{  user.settings.bank.sort_code }}
                                    </div>
                                </div> -->
                            </div>
                        </form>
                    </div>
                  </div>

                  <div class="flex flex-col w-full mt-6">
                    <h1  class="font-bold">Withdrawal Details</h1>
                    <div class="flex flex-col gap-8 p-3">
                        <span v-if="withdrawal_amount_error" class="bg-red-100 text-red-500 p-3 rounded-lg">
                            <i class="bi bi-exclamation-circle-fill"></i>
                            insufficient funds in account
                        </span>
                        <label for="amount" class="flex flex-row gap-3 justify-between items-center">
                            <span class="text-sm">Widthdrawal Amount</span>
                            <div class="flex flex-row items-center justify-center gap-3">
                                <span class="text-gray-500">NGN</span>
                                <input type="number" name="amount" id="amount" :max="account_balance" @keyup="checkBalance" class="form_input w-[100px] overflow-auto !border-red-500 !outline-none" placeholder="100,000" v-model="withdrawal_amount">
                            </div>
                        </label>
                        
                        <!-- <div class="flex flex-col gap-3">
                            <label for="password">
                                <span class="text-sm">Account Password</span>
                                <input type="password" placeholder="Acount password" name="password" id="password" class="form_input w-full">
                            </label>
                        </div> -->
                    </div>
                  </div>
                </div>
                <div class=" flex flex-col w-full md:w-[50%]">
                    <div class="flex flex-col">
                        <h1 class="font-bold">Withdrawal Summary</h1>
                        <div class="flex flex-col gap-3 mt-3 p-3">
                            <div class="flex flex-row justify-between w-full">
                                <span>Current Balance</span>
                                <span>NGN {{ account_balance.toLocaleString() }}</span>
                            </div>

                            <div class="flex flex-row justify-between w-full">
                                <span>Withdrawal Amount</span>
                                <span class="text-tz_blue text-xl font-bold">NGN 
                                    <span v-if="!withdrawal_amount_error">{{ withdrawal_amount }}</span>
                                    <span v-else>0.00</span>
                                </span>
                            </div>

                            <div class="flex flex-row justify-between w-full">
                                <span>Balance After Withdrawal</span>
                                <span v-if="!withdrawal_amount_error">NGN {{ (account_balance - withdrawal_amount).toLocaleString() }}</span>
                                <span v-else>0.00</span>
                            </div>
                        </div>
                        <img class="hidden md:flex" src="../../assets/images/withdrawal-image.png">
                    </div>
                </div>
            </div>
            <button type="submit" class="btn uppercase text-sm mt-6" :disabled="withdrawal_amount_error">withdraw funds</button>
        </div>
    </form>
</transition>


<transition name="formSlide">
    <div v-if="verify_modal" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center p-3">
        <WebCamUI :fullscreenState="false"  @photoTaken="photoTaken" />
    </div>
</transition>



    <PageTitle>Settings</PageTitle>
    <div class="h-full flex flex-col relative">
        <FullPageLoading v-if="loading"/>
       
        <div class=" bg-white tab flex ps-2 flex-row flex-wrap gap-2 dark:bg-[#1F2A36] border-b dark:border-gray-500 sticky top-0">
            <!-- <button @click="active_tab = 1" :class="active_tab == 1 ? 'active_tab':''" class="tab_button">Appearance & theme</button> -->
            <RouterLink :to="{path: '/in/settings', query: { tab: `profile` } }">
                <button :class="active_tab == 2 ? 'active_tab':''" class="tab_button">Profile & Account</button>
            </RouterLink>

            <RouterLink :to="{path: '/in/settings', query: { tab: `notifications` } }">
                <button :class="active_tab == 3 ? 'active_tab':''" class="tab_button">Notifications</button>
            </RouterLink>

            <RouterLink :to="{path: '/in/settings', query: { tab: `payout` } }">
                <button :class="active_tab == 4 ? 'active_tab':''" class="tab_button">Funds Withdrawal</button>
            </RouterLink>

            <RouterLink :to="{path: '/in/settings', query: { tab: `verification` } }">
                <button :class="active_tab == 5 ? 'active_tab':''" class="tab_button">ID & Verification</button>
            </RouterLink>
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
                    <p class=" text-red-700 bg-red-500 bg-opacity-10 rounded-lg p-3">
                    <strong>Warning</strong><br/>
                    <span>Deleting your account cannot be undone. Any personally identifiable information will be deleted and any in-progress data will be lost.</span>
                    </p>
                    <button disabled type="button" @click="requested_account_delete = !requested_account_delete" class=" bg-red-500 text-white hover:bg-red-700 rounded-md p-3 mt-3">Delete Account</button>
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
                <div class="text-gray-500">
                    All email notifications are sent to: {{ user.email }}
                </div>
                <div class=" flex flex-row items-center justify-between">
                    
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
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-3">
                        <p class="font-bold">Current Balance</p>
                        <Skeleton v-if="loading_wallet" height="50px" width="220px"/>
                        <div class="text-2xl font-bold flex flex-row gap-1 items-center">
                            <div class="p-3 bg-gray-800 rounded-full flex justify-center items-center w-[50px] h-[50px] text-white">₦</div>
                            <span class="inline-block text-4xl"> {{ account_balance.toLocaleString() }}.00</span>
                        </div>
                    </div>

                    <!-- card details -->
                    <div class="flex flex-row flex-wrap gap-12">
                        <div class="flex flex-col gap-4">
                            <span class="font-bold">Account Details</span>
                            <div class="flex flex-row flex-wrap gap-12 overflow-x-auto">

                                <!-- LOADER -->
                                 <!-- <Skeleton height="215px" width="360px" v-for="card in 2"/> -->
                                 
                                <!-- CARD 1 -->
                                <div v-if="user.settings.bank" @click="edit_card_details = !edit_card_details" class="card h-[215px] w-[360px] rounded-lg bg-blue-600 flex flex-col p-5 justify-between cursor-pointer uppercase text-white">
                                    <div class="text-sm opacity-60">{{ user.settings.bank.name }}</div>
                                    <div class="text-3xl">{{ user.settings.bank.account_number }}</div>
                                    <div class="flex flex-col">
                                        <span class=" text-sm opacity-60">ACCOUNT NAME</span>
                                        <span class=" capitalize text-xl">{{ user.firstname }} {{ user.lastname }}</span>
                                    </div>
                                </div>
                                <!-- <div class="card h-[215px] w-[360px] rounded-lg bg-green-600"></div> -->
                            </div>
                        </div>
                        <div>
                            <div class="flex flex-col gap-4 bg-gray-50 dark:bg-gray-700 p-6 sm:w-full rounded-lg md:max-w-[300px]">
                                <span class="dark:bg-gray-800 bg-slate-300 text-center font-bold rounded-lg p-3">Notice on Payment</span>
                                
                                <ol start="1" class=" list-decimal p-3">
                                    <li>All available funds will be sent to provided bank card details only when withdrawal has been requested</li>
                                    <li>Funds Withdrawal is only available on weekends</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <!-- Actions... -->
                    <div class="flex flex-row flex-wrap gap-6">
                        <div class="flex flex-col gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <span class="font-bold">Actions</span>
                            <div class="flex flex-row flex-wrap gap-20 items-start md:justify-start justify-center px-12">
                                <!-- <button @click="withdraw_funds_modal = !withdraw_funds_modal" type="button" class="action-btn"> -->
                                <button @click="requested_withdrawal = !requested_withdrawal" type="button" class="action-btn">
                                    <i class="bi bi-cash-stack p-3 action-icon"></i>
                                    <span>Request Withdrawal</span>
                                </button>

                                <button type="button" @click="edit_card_details = !edit_card_details" class="action-btn">
                                    <i class="bi bi-arrow-repeat p-3 action-icon"></i>
                                    <span>Update Card Details</span>
                                </button>

                                <button type="button" class="action-btn">
                                    <i class="bi bi-plus-lg p-3 action-icon"></i>
                                    <span>Add New Account</span>
                                </button>


                                <!-- <button type="button" class="action-btn">
                                    <i class="bi bi-plus-lg p-3 action-icon"></i>
                                    <span>Add New Account</span>
                                </button> -->

                            </div>
                        </div>
                        <div class="flex flex-col gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 w-full md:w-full">
                            <span class="font-bold">Recent Transactions</span>
                            
                            <div class="overflow-x-auto max-w-screen-lg" v-if="transactions.length > 0">
                                <!-- LOADER -->
                                <!-- <Skeleton height="20px" width="500px"/> -->
                                <div v-for="(transaction, index) in transactions" class="flex flex-row justify-between items-center  w-[500px]" :key="index">
                                    <span>{{ transaction.date }} </span>
                                    <span>{{ transaction.status }}</span>
                                    <span>NGN {{ transaction.amount.toLocaleString() }}</span>
                                </div>
                            </div>
                            <div v-else class=" h-28 w-full flex justify-center items-center text-center"> No recent transactions </div>
                        </div>
                    </div>
                </div>
            </form>

            

            <!-- ID & VERIFICATION -->
            <form @submit.prevent="verifyUserNow"  v-if="active_tab == 5" class="section mb-3">
                
                <div class="mt-3">
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>Your valid NIN and selfie image would be used for verifying your account once provided, please make sure your account name matches the name on your NIN profile, make sure to upload a very visible passport photograph</div>
                    </div>
                    <!-- {{ settings.KYC }} -->
                    <h1 class="font-bold mb-3 text-lg capitalize">Identity verification</h1>
                    <div class="flex flex-col-reverse gap-5">

                    
                        <div class=" ">
                            <label for="nin-number">NIN Number</label>
                            <div class="flex flex-row items-center gap-3">
                                <div class="flex flex-col w-full relative">
                                    <input class="form_input" type="text" name="nin-number" id="nin-number" placeholder="your 11 digits NIN number" v-model="settings.KYC.NIN_number" :disabled="settings.KYC.is_verified">
                                    <span class="text-3xl absolute  right-3 top-2">
                                        <i v-if="settings.KYC.is_verified" class="bi bi-person-check text-green-400"></i>
                                        <i v-else class="bi bi-person-fill-exclamation text-red-500"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div v-if="!settings.KYC.is_verified">
                            <span>Passport Image</span>
                            
                            <div class="flex flex-row gap-6"> 
                                <div>
                                    <label class="image-upload-box relative" >
                                        
                                        <input
                                            type="file"
                                            ref="fileInput"
                                            @change="onFileChange"
                                            accept="image/*;capture=camera"
                                            style="display: none"
                                        />
                                        <div v-if="imageUrl" class="overflow-hidden">
                                            <img :src="imageUrl" alt="Captured image preview" class="preview-image" />
                                        </div>
                                        <div v-else class="select-image-text">upload passport</div>
                                        <div v-if="verifying_loading" class=" size-[200px] bg-[rgba(0,0,0,0.5)] left-0 absolute flex justify-center items-center">
                                            <SpinnerComponent/>
                                        </div>
                                    </label>
                                    <p v-if="errorMessage" class="error-message text-red-500 p-3">{{ errorMessage }}</p>
                                </div>   
                                <!-- <img class="size-[200px]" src="../../assets/images/img_placeholder_avatar.jpg"/> -->
                            </div>


                            <div class="text-yellow-500 bg-opacity-10 bg-yellow-500 p-3 flex flex-row items-center justify-start gap-3 rounded-md mt-3 border border-yellow-500 ">
                                <i class="bi bi-exclamation-triangle-fill "></i>
                                <span>
                                    make sure your face shows clearly and your passport was taken in a well lit background
                                </span>
                            </div>
                            <!-- <p v-if="base64Image" class="base64-output">Base64 String: {{ base64Image }}</p> -->
                        </div>

                    </div>

                    <div class="mt-3">
                        <span v-if="settings.KYC.is_verified && !verifying_loading">Verified Successfully on {{ format(settings.KYC.verified_on, 'PPpp') }}</span>
                    </div>

                    <button type="submit" class="btn mt-3" :disabled="settings.KYC.is_verified || verifying_loading">
                        <span v-if="verifying_loading">verifying...</span>
                        <span v-if="!verifying_loading && !settings.KYC.is_verified">Verify now</span>
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

// import ngBanks from 'ng-banks';
import Skeleton from 'primevue/skeleton';

import SpinnerComponent from '../../components/SpinnerComponent';
import { WebCamUI } from 'vue-camera-lib';

import { format } from 'date-fns';



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
        Dropdown,
        Skeleton,
        WebCamUI,
        SpinnerComponent
    },
    data(){
        return{
            // ngBanks,
            format,
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
            active_tab: 2,

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
                    code: '',
                    account_number: '',
                    account_name: '',
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
            withdrawal_amount: 0,

            edit_card_details: false,
            withdraw_funds_modal: false,

            loading_wallet: false,
            withdrawal_amount_error: false,

            imageUrl: null,
            errorMessage: null,
            base64Image: null,
            maxFileSize: 2 * 1024 * 1024, // 2MB in bytes
            verifying_loading: false,
            requested_account_delete: false,
            verify_modal: false,

            transactions: [],
        }
    },
    methods:{
        // get all user contracts...
        // triggerFileInput() {
        //     this.$refs.fileInput.click();
        // },

        onFileChange(event) {
            const file = event.target.files[0];
            this.errorMessage = null;
            this.base64Image = null;

            if (file) {
                if (!file.type.startsWith("image/")) {
                this.errorMessage = "Please select a valid image file.";
                } else if (file.size > this.maxFileSize) {
                this.errorMessage = "Image size should not exceed 2MB.";
                } else {
                this.imageUrl = URL.createObjectURL(file);
                this.convertToBase64(file);
                }
            }
        },

        convertToBase64(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Remove the prefix from the Base64 string
                const base64String = e.target.result;
                this.base64Image = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
            };
            reader.readAsDataURL(file);
        },

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

        setBankCode() {
            const bank = this.banks.find(b => b.name === this.bank.name);
            this.bank.code = bank ? bank.code : '';
            this.settings.bank.name = this.bank.name;
            this.settings.bank.sort_code = this.bank.code;
        },

        checkBalance(){
            if(this.withdrawal_amount > this.account_balance){
                // this.withdrawal_amount = 0
                this.withdrawal_amount_error = true;
            } else {
                this.withdrawal_amount_error = false;
            }
        },

        async getBanks(){
            try{
                this.loading = true;
                // const response = await axios.get(`${this.api_url}/contracts/banks/list`);
                const response = await axios.get(`${this.api_url}/contracts/banks/list`);
                console.log("bank lists: ", response);
                // this.banks = response.data.banks;
                this.banks = response.data.result.detail.data;
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
                this.loading_wallet = true;
                const headers = this.headers;
                const response  = await axios.get(`/wallets/info`, { headers });
                console.log("user wallet: ", response.data.wallet);
                this.account_balance = response.data.wallet.balance;
                // get only first five wallet transactions...
                this.transactions = response.data.wallet.transactions.splice(0, 5);
                this.loading_wallet = false;
            }catch(error){
                this.loading_wallet = false;
                console.error("erro getting user wallet: ", error);
            }
        },


        async updateUserAccount(){
            this.loading = true;
            const headers = this.headers;
            try{
                const form = this.settings.bank;
                const response = await axios.patch(`${this.api_url}/user/bank/update`, form, { headers });
                this.toast.success(response.data.message);
                console.log("res from bank update: ", response);
                this.loading = false;
                this.edit_card_details = false;
            }catch(error){
                this.toast.error(error.response.data.message);
                console.log("erro updating user bank: ", error);
                this.loading = false;
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
                this.withdraw_funds_modal = response.data.authenticated;
                this.fwp_password = ''
                // this.toast.info(response.data.message);
            }catch(error){
                // console.log("problem with pass checker: ", error)
                this.requested_withdrawal = false,
                this.fwp_password = ''
                this.toast.error(error.response.data.message);
            }
        },

        async instantWithdrawFunds(){
            try{
                const headers = this.headers;
                const response = await axios.post(`${this.api_url}/funds/withdraw`, { amount: this.withdrawal_amount }, { headers });
                this.toast.success(response.data.message);
                this.withdraw_funds_modal = !this.withdraw_funds_modal;
            }catch(error){
                this.toast.error(error.response.data.message);
            }
        },

        async verifyUserNow(){
            try{
                this.verifying_loading = true;
                const headers = this.headers;
                const payload = {
                    nin: this.settings.KYC.NIN_number,
                    selfie_image: this.base64Image
                }
                const response = await axios.post('/user/KYC/verify', payload, { headers } );
                this.toast.success(response.data.message);
                window.location.reload();
                this.verifying_loading = false;
                console.log("verification results: ", response);
            }catch(error){
                this.toast.error(`${error.response.data.message}`);
                this.verifying_loading = false;
                console.log("error in verif: ", error)
            }
        },

        photoTaken(data) {
            console.log('image blob: ', data.blob)
            console.log('image data url', data.image_data_url)
        },
       
    },
    computed(){

    },

    updated(){
        
        if(this.$route.query.tab == 'profile'){
            this.active_tab = 2;
        } else if (this.$route.query.tab == 'notifications'){
            this.active_tab = 3
        } else if(this.$route.query.tab == 'payout'){
            this.active_tab = 4;
        } else if(this.$route.query.tab == 'verification'){
            this.active_tab = 5;
        }
    },

    created(){
        this.theme();
        this.getUserData();
            
        // this.getBanks();
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


    .card{
        background: url('../../assets/images/card-blue.png');
        background-size: cover;
        background-position: center;
    }


    .formSlide-enter-active, .formSlide-leave-active {
        transition: all 0.5s;
        opacity: 1;
    }
    .formSlide-enter-from, .formSlide-leave-to {
        opacity: 0;
        padding-bottom: 50px;
    }


    .action-icon{
        @apply justify-center items-center flex rounded-full bg-blue-50 dark:bg-blue-400 text-blue-500 h-[50px] w-[50px]
    }

    .action-btn{
        @apply flex flex-col gap-3 justify-center items-center text-center font-bold
    }


    .image-upload-box {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
}

.select-image-text {
  font-size: 16px;
  color: #777;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
}
</style>