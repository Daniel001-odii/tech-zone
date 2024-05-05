<template>
    <div>
        <PageTitle>Task Watch</PageTitle>
        {{ timer_error }}
        <div class="flex flex-col flex-wrap p-5 items-start justify-start gap-3">
            <div class="bg-tz_light_blue text-blue-500 p-3 rounded-md" v-if="contract">{{ contract.job.title }}</div>

            <div class="flex flex-row flex-wrap items-center gap-5 mt-3">
                <div class="p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700">{{ current_date }}</div>

                <div class="bg-tz_blue hover:bg-tz_dark_blue rounded-full w-[300px] flex flex-row items-center p-[3px] justify-between">
                    <div class="flex flex-row gap-5 bg-white dark:bg-gray-700 h-full p-2 rounded-l-full px-4">
                        <i class="bi bi-stopwatch"></i>
                        <span v-if="timer_loading" class="text-sm text-yellow-500">loading...</span>
                        <span v-else>{{ formatTime }}</span>
                       
                        <button >
                            <!-- <i v-if="timer_loading" class="bi bi-arrow-clockwise"></i> -->
                            <i v-if="timerRunning" @click="pauseTimer" class="bi bi-pause-fill"></i>
                            <i v-if="!timerRunning" class="bi bi-play-circle-fill"></i>
                        </button>
                    </div>
                    <button @click="startServerTime" class="mx-auto my-0 text-white text-sm font-medium flex items-center gap-5">
                        Clock in
                        
                    </button>
                </div>
            </div>

            <!-- <p>{{ formatTime }}</p>
            <button @click="toggleTimer">{{ timerRunning ? 'Pause' : 'Play' }}</button> -->


            <div class="flex flex-row flex-wrap gap-3">

                <!-- CLOCK IN AND COCK OUT TIME -->
                <div class="flex flex-row md:flex-col gap-3 w-full md:w-fit">
                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock in time</span>
                        <span class="font-medium">{{ clock_in_time }}</span>
                    </div>

                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock out time</span>
                        <span class="font-medium">
                            00:00:00 am
                        </span>
                    </div>
                </div>

                <!-- OTHER ITEMS -->
                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">WORKED TODAY</span>
                    <p class="text-[30px]">{{ formatTime }}</p>
                    <span class="text-green-500 text-[10px]">
                        <i class="bi bi-caret-up-fill"></i>
                        00:00:00
                    </span>
                </div>

                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">WORKED THIS WEEK</span>
                    <p class="text-[30px]">00:00:00</p>
                    <span class="text-red-500 text-[10px]">
                        <i class="bi bi-caret-down-fill"></i>
                        00:00:00
                    </span>
                </div>

                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">DAYS WORKED</span>
                    <p class="text-[30px]">0</p>
                    <span class="text-green-500 text-[10px]">
                        <i class="bi bi-caret-up-fill"></i>
                        0
                    </span>
                </div>

            </div>

            <div class="flex flex-row flex-wrap justify-start overflow-x-auto gap-3">
                <button class="flex flex-row gap-3 border p-3 rounded-md hover:bg-tz_light_blue">
                    <i class="bi bi-sliders"></i>
                    <span>Filter</span>
                </button>
                <button class="btn w-fit">Last 2 weeks</button>
                <button class="bg-tz_light_blue p-3 rounded-lg text-tz_blue">Last 5 months</button>
            </div>

            <div class=" bg-gray-100 dark:bg-gray-700 w-full min-h-80">
                <BarChart :chartData="testData" :options="options"/>
            </div>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import PageTitle from '@/components/PageTitle.vue';

