
<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการรายการขายลูกค้า" title1="" />
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <div class="mb-3 flex justify-content-between">
          <Form @submit="onSerch" class="flex w-6">
            <Calendar v-model="date" show-icon placeholder="เลือกวันที่" class="w-full"
              :dateFormat="customDateFormat(date)" showButtonBar />
            <Button class="mx-2 h-3rem w-8rem text-lg" :loading="loadingBtn" severity="danger" icon="pi pi-search"
              label="ค้นหา" type="submit" />
          </Form>
          <div>
            <router-link to="/claimproduct">
              <Button label="เคลมสินค้า" icon="pi pi-replay" severity="success" size="large"
                style="background-color: rgb(76, 173, 72);">
                <i class="fa fa-wrench mr-1" data-bs-toggle="tooltip" title="fa fa-wrench"></i>เคลมสินค้า
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <section>
          <div class="table-top">
            <div class="search-set">
              <div class="search-path">
                <a class="btn btn-filter" id="filter_search" @click="clearFilter()">
                  <img src="@/assets/img/icons/filter.svg" alt="img" />
                  <!-- @/assets/img/icons/filter.svg -->
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
          </div>
          <!-- end top table -->

          <h4 class="card-title">รายการขายลูกค้า</h4>
          <div class="table-responsive">
            <DataTable :exportFilename="`ข้อมูลรายการขายลูกค้า${format(new Date(), 'ddMMyyyyHHmmss')}`"
              v-model:filters="filters" class="p-datatable-sm" :value="resSaleCustomer" :paginator="true" :rows="10"
              dataKey="id" filterDisplay="menu" ref="dt"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
                'index',
                'customer_name',
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
      class: context.active ? 'bg-orage-600 border-none border-round-lg mr-1' : 'bg-gray-600 border-none border-round-lg text-white mr-1'
    }),
  },
}">
              <template #empty> No Customer Sale Item found. </template>
              <Column header="ลำดับ" field="index" sortable style="min-width: 5rem">
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
                <template #body="{ data, index }">
                  {{ data.index }}
                </template>
              </Column>
              <Column field="id" header="เลขที่ใบเสร็จ" sortable style="min-width: 12rem">
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
              <Column header="จำนวนเงิน" field="total_amount" sortable style="min-width: 6rem">
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
              <Column header="เครื่องมือ" style="min-width: 6rem">
                <template #body="{ data }">
                  <router-link :to="`/claimproduct/${data.id}`">
                    <Button label="เคลม" severity="warning" outlined />
                  </router-link>

                </template>
              </Column>


            </DataTable>
          </div>
        </section>
      </div>
    </div>


    <Dialog v-model:visible="dialogNoReceipt" maximizable :style="{ width: '800px' }" header="บันทึกการเคลม" :modal="true"
      class="p-fluid">
      <hr class="mb-3" />
      {{ errors2 }}
      <Form @submit="onSubmitClaim">
        <div class="grid">

          <div class="col-12">
            <label class="pb-1 font-semibold text-gray-600">ชื่อผู้ซื้อ</label>
            <div class="">
              <Dropdown filter autoFilterFocus v-model="customer_id" :options="resCustomers" optionLabel="fullname"
                optionValue="id" placeholder="เลือกผู้ซื้อ" class="w-full" />
            </div>
            <small class="px-2 mt-1 text-red-600">{{ errors2.customer_id }}</small>
          </div>

          <div class="col-12">
            <label class="pb-1 font-semibold text-gray-600">เลขที่ใบเสร็จ</label>
            <InputText v-model="sale_id" placeholder="เลขที่ใบเสร็จ.." class="" />
          </div>

          <div class="col-12">
            <label class="pb-1 font-semibold text-gray-600">วันที่เคลม</label>
            <Calendar id="request_date" v-model="claim_date" showIcon placeholder="วันที่เคลม" class="w-full"
              dateFormat="dd/mm/yy" />
            <small class="px-2 mt-1 text-red-600">{{ errors2.claim_date }}</small>
          </div>

          <div class="col-12">
            <label class="pb-1 font-semibold text-gray-600">Barcode</label>
            <div class="p-inputgroup flex-1">
              <InputText v-model="sku_barcode" placeholder="barcode.." class="" />
              <span class="p-inputgroup-addon bg-transparent" style="width: 2.5rem;">
                <i class="fa fa-barcode" data-bs-toggle="tooltip" title="fa fa-barcode"></i>
              </span>
            </div>
            <small class="px-2 mt-1 text-red-600">{{ errors2.sku_barcode }}</small>
          </div>

          <div class="col-12">
            <label class="pb-1 font-semibold text-gray-600">สาเหตุการเคลม</label>
            <Dropdown filter autoFilterFocus v-model="claim_reason_id" :options="resRequestReasons"
              optionLabel="request_reason_name" optionValue="id" placeholder="เลือกสาเหตุ" class="w-full" />
            <small class="px-2 mt-1 text-red-600">{{ errors2.claim_reason_id }}</small>
          </div>


        </div>
        <hr class="my-3" />
        <div class="flex flex-wrap gap-3 justify-content-end w-full">
          <Button label="ยกเลิก" @click="closetDialog" type="button" severity="secondary" size="small" class="w-auto" />
          <Button label="บันทึก" :loading="loadingBtn" type="submit" size="small" class="w-auto" />
        </div>
      </Form>
    </Dialog>

  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" :error="errorAlert" />
