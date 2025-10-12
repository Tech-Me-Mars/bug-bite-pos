<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="เรียกดูใบเสร็จ" title1="" />
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <div class="mb-3 flex justify-content-between">
          <Form class="flex w-full row" @submit="onSerch">
            <div class="col-12 col-md-5 col-lg-3">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">วันที่เริ่มต้น</label>
              </div>
              <Calendar v-model="date_s" show-icon placeholder="วันที่เริ่มต้น" class="w-full"
                :dateFormat="customDateFormat(date_s)" showButtonBar />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_s }}</small>
            </div>
            <div class="col-12 col-md-5 col-lg-3">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">วันที่สิ้นสุด</label>
              </div>
              <Calendar v-model="date_e" show-icon placeholder="วันที่สิ้นสุด" class="w-full"
                :dateFormat="customDateFormat(date_e)" :minDate="date_s" showButtonBar />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_e }}</small>
            </div>
            <div class="col-12 col-md-5 col-lg-3">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">รหัสใบเสร็จ</label>
              </div>
              <div class="">
                <span class="p-input-icon-left w-full">
                  <i class="pi pi-search" />
                  <InputText v-model="sale_id" class="w-full" placeholder="รหัสใบเสร็จ" />
                </span>
              </div>
            </div>

            <div class="col flex align-items-center mt-2">
              <Button class="mx-2 h-3rem w-8rem text-lg" :loading="loadingBtn" severity="danger" icon="pi pi-search"
                label="ค้นหา" type="submit" />
            </div>
          </Form>
        </div>
      </div>
    </div>

    <div v-if="resGetReceipt.data" class="card">
      <div class="card-body">
        <div class="flex justify-content-between">
          <h4 class="card-title">รายการใบเสร็จทั้งหมด</h4>
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

        <div class="table-responsive">
          <DataTable v-model:selection="selectedCustomers" ref="dt"
            :export-filename="`ข้อมูลรายการใบเสร็จทั้งหมด${format(new Date(), 'ddMMyyyyHHmmss')}`" class="p-datatable-sm"
            :total-records="totalRecords" :first="firstRows" :lazy="true" :value="resGetReceipt.data" :paginator="true"
            :rows="10" data-key="id" filter-display="menu" :loading="tabaleLoading"
            paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rows-per-page-options="[5, 10, 25, 50, 75, 100, 500, 1000]"
            current-page-report-template="แสดง {first} - {last} จาก {totalRecords} รายการ" :pt="{
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
            }" @sort="onSort($event)" @page="onPage($event)">
            <template #empty> No Last order found. </template>

            <Column field="index" header="#" style="min-width: 5rem"> </Column>

            <Column field="id" header="ID" sortable style="min-width: 7rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data, index }">
                {{ data.id }}
              </template>
            </Column>

            <Column header="พนักงาน" style="min-width: 7rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data }">
                {{ data.employee.title_name }} {{ data.employee.first_name }}
                {{ data.employee.last_name }}
              </template>
            </Column>

            <Column header="ลูกค้า" style="min-width: 7rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data }">
                <div v-if="data.customer != null">
                  {{ data.customer.title_name }} {{ data.customer.first_name }}
                  {{ data.customer.last_name }}
                </div>
              </template>
            </Column>

            <Column field="sale_date" header="วันเวลา" sortable style="min-width: 7rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data, index }">
                {{ data.sale_date }}
              </template>
            </Column>

            <Column field="sum_qty" header="จำนวนทั้งหมด" sortable style="min-width: 9rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data, index }">
                <div v-if="data.sum_qty">
                  {{ formatNumber(data.sum_qty) }}
                </div>
                <div v-else>No Data</div>
              </template>
            </Column>

            <Column field="total_amount" header="เงินทั้งหมด" sortable style="min-width: 7rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data, index }">
                {{ formatCurrency(data.total_amount) }}
              </template>
            </Column>

            <Column field="sale_details_count" header="จำนวนรายการที่ขาย" sortable style="min-width: 11rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data, index }">
                <div v-if="data.sale_details_count">
                  {{ formatNumber(data.sale_details_count) }}
                </div>
                <div v-else>No Data</div>
              </template>
            </Column>

            <Column header="ช่องทางชำระเงิน" style="min-width: 10rem">
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

            <Column header="รูปแบบใบเสร็จ" style="min-width: 12rem">
              <template #body="{ data }">
                <div class="card flex justify-content-center flex-wrap gap-3">
                  <Button class="text-blue-600" aria-label="Youtube" outlined @click="showFullReceipt(data.id)">
                    <vue-feather type="file-text" data-bs-toggle="tooltip" title="fe fe-file-text"></vue-feather>
                    <span class="">ใบเสร็จแบบเต็ม</span>
                  </Button>

                  <Button class="text-cyan-600" aria-label="Youtube" outlined @click="showMiniReceipt(data.id)">
                    <vue-feather type="file-text" data-bs-toggle="tooltip" title="fe fe-file-text"></vue-feather>
                    <span class="">ใบเสร็จแบบย่อ</span>
                  </Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="isShowFullReceipt" modal header="ใบเสร็จแบบเต็ม" :style="{ width: 'auto' }">
      <div>
        <div v-if="loadReceipt" class="flex justify-content-center align-items-center">
          <div class="container bootstrap snippets bootdey">
            <div class="panel panel-default">
              <div class="panel-body shadow-7 border-round-xl">
                <div class="row">
                  <div class="col-12 text-center">
                    <h4 class="text-dark">
                      <strong>ใบเสร็จรับเงิน<br />Receipt</strong>
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6 text-left">
                    <ul class="list-unstyled">
                      <li>
                        <strong>ลูกค้า</strong>/Customer:
                        {{ resFullReceiptData.customer.title_name }}
                        {{ resFullReceiptData.customer.first_name }}
                        {{ resFullReceiptData.customer.last_name }}
                      </li>
                      <li>
                        <strong>ที่อยู่:</strong>/Address:
                        {{ resFullReceiptData.customer.address_no }}
                        {{ resFullReceiptData.customer.district.name_th }}
                        {{ resFullReceiptData.customer.amphur.name_th }}
                        {{ resFullReceiptData.customer.province.name_th }}
                      </li>
                      <li>
                        <strong>ไปรษณีย์:</strong>:/Postcode
                        {{ resFullReceiptData.customer.zipcode }}
                      </li>
                      <li><strong>วันที่:</strong>/Date: {{ resFullReceiptData.sale_date }}</li>
                    </ul>
                  </div>

                  <div class="col-md-6 col-sm-6 text-right">
                    <ul class="list-unstyled">
                      <li>
                        <strong>พนักงานที่ทำรายการ:</strong>
                        {{ resFullReceiptData.employee.title_name }}
                        {{ resFullReceiptData.employee.first_name }}
                        {{ resFullReceiptData.employee.last_name }}
                      </li>
                      <!-- <li><strong>Account Number:</strong> 012345678901</li>
                                    <li><strong>SWIFT Code:</strong> SWITCH012345678CODE</li>
                                    <li><strong>V.A.T Reg #:</strong> VAT5678901CODE</li> -->
                    </ul>
                  </div>
                </div>

                <div class="table-responsive">
                  <DataTable :value="resFullReceiptData.sale_details" table-style="min-width: 50rem">
                    <Column field="id" header="รหัสสินค้า">
                      <template #body="{ data }"> #{{ data.id }} </template>
                    </Column>
                    <Column field="supplier_product_name" header="ชื่อสินค้า">
                      <template #body="{ data }">
                        {{ data.supplier_product_name }}
                      </template>
                    </Column>
                    <Column field="sku_barcode" header="sku barcode">
                      <template #body="{ data }">
                        {{ data.sku_barcode }}
                      </template>
                    </Column>
                    <Column field="unit_price" header="ราคา/ชิ้น">
                      <template #body="{ data }">
                        {{ formatCurrency(data.unit_price) }}
                      </template>
                    </Column>
                    <Column field="quantity" header="จำนวน">
                      <template #body="{ data }">
                        {{ formatNumber(data.quantity) }}
                      </template>
                    </Column>

                    <Column field="total_price" header="จำนวนเงินทั้งหมด">
                      <template #body="{ data }">
                        {{ formatCurrency(data.total_price) }}
                      </template>
                    </Column>
                  </DataTable>
                  <div class="flex md:flex-row md:align-items-start md:justify-content-between mt-8">
                    <div class="font-semibold mb-3 md:mb-0"><strong>หมายเหตุ</strong>/Remark</div>
                    <div class="flex flex-column">
                      <div class="flex justify-content-between align-items-center mb-2">
                        <span class="font-semibold mr-6"><strong>จำนวนสินค้าที่ซื้อทั้งหมด</strong></span><span
                          v-if="resFullReceiptData.sum_qty">{{ formatNumber(resFullReceiptData.sum_qty) }} ชิ้น</span>
                      </div>
                      <div class="flex justify-content-between align-items-center mb-2">
                        <span class="font-semibold mr-6"><strong>ช่องทางชำระเงิน</strong>/Payment Methods</span><span>{{
                          resFullReceiptData.payment[0].method_name }}</span>
                      </div>
                      <div class="flex justify-content-between align-items-center mb-2">
                        <span class="font-semibold mr-6"><strong>ราคาสุทธิสินค้าที่เสียภาษี</strong>/Pre-VAT
                          Amoute</span><span>0.00</span>
                      </div>
                      <div class="flex justify-content-between align-items-center mb-2">
                        <span class="font-semibold mr-6"><strong>ภาษีมูลค่าเพิ่ม (บาท) #</strong>/VAT</span><span>0</span>
                      </div>
                      <div class="flex justify-content-between align-items-center">
                        <span class="font-semibold mr-6"><strong>จำนวนเงินทั้งสิ้น (บาท)</strong>/Grand
                          Total</span><span>{{ resFullReceiptData.total_amount }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="nomargin-top" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="isShowMiniReceipt" modal header="ใบเสร็จแบบย่อ" :style="{ width: 'auto' }">
      <div v-if="loadReceipt" class="flex justify-content-center align-items-center">
        <div class="card shadow-6 border-round-xl" style="width: 25rem">
          <div class="card-body mx-4">
            <div class="container">
              <p class="text-center" style="font-size: 25px">ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ</p>
              <div class="row">
                <ul class="list-unstyled">
                  <li v-if="resMiniReceiptData.customer" class="text-black">
                    {{ resMiniReceiptData.customer.title_name }}
                    {{ resMiniReceiptData.customer.first_name }}
                    {{ resMiniReceiptData.customer.last_name }}
                  </li>
                  <li class="text-muted mt-1">
                    <span class="text-black">เลขที่ใบเสร็จ</span> #{{ resMiniReceiptData.id }}
                  </li>
                  <li class="text-black mt-1">{{ resMiniReceiptData.sale_date }}</li>
                </ul>
                <hr />
              </div>
              <!-- resMiniReceiptData -->
              <div v-if="resMiniReceiptData.sale_details">
                <div v-for="(item, index) in resMiniReceiptData.sale_details" :key="index" class="row">
                  <div class="col-xl-10">
                    <!-- v-if="item.supplier_product_name"  -->
                    <span class="text-wrap">#{{ index + 1 }} {{ item.supplier_product_name }} ({{
                      formatCurrency(item.unit_price)
                    }}) x {{ formatNumber(item.quantity) }}</span>
                  </div>
                  <div class="col-xl-2">
                    <p class="float-end">{{ formatCurrency(item.supplier_product_price) }}</p>
                  </div>
                  <hr />
                </div>
              </div>

              <div class="row text-black">
                <hr style="border: 2px solid black" />
                <div v-if="resMiniReceiptData.total_amount" class="col-xl-12">
                  <p class="float-end fw-bold">
                    จำนวนเงินรวมทั้งหมด: {{ formatCurrency(resMiniReceiptData.total_amount) }}
                  </p>
                </div>
                <hr style="border: 2px solid black" />
              </div>
              <div class="text-center" style="margin-top: 90px">
                <!-- <a><u class="text-info">View in browser</u></a> -->
                <p>@MIXVALUE POS RECEIP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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



