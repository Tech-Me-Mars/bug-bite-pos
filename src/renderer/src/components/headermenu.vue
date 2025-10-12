<template>
  <!-- Header Menu -->
  <ul class="nav user-menu">
    <!-- Search -->
    <li class="nav-item nav-searchinputs">
      <div class="top-nav-search">
        <span class="text-gray-600 text-xs">version {{ version ? ' ' + version : '' }}</span>
      </div>
    </li>
    <!-- /Search -->

    <!-- Flag -->
    <!-- <li class="nav-item dropdown has-arrow flag-nav nav-item-box">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);" role="button">
        <vue-feather type="globe"></vue-feather>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <a v-for="(entry, i) in languages" :key="`Lang${i}`" href="javascript:void(0);" :value="entry"
          :class="{ active: lan === entry.language }" class="dropdown-item" data-lang="en" title="English"
          @click="setLanguage(entry.language, entry.title, entry.iso)">
          <flag :iso="entry.iso" height="16" class="me-2" />
          <span class="align-middle">{{ entry.title }}</span>
        </a>
      </div>
    </li> -->
    <!-- /Flag -->
    <!-- <li class="nav-item nav-item-box">
      <a id="btnFullscreen" href="javascript:void(0);" @click="initFullScreen">
        <vue-feather type="maximize"></vue-feather>
      </a>
    </li> -->
    <!-- <li class="nav-item nav-item-box">
      <router-link to="/email">
        <vue-feather type="mail"></vue-feather>
        <span class="badge rounded-pill">1</span>
      </router-link>
    </li> -->
    <!-- Notifications -->
    <!-- <li class="nav-item dropdown nav-item-box">
      <a href="javascript:void(0);" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
        <vue-feather type="bell"></vue-feather><span class="badge rounded-pill">2</span>
      </a>
      <div class="dropdown-menu notifications">
        <div class="topnav-dropdown-header">
          <span class="notification-title">Notifications</span>
          <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
        </div>
        <div class="noti-content">
          <ul class="notification-list">
            <li v-for="item in headernotification" :key="item.id" class="notification-message">
              <router-link to="/">
                <div class="media d-flex">
                  <span class="avatar flex-shrink-0">
                    <img alt="" :src="`@/assets/img/profiles/${item.img}`" />
                  </span>
                  <div class="media-body flex-grow-1">
                    <p class="noti-details">
                      <span class="noti-title">{{ item.name }}</span> {{ item.task }}
                      <span class="noti-title">{{ item.booking }}</span>
                    </p>
                    <p class="noti-time">
                      <span class="notification-time">{{ item.time }}</span>
                    </p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="topnav-dropdown-footer">
          <router-link to="activities">View all Notifications</router-link>
        </div>
      </div>
    </li> -->
    <!-- /Notifications -->
    <li class="nav-item nav-item-box">
      <a href="javascript:void(0);" @click="showPrinter" :class="{ 'bg-red-500': priterlocal === null || priterlocal === undefined || priterlocal ===''|| priterlocal ==='null' }" >
        <vue-feather type="printer"  data-bs-toggle="tooltip"
          title="fe fe-printer" style="color: rgb(53, 51, 51);"></vue-feather>
        </a>
    </li>
    <li class="nav-item dropdown has-arrow main-drop">
      <a href="javascript:void(0);" class="dropdown-toggle nav-link userset" data-bs-toggle="dropdown">
        <span class="user-info">
          <span class="user-letter">
            <img :src="avataruser || '@/assets/img/navbar/man.png'" alt="" class="img-fluid"
              style="max-width: 40px; max-height: 40px;" />

          </span>
          <span class="user-detail">
            <span class="user-name">{{ fullName }}</span>
            <span class="user-role">{{ positionCode }} {{ positionName }}</span>
          </span>
        </span>
      </a>
      <div class="dropdown-menu menu-drop-user">
        <div class="profilename">
          <div class="profileset">
            <span class="user-img">
              <img :src="avataruser || '@/assets/img/navbar/man.png'" alt="" class="img-fluid"
                style="max-width: 40px; max-height: 40px;" />
              <span class="status online"></span></span>
            <div class="profilesets">
              <h6>{{ fullName }}</h6>
              <h5>{{ positionCode }} {{ positionName }}</h5>
            </div>
          </div>
          <hr class="m-0" />
          <hr class="m-0" />
          <router-link class="dropdown-item  bg-transparent hover:bg-gray-100 hover:text-orange-300"
            to="/profile"><vue-feather type="user" class=""></vue-feather>My Profile</router-link>
          <router-link class="dropdown-item logout pb-0" to="/auth/logout"><img src="../assets/img/icons/log-out.svg"
              class="me-2" alt="img" />Logout</router-link>
        </div>
      </div>
    </li>
  </ul>
  <!-- /Header Menu -->

  <!-- Dialog printer -->
  <Dialog v-model:visible="printerShow" modal header="บันทึก PRINTER" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <InputText v-model="priterText" type="text" class="mr-2" placeholder="พิมพ์ชื่อ PRINTER" />
    <Button @click="savePrinter()" type="submit" label="บันทึก" icon="pi pi-save" />
  </Dialog>
  <Alert :data="alertToast" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import { version } from "../../../../package.json"

const alertToast = ref({})
const printerShow = ref()
const showPrinter = async () => {
  priterText.value = priterlocal.value;
  printerShow.value = true;
};
const priterText = ref(null);
const priterlocal = ref(localStorage.getItem("printerBranch") || null);
const savePrinter = async () => {
  try {
    localStorage.setItem('printerBranch', priterText.value);
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: 'บันทึก PRINTER สำเร็จ',
      error: false
    }
  } catch (error) {
    printerShow.value = false;
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: 'บันทึก PRINTER ไม่สำเร็จ'
    }
  }
  printerShow.value = false;
  priterlocal.value = (localStorage.getItem("printerBranch") || null);
};



const avataruser = ref(localStorage.getItem("avatar") || '');
const fullName = ref(localStorage.getItem("fullname"));
const positionCode = ref(localStorage.getItem("position_code"));
const positionName = ref(localStorage.getItem("position_name"));


</script>

<style>
.user-info .user-letter {
  background: transparent;
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
}
</style>