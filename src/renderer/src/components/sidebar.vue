<template>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar" :class="$route.meta.sidebarClass">
    <div class="slimScrollDiv">
      <div class="sidebar-inner slimscroll">
        <perfect-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
          <div id="sidebar-menu" class="sidebar-menu">
            <ul>
              <li class="submenu-open" v-for="(item) in menuData" :key="item">
                <h6 class="submenu-hdr" v-if="item.label">{{ item.label }}</h6>
                <ul>
                  <li v-for="(list) in item.menu_list" :key="list" :class="customClass(list.url)">
                    <router-link :to="list.url">
                      <!-- เข้าicon -->
                      <div v-if="list.icon_class != null && (list.icon_img == null || list.icon_img == '')">

                        <i v-if="list.icon_class.startsWith('typcn')" :class="`typcn ${list.icon_class} text-xl mr-2`"
                          data-bs-toggle="tooltip" title="typcn typcn-document-add">
                        </i>

                        <span v-else-if="list.icon_class.startsWith('mdi')" :class="`mdi ${list.icon_class} text-xl mr-2`"></span>


                        <vue-feather v-else :type="list.icon_class" data-bs-toggle="tooltip"></vue-feather>
                      </div>
                  

                      <!-- เข้ารูป icon -->
                      <div
                        v-else-if="list.icon_img != null && list.icon_img != '' && (list.icon_class == null || list.icon_class == '')">
                        <img :src="list.icon_img" alt="ไอคอน" style="height: 24px; width: 24px;" class="icon">
                      </div>

                      <div v-else>
                      </div>
                      <span>{{ list.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <!-- <li class="submenu-open">
                <h6 class="submenu-hdr">Main</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/main/dashboard"><vue-feather type="grid"></vue-feather><span>Dashboard</span>
                    </router-link>
                  </li>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/report-sale">
                      <vue-feather type="book-open"></vue-feather>
                      <span>สรุปยอดขาย
                      </span></router-link>
                  </li>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/importproducts"><vue-feather type="package"></vue-feather><span>นำเข้าสินค้า</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">POS</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/pos"><i class="typcn typcn-shopping-cart text-xl mr-2" data-bs-toggle="tooltip"
                        title="typcn typcn-document-add"></i><span>ONE STOP</span></router-link>
                  </li>


                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">เมนูจัดการ</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/payment"><vue-feather
                        type="dollar-sign"></vue-feather><span>ช่องทางชำระเงิน</span></router-link>
                  </li>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/customer"><vue-feather type="user"></vue-feather><span>ลูกค้า</span></router-link>
                  </li>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/category"><vue-feather
                        type="server"></vue-feather><span>Category</span></router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">เมนูจัดการ</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/access-control/perminssion-user"><i class="typcn typcn-cog-outline text-xl mr-2"
                        data-bs-toggle="tooltip" title="typcn typcn-cog-outline"></i><span>Permission User
                      </span></router-link>
                  </li>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/access-control/user-employee"><vue-feather type="users"></vue-feather><span>พนักงาน

                      </span></router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">ตั้งค่า POS</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/connnent-pos-center"><vue-feather type="link"></vue-feather><span>Connent Pos
                        Center</span></router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">จัดการสินค้า</h6>
                <ul>
                  <li v-bind:class="{
                    active: currentPath == 'index' || currentPath == 'index',
                  }">
                    <router-link to="/claimproduct"><i class="typcn typcn-spanner text-xl mr-2" data-bs-toggle="tooltip"
                        title="typcn typcn-spanner"></i><span>เคลมสินค้า
                      </span></router-link>
                  </li>
                </ul>
              </li> -->
            </ul>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
  <!-- /Sidebar -->
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import { useRoute, useRouter } from "vue-router";
//      [[ INPORT STORE ]]
import { useMenuAccessStore } from "@/store/useMenuAccess";

// *******USE ROUTER *************
const router = useRouter();
const route = useRoute();

const menuStore = useMenuAccessStore();
const resmenuData = ref(menuStore.data); // ตอนนี้เป็นค่าว่าง

const loadDataFromStore = async () => {
  await menuStore.fetchData();
  resmenuData.value = menuStore.data; // ตอนนี้มีข้อมูล
  console.log('resmenuData.value', resmenuData.value)
};
// const currentRoute = ref(route.path);
const currentRoute = computed(() => {
  return route.path;
});
// watch(
//   () => route.fullPath,
//   (newValue, oldValue) => {
//     currentRoute.value = newValue;
//   }
// );
const customClass = (list) => {
  if (currentRoute.value == "/" && list == "/") {
    return "active";
  } else if (currentRoute.value.includes(list) && currentRoute.value != "/" && list != "/") {
    return "active";
  }
}
onMounted(async () => {
  currentRoute.value = route.path;
  loadDataFromStore();
});

const menuData = computed(() => {
  if (resmenuData.value) {
    return resmenuData.value
      .map((item) => {
        if (item.icon_class != null && item.icon_class != '') {
          item.icon_class = item.icon_class.replace("fe fe-", "");
        }
        // ดำเนินการแทนที่ค่า icon_class ใน menu_list
        item.menu_list = item.menu_list.map((subItem) => {
          if (subItem.icon_class) {
            subItem.icon_class = subItem.icon_class.replace("fe fe-", "");
          }
          return subItem;
        });
        return {
          ...item,
          isActive: item.menu_list.some(
            (subItem) => subItem.url === currentRoute.value
          ),
        };
      });
  }
});
</script>
