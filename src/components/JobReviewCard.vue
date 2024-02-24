<template>
    <div>
        <div class="flex flex-col text-left gap-3 border-b p-2 md:p-4 hover:bg-light_blue">
            <div class="flex flex-row justify-between items-center gap-3">
                <RouterLink to="#">
                    <div class="text-xl font-bold text-blue underline">Developer needed to build a custom website/app</div>
                </RouterLink>
                <button class="border rounded-full h-14 w-14 hover:bg-gray-200 ">
                    <i class="bi bi-share"></i>
                </button>
            </div>
            <div>
                
                <div>
                    "I would highly recommend this freelancer. Design work is excellent and follows instructions well. Fast, catchy designs. Well done, Odii; I would use you again for sure."
                </div>
                <div class="font-bold">
                    <span v-for="star in 5" class="">
                        <i class="bi bi-star"></i>
                    </span>
                        |
                    <span> Dec 9, 2022 - Dec 13, 2022</span>
                </div>
                <div class="mt-3">$500 paid</div>
            </div>
            <div class="flex flex-row gap-3">
                <ContractStatus :type="'active'"/>
                <ContractStatus :type="'ended'"/>
                <!-- <ContractStatus :type="'paused'"/> -->
            </div>
        </div>
    </div>
</template>
<script>
import ContractStatus from './ContractStatus.vue';

export default {
    name: "JobReviewCard",
    props:{
        
    },
    components: { ContractStatus }
}
</script>
<style lang="">
    
</style>