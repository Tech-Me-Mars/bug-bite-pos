<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="mb-3" />
    <div class="">
      <div class="surface-card card p-4 shadow-2 border-round">
        <Form @submit="onSubmit">
          <!-- {{ errors }} -->
          <div class="grid formgrid p-fluid">
            <div class="field mb-4 col-12">
              <label for="privacy" class="font-bold">เพศ</label>
              <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="sex" inputId="mail" name="ชาย" :value="male" />
                  <label for="ingredient1" class="ml-2">ชาย</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="sex" inputId="femail" name="หญิง" :value="female" />
                  <label for="ingredient2" class="ml-2">หญิง</label>
                </div>
              </div>
              <small class="text-red-600">{{ errors.sex }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="position" class="font-bold">คำนำหน้า</label>
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
              <small class="text-red-600">{{ errors.title_name }}</small>
            </div>

            <div class="field mb-4 col-6">
              <label for="nick_name" class="font-bold">ชื่อเล่น</label>
              <InputText v-model="nick_name" type="text" placeholder="ชื่อเล่น" />
              <small class="text-red-600">{{ errors.nick_name }}</small>
            </div>

            <div class="field mb-4 col-6">
              <label for="first_name" class="font-bold">ชื่อ</label>
              <InputText v-model="first_name" type="text" placeholder="ชื่อ" />
              <small class="text-red-600">{{ errors.first_name }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="last_name" class="font-bold">นามสกุล</label>
              <InputText v-model="last_name" type="text" placeholder="นามสกุล" />
              <small class="text-red-600">{{ errors.last_name }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="phone_no" class="font-bold">เบอร์โทร</label>
              <InputMask
                v-model="phone_no"
                date="phone"
                mask="(999) 999-9999"
                placeholder="(099) 999-9999"
                @keydown="validatePhoneNumber"
              />
              <small class="text-red-600">{{ errors.phone_no }}</small>
            </div>
            <div class="field mb-4 col-6"></div>

            <!-- <div class="field mb-4 col-6">
                                    <label for="position" class="font-bold">ตำแหน่ง</label>
                                    <Dropdown filter autoFilterFocus v-model="position_id" :options="resPosition"
                                        :optionLabel="option => option.position_code + ' ' + option.position_name"
                                        optionValue="id" placeholder="ตำแหน่ง" class=" w-full"
                                        @change="positionChange(position_id)" />
                                    <small class="text-red-600">{{ errors.position_id }}</small>
                                </div> -->
            <div class="field mb-4 col-6">
              <label for="eamil" class="font-bold">อีเมลล์</label>
              <InputText v-model="email" disabled="true" placeholder="กรอกอีเมลล์" />
              <small class="text-red-600">{{ errors.email }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="pass" class="font-bold">รหัสผ่าน</label>
              <InputText v-model="password" toggleMask type="password" placeholder="รหัสผ่าน" />
              <small class="text-red-600">{{ errors.password }}</small>
            </div>
            <div class="surface-100 mb-3 col-12" style="height: 2px"></div>
            <div class="field mb-4 col-12 md:col-6">
              <div class="flex flex-row">
                <div>
                  <div class="flex flex-column">
                    <label for="avatar" class="font-bold">รูปภาพผู้ใช้</label>
                    <div class="flex">
                      <Avatar
                        :image="
                          selectedImageUrl !== null && selectedImageUrl !== ''
                            ? selectedImageUrl
                            : './image/image404.jpg'
                        "
                        class="mr-2"
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
            </div>
            <!-- LINE SHADOW address_no-->
            <div class="surface-100 mb-3 col-12" style="height: 2px"></div>

            <div class="field mb-4 col-12">
              <label for="email" class="font-bold">รายละเอียดที่อยู่</label>
              <Textarea v-model="address_no" autoResize rows="5" cols="30" />
              <small class="text-red-600">{{ errors.address_no }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="จังหวัด" class="font-bold">จังหวัด</label>
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
              <small class="text-red-600">{{ errors.province_id }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="อำเภอ" class="font-bold">อำเภอ</label>
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
              <small class="text-red-600">{{ errors.amphure_id }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="ตำบล" class="font-bold">ตำบล</label>
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
              <small class="text-red-600">{{ errors.district_id }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="email" class="font-bold">ไปรษณีย์</label>
              <InputText
                id="zipcode"
                v-model="zipcode"
                :disabled="!district_id"
                type="text"
                placeholder="รหัสไปรษณื"
              />
            </div>
            <div class="field mb-4 col-12">
              <label for="privacy" class="font-bold">สถานะ</label>
              <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="status" inputId="ingredient1" name="เปิด" :value="one" />
                  <label for="ingredient1" class="ml-2">เปิด</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="status" inputId="ingredient2" name="ปิด" :value="zero" />
                  <label for="ingredient2" class="ml-2">ปิด</label>
                </div>
              </div>
              <small class="text-red-600">{{ errors.status }}</small>
              <div class="surface-100 my-3 col-12" style="height: 2px"></div>
            </div>
          </div>
          <div class="flex justify-content-between">
            <!-- <div>
                            <Button label="ลบ" @click="confirmDelete({
                                message: title_name + ' ' + first_name + ' ' + last_name,
                                id: userId
                            })" type="button" severity="danger" size="small" class="w-auto" />

                        </div> -->
            <div>
              <Button
                severity="success"
                class="p-button p-component w-auto"
                se
                type="submit"
                :loading="loadingBtn"
                aria-label="Save Changes"
                data-pc-name="button"
                data-pc-section="root"
                data-pd-ripple="true"
              >
                <!----><span class="p-button-label" data-pc-section="label"
                  >บันทึกการเปลี่ยนแปลง</span
                ><!----><span
                  role="presentation"
                  aria-hidden="true"
                  data-p-ink="true"
                  data-p-ink-active="false"
                  class="p-ink"
                  data-pc-name="ripple"
                  data-pc-section="root"
                ></span>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
  <!--  -->
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" />
</template>

<script setup>
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
// Primevue API
import { format } from 'date-fns'
import { useRouter, useRoute } from 'vue-router'
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
// import Address
import * as dataApi from './api/data.js'
import * as addressDataServices from './api/address.js' // ตั้งค่า path ให้ถูกต้อง
//! /////// [validation] /////////
import { useField, useForm, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

onMounted(async () => {
  await loadData()
  await loadProvinces()
})

const requireValue = 'กรุณาระบุข้อมูล'
const loadingBtn = ref(false)

const one = ref(1)
const zero = ref(0)

const male = ref(1)
const female = ref(2)
const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty(requireValue)
      .email({ message: 'ต้องเป็นรูปแบบอีเมล์เท่านั้น' })
      .default(''),
    first_name: zod.string().nonempty(requireValue).default(''),
    last_name: zod.string().nonempty(requireValue).default(''),
    phone_no: zod.string().nonempty(requireValue).default(''), // ตรวจสอบว่ามีตัวเลข 10 ตัวอย่างเดียว
    title_name: zod
      .string({
        required_error: requireValue,
        invalid_type_error: requireValue
      })
      .nonempty(requireValue)
      .default(''),
    // password: zod
    //     .string({
    //         required_error: requireValue,
    //         invalid_type_error: requireValue,
    //     })
    //     .min(5)
    //     .nonempty(requireValue)
    //     .default(""),
    status: zod
      .number({
        required_error: requireValue,
        invalid_type_error: requireValue
      })
      .nullable(),
    sex: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    })

    // address_no: zod.string({
    //     required_error: requireValue,
    //     invalid_type_error: requireValue,
    // }).nonempty(requireValue).default(""),
    // province_id: zod.number({
    //   required_error: requireValue,
    //   invalid_type_error: requireValue,
    // }),
    // amphure_id: zod.number({
    //   required_error: requireValue,
    //   invalid_type_error: requireValue,
    // }),
    // district_id: zod.number({
    //   required_error: requireValue,
    //   invalid_type_error: requireValue,
    // }),
  })
)

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: first_name } = useField('first_name')
const { value: last_name } = useField('last_name')
const { value: nick_name } = useField('nick_name')
const { value: phone_no } = useField('phone_no')
const { value: title_name } = useField('title_name')
const { value: avatar_image } = useField('avatar_image')
const { value: address_no } = useField('address_no', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: province_id } = useField('province_id', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: amphure_id } = useField('amphure_id', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: district_id } = useField('district_id', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: zipcode } = useField('zipcode', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: status } = useField('status', null, {
  initialValue: 1 // กำหนดค่าเริ่มต้นที่นี่
})
const { value: sex } = useField('sex', null, {
  initialValue: 1 // กำหนดค่าเริ่มต้นที่นี่
})

// *********************************** [[ช่วงข้อมูลตั้งต้น]] ***************************

const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])
// ********** [[ ที่อยู่]]
const resProvincesOption = ref()
const resAmphuresOption = ref()
const resDistrictsOption = ref()

