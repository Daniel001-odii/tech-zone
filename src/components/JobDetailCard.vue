<template>
    <div>
        <div class=" hidden md:flex flex-col md:border h-full p-3 rounded-md text-left gap-3 hover:border-blue bg-white">
            <div class="flex flex-col gap-3">
                
                <div class="flex flex-row justify-between items-center flex-wrap gap-3">
                    <span class="font-bold text-2xl">
                        <slot name="job-title">
                            senior software developer (java)
                        </slot>
                    </span>
                    <div class="text-lg gap-4 flex flex-row-reverse">
                        <button class="bg-blue text-white px-5 py-2 rounded-md hover:bg-dark_blue" @click="openJob">Apply here</button>
                    </div>
                </div>
                <div class=" capitalize flex flex-row gap-3">
                    <span>{{ company }}</span>
                </div>
                <div class="flex flex-col gap-3 flex-wrap">
                    <div class="flex flex-row gap-3">
                        <div>
                            <i class="bi bi-geo-alt"></i> <span v-if="remote">Remote</span>
                            <span v-else>{{ location }}</span>
                        </div>
                        <div>
                            <i class="bi bi-arrow-clockwise"></i> <span>{{ posted }}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-row gap-3">
                        <div>
                            <i class="bi bi-wallet"></i> <span>N{{ budget }}</span>
                        </div>
                        <div>
                            <i class="bi bi-briefcase"></i> <span>{{ period }}</span>
                        </div>
                    </div>
                    
                </div>
                <div class="flex flex-row flex-wrap gap-3">
                    <span v-for="skill in skills" class="bg-light_blue text-blue px-3 py-2 rounded-md">{{ skill }}</span>
                </div>
            </div>
            <div class="font-bold">
                Job Description
            </div>
            <div>
                <slot name="job-description">
                   job description goes here...
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    name: "JobDetailCard",
    props: {
        company: String,
        location: Object,
        posted: String,
        budget: String,
        period: String,
        skills: Array,
        remote: Boolean,
    },
    components: { RouterLink },
    methods: {
        openJob(){
            this.$emit('visitJobPost')
        },
    }
}
</script>
<style scoped>
    .icon_btn{
        @apply p-2 bg-transparent hover:bg-light_blue h-10 w-10 rounded-full
    }
</style>