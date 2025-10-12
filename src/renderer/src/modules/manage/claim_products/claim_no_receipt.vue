<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="เคลมสินค้า" title1="เคลมโดยไม่มีใบเสร็จ" />
      <div class="page-header">
        <div class="page-btn">
          <Button
            label="+เพิ่มลูกค้ารายใหม่"
            size="small"
            icon="pi pi-users"
            severity="pimary"
            class="mr-2 font-semibold border-round-md"
            @click="openDialogInsert()"
          />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <Form @submit="onSubmitClaim">
          <div class="grid">
            <div class="col-12">
              <label class="pb-1 font-semibold text-gray-600">ชื่อผู้ซื้อ</label>
              <div class="">
                <Dropdown
                  filter
                  autoFilterFocus
                  v-model="customer_id"
                  :options="resCustomers"
                  optionLabel="fullname"
                  optionValue="id"
                  placeholder="เลือกผู้ซื้อ"
                  class="w-full"
                />
              </div>
              <small class="px-2 mt-1 text-red-600">{{ errors.customer_id }}</small>
            </div>

            <div class="col-12">
              <label class="pb-1 font-semibold text-gray-600">เลขที่ใบเสร็จ</label>
              <InputText v-model="sale_id" placeholder="เลขที่ใบเสร็จ.." class="w-full" />
            </div>

            <div class="col-12">
              <label class="pb-1 font-semibold text-gray-600">วันที่เคลม</label>
              <Calendar
                id="request_date"
                v-model="claim_date"
                showIcon
                placeholder="วันที่เคลม"
                showButtonBar
                :dateFormat="customDateFormat(claim_date)"
                class="w-full"
                :pt="{
                  dropdownButton: {
                    root: { class: 'bg-red-500 border-red-500' }
                  }
                }"
              />
              <small class="px-2 mt-1 text-red-600">{{ errors.claim_date }}</small>
            </div>

            <div class="col-12 pb-0">
              <label class="pb-1 font-semibold text-gray-600">Barcode</label>
              <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon bg-transparent" style="width: 2.5rem">
                  <i class="fa fa-barcode" data-bs-toggle="tooltip" title="fa fa-barcode"></i>
                </span>
                <InputText v-model="sku_barcode" placeholder="barcode.." class="" />
                <span
                  class="p-inputgroup-addon bg-orange-500 cursor-pointer"
                  @click="getProductDetail"
                  style="width: 2.5rem"
                >
                  <i
                    class="pi pi-search text-white"
                    data-bs-toggle="tooltip"
                    title="fa fa-barcode"
                  ></i>
                </span>
              </div>
              <small class="px-2 mt-1 text-red-600">{{ errors.sku_barcode }}</small>
            </div>

            <div class="col-12">
              <label class="font-semibold text-gray-600">ชื่อสินค้า</label>
              <InputText v-model="product_name" disabled placeholder="ชื่อสินค้า" class="w-full" />
              <small class="px-2 text-red-600">{{ errors.product_name }}</small>
            </div>

            <div class="col-12">
              <label class="pb-1 font-semibold text-gray-600">สาเหตุการเคลม</label>
              <Dropdown
                filter
                autoFilterFocus
                v-model="claim_reason_id"
                :options="resRequestReasons"
                optionLabel="request_reason_name"
                optionValue="id"
                placeholder="เลือกสาเหตุ"
                class="w-full"
              />
              <small class="px-2 mt-1 text-red-600">{{ errors.claim_reason_id }}</small>
            </div>
          </div>
          <hr class="my-3" />
          <div class="flex flex-wrap gap-3 justify-content-end w-full">
            <Button
              label="บันทึกการเคลม"
              icon="pi pi-save"
              severity="success"
              :loading="loadingBtn"
              type="submit"
              class="w-auto"
            />
          </div>
        </Form>
      </div>
    </div>

    <Dialog
      v-model:visible="dialogProcessCustomer"
      maximizable
      :style="{ width: '800px' }"
      header="รายละเอียดลูกค้า"
      :modal="true"
      class="p-fluid"
    >
      <hr class="mb-3" />
      <Form @submit="onSubmitCreateCustomer">
        <div class="grid">
          <div class="col-12">
            <div>
              <label for="branch_name" class="pb-3 font-semibold text-gray-600 col-12"
                >คำนำหน้า</label
              >
              <div class="w-full">
                <Dropdown
                  filter
                  autoFilterFocus
                  v-model="title_name"
                  :options="itemTitleName"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="คำนำหน้า"
                  class=""
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.title_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="first_name" class="pb-3 font-semibold text-gray-600 col-12">ชื่อ</label>
              <div class="w-full">
                <InputText v-model="first_name" placeholder="ชื่อ" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.first_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="last_name" class="pb-3 font-semibold text-gray-600 col-12">นามสกุล</label>
              <div class="w-full">
                <InputText v-model="last_name" placeholder="นามสกุล" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.last_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="nick_name" class="pb-3 font-semibold text-gray-600 col-12"
                >ชื่อเล่น</label
              >
              <div class="w-full">
                <InputText v-model="nick_name" placeholder="ชื่อเล่น" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.nick_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="cid" class="pb-3 font-semibold text-gray-600 col-12"
                >เลขประจำตัวประชาชน</label
              >
              <div class="w-full">
                <InputMask v-model="cid" mask="9-9999-99999-99-9" placeholder="x-xxxx-xxxxx-xx-x" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.cid }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <div class="form-group">
                <label class="pb-3 font-semibold text-gray-600 col-12"> รูปโปรไฟล์</label>
                <div class="flex">
                  <Avatar
                    :image="
                      selectedImageUrl !== null && selectedImageUrl !== ''
                        ? selectedImageUrl
                        : '@/public/image/image404.jpg'
                    "
                    class="mr-2"
                    :class="{ 'bg-transparent': selectedImageUrl }"
                    size="xlarge"
                    shape="circle"
                  />
                  <div class="image-upload">
                    <input
                      class=""
                      type="file"
                      accept="image/*"
                      :maxFileSize="1000000"
                      @change="onUpload"
                      label="อัพโหลดรูปภาพ"
                    />
                    <div class="image-uploads">
                      <img src="../../../assets/img/icons/upload.svg" alt="img" />
                      <h4>เลือกหรือลากภาพไฟล์ลงไปเพื่ออัพโหลดไฟล์...</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="phone_no" class="pb-3 font-semibold text-gray-600 col-12"
                >หมายเลขโทรศัพท์</label
              >
              <div class="w-full">
                <InputMask
                  v-model="phone_no"
                  @keydown="validatePhoneNumber"
                  date="phone"
                  mask="(999) 999-9999"
                  placeholder="(099) 999-9999"
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.phone_no }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="address_no" class="pb-3 font-semibold text-gray-600 col-12"
                >รายละเอียดที่อยู่</label
              >
              <div class="w-full">
                <Textarea v-model="address_no" autoResize rows="5" cols="30" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.address_no }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="province_id" class="pb-3 font-semibold text-gray-600 col-12"
                >จังหวัด</label
              >
              <div class="w-full">
                <Dropdown
                  filter
                  autoFilterFocus
                  v-model="province_id"
                  :options="resProvincesOption"
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="จังหวัด"
                  class="w-full"
                  @change="handleProvinceChange"
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.province_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="amphure_id" class="pb-3 font-semibold text-gray-600 col-12">อำเภอ</label>
              <div class="w-full">
                <Dropdown
                  filter
                  autoFilterFocus
                  v-model="amphure_id"
                  :options="resAmphuresOption"
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="อำเภอ"
                  class="w-full"
                  @change="handleAmphureChange"
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.amphure_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="district_id" class="pb-3 font-semibold text-gray-600 col-12">ตำบล</label>
              <div class="w-full">
                <Dropdown
                  filter
                  autoFilterFocus
                  v-model="district_id"
                  :options="resDistrictsOption"
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="ตำบล"
                  class="w-full"
                  @change="handleDistrictChange()"
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.district_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="zipcode" class="pb-3 font-semibold text-gray-600 col-12">ไปรษณีย์</label>
              <div class="w-full">
                <InputText
                  id="zipcode"
                  v-model="zipcode"
                  :disabled="!district_id"
                  type="text"
                  placeholder="รหัสไปรษณื"
                />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.zipcode }}</small>
            </div>
          </div>
        </div>
        <hr class="my-3" />
        <div class="flex flex-wrap gap-3 justify-content-end w-full">
          <Button
            label="ยกเลิก"
            @click="closetDialogInsert"
            type="button"
            severity="secondary"
            size="small"
            class="w-auto"
          />
          <Button label="บันทึก" :loading="loadingBtn" icon="pi pi-save" type="submit" size="small" class="w-auto" />
        </div>
      </Form>
    </Dialog>

    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast" />
  </div>
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

