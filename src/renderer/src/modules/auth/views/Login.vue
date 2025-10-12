<template>
  <div style="background-color: rgba(239,239,239,1); min-height: 700px;"
    class="flex align-items-center justify-content-center">
    <div id="content" class="">
      <Card style="max-width: 450px;" :pt="{
        root: { class: 'bg-white border-round-xl px-5 py-3 shadow-2 hover:shadow-8' },
        title: { class: 'text-3xl pb-3', style: 'border-bottom: 2px solid #e9e9e9' },
      }">
        <template #title>ล็อกอิน</template>
        <template #content>

          <form @submit="onSubmit">
            <div class="grid">
              <div class="col-12">
                <div class="grid formgrid p-fluid bg">
                  <div class="field col-12">
                    <div
                      style="height: 120px; width: 120px; border-radius: 50%; background-color: rgb(219, 0, 0); position: relative"
                      class="overflow-hidden mx-auto">
                      <img src="/src/assets/image/logomixvalue.png"
                        style="height: 100%; width: 100%; object-fit: contain; ">
                    </div>
                  </div>
                  <div class="field mb-4 col-12 pt-2">
                    <div>
                      <label for="email" class="pb-3 font-semibold text-gray-600 w-full">ชื่อบัญชี</label>
                      <div class="w-full mt-3">
                        <InputText id="email" v-model="email" placeholder="ชื่อบัญชี" class="p-inputtext-sm" />
                      </div>
                    </div>
                    <div class="text-right mt-1">
                      <small class="text-red-600">{{ errors.email }}</small>
                    </div>
                  </div>

                  <div class="field mb-4 col-12 pt-2">
                    <div>
                      <label for="password" class="pb-3 font-semibold text-gray-600 w-full">รหัสผ่าน</label>
                      <div class="w-full mt-3">
                        <InputText type="password" id="password" v-model="password" placeholder="รหัสผ่าน"
                          class="p-inputtext-sm" />
                      </div>
                    </div>
                    <div class="text-right mt-1">
                      <small class="text-red-600">{{ errors.password }}</small>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="flex justify-content-end gap-3">
              <Button label="ล็อกอิน" icon="pi pi-lock-open"
                class="bg-red-500 text-white py-2 px-4 border-round-md border-none w-9rem" type="submit" />
            </div>
          </form>
        </template>
      </Card>

    </div>
  </div>
  <Alert :data="alertToast" />
</template>

<style scoped>
.p-card-title {
  font-size: 5rem;
  position: relative;
}

.p-card-title::before {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: red;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import * as dataApi from '../api/data.js';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';

// Toast
import Alert from "@/components/gobal/Alert.vue";

//! /////// [validation] /////////
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
const requireValue = 'กรุณาระบุข้อมูล'

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty(requireValue).default(''),
    password: zod.string().nonempty(requireValue).default(''),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(values => {
  handleLogin(values);
});

//! /////// #END[validation] /////////

// ************  Login  ************
const alertToastStatus = ref(false);
const alertToast = ref({});

const stateLoadding = ref(false);

const handleLogin = async (value) => {
  alertToastStatus.value = false;

  try {
    stateLoadding.value = true;

    const rs = await dataApi.login(value);

    console.log(rs.data);

    stateLoadding.value = false;

    if (rs.data.status == true) {
      alertToastStatus.value = true;
      alertToast.value = { severity: 'success', summary: 'ทำรายการสำเร็จ', detail: rs.data.message };
    } else {
      alertToastStatus.value = true;
      alertToast.value = { severity: 'error', summary: 'ทำรายการไม่สำเร็จสำเร็จ', detail: rs.data.message };
    }
  } catch (error) {
    console.log(error)
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
};
// ************  #END [Login]  ************
</script>

