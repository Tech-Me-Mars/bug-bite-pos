<template>
  <!-- <div style="background-color: rgba(239, 239, 239, 255)" class="p-0">
    <Header></Header>
    <div class="mx-auto">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div> -->

  <div class="h-screen" style="">
    <headerpos></headerpos>
    <div class="page-wrapper ms-0 h-full my-auto">
      <router-view></router-view>
    </div>
  </div>


  <!-- <div class="main-wrapper">
    <Header></Header>
  <Sidebar></Sidebar>
  <div class="page-wrapper">
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</div> -->
</template>

<script setup>
import headerpos from '@/components/headerpos.vue'
import Sidebar from '@/components/sidebar.vue'
import Header from '@/components/header.vue'
// import Navbar from '@/components/gobal/Navbar.vue'
// import Footer from '@/components/gobal/Footer.vue'
import { onMounted } from 'vue';

onMounted(() => {
  // เพิ่มคลาส "mini-sidebar" ให้กับ <body> โดยตรง
  // document.body.classList.add("mini-sidebar");
});
</script>

<style >
html {
  margin: 0px;
  padding: 0px;
}

body {
  margin: 0px;
  padding: 0px;
}




</style>