const loadReceipt = ref(false)
// *** [ DIALOG LOADIG ]
const isShowFullReceipt = ref(false)
//************* [ Dialog FULL RECEIPT ]
const resFullReceiptData = ref({
  sale_details: null,
  total_amount: null,
  customer: null,
  employee: null
})

const showFullReceipt = async (id) => {
  loadDataFullReceipt(id)
  isShowFullReceipt.value = true
}
const loadDataFullReceipt = async (id) => {
  loadReceipt.value = false
  const res = await dataApi.getReceiptById(id)
  resFullReceiptData.value = res.data.data
  resFullReceiptData.value.sale_details.forEach((e, i) => {
    e.index = i + 1
  })
  loadReceipt.value = true
}

const closeFullReceipt = () => {
  isShowFullReceipt.value = false
}

//************* [ Dialog MINI RECEIPT ]
const isShowMiniReceipt = ref(false)
const resMiniReceiptData = ref({
  sale_details: null,
  total_amount: null,
  customer: null,
  employee: null
})

const showMiniReceipt = async (id) => {
  loadDataMiniReceipt(id)
  isShowMiniReceipt.value = true
}
const loadDataMiniReceipt = async (id) => {
  loadReceipt.value = false
  const res = await dataApi.getReceiptById(id)
  resMiniReceiptData.value = res.data.data
  resMiniReceiptData.value.sale_details.forEach((e, i) => {
    e.index = i + 1
  })
  console.log(resMiniReceiptData.value)
  loadReceipt.value = true
};

