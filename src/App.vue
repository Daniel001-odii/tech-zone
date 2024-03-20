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

<div class=" w-full h-screen bg-green-400 flex flex-col">
    <Navbar/>
    <div class="h-full bg-red-300 relative">
      <router-view></router-view>
    </div>
    <!-- <router-view></router-view> -->
</div>

<!-- <Navbar/>
<div class="relative flex">
  
</div> -->

    
</template>

<style>

</style>
