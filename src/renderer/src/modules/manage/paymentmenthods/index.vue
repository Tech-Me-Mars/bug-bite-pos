
<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการช่องทางชำระเงิน" title1="" />
      <div class="page-header">
        <div class="page-btn">
          <Button label="เพิ่มช่องทางชำระเงิน" size="small" icon="pi pi-plus" severity="pimary"
            class="mr-2 font-semibold border-round-md" @click="openDialogInsert()" />
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

        <h4 class="card-title">ข้อมูลช่องทางชำระเงิน</h4>
        <div class="table-responsive">
          <DataTable :exportFilename="`ข้อมูลช่องทางชำระเงิน${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters" v-model:selection="selectedRowTable" class="p-datatable-sm"
            :value="resPaymentMethod" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]" currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
            :globalFilterFields="[
              'index',
              'method_name',
              'description',
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
            <!--<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>-->
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

            <Column header="ชื่อช่องทางชำระ" field="method_name" sortable="method_name" style="min-width: 12rem">
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
                {{ data.method_name }}
              </template>
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
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
              </template>
              <template #body="{ data }">
                {{ data.description }}
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
                <span class="badges bg-lightgreen" v-if="data.is_enabled == 1">เปิดใช้งาน</span>
                <span class="badges bg-lightred" v-if="data.is_enabled == 0">ปิดใช้งาน</span>
              </template>
            </Column>

            <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible"
              style="min-width: 7rem">
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="slotProps">
                <Button type="button" @click="openDialogEdit(slotProps.data.id)" icon="pi pi-pencil"
                  style="color: black; background: transparent; border: none" />
                <Button @click="confirmDelete(slotProps.data)" type="button" icon="pi pi-trash"
                  style="color: red; background: transparent; border: none" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="dialogProcess" maximizable :style="{ width: '800px' }" header="รายละเอียดช่องทางชำระเงิน"
      :modal="true" class="p-fluid">
      <hr class="mb-3" />
      <Form @submit="onSubmit">
        <div class="grid">

          <div class="col-12">
            <div>
              <label for="method_name" class="pb-3 font-semibold text-gray-600 col-12">ชื่อช่องทางชำระ</label>
              <div class="w-full">
                <InputText v-model="method_name" placeholder="ชื่อช่องทางชำระ" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors.method_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="description" class="pb-3 font-semibold text-gray-600 col-12">คำอธิบาย</label>
              <div class="w-full">
                <InputText v-model="description" placeholder="คำอธิบาย" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors.description }}</small>
            </div>
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

const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])

// *********************************** [[จบช่วงข้อมูลตั้งต้น]] ***************************

//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({

    method_name: zod.string().nonempty(requireValue).default(''),
    description: zod.string({required_error: requireValue,invalid_type_error: requireValue,}).nonempty(requireValue).default(''),
    

  }),
)

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

const { value: method_name } = useField('method_name')
const { value: description } = useField('description')
const { value: is_enabled } = useField('is_enabled')




const avatar_image = ref(); // รูปเริ่มต้น
const selectedImageUrl = ref();
//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    selectedImageUrl.value = URL.createObjectURL(file); // สร้าง URL จากไฟล์
    avatar_image.value = file; // เก็บไฟล์ที่เลือกลงตัวแปร
  }
};

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
const loadBtn = () => {
  loadingBtn.value = true
  setTimeout(() => {
    loadingBtn.value = false
  }, 2000)
}

// *********** [ DIALOG SECTION] **************
const isEditForm = ref(false);
const dialogProcess = ref(false)
const openDialogInsert = () => {
  handleReset();
  isEditForm.value = false;
  dialogProcess.value = true
}

const rowEditId = ref();
const openDialogEdit = async (id) => {
  rowEditId.value = id
  isEditForm.value = true
  dialogProcess.value = true;
  loadDataToForm(id);
}

const loadDataToForm = async (id) => {
  const res = await dataApi.getPaymentMethodById(id)
  method_name.value = res.data.data.method_name
  description.value = res.data.data.description
  is_enabled.value = res.data.data.is_enabled
};

const closetDialog = () => {
  dialogProcess.value = false
  clearFormInput()
}

const clearFormInput = async () => {
  method_name.value = undefined;
  description.value = undefined;
  is_enabled.value = undefined;

}


const conFirmation = ref(null) //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = (obj) => {
  console.log(obj)
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: obj.method_name,
    accept: () => {
      // เรียกฟังชั่นลบ แล้วส่งID ไป
      deletePaymentMethod(obj.id)
    }
  }
  if (conFirmation.value) {
    conFirmation.value.openDialog(proCessConfirm)
  }
}

const errorAlert = ref(false)
const alertToast = ref({})
const deletePaymentMethod = async (id) => {
  errorAlert.value = false
  try {
    const res = await dataApi.deletePaymentMethod(id)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: 'ลบสำเร็จ'
    }
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
  loadData();
}

// *********** [ DATA SECTION ] ***************
const resPaymentMethod = ref()
const loadData = async () => {
  const res = await dataApi.getPaymentMethod()
  resPaymentMethod.value = res.data.data;
  resPaymentMethod.value.forEach((e, i) => {
    e.index = i + 1;
  });
  console.log(resPaymentMethod.value)
}
onMounted(() => {
  loadData();
})
const selectedRowTable = ref()
const filters = ref()


const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    method_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
  }
}
initFilters()

const onSubmit = handleSubmit((values) => {
  loadBtn();
  savePaymentMethod(values);
});

const savePaymentMethod = async (values) => {
  // isEditForm
  const formData = {
    "method_name": method_name.value,
    "description": description.value,
  };

  // save or update
  try {
    errorAlert.value = false
    if (isEditForm.value != true) {  //create
      const res = await dataApi.savePaymentMethod(formData);
      alertToast.value = {
        severity: "success",
        summary: "ทำรายการสำเร็จ",
        detail: res.data.message,
      };
      clearFormInput();
    } else {
      const res = await dataApi.updatePaymentMethod(formData, rowEditId.value);
      alertToast.value = {
        severity: "success",
        summary: "ทำรายการสำเร็จ",
        detail: res.data.message,
      };
      clearFormInput();
    }
    loadData();
    dialogProcess.value = false;
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }

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
const clearFilter = () => {
  initFilters()
}
const getSeverity = (status) => {
  switch (status) {
    case 'unqualified':
      return 'danger'

    case 'qualified':
      return 'success'

    case 'new':
      return 'info'

    case 'negotiation':
      return 'warning'

    case 'renewal':
      return null
  }
}

const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
const breadcrumbItems = [{ label: 'ช่องทางการชำระเงิน', to: '/paymentmenthods ' }]
</script>

<style scope>

</style>