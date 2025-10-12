<template>
  <!-- <div style="background-color: rgba(239, 239, 239, 255)" class="p-0">
    <Navbar></Navbar>
    <div class="mx-auto">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div> -->

  <div class="main-wrapper">
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="page-wrapper">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePrimeVue } from "primevue/config";
import Sidebar from '@/components/sidebar.vue'
import Header from '@/components/header.vue'
// import Navbar from '@/components/gobal/Navbar.vue'
// import Footer from '@/components/gobal/Footer.vue'
import { onMounted } from 'vue';


const changeLocalToThai = () => {
  const primevue = usePrimeVue();
  primevue.config.locale.dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  primevue.config.locale.dayNamesShort = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  primevue.config.locale.dayNamesMin = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  primevue.config.locale.monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  primevue.config.locale.monthNamesShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  primevue.config.locale.today = 'วันนี้';
  primevue.config.locale.clear = 'ยกเลิก';
};
onMounted(() => {
  // เพิ่มคลาส "mini-sidebar" ให้กับ <body> โดยตรง
  // document.body.classList.add("mini-sidebar");
  changeLocalToThai()
});
</script>

<style>
.p-fluid .p-button {
  width: auto;
}

.p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {
  width: auto;
}

.p-fluid .p-button {
  width: 100%;
}



.p-breadcrumb .p-breadcrumb-list {
  margin: 0;
  padding: 8px;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
</style>