import { useRouter, useRoute } from 'vue-router'
// [ FOLDER API ]
import * as dataApi from './api/data.js'
import * as addressDataServices from './api/address.js'
// *********************************************************[[ END IMPORT ]]********************************************************
// *********************************************************************************************************************************
// *********************************************************************************************************************************

// *************** [ loading button ]
const router = useRouter()
// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

const errorAlert = ref(false)
const alertToast = ref({})

// ************** [ LOAD DATA ON MOUNT ] **********
onMounted(() => {
  loadDataCustomers()
  loadRequestReasons()
  loadProvinces()
})
const resCustomers = ref()
const loadDataCustomers = async () => {
  const res = await dataApi.getCustomer()
  resCustomers.value = res.data.data.data
  resCustomers.value.forEach((e, i) => {
    // e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
    if (
      e.title_name !== undefined &&
      e.title_name !== null &&
      e.first_name !== undefined &&
      e.first_name !== null &&
      e.last_name !== undefined &&
      e.last_name !== null
    ) {
      e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
    } else {
      e.fullname = 'N/A' // Or any other default value if the properties are null or undefined
    }
  })
}

const resRequestReasons = ref()
const loadRequestReasons = async () => {
  const res = await dataApi.getRequestReasons()
  resRequestReasons.value = res.data.data
}
//*********** VALIDATETION ****************
const requireValue = 'กรุณาระบุข้อมูล'

