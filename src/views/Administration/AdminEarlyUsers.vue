<template>
    <Modal v-show="email_compose_modal"
        :name="'Compose Bulk Email'"
        :modal_active="true"
    >
    <template #body>
        <div class="flex flex-col w-[600px]">
            <form class="flex flex-col gap-8" @submit.prevent="sendBulkEmail">
                <!-- <p>html content: {{ readableHTML }}</p> -->
                <div class="flex flex-row gap-1 items-center">
                    <span class="mr-6">to: </span>
                    <div v-if="selectedEmails.length <= 2" class="p-3 rounded-lg text-sm bg-blue-500 bg-opacity-30 text-blue-400" v-for="mail in selectedEmails">{{ mail }}</div>
                    <div v-else  class="flex flex-row gap-1 items-center">
                        <span class="p-3 rounded-lg text-sm bg-blue-500 bg-opacity-30 text-blue-400" v-for="mail in selectedEmails.slice(0, 2)">{{ mail }}</span>
                        <!-- <span class="p-3 rounded-lg text-sm bg-blue-500 bg-opacity-30 text-blue-400">{{ selectedEmails[1] }}</span> -->
                        <span class="p-3 rounded-lg text-sm bg-blue-500 bg-opacity-30 text-blue-400"> + {{ selectedEmails.length - 2 }} more</span>
                    </div>
                </div>
                <p class="text-red-500">{{ error }}</p>
                <label class="flex flex-col">
                    <span class="text-xl mb-3">Email Subject</span>
                    <input type="text" class="form_input text-xl p-3" v-model="mail.subject"/>
                </label>
                <label class="flex flex-col">
                    <span class="text-xl mb-3">Email Body</span>
                    <!-- <textarea type="textarea" class="form_input text-xl p-3 h-40" v-model="mail.body"></textarea> -->
                    <div ref="editor"></div>
                </label>
            </form>
        </div>
    </template>
    <template #footer>
        <div>
            <button @click="sendBulkEmail" class="btn">
                <span v-if="sending_email">working...</span>
                <span v-else>Send</span>
            </button>
        </div>
    </template>
      
    </Modal>
    <h1 class="text-3xl font-bold">Early Users ({{ this.response.total }})</h1>
    <div class="w-full h-full flex items-center justify-center" v-if="loading">
        <SpinnerComponent/>
    </div>
    <div v-else>
        <div class=" mt-8">
    
            <div class="flex flex-row w-full mt-6 p-5 items-center justify-between bg-gray-800 bg-opacity-80 rounded-md border-opacity-10">
                <p class="text-2xl font-bold">Send Email Alert</p>
                <button class="btn" @click="openEmailModal">+ New Email</button>
            </div>

            <div class="flex flex-row gap-3 items-center p-3 text-orange-300">
                <input type="checkbox" v-model="is_bulk_email" @change="markAllUsers"/>
                <span>Send To Everyone</span>
            </div>
          <!--   <div>limit: {{ response.limit }}</div>
            <div>total: {{ response.total }}</div> -->

            <p class="text-red-500">{{ error }}</p>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" @change="selectAllEmails($event)"  type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Onboard Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Provider
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, user_id) in users" :key="user_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input :value="user.email" v-model="selectedEmails" id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                           
                            <td class="px-6 py-4">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4">
                              {{ formattedDate(user.createdAt) }}
                            </td>
                            <td class="px-6 py-4">
                              {{ user.provider}}
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                    </tbody>
            </table>

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


import Quill from "quill";
// import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import SpinnerComponent from '@/components/SpinnerComponent.vue';
// import "quill/dist/quill.snow.css";

export default {
    name: "AdminEarlyUsers",
    components: {
        Modal,
        SpinnerComponent
    },
    data(){
        return {
            users: '',
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
            email_compose_modal: false,
            sending_email: false,
            useToast,
            toast: useToast(),
            is_bulk_email: false,

            editor: null,
            modelValue: '',
            readableHTML: '',
            loading: false,
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
                /* setTimeout(2000,
                this.loadQuill()) */
            }
        },

        async getNextUsers(){
            try{
                if(this.page < this.response.pages){
                    this.page ++;
                    const response = await axios.get(`/admin/early_users/all?page=${this.page}&limit=${this.page_limit}`, { headers: this.headers });
                    this.users = response.data.users;
                    this.response = response.data;
                    console.log("users: ", this.users);

                    this.emails = []
                    this.users.map(user =>{this.emails.push(user.email)})
                }
               
            }catch(error){
                this.error = error;
            }
        },

        async getPrevUsers(){
            try{
                if(this.page > 0){
                    this.page --;
                    const response = await axios.get(`/admin/early_users/all?page=${this.page}&limit=${this.page_limit}`, { headers: this.headers });
                    this.users = response.data.users;
                    this.response = response.data;
                    console.log("users: ", this.users);
                    this.emails = []
                    this.users.map(user =>{this.emails.push(user.email)})
                }
               
            }catch(error){
                this.error = error;
            }
        },

        async getUsers(){
            try{
                this.loading = true;
                const response = await axios.get(`/admin/early_users/all?limit=${this.page_limit}`, { headers: this.headers });
                this.users = response.data.users;
                this.response = response.data;

                this.users.map(user =>{this.emails.push(user.email)});
                this.loading = false;
                // this.emails = this.users.map(user =>{user})
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

        update: function update() {
            this.$emit(
                "update:modelValue",
                this.editor.getText() ? this.editor.root.innerHTML : ""
            );
            this.readableHTML = this.editor.getSemanticHTML();
            this.mail.body = this.editor.getSemanticHTML();
        },

        
    },

    mounted() {
       
        // loadQuill(){
            var _this = this;
        
            this.editor = new Quill(this.$refs.editor, {
                modules: {
                    toolbar: [
                    [
                        {
                        header: [1, 2, 3, 4, true],
                        },
                    ],
                    ["bold", "italic", "underline", "link"],
                    ],
                },
                //theme: 'bubble',
                theme: "snow",
                formats: ["bold", "underline", "header", "italic", "link"],
                placeholder: "Type something in here!",
            });
            this.editor.root.innerHTML = this.modelValue;
            this.editor.on("text-change", function () {
                return _this.update();
            });

        // },
  
    },

    created(){
        this.getUsers();
    }

}
</script>

<style scoped>

</style>