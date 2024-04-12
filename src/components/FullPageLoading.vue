<template>
    <div>
        <div class="text-center absolute top-0 bottom-0 w-full flex justify-center items-center z-30 dark:bg-[rgb(0,0,0,70%)] bg-[rgba(255,255,255,0.7)]">
            <img class="glow-animation bg-white" src="../assets/images/dot_logo.svg">
        </div>
    </div>
</template>

<script>
    export default {
        name: "FullPageLoading",
    }
</script>

<style scoped>
@keyframes glowing  {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); transform: scale(1); }
            50% { box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0); transform: scale(1.1); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); transform: scale(1); }
        }

        .glow-animation {
            width: 100px;
            height: 100px;
            border-radius: 50%; /* For a circular shape */
            /* background-color: blue; */
            animation: glowing 2s infinite; /* Apply the glowing animation */
        }
</style>