<template>
    <div>
        <div class="w-fit p-3 hover:border-tz_light_blue border-4 rounded-lg border-transparent  dark:bg-tz_light_blue flex flex-row items-center gap-3">

            <div class=" bg-tz_light_blue p-5 rounded-lg">
                <slot name="icon">
                    <i class="bi bi-gear font-medium"></i>
                </slot>
            </div>   
            <div class="flex flex-col">
                <span class="font-medium text-2xl">
                    <slot name="title">Fiber Cabling</slot>
                </span>
                <span class="text-sm">
                        {{ jobs_avaialble }}+ Jobs Available
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "JobaCat",
    props:{
        jobs_avaialble: Number,
    }
    
}
</script>
<style>
    
</style>