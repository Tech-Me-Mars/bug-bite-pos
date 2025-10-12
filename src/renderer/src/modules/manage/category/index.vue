
<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการสินค้าในหมวดหมู่" title1="" />
      <!-- <div class="page-header">
        <div class="page-btn">
          <Button label="เพิ่ม" size="small" icon="pi pi-plus" severity="pimary"
            class="mr-2 font-semibold border-round-md" />
        </div>
      </div> -->
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

        <h4 class="card-title">ข้อมูลหมวดหมู่สินค้า</h4>
        <div class="table-responsive">
          <DataTable :exportFilename="`ข้อมูลหมวดหมู่สินค้า${format(new Date(), 'ddMMyyyyHHmmss')}`"
            v-model:filters="filters" v-model:selection="selectedRowTable" class="p-datatable-sm" :value="resCategory"
            :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
            currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
              'index',
              'category_name'
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
            <template #empty> No Category found. </template>
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

            <Column header="ชื่อหมวดหมู่" class="" field="category_name" sortable style="min-width: 12rem">
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
                {{ data.category_name }}
              </template>
            </Column>


            <Column headerStyle="text-align: center" style="min-width: 15rem" class="text-center">
              <template #header>
                <div class="flex-1">
                  สินค้าในหมวดหมู่
                </div>
              </template>
              <template #body="slotProps">
                <div class="py-1">
                  <Button
                    @click="openDialogProduct(slotProps.data.productshow, slotProps.data.category_name, slotProps.data.category_id)"
                    icon="pi pi-box" severity="danger" label="จัดการสินค้าในCategory" outlined rounded
                    aria-label="Bookmark" />
                </div>
              </template>
            </Column>


          </DataTable>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="dialogProcess" maximizable :style="{ width: '800px' }" header="รายละเอียดสินค้าในหมวดหมู่"
      :modal="true" class="p-fluid">
      <hr class="mb-3" />
      <h4 class="card-title">สินค้าหมวดหมู่ <span class="text-red-600">{{ nameCategoryEdit }}</span></h4>
      <DataTable class="p-datatable-sm" scrollable scrollHeight="500px" :value="resItemInCategory">
        <Column field="id" header="รหัสสินค้า"></Column>
        <Column field="supplier_product_name" header="ชื่อสินค้า"></Column>
        <Column field="price" header="ราคา">
          <template #body="{ data, index }">
            <div v-if="data.price">{{ formatCurrency(data.price) }}</div>
          </template>
        </Column>
        <Column header="ลบ">
          <template #body="{ data, index }">
            <div class="w-2rem h-2rem ">
              <Button :loading="loadingBtn"
                @click="deletePayProductToCategory(data.pos_category_id, data.id)" icon="pi pi-times"
                severity="danger" text rounded aria-label="Cancel" />
            </div>
          </template>
        </Column>
      </DataTable>
      <Form @submit="onSubmit">
        <div class="">

          <label for="method_name"
            class="pb-3 font-semibold text-gray-600 col-12">ค้นหาชื่อสินค้าที่ต้องการเพิ่มลงไปในหมวดหมู่ {{
              nameCategoryEdit }}</label>
          <div class="flex">
            <AutoComplete class="w-full mr-3" v-model="searchAutoProduct" :suggestions="supplierProductNames"
              optionLabel="supplier_product_name" @complete="search" forceSelection :pt="{
                input: { class: 'w-full' },
              }" />
            <Button label="เพิ่ม" icon="pi pi-plus" :loading="loadingBtn" type="submit" size="" class="w-8rem" />
          </div>
        </div>
        <!-- <hr class="my-3" /> -->
      </Form>
    </Dialog>


  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" />
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


// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])

// *********************************** [[จบช่วงข้อมูลตั้งต้น]] ***************************

//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    searchAutoProduct: zod.any().refine(value => value !== null && value !== undefined && value !== '', {
      message: requireValue,
    }),
  }),
)

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

const { value: searchAutoProduct } = useField('searchAutoProduct')

const supplierProductNames = ref();

const search = async (event) => {
  loadingBtn.value = true;
  const payload = {
    supplier_product_name: event.query
  }
  try {
    const res = await dataApi.supplierproductAutocomplete(payload);
    console.log(res.data);
    supplierProductNames.value = res.data.data;
  } catch (err) {
    console.error(err)
    loadingBtn.value = false;
  }
  loadingBtn.value = false;
  console.log(event);
};



const resItemInCategory = ref();

// *********** [ DIALOG SECTION] **************
const dialogProcess = ref(false)
const nameCategoryEdit = ref()
const idCategory = ref();
const openDialogProduct = (obj, name, id) => {
  dialogProcess.value = true
  nameCategoryEdit.value = name
  resItemInCategory.value = { ...obj }
  idCategory.value = id;
}
const closetDialog = () => {
  dialogProcess.value = false
}
// **** [loadData]
const loadProductInDialog = async () => {
  const res = await dataApi.getCategoryById(idCategory.value)
  resItemInCategory.value = res.data.data.productshow;

}




const conFirmation = ref(null) //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = (obj) => {
  console.log(obj)
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: obj.name,
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
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadData();
}

// *********** [ DATA SECTION ] ***************
const resCategory = ref()
const loadData = async () => {
  const res = await dataApi.getCategory()
  resCategory.value = res.data.data;
  resCategory.value.forEach((e, i) => {
    e.index = i + 1;
  });
  console.log(resCategory.value)
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
    category_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },

  }
}
initFilters()

const onSubmit = handleSubmit((values) => {
  savePayProductToCategory(values);
});

const savePayProductToCategory = async (values) => {
  loadingBtn.value = true;
  const payload = {
    pos_category_id: idCategory.value,
    supplier_product_id: searchAutoProduct.value.id,
  }
  errorAlert.value = false
  try {
    const res = await dataApi.saveProductToCategory(payload)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset()
    loadProductInDialog();
    loadData();
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
}

const deletePayProductToCategory = async (catId, productId) => {
  loadingBtn.value = true;
  const payload = {
    pos_category_id: catId,
    product_show_id: productId,
  }
  console.log('payload',payload)
  errorAlert.value = false
  try {
    const res = await dataApi.deleteProductToCategory(payload)
    loadProductInDialog();
    loadData();
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


const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
const breadcrumbItems = [{ label: 'จัดการ Category', to: '/category' }]
</script>
  
<style scope></style>