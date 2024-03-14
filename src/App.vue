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


<Navbar :type="'app'"/>
<div class="relative flex">
  <router-view></router-view>
</div>

    
</template>

<style>

</style>
