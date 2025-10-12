<template>
  <div class="row">

    <!-- <Amoutestatus></Amoutestatus> -->
    <Modulestatus></Modulestatus>
  </div>

  <div class="card mb-0">
    <div class="card-body">
      <!-- <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search" @click="clearFilter()" >
                <img src="@/assets/img/icons/filter.svg" alt="img" />
                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
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
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="@/assets/img/icons/pdf.svg"
                    alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                    src="@/assets/img/icons/excel.svg" alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print" @click="printPage()"><img
                    src="@/assets/img/icons/printer.svg" alt="img" /></a>
              </li>
            </ul>
          </div>
        </div> -->
      <div class="flex justify-content-between">
        <h4 class="card-title">รายการขายล่าสุดของวัน</h4>
        <div class="wordset">
          <ul>
            <li>
              <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                  src="@/assets/img/icons/excel.svg" alt="img" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="table-responsive" v-if="resLastOrder.data">
        <DataTable :exportFilename="`ข้อมูลรายการขายวันนี้${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters"
          class="p-datatable-sm" :value="resLastOrder.data" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu"
          ref="dt" :total-records="totalRecords" :first="firstRows" :lazy="true" :loading="tabaleLoading" @sort="onSort($event)" @page="onPage($event)"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rows-per-page-options="[2,5, 10, 25, 50, 75, 100, 500, 1000]"
          currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
            'index',
            'saledate',
            'sale_number',
            'cus_fullname',
            'total_amount',

          ]" :pt="{
  paginator: {
    paginatorWrapper: { class: ' flex justify-content-end' },
    firstPageButton: { class: 'border-round-lg mr-1' },
    previousPageButton: { class: 'border-round-lg mr-1 ' },
    nextPageButton: { class: 'border-round-lg mr-1 ' },
    lastPageButton: { class: 'border-round-lg mr-1 ' },
    current: { class: 'border-round-lg text-orange-400' },
    pageButton: ({ props, state, context }) => ({
      class: context.active
        ? 'bg-orage-600 border-none border-round-lg mr-1'
        : 'bg-gray-600 border-none border-round-lg text-white mr-1'
    })
  }
}">
          <template #empty>
            <div class="flex flex-column justify-content-center align-items-center flex-1 py-3">
              ค้นหาข้อมูลไม่พบ...
              <img src="@/assets/img/datanotfound/no-results.png" alt="Customer Image" class="w-3rem h-3rem" />
            </div>
          </template>

          <Column header="รายการที่" field="index"   style="min-width: 5.2rem">
          </Column>

          <Column header="เลขที่ใบเสร็จ" field="sale_number" sortable style="min-width: 13rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
          </Column>

          <Column header="วันที่" field="saledate" filterField="saledate" dataType="date" sortable
            style="min-width: 7rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ formatDate(data.saledate) }}
            </template>
          </Column>

          <Column header="ชื่อลูกค้า" field="cus_fullname"  style="min-width: 11rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.cus_fullname }}
            </template>
          </Column>
          <Column header="จำนวนขาย" field="sale_details_count" sortable style="min-width: 7rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              <div v-if="data.sale_details_count">
                {{ formatNumber(data.sale_details_count) }} ชิ้น
                </div>
            </template>
          </Column>



          <Column header="จำนวนเงิน" field="total_amount" sortable="total_amount" style="min-width: 7.5rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              <div v-if="data.total_amount">
                {{ formatCurrency(data.total_amount) }}
                </div>
            </template>
          </Column>


          <Column header="ช่องทางชำระเงิน" field="payment_method_id" sortable="payment_method_id"
            style="min-width: 12rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>

            <template #body="{ data }">
              {{ data.payment.method_name }}
            </template>
          </Column>

        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import Amoutestatus from "@/components/gobal/Amoutestatus.vue"
import Modulestatus from "@/components/gobal/Modulestatus.vue"

import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import { parse, format, isWithinInterval } from 'date-fns'

import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
// Primevue API
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { da } from 'date-fns/locale'
// [ FOLDER API ]
import * as dataApi from './api/data.js'


const errorAlert = ref(false)
const alertToast = ref({})

onMounted(() => {
  loadLastOrder();
  loadDataOrderToday();
})