</template>
<script setup>
// [ VALIDATOR ]
import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
// [ ICON ]
import { SearchOutlined } from '@ant-design/icons-vue'
// [ VUE API ]
import { ref, computed, unref, reactive, onMounted } from 'vue'
//  [ DATE FNT ]
import { parse, format, isWithinInterval } from 'date-fns'
// [ COMPONENT CUSTOM ]
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
// Primevue API
import { Table } from 'ant-design-vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { da } from 'date-fns/locale'
// [ FOLDER API ]
import * as dataApi from './api/data.js'
// *********************************************************[[ END IMPORT ]]********************************************************
// *********************************************************************************************************************************
// *********************************************************************************************************************************



const errorAlert = ref(false)
const alertToast = ref({})

// ************** [ LOAD DATA ON MOUNT ] **********
onMounted(() => {
  loadDefualtCustomerSale();
  loadDataCustomers();
  loadRequestReasons();
})
const resSaleCustomer = ref();
const loadDefualtCustomerSale = async () => {
  const res = await dataApi.getSaleCustomer();
  resSaleCustomer.value = res.data.data[0];
};
const resCustomers = ref()
const loadDataCustomers = async () => {
  const res = await dataApi.getCustomer();
  resCustomers.value = res.data.data.data;
  resCustomers.value.forEach((e, i) => {
    e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
  });
};

const resRequestReasons = ref()
const loadRequestReasons = async () => {
  const res = await dataApi.getRequestReasons()
  resRequestReasons.value = res.data.data;
};
// ************* [ START SEARCH DATA SECTIONS] **************

//*********** VALIDATETION ****************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
  zod.object({
    date: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
  })
);
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema,
});

//*********** CONST VARIABLE FORM ****************
const { value: date } = useField("date");


const onSerch = handleSubmit(async (values) => {
  console.log(values);
  // date.value = format(new Date(date.value), "yyyy-MM-dd");
  const dateseach = format(new Date(date.value), "yyyy-MM-dd");
  loadBtn()
  try {
    errorAlert.value = false;
    const res = await dataApi.getSaleCustomer(dateseach);
    resSaleCustomer.value = res.data.data[0];
    resSaleCustomer.value.forEach((e, i) => {
      e.index = i + 1;
    });
    alertToast.value = {
      severity: 'success',
      summary: 'ค้นหาข้อมูลสำเร็จ',
      detail: ''
    }
    console.log(resSaleCustomer.value)
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
});
// ************* [ END SEARCH DATA SECTIONS] **************

// *********** [ DIALOG SECTION] **************

///////////////[ Dialog No Receipt]
const dialogNoReceipt = ref(false)
const openDialogNoReceipt = (id) => {
  console.log(id)
  dialogNoReceipt.value = true;
}
const closetDialogNoReceipt = () => {
  dialogNoReceipt.value = false;
};
///////////////[ Dialog Have Receipt ]
const dialogHaveReceipt = ref(false)

const openDialogHaveReceipt = (id) => {
  console.log(id)
  dialogHaveReceipt.value = true;
}
const closetDialogHaveReceipt = () => {
  dialogHaveReceipt.value = false;
};
// ********* [ LOAD GET SALE BY ID TO DIALOG FORM ] *********
const resGetSaleByIdHaveReceipt = ref();
const loadGetSaleByIdToForm = async (id) => {
  const res = await dataApi.getSaleCustomerById(id)
  resGetSaleById.value = res.data.data[0];
  customer_id.value = resGetSaleById.value.customer_id;
};

//! /////// [validation2 Event On Claim in dialog] /////////
const validationSchema2 = toTypedSchema(
  zod.object({
    customer_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    claim_date: zod.date({
      required_error: requireValue,
      invalid_type_error: 'กรุณาเลือกวันที่'
    }),
    sku_barcode: zod.string().nonempty(requireValue).default(""),
    claim_reason_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),

  })
);

const { handleReset: handleReset2, handleSubmit: handleSubmit2, errors: errors2 } = useForm({
  validationSchema: validationSchema2,
});

const { value: customer_id } = useField("customer_id");
const { value: claim_date } = useField("claim_date");
claim_date.value = new Date();
const { value: sale_id } = useField("sale_id");
const { value: sku_barcode } = useField("sku_barcode");
const { value: claim_reason_id } = useField("claim_reason_id");

const onSubmitClaim = handleSubmit2(async (values) => {
  saveClaimSku(values)
  dialogNoReceipt.value = false;
});
const saveClaimSku = async (values) => {
  claim_date.value = format(new Date(claim_date.value), "yyyy-MM-dd");
  const payload = {
    "customer_id": customer_id.value,
    "claim_date": claim_date.value,
    "sale_id": sale_id.value ? sale_id.value : '',
    "sku_barcode": sku_barcode.value,
    "claim_reason_id": claim_reason_id.value
  }
  try {
    errorAlert.value = false;
    const res = await dataApi.saveClaimSku(payload);
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: ''
    }
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
  handleReset2();
};



const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    index: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    customer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    total_amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

  }
}
initFilters()

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
const loadBtn = () => {
  loadingBtn.value = true
  setTimeout(() => {
    loadingBtn.value = false
  }, 2000)
}

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

// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543;
    return format(new Date(date), `dd/MM/${thaiYear}`);
  }
};

const clearFilter = () => {
  initFilters()
}

const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
const breadcrumbItems = [{ label: 'รายการขายลูกค้า', to: '/customersaleslist' }]
</script>

<style scope></style>