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
            <div class="field mb-4 col-6">
              <label for="position" class="font-bold">ตำแหน่ง</label>
              <Dropdown
                filter
                autoFilterFocus
                v-model="position_id"
                :options="resPosition"
                :optionLabel="(option) => option.position_code + ' ' + option.position_name"
                optionValue="id"
                placeholder="ตำแหน่ง"
                class="w-full"
                @change="positionChange(position_id)"
              />
              <small class="text-red-600">{{ errors.position_id }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="phone_no" class="font-bold">อีเมลล์</label>
              <InputText v-model="email" placeholder="กรอกอีเมลล์" />
              <small class="text-red-600">{{ errors.email }}</small>
            </div>
            <div class="field mb-4 col-6">
              <label for="phone_no" class="font-bold">รหัสผ่าน</label>
              <InputText v-model="password" toggleMask type="password" placeholder="รหัสผ่าน" />
              <small class="text-red-600">{{ errors.password }}</small>
            </div>
            <div class="surface-100 mb-3 col-12" style="height: 2px"></div>
            <div class="field mb-0 col-12 md:col-6">
              <div class="flex flex-row">
                <div>
                  <div class="flex flex-column">
                    <label for="avatar" class="font-bold">รูปภาพผู้ใช้</label>
                    <div class="flex">
                      <Avatar
                        :image="
                          selectedImageUrl !== null && selectedImageUrl !== ''
                            ? selectedImageUrl
                            : '/image/image404.jpg'
                        "
                        class="mr-2 bg-transparent"
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
                    <!-- <div class="flex">
                  <Avatar :image="selectedImageUrl !== null && selectedImageUrl !== ''
                    ? selectedImageUrl
                    : '@/public/image/image404.jpg'
                    " class="mr-2 " :class="{ 'bg-transparent': selectedImageUrl }" size="xlarge" shape="circle" />
                  <div class="image-upload  ">
                    <input class="" type="file" accept="image/*" :maxFileSize="1000000" @change="onUpload"
                      label="อัพโหลดรูปภาพ" />
                    <div class="image-uploads">
                      <img src="../../../assets/img/icons/upload.svg" alt="img" />
                      <h4>เลือกหรือลากภาพไฟล์ลงไปเพื่ออัพโหลดไฟล์...</h4>
                    </div>
                  </div>
                </div> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- LINE SHADOW address_no-->
            <div class="surface-100 mb-3 col-12" style="height: 2px"></div>

            <div class="field mb-4 col-12">
              <label for="email" class="font-bold">รายละเอียดที่อยู่</label>
              <Textarea v-model="address_no" autoResize rows="5" cols="30" />
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
              {{ errors.status }}
              <div class="surface-100 my-3 col-12" style="height: 2px"></div>
            </div>
          </div>
          <div class="">
            <Button
              label="บันทึก"
              :loading="loadingBtn"
              type="submit"
              severity="primary"
              class="w-8rem"
            />
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
import { ref, onMounted } from 'vue'

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
const one = ref(1)
const zero = ref(0)
const router = useRouter()

onMounted(() => {
  loadData()
  loadProvinces()
})

const loadingBtn = ref(false)

//! /////// [validation] /////////
import { useField, useForm, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
const requireValue = 'กรุณาระบุข้อมูล'
const male = ref(1)
const female = ref(2)

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty(requireValue)
      .email({ message: 'ต้องเป็นรูปแบบอีเมล์เท่านั้น' })
      .default(''),
    password: zod.string().nonempty(requireValue).min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
    first_name: zod.string().nonempty(requireValue).default(''),
    last_name: zod.string().nonempty(requireValue).default(''),
    phone_no: zod.string().nonempty(requireValue).default(''),
    position_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    title_name: zod
      .string({
        required_error: requireValue,
        invalid_type_error: requireValue
      })
      .nonempty(requireValue)
      .default(''),
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
const { value: position_id } = useField('position_id')
const { value: position_code } = useField('position_code')
const { value: position_name } = useField('position_name')
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
// ******* [[ BREDCUM ITEM ]]
const breadcrumbItems = ref([
  { label: 'บุคลากร', to: '/access-control/user-employee' },
  { label: 'เพิ่ม', to: '/access-control/user-employee/create' }
])
const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])
// ********** [[ ที่อยู่]] *********************

