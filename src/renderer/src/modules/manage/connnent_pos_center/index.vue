<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="ร้องขอรายการ" title1="ร้องขอรายการสินค้าไปยัง poscenter" />
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
            <vue-feather type="repeat"></vue-feather>
          </div>
        </div>
      </div>
    </div>

    <div class="card w-full" v-if="resBranchDetail">
      <div class="card-body py-3">
        <div class="px-3">
          <div class="row">
            <div class="col-12">
              <address>
                <strong class="text-xl">ที่ตั้งสาขา <i class="pi pi-building"></i></strong><br />
                {{ resBranchDetail.branch_name }} <br />
                {{ resBranchDetail.address }},<br />
                <abbr title="Phone"><i class="pi pi-phone"></i> :</abbr>
                {{ resBranchDetail.phone_number }}<br />
                <abbr title="Email"><i class="pi pi-envelope"></i> :</abbr>
                {{ resBranchDetail.email }}
                <br />
                <span><strong>ผู้ทำรายการ:</strong><span>{{ empOnDuty }}</span></span>
                <br />
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body py-3 m-0 flex justify-content-between">
        <h4 class="text-dark">สร้างรายการ</h4>
        <Button @click="openDialog()" :loading="loadingBtn" label="เรียกใช้แบบร่าง" icon="pi pi-plus"
          severity="success" />
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
                  <Calendar id="request_date" v-model="request_date" showButtonBar showIcon placeholder="วันที่ส่งคำร้อง"
                    class="w-full" :dateFormat="customDateFormat(request_date)" :pt="{
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
                    class="w-full" :dateFormat="customDateFormat(want_receive_date)" showButtonBar :minDate="request_date"
                    :pt="{
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
                  class: context.active
                    ? 'bg-orage-600 border-none border-round-lg mr-1'
                    : 'bg-gray-600 border-none border-round-lg text-white mr-1'
                })
              },
              footer: { class: 'bg-transparent border-none' },
              row: { class: 'border-none nobor bg-red-600' }
            }">
            <template #empty> No Products found. </template>
            <Column header="#" field="key" :pt="{
              bodyCell: { class: 'border-none ' }
            }">
              <template #body="{ data, index }">
                {{ index + 1 }}
              </template>
            </Column>
            <Column class="" style="min-width: 15rem" :pt="{
              bodyCell: { class: 'border-none ' },
              hiddenInputWrapper: { class: 'border-none nobor' }
            }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">สินค้า/บริการ</div>
              </template>
              <template #body="{ data, index }">
                <!-- <div class="w-full">
                   <AutoComplete class="w-full" v-model="data.value.supplier_product_id"
                    :suggestions="supplierProductNames" optionLabel="supplier_product_name" @complete="search"
                    forceSelection :pt="{
                      input: { class: 'w-full' }
                    }" /> 
                  </div>-->
                <Dropdown filter autoFilterFocus v-model="data.value.supplier_product_id" @change="addObj(data.value.supplier_product_id, index)"
                  :options="resSuplierProduct" optionLabel="supplier_product_name" optionValue="id"
                  placeholder="เลือกสินค้า" class="w-full" />


                <small class="px-2 mt-1 text-red-600">{{
                  errors[`supplierProduct[${index}].supplier_product_id`]
                }}</small>
              </template>
            </Column>

            <Column class="" style="min-width: 14rem" :pt="{
                  bodyCell: { class: 'border-none ' },
                  hiddenInputWrapper: { class: 'border-none nobor' }
                }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">คำอธิบาย</div>
              </template>
              <template #body="{ data, index }">
                <div class="w-full" v-if="data.value.supplier_product_id">
                  {{ data.value.supplier_product_description }}
                </div>
              </template>
            </Column>

            <Column class="" style="min-width: 10rem" :pt="{
              bodyCell: { class: 'border-none ' },
              hiddenInputWrapper: { class: 'border-none nobor' }
            }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">หมวดหมู่</div>
              </template>
              <template #body="{ data, index }">
                <div class="w-full" v-if="data.value.supplier_product_id">
                  {{ data.value.supplier_product_category_name }}
                </div>
              </template>
            </Column>



            <Column style="min-width: 3rem; min-width: 3rem" :pt="{
              bodyCell: { class: 'border-none ' }
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
            <Column class="" style="min-width: 6rem" :pt="{
                  bodyCell: { class: 'border-none ' },
                  hiddenInputWrapper: { class: 'border-none nobor' }
                }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">หน่วยนับ</div>
              </template>
              <template #body="{ data, index }">
                <div class="w-full text-center" v-if="data.value.supplier_product_id">
                  {{ data.value.unit }}
                </div>
              </template>
            </Column>

            <Column class="" style="min-width: 7rem" :pt="{
              bodyCell: { class: 'border-none ' },
              hiddenInputWrapper: { class: 'border-none nobor' }
            }">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">ราคา</div>
              </template>
              <template #body="{ data, index }">
                <div class="w-full text-end" v-if="data.value.supplier_product_id">
                  {{ formatCurrency(data.value.price) }}
                </div>
              </template>
            </Column>

            <Column field="key" style="min-width: 8rem" :pt="{
              bodyCell: { class: 'border-none ' }
            }">
              <template #body="{ data, index }">
                <div class="h-3rem flex align-items-end">
                  <Button @click="remove(index)" class="" type="button" icon="pi pi-trash"
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
          <Button @click="(() => { isSaveDraft = true; })" type="submit" label="บันทึกแบบร่าง" icon="pi pi-save"
            class="mr-2 bg-blue-600 border-none" severity="" :loading="loadingBtn" />
          <Button label="ยืนยัน" icon="pi pi-save" severity="primary" :loading="loadingBtn" type="submit" class="" />
        </div>
      </div>
    </Form>
  </div>

  <Dialog v-model:visible="dialogProcess" maximizable :style="{ width: '80vw' }" header="ข้อมูลแบบร่างรายการร้องขอ"
    :modal="true" class="p-fluid">
    <DataTable :value="resGetDraftAll" tableStyle="min-width: 50rem" :loading="loadingDataDraft">
      <Column header="#">
        <template #body="{ index }">
          {{ ++index }}
        </template>
      </Column>
      <Column field="to_branch_name" header="สาขา" style="min-width: 5rem;"></Column>
      <Column field="po_date_request" header="วันที่ร้องขอ" style="min-width: 9rem;">
        <template #body="{ data }">
          <div v-if="data.request_date">
            {{ formatDate(data.request_date) }}
          </div>
        </template>
      </Column>
      <Column field="want_receive_date" header="วันที่ต้องการรับ" style="min-width: 9rem;">
        <template #body="{ data }">
          <div v-if="data.request_date">
            {{ formatDate(data.want_receive_date) }}
          </div>
        </template>
      </Column>
      <Column field="transfer_type_name" header="ประเภทการร้องขอ" style="min-width: 10rem;">
      </Column>
      <Column field="request_reason_name" header="เหตุผลร้องขอ" style="min-width: 10rem;">
      </Column>
      <Column header="เลือกใช้แบบร่าง" style="min-width: 12rem;">
        <template #body="{ data }">
          <div class="flex">
            <Button label="" class="bg-blue-800 border-blue-800 p-1" severity="success" icon="pi pi-file-edit"
              @click="setDraft(data)" />
            <Button label="" class="p-1 ml-2" severity="danger" icon="pi pi-trash" @click="deleteDraft(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </Dialog>

  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" />
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

