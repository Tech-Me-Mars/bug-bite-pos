<template>
  <div class="content">
    <pageheader :title="title" :title1="title1" />
    <!-- /product list -->
    <div class="card">
      <div class="card-body">
        <Form @submit="onSubmit">
          <div class="profile-set">
            <div class="profile-head"></div>
            <div class="profile-top">
              <div class="profile-content shadow-2xl">

                <div class="profile-contentname">
                  <h2 v-if="fullname">{{ fullname }}</h2>
                  <h4 v-if="position_code">ตำแหน่ง {{ position_code }} ({{ position_name }})</h4>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label class=" font-semibold text-gray-600 col-12"> รูปโปรไฟล์</label>
                <div class="flex">
                  <Avatar :image="avatar_image" class="mr-2 " :class="{ 'bg-transparent': avatar_image }" size="xlarge"
                    shape="circle" />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <label>ชื่อ</label>
                <input type="text" v-model="fullname" placeholder="" readonly />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <label>Email</label>
                <input type="text" v-model="email" readonly placeholder="" />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <label>Password</label>
                <div class="pass-group">
                  <input v-if="showPassword" type="text" class="pass-input" v-model="password" />
                  <input v-else type="password" class="pass-input" v-model="password" />
                  <span class="fas toggle-password" @click="toggleShow" :class="{
                    'fa-eye': showPassword,
                    'fa-eye-slash': !showPassword,
                  }"></span>
                </div>
                <small class="text-red-600">{{ errors.password }}</small>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <label>Password confirm</label>
                <div class="pass-group">
                  <input  type="text" class="pass-input" v-model="password_confirm" />

                </div>
                <small class="text-red-600">{{ errors.password_confirm }}</small>
              </div>
            </div>
            <div class="col-12">
              <Button href="javascript:void(0);" type="submit" class="btn btn-submit me-2">Submit</Button>
              <!-- <a href="javascript:void(0);" class="btn btn-cancel">Cancel</a> -->
            </div>
          </div>
        </Form>
      </div>
    </div>
    <!-- /product list -->
  </div>

  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" />
</template>

<script setup>
import pageheader from "@/components/pageheader/pageheader.vue"
import { ref, computed, onMounted } from 'vue';
// [ valadation ]
import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
// [COMPONENT ]
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]

import * as dataApi from './api/data.js'

const errorAlert = ref(false)
const alertToast = ref({})

const loadingBtn = ref(false)

const resMeData = ref()
const loadMeData = async () => {
  loadingBtn.value = true;
  errorAlert.value = false
  try {
    const res = await dataApi.getMeData()
    resMeData.value = res.data.data;
    email.value = resMeData.value.email
    fullname.value = `${resMeData.value._employee.title_name} ${resMeData.value._employee.first_name} ${resMeData.value._employee.last_name} `
    avatar_image.value = resMeData.value._employee.avatar_image
    position_code.value = resMeData.value.position_code
    position_name.value = resMeData.value.position_name
  } catch (error) {

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

onMounted(() => {
  loadMeData()
})


const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    password: zod.string().nonempty(requireValue).min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    password_confirm: zod.string().refine((data) => data === password.value, {
    message: "รหัสผ่านยืนยันไม่ตรงกับรหัสผ่าน"
  })
  })
)
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField('email')
const { value: fullname } = useField('fullname')
const { value: avatar_image } = useField('avatar_image')
const { value: position_code } = useField('position_code')
const { value: position_name } = useField('position_name')
const { value: password } = useField('password')
const { value: password_confirm } = useField('password_confirm')


const onSubmit = handleSubmit((values) => {
  updateMeData(values);
});
const updateMeData = async (values) => {
  loadingBtn.value = true;
  errorAlert.value = false
  const payload = {
    password: password.value
  }
  try {
    const res = await dataApi.updateMeData(payload)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message,
    }
    handleReset()
    loadMeData();
  } catch (error) {

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
};


const showPassword = ref(false)
const buttonLabel = computed(() => {
  return showPassword.value ? "Hide" : "Show";
});

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

</script>