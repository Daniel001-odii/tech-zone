<template>
    <div class="flex flex-row dark:text-black justify-start items-center gap-3 w-fit rounded-lg border p-3 h-[100px] pr-10">
        <div class=" h-[50px] w-[50px] rounded-full text-white flex justify-center items-center text-2xl" :class="iconColor">
            <slot></slot>
        </div>
        <div class="flex flex-col">
            <span class="font-bold text-4xl">{{ value }}</span>
            <span class="text-xl">{{ title }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminStat",
        props: {
            title: String,
            value: Number,
            iconColor: String
        }
    }
</script>

<style scoped>

</style>