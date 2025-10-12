<template>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-widget" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/dashboard/DiaryMoney.png" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2" :delay="3"
            :endAmount="resReportData.summary_today" :duration="5" :autoinit="true" />
        </h5>
        <h6>ยอดขายรายวัน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-widget dash1" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/dashboard/couteSale7day.png" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          <vue3-autocounter class="counter" ref="counter" :startAmount="0"  :delay="3"
            :endAmount="resReportData.summary_lasted_7_day" :duration="5" :autoinit="true" />
          รายการ
        </h5>
        <h6>ยอดขายล่าสุด 7 วัน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-widget dash2" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/dashboard/sale1mont.png" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" :decimals="2" :delay="3"
            :endAmount="resReportData.summary_lasted_months" :duration="5" :autoinit="true" />
        </h5>
        <h6>ยอดขายล่าสุด1เดือน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-widget dash3" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/dashboard/summarysale.png" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" :decimals="2" :delay="3"
            :endAmount="resReportData?.summary_all" :duration="5" :autoinit="true" />
        </h5>
        <h6>ยอดขายรวม</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count">
      <div class="dash-counts">
        <h4>{{ resReportData.count_customer }}</h4>
        <h5>จำนวนลูกค้าทั้งหมด</h5>
      </div>
      <div class="dash-imgs">
        <vue-feather type="user"></vue-feather>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count das1">
      <div class="dash-counts">
        <h4>{{ resReportData.count_warehouse }}</h4>
        <h5>คลังสินค้า</h5>
      </div>
      <div class="dash-imgs">
        <vue-feather type="database"></vue-feather>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count das2">
      <div class="dash-counts">
        <h4>{{ resReportData.summary_reciept_today }}</h4>
        <h5>ยอดใบเสร็จรายวัน</h5>
      </div>
      <div class="dash-imgs">
        <vue-feather type="clipboard"></vue-feather>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count das3">
      <div class="dash-counts">
        <h4>{{ resReportData.summary_count_lasted_7_days }}</h4>
        <h5>ยอดใบเสร็จรวม 7 วัน</h5>
      </div>
      <div class="dash-imgs">
        <vue-feather type="file"></vue-feather>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex">
    <div class="dash-count" style="background: #c01758">
      <div class="dash-counts">
        <h4>{{ resReportData.summary_minimum_stock }}</h4>
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
        <h4>{{ resReportData.summary_dead_stock }}</h4>
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
        <h4>{{ resReportData.summary_expired_stock }}</h4>
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
        <h4>{{ resReportData.summary_claim }}</h4>
        <h5>รายการเคลม</h5>
      </div>
      <div class="dash-imgs">
        <vue-feather type="repeat"></vue-feather>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, unref, reactive, onMounted } from 'vue'
import * as dataApi from './api/data.js'

const resReportData = ref({
  summary_today: 0,
  summary_lasted_7_day: 0,
  summary_lasted_months: 0,
  summary_all: 0,
  count_customer: 0,
  count_warehouse: 0,
  summary_reciept_today: 0,
  summary_minimum_stock: 0,
  summary_dead_stock: 0,
  summary_expired_stock: 0,
  summary_claim: 0
})

const strToDecimals = async (num) => {
  if (num == null || num == undefined) {
    return 0;
  }
  const result = await parseFloat(num.replace(/,/g, ""));
  console.log(result)
  return result;
}

const formatCurrency = (value) => {
  // ตรวจสอบว่ามีค่าเป็น string หรือไม่ และลบเครื่องหมาย , ออก
  if (typeof value === 'string') {
    value = value.replace(/,/g, "");
  }

  // ตรวจสอบค่า null หรือ undefined และกำหนดให้เป็น 0.00
  if (value == null || value == undefined) {
    return 0.00;
  }

  // แปลงค่าเป็นเลขทศนิยมและคืนค่า
  return parseFloat(value);
}

const formatNumber = (value) => {
  if (typeof value === 'string') {
    value = value.replace(",", "");
  }
  if (value == null || value == undefined) {
    return value = 0;
  }
  value = parseInt(value)
  return value.toLocaleString({ style: 'currency', currency: 'THB' })
}


const loadData = async () => {
  const res = await dataApi.dataDashboard()
  console.log(res.data.data)
  resReportData.value = res.data.data
  resReportData.value.summary_today = await formatCurrency(resReportData.value.summary_today)
  resReportData.value.summary_lasted_7_day = await formatCurrency(resReportData.value.summary_lasted_7_day)
  resReportData.value.summary_lasted_months = await formatCurrency(resReportData.value.summary_lasted_months)
  resReportData.value.summary_all = await formatCurrency(resReportData.value.summary_all)
}
onMounted(() => {
  loadData()
})
</script>