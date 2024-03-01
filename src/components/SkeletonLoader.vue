<template>
<div class="p-4 gap-3 flex flex-col">
    <div class="skeleton h-5 bg-gray-100 w-28"></div>
    <div class="skeleton h-8 bg-gray-100 w-3/6"></div>
    <div class="flex flex-row gap-3">
      <div class="skeleton bg-gray-100 h-12 w-28 rounded-lg"></div>
      <div class="skeleton bg-gray-100 h-12 w-28 rounded-lg"></div>
    </div>
    <div class="skeleton h-5 bg-gray-100 w-full"></div>
    <div class="skeleton h-5 bg-gray-100 w-2/3"></div>
</div>
</template>

<script>
    export default {
        name: "SkeletonLoader",
    }
</script>

<style scoped>
    @keyframes skeletonLoading {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
}

.skeleton {
  animation: skeletonLoading 1.5s infinite;
}
</style>