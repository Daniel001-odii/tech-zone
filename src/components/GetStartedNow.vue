<template>
    <div>
        <div  class="flex flex-col w-fit gap-4">
            <RouterLink to="/register/decide">
                <button class="btn w-full">Get Started Now</button>
            </RouterLink>
            <div class="flex justify-between gap-6">
                <span class="text-sm"> Already have an account?</span>
                <RouterLink to="/login" class="text-blue text-sm">Login here</RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "GetStartedNow",
}
</script>
<style scoped>
      .btn{
        @apply bg-blue hover:bg-dark_blue text-white py-3 px-5 rounded-md font-bold border border-transparent
    }
</style>