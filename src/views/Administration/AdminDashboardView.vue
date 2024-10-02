<template>
    <div class=" p-8">
        <h1 class="text-3xl font-bold">Dashboard</h1>

        <!-- TOP SIDE FOR MAINPAGE -->
        <div class="flex flex-row flex-wrap gap-3 mt-6">
           <!--  <AdminStat class=" bg-purple-100"
            :title="'Early Users in Waitlist'"
            :value="count.users"
            :iconColor="'bg-yellow-500'"
            >
                <i class="bi bi-person-check"></i>
            </AdminStat> -->

            <AdminStat class=" bg-purple-100"
            :title="'Total Registered Users'"
            :value="count.users"
            :iconColor="'bg-purple-500'"
            >
                <i class="bi bi-person-check"></i>
            </AdminStat>

            <AdminStat class=" bg-orange-100"
            :title="'Total Registered Employers'"
            :value="count.employers"
            :iconColor="'bg-orange-500'"
            >    <i class="bi bi-building-check"></i>
            </AdminStat>

            <AdminStat class=" bg-green-100"
            :title="'Total Jobs Posted'"
            :value="count.jobs"
            :iconColor="'bg-green-500'"
            >    <i class="bi bi-briefcase"></i>
            </AdminStat>

            <AdminStat class=" bg-blue-100"
            :title="'Total Job Applications'"
            :value="count.applications"
            :iconColor="' bg-blue-500'"
            >    <i class="bi bi-send-check"></i>
            </AdminStat>

            <AdminStat class=" bg-blue-100"
            :title="'Total Contracts'"
            :value="count.contracts"
            :iconColor="' bg-blue-500'"
            >    <i class="bi bi-gift"></i>
            </AdminStat>

            <AdminStat class=" bg-pink-100"
            :title="'Total Admin Users'"
            :value="count.administrators"
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
                                Location (state)
                            </th>
                            <th scope="col" class="px-6 py-3">
                               Account Status
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
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                </div>
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
                                Location (state)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Account Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(employer, employer_id) in employers" :key="employer_id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
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
            count: {},
            admin: '',

            jobs: '',
            employers: '',
            applications: '',
            contracts: '',
            users: '',
            users_count: 0,

            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
            },
        }
    },

    methods: {
        // async getAllJobs(){
        //     const headers = this.headers;

        //     try{
        //         const response = await axios.get(`${this.api_url}/jobs`);
        //         this.jobs = response.data.jobs;
        //     }catch(error){

        //     }
        // },
        

        async getAllRecordsCount(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/admin/count/all`, { headers});
                this.count = response.data.count;
                console.log(" records count :", this.count)
            }catch(error){

            }
        },

        async getAllUsers(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/admin/users/all`, { headers});
                this.users = response.data.users;
                this.users_count = response.data.total;
                console.log(" users :", response.data)
            }catch(error){

            }
        },


        async getAllEmployers(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/admin/employers/all`, { headers});
                this.employers = response.data.employers;
                console.log(" admin employers :", this.employers)
            }catch(error){

            }
        },

        // async getAllContracts(){
        //     const headers = this.headers;
        //     try{
        //         const response = await axios.get(`${this.api_url}/admin/contracts/all`, { headers});
        //         this.contracts = response.data.contracts;
        //         console.log(" admin contracts :", this.contracts)
        //     }catch(error){

        //     }
        // },
    },

    created(){
        this.getAllRecordsCount();
        // this.getAllJobs();
        this.getAllUsers();
        this.getAllEmployers();
        // this.getAllContracts();
    }
}
</script>

<style scoped>

</style>