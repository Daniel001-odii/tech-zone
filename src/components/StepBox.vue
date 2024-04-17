<template>
    <!-- <div> -->
        <div class=" bg-white border scale-90 group opacity-50 hover:opacity-100 hover:scale-100 p-4 text-black rounded-lg w-fit max-w-[250px] text-left flex flex-col gap-2">
            <div class="flex flex-row justify-between items-center text-5xl">
                <div class="group-hover:text-white text-[20px] group-hover:text-[30px] group-hover:bg-tz_blue rounded-lg p-2 flex justify-center items-center">
                     <slot name="icon">
                        
                    </slot>
                </div>
               
                
                <span class="font-medium text-[20px] group-hover:text-[30px]">{{number}}</span>
            </div>
            <h4 class="font-medium text-2xl">
                <slot name="title">Register Your Account</slot>
            </h4>
            <div class="text-sm text-left" style="font-size: 12px;">
                <slot name="content"></slot>
                It has survived not only five centuries, but also the leap into electronic typesetting.
            </div>
        </div>
        
    <!-- </div> -->
</template>
<script>
export default {
    name: "StepBox",
    props:{
        number: Number,
    }
    
}
</script>
<style>
    
</style>