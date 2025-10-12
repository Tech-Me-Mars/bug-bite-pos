<template>
  <!-- Logo -->
  <div class="header-left active">
    <router-link to="/main/dashboard" class="logo logo-normal">
      <img src="../assets/img/logo/LOGO_MIX_STATION.png" alt="" style="height: 55px" />
    </router-link>
    <router-link to="/main/dashboard" class="logo logo-white">
      <img src="../assets/img/logo-white.png" alt="" style="height: 55px" />
    </router-link>
    <router-link to="/main/dashboard" class="logo-small">
      <img src="../assets/img/logo/LOGO_MIX_STATION_small.png" alt="" />
    </router-link>
    <a :class="$route.meta.hideClass" id="toggle_btn" href="javascript:void(0);">
      <vue-feather type="chevrons-left" class="feather-16"></vue-feather>
    </a>
  </div>
  <!-- /Logo -->
</template>
