
<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="ร้องขอรายการ" title1="" />

    </div>

    <div class="row" v-if="resStatusProducts" style="display: flex">
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count" style="background: #c01758">
          <div class="dash-counts">
            <h4>{{ resStatusProducts.summary_minimum_stock }}</h4>
            <h5>รายการ minimum stock</h5>
          </div>
          <div class="dash-imgs">
            <vue-feather type="package"></vue-feather>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count" style="background: #be0e0e">
          <div class="dash-counts">
            <h4>{{ resStatusProducts.summary_dead_stock }}</h4>
            <h5>รายการ dead stock</h5>
          </div>
          <div class="dash-imgs">
            <vue-feather type="x-octagon"></vue-feather>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count" style="background: #06b6a7">
          <div class="dash-counts">
            <h4>{{ resStatusProducts.summary_expired_stock }}</h4>
            <h5>รายการ expired</h5>
          </div>
          <div class="dash-imgs">
            <vue-feather type="alert-triangle"></vue-feather>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count" style="background: #b65506c2">
          <div class="dash-counts">
            <h4>{{ resStatusProducts.summary_claim }}</h4>
            <h5>รายการเคลม</h5>
          </div>
          <div class="dash-imgs">
            <vue-feather type="corner-right-up"></vue-feather>
          </div>
        </div>
      </div>
    </div>

    <!-- content main -->
    <Form @submit="onSubmit">
      <div class="card mb-2">
        <div class="card-body py-2 px-3">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">วันที่ส่งคำร้องขอ</label>
                <div class="">
                  <Calendar id="request_date" v-model="request_date" showButtonBar showIcon placeholder="วันที่ส่งคำร้อง" class="w-full"
                  :dateFormat="customDateFormat(request_date)" :pt="{
                      dropdownButton: {
                        root: { class: 'bg-red-500 border-red-500' }
                      }
                    }" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.request_date }}</small>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">วันที่ต้องการรับของ</label>
                <div class="">
                  <Calendar id="want_receive_date" v-model="want_receive_date" showIcon placeholder="วันที่ต้องการรับ"
                    class="w-full" :dateFormat="customDateFormat(want_receive_date)" showButtonBar  :minDate="request_date" :pt="{
                      dropdownButton: {
                        root: { class: 'bg-red-500 border-red-500' }
                      }
                    }" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.want_receive_date }}</small>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">ผู้ทำรายการ</label>
                <div class="">
                  <Dropdown filter autoFilterFocus v-model="to_branch_id" :options="resBranchs" optionLabel="branch_name"
                    optionValue="id" placeholder="เลือกสาขา" class="w-full" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.to_branch_id }}</small>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">สาขา</label>
                <div class="">
                  <Dropdown filter autoFilterFocus v-model="to_branch_id" :options="resBranchs" optionLabel="branch_name"
                    optionValue="id" placeholder="เลือกสาขา" class="w-full" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.to_branch_id }}</small>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">เหตุผลร้องขอ</label>
                <div class="">
                  <Dropdown filter autoFilterFocus v-model="request_reason_id" :options="resRequestReasons"
                    optionLabel="request_reason_name" optionValue="id" placeholder="เลือกสาเหตุการร้องขอ"
                    class="w-full" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.request_reason_id }}</small>
              </div>
            </div>
          </div>




        </div>
      </div>


      <div class="card">
        <div class="card-body">
          <!-- Data table -->
          <DataTable class="p-datatable-sm" :value="fields" dataKey="id" filterDisplay="menu" ref="dt" :paginator="false"
            :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25, 75, 100]"
            currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :pt="{
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
              footer: { class: 'bg-transparent border-none' },
              row: { class: 'border-none nobor bg-red-600' },
            }">


            <template #empty> No Products found. </template>
            <Column header="#" field="key" :pt="{
              bodyCell: { class: 'border-none ' },
            }">
              <template #body="{ data, index }">
                {{ index + 1 }}
              </template>
            </Column>
            <Column class="" style="min-width: 22rem" :pt="{
              bodyCell: { class: 'border-none ' },
              hiddenInputWrapper: { class: 'border-none nobor' },
            }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">สินค้า/บริการ</div>
              </template>
              <template #body="{ data, index }">
                <!-- <Dropdown filter autoFilterFocus v-model="data.value.supplier_product_id" :options="selectDropdown"
                  optionLabel="name" optionValue="id" placeholder="เลือกสินค้า" class="w-full" /> -->
                <div class="w-full">
                  <AutoComplete class="w-full" v-model="data.value.supplier_product_id"
                    :suggestions="supplierProductNames" optionLabel="supplier_product_name" @complete="search"
                    forceSelection :pt="{
                      input: { class: 'w-full' },
                    }" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{
                  errors[`supplierProduct[${index}].supplier_product_id`]
                }}</small>
              </template>
            </Column>
            <Column style="min-width: 8rem" :pt="{
                  bodyCell: { class: 'border-none ' },
                }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">จำนวน</div>
              </template>
              <template #body="{ data, index }">
                <InputNumber class="w-full" v-model="data.value.qty" inputId="integeronly" />
                <small class="px-2 mt-1 text-red-600">{{
                  errors[`supplierProduct[${index}].qty`]
                }}</small>
              </template>
            </Column>
            <Column field="key" style="min-width: 8rem" :pt="{
                  bodyCell: { class: 'border-none ' },
                }">
              <template #body="{ data, index }">
                <div class="h-3rem flex align-items-end">
                  <Button @click="remove(data.index)" class="" type="button" icon="pi pi-trash"
                    style="color: rgb(250, 250, 250); background: red; border: none" />
                </div>
              </template>
            </Column>
            <template #footer class="bg-transparent">
              <div class="flex justify-content-center">
                <Button size="small" label="เพิ่มรายการ" icon="pi pi-plus" severity="" class="bg-cyan-600 border-cyan-600"
                  @click="push({ supplier_product_id: undefined, qty: 1 })" />
              </div>

            </template>
          </DataTable>
        </div>
      </div>

      <div class="">
        <div class="p-2 text-end">
          <Button label="ยืนยัน" icon="pi pi-save" severity="primary" :loading="loadingBtn" type="submit" class="" />
        </div>
      </div>
    </Form>
  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" :error="errorAlert" />
