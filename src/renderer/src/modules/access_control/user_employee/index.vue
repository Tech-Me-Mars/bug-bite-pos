<template>
    <div class="content">


      <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการบุคลากร" title1="" />
      <div class="page-header">
        <div class="page-btn">
            <div class="page-header">
          <div class="page-btn">
            <router-link to="/access-control/user-employee/create">
              <Button label="เพิ่มบุคลากร" icon="pi pi-plus" severity="primary" class="mr-2" />
            </router-link>
          </div>
        </div>
        </div>
      </div>
    </div>
  
      <div class="card">
        <div class="card-body">
          <!-- top table -->
          <div class="table-top">
            <div class="search-set">
              <div class="search-path">
                <a class="btn btn-filter" id="filter_search" @click="clearFilter()" :class="{ setclose: filter }">
                  <img src="@/assets/img/icons/filter.svg" alt="img" />
                  <!-- @/assets/img/icons/filter.svg -->
                  <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
                </a>
              </div>
              <div class="search-input">
                <a class="btn btn-searchset"><img src="@/assets/img/icons/search-white.svg" alt="img" /></a>
                <div id="DataTables_Table_0_filter" class="dataTables_filter">
                  <label>
                    <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText class="form-control" v-model="filters['global'].value" placeholder="ค้นหา..." />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="wordset">
              <ul>

                <li>
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- end top table -->
  
  
          <h4 class="card-title">จัดการบุคลากร</h4>
          <div class="table-responsive">
            <DataTable ref="dt" :value="resUserEmployee" class="p-datatable-sm" v-model:selection="selectedUserEmployee"
              dataKey="id" :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]" currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
              :exportFilename="`จัดการบุคลากร_${format(
                new Date(),
                'ddMMyyyyHHmmss'
              )}`"
              :pt="{
  paginator: {
    paginatorWrapper: { class: ' flex justify-content-end' },
    firstPageButton: { class: 'border-round-lg mr-1' },
    previousPageButton: { class: 'border-round-lg mr-1 ' },
    nextPageButton: { class: 'border-round-lg mr-1 ' },
    lastPageButton: { class: 'border-round-lg mr-1 ' },
    current: { class: 'border-round-lg text-orange-400' },
    pageButton: ({ props, state, context }) => ({
      class: context.active ? 'bg-orage-600 border-none border-round-lg mr-1' : 'bg-gray-600 border-none border-round-lg text-white mr-1'
    }),
  },
}"
              >
              <template #empty> ไม่พบข้อมูลบุคลากร </template>
              <Column sortable field="indexkey" header="ลำดับ" style="min-width: 3rem" class="px-2 text-center">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #body="slotProps">
                  {{ slotProps.data.indexkey }}
                </template>
              </Column>
              <Column sortable header="เพศ" field="_employee.sexname" class="px-2" style="min-width: 1rem;">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column style="min-width: 7rem;" class="">
                <template #header>
                  <div class="flex-1 text-center">รูป</div>
                </template>
                <template #body="slotProps">
                  <div v-if="slotProps.data._employee != null" class="flex justify-content-center">
                    <Image class="" preview
                      :src="slotProps.data._employee.avatar_image !== null && slotProps.data._employee.avatar_image !== '' ? slotProps.data._employee.avatar_image : './image/image404.jpg'"
                      alt="Image" width="40" />
                  </div>
  
                </template>
              </Column>
              <Column header="ชื่อ" field="_employee.fullname" sortable="_employee.fullname" style="min-width: 13rem;"
                class="">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                    placeholder="Search by country" />
                </template>
                <template #body="slotProps">
                  <div v-if="slotProps.data._employee != null" class="flex align-items-end gap-2">
                    <span>
                      {{ slotProps.data._employee.fullname }}
                    </span>
                  </div>
  
                </template>
              </Column>
  
              <Column field="_employee.phone_no" header="เบอร์โทร" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
                <template #body="{ data }">
                  {{ (data._employee.phone_no) }}
                </template>
  
              </Column>
              <Column field="email" header="อีเมล์" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>
              <Column field="position_name" sortable style="min-width: 13rem" class="px-2">
                <template #header>
                  <div class="flex-1 text-center">
                    ตำแหน่ง
                  </div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #body="slotProps">
                  <div class="" v-if="slotProps.data._user_position">
                    <div class="text-center">
                      <Tag :value="slotProps.data.position_code" severity="primary" />
                    </div>
                    <div class="text-center ">{{ slotProps.data.position_name }}
                    </div>
                  </div>
                </template>
              </Column>
              <!-- <Column :exportable="false" header="เครื่องมือ" style="min-width: 7rem" class="px-2 text-center">
                <template #body="slotProps">
                  <router-link :to="`/access-control/user-employee/edit/${slotProps.data.id}`">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
                  </router-link>
                  <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data)" />
                </template>
              </Column> -->
              <Column field="status" sortable header="" style="min-width: 7rem" class="px-2">
                <template #header>
                  <div class="flex-1 text-center">
                    สถานะ
                  </div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #body="{ data }">
                <div class="flex justify-content-center">
                  <span class="badges bg-lightgreen" v-if="data.status == 1">เปิดใช้งาน</span>
                <span class="badges bg-lightred" v-if="data.status == 0">ปิดใช้งาน</span>
                </div>
              </template>
              </Column>
              
              <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible"
                style="min-width: 7rem;">
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #body="slotProps">
                  <router-link :to="`/access-control/user-employee/edit/${slotProps.data.id}`">
                    <Button type="button" icon="pi pi-pencil"
                      style="color: black; background: transparent; border: none;" />
                  </router-link>
                  <!-- <Button @click="confirmDelete(slotProps.data)" type="button" icon="pi pi-trash"
                    style="color: red; background: transparent; border: none" /> -->
                </template>
              </Column>




            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast"  />
  </template>
  
  <script setup>
import { ref, onMounted } from "vue";
import * as dataApi from "./api/data.js";
import { FilterMatchMode, FilterOperator } from 'primevue/api';

// Primevue API

import { format } from "date-fns";

import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
  
  onMounted(() => {
    loadData();
  });
  
  const breadcrumbItems = ref([
    { label: "จัดการบุคลากร", to: "/access-control/user-employee" },
  ]);
  
  const dt = ref();
  const selectedUserEmployee = ref();
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  
  //! /////// [validation] /////////
  import { useField, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as zod from "zod";
  const requireValue = "กรุณาระบุข้อมูล";
  
  //! /////// #END[validation] /////////
  
  const resUserEmployee = ref();
  // ************  GET[Data]    ************
  const loadData = async () => {
    stateLoadding.value = true;
    const res = await dataApi.getUserEmployee();
    stateLoadding.value = false;
    resUserEmployee.value = res.data.data;
    console.log(resUserEmployee.value);
    resUserEmployee.value.forEach((e, i) => {
      e.indexkey= i + 1
      if (e._employee) {
        e._employee.fullname = `${e._employee.title_name} ${e._employee.first_name} ${e._employee.last_name}`
        if (e._employee.sex == 1) {
          e._employee.sexname = "ชาย"
        } else {
          e._employee.sexname = "หญิง"
        }
      }
      e.index = i + 1;
      e.imgzoom = null
    });
  };
  
  // ************  GET #END[Data]   ************
  
  // ************  INSERT & Update  ************
  
  const errorAlert = ref(false);
  const alertToast = ref({});
  const stateLoadding = ref(false);
  
  // !!!!!!!!!!!!!!!!!! Delete !!!!!!!!!!!!!!!!!!!!!
  // ช่วงลบข้อมูล
  const conFirmation = ref(null); //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
  const confirmDelete = (obj) => {
    console.log(obj);
    if (obj._employee) {
      var messageDelete = `${obj._employee.title_name} ${obj._employee.first_name} ${obj._employee.last_name}`;
    } else {
      var messageDelete = `ID: ${obj.id}`;
    }
    const proCessConfirm = {
      // ส่งชื่อที่จะไปแสดง
  
      message: messageDelete,
      accept: () => {
        // เรียกฟังชั่นลบ แล้วส่งID ไป
        // deleteUserEmployee(obj._employee.user_id);
        deleteUserEmployee(obj.id);
      },
    };
    if (conFirmation.value) {
      conFirmation.value.openDialog(proCessConfirm);
    }
  };
  
  const deleteUserEmployee = async (itemId) => {
    console.log(itemId);
    stateLoadding.value = true;
    errorAlert.value = false;
    try {
      const rs = await dataApi.deleteUserEmployee(itemId);
      stateLoadding.value = false;
  
      if (rs.data.status == true) {
        alertToast.value = {
          severity: "success",
          summary: "ทำรายการสำเร็จ",
          detail: rs.data.message,
        };
        loadData();
      } else {
        alertToast.value = {
          severity: "error",
          summary: "ทำรายการไม่สำเร็จ",
          detail: rs.data.message,
        };
      }
    } catch (error) {
      console.log(error);
      const ErrorsFirstKey = Object.keys(error.response.data.data)[0];
      const ErrorfirstArray = error.response.data.data[ErrorsFirstKey][0];
      errorAlert.value = true;
      alertToast.value = {
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: ErrorfirstArray,
      };
    }
  };
  
  // !!!!!!!!!!!!!!!!!! #END [Delete] !!!!!!!!!!!!!!!!!!!!!
  
  ////////////////////////////////////////////////////////////////

  const exportCSV = () => {
    dt.value.exportCSV();
  };

  </script>
  