const isShowData = ref(false)
const resSummaryShift = ref()
const loadDataOrderToday = async () => {
  isShowData.value = false
  const date_sFormat = format(new Date(), 'yyyy-MM-dd')
  const date_eFormat = format(new Date(), 'yyyy-MM-dd')
  console.log(date_sFormat)
  console.log(date_eFormat)
  try {
    errorAlert.value = false
    const res = await dataApi.getSummaryReceipt(date_sFormat, date_eFormat)
    resSummaryShift.value = res.data.data.GetShiftSummary
    // นำไปแปลงเพื่อให้ sort date ได้
    if (resSummaryShift.value.length > 0) {
      resSummaryShift.value.forEach((item, i) => {
        item.index = i + 1
        if (
          (item.employee != null || item.employee != undefined) &&
          item.employee.first_name &&
          item.employee.last_name
        ) {
          item.emp_fullname = `${item.employee.title_name} ${item.employee.first_name} ${item.employee.last_name}`
        } else {
          item.emp_fullname = ''
        }
        if (
          (item.customer != null || item.customer != undefined) &&
          item.customer.first_name &&
          item.customer.last_name
        ) {
          item.cus_fullname = `${item.customer.title_name} ${item.customer.first_name} ${item.customer.last_name}`
        } else {
          item.cus_fullname = ''
        }
        if (item.sale_date) {
          const TimeFormat = new Date(item.sale_date)
          item.saledate = new Date(TimeFormat.toISOString().slice(0, 10))
          item.saletime = TimeFormat.toISOString().slice(11, 19)
        } else {
          item.dateonly = null
          item.timeonly = null
        }
      })
    }
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    isShowData.value = true
  } catch (error) {
    isShowData.value = false
    console.log(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
}

// ************* [ TABLE SERVERSIDE SECTION ]
const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    saledate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    },
    sale_number: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    cus_fullname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    total_amount: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    sale_details_count: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  }
}
initFilters()
const clearFilter = () => {
  initFilters()
}
const tabaleLoading = ref(false);
const paginator = ref({
  page: 1,
  limit: 10
});
const sortField = ref({
  field: null,
  orderby: null
})
const firstRows = ref(0)
const totalRecords = ref(0)
const resLastOrder = ref({ data: null });

const loadLastOrder = async () => {
  tabaleLoading.value = true;

  try {
    let currentIndex = 1;
    const res = await dataApi.getLastOrder(paginator.value, sortField.value);
    resLastOrder.value = res.data.data.sales; // [ OBJ ARRAY ]
    console.log('resLastOrder.value', resLastOrder.value)
    totalRecords.value = res.data.data.sales.total
    firstRows.value = res.data.data.sales.from - 1
    // รวมข้อมูลลูกค้า
    currentIndex = res.data.data.sales.from;
    resLastOrder.value.data.forEach((item, i) => {
      item.index = currentIndex;
      currentIndex++;
      if (
        (item.employee != null || item.employee != undefined) &&
        item.employee.first_name &&
        item.employee.last_name
      ) {
        item.emp_fullname = `${item.employee.title_name} ${item.employee.first_name} ${item.employee.last_name}`
      } else {
        item.emp_fullname = ''
      }
      if (
        (item.customer != null || item.customer != undefined) &&
        item.customer.first_name &&
        item.customer.last_name
      ) {
        item.cus_fullname = `${item.customer.title_name} ${item.customer.first_name} ${item.customer.last_name}`
      } else {
        item.cus_fullname = 'N/A'
      }
      if (item.sale_date) {
        const TimeFormat = new Date(item.sale_date)
        item.saledate = new Date(TimeFormat.toISOString().slice(0, 10))
        item.saletime = TimeFormat.toISOString().slice(11, 19)
      } else {
        item.dateonly = null
        item.timeonly = null
      }
    })

    console.log(totalRecords.value);
    console.log(resLastOrder.value);
  } catch (error) {
    tabaleLoading.value = false;
    console.error(error);
  }
  tabaleLoading.value = false;


};

const onPage = async (event) => {
  console.log(event);
  firstRows.value = event.first + 1
  paginator.value.page = event.page + 1;
  paginator.value.limit = event.rows;
  await loadLastOrder();
};

const onSort = async (event) => {
  console.log(event)
  sortField.value.field = event.sortField;
  if (event.sortOrder == -1) {
    sortField.value.orderby = 'desc';
  } else {
    sortField.value.orderby = 'asc';
  }
  await loadLastOrder();
};
const lazyParams = ref({});

// ************* [ END TABLE SERVERSIDE SECTION ]


const formatDate = (value) => {
  return value.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
const formatCurrency = (value) => {
  if (typeof value === 'string') {
    value = value.replace(",", "");
  }
  value = parseFloat(value)
  return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}

const formatNumber = (value) => {
  value = parseInt(value)
  return value.toLocaleString({ style: 'currency', currency: 'THB' })
}
const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

<style>
.p-column-filter-menu {
  display: inline-flex;
  margin-left: auto;
}
</style>