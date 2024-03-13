<template lang="">
    <div>
        <div v-if="modal_active" class=" bg-[rgb(0,0,0,20%)] h-screen w-screen fixed z-20 flex flex-col justify-center items-center fixed top-0">
            <div class=" w-11/12 md:w-5/6 lg:w-3/4 bg-white rounded-lg text-left flex flex-col h-fit max-h-[80vh]">
                <div class="text-3xl font-bold px-4 py-5 flex flex-row justify-between items-center">
                    <span>{{ title }}</span>
                    <button @click="modal_active = !modal_active" class="">&times;</button>
                </div>
                <div class="px-8 py-5 overflow-y-scroll border">
                    <slot name="body">
                        <p>Modal body</p>
                    </slot>
                </div>
                <div class=" px-4 py-2 flex flex-row justify-end items-end">
                    <slot name="footer">
                        <p>Modal footer</p>
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