//! /////// [validation2 Event On Claim in dialog] /////////
const validationSchema = toTypedSchema(
  zod.object({
    customer_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    claim_date: zod.date({
      required_error: requireValue,
      invalid_type_error: 'กรุณาเลือกวันที่'
    }),
    sku_barcode: zod.string().nonempty(requireValue).default(''),
    claim_reason_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    })
  })
)

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

const { value: customer_id } = useField('customer_id')
const { value: claim_date } = useField('claim_date', null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
})
const { value: sale_id } = useField('sale_id')
const { value: sku_barcode } = useField('sku_barcode')
const { value: claim_reason_id } = useField('claim_reason_id')
const { value: product_name } = useField('product_name')

const branUser = localStorage.getItem('branUser')
const getProductDetail = async () => {
  loadingBtn.value = true
  const payload = {
    sku_barcode: sku_barcode.value,
    branch_id: branUser
  }
  try {
    const res = await dataApi.getProductDetailBySkuBarCode(payload)
    product_name.value = res.data.data.supplier_product_name;
  } catch (error) {
    product_name.value = null;
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}
const onSubmitClaim = handleSubmit(async (values) => {
  if (!product_name) {
    return false
  }
  saveClaimSku(values)
})
const saveClaimSku = async (values) => {
  claim_date.value = format(new Date(claim_date.value), 'yyyy-MM-dd')
  const payload = {
    customer_id: customer_id.value,
    claim_date: claim_date.value,
    sale_id: sale_id.value,
    sku_barcode: sku_barcode.value,
    claim_reason_id: claim_reason_id.value
  }
  loadingBtn.value = true
  try {
    errorAlert.value = false
    const res = await dataApi.saveClaimSku(payload)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: ''
    }
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
  handleReset()
}

const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    customer_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    total_amount: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  }
}
initFilters()

// ************************ [[ SECTION CUSTOMER CREATE ]] ************************************
// ************************************************************************************
// **********************[ DIALOG ] ********************************
const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])
// ********** [[ ที่อยู่]] *********************

