<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการสถานะช่องทางชำระเงิน" title1="" />
    </div>
    <div class="card">
      <div class="card-body">
        <!-- <div class="card-title">payment</div>
        <div class="container my-5">
          <div class="row" v-if="resDataPayment">
            <div class="col-12" v-for="(paymentMethod, index) in resDataPayment" :key="index">
              <div class="d-flex justify-content-between align-items-center text-center my-5 fs-5">
                <div class="fw-semibold order-1">{{ paymentMethod.method_name }}</div>
                <InputSwitch @change="toggleStatuPayment(paymentMethod.id)" class="mt-3 order-2"
                  v-model="paymentMethod.isactive" />
              </div>
            </div>
          </div>
        </div> -->
        <h4 class="card-title">ข้อมูลสถานะช่องทางการชำระเงิน</h4>
        <DataTable v-model:filters="filters" class="p-datatable-sm" :value="resDataPayment" dataKey="id"
          filterDisplay="menu" ref="dt"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
          currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
            'method_name',
            'description',
          ]">
          <template #empty> No Paymentmethods found. </template>

          <Column header="ชื่อช่องทางการชำระเงิน" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.method_name }}</template>
          </Column>

          <Column header="คำอธิบาย" field="description" sortable="description" style="min-width: 12rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              <div v-if="data.description">{{ data.description }}</div>
              <div v-else>Data Not Found</div>
            </template>
          </Column>



          <Column header="สถานะ" field="is_enabled" sortable="is_enabled" style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              <InputSwitch :disabled="loadingBtn" @change="toggleStatuPayment(data.id)" class="mt-3 order-2"
                v-model="data.isactive" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

  </div>




  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast"  />
</template>

<script setup>
import { ref, computed, unref, reactive, onMounted } from 'vue'
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
import * as dataApi from './api/data.js'
const paymentMethods = ref([
  { label: 'เงินสด', checked: false },
  { label: 'QR Payment', checked: false },
  { label: 'เครดิต', checked: false },
  { label: 'บัตรสวัสดิการแห่งรัฐ', checked: false }
])
// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

const resDataPayment = ref()
const loadDataSwitch = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.getPaymentMethod();
    resDataPayment.value = res.data.data;
    resDataPayment.value.forEach(item => {
      if (item.is_enabled == 1) {
        item.isactive = true;
      } else if (item.is_enabled == 0) {
        item.isactive = false;
      }
    });
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
  }
  loadingBtn.value = false;



}

onMounted(() => {
  loadDataSwitch();
});

const errorAlert = ref(false)
const alertToast = ref({})
const toggleStatuPayment = async (id) => {
  errorAlert.value = false
  loadingBtn.value = true;
  try {
    const res = await dataApi.toggleEnablePaymentMethod(id)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: ''
    }
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false;
  loadDataSwitch();
}
const breadcrumbItems = [{ label: 'สถานะช่องทางการชำระเงิน', to: '/payment' }]
</script>