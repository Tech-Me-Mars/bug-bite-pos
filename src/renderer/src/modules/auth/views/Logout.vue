<template>
  <div class="error-page">
    <!-- Main Wrapper -->
    <div class="main-wrapper">
      <div class="error-box">
        <h3 class="h2 mb-3">
          <i class="fas fa-exclamation-circle"></i> กำลังออกจากระบบ...
        </h3>

        <div>
          <router-link to="/auth/login" class="btn btn-primary">ไปหน้า Login ทันที</router-link>
        </div>
      </div>
    </div>
    <!-- /Main Wrapper -->
  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import * as dataApi from "../api/data.js";
import { useRouter } from "vue-router";

const router = useRouter();


const logOut = async () => {
  try {
    const res = await dataApi.logout();
    clearLocal()
    await router.push("/auth/login");
  } catch (e) {
    clearLocal();
    await router.push("/auth/login");
  }
};

const clearLocal = async () => {
  // ดึงข้อมูลทั้งหมดจาก localStorage
  const allData = { ...localStorage };

  // ตรวจสอบและลบข้อมูลที่มี key เป็น "printerBranch"
  for (const key in allData) {
    if (key !== "printerBranch") {
      localStorage.removeItem(key);
    }
  }
};



onMounted(() => {
  logOut()
})

</script>
  