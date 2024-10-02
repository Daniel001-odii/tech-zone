<template>
    <Modal v-show="add_new_user_modal"
        :name="'Add a new user'"
        :modal_active="true"
    >
    <template #body>
        <!-- {{ new_user }} -->
        <div class="flex flex-col w-[600px]">
            <p class="text-red-500 font-bold" v-if="invite_error">Invite Error: {{ invite_error }}</p>
            <form class="flex flex-col gap-8" @submit.prevent="addNewAdminUser">
            <div class="flex flex-row w-full gap-3 items-stretch">
                <div class="flex flex-col w-full">
                    <span>Firstname</span>
                    <input class="form_input w-full" type="name" v-model="new_user.firstname" placeholder="firstname"/>
                </div>
                <div class="flex flex-col w-full">
                    <span>Lastname</span>
                    <input class="form_input w-full" type="name" v-model="new_user.lastname" placeholder="lastname"/>
                </div>
            </div>
            <div class="flex flex-col">
                <span>Email</span>
                <input class="form_input w-full" type="email" v-model="new_user.email" placeholder="johndoe@gmail.com"/>
            </div>
            <div class="flex flex-row gap-3">
                <div class="flex flex-col w-full">
                    <span>Password</span>
                    <input type="password" class="form_input w-full" v-model="new_user.password" placeholder="password"/>
                </div>
                <div class="flex flex-col w-full">
                    <span>Password Confirmation</span>
                    <input type="password" class="form_input w-full" v-model="new_user.password_confirmation" placeholder="password"/>
                </div>
            </div>
            <span class="text-orange-400" v-if="new_user.password != new_user.password_confirmation">Passwords do not match</span>
            <div>
                <select class="form_input w-full" v-model="new_user.role">
                    <option value="" disabled>Select Role</option>
                    <option value="manager">Manager</option>
                    <option value="moderator">Moderator</option>
                    <option value="team-lead">Team-lead</option>
                    <option value="team-member">Team-member</option>
                </select>
            </div>
            </form>
        </div>
    </template>
    <template #footer>
        <div>
            <button @click="addNewAdminUser" class="btn" :disabled="new_user.password != new_user.password_confirmation">
                <span v-if="adding_new_user">working...</span>
                <span v-else>Add New User</span>
            </button>
        </div>
    </template>
      
    </Modal>

    <h1 class="text-3xl font-bold">All Administrators ({{ user_count}})</h1>
    <div class="w-full h-full flex items-center justify-center" v-if="loading">
        <SpinnerComponent/>
    </div>
    <div v-else>
        <div class=" mt-8">
            <p class="text-red-500">{{ error }}</p>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">


            <div class="flex py-5 w-full items-end justify-end">
                <button class="btn" @click="add_new_user_modal = !add_new_user_modal">+ Add New User</button>
            </div>
            <div class="relative overflow-x-auto h-[70vh]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                               <!--  <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" @change="selectAllEmails($event)"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                    </div>
                                </th> -->
                                <th scope="col" class="px-6 py-3 ">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                               
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, user_id) in administrative_users" :key="user_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                               <!--  <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input :value="user.email" v-model="selectedEmails" id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td> -->

                                <td class="px-6 py-4">
                                    <div class="flex flex-row gap-3 items-center w-fit">
                                        <!-- <img :src="user.profile.image_url" class="size-[30px] rounded-full"/> -->
                                        <span> {{ user.username }} </span>
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <RouterLink target="_blank" :to="'#'" class=" hover:text-blue-500 hover:underline">
                                        {{ user.email }}
                                    </RouterLink>
                                </td>

                                <td class="px-6 py-4">
                                    <span v-if="user.role == 'admin'" class="bg-red-700 admin_role">{{ user.role }}</span>
                                    <span v-if="user.role == 'manager'" class="bg-orange-500 admin_role">{{ user.role }}</span>
                                    <span v-if="user.role == 'moderator'" class="bg-yellow-500 admin_role">{{ user.role }}</span>
                                    <span v-if="user.role == 'team-lead'" class="bg-blue-500 admin_role">{{ user.role }}</span>
                                    <span v-if="user.role == 'team-member'" class="bg-gray-500 admin_role">{{ user.role }}</span>
                                </td>
                        
                                <td class="px-6 py-4">
                                   <CustomDropdown>
                                        <template #trigger>
                                            <button class="">
                                                <i class="bi bi-three-dots"></i>
                                            </button>
                                        </template>
                                        <template #menu >
                                            <div class="dark:bg-gray-700 bg-gray-100">
                                                <div class="hover:bg-gray-800 p-3 rounded-sm flex flex-row gap-4">
                                                    <i class="bi bi-person-fill-gear"></i>
                                                    <span>settings</span>
                                                </div>
                                                <div class="hover:bg-gray-800 p-3 rounded-sm flex flex-row gap-4">
                                                    <i class="bi bi-person-fill-down"></i>
                                                    <span>restrict</span>
                                                </div>
                                                <div class="hover:bg-gray-800 p-3 rounded-sm flex flex-row gap-4 text-red-500">
                                                    <i class="bi bi-person-fill-x"></i>
                                                    <span>remove</span>
                                                </div>
                                            </div>
                                        </template>
                                   </CustomDropdown>
                                </td>
                            </tr>
                        </tbody>
                </table> 
            </div>

            <div class=" mt-4">
                <p>Levels/Groups of permission for all administrative levels</p>
                <ol>
                    <li>Level One</li>
                    <li>Level Two</li>
                    <li>Level Three</li>
                </ol>
            </div>


            <!-- PAGINATION -->
            <!-- <div class="flex flex-row-reverse justify-between p-3 bg-gray-800 bg-opacity-80 rounded-md my-3">
                <div class="flex flex-row gap-3">
                    <button class="btn" @click="getPrevUsers"><</button>
                    <button class="btn" @click="getNextUsers">></button>
                </div>

                <div class="flex flex-row gap-3 justify-center items-center">
                    <p>Records per page:</p>
                    <select @change="getUsers" v-model="page_limit" class="bg-gray-300 text-black">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                
            </div> -->

            </div>
            <!-- emails: {{emails}} -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { getDay } from 'date-fns';
