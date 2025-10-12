<template>
    <div class="content">
      <div class="d-flex justify-content-between">
        <Breadcrumb :items="breadcrumbItems" class="font-bold" /> 
        <!-- <pageheader title="สิทธิ์เข้าถึง" title1="กำหนดสิทธิ์" /> -->
      </div>
  
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-4" v-if="resUserEmployee.user && resUserEmployee.user._employee">
              <div class="d-flex text-black">
                <div class="flex-shrink-0">
                  <img
                    :src="resUserEmployee.user._employee.avatar_image != null && resUserEmployee.user._employee.avatar_image != '' ? resUserEmployee.user._employee.avatar_image : '/image/image404.jpg'"
                    alt="" class="img-fluid" style="width: 180px; border-radius: 10px" />
                </div>
                <div class="flex-grow-1 ms-3">
                  <h5 class="mb-1">{{ resUserEmployee.user._employee.title_name }}
                    {{ resUserEmployee.user._employee.first_name }}
                    {{ resUserEmployee.user._employee.last_name }}</h5>
                  <p class="mb-2 pb-1" style="color: #2b2a2a">
                    {{ resUserEmployee.user._user_position._position.position_name }}
                    {{ resUserEmployee.user._user_position._position.position_code }}
                  </p>
                  <p class="mb-2 pb-1" style="color: #2b2a2a">
                    {{ resUserEmployee.user.email }}
                  </p>
                  <div class="flex">
                    <div class="mr-2">
                      <Dropdown filter autoFilterFocus v-model="positionId" :options="resPosition" :optionLabel="(option) => option.position_code + ' ' + option.position_name
                        " optionValue="id" placeholder="ตำแหน่ง" class="" />
                    </div>
                    <div class="p-field">
                      <Button type="button" size="" icon="pi pi-save" label="บันทึก" class="border-round-md px-3"
                        @click="(() => { savePosition();})" :loading="loadingBtn" severity="success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- picklist -->
      <div class="card">
        <PickList v-model="resPermisstion" listStyle="height:342px" class="mb-3 card-body" dataKey="id">
          <template #sourceheader> สามารถเลือกได้ </template>
          <template #targetheader> สิทธิ์ที่เลือก </template>
          <template #item="slotProps">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
              <div class="flex-1 flex flex-column gap-2">
                <span class="font-bold">{{ slotProps.item.name }}</span>
                <div class="flex align-items-center gap-2">
                  <!-- <i class="pi pi-tag text-sm"></i> -->
                  <span>{{ slotProps.item.description }}</span>
                </div>
              </div>
            </div>
          </template>
        </PickList>
        <div class="flex justify-content-end flex-wrap mr-3 mb-4">
          <router-link to="/access-control/perminssion-user">
            <Button :loading="loadingBtn" type="button" severity="info" label="กลับ"  
              class="px-4 mx-1" />
          </router-link>
          <Button type="button" severity="บันทึก" icon="pi pi-save" label="บันทึก" @click="(() => { savePermisstion();})" :loading="loadingBtn"
            class="px-3" />
        </div>
      </div>
  
    </div>
    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast"  />
  </template>
  
  <script setup>
