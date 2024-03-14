<template>
    <div>
        <span v-if="type === 'closed'" class="px-4 py-1 bg-gray-500 text-white rounded-md text-xl">
            closed
        </span>
        <span v-if="type === 'active'" class="px-4 py-1 bg-tz_blue text-white rounded-md text-xl">
            Active
        </span>
        <span v-if="type === 'paused'" class="px-4 py-1 bg-orange-500 text-white rounded-md text-xl">
            Paused
        </span>
        <span v-if="type === 'completed'" class="px-4 py-1 bg-green text-white rounded-md text-xl">
            Completed
        </span>
    </div>
</template>
<script>
export default {
    name: "ContractStatus",
    props: {
        type: String,
    }
}
</script>
<style>
    
</style>