const resProvincesOption = ref()
const resAmphuresOption = ref()
const resDistrictsOption = ref()

const loadProvinces = async () => {
  const rs = await addressDataServices.getAddressProvinces()
  resProvincesOption.value = rs.data.data
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
//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
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

const positionChange = async (param) => {
  // position_id
  const selectedObj = resPosition.value.find((obj) => obj.id == param)
  position_code.value = selectedObj.position_code
  position_name.value = selectedObj.position_name
  console.log(position_code.value)
  console.log(position_name.value)
}

const onSubmit = handleSubmit((values) => {
  // console.log(values)
  saveUserEmployee()
})

//! /////// #END[validation] /////////

const resUserEmployee = ref()
const resPosition = ref()
// ************  GET[Data]    ************
const loadData = async () => {
  stateLoadding.value = true
  // โหลดตำแหน่ง
  const fetPosition = await dataApi.getPosition()
  resPosition.value = fetPosition.data.data
  console.log(fetPosition.value)
  stateLoadding.value = false
}

// ************  GET #END[Data]   ************

// ************  INSERT & Update  ************
const handelEditeStatus = ref(false)
// ************  [[ ALERT VARIABLE]]***********
const errorAlert = ref(false)
const alertToast = ref({})

const stateLoadding = ref(false)

// const imageToBase64 = async (file) => {
//     return new Promise((resolve, reject) => {
//         if (file instanceof Blob || file instanceof File) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 resolve(reader.result);
//             };
//             reader.onerror = (error) => {
//                 reject(error);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             reject(new Error('Invalid file type. Expected Blob or File.'));
//         }
//     });
// };
const saveUserEmployee = async () => {
  // return console.log(base64Image);
  // ลบทุกตัวอักษรที่ไม่ใช่ตัวเลข เบอร์โทร
  loadingBtn.value = true
  phone_no.value = phone_no.value.replace(/\D/g, '')
  status.value = parseInt(status.value)
  sex.value = parseInt(sex.value)
  // **** รวมตัวแปรลง OBJECT*****

  //     console.log("Email:", email.value);
  // console.log("Password:", password.value);
  // console.log("First Name:", first_name.value);
  // console.log("Last Name:", last_name.value);
  // console.log("Nick Name:", nick_name.value);
  // console.log("Phone No:", phone_no.value);
  // console.log("Position ID:", position_id.value);
  // console.log("Title Name:", title_name.value);
  // console.log("Avatar Image (base64):", base64Image);
  // console.log("Address No:", address_no.value);
  // console.log("Province ID:", province_id.value);
  // console.log("Amphure ID:", amphure_id.value);
  // console.log("District ID:", district_id.value);
  // console.log("Zipcode:", zipcode.value);
  // console.log("Status:", status.value);

  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('password', password.value)
  formData.append('first_name', first_name.value)
  formData.append('last_name', last_name.value)
  formData.append('nick_name', nick_name.value)
  formData.append('phone_no', phone_no.value)
  formData.append('position_id', position_id.value)
  formData.append('title_name', title_name.value)
  formData.append('avatar_image', selectedImage.value)
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

  console.log(formData)

  errorAlert.value = false
  try {
    stateLoadding.value = true

    let rs = ''
    // แก้ไข
    rs = await dataApi.saveUserEmployee(formData)
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
    // navigateTo({ path: "/manage-access-control/useremployee/" });

    //
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
    resetField()
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
  position_code.value = null
  position_name.value = null
  position_id.value = null
  title_name.value = ''
  selectedImage.value = ''
  selectedImageUrl.value = ''
  address_no.value = ''
  province_id.value = null
  amphure_id.value = null
  district_id.value = null
  zipcode.value = null
}
</script>