import { useRouter } from "vue-router";

const router = useRouter()
// ************* [ LOADING BTN ]
const loadingBtn = ref(false)


// *********** [ DIALOG SECTION] **************
const dialogProcess = ref(false)
const openDialog = (obj, name, id) => {
  dialogProcess.value = true;
}

const loadingDataDraft = ref(false)
const resGetDraftAll = ref()
const loadsSaveDraft = async () => {
  loadingDataDraft.value = true;
  loadingBtn.value = true;
  try {
    const res = await dataApi.getDraft()
    resGetDraftAll.value = res.data.data
    console.log(resGetDraftAll.value)
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
    loadingDataDraft.value = false;
  }
  loadingBtn.value = false;
  loadingDataDraft.value = false;
}

const isSaveDraft = ref(false)
const safeDraf = async () => {
  isSaveDraft.value = false;
  loadingBtn.value = true;
  errorAlert.value = false

  const item = fields.value.map(field => ({
    supplier_product_id: field.value.supplier_product_id,
    qty: field.value.qty
  }));

  
  const payload = {
    request_date: format(new Date(request_date.value), "yyyy-MM-dd"),
    to_branch_id: resBranchDetail.value.id,
    request_reason_id: request_reason_id.value,
    want_receive_date: format(new Date(want_receive_date.value), "yyyy-MM-dd"),
    items: item
  }
  console.log('payload',payload)
  try {
    const res = await dataApi.saveDraft(payload)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset()
    loadsSaveDraft()

  }
  catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
    loadingBtn.value = false;
  }
  loadingBtn.value = false;
}

