<template>
    <div>
        <div class=" w-full text-left p-4 text-3xl border-b flex items-center pl-3 dark:border-gray-600">
            <span class="flex gap-5">
                <button @click="$router.go(-1)">
                    <i class="bi bi-arrow-left text-[20px]"></i>
                </button>
                
                <slot>Default Title</slot>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageTitle",
        
    }
</script>

<style scoped>

</style>