<script>
import LeftNavBar from './components/LeftNavBar.vue';
import Navbar from './components/Navbar.vue';
import { initFlowbite } from 'flowbite'

// import vue-cookie-accept-decline from '../node_modules/vue-cookie-accept-decline'

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
  
  <vue-cookie-accept-decline
  :debug="false"
  :disableDecline="false"
  :showPostponeButton="false"
  @clicked-accept="cookieClickedAccept"
  @clicked-decline="cookieClickedDecline"
  @clicked-postpone="cookieClickedPostpone"
  @removed-cookie="cookieRemovedCookie"
  @status="cookieStatus"
  elementId="myPanel1"
  position="bottom-right"
  ref="myPanel1"
  transitionName="fade"
  type="floating"
>
  <!-- Optional -->
  <template #postponeContent>&times;</template>

  <!-- Optional -->
  <template #message>
    We use cookies to ensure you get the best experience on our website.
    <a href="/privacy">Learn More...</a>
  </template>

  <!-- Optional -->
  <template #declineContent>Opt Out</template>

  <!-- Optional -->
  <template #acceptContent>Got It!</template>
</vue-cookie-accept-decline>

</div>
</template>

<style>
</style>
