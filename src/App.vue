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
<div class="bg-white dark:bg-[#27323F] dark:text-white">
  <router-view></router-view>
</div>
</template>

<style>
/* .background{
  background: url('../src/assets/images/backdrop.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

} */
</style>
