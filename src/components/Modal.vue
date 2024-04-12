<template lang="">
    <div>
        <div v-if="modal_active" class=" bg-[rgb(0,0,0,20%)] dark:bg-[rgba(0,0,0,75%)] h-screen w-screen fixed left-0 z-20 flex flex-col justify-center items-center top-0">
            <div class="  bg-white rounded-lg text-left flex flex-col h-fit max-h-[80vh] dark:bg-[#1F2A36] dark:text-white absolute bottom-0 left-0 right-0 w-full md:w-fit md:relative">
            <!-- <div class=" w-fit md:w-5/6 lg:w-3/4 bg-white rounded-lg text-left flex flex-col h-fit max-h-[80vh] dark:bg-[#1F2A36] dark:text-white"> -->
                <div class="text-xl md:text-4xl px-4 py-5 flex flex-row justify-between items-center">
                    <span>{{ title }}</span>
                    <button @click="modal_active = !modal_active" class="">&times;</button>
                </div>
                <div class="px-8 py-5 overflow-y-scroll border-t border-b  dark:border-gray-600 ">
                    <slot name="body">
                        <p>Modal body</p>
                    </slot>
                </div>
                <div class=" px-4 py-2 flex flex-row justify-end items-end">
                    <slot name="footer">
                        <p>...</p>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Modal",
    data(){
        return{
            // modal_active: false,
        }
    },
    props: {
        title: String,
        modal_active: Boolean,
    },
    methods:{

    }
}
</script>
<style lang="">
    
</style>