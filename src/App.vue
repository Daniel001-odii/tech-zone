<script>
import LeftNavBar from './components/LeftNavBar.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar, LeftNavBar
  }
}
</script>

<template>
  <!-- <div class=""> -->

    <Navbar :type="'app'" @toggle-nav="nav_active = !nav_active"/>

    <!-- <div class=" flex flex"> -->
 
      <router-view></router-view>
    <!-- </div> -->

  <!-- </div> -->
    
    
</template>

<style>

</style>
