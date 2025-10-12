<script setup>
import Versions from './components/Versions.vue'
</script>

<template>
  <!-- <Versions></Versions> -->

  <router-view></router-view>
</template>

<style lang="less">
// custome calendar
.p-datepicker table th {
    text-align: center;
}

.versions {
  margin: 0 auto;
  float: none;
  clear: both;
  overflow: hidden;
  font-family: 'Menlo', 'Lucida Console', monospace;
  color: #1A424A;
  line-height: 1;
  transition: all 0.3s;

  li {
    display: block;
    float: left;
    border-right: 1px solid rgba(194, 245, 255, 0.4);
    padding: 0 20px;
    font-size: 13px;
    opacity: 0.8;

    &:last-child {
      border: none;
    }
  }
}
</style>
