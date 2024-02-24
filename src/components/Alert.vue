<template>
    <div>
        <div v-if="type == 'danger'" class=" bg-red-100 p-3 rounded-md text-red-600">
            {{message}}
        </div>

        <div v-if="type == 'success'" class=" bg-[#E8FCF1] p-3 rounded-md text-[#419E6A]">
            {{message}}
        </div>


    </div>
</template>
<script>
export default {
    name: "Alert",
    props:{
        type: String,
        message: String,
    }
}
</script>
<style scoped>
    
</style>