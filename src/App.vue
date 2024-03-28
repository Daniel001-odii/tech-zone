<script>
import LeftNavBar from './components/LeftNavBar.vue';
import Navbar from './components/Navbar.vue';
import { initFlowbite } from 'flowbite'

export default {
  components: {
    Navbar, LeftNavBar
  },

  mounted(){
    initFlowbite();
  }
}
</script>

<template>

<!-- <div class=" w-full h-screen flex flex-col"> -->
    <!-- <div class="h-full relative dark:bg-[#27323F] dark:text-white"> -->
      <router-view></router-view>
    <!-- </div> -->
<!-- </div> -->

</template>

<style>

</style>
