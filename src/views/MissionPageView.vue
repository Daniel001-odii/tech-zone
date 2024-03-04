<template>
    <div>
        <div class="p-8 text-left">
            <h2>Our Mission and Vision </h2>
            <p>Apex Technologies is more than just a platform – it's a movement driven by a powerful mission: to combat unemployment among individuals with tech skills in Nigeria. Our vision extends beyond mere job placements; we aspire to catalyze the growth of the tech industry by connecting skilled professionals with rewarding opportunities. Through technology-enabled solutions, we aim to empower individuals to build sustainable careers and contribute to Nigeria's digital transformation. </p>
       </div>
    </div>
 
</template>
<script>
import Alert from '@/components/Alert.vue';

export default {
    name: "MissionPageView",
    components: { Alert },
}
</script>
<style scoped>
   h2{
     @apply font-bold text-2xl
   }

   p{
    @apply mb-5
   }
</style>