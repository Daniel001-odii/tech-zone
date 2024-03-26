<template>
    <div>
        <div class="h-full bg-[rgb(0,0,0,70%)] fixed left-0 z-20 top-0 w-full flex justify-center items-center">
            <div class="flex flex-col bg-white justify-center items-center rounded-xl p-5 dark:bg-gray-700">
                <div>
                    <Vue3Lottie v-if="type == 'success'" 
                        :animationData="checkMark"
                        :height="80"
                        :width="80"
                    />

                    <Vue3Lottie v-if="type == 'failed'"
                        :animationData="cancel"
                        :height="80"
                        :width="80"
                    />
                    
                </div>
                <i v-if="type == 'fail'" class="bi bi-x-lg text-red-400 text-3xl"></i>
                <slot name="text-content">
                    <p class="p-3 font-bold text-lg">Application sent successfully</p>
                </slot>
                <div class="mt-3">
                    <slot name="button">
                            <RouterLink to="/in/jobs">
                                <button class="btn w-full">Return to work explorer</button>
                            </RouterLink>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import checkMark from '../lottie/check-mark.json'
    import cancel from '../lottie/cancel.json';


    export default {
        name: "FullPageModal",
        props: {
            type: String,
        },
        data(){
            return{
                checkMark,
                cancel,
            }
        }
    }
</script>

<style scoped>
#check-group {
    animation: 0.32s ease-in-out 1.03s check-group;
    transform-origin: center;
}

#check-group #check {
    animation: 0.34s cubic-bezier(0.65, 0, 1, 1) 0.8s forwards check;
    stroke-dasharray: 0, 75px;
    stroke-linecap: round;
    stroke-linejoin: round;
}

#check-group #outline {
    animation: 0.38s ease-in outline;
    transform: rotate(0deg);
    transform-origin: center;
}

#check-group #white-circle {
    animation: 0.35s ease-in 0.35s forwards circle;
    transform: none;
    transform-origin: center;
}

@keyframes outline {
  from {
    stroke-dasharray: 0, 345.576px;
  }
  to {
    stroke-dasharray: 345.576px, 345.576px;
  }
}
@keyframes circle {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
@keyframes check {
  from {
    stroke-dasharray: 0, 75px;
  }
  to {
    stroke-dasharray: 75px, 75px;
  }
}
@keyframes check-group {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.09);
  }
  to {
    transform: scale(1);
  }
}

</style>