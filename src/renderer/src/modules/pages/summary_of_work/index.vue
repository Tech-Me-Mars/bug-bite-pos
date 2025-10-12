<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader :title="`สรุปกะทำงาน`" title1="" />
    </div>


    <div class="card mb-2">
      <div class="card-body">
        <div class="mb-3 flex justify-content-between">
          <Form @submit="onSerch" class="flex w-full row p-0">
            <div class="col-12 col-md-5">
              <div class="flex justify-content-center ">
                <label class=" font-semibold text-gray-600 text-center" for="birth_date">วันที่เริ่มต้น</label>
              </div>
              <Calendar id="received_date" v-model="date_s" showIcon placeholder="วันที่เริ่มต้น" class="w-full"
              :dateFormat="customDateFormat(date_s)" showButtonBar />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_s }}</small>
            </div>
            <div class="col-12 col-md-5">
              <div class="flex justify-content-center ">
                <label class=" font-semibold text-gray-600 text-center" for="birth_date">วันที่สิ้นสุด</label>
              </div>
              <Calendar id="received_date" v-model="date_e" :minDate="date_s" showIcon placeholder="วันที่สิ้นสุด" class="w-full"
              :dateFormat="customDateFormat(date_e)" />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_e }}</small>
            </div>

            <div class="col-12 col-md-2 flex align-items-center ">

              <Button class=" h-3rem w-7rem mt-3 text-lg" :loading="loadingBtn" severity="danger" icon="pi pi-search"
                label="ค้นหา" type="submit" />
            </div>
          </Form>
        </div>
      </div>
    </div>

    <section v-if="isShowData">
      <div class="card w-full md:w-6">
        <div class="card-body py-3">
          <div class="px-3">
            <div class="row">
              <div class="col-12">
                <address>
                  <strong class="text-xl">ที่ตั้งสาขา <i class="pi pi-building"></i></strong><br>
                  {{ resBranch.branch_name }} <br>
                  {{ resBranch.address }},<br>
                  <abbr title="Phone"><i class="pi pi-phone"></i> :</abbr> {{ resBranch.phone_number }}<br>
                  <abbr title="Email"><i class="pi pi-envelope"></i> :</abbr> {{ resBranch.email }}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row my-0" style="display: flex;">
        <div class="col-lg-4 col-sm-6 col-12  d-flex align-items-stretch">
          <div class="dash-widget" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img src="@/assets/img/icons/dash1.svg" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>ยอดขายรายวัน</h6>
              <h5>
                ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2"
                  :delay="3" :endAmount="resGetShiftSummaryDaily.sum_amount" :duration="5" :autoinit="true" />
              </h5>

            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget dash1" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img src="@/assets/img/icons/dash2.svg" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>จำนวนใบเสร็จ</h6>
              <h5>
                <vue3-autocounter class="counter" ref="counter" :startAmount="0" :delay="3"
                  :endAmount="resGetShiftSummaryDaily.count_bill" :duration="5" :autoinit="true" />
              </h5>

            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget dash2" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img src="@/assets/img/icons/dash3.svg" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>ระยะเวลาทำงานรายวัน</h6>
              <h5 class="fw-bold">{{ resBranch.branch_open }} - {{ resBranch.branch_close }}</h5>

            </div>
          </div>
        </div>
      </div>



      <div class="card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-path">
                <a class="btn btn-filter" id="filter_search" @click="clearFilter()" :class="{ setclose: filter }">
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
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- end top table -->

          <h4 class="card-title">ข้อมูลสรุปกะทำงาน</h4>
          <div class="table-responsive">
            <DataTable :exportFilename="`ข้อมูลสรุปกะทำงาน${format(new Date(), 'ddMMyyyyHHmmss')}`"
              v-model:filters="filters" v-model:selection="selectedRowTable" class="p-datatable-sm" 
              :value="resSummaryShift" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
                'index',
                'saledate',
                'cus_fullname',
                'emp_fullname',
                'total_amount',
                'sum_qty',
              ]" :pt="{
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
}">


              <template #empty> No Paymentmethods found. </template>

              <Column header="รายการที่" field="index" sortable style="min-width: 8rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #body="{ data }">
                  {{ data.index }}</template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>

              <Column header="พนักงาน" style="min-width: 8rem">
              </Column>
              <Column header="วันที่เข้ากะ" style="min-width: 8rem">
              </Column>
              <Column header="วันที่ออกกะ" style="min-width: 8rem">
              </Column>
              <Column header="รอบที่" style="min-width: 8rem">
              </Column>
              <Column header="สรุปเวลารวม" style="min-width: 8rem">
              </Column>

              <!-- <Column header="วันที่" field="saledate" filterField="saledate" dataType="date" sortable
                style="min-width: 12rem">
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
                  
                  <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" //
                    mask="99/99/9999" />
                  
                </template>
                <template #body="{ data }">
                  {{ formatDate(data.saledate) }}
                  </template>
                </Column>
              

              <Column header="ลูกค้า" field="cus_fullname" sortable="cus_fullname" style="min-width: 12rem">
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
                  {{ data.cus_fullname }}
                </template>
              </Column>

              <Column header="พนักงาน" field="emp_fullname" sortable="emp_fullname" style="min-width: 12rem">
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
                  {{ data.emp_fullname }}
                </template>
              </Column>



              <Column header="จำนวนสินค้า" field="sum_qty" sortable="sum_qty" style="min-width: 12rem">
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
                  <div v-if="data.sum_qty">{{ formatNumber(data.sum_qty) }}</div>
                  <div v-else>No Data</div>
                </template>
              </Column>
              <Column header="จำนวนเงินทั้งหมด" field="total_amount" sortable="total_amount" style="min-width: 12rem">
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
                  {{ formatCurrency(data.total_amount) }}
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
                  {{ data.payment[0].method_name }}
                </template>
              </Column>

            --> 


            </DataTable>
          </div>
        </div>
      </div>

    </section>

  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" :error="errorAlert" />