const resProvincesOption = ref()
const resAmphuresOption = ref()
const resDistrictsOption = ref()
const loadProvinces = async () => {
  const rs = await addressDataServices.getAddressProvinces()
  resProvincesOption.value = rs.data.data
}
const loadAddressWhenEdit = async () => {
  const rsprovinces = await addressDataServices.getAddressProvinces()
  resProvincesOption.value = rsprovinces.data.data
  const rsAmphur = await addressDataServices.getAddressAmphuresById(province_id.value)
  resAmphuresOption.value = rsAmphur.data.data
  const rsDistrict = await addressDataServices.getAddressDistrictsById(amphure_id.value)
  resDistrictsOption.value = rsDistrict.data.data
}
const handleProvinceChange = async () => {
  console.log('เลือกจังหวัด')
  // โหลดอำเภอ
  const rs = await addressDataServices.getAddressAmphuresById(province_id.value)
  resAmphuresOption.value = rs.data.data
  console.log(resAmphuresOption.value)

  amphure_id.value = null
  district_id.value = null
  zipcode.value = null
}
const handleAmphureChange = async () => {
  const rs = await addressDataServices.getAddressDistrictsById(amphure_id.value)
  resDistrictsOption.value = rs.data.data
  console.log(amphure_id.value)
  district_id.value = null
  zipcode.value = null
}
const handleDistrictChange = () => {
  for (const item of resDistrictsOption.value) {
    if (item.id == district_id.value) {
      zipcode.value = String(item.zip_code)
      break // Stop the loop since we found the matching item
    }
  }
}
//! /////// [validation] /////////
const validationSchema2 = toTypedSchema(
  zod.object({
    title_name: zod
      .string({ required_error: requireValue, invalid_type_error: requireValue })
      .nonempty(requireValue)
      .default(''),
    first_name: zod.string().nonempty(requireValue).default(''),
    last_name: zod.string().nonempty(requireValue).default(''),
    cid: zod.string().nonempty(requireValue).min(13).default(''),
    phone_no: zod.string().nonempty(requireValue).min(10).default(''),
    address_no: zod.string().nonempty(requireValue).default(''),
    province_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    district_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    amphure_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    zipcode: zod.string().nonempty(requireValue).default('')
  })
)
const {
  handleReset: handleReset2,
  handleSubmit: handleSubmit2,
  errors: errors2
} = useForm({
  validationSchema: validationSchema2
})
const { value: title_name } = useField('title_name')
const { value: first_name } = useField('first_name')
const { value: last_name } = useField('last_name')
const { value: nick_name } = useField('nick_name')
const { value: cid } = useField('cid')
const { value: phone_no } = useField('phone_no')
const { value: address_no } = useField('address_no')
const { value: province_id } = useField('province_id')
const { value: district_id } = useField('district_id')
const { value: amphure_id } = useField('amphure_id')
const { value: zipcode } = useField('zipcode')

const lastInsertPhon = ref()

const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, '')

  if (
    (number.length >= 2 && ['0', '1', '7', '4'].includes(number[1])) ||
    !['0'].includes(number[0])
  ) {
    event.preventDefault()
    phone_no.value = phone_no.value
  }
}

const avatar_image = ref() // รูปเริ่มต้น
const selectedImageUrl = ref()
//************************* */ Dialog Create Customer
const dialogProcessCustomer = ref(false)
const openDialogInsert = () => {
  handleReset2()
  dialogProcessCustomer.value = true
}
const closetDialogInsert = () => {
  dialogProcessCustomer.value = false
  handleReset2()
}
const onSubmitCreateCustomer = handleSubmit2((values) => {
  saveCustomer(values)
})

const saveCustomer = async (values) => {
  cid.value = await cid.value.replace(/[^0-9]/g, '')
  phone_no.value = await phone_no.value.replace(/\D/g, '')
  // เก็บไว้เพื่อนำไปยิงแล้ว quick show ลูกค้า
  lastInsertPhon.value = phone_no.value
  console.log(values)

  const formDataToObject = (formData) => {
    const object = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    return object
  }

  const formData = new FormData()
  formData.append('title_name', title_name.value)
  formData.append('first_name', first_name.value)
  formData.append('last_name', last_name.value)
  formData.append('cid', cid.value)
  if (avatar_image.value) {
    formData.append('avatar_image', avatar_image.value)
  }
  formData.append('phone_no', phone_no.value)
  formData.append('address_no', address_no.value)
  formData.append('province_id', province_id.value)
  formData.append('district_id', district_id.value)
  formData.append('amphure_id', amphure_id.value)
  formData.append('zipcode', zipcode.value)
  console.log('formData out try', formData)

  const formDataObject = formDataToObject(formData)
  errorAlert.value = false
  // save
  loadingBtn.value = true
  try {
    const res = await dataApi.saveCustomer(formData)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset2()
    await loadDataCustomers()
    await onSubmitSearchPhon()
    dialogProcessCustomer.value = false
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

const onSubmitSearchPhon = async (values) => {
  errorAlert.value = false
  const payload = {
    phone_no: lastInsertPhon.value
    // phone_no: "0854684841"
  }
  loadingBtn.value = true
  try {
    const res = await dataApi.getCustomerByPhon(payload)
    console.log('getCustomerByPhon', res.data.data)
    customer_id.value = res.data.data.id
  } catch (error) {
    loadingBtn.value = false
    console.log(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
}

//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    selectedImageUrl.value = URL.createObjectURL(file) // สร้าง URL จากไฟล์
    avatar_image.value = file // เก็บไฟล์ที่เลือกลงตัวแปร
  }
}

const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543
    return format(new Date(date), `dd/MM/${thaiYear}`)
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
const breadcrumbItems = [{ label: 'เคลมสินค้า', to: '/claimproduct' }]
</script>
