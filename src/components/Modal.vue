<template>
    <div>
        <transition name="formSlide">
        
       
            <div v-show="modal_active" class=" bg-[rgb(0,0,0,75%)] dark:bg-[rgba(0,0,0,75%)] h-screen w-screen fixed left-0 z-20 flex flex-col justify-center items-center top-0">
                <div class="  bg-white rounded-lg text-left flex flex-col h-fit max-h-[80vh] dark:bg-[#1F2A36] dark:text-white absolute bottom-0 left-0 right-0 w-full md:w-fit md:min-w-[500px] md:max-w-[1000px] md:relative">
                <!-- <div class=" w-fit md:w-5/6 lg:w-3/4 bg-white rounded-lg text-left flex flex-col h-fit max-h-[80vh] dark:bg-[#1F2A36] dark:text-white"> -->
                    <div class="text-2xl md:text-4xl p-8 flex flex-row justify-between items-center">
                        <span>{{ name }}</span>
                        <button @click="modal_active = !modal_active" class="">
                            <i class="bi bi-x-lg text-2xl"></i>
                        </button>
                    </div>
                    <div class="p-8 overflow-y-auto dark:border-gray-600 ">
                        <slot name="body">
                            <p>Modal body</p>
                        </slot>
                    </div>
                    <div class=" p-8 flex flex-row justify-end items-end gap-3">
                        <!-- <button class="bg-tz_light_blue p-3 rounded-md font-bold" @click="modal_active = !modal_active">Cancel</button> -->
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>


        </transition>
    </div>
</template>
<script>
export default {
    name: "Modal",
    props: {
        name: String,
        modal_active: Boolean,
    },
    methods:{

    }
}
</script>
<style scoped>
    .formSlide-enter-active, .formSlide-leave-active {
        transition: all 0.5s;
        opacity: 1;
    }
    .formSlide-enter-from, .formSlide-leave-to {
        opacity: 0;
        padding-bottom: 50px;
    }
</style>