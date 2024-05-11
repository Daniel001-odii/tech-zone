<template>

<!-- START TASK WATCH MODAL -->
<Modal :modal_active="start_task_watch_modal" :title="'Start task-watch'">
    <template #body>
        <div class="flex flex-col gap-2">
            <p class="">You are about to clock-in for today's work session.</p>
            <span class="text-blue-300 bg-tz_light_blue p-3 rounded">you cannot clock in twice after now, you can only pause, resume or clockout after the work session.</span>

                <div class="p-3">
                    <p>What are you working on?</p>
                    <input type="text" class="form_input w-full" v-model="task_description">
                </div>
            
        </div>
    </template>
    <template #footer>
        <button class="btn" @click="startTaskWatchConfirm" :disabled="!task_description">Start watch</button>
    </template>
</Modal>

<!-- STOP TASK WATCH MODAL -->
<Modal :modal_active="stop_task_watch_modal" :title="'Stop task-watch'">
    <template #body>
        <div class="flex flex-col gap-2">
            <p class="text-xl">You are about to clock-out for today's work session.</p>
            <span class="text-red-300 bg-red-900 p-3 rounded">
                <i class="bi bi-info-circle"></i> 
                you cannot revert this action once done.</span>
        </div>
        
    </template>
    <template #footer>
        <button class="font-bold rounded-md p-3 bg-red-600 hover:bg-red-700" @click="stopTaskWatchConfirm">Stop watch</button>
    </template>
</Modal>

    <div>
        <PageTitle>Task Watch</PageTitle>
        
        <div class="flex flex-col flex-wrap p-5 items-start justify-start gap-3">
            <div class="bg-tz_light_blue text-blue-300 p-3 rounded-md" v-if="contract">{{ contract.job.title }}</div>
            
            <p class="text-gray-400">watch status: {{ watch_status }}</p>

            <!-- display errors here.... -->
            <span class="text-red-500">{{ timer_error }}</span>


            <div class="flex flex-row flex-wrap items-center gap-5 mt-3">
                <div class="p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700">{{ current_date }}</div> <br/>

                <div class=" rounded-full w-[300px] flex flex-row items-center justify-between" :class="clock_out_time ? 'bg-green-500':'bg-tz_blue hover:bg-tz_dark_blue'">
                    <div class="flex flex-row gap-5 bg-white dark:bg-gray-700 h-full p-2 rounded-l-full px-4">
                        <i class="bi bi-stopwatch"></i>
                        <span v-if="timer_loading" class="text-sm text-yellow-300">loading...</span>
                        <span v-else>{{ convertSecondsToWatchFormat }}</span>
                       
                        <button @click="toggleTaskWatch">
                            <i v-if="timer_loading" class="bi bi-arrow-clockwise"></i>
                            <span v-if="!timer_loading">
                                <i v-if="watch_status == 'active'" class="bi bi-pause-fill"></i>
                                <i v-else class="bi bi-play-circle-fill"></i>
                            </span>
                        </button>
                    </div>
                    <button v-if="!clock_in_time" @click="start_task_watch_modal = !start_task_watch_modal" class="mx-auto my-0 text-white text-sm font-medium flex items-center gap-5 ">
                        Clock in
                    </button>
                    <button v-if="clock_in_time && !clock_out_time" @click="stop_task_watch_modal = !stop_task_watch_modal" class="mx-auto my-0 text-white text-sm font-medium flex items-center gap-5 ">
                        Clock out
                    </button>
                    <span v-if="watch_status == 'stopped'" class="mx-auto my-0">completed</span>
                </div>
            </div>

            <!-- <span v-if="clock_in_time">Day: {{ convertDateTimeToDayOfWeek(clock_in_time) }} - labels: {{ testData.labels }}</span> -->

            <div class="flex flex-row flex-wrap gap-3">

                <!-- CLOCK IN AND COCK OUT time -->
                <div class="flex flex-row md:flex-col gap-3 w-full md:w-fit">
                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit min-w-[120px]">
                        <span class="text-[10px] uppercase">clock in time</span>
                        <span v-if="clock_in_time" class="font-medium">
                            {{ convertTimeToAMPM(clock_in_time) }}
                        </span>
                        <span v-else>00:00:00</span>
                    </div>

                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit min-w-[120px]">
                        <span class="text-[10px] uppercase">clock out time</span>
                        <span v-if="clock_out_time" class="font-medium">
                            {{ convertTimeToAMPM(clock_out_time) }}
                        </span>
                        <span v-else>00:00:00</span>
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
                    <p class="text-[30px]">{{ days_worked }}</p>
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
import Modal from '@/components/Modal.vue';


    export default {
        name: "TaskWatchPageView",
        components: {
            PageTitle,
            Chart,
            BarChart,
            Modal
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
                            text: 'hours worked per day',
                        },
                        grid: {
                            display: false,
                        }
                    },
                  
                },

                timer_error: '',
                timer_loading: false,
                task_description: '',
                watch_status: '',

                convertTimeToAMPM,
                clock_in_time: '',
                clock_out_time: '',
                days_worked: 0,

                start_time: '',
                stop_time: '',

                duration: 0,
                durationCounter: '',

                start_task_watch_modal: false,
                stop_task_watch_modal: false,


                // data values for chart...
                testData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [
                    {
                        label: 'Day',
                        data: [2, 12, 5, 9, 7, 2, 12, 5, 9, 7],
                        backgroundColor: ['#81AAEA'],
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

            convertDateTimeToDayOfWeek(date_time){
                const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                const index = new Date(date_time).getDay();
                return days[index];
            },

            stopTaskWatchConfirm(){
                this.stopTaskWatch();
                this.stop_task_watch_modal = !this.stop_task_watch_modal;
            },

            startTaskWatchConfirm(){
                this.startTaskWatch();
                this.start_task_watch_modal = !this.start_task_watch_modal
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

                    // reload page to show work chart for current day...
                    window.location.reload();
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
                    // console.error("error toggling timer: ", error);
                    this.timer_error = error.response.data.message;
                    this.timer_loading = false;
                }
            },

            async getWatchForToday(){
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

            async getAllWatches(){
                try{
                    const response = await axios.get(`${this.api_url}/watch/${this.$route.params.contract_id}/all`);
                  
                    const days = response.data.watch_list;
                    
                    // set lables to empty array...
                    this.testData.labels = []
                    this.testData.datasets[0].data = []

                    this.days_worked = days.length - 1;

                    // push days into chart  labels...
                    days.forEach(day =>{
                        this.testData.labels.push(this.convertDateTimeToDayOfWeek(day.time_stamp.clock_in_time));
                        this.testData.datasets[0].data.push((day.time_stamp.duration) / 3600);
                    })

                    console.log("recorded days: ", days);
                }catch(error){
                    this.timer_error = error;
                }
            }


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
            this.getWatchForToday();
            this.getAllWatches();
           
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