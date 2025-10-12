<template>
  <div class="content " style="min-height: 50rem;">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader :title="`ใบเสร็จที่ ${route.params.id} แบบย่อ`" title1="" />
    </div>



    <div class="flex justify-content-center align-items-center  p-5 ">
      <div class="card shadow-6 border-round-xl" style="width: 30rem;">
        <div class="card-body mx-4">
          <div class="container">
            <p class="text-center" style="font-size: 25px;">ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ</p>
            <div class="row">
              <ul class="list-unstyled">
                <li class="text-black" v-if="resReceiptData.customer">{{ resReceiptData.customer.title_name }} {{
                  resReceiptData.customer.first_name }} {{ resReceiptData.customer.last_name }}</li>
                <li class="text-muted mt-1"><span class="text-black">เลขที่ใบเสร็จ</span> #{{ route.params.id }}</li>
                <li class="text-black mt-1">{{ resReceiptData.sale_date }}</li>
              </ul>
              <hr>
            </div>
            <!-- resReceiptData -->
            <div v-if="resReceiptData.sale_details">
              <div class="row" v-for="(item, index) in resReceiptData.sale_details" :key="index">
                <div class="col-xl-10 ">
                  <!-- v-if="item.supplier_product_name"  -->
                  <span class="text-wrap">#{{ index + 1 }} {{ item.supplier_product_name
                  }} ({{ formatCurrency(item.unit_price) }}) x {{ formatNumber(item.quantity) }}</span>

                </div>
                <div class="col-xl-2">
                  <p class="float-end">{{ formatCurrency(item.supplier_product_price) }}
                  </p>
                </div>
                <hr>
              </div>
            </div>

            <div class="row text-black">
              <hr style="border: 2px solid black;">
              <div class="col-xl-12" v-if="resReceiptData.total_amount">
                <p class="float-end fw-bold">จำนวนเงินรวมทั้งหมด: {{ formatCurrency(resReceiptData.total_amount) }}
                </p>
              </div>
              <hr style="border: 2px solid black;">
            </div>
            <div class="text-center" style="margin-top: 90px;">
              <!-- <a><u class="text-info">View in browser</u></a> -->
              <p>@MIXVALUE POS RECEIP </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
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
// [ VUE ROUTER ]
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const errorAlert = ref(false)
const alertToast = ref({})

onMounted(() => {
  loadDataReceipt();
})
const resReceiptData = ref({ sale_details: null, total_amount: null, customer: null, employee: null, })
const loadDataReceipt = async () => {
  const res = await dataApi.getReceiptById(route.params.id)
  resReceiptData.value = res.data.data;
};


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
};

const breadcrumbItems = [
  { label: 'ใบเสร็จทั้งหมด', to: '/receipt-preview' },
  { label: 'ใบเสร็จแบบย่อ', to: `/receipt-preview/receipt-mini/${route.params.id}` }
]
</script>