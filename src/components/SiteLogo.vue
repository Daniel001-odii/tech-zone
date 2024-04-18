<template>
    <div class="dark:text-white ml-3">
        <RouterLink to="/" class="">
            <div>
                <img v-if="light_logo" src="../../public/apex-tek.svg" class="h-[35px] md:h-[50px] ">
                <img v-else src="../../public/apex-tek-white.svg" class="h-[35px] md:h-[50px] "> 
            </div>
           
        </RouterLink>

    </div>
</template>
<script>
export default {
    data(){
        return{
            light_logo: true,
        }
    },
    mounted(){
        // window.matchMedia('(prefers-color-scheme: dark)').matches
        if(localStorage.theme == 'light' || !window.matchMedia('(prefers-color-scheme: dark)').matches){
            this.light_logo = true;
        } else {
            this.light_logo = false;
        }
    }
}
</script>
<style lang="">
    
</style>