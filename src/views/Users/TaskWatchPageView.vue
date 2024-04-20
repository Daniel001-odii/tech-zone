<template>
    <div>
        <PageTitle>Task Watch</PageTitle>
        <div class="flex flex-row flex-wrap p-5 items-center justify-between">
            <div class="bg-tz_light_blue text-tz_blue p-3 rounded-md">Equipment Installation [Job name]</div>

            <div class="flex flex-row items-center gap-5">
                <div class="p-3 border rounded-md">{{ current_date }}</div>

                <div class="bg-tz_blue hover:bg-tz_dark_blue rounded-full w-[300px] flex flex-row items-center p-[3px] justify-between">
                    <div class="flex flex-row gap-5 bg-white h-full p-2 rounded-l-full px-4">
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
        </div>
    </div>
</template>

<script>

import PageTitle from '@/components/PageTitle.vue';


    export default {
        name: "TaskWatchPageView",
        components: {
            PageTitle,
        },
        data(){
            return{
                current_date: '',
            }
        },
        methods:{
            getCurrentDate() {
                const dateObject = new Date(); // Create a new Date object
                const formattedDate = dateObject.toDateString(); // Get the date in a human-readable format
                this.current_date = formattedDate; // Update current_date with the formatted date
            },
        },

        mounted(){
            this.getCurrentDate();
        }
    }
</script>

<style scoped>

</style>