const closeMiniReceipt = () => {
  isShowMiniReceipt.value = false
}

const errorAlert = ref(false)
const alertToast = ref({})

//*********** VALIDATETION ****************
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    date_s: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    date_e: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    })
  })
)
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
});

//*********** CONST VARIABLE FORM ****************
const { value: date_s } = useField('date_s', null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
})
const { value: date_e } = useField('date_e', null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
})
const { value: sale_id } = useField('sale_id')

const onSerch = handleSubmit(async (values) => {
  console.log(values)
  loadBtn()
  loadDataSearch()
})

// ************* [ TABLE SERVERSIDE SECTION ]
const tabaleLoading = ref(false)
const paginator = ref({
  page: 1,
  limit: 10
})
const sortField = ref({
  field: null,
  orderby: null
})
const firstRows = ref(0)
const totalRecords = ref(0)

const onPage = async (event) => {
  console.log(event)
  firstRows.value = event.first + 1
  paginator.value.page = event.page + 1
  paginator.value.limit = event.rows
  await loadLayzyReceipt()
}
const lazyParams = ref({})

const onSort = async (event) => {
  console.log(event)
  sortField.value.field = event.sortField
  if (event.sortOrder == -1) {
    sortField.value.orderby = 'desc'
  } else {
    sortField.value.orderby = 'asc'
  }
  await loadLayzyReceipt()
}
// ************* [ END TABLE SERVERSIDE SECTION ]

