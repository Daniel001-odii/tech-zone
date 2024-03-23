<template>
    <div class="dark:text-white ml-3">
        <RouterLink to="/" class="">
            <div>
                
                <img v-if="light_logo" src="../../public/apex-tek-logo-black.png" class=" h-[60px]">
                <img v-else src="../../public/apex-tek-logo-white.png" class=" h-[60px]"> 
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
        if(localStorage.theme == 'light'){
            this.light_logo = true;
        } else {
            this.light_logo = false;
        }
    }
}
</script>
<style lang="">
    
</style>