<template>
    <div>
        <PageTitle>Task Watch</PageTitle>
        <div class="flex flex-col flex-wrap p-5 items-start justify-start gap-3">
            <div class="bg-tz_light_blue text-blue-300 p-3 rounded-md">Equipment Installation [Job name]</div>

            <div class="flex flex-row flex-wrap items-center gap-5 mt-3">
                <div class="p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700">{{ current_date }}</div>

                <div class="bg-tz_blue hover:bg-tz_dark_blue rounded-full w-[300px] flex flex-row items-center p-[3px] justify-between">
                    <div class="flex flex-row gap-5 bg-white dark:bg-gray-700 h-full p-2 rounded-l-full px-4">
                        <i class="bi bi-stopwatch"></i>
                        <span>00:00:00</span>
                        <button>
                            <i class="bi bi-pause-fill"></i>
                        </button>
                        <button>
                            <i class="bi bi-play-fill"></i>
                        </button>
                    </div>
                    <button class="mx-auto my-0 text-white text-sm font-medium">Clock in</button>
                </div>
            </div>

            <!-- <p>{{ formatTime }}</p>
            <button @click="toggleTimer">{{ timerRunning ? 'Pause' : 'Play' }}</button> -->
            <div class="flex flex-row flex-wrap gap-3">

                <!-- CLOCK IN AND COCK OUT TIME -->
                <div class="flex flex-row md:flex-col gap-3 w-full md:w-fit">
                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock in time</span>
                        <span class="font-medium">09:59:54am</span>
                    </div>

                    <div class="flex flex-col border rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 grow md:grow-0 md:w-fit">
                        <span class="text-[10px] uppercase">clock in time</span>
                        <span class="font-medium">
                            09:59:54am
                        </span>
                    </div>
                </div>

                <!-- OTHER ITEMS -->
                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">WORKED TODAY</span>
                    <p class="text-[30px]">05:59:54</p>
                    <span class="text-green-500 text-[10px]">
                        <i class="bi bi-caret-up-fill"></i>
                        04:59:54
                    </span>
                </div>

                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">WORKED THIS WEEK</span>
                    <p class="text-[30px]">05:59:54</p>
                    <span class="text-red-500 text-[10px]">
                        <i class="bi bi-caret-down-fill"></i>
                        04:59:54
                    </span>
                </div>

                <div class="stat_card min-w-[250px] w-full md:w-fit">
                    <span class="text-[10px] uppercase">DAYS WORKED</span>
                    <p class="text-[30px]">5</p>
                    <span class="text-green-500 text-[10px]">
                        <i class="bi bi-caret-up-fill"></i>
                        6
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

            <div class="  w-full min-h-80">
                <BarChart :chartData="testData" :options="options"/>
            </div>

        </div>
        
    </div>
</template>

<script>

import PageTitle from '@/components/PageTitle.vue';

import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


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

                options: {
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                    display: true,
                    text: 'Hours worked per day',
                    },
                },
                },

                testData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [
                    {
                    data: [2, 12, 5, 9, 7, 2, 12, 5, 9, 7],
                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
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

            pauseTimer() {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
            },

            updateTimer() {
            this.elapsedTime = Date.now() - this.startTime;
            },
        },

        computed: {
            formatTime() {
                // const hours; 
                const minutes = Math.floor(this.elapsedTime / 60000);
                const seconds = ((this.elapsedTime % 60000) / 1000).toFixed(0);
                return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
            },
        },

        mounted(){
            this.getCurrentDate();
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