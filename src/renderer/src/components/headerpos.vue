<template>
  <!-- Header -->
  <div class="header">
    <headerlogo1 />

    <a id="mobile_btn" class="mobile_btn" href="/">
      <span class="bar-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </a>

    <headermenupos />

    <mobilemenu />
  </div>
  <!-- Header -->
</template>
<script setup>
import headermenupos from '@/components/headermenupos.vue'
import headerlogo1 from '@/components/headerlogo1.vue'
</script>
