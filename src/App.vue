<script>
import LeftNavBar from './components/LeftNavBar.vue';
import Navbar from './components/Navbar.vue';
import { initFlowbite } from 'flowbite'

export default {
  components: {
    Navbar, LeftNavBar
  },

  methods: {
    cookieClickedAccept(){

    },
    cookieClickedDecline(){
    },
    cookieClickedPostpone(){

    },
    cookieRemovedCookie(){

    },
    cookieStatus(){

    },
  },

  mounted(){
    initFlowbite();
  }
}
</script>

<template>
<!-- <div class="bg-white dark:bg-[#27323F] dark:text-white border"> -->
<div class="">
  <router-view></router-view>


</div>
</template>

<style>
</style>
