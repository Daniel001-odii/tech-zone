<template>
    <div>
        <div class="flex flex-col text-left gap-3 border-b p-2 md:p-4 hover:bg-tz_light_blue">
            <div class="flex flex-row justify-between items-center gap-3">
                <RouterLink to="#">
                    <div class="text-xl font-bold text-tz_blue underline">{{ title }}</div>
                </RouterLink>
                <button class="border rounded-full h-14 w-14 hover:bg-gray-200 ">
                    <i class="bi bi-share"></i>
                </button>
            </div>
            <div>
                
                <div>
                    "<slot name="feedback"></slot>"
                </div>
                <div class="font-bold flex flex-row">
                    <div class="flex flex-col">
                        <span>
                            <slot name="star-rating"></slot>
                        </span>
                        <span>
                            <slot name="date"></slot>
                        </span>
                    </div>
                  
                 
                </div>
                <div class="mt-3">${{ budget }} paid</div>
            </div>
            <div class="flex flex-row gap-3">
                <slot name="status"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import ContractStatus from './ContractStatus.vue';

export default {
    name: "JobReviewCard",
    props:{
        title: String,
        budget: Number,
    },
    components: { ContractStatus }
}
</script>
<style lang="">
    
</style>