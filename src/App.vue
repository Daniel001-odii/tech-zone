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
<div class="bg-white dark:bg-[#27323F] dark:text-white border border-green-500">
  <router-view></router-view>
</div>
</template>

<style>
</style>
