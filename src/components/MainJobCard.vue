<template>
    <div>
        <div class="flex flex-col border p-3 rounded-md text-left gap-3 hover:border-blue">
            <div class="flex flex-col">
                <div class="flex flex-row justify-between items-center">
                    <span class="font-bold">
                        <slot name="job-title">
                            senior software developer (java)
                        </slot>
                    </span>
                    <div class="text-lg gap-4 flex flex-row-reverse">
                        <button class="icon_btn bg-light_blue" @click="saveJob">
                            <i v-if="saved || job_is_saved" class="bi bi-bookmark-check-fill text-blue"></i>
                            <i v-else class="bi bi-bookmark-check"></i>
                        </button>
                        <button class="icon_btn" @click="flagJob">
                            <i class="bi bi-hand-thumbs-down"></i>
                        </button>
                    </div>
                </div>
                <div class=" capitalize flex flex-row gap-3">
                    <span>{{ company }}</span>
                    <span>{{ rating }}.0 stars</span>
                </div>
                <div>
                    <i class="bi bi-geo-alt"></i> 
                    <span>
                        <slot v-if="!remote" name="job-location">job location here..</slot>
                        <span v-else>remote</span>
                    </span>
                </div>
            </div>
           
            <div class="flex flex-row gap-2">
                <span class=" bg-light_blue p-2 rounded-md">
                    <i class="bi bi-wallet"></i> <span>#{{ budget }}</span>
                </span>
                <span class=" bg-blue p-2 rounded-md text-white">
                    <i class="bi bi-briefcase"></i> <span>{{ period }}</span>
                </span>
            </div>
            <div>
                <slot name="job-description">
                    We are seeking a highly experienced and skilled Senior Software Developer to join our dynamic team. The successful candidate will have a proven track... 
                </slot>
            </div>

            <div class="text-sm text-blue flex flex-row justify-between items-center">
                <slot name="job-posting-time">Posted 1 hour ago</slot>
                <span v-if="is_applied" class="px-3 py-1 bg-green rounded-lg text-white">applied</span>
            </div>
        </div>
    </div>
</template>
<script>
import { stringify } from 'postcss';

export default {
    name: "MainJobCard",
    data(){
        return{
            saved: false,
        }
    },
    props: {
        budget: Number,
        period: String,
        company: String,
        rating: Number,
        remote: Boolean,
        is_applied: Boolean,
        job_is_saved: Boolean,
       
    },
    methods: {
        saveJob(){
            this.$emit('saveJob');
            this.saved = !this.saved;
        },

        flagJob(){
            this.$emit('flagJob')
        }
    }
}
</script>
<style scoped>
    .icon_btn{
        @apply p-2 hover:bg-light_blue h-10 w-10 rounded-full
    }
</style>