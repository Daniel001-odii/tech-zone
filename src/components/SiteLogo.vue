<template>
    <div class="dark:text-white ml-3">
        <RouterLink to="/" class="">
            <div>
                <img src="../../public/apex-tek.svg" class=" dark:hidden inline-block h-[35px] md:h-[50px] ">
                <img src="../../public/apex-tek-white.svg" class=" dark:inline-block hidden h-[35px] md:h-[50px] "> 
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