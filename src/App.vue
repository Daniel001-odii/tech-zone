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

<div class=" h-screen w-full">
  <div>
    <Navbar/>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>

<!-- <Navbar/>
<div class="relative flex">
  
</div> -->

    
</template>

<style>

</style>