</template>

<script setup>
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
// [ VUE ROUTER ]
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const errorAlert = ref(false)
const alertToast = ref({})


// ************* [ LOADING BTN ]
const loadingBtn = ref(false)


//*********** VALIDATETION ****************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
  zod.object({
    date_s: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    date_e: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
  })
);
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema,
});

//*********** CONST VARIABLE FORM ****************

const { value: date_s } = useField("date_s", null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
});
const { value: date_e } = useField("date_e", null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
});

const onSerch = handleSubmit(async (values) => {
  
  loadDataSearch();
 
});

onMounted(() => {

});

const strToDecimals = async (num) => {
  if (num==null || num==undefined) {
    return 0;
  }
  const result = await parseFloat(num.replace(/,/g, ""));
  console.log(result)
  return result;
}
const isShowData = ref(false);
const resBranch = ref();
const resSummaryShift = ref()
const resGetShiftSummaryDaily = ref({ sum_amount: 0, count_bill: 0 })
const loadDataSearch = async () => {
  loadingBtn.value = true;
  isShowData.value = false;
  const date_sFormat = format(new Date(date_s.value), "yyyy-MM-dd");
  const date_eFormat = format(new Date(date_e.value), "yyyy-MM-dd");
  try {
    errorAlert.value = false;
    const res = await dataApi.getSummaryShift(date_sFormat, date_eFormat)
    console.log(res.data.data)
    resSummaryShift.value = res.data.data.GetShiftSummary;
    resBranch.value = res.data.data.GetShiftSummary[0].branch;


    // นำไปแปลงเพื่อให้ sort date ได้
    if (resSummaryShift.value.length > 0) {
      resSummaryShift.value.forEach((item, i) => {
        item.index = i + 1;
        if ((item.employee != null || item.employee != undefined) && item.employee.first_name && item.employee.last_name) {
          item.emp_fullname = `${item.employee.title_name} ${item.employee.first_name} ${item.employee.last_name}`;
        } else {
          item.emp_fullname = '';
        }
        if ((item.customer != null || item.customer != undefined) && item.customer.first_name && item.customer.last_name) {
          item.cus_fullname = `${item.customer.title_name} ${item.customer.first_name} ${item.customer.last_name}`
        } else {
          item.cus_fullname = '';
        }

        if (item.sale_date) {
          const TimeFormat = new Date(item.sale_date);
          item.saledate = new Date(TimeFormat.toISOString().slice(0, 10));
          item.saletime = TimeFormat.toISOString().slice(11, 19);
        } else {
          item.dateonly = null;
          item.timeonly = null;
        }

      });
    }

    resGetShiftSummaryDaily.value = res.data.data.GetShiftSummaryDaily[0];
    resGetShiftSummaryDaily.value.sum_amount = await strToDecimals(resGetShiftSummaryDaily.value.sum_amount)
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };
    isShowData.value = true;
  } catch (error) {
    loadingBtn.value = false;
    isShowData.value = false;
    console.log(error)
    errorAlert.value = true
    // alertToast.value = {
    //   detail: error.response.data.message
    // }
  }
  loadingBtn.value = false;
};


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
    emp_fullname: {
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
    sum_qty: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },

  }
}

initFilters()

const clearFilter = () => {
  initFilters()
}



const formatDate = (value) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  return value.toLocaleDateString('th-TH', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
}

// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543;
    return format(new Date(date), `dd/MM/${thaiYear}`);
  }
};

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
};

const breadcrumbItems = [
  { label: 'สรุปกะทำงาน', to: '/summaryofwork' },
]

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

