<template>
        <div class="rounded-lg h-full justify-between p-5 border border-gray-200 flex flex-col min-w-[320px] bg-slate-100">
            <div class="flex flex-row justify-between font-medium text-sm">
                <div class="flex items-center justify-center">
                    <i class="bi bi-building-check"></i> | <span>{{company}}</span>
                </div>

                <div>{{job_time}}</div>
            </div>

            <div class="flex flex-col gap-3">
                <span class="font-bold mt-4">{{ job_title }}</span>
                <div class="flex flex-row justify-between text-sm"> 
                    <slot></slot>
                </div>

                <div>
                    <!-- We are seeking a highly experienced and skilled Senior Software Developer to join our dynamic team.  -->
                    {{ job_description.substring(0,200) }}...
                </div>
               
                <div class="mt-3 font-medium flex justify-between items-center">
                    <RouterLink to="/login">
                        <button class=" hover:bg-tz_blue hover:text-white px-5 py-3 rounded-md border bg-gray-300">Apply here</button>
                    </RouterLink>
                    <span class="text-xl">	&#8358; {{ budget }}</span>
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