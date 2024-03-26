<template>
<!-- <div v-if="show" class="flex flex-col"> -->
<div v-if="show">

    <!-- SUCCESS -->
    <div v-if="type == 'success'" class="alert flex flex-row rounded-lg bg-green-500 text-white justify-between items-center mt-3 min-w-sm">
        <div class="p-3 font-bold"><slot></slot></div>
        <button @click="hideAlert" type="button" class="px-4 h-full">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    

    <!-- DANGER -->
    <div v-if="type == 'danger'" class="alert flex flex-row rounded-lg bg-red-500 text-white justify-between items-center mt-3 min-w-sm">
        <div class="p-3 font-bold"><slot></slot></div>
        <button @click="hideAlert" type="button" class="px-4 h-full">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>


    <!-- WARNING -->
    <div v-if="type == 'warning'" class="alert flex flex-row rounded-lg bg-yellow-400 text-white justify-between items-center mt-3 min-w-sm">
        <div class="p-3 font-bold"> <slot></slot></div>
        <button @click="hideAlert" type="button" class="px-4 h-full">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>

</div>
</template>



<script>
import { Dismiss } from 'flowbite';



export default {
    name: "DismissableAlert",
    props:{
        type: String,
    },
    data(){
        return{
            show: true,
        }
    },

    methods:{
        hideAlert() {
          this.show = false;
        }
    },

    mounted() {
        setTimeout(() => {
            this.show = false;
        }, 5000);
    }
    
}
</script>

<style scoped>
.alert{
    
}
</style>