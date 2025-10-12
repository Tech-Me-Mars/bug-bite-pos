<template>
  <div class="flex justify-content-start mb-3">
    <Breadcrumb :home="home" :model="items" :pt="{
        root: { 
          class: 'bg-orange-400 ', 
          style: 'padding: 0.1rem'
        },
        label:{ class: 'font-medium text-white'},
        icon:{ class: 'text-white'},
        separator: {class:'text-white'}
    }"  />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Breadcrumb from "primevue/breadcrumb";

const home = ref({
  icon: "pi pi-home",
  to: "/",
});

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => ({
      label: "home",
    }),
  },
});
</script>
