<style scope>
a-select.ant-select-focused .ant-select-selector {
  border-color: orange;
}
</style>
<template>
  <div class="row" style="display: flex">
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="dash-count" style="background: #c01758">
        <div class="dash-counts">
          <h4>100</h4>
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
          <h4>100</h4>
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
          <h4>100</h4>
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
          <h4>100</h4>
          <h5>รายการเคลม</h5>
        </div>
        <div class="dash-imgs">
          <vue-feather type="corner-right-up"></vue-feather>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-body py-3">
      <div class="page-header">
        <div class="page-title">
          <h4>สร้างรายการ</h4>
        </div>
        <div class="page-btn">
          <button class="btn btn-added bg-success">
            <img src="@/assets/img/icons/plus.svg" class="me-2" alt="img" />เรียกใช้แบบร่าง
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="card mt-1 mb-2">
    <div class="card-body py-3">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="form-group">
            <label>ชื่อผู้ขอสร้างรายการ</label>
            <!-- <datepicker placeholder="เลือกชื่อผู้ขอสร้างรายการ" class="picker cal-icon" :editable="true" :clearable="true" /> -->
            <div>
              <a-select
                v-model:value="selectedCreator"
                show-search
                placeholder="ชื่อผู้ขอสร้างรายการ"
                style="width: 100%"
                class="rounded-5"
                :options="optionsCreator"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="form-group">
            <label>วันที่สร้าง</label>
            <datepicker
              placeholder="เลือกวันที่สร้าง"
              class="picker cal-icon"
              :editable="true"
              :clearable="false"
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="form-group">
            <label>วันที่ต้องการรับของ</label>
            <datepicker
              placeholder="เลือกวันที่ต้องการรับของ"
              class="picker cal-icon"
              :editable="true"
              :clearable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3" style="overflow-x: scroll">
    <table class="table table-borderless table-responsive">
      <thead>
        <tr class="">
          <th></th>
          <th class="px-4 py-2" style="min-width: 14rem">สินค้า/บริการ</th>
          <th class="px-4 py-2" style="min-width: 10rem">บัญชี</th>
          <th class="px-4 py-2">วันหมดอายุ</th>
          <th class="px-4 py-2">คุณลักษณะสินค้า</th>
          <th class="px-4 py-2">คำอธิบาย</th>
          <th class="px-4 py-2">จำนวน</th>
          <th class="px-4 py-2">ราคา/หน่วย</th>
          <th class="px-4 py-2">หน่วยนับ</th>
          <th class="px-4 py-2">ส่วนลด/หน่วย</th>
          <th class="px-4 py-2">ภาษี</th>
          <th class="px-4 py-2">มูลค่าก่อนภาษี</th>
          <th class="px-4 py-2">หัก ณ ที่จ่าย</th>
        </tr>
      </thead>
      <tbody class="table-responsive">
        <tr v-for="(item, index) in fields" :key="item.key">
          <td class="w-2rem py-3">{{ index + 1 }}</td>
          <td class="">
            <div class="dropdown">
              <select
                class="form-select"
                v-model="item.value.supplier_product_id"
                @change="selectProductChange(index, item.value.supplier_product_id)"
              >
                <option value="" disabled>รายการสินค้าสินค้า</option>
              </select>
            </div>
            <div class="text-end mt-1">
              <small class="text-danger">{{
                errors[`supplierProduct[${index}].supplier_product_id`]
              }}</small>
            </div>
          </td>
          <td class="">
            <div class="dropdown">
              <select class="form-select" v-model="item.value.accouteid">
                <option value="1">รหัสบัญชี01</option>
                <option value="2">รหัสบัญชี01</option>
              </select>
            </div>
          </td>
          <td class="">
            <input
              type="text"
              class="form-control"
              v-model="item.value.expired_date"
              placeholder="วันหมดอายุ"
              aria-label="วันหมดอายุ"
            />

            <div class="text-center mt-1">
              <small class="text-danger">{{
                errors[`supplierproduct[${index}].expired_date`]
              }}</small>
            </div>
            <div class="text-end mt-1">
              <!-- <small class="text-danger">{{ errors[`supplierproduct[${index}].unit_price`] }}</small> -->
            </div>
          </td>
          <td>
            <div class="dropdown">
              <select class="form-select" v-model="item.value.attribute">
                <option value="1">คุณลักษณะสินค้า1</option>
                <option value="2">คุณลักษณะสินค้า2</option>
              </select>
            </div>
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="item.value.description"
              placeholder="คำอธิบาย"
              aria-label="คำอธิบาย"
            />
          </td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model="item.value.qty"
              placeholder="จำนวน"
              aria-label="จำนวน"
            />
          </td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model="item.value.price"
              placeholder="ราคา/หน่วย"
              aria-label="ราคา"
            />
          </td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model="item.value.unit"
              placeholder="หน่วยนับ"
              aria-label="หน่วยนับ"
            />
          </td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model="item.value.discount"
              placeholder="ส่วนลด"
              aria-label="ส่วนลด/หน่วย"
            />
          </td>
          <td>
            <input
              type="number"
              class="form-control"
              v-model="item.value.valuebeforetax"
              placeholder="มูลค่าก่อนภาษี"
              aria-label="ภาษี"
            />
          </td>
          <td>
            <div class="dropdown">
              <select class="form-select" v-model="item.value.tax">
                <option value="1">7%</option>
                <option value="2">10%</option>
              </select>
            </div>
          </td>
          <div class="dropdown">
            <select class="form-select" v-model="item.value.Withholding">
              <option value="1">หัก ณ ที่จ่าย1</option>
              <option value="2">หัก ณ ที่จ่าย1</option>
            </select>
          </div>
          <!-- Add similar Bootstrap 5 components and classes for the remaining table cells -->
          <!-- ... -->
          <td class="">
            <button class="btn btn-danger btn-sm" @click="remove(index)">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center align-items-center mt-3 mb-2">
      <button
        class="btn btn-success btn-sm"
        @click="
          push({
            supplier_product_id: '',
            unit_price: 0,
            unit: '',
            qty: 1,
            expired_date: null,
            sku_id: undefined
          })
        "
      >
        เพิ่มรายการ
      </button>
    </div>
  </div>

  <div class="row">
    <div class="col-12 d-flex justify-content-between">
      <button class="btn btn-danger">ยกเลิก</button>
      <div>
        <button class="btn btn-primary me-2">พิมพ์เอกสาร</button>
        <button class="btn btn-warning me-2">บันทึกร่าง</button>
        <button class="btn btn-success">ยืนยันเอกสาร</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import Amoutestatus from '@/components/gobal/Amoutestatus.vue'
import Modulestatus from '@/components/gobal/Modulestatus.vue'
import {
  useField,
  useForm,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFieldArray
} from 'vee-validate'

const selectedCreator = ref()
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const optionsCreator = ref([
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  },
  {
    value: 'tom',
    label: 'Tom'
  }
])

const optionscreater = ['Jj', 'Noah']
const { handleSubmit, errors } = useForm({
  initialValues: {
    supplierproduct: [
      {
        supplier_product_id: '',
        qty: 1,
        unit: '',
        unit_price: 0,
        expired_date: null,
        sku_id: undefined
      }
    ]
  }
  // validationSchema,
})

const { remove, push, fields } = useFieldArray('supplierproduct')
</script>