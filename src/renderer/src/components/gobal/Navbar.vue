<template>
  <nav style="background-color: rgb(219, 0, 0, 255)">
    <div class="flex align-items-center p-2 md:px-7 overflow-auto">
      <div class="flex align-items-center">
        Menu :
        <router-link to="/auth/login">login</router-link>
        |
        <router-link to="/home">Home</router-link>
        |
        <router-link class="ms-4" to="/pos/">POS</router-link>
      </div>
    </div>
  </nav>
</template>
