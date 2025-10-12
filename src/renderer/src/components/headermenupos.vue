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
    <li class="nav-item dropdown nav-item-box">
      <div class="text-center font-bold">
        <div>เวลาทำงาน</div>
        <div class="bg-yellow-500">{{ timeformat(resTimeDisplay) }}</div>
      </div>
    </li>
    <!-- <li class="nav-item dropdown nav-item-box">
      <Button label="Check-IN" severity="info" class="text-xl text-white font-semibold" rounded></Button>
    </li> -->
    <li class="nav-item dropdown nav-item-box">
    <Button v-if="isShowpull"  label="ดึงพักบิล" @click="stayData()" class="font-bold" severity="Warning" outlined raised  />
    <Button v-else  label="พักบิล" @click="stayData()" class="font-bold" severity="danger" outlined raised />
    </li>

    <li class="nav-item dropdown nav-item-box">
      <Button label="Check-OUT" @click="confirmDelete" severity="danger" class="text-xl font-semibold" rounded></Button>
    </li>

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
      <a href="javascript:void(0);" @click="showPrinter"
        :class="{ 'bg-red-500': priterlocal === null || priterlocal === undefined || priterlocal === '' || priterlocal === 'null' }">
        <vue-feather type="printer" data-bs-toggle="tooltip" title="fe fe-printer"
          style="color: rgb(53, 51, 51);"></vue-feather>
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
            <span class="user-img"><img :src="avataruser || '@/assets/img/navbar/man.png'" alt="" class="img-fluid"
                style="max-width: 40px; max-height: 40px;" />
              <span class="status online"></span></span>
            <div class="profilesets">
              <h6>{{ fullName }}</h6>
              <h5>{{ positionCode }} {{ positionName }}</h5>
            </div>
          </div>
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

  <ConfirmDialog></ConfirmDialog>
  <Alert :data="alertToast" />
</template>
<script setup>
// [[ IMPORT COMPONENT Alert]]
import { version } from "../../../../package.json"
import Alert from '@/components/gobal/Alert.vue' 
import { useConfirm } from "primevue/useconfirm";
import { ref, onMounted, onBeforeUnmount,inject  } from "vue";
import { parse, format, isWithinInterval } from 'date-fns'
import * as dataApi from './gobal/api/headerpos.js'
import { useRoute, useRouter } from "vue-router";

const dataItemStay = localStorage.getItem('dataItemStay');
const isShowpull = ref(checkIsStayItem(dataItemStay));

function checkIsStayItem(value) {
  value= JSON.parse(value);
  return value !== null && value !== '' && value.length != 0;
}

const eventBus = inject('eventBus');

// Define the triggerMethod function
const stayData = () => {
  const isPull=isShowpull.value?true:false;
  isShowpull.value = !isShowpull.value;
  eventBus.emit('stayData',isPull);
};

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


// ************** [ CHECK IN CHECK OUT SECTION ]
const timeformat = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const currentDate = ref(new Date());
const dateOnConnect = ref(format(currentDate.value, 'yyyy-MM-dd HH:mm:ss'));

const resIdForLogout = ref();
const resTimeDisplay = ref(0);
const getTimeShow = async () => {
  console.log('Your function is running every 30 seconds');
  const payload = {
    connect_datetime: dateOnConnect.value
  }
  try {
    const res = await dataApi.saveCheckIn(payload)
    console.log(res.data.data)
    resTimeDisplay.value = res.data.data.idle_time_sec;
    resIdForLogout.value = res.data.data.id;
  } catch (error) {
    console.log(error)
  }
};

// *******USE ROUTER *************
const router = useRouter();
const route = useRoute();


const confirm = useConfirm();
const confirmDelete = () => {
    confirm.require({
        message: 'คุณต้องการ Checkout การทำงานใช่หรือไม่?',
        header: 'ยืนยัน',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "ใช่",
        rejectLabel: "ไม่",
        accept: () => {
          onCheckOut()
        },
        reject: () => {
           
        }
    });
};

const onCheckOut = async () => {
  const payload = {
    id: resIdForLogout.value,
    connect_datetime: dateOnConnect.value
  };
  try {
    const res = await dataApi.saveCheckOut(payload);
    return await router.push({path:'/auth/logout'}) 
  } catch (error) {
    console.log(error)
  }
};



onMounted(() => {
  getTimeShow() // เรียกก่อนทันทีตอนเปิดหน้า
})

onMounted(() => {
  setInterval(getTimeShow, 30000);
});
onBeforeUnmount(() => {
  clearInterval();
});

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
