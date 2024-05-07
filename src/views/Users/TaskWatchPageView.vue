<template>
    <div>
        <PageTitle>Task Watch</PageTitle>
        <span class="text-red-500">{{ timer_error }}</span>
        <div class="flex flex-col flex-wrap p-5 items-start justify-start gap-3">
            <div class="bg-tz_light_blue text-blue-500 p-3 rounded-md" v-if="contract">{{ contract.job.title }}</div>

<button v-if="!clock_in_time" @click="startTaskWatch" class="bg-red-500 text-white p-3">
    <span >Clock in</span>
</button>
<button v-else @click="stopTaskWatch" class="bg-red-500 text-white p-3">
    <span >Clock out</span>
</button>

<!-- {{ stop_time - start_time }}s -->
{{ convertSecondsToWatchFormat }}
<button @click="toggleTaskWatch">
    <span v-if="watch_status == 'active'">pause</span>
    <span v-else>play</span>
</button>

<p>watch status: {{ watch_status }}</p>


            <div class="flex flex-row flex-wrap items-center gap-5 mt-3">
                <div class="p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700">{{ current_date }}</div>

            </div>

            <!-- <p>{{ formatTime }}</p>
            <button @click="toggleTimer">{{ timerRunning ? 'Pause' : 'Play' }}</button> -->


            <div class="flex flex-row flex-wrap gap-3">

                <!-- CLOCK IN AND COCK OUT time -->
                <div class="flex flex-row md:flex-col gap-3 w-full md:w-fit">
                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock in time</span>
                        <span class="font-medium">{{ convertTimeToAMPM(clock_in_time) }}</span>
                    </div>

                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock out time</span>
                        <span class="font-medium">
                            {{ convertTimeToAMPM(clock_out_time) }}
                        </span>
                    </div>
                </div>

                <!-- OTHER ITEMS -->
                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">WORKED TODAY</span>
                    <!-- <p class="text-[30px]">{{ formatTime }}</p> -->
                    <p class="text-[30px]">{{ convertSecondsToWatchFormat }}</p>
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
                watch_status: '',

                convertTimeToAMPM,
                clock_in_time: '',
                clock_out_time: '',

                start_time: '',
                stop_time: '',

                duration: 0,
                durationCounter: '',


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

            startDurationCount(){
                this.durationCounter = setInterval(() => {
                    this.duration += 1
                }, 1000);
            },

            toggleDuration(){
                if(this.watch_status == 'active'){
                    clearInterval(this.durationCounter);
                } else {
                    this.startDurationCount();
                }
               
            },

            formatTimeUnit(unit){
                return unit < 10 ? `0${unit}`:unit;
            },

            convertDateTimeToSecs(date_time){
                const time = new Date(date_time);
                return time.getTime();
            },


            async startTaskWatch(){
                // set timer to 0 for initial state...
                this.duration = 0;

                try{
                    const form = {
                        activity_description: this.task_description
                    };

                    this.timer_loading = true;


                    const response = await axios.post(`${this.api_url}/watch/${this.$route.params.contract_id}/start`, form);
                    // console.log("response from timer watch: ", response);
                    const watch = response.data.watch;

                    // set clock in time...
                    this.clock_in_time = watch.time_stamp.clock_in_time;

                    // set watch status...
                    this.watch_status = watch.status;

                    console.log("watch started: ", watch);

                    // set duration.....
                    this.duration = watch.time_stamp.duration;

                    // start duration counter...
                    this.startDurationCount();


                    
                    this.timer_loading = false;
                }catch(error){
                    this.timer_error = error;
                    this.timer_loading = false;
                }
            },

            async stopTaskWatch(){
                // set timer to 0 for initial state...

                try{
                    const form = {
                        activity_description: this.task_description
                    };

                    this.timer_loading = true;


                    const response = await axios.patch(`${this.api_url}/watch/${this.$route.params.contract_id}/stop`, form);
                    console.log("response from stopppp: ", response);
                    const watch = response.data.watch;

                    // set watch status...
                    this.watch_status = watch.status;

                    // set duration.....
                    this.duration = Math.floor(watch.time_stamp.duration);

                    // set clock out time...
                    this.clock_out_time = watch.time_stamp.stop_time;

                    // clear the current count interval animation..
                    clearInterval(this.durationCounter);
                    
                    this.timer_loading = false;
                }catch(error){
                    this.timer_error = error;
                    this.timer_loading = false;
                }
            },

            async toggleTaskWatch(){
                try{
                    this.timer_loading = true;
                    const response =  await axios.patch(`${this.api_url}/watch/${this.$route.params.contract_id}/toggle`);
                    const watch = response.data.watch;

                    console.log("watch toggled: ", watch);


                    // adjust timer display here...
                    this.duration = Math.floor(watch.time_stamp.duration);
                    this.toggleDuration();

                    // set watch status...
                    this.watch_status = watch.status;

        
                    this.timer_loading = false;
                }catch(error){
                    console.error("error pausing timer: ", error);
                    this.timer_loading = false;
                }
            },

            async getServerTime(){
                try{
                    this.timer_loading = true;
                    const response = await axios.get(`${this.api_url}/watch/${this.$route.params.contract_id}/today`);
                    console.log("today's log: ", response);

                    // set watch status for global use...
                    const watch = response.data.watch;
                    this.watch_status = watch.status;

                    // set clock in time...
                    this.clock_in_time = watch.time_stamp.clock_in_time;

                    // get watch timestamps
                    const current_time = this.convertDateTimeToSecs(Date.now());
                    const clock_in_time = this.convertDateTimeToSecs(watch.time_stamp.clock_in_time);
                    const start_time = this.convertDateTimeToSecs(watch.time_stamp.start_time);
                    const stop_time = this.convertDateTimeToSecs(watch.time_stamp.stop_time);


                    // if theres no start time then start counting from clock_in_time....
                    if(watch.status == 'active' && !start_time){
                        // continue count from clock in time...
                        // duration is set to time from clock in time to current time
                        // and count is continued from duraiton..
                        this.duration = Math.floor((current_time - clock_in_time) / 1000);

                          // start count animation
                          this.startDurationCount();


                        console.log("duration without pause: ", this.duration)

                    } else if(watch.status == 'active' && start_time){
                        // if wwatch is active..
                        // current_time minus start_time, then add it to the duration available..

                        const currentTimeInSeconds = this.convertDateTimeToSecs(Date.now());
                        const durationFromStartTime = Math.floor((currentTimeInSeconds - start_time) / 1000);
                        this.duration = Math.floor(watch.time_stamp.duration) + durationFromStartTime;

                        // start count animation
                        this.startDurationCount();
                    }


                    if(watch.status == 'paused'){
                        // display a static time via [stop_time]...
                        // show only static time...
                        this.duration = Math.floor(watch.time_stamp.duration);
                    }
                    if(watch.status == 'stopped'){
                        // set clock out time...
                        this.clock_out_time = watch.time_stamp.stop_time;

                        // display total time calculation...
                        this.duration = Math.floor(watch.time_stamp.duration);
                    }


                    
                    this.timer_loading = false;
                }catch(error){
                    console.log("error in getting server time: ", error);
                    this.timer_loading = false;
                }
            },


        },

        computed: {
            formatTime() {
                // Calculate hours, minutes, and seconds
                let hours, minutes, seconds;
                hours = Math.floor(this.elapsedTime / (60 * 60 * 1000));
                minutes = Math.floor((this.elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
                seconds = Math.floor((this.elapsedTime % (60 * 1000)) / 1000);

                // Format the time as HH:MM:SS
                return `${hours}:${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
            },

            convertSecondsToWatchFormat(){
                const hours = Math.floor(this.duration / 3600);
                const minutes = Math.floor((this.duration % 3600) / 60);
                const seconds = this.duration % 60;
                return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
            }

            
        },

        mounted(){
            this.getCurrentDate();
            this.getContract();
            this.getServerTime();
           
        },


        beforeUnmount() {
            clearInterval(this.durationCounter);
        },
    }
</script>

<style scoped>
    .stat_card{
        @apply border flex flex-col gap-2 p-2 rounded-md justify-center dark:bg-gray-800 dark:border-gray-700
    }
</style>