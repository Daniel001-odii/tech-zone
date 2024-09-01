<template>
    <div>
        <div class="relative flex justify-center items-center">
            <span class="loader"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SpinnerComponent",
    }
</script>

<style scoped>
.loader {
    width: 20px;
    height: 20px;
    border: 4px solid #dfdfdf;
    border-bottom-color: transparent;
    border-radius: 50%;
    /* display: inline-block; */
    /* box-sizing: border-box; */
    animation: rotation 1s linear infinite;
    position: absolute;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
  
</style>