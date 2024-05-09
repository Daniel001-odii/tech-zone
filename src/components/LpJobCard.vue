<template>
        <div class="rounded-lg p-5 border border-gray-200 flex flex-col w-fit min-w-80 bg-slate-100 max-w-[800px]">
            <div class="flex flex-row justify-between font-medium text-sm">
                <div class="flex items-center justify-center">
                    <i class="bi bi-building-check"></i> | <span>{{company}}</span>
                </div>

                <div>{{job_time}}</div>
            </div>

            <div class="flex flex-col gap-3">
                <span class="font-bold mt-4">{{ job_title }}</span>
                <div class="flex flex-row justify-between text-sm"> 
                    <span>
                        <i class="bi bi-geo-alt-fill"></i> <span>{{job_location}}</span>
                    </span>
                    <span>
                        <i class="bi bi-clock"></i> <span>{{job_duration}}</span>
                    </span>
                </div>

                <div>
                    <!-- We are seeking a highly experienced and skilled Senior Software Developer to join our dynamic team.  -->
                    {{ job_description.substring(0,200) }}...
                </div>
               
                <div class="mt-3 font-medium flex justify-between items-center">
                    <RouterLink :to="job_url">
                        <button class=" hover:bg-tz_blue hover:text-white px-5 py-3 rounded-md">Apply here</button>
                    </RouterLink>
                    <span class="text-xl">#{{budget}}</span>
                </div>

            </div>
        </div>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    name: "LpJobCard",
    props: {
        company: String,
        job_time: String,
        job_title: String,
        job_location: String,
        job_duration: String,
        job_description: String,
        job_url: String,
        budget: Number,
    },
    components: { RouterLink }
}
</script>
<style scoped>
    
</style>