import { format } from 'date-fns';

import Modal from '@/components/Modal.vue'
import { useToast } from 'vue-toastification';



import { RouterLink } from 'vue-router';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import CustomDropdown from '@/components/CustomDropdown.vue';


export default {
    name: "AdminSuperUsers",
    components: {
        Modal,
        SpinnerComponent,
        CustomDropdown
    },
    data(){
        return {
            administrative_users: '',
            error: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            getDay,
            format,

            selectedEmails: [],
            isChecked: false,
            response: '',

            page: 1,
            pages: '',
            page_limit: 10,

            emails: [],
            mail: {
                subject: '',
                body: '',
            },
            add_new_user_modal: false,
            adding_new_user: false,
            useToast,
            toast: useToast(),
            is_bulk_email: false,

            editor: null,
            modelValue: '',
            readableHTML: '',

            new_user: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: ''
            },

            invite_error: '',   
            user_count: 0,
        }
    },
    methods: {

        selectAllEmails(event) {
            if (event.target.checked) {
                // If main checkbox is checked, select all emails
                this.selectedEmails = [...this.emails];
            } else {
                // If unchecked, clear the array
                this.selectedEmails = [];
            }
        },

        formattedDate(dateString){
            const date = new Date(dateString);
            const day = this.format(date, 'd');
            const month = format(date, 'MMM');
            return `${month} - ${day}`
        },

        markAllUsers(){
            if(this.is_bulk_email){
                this.selectedEmails = [...this.emails];
            } else {
                this.selectedEmails = [];
            }
           
        },

        selectUser(user){
            this.selected_users.push(user.email)
        },

        openEmailModal(){
            if(!this.is_bulk_email &&  this.selectedEmails.length <= 0){
                this.toast.warning("Select atleast one email to proceed");
            } else {
                this.email_compose_modal = !this.email_compose_modal; 
            }
        },


        async getUsers(){
            try{
                this.loading = true;
                const response = await axios.get(`/admin/admins/all?limit=${this.page_limit}`, { headers: this.headers });
                this.administrative_users = response.data.administrative_users;
                this.response = response.data;
                this.loading = false;
                this.user_count = response.data.administrative_users.length
                // this.emails = this.administrative_users.map(user =>{user})
            }catch(error){
                this.error = error;
                this.loading = false;
            }
        },

        async sendBulkEmail(){
            try{
                this.sending_email = true;
                const response = await axios.post('/admin/bulk_email', { emails: this.selectedEmails, mail: this.mail}, { headers: this.headers });
                console.log(" respinse from sent emails: ", response)
                this.sending_email = false;
                this.email_compose_modal = false;
                this.toast.success(response.data.message);
                this.selectedEmails = []; this.mail = {};
            }catch(error){{
                this.error = error.response.data.message;
                this.sending_email = false;
            }}
        },

        async addNewAdminUser(){
            try{
                this.adding_new_user = true;
                const response = await axios.post('/admin/new_user/invite', this.new_user, { headers: this.headers});
                console.log("add new user? ", response);
                this.add_new_user_modal = false;
                this.adding_new_user = false;
                this.toast.success(response.data.message);
            }catch(error){
                console.log("error adding new user: ", error);
                this.invite_error = error.response.data.message;
                this.adding_new_user = false;
            }
        }


        
    },

    mounted() {
    
  
    },

    created(){
        this.getUsers();
    }

}
</script>

<style scoped>
.admin_role{
    @apply  text-white px-2 py-1 rounded-xl;
}
</style>