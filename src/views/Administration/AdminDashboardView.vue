<template>
    <div class=" p-8">
        <h1 class="text-3xl font-bold">Dashboard</h1>

        <!-- TOP SIDE FOR MAINPAGE -->
        <div class="flex flex-row flex-wrap gap-3 mt-6">
            <AdminStat v-if="users"class=" bg-purple-100"
            :title="'Registered Users'"
            :value="users.length"
            :iconColor="'bg-purple-500'"
            >
                <i class="bi bi-person-check"></i>
            </AdminStat>

            <AdminStat class=" bg-orange-100"
            :title="'Registered Employers'"
            :value="6"
            :iconColor="'bg-orange-500'"
            >    <i class="bi bi-building-check"></i>
            </AdminStat>

            <AdminStat v-if="jobs"class=" bg-green-100"
            :title="'Jobs Posted'"
            :value="jobs.length"
            :iconColor="'bg-green-500'"
            >    <i class="bi bi-briefcase"></i>
            </AdminStat>

            <AdminStat class=" bg-blue-100"
            :title="'Job Applications'"
            :value="90"
            :iconColor="' bg-blue-500'"
            >    <i class="bi bi-send-check"></i>
            </AdminStat>

            <AdminStat class=" bg-blue-100"
            :title="'Contracts'"
            :value="90"
            :iconColor="' bg-blue-500'"
            >    <i class="bi bi-gift"></i>
            </AdminStat>

            <AdminStat class=" bg-pink-100"
            :title="'Admin Users'"
            :value="2"
            :iconColor="' bg-pink-500'"
            >    <i class="bi bi-key"></i>
            </AdminStat>
        </div>

        <div class=" mt-8">
            <h1 class="text-xl font-bold">5 Newly Registered Users</h1>
            

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
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
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
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img class="w-10 h-10 rounded-full" :src="user.profile.image_url" alt="Jese image">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{{  user.firstname }} {{ user.lastname }}</div>
                                    <div class="font-normal text-gray-500">{{ user.email }}</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4">
                                {{ user.profile.title }}
                            </td>
                            <td class="px-6 py-4">
                               <span v-if="user.profile.location">{{ user.profile.location.state }}</span> 
                               <span v-else>not available</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class=" mt-8">
            <h1 class="text-xl font-bold">5 Newly Registered Employers</h1>
            

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
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(employer, employer_id) in employers" :key="user_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img class="w-10 h-10 rounded-full" :src="employer.profile.image_url" alt="Jese image">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{{  employer.firstname }} {{ employer.lastname }}</div>
                                    <div class="font-normal text-gray-500">{{ employer.email }}</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4">
                                {{ employer.profile.company_name }}
                            </td>
                            <td class="px-6 py-4">
                               <span v-if="employer.profile.location">{{ employer.profile.location.state }}</span> 
                               <span v-else>not available</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

</div>
</template>

<script>
import AdminStat from '@/components/AdminStat.vue'
import axios from 'axios'



export default {
    name: "AdminTemplateView",
    components: { AdminStat },

    data(){
        return{
            jobs: '',
            employers: '',
            applications: '',
            contracts: '',
            users: ''
        }
    },

    methods: {
        async getAllJobs(){
            try{
                const response = await axios.get(`${this.api_url}/jobs`);
                this.jobs = response.data.jobs;
            }catch(error){

            }
        },

        async getAllUsers(){
            try{
                const response = await axios.get(`${this.api_url}/users/all`);
                this.users = response.data.users;
                // console.log(" admin users :", this.users)
            }catch(error){

            }
        },

        async getAllEmployers(){
            try{
                const response = await axios.get(`${this.api_url}/employers/all`);
                this.employers = response.data.employers;
                console.log(" admin employers :", this.employers)
            }catch(error){

            }
        },
    },

    mounted(){
        this.getAllJobs();
        this.getAllUsers();
        this.getAllEmployers();
    }
}
</script>

<style scoped>

</style>