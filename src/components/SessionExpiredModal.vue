<template>
<div>
        <div class="h-full bg-[rgb(0,0,0,70%)] fixed left-0 z-50 top-0 w-full flex justify-center items-center">
            <div class="flex flex-col bg-white justify-center items-center rounded-xl p-5 dark:bg-gray-700 text-center">
                    <Vue3Lottie
                        :animationData="danger"
                        :height="80"
                        :width="80"
                    />
                    <strong>Your Session has expired</strong>
                    <p class="text-center">Please log in again to continue using the app.</p>
                    <div class="p-3">
                        <RouterLink to="/login">
                            <button @click="goToLogin" class="btn self-end">Log in</button>
                        </RouterLink>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import danger from '../lottie/danger.json'
    export default {
        name: "SessionExpiredModal",
        data(){
            return{
                danger,
            }
        },

        methods: {
            goToLogin(){
                window.location.reload();
                this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>

</style>