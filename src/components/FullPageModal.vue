<template>
    <div>
        <div class="h-full bg-[rgb(0,0,0,70%)] fixed z-20 top-0 w-full flex justify-center items-center">
            <div class="flex flex-col bg-white rounded-xl p-5">
                <i v-if="type == 'success'" class="bi bi-check-circle text-green text-3xl"></i>
                <i v-if="type == 'fail'" class="bi bi-x-lg text-red-400 text-3xl"></i>
                <slot name="text-content">
                    <p class="p-3 font-bold text-lg">Application sent successfully</p>
                </slot>
                <slot name="button">
                    <RouterLink to="/jobs">
                        <button class="btn w-full">Return to work explorer</button>
                    </RouterLink>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FullPageModal",
        props: {
            type: String,
        }
    }
</script>

<style scoped>

</style>