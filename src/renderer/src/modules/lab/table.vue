<template>
    
  <div>
    <div class="card flex justify-content-center">
        <Calendar v-model="date" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const date = ref();
</script>
<style scoped>

</style>