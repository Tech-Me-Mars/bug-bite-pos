<template>
  <div class="card rounded-2">
    <div class="card-body py-3">
      <div class="row mb-3">
        <!-- Counter -->
        <div class="col-md-3 flex flex-column justify-content-center">
          <!-- <h6 class="fw-semibold text-center">วันที่ซื้อ</h6> -->
          <label class="fw-semibold text-center" for="">วันที่ซื้อ</label>
          <div class="form-group">
            <datepicker placeholder="Choose Start Date" class="picker cal-icon" :editable="true" :clearable="false" />
          </div>
        </div>
        <div class="col-md-3 flex-column justify-content-center">
          <!-- <h6 class="fw-semibold text-center">เลขที่ใบเสร็จ</h6> -->
          <div class="text-center"><label class="fw-semibold " for="">เลขที่ใบเสร็จ</label></div>
          <b-form-input type="text" class="form-control"></b-form-input>
        </div>
        <div class="col-md-3 flex-column justify-content-center">
          <!-- <h6 class="fw-semibold text-center">เบอร์โทรศัพท์ที่ลงทะเบียน</h6> -->
          <div class="text-center"><label class="fw-semibold " for="">เบอร์โทรศัพท์ที่ลงทะเบียน</label></div>
          <MaskedInput v-model="phone" class="form-control" :mask="'(999) 999-9999'" />
        </div>
        <div class="col-lg-3 col-sm-6 col-12 flex align-items-end">
          <Button label="ค้นหา" class="w-full" icon="pi pi-search"></Button>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-0">
    <div class="card-body">
      <h4 class="card-title">รายการใบเสร็จ</h4>
      <div class="table-responsive dataview datatableIndex">
        <DataTable v-model:filters="filters" class="p-datatable-sm" :value="resDataPayment" dataKey="id"
          filterDisplay="menu" ref="dt"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]" currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
          :globalFilterFields="[
            'method_name',
            'description',
          ]">
          <template #empty> No Paymentmethods found. </template>

          <Column header="รายการที่" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.method_name }}</template>
          </Column>
          <Column header="เลขที่ใบเสร็จ" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.method_name }}</template>
          </Column>
          <Column header="ชื่อลูกค้า" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.method_name }}</template>
          </Column>
          <Column header="จำนวนเงิน" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">
              {{ data.method_name }}</template>
          </Column>
          <Column header="จัดการ" field="method_name" sortable style="min-width: 8rem">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #body="{ data }">

              <Button label="ใบเสร็จแบบย่อ" class="mx-1" severity="primary" />
              <Button label="ใบเสร็จแบบเต็มรูปแบบ" class="mx-1" severity="primary" />
            </template>
          </Column>





        </DataTable>
      </div>
    </div>
  </div>
</template>
 
 
<script setup>
import { ref } from 'vue'
import MaskedInput from '@/components/gobal/MaskedInput.vue'

const phone = ref()
const column = ref([
  {
    title: 'รายการที่',
    dataIndex: 'col1',
    key: 'col1',
    sorter: {
      compare: (a, b) => {
        a = a.col1.toLowerCase()
        b = b.col1.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'เลขที่ใบเสร็จ',
    dataIndex: 'col2',
    key: 'col2',
    sorter: {
      compare: (a, b) => {
        a = a.col2.toLowerCase()
        b = b.col2.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'ชื่อลูกค้า',
    dataIndex: 'col3',
    key: 'col3',
    sorter: {
      compare: (a, b) => {
        a = a.col3.toLowerCase()
        b = b.col3.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'จำนวนเงิน',
    dataIndex: 'col4',
    key: 'col4',
    sorter: {
      compare: (a, b) => {
        a = a.col4.toLowerCase()
        b = b.col4.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'จัดการ',
    dataIndex: 'col5',
    key: 'col5',
    sorter: {
      compare: (a, b) => {
        a = a.col5.toLowerCase()
        b = b.col5.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  }
])

const datas = ref([
  {
    co1: 1,
    co2: '1',
    co3: 'IT0001',
    co4: 'product2.jpg',
    co5: 'Orange',
    co6: 'N/D',
    co7: 'Fruits',
    co8: '12-12-2022'
  },
  {
    co1: 1,
    co2: '1',
    co3: 'IT0001',
    co4: 'product2.jpg',
    co5: 'Orange',
    co6: 'N/D',
    co7: 'Fruits',
    co8: '12-12-2022'
  },
  {
    co1: 1,
    co2: '1',
    co3: 'IT0001',
    co4: 'product2.jpg',
    co5: 'Orange',
    co6: 'N/D',
    co7: 'Fruits',
    co8: '12-12-2022'
  },
  {
    co1: 1,
    co2: '1',
    co3: 'IT0001',
    co4: 'product2.jpg',
    co5: 'Orange',
    co6: 'N/D',
    co7: 'Fruits',
    co8: '12-12-2022'
  },
  {
    co1: 1,
    co2: '1',
    co3: 'IT0001',
    co4: 'product2.jpg',
    co5: 'Orange',
    co6: 'N/D',
    co7: 'Fruits',
    co8: '12-12-2022'
  }
])
</script>