const setDraft = async (data) => {
  // getDraftById
  loadingBtn.value = true;
  errorAlert.value = false
  try {
    const res = await dataApi.getDraftById(data.id)
    handleReset();
    remove(0)
    res.data.data._transfer_request.forEach((item) => {
      push({
        supplier_product_id: item.supplier_product_id,
        supplier_product_description: item.supplier_product_description,
        supplier_product_category_name: item._supplier_product_id.supplier_product_category_name,
        qty: item.quantity,
        unit: item.unit,
        price: item.supplier_product_price
      })
    })
    request_date.value = new Date(res.data.data.request_date)
    want_receive_date.value = new Date(res.data.data.want_receive_date)
    request_reason_id.value = res.data.data.request_reason_id
    dialogProcess.value = false
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  dialogProcess.value = false
  loadingBtn.value = false


}

const deleteDraft = async (id) => {
  loadingBtn.value = true;
  errorAlert.value = false
  try {
    const res = await dataApi.deleteDraft(id)
    loadsSaveDraft();
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
};

const resSuplierProduct = ref()
const loadSuplierProduct = async () => {
  const res = await dataApi.getsuplierProduct();
  resSuplierProduct.value = res.data.data;
  console.log(resSuplierProduct.value);
};

const empOnDuty = ref(null)
onMounted(() => {
  loadSuplierProduct()

  const empData = localStorage.getItem('fullname')
  if (empData) {
    empOnDuty.value = empData
  }

  loadsSaveDraft()
})

const supplierProductNames = ref([])
const search = async (event) => {
  console.log(event.query)
  let res = await dataApi.supplierproductAutocomplete({
    supplier_product_name: event.query
  })
  supplierProductNames.value = res.data.data
  console.log(event)
}
const addObj = (id, index) => {

  // เช็คว่าในTable มีarrayนั้นอยู่แล้วไหม
  const isProductExists = fields.value.filter(product => product.value.supplier_product_id == id).length >= 2;
  console.log('index',index)

  if (isProductExists) {
    remove(index)
    console.log(`Product with supplier_product_id ${id} already exists.`);
  } else {
    // ส่งid มาแล้วทำการค้นข้อมูลส่วนอื่นๆเช่น Cate price ...
    const FoundProduct = resSuplierProduct.value.find(product => product.id == id);
    //  หากเจอให้apped เข้าarray table
    if (FoundProduct) {
      fields.value[index].value.supplier_product_id = FoundProduct.id;
      fields.value[index].value.supplier_product_category_name = FoundProduct.supplier_product_category_name
      fields.value[index].value.supplier_product_description = FoundProduct.supplier_product_description
      fields.value[index].value.unit = FoundProduct.unit
      fields.value[index].value.price = FoundProduct.price
    };
  }




};

//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
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
        // supplier_product_id: zod
        //   .any()
        //   .refine((value) => value !== null && value !== undefined && value !== '', {
        //     message: requireValue
        //   }),
        supplier_product_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
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
const { value: request_reason_id } = useField('request_reason_id')
const { value: want_receive_date } = useField('want_receive_date')

const { remove, push, fields } = useFieldArray('supplierProduct')

const avatar_image = ref() // รูปเริ่มต้น
const selectedImageUrl = ref()
//  ******************* EVENTS UPLOAD IMAGE***************************



const errorAlert = ref(false)
const alertToast = ref({})
// *********** [ DATA SECTION ] ***************
const resBranchs = ref()
const loadBranch = async () => {
  const res = await dataApi.getBranch()
  resBranchs.value = res.data.data
}
const resRequestReasons = ref()
const loadRequestReasons = async () => {
  const res = await dataApi.getRequestReasons()
  resRequestReasons.value = res.data.data
}

const resStatusProducts = ref()
const loadStatusProductInBranch = async () => {
  const res = await dataApi.loadStatusProductInBranch()
  resStatusProducts.value = res.data.data
}
const resBranchDetail = ref()
const loadBranchDetail = async () => {
  const res = await dataApi.getBranchDetail()
  resBranchDetail.value = res.data.data
}
onMounted(() => {
  loadBranchDetail()
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
  if (isSaveDraft.value == true) {
    safeDraf()
  } else {
    saveRequestOrder(values)
  }



})

const saveRequestOrder = async (values) => {
  loadingBtn.value = true
  values.items = values.supplierProduct
  // values.supplierProduct.forEach((e, i) => {
  //   e.supplier_product_id = e.supplier_product_id.id
  // })
  values.supplierProduct.forEach((e, i) => {
    e.supplier_product_id = e.supplier_product_id
  })
  values.request_date = format(new Date(values.request_date), 'yyyy-MM-dd')
  values.want_receive_date = format(new Date(values.want_receive_date), 'yyyy-MM-dd')
  errorAlert.value = false
  try {
    const res = await dataApi.saveRequestOrderItems(values)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset()
    setTimeout(() => {
      router.push({ path: '/importproducts' })
    }, 2000)
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
}


// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543
    return format(new Date(date), `dd/MM/${thaiYear}`)
  }
}

const formatDate = (value) => {
  if (!value) {
    return ''; // หรือค่าที่คุณต้องการในกรณีที่ไม่มีค่า
  }
  if (!(value instanceof Date)) {
    // ในกรณีที่ value ไม่ใช่ Date object
    // คุณอาจต้องแปลง value เป็น Date object ก่อน
    value = new Date(value);
  }
  return value.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
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
const breadcrumbItems = [{ label: 'ร้องขอรายการ', to: '/connnent-pos-center' }]
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
  transition: box-shadow 0.15s;
}
</style>