import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { convertTimeToAMPM } from '@/utils/dateFormat';


    export default {
        name: "TaskWatchPageView",
        components: {
            PageTitle,
            Chart,
            BarChart
        },
        data(){
            return{
                current_date: '',
                startTime: null,
                elapsedTime: 0,
                timerRunning: false,
                timerInterval: null,

                contract: '',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`
                },

                // config values for chart...
                options: {
                    responsive: true,
                    plugins: {
                    
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Hours worked per day',
                        },
                        grid: {
                            display: false,
                        }
                    },
                  
                },

                timer_error: '',
                timer_loading: false,
                task_description: 'Starting for the day',

                server_time: '',
                convertTimeToAMPM,
                clock_in_time: '',
                clock_out_time: '',

                // data values for chart...
                testData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [
                    {
                        label: 'Day',
                        data: [2, 12, 5, 9, 7, 2, 12, 5, 9, 7],
                        backgroundColor: ['#81AAEA', '#4E79BC', '#4E79BC', '#81AAEA', '#4E79BC', '#4E79BC', '#4E79BC', '#4E79BC', '#4E79BC', '#4E79BC'],
                    },
                ],
                },
            }
        },
        methods:{
            getCurrentDate() {
                const dateObject = new Date(); // Create a new Date object
                const formattedDate = dateObject.toDateString(); // Get the date in a human-readable format
                this.current_date = formattedDate; // Update current_date with the formatted date
            },

            toggleTimer() {
                if (this.timerRunning) {
                    this.pauseTimer();
                } else {
                    this.startTimer();
                }
            },

            startTimer() {
                this.startTime = Date.now() - this.elapsedTime;
                this.timerInterval = setInterval(this.updateTimer, 1000);
                this.timerRunning = true;
            },

            startRealTimer() {
                this.startTime = this.server_time - this.elapsedTime;
                console.log("server time :", this.server_time);
                this.timerInterval = setInterval(this.updateTimer, 1000);
                this.timerRunning = true;
            },

            pauseTimer() {
                clearInterval(this.timerInterval);
                this.timerRunning = false;
            },

            updateTimer() {
                this.elapsedTime = Date.now() - this.startTime;
            },

            updateTimer2() {
                this.elapsedTime = this.server_time - this.startTime;
            },

            async getContract(){
                const headers = this.headers;
                try{
                    const response = await axios.get(`${this.api_url}/contracts/${this.$route.params.contract_id}`, { headers });
                    // console.log(response);
                    this.contract = response.data.contract;
                }catch(error){
                    console.log(error);
                    if(error.response.status == 404){
                        this.$router.push("/404");
                    }
                }
            },

            async startServerTime(){
                try{
                    const form = {
                        activity_description: this.task_description
                    };

                    this.timer_loading = true;
                    const response = await axios.post(`${this.api_url}/watch/${this.$route.params.contract_id}/start`, form);
                    console.log("started timer for contract: ", response);
                    this.timer_loading = false;
                    const TIME = response.data.time_tracking.time_stamp.start_time;
                    const TIME_OBJECT = new Date(TIME);
                    this.server_time = TIME_OBJECT.getTime();

                    // now start the counter
                    this.startRealTimer();
                }catch(error){
                    this.timer_error = error;
                    this.timer_loading = false;
                }
            },

            async getServerTime(){
                try{
                    this.timer_loading = true;
                    const response = await axios.get(`${this.api_url}/watch/${this.$route.params.contract_id}/today`);
                    console.log("today's log: ", response);

                    if(response.data.watch.time_stamp.start_time){
                        const TIME = response.data.watch.time_stamp.start_time;
                        const TIME_OBJECT = new Date(TIME);
                        this.server_time = TIME_OBJECT.getTime();

                        // set clock in time...
                        this.clock_in_time = this.convertTimeToAMPM(TIME);

                        this.startRealTimer();
                    } else {
                        
                        // set default clock in time...
                        this.clock_in_time = "0:00:00"
                    }
                    this.timer_loading = false;

                  

                }catch(error){
                    console.log("error in getting server time: ", error);
                    this.timer_loading = false;
                }
            }
        },

        computed: {
            formatTime() {
                // Calculate hours, minutes, and seconds
                const hours = Math.floor(this.elapsedTime / (60 * 60 * 1000));
                const minutes = Math.floor((this.elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
                const seconds = Math.floor((this.elapsedTime % (60 * 1000)) / 1000);

                // Format the time as HH:MM:SS
                return `${hours}:${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
            }
        },

        mounted(){
            this.getCurrentDate();
            this.getContract();
            this.getServerTime();
        },


        beforeUnmount() {
            clearInterval(this.timerInterval);
        },
    }
</script>

<style scoped>
    .stat_card{
        @apply border flex flex-col gap-2 p-2 rounded-md justify-center dark:bg-gray-800 dark:border-gray-700
    }
</style>