const loadProvinces = async () => {
  loadingBtn.value = true
  try {
    const rsprovinces = await addressDataServices.getAddressProvinces()
    resProvincesOption.value = rsprovinces.data.data

    const rsAmphur = await addressDataServices.getAddressAmphuresById(province_id.value)
    resAmphuresOption.value = rsAmphur.data.data

    const rsDistrict = await addressDataServices.getAddressDistrictsById(amphure_id.value)
    resDistrictsOption.value = rsDistrict.data.data
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}
const handleProvinceChange = async () => {
  // โหลดอำเภอ
  const rs = await addressDataServices.getAddressAmphuresById(province_id.value)
  resAmphuresOption.value = rs.data.data
  console.log(resAmphuresOption.value)

  amphure_id.value = null
  district_id.value = null
  zipcode.value = null
}

const handleAmphureChange = async () => {
  // โหลดตำบล
  const rs = await addressDataServices.getAddressDistrictsById(amphure_id.value)
  resDistrictsOption.value = rs.data.data
  console.log(amphure_id.value)

  district_id.value = null
  zipcode.value = null
}

const handleDistrictChange = () => {
  for (const item of resDistrictsOption.value) {
    if (item.id == district_id.value) {
      zipcode.value = item.zip_code
      break // Stop the loop since we found the matching item
    }
  }
}
// *********************************** [[จบช่วงข้อมูลตั้งต้น]] ***************************

const selectedImage = ref() // รูปเริ่มต้น
const selectedImageUrl = ref()
const isChangeImage = ref(false)
//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  isChangeImage.value = true
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    selectedImageUrl.value = URL.createObjectURL(file) // สร้าง URL จากไฟล์
    selectedImage.value = file // เก็บไฟล์ที่เลือกลงตัวแปร
  }
}