const resGetReceipt = ref({ data: null })
const loadDataSearch = async () => {
  const date_sFormat = format(new Date(date_s.value), 'yyyy-MM-dd')
  const date_eFormat = format(new Date(date_e.value), 'yyyy-MM-dd')
  try {
    tabaleLoading.value = true
    errorAlert.value = false
    const res = await dataApi.getReceipt(
      date_sFormat,
      date_eFormat,
      paginator.value,
      sale_id.value,
      sortField.value
    )
    resGetReceipt.value = res.data.data.GetReceipt
    totalRecords.value = res.data.data.GetReceipt.total
    firstRows.value = res.data.data.GetReceipt.from - 1

    console.log(totalRecords.value)
    console.log(resGetReceipt.value)

    alertToast.value = {
      severity: 'success',
      summary: 'ค้นหาข้อมูลสำเร็จ',
      detail: ''
    }
    console.log(resGetReceipt.value)
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
  tabaleLoading.value = false
  //   handleReset();
}

const loadLayzyReceipt = async () => {
  const date_sFormat = format(new Date(date_s.value), 'yyyy-MM-dd')
  const date_eFormat = format(new Date(date_e.value), 'yyyy-MM-dd')
  try {
    tabaleLoading.value = true
    errorAlert.value = false
    const res = await dataApi.getReceipt(
      date_sFormat,
      date_eFormat,
      paginator.value,
      sale_id.value,
      sortField.value
    )
    resGetReceipt.value = res.data.data.GetReceipt
    totalRecords.value = res.data.data.GetReceipt.total
    firstRows.value = res.data.data.GetReceipt.from - 1

    console.log(resGetReceipt.value)
  } catch (error) {
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      detail: error.response.data.message
    }
  }
  tabaleLoading.value = false
}

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
const breadcrumbItems = [{ label: 'ร้องขอใบเสร็จ', to: '/receipt-preview' }]

// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543;
    return format(new Date(date), `dd/MM/${thaiYear}`);
  }
};

</script>

<style scope>
.panel {
  position: relative;

  background: transparent;

  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.panel.fullscreen .accordion .panel-body,
.panel.fullscreen .panel-group .panel-body {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
}

.panel.fullscreen .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.panel>.panel-heading {
  text-transform: uppercase;

  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.panel>.panel-heading small {
  text-transform: none;
}

.panel>.panel-heading strong {
  font-family: Arial, Helvetica, Sans-Serif;
}

.panel>.panel-heading .buttons {
  display: inline-block;
  margin-top: -3px;
  margin-right: -8px;
}

.panel-default>.panel-heading {
  padding: 15px 15px;
  background: #fff;
}

.panel-default>.panel-heading small {
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 300;
}

.panel-clean {
  border: 1px solid #ddd;
  border-bottom: 3px solid #ddd;

  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.panel-clean>.panel-heading {
  padding: 11px 15px;
  background: #fff !important;
  color: #000;
  border-bottom: #eee 1px solid;
}

.panel>.panel-heading .btn {
  margin-bottom: 0 !important;
}

.panel>.panel-heading .progress {
  background-color: #ddd;
}

.panel>.panel-heading .pagination {
  margin: -5px;
}

.panel-default {
  border: 0;
}

.panel-light {
  border: rgba(0, 0, 0, 0.1) 1px solid;
}

.panel-light>.panel-heading {
  padding: 11px 15px;
  background: transaprent;
  border-bottom: rgba(0, 0, 0, 0.1) 1px solid;
}

.panel-heading a.opt>.fa {
  display: inline-block;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  margin-right: 2px;
  padding: 5px;
  position: relative;
  text-align: right;
  top: -1px;
}

.panel-heading>label>.form-control {
  display: inline-block;
  margin-top: -8px;
  margin-right: 0;
  height: 30px;
  padding: 0 15px;
}

.panel-heading ul.options>li>a {
  color: #999;
}

.panel-heading ul.options>li>a:hover {
  color: #333;
}

.panel-title a {
  text-decoration: none;
  display: block;
  color: #333;
}

.panel-body {
  background-color: #fff;
  padding: 15px;

  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.panel-body.panel-row {
  padding: 8px;
}

.panel-footer {
  font-size: 12px;
  border-top: rgba(0, 0, 0, 0.02) 1px solid;
  background-color: rgba(0255, 255, 255, 1);

  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}
</style>
