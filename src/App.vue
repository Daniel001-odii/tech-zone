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

<div class=" w-full h-screen flex flex-col">
    <Navbar/>
    <div class="h-full relative">
      <router-view></router-view>
    </div>
</div>

</template>

<style>

</style>
