<template>
    <h1 class="text-3xl font-bold">Early Users</h1>
    <div>
        <div class=" mt-8">
            <h1 class="text-xl font-bold">All Early Users [{{ this.users.length }}]</h1>
            
            <p class="text-red-500">{{ error }}</p>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">

              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
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
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
                <!-- <button  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User profile</button> -->
                
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { getDay } from 'date-fns';
import { format } from 'date-fns';

export default {
    name: "AdminEarlyUsers",
    data(){
        return {
            users: '',
            error: '',
            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
            getDay,
            format,
        }
    },
    methods: {

        formattedDate(dateString){
            const date = new Date(dateString);
            const day = this.format(date, 'd');
            const month = format(date, 'MMM');
            return `${month} - ${day}`
        },

        async getUsers(){
            try{
                const response = await axios.get('/admin/early_users/all', { headers: this.headers });
                this.users = response.data.users;
            }catch(error){
                this.error = error;
            }
        }
    },

    created(){
        this.getUsers();
    }

}
</script>

<style scoped>

</style>