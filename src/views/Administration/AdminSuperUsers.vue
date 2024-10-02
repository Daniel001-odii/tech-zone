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

    <h1 class="text-3xl font-bold">All Administrators ({{ this.response.total }})</h1>
    <div>
        <div class=" mt-8">
    
    

            <p class="text-red-500">{{ error }}</p>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">


            <div class="flex py-5 w-full items-end justify-end">
                <button class="btn" @click="add_new_user_modal = !add_new_user_modal">+ Add New User</button>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" @change="selectAllEmails($event)"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <!-- <th scope="col" class="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    State
                                </th> -->
                                <th scope="col" class="px-6 py-3">
                                    Joined
                                </th>
                               
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, user_id) in employers" :key="user_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input :value="user.email" v-model="selectedEmails" id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>

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
                                    <span v-if="user.createdAt">{{ formattedDate(user.createdAt) }}</span>
                                    <span v-else>{{ formattedDate(user.created) }}</span>
                                </td>
                        
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                        </tbody>
                </table> 
            </div>

            <div>page: {{ response.page }} of {{ response.pages}}</div>

            <!-- PAGINATION -->
            <div class="flex flex-row-reverse justify-between p-3 bg-gray-800 bg-opacity-80 rounded-md my-3">
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
                
            </div>

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

export default {
    name: "AdminSuperUsers",
    components: {
        Modal,
    },
    data(){
        return {
            employers: '',
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

            invite_error: ''
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

        async getNextUsers(){
            try{
                if(this.page < this.response.pages){
                    this.page ++;
                    const response = await axios.get(`/admin/employers/all?page=${this.page}&limit=${this.page_limit}`, { headers: this.headers });
                    this.employers = response.data.employers;
                    this.response = response.data;
                    console.log("employers: ", this.employers);

                    this.emails = []
                    this.employers.map(user =>{this.emails.push(user.email)})
                }
               
            }catch(error){
                this.error = error;
            }
        },

        async getPrevUsers(){
            try{
                if(this.page > 0){
                    this.page --;
                    const response = await axios.get(`/admin/employers/all?page=${this.page}&limit=${this.page_limit}`, { headers: this.headers });
                    this.employers = response.data.employers;
                    this.response = response.data;
                    console.log("employers: ", this.employers);
                    this.emails = []
                    this.employers.map(user =>{this.emails.push(user.email)})
                }
               
            }catch(error){
                this.error = error;
            }
        },

        async getUsers(){
            try{
                const response = await axios.get(`/admin/employers/all?limit=${this.page_limit}`, { headers: this.headers });
                this.employers = response.data.employers;
                this.response = response.data;

                this.employers.map(user =>{this.emails.push(user.email)})
                // this.emails = this.employers.map(user =>{user})
            }catch(error){
                this.error = error;
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

</style>