</template>
<script setup>
import { useField, useForm, Form, Field, useFieldArray } from 'vee-validate'
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

const selectDropdown = ref([
  { id: 1, name: 'us' },
  { id: 2, name: 'th' },
  { id: 3, name: 'la' }
])


const supplierProductNames = ref([]);
const search = async (event) => {
  console.log(event.query);
  let res = await dataApi.supplierproductAutocomplete({
    supplier_product_name: event.query,
  });
  supplierProductNames.value = res.data.data;
  console.log(event);
};
// const resProductAutoComplete =ref();
// const loadProductAutoComplete = async()=>{
// const res =await dataApi.supplierproductAutocomplete();
// resProductAutoComplete.value = res.data.data;
// }
//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    to_branch_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    request_reason_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    request_date: zod.date({
      required_error: requireValue,
      invalid_type_error: 'กรุณาเลือกวันที่'
    }),
    want_receive_date: zod.date({
      required_error: requireValue,
      invalid_type_error: 'กรุณาเลือกวันที่'
    }),
    supplierProduct: zod.array(
      zod.object({
        // supplier_product_id: zod.number({
        //   required_error: requireValue,
        //   invalid_type_error: 'ราคาต้องเป็นตัวเลขเท่านั้น'
        // }),
        supplier_product_id: zod.any().refine(value => value !== null && value !== undefined && value !== '', {
          message: requireValue,
        }),
        qty: zod.number({ required_error: requireValue, invalid_type_error: requireValue })
      })
    )
  })
)

const { handleReset, handleSubmit, errors } = useForm({
  initialValues: {
    supplierProduct: [
      {
        supplier_product_id: undefined,
        qty: 1
      }
    ]
  },
  validationSchema
})

const { value: request_date } = useField('request_date')
const { value: to_branch_id } = useField('to_branch_id')
const { value: request_reason_id } = useField('request_reason_id')
const { value: want_receive_date } = useField('want_receive_date')

const { remove, push, fields } = useFieldArray('supplierProduct')

const avatar_image = ref() // รูปเริ่มต้น
const selectedImageUrl = ref()
//  ******************* EVENTS UPLOAD IMAGE***************************

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
const loadBtn = () => {
  loadingBtn.value = true
  setTimeout(() => {
    loadingBtn.value = false
  }, 2000)
}

const errorAlert = ref(false)
const alertToast = ref({})
// *********** [ DATA SECTION ] ***************
const resBranchs = ref()
const loadBranch = async () => {
  const res = await dataApi.getBranch()
  resBranchs.value = res.data.data;
};
const resRequestReasons = ref()
const loadRequestReasons = async () => {
  const res = await dataApi.getRequestReasons()
  resRequestReasons.value = res.data.data;
};


const resStatusProducts = ref();
const loadStatusProductInBranch = async () => {
  const res = await dataApi.loadStatusProductInBranch();
  resStatusProducts.value = res.data.data;
};

onMounted(() => {
  loadStatusProductInBranch()
  loadBranch()
  loadRequestReasons()
})
const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    fullname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    cid: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  }
}
initFilters()

const onSubmit = handleSubmit((values) => {
  console.log(values)
  loadBtn()
  saveRequestOrder(values)
})

const saveRequestOrder = async (values) => {

  values.items = values.supplierProduct;
  values.supplierProduct.forEach((e, i) => {
    e.supplier_product_id = e.supplier_product_id.id;
  });
  values.request_date = format(new Date(values.request_date), "yyyy-MM-dd");
  values.want_receive_date = format(new Date(values.want_receive_date), "yyyy-MM-dd");
  errorAlert.value = false
  try {
    const res = await dataApi.saveRequestOrderItems(values)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset()
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
const breadcrumbItems = [{ label: 'ร้องขอรายการ', to: '/request' }]
</script>
  
<style>
.p-datatable .p-datatable-thead>tr>th {
  text-align: left;
  padding: 1rem 1rem;
  border: 0px solid #dee2e6;
  border-width: 0px 0 0px 0;
  font-weight: 600;
  color: #212529;
  background: #fff;
  transition: box-shadow .15s;
}
</style>