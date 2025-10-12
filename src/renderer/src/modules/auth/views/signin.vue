<template>
  <div class="account-page">
    <!-- Main Wrapper -->
    <div class="main-wrapper">
      <div class="account-content">
        <div class="login-wrapper">
          <div class="login-content">
            <div class="login-userset">
              <div class="login-logo logo-normal">
                <img src="@/assets/img/logo/LOGO_MIX_STATION.png" style="width: 8rem;height: 7rem;" alt="img" />
              </div>
              <router-link to="/index" class="login-logo logo-white">
                <img src="@/assets/img/logo-white.png" alt="" />
              </router-link>
              <div class="login-userheading">
                <h3>Sign In</h3>
                <h4>Please login to your account</h4>
              </div>
              <Form class="login" Form @submit="submitLogin">
                <div class="form-login">
                  <label>Email</label>
                  <div class="form-addons">
                    <Field name="email" type="text" v-model="email" class="form-control"
                      :class="{ 'is-invalid': errors.email }" />

                    <div class="invalid-feedback">{{ errors.email }}</div>
                    <div class="emailshow text-danger" id="email"></div>
                    <img src="@/assets/img/icons/mail.svg" alt="img" />
                  </div>
                </div>
                <div class="form-login">
                  <label>Password</label>
                  <div class="pass-group">
                    <Field name="password" type="password" v-model="password" class="form-control pass-input"
                      :class="{ 'is-invalid': errors.password }" />
                    <span @click="toggleShow" class="fas toggle-password"></span>
                    <div class="invalid-feedback">{{ errors.password }}</div>
                    <div class="emailshow text-danger" id="password"></div>
                  </div>
                </div>
                <!-- <div class="form-login">
                  <div class="alreadyuser">
                    <h4>
                      <router-link to="forgetpassword" class="hover-a"
                        >Forgot Password?</router-link
                      >
                    </h4>
                  </div>
                </div> -->
                <div class="form-login">
                  <button type="submit" :disabled="loadingBtn" class="btn btn-login" to="/main/dashboard">Log In</button>
                </div>
              </Form>
              <!-- <div class="signinform text-center">
                <h4>
                  Don’t have an account?
                  <router-link to="signup" class="hover-a">Sign Up</router-link>
                </h4>
              </div> -->
              <!-- <div class="form-setlogin">
                <h4>Or sign up with</h4>
              </div> -->
              <!-- <div class="form-sociallink">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <img src="@/assets/img/icons/google.png" class="me-2" alt="google" />
                      Sign Up using Google
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <img src="@/assets/img/icons/facebook.png" class="me-2" alt="google" />
                      Sign Up using Facebook
                    </a>
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
          <div class="login-img">
            <img src="@/assets/img/login.jpg" alt="img" />
          </div>
        </div>
      </div>
    </div>
    <Alert :data="alertToast" />
  </div>
  <!-- /Main Wrapper -->

  <!-- <AppConfig simple /> -->
</template>
<script setup>
import { ref, computed } from 'vue'
import * as dataApi from '../api/data.js'
import { useToast } from 'primevue/usetoast'
import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRoute, useRouter } from 'vue-router'
import Alert from '@/components/gobal/Alert.vue'
import * as zod from 'zod'
const toast = useToast()

const errorAlert = ref(false)
const alertToast = ref({})
const router = useRouter()
//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    password: zod.string().nonempty(requireValue).default(''),
    email: zod.string().email({ message: 'ระบุของมูลในรูปแบบอีเมลล์' }).default('')
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: password } = useField('password')
const { value: email } = useField('email')

// const email = ref('');
// const password = ref('');

// const onSubmit =

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
const submitLogin = handleSubmit(async (values) => {
  loadingBtn.value = true;
  console.log(values)
  errorAlert.value = false
  try {
    const res = await dataApi.login({ email: email.value, password: password.value })
    console.log(res)
    // เก็บลง Local Storage
    let token = res.data.data.authorization.token
    localStorage.setItem('token', res.data.data.authorization.token)
    localStorage.setItem('avatar', res.data.data.user._employee.avatar_image)
    localStorage.setItem('user_id', res.data.data.user._employee.user_id)
    localStorage.setItem('branUser', res.data.data.user.active_pos_branch_id)
    localStorage.setItem(
      'fullname',
      `${res.data.data.user._employee.title_name} ${res.data.data.user._employee.first_name} ${res.data.data.user._employee.last_name}`
    )
    localStorage.setItem('empdata', res.data.data.user._employee)

    if (res.data.data.user_position.pos) {
      localStorage.setItem(
        'position_code',
        res.data.data.user_position.pos.position_code
          ? res.data.data.user_position.pos.position_code
          : ''
      )
      localStorage.setItem(
        'position_name',
        res.data.data.user_position.pos.position_name
          ? res.data.data.user_position.pos.position_name
          : ''
      )
      if (res.data.data.user_position.pos.can_approved == 1) {
        localStorage.setItem('can_approved', true)
      } else {
        localStorage.setItem('can_approved', false)
      }
    }
    // localStorage.setItem('userId',res.data.data.user.id)
    // localStorage.setItem('userName',res.data.data.user.name)
    // localStorage.setItem('userTitle',res.data.data.user._role.title)

    // decode

    // alertToast.value = {
    //   severity: 'success',
    //   summary: 'ทำรายการสำเร็จ',
    //   detail: res.data.message
    // }
    // setTimeout(() => {
    //   console.log('หน่วงเวลา')
    //   router.push({ path: '/main/dashboard' })
    // }, 1500)
    await router.push({ path: '/main/dashboard' })

  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
    // error.response.data.message
  }
  loadingBtn.value = false;
})
</script>
