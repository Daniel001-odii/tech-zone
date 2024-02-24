<template lang="">
    <div>
        <div v-if="modal_active" class=" bg-[rgb(0,0,0,20%)] h-screen w-screen fixed z-20 flex flex-col justify-center items-center">
            <div class=" w-11/12 md:w-5/6 lg:w-3/4 bg-white h-fit rounded-lg text-left">
                <div class="text-3xl font-bold px-8 py-5 flex flex-row justify-between items-center">
                    <span>{{ title }}</span>
                    <button @click="modal_active = !modal_active" class="">&times;</button>
                </div>
                <div class="px-8 py-5">
                    <slot>

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