const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, '')

  if ((number.length >= 2 && ['0', '1', '7', '4'].includes(number[1])) ||!['0'].includes(number[0])) {
    event.preventDefault()
    phone_no.value = phone_no.value
  }
}

// const positionChange = async (param) => {
//     const selectedObj = resPosition.value.find(obj => obj.id == param);
//     position_code.value = selectedObj.position_code
//     position_name.value = selectedObj.position_name
//     console.log(position_code.value)
//     console.log(position_name.value)
// }

const onSubmit = handleSubmit(async (values) => {
  // console.log(values)
  saveUserEmployee()
})

//! /////// #END[validation] /////////

const route = useRoute()
const router = useRouter()

const resUserEmployee = ref()
const userId = ref()
const resPosition = ref()
// ************  GET[Data]    ************
const loadData = async () => {
  loadingBtn.value = true
  console.log(route.params.id)
  stateLoadding.value = true
  const rsUserInfo = await dataApi.getUserEmployeeById(route.params.id)
  resUserEmployee.value = rsUserInfo.data.data
  console.log(resUserEmployee.value)
  if (resUserEmployee.value._employee != null) {
    userId.value = resUserEmployee.value._employee.user_id
  } else {
    userId.value = resUserEmployee.value.id
  }

  await loadDataToForm()
  loadingBtn.value = false
  stateLoadding.value = false
}

const loadDataToForm = async () => {
  // const base64Image = await imageToBase64(selectedImage.value);
  email.value = resUserEmployee.value.email
  title_name.value = resUserEmployee.value._employee.title_name
  first_name.value = resUserEmployee.value._employee.first_name
  last_name.value = resUserEmployee.value._employee.last_name
  if (
    resUserEmployee.value &&
    resUserEmployee.value._employee &&
    resUserEmployee.value._employee.nick_name &&
    resUserEmployee.value._employee.nick_name != 'undefined'
  ) {
    nick_name.value = resUserEmployee.value._employee.nick_name
  }
  selectedImageUrl.value = resUserEmployee.value._employee.avatar_image

  phone_no.value = resUserEmployee.value._employee.phone_no
  address_no.value = resUserEmployee.value._employee.address_no
    ? resUserEmployee.value._employee.address_no
    : ''
  province_id.value = resUserEmployee.value._employee.province_id
  amphure_id.value = resUserEmployee.value._employee.amphure_id
  district_id.value = resUserEmployee.value._employee.district_id
  zipcode.value = resUserEmployee.value._employee.zipcode
  status.value = resUserEmployee.value._employee.status
  sex.value = resUserEmployee.value._employee.sex
}

// const convertImageUrlToBlob= async (imageUrl)=>{

//  fetch(imageUrl)
//   .then(response => response.blob())
//   .then(blob => {
//     // ทำอะไรกับ Blob ตรงนี้ เช่น แสดงรูปภาพใน HTML
//     const img = new Image();
//     return img.src = URL.createObjectURL(blob);

//   })
//   .catch(error => {
//     console.error("เกิดข้อผิดพลาดในการดาวน์โหลดรูปภาพ:", error);
//   });
// }

// ************  GET #END[Data]   ************

// ************  INSERT & Update  ************
const handelEditeStatus = ref(false)
// ************  [[ ALERT VARIABLE]]***********
const errorAlert = ref(false)
const alertToast = ref({})

const stateLoadding = ref(false)
const saveUserEmployee = async () => {
  loadingBtn.value = true
  console.log(sex.value)
  // ลบทุกตัวอักษรที่ไม่ใช่ตัวเลข เบอร์โทร
  phone_no.value = phone_no.value.replace(/\D/g, '')
  status.value = parseInt(status.value)
  sex.value = parseInt(sex.value)

  const formDataToObject = (formData) => {
    const object = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    return object
  }
  // **** รวมตัวแปรลง OBJECT*****
  const formData = new FormData()
  formData.append('email', email.value)
  if (password.value != null || password.value != undefined || password.value != '') {
    formData.append('password', password.value)
  }
  formData.append('first_name', first_name.value)
  formData.append('last_name', last_name.value)
  formData.append('nick_name', nick_name.value)
  formData.append('phone_no', phone_no.value)
  formData.append('title_name', title_name.value)
  if ((isChangeImage.value = true)) {
    formData.append('avatar_image', selectedImage.value)
  }
  formData.append('address_no', address_no.value)
  if (province_id.value) {
    formData.append('province_id', province_id.value)
  }
  if (amphure_id.value) {
    formData.append('amphure_id', amphure_id.value)
  }
  if (district_id.value) {
    formData.append('district_id', district_id.value)
  }
  if (zipcode.value) {
    formData.append('zipcode', zipcode.value)
  }
  formData.append('status', status.value)
  formData.append('sex', sex.value)

  const formDataObject = formDataToObject(formData)
  console.log(JSON.stringify(formDataObject))

  errorAlert.value = false
  try {
    stateLoadding.value = true
    let rs = ''
    // แก้ไข
    rs = await dataApi.updateUserEmployee(userId.value, formData)
    console.log(rs.data)
    // More Function
    stateLoadding.value = false
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: rs.data.message
    }
    resetField()
    await router.push({ path: '/access-control/user-employee' })
  } catch (error) {
    loadingBtn.value = false
    const ErrorsFirstKey = Object.keys(error.response.data.data)[0]
    const ErrorfirstArray = error.response.data.data[ErrorsFirstKey][0]
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: ErrorfirstArray
    }
    console.log(error)
  }
  loadingBtn.value = false
}

const resetField = function () {
  ;(sex.value = null), (status.value = null), (email.value = '')
  password.value = ''
  first_name.value = ''
  last_name.value = ''
  nick_name.value = ''
  phone_no.value = ''

  title_name.value = ''
  selectedImage.value = ''
  selectedImageUrl.value = ''
  address_no.value = ''
}

// ************  #END [INSERT]  ************

///********* Delete **********/
const conFirmation = ref(null)
const confirmDelete = (obj) => {
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: obj.message,
    accept: async () => {
      try {
        let result = await dataApi.deleteUserEmployee(obj.id)
        // console.log(result);
        alertToast.value = {
          severity: 'success',
          summary: 'ทำรายการสำเร็จ',
          detail: result.data.message
        }

        resetField()
        await router.push({ path: '/access-control/user-employee' })
      } catch (error) {
        console.log(error)
      }
    }
  }
  if (conFirmation.value) {
    conFirmation.value.openDialog(proCessConfirm)
  }
}
///********* End Delete **********/

// ******* [[ BREDCUM ITEM ]]
const breadcrumbItems = ref([
  { label: 'บุคลากร', to: '/access-control/user-employee' },
  { label: 'แก้ไข', to: `/access-control/user-employee/edit/${route.params.id}` }
])
</script>

<style>
img {
  max-width: 100%;
  height: 100%;
}
</style>