import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from "vue";
  import * as dataApi from "./api/data.js";
  import { FilterMatchMode } from "primevue/api";
  
  import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
  
  const route = useRoute();
  const router = useRouter();
  const urlpamra = ref();
  onMounted(async () => {
    urlpamra.value = route.params.id;
    console.log(urlpamra.value);
    await loadData();
  });
  //  ************* [[ VARIABLES ]]
  const positionData = ref({
    position_code: null,
    position_name: null,
  });
  
  const loadingBtn = ref(false);
  
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  
  const breadcrumbItems = ref([
    {
      label: "จัดการผู้ใช้ที่ได้รับอนุญาต",
      to: `/access-control/perminssion-user`,
    },
    { label: "กำหนดสิทธิ์", to: `/access-control/perminssion-user/manage/${route.params.id}` },
  ]);
  
  //! /////// [validation] /////////
  import { useField, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as zod from "zod";
  
  const stateLoadding = ref(false);
  const resUserEmployee = ref({});
  const resPosition = ref();
  const resPermisstion = ref([], []);
  const userId = ref();
  const permisstionCanAdd = ref();
  const permisstionUserHas = ref();
  const positionId = ref();
  const userPosition = ref();
  // ************  GET[Data]    ************
  const loadData = async () => {
    stateLoadding.value = true;
  
    const res = await dataApi.permissionUserGetById(route.params.id);
    userId.value = res.data.data.user._employee.user_id;
    resUserEmployee.value = res.data.data;
    console.log(resUserEmployee.value);
  
    if (res.data.data.user._user_position) {
      positionId.value = res.data.data.user._user_position.position_id;
      userPosition.value = res.data.data.user._user_position.id;
    }
  
    permisstionCanAdd.value = res.data.data.userPermissionsCanAdd;
    permisstionUserHas.value = res.data.data.userPermissions;
    resPermisstion.value[0] = permisstionCanAdd.value;
    resPermisstion.value[1] = permisstionUserHas.value;
    // await findPosition(resUserEmployee.value.user._employee)
  
    const rsfetchPosition = await dataApi.getPosition();
    resPosition.value = rsfetchPosition.data.data;
    console.log('posiitiopn',resPosition.value)
  
    // const resApiPermisstion = await dataApi.getPermisstions();
    // resPermisstion.value[0] = resApiPermisstion.data.data
    // resPermisstion.value[1] = []
    // console.log(resPermisstion.value);
    stateLoadding.value = false;
  };
  
  // หาตำแหน่งงานโดย position_codeและposition_name
  const findPosition = async () => {
    const selectedObj = resPosition.value.find(
      (obj) => obj.id == positionId.value
    );
    positionData.value.position_code = selectedObj.position_code;
    positionData.value.position_name = selectedObj.position_name;
  };
  // ************* [[ POSTION CHANGE ]]
  
  // ************  GET #END[Data]   ************
  
  // ************  INSERT & Update  ************
  const handelEditeStatus = ref(false);
  
  const errorAlert = ref(false);
  const alertToast = ref({});
  
  const savePosition = async () => {
    loadingBtn.value = true;
    errorAlert.value = false;
    const data = {
      user_id: userId.value,
      position_id: positionId.value,
      status: 1, // 1 | 0
    };
    try {
      stateLoadding.value = true;
      const res = await dataApi.updateUserPosition(data, userPosition.value);
      console.log(res.data);
      stateLoadding.value = false;
      loadData();
      alertToast.value = {
        severity: "success",
        summary: "ทำรายการสำเร็จ",
        detail: res.data.message,
      };
      // resetField();
    } catch (error) {
      loadingBtn.value = false;
      const ErrorsFirstKey = Object.keys(error.response.data.data)[0];
      const ErrorfirstArray = error.response.data.data[ErrorsFirstKey][0];
      errorAlert.value = true;
      alertToast.value = {
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: ErrorfirstArray,
      };
      console.log(error);
    }
    loadingBtn.value = false;
  };
  
  const savePermisstion = async () => {
    // [[ CONVERT PERMISSIONS SELECTED OBJ TO ARRAY ]]
    loadingBtn.value = true;
    const permissionArray = resPermisstion.value[1].map((item) => item.id);
    const dataForSavePermisstion = {
      user_id: userId.value,
      permission: permissionArray,
    };
    console.log(JSON.stringify(dataForSavePermisstion));
  
    errorAlert.value = false;
    try {
      stateLoadding.value = true;
      const res = await dataApi.savePermissionUser(dataForSavePermisstion);
      console.log(res);
      // More Function
      stateLoadding.value = false;
      if (res.data.status == true) {
        loadData();
        alertToast.value = {
          severity: "success",
          summary: "ทำรายการสำเร็จ",
          detail: res.data.message,
        };
        await router.push({path:'/access-control/perminssion-user'})
        // resetField();
      } else {
        // status false
        alertToast.value = {
          severity: "error",
          summary: "ทำรายการไม่สำเร็จ",
          detail: res.data.message,
        };
      }
    } catch (error) {
      loadingBtn.value = false;
      const ErrorsFirstKey = Object.keys(error.response.data.data)[0];
      const ErrorfirstArray = error.response.data.data[ErrorsFirstKey][0];
      errorAlert.value = true;
      alertToast.value = {
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: ErrorfirstArray,
      };
      console.log(error);
    }
    loadingBtn.value = false;
  };
  
  
  // ************  #END [INSERT & Update]  ************
  
  // !!!!!!!!!!!!!!!!!! Delete !!!!!!!!!!!!!!!!!!!!!
  // ช่วงลบข้อมูล
  const conFirmation = ref(null); //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
  const confirmDelete = (obj) => {
    console.log(obj);
    const proCessConfirm = {
      // ส่งชื่อที่จะไปแสดง
      message: obj.branch_name,
      accept: () => {
        // เรียกฟังชั่นลบ แล้วส่งID ไป
        deletebranches(obj.id);
      },
    };
    if (conFirmation.value) {
      conFirmation.value.openDialog(proCessConfirm);
    }
  };
  
  // !!!!!!!!!!!!!!!!!! #END [Delete] !!!!!!!!!!!!!!!!!!!!!
  
  ////////////////////////////////////////////////////////////////
  
  const openNew = () => {
    branchesDialog.value = true;
    handleReset();
    branchesId.value = null;
  };
  
  const hideDialog = () => {
    branchesDialog.value = false;
  };
  
  // define id for edit
  const brancesId = ref();
  
  const editbranches = async (prod) => {
    try {
      branchesId.value = prod.id;
      const rs = await dataApi.getBranchesById(prod.id);
      console.log(rs);
      stateLoadding.value = true;
      branch_name.value = prod.branch_name;
      address.value = prod.address;
      phone_number.value = prod.phone_number;
      email.value = prod.email;
      branch_type_id.value = prod.branch_type_id;
    } catch (error) {
      const ErrorsFirstKey = Object.keys(error.response.data.data)[0];
      const ErrorfirstArray = error.response.data.data[ErrorsFirstKey][0];
      alertToastStatus.value = true;
      errorAlert.value = true;
      alertToast.value = {
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: ErrorfirstArray,
      };
      console.error(error);
    }
    stateLoadding.value = false; // โหลดเสร็จแล้ว
  
    handelEditeStatus.value = true;
    branchesDialog.value = true;
  };
  const confirmDeletebranches = (prod) => {
    console.log(prod);
    branchesId.value = prod.id;
    type_name.value = prod.type_name;
    deletebranchesDialog.value = true;
  };
  
  const exportCSV = () => {
    dt.value.exportCSV();
  };
  const confirmDeleteSelected = () => {
    deletebranchessDialog.value = true;
  };
  const deleteSelectedbranchess = () => {
    branchess.value = branchess.value.filter(
      (val) => !selectedbranchess.value.includes(val)
    );
    deletebranchessDialog.value = false;
    selectedbranchess.value = null;
    // toast.add({ severity: 'success', summary: 'Successful', detail: 'branchess Deleted', life: 3000 });
  };
  

  </script>
  