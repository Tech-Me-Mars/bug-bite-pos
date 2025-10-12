<style scope></style>
<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="ลูกค้า" title1="จัดการลูกค้า" />
      <div class="page-header">
        <div class="page-btn">
          <Button
            label="เพิ่มลูกค้า"
            size="small"
            icon="pi pi-plus"
            severity="pimary"
            class="mr-2 font-semibold border-round-md"
            @click="openNew()"
          />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <!-- top table -->
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a
                class="btn btn-filter"
                id="filter_search"
                @click="clearFilter()"
                :class="{ setclose: filter }"
              >
                <img src="@/assets/img/icons/filter.svg" alt="img" />
                <!-- @/assets/img/icons/filter.svg -->
                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
              <!-- <a class="btn btn-searchset"><img src="@/assets/img/icons/search-white.svg" alt="img" /></a> -->
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <!-- <input type="search" class="form-control form-control-sm" placeholder="Search..."
                    aria-controls="DataTables_Table_0" v-model="searchGobal" @input="eventGlobalSearch" /> -->
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      class="form-control"
                      v-model="filters['global'].value"
                      placeholder="ค้นหา..."
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"
                  ><img src="@/assets/img/icons/pdf.svg" alt="img"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="excel"
                  @click="exportCSV($event)"
                  ><img src="@/assets/img/icons/excel.svg" alt="img"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="print"
                  @click="printPage()"
                  ><img src="@/assets/img/icons/printer.svg" alt="img"
                /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- end top table -->

        <h4 class="card-title">ข้อมูลลูกค้า</h4>
        <div class="table-responsive">
          <DataTable
            v-model:filters="filters"
            v-model:selection="selectedCustomers"
            class="p-datatable-sm"
            :value="customers"
            :paginator="true"
            :rows="10"
            dataKey="id"
            filterDisplay="menu"
            ref="dt"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]"
            currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
            :globalFilterFields="[
              'name',
              'country.name',
              'representative.name',
              'balance',
              'status'
            ]"
            :pt="{
  paginator: {
    paginatorWrapper: { class: ' flex justify-content-end' },
    firstPageButton: { class: 'border-round-lg mr-1' },
    previousPageButton: { class: 'border-round-lg mr-1 ' },
    nextPageButton: { class: 'border-round-lg mr-1 ' },
    lastPageButton: { class: 'border-round-lg mr-1 ' },
    current: { class: 'border-round-lg text-orange-400' },
    pageButton: ({ props, state, context }) => ({
      class: context.active ? 'bg-orage-600 border-none border-round-lg mr-1' : 'bg-gray-600 border-none border-round-lg text-white mr-1'
    }),
  },
}"
          >
            <template #empty> No customers found. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" header="Name" sortable style="min-width: 14rem">
              <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                {{ data.name }}
              </template>
              <template #filter="{ filterModel }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by name"
                />
              </template>
            </Column>
            <Column
              header="Country"
              sortable
              sortField="country.name"
              filterField="country.name"
              style="min-width: 14rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                <div class="flex align-items-center gap-2">
                  <img
                    alt="flag"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag flag-${data.country.code}`"
                    style="width: 24px"
                  />
                  <span>{{ data.country.name }}</span>
                </div>
              </template>
              <template #filter="{ filterModel }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by country"
                />
              </template>
            </Column>
            <Column
              header="Agent"
              sortable
              sortField="representative.name"
              filterField="representative"
              :showFilterMatchModes="false"
              :filterMenuStyle="{ width: '14rem' }"
              style="min-width: 14rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                <div class="flex align-items-center gap-2">
                  <img
                    :alt="data.representative.name"
                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                    style="width: 32px"
                  />
                  <span>{{ data.representative.name }}</span>
                </div>
              </template>
              <template #filter="{ filterModel }">
                <MultiSelect
                  v-model="filterModel.value"
                  :options="representatives"
                  optionLabel="name"
                  placeholder="Any"
                  class="p-column-filter"
                >
                  <template #option="slotProps">
                    <div class="flex align-items-center gap-2">
                      <img
                        :alt="slotProps.option.name"
                        :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                        style="width: 32px"
                      />
                      <span>{{ slotProps.option.name }}</span>
                    </div>
                  </template>
                </MultiSelect>
              </template>
            </Column>
            <Column
              field="date"
              header="Date"
              sortable
              filterField="date"
              dataType="date"
              style="min-width: 10rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                {{ formatDate(data.date) }}
              </template>
              <template #filter="{ filterModel }">
                <Calendar
                  v-model="filterModel.value"
                  dateFormat="mm/dd/yy"
                  placeholder="mm/dd/yyyy"
                  mask="99/99/9999"
                />
              </template>
            </Column>
            <Column
              field="balance"
              header="Balance"
              sortable
              filterField="balance"
              dataType="numeric"
              style="min-width: 10rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                {{ formatCurrency(data.balance) }}
              </template>
              <template #filter="{ filterModel }">
                <InputNumber
                  v-model="filterModel.value"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </template>
            </Column>
            <Column
              header="Status"
              field="status"
              sortable
              :filterMenuStyle="{ width: '14rem' }"
              style="min-width: 12rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                <Tag :value="data.status" :severity="getSeverity(data.status)" />
              </template>
              <template #filter="{ filterModel }">
                <Dropdown
                  v-model="filterModel.value"
                  :options="statuses"
                  placeholder="Select One"
                  class="p-column-filter"
                  showClear
                >
                  <template #option="slotProps">
                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                  </template>
                </Dropdown>
              </template>
            </Column>
            <Column
              field="activity"
              header="Activity"
              sortable
              :showFilterMatchModes="false"
              style="min-width: 12rem"
            >
            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="{ data }">
                <ProgressBar
                  :value="data.activity"
                  :showValue="false"
                  style="height: 6px"
                ></ProgressBar>
              </template>
              <template #filter="{ filterModel }">
                <Slider v-model="filterModel.value" range class="m-3"></Slider>
                <div class="flex align-items-center justify-content-between px-2">
                  <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                  <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                </div>
              </template>
            </Column>
            <Column
              headerStyle="width: 5rem; text-align: center"
              bodyStyle="text-align: center; overflow: visible"
              style="min-width: 7rem"
            >
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="slotProps">
                <!-- <a class="me-3" @click="editModal = true">
                  <img src="@/assets/img/icons/edit.svg" alt="img" />
                </a> -->

                <!-- <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data)" /> -->
                <!-- <a class="me-3 confirm-text">
                  <img @click="confirmDelete()" src="@/assets/img/icons/delete.svg" alt="img" />
                </a> -->
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  style="color: black; background: transparent; border: none"
                />
                <Button
                  @click="confirmDelete(slotProps.data)"
                  type="button"
                  icon="pi pi-trash"
                  style="color: red; background: transparent; border: none"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="dialogInsert"
      maximizable
      :style="{ width: '600px' }"
      header="รายละเอียดสาขา"
      :modal="true"
      class="p-fluid"
    >
      <hr class="mb-3" />
      <form @submit="onSubmit">
        <div class="grid">
          <div class="col-12">
            <div>
              <label for="branch_name" class="pb-3 font-semibold text-gray-600 col-12"
                >ชื่อสาขา</label
              >
              <div class="w-full mt-2">
                <InputText id="branch_name" placeholder="ชื่อสาขา" class="p-inputtext" />
              </div>
            </div>
            <!-- <div class="text-right mt-1">
                <small class="text-red-600">{{ errors.branch_name }}</small>
              </div> -->
          </div>

          <div class="col-12">
            <div class="grid formgrid">
              <div class="field mb-4 col-12 pt-2">
                <div>
                  <label for="address" class="pb-3 font-semibold text-gray-600 col-12"
                    >ที่อยู่สาขา</label
                  >
                  <div class="w-full mt-2">
                    <Textarea
                      id="address"
                      row="10"
                      placeholder="ที่ตั้งของสาขา"
                      class="p-inputtext-sm w-full h-9rem"
                    />
                  </div>
                </div>
                <!-- <div class="text-right mt-1">
                    <small class="text-red-600">{{ errors.address }}</small>
                  </div> -->
              </div>
            </div>
          </div>
          <div class="col-12">
            <div>
              <label for="phone_number" class="pb-3 font-semibold text-gray-600 col-12"
                >หมายเลขโทรศัพท์</label
              >
              <div class="w-full mt-2">
                <InputMask
                  mask="(999) 999-9999"
                  id="phone_number"
                  v-model="phone_number"
                  placeholder="(099) 999-9999"
                  class="p-inputtext"
                />
              </div>
            </div>
            <!-- <div class="text-right mt-1">
                <small class="text-red-600">{{ errors.phone_number }}</small>
              </div> -->
          </div>
          <div class="col-12">
            <div>
              <label for="email" class="pb-3 font-semibold text-gray-600 col-12">อีเมลล์</label>
              <div class="w-full mt-2">
                <InputText id="email" v-model="email" placeholder="อีเมล์" class="p-inputtext" />
              </div>
            </div>
            <!-- <div class="text-right mt-1">
                <small class="text-red-600">{{ errors.email }}</small>
              </div> -->
          </div>
          <div class="col-12">
            <div>
              <label for="lat" class="pb-3 font-semibold text-gray-600 col-12">
                ละติจูด (lat)</label
              >
              <div class="w-full mt-2">
                <InputText id="lat" v-model="lat" placeholder="ละติจูด (lat)" class="p-inputtext" />
              </div>
            </div>
            <!-- <div class="text-right mt-1">
                <small class="text-red-600">{{ errors.lat }}</small>
              </div> -->
          </div>
          <div class="col-12">
            <div>
              <label for="long" class="pb-3 font-semibold text-gray-600 col-12">
                ลองจิจูด (long)</label
              >
              <div class="w-full mt-2">
                <InputText
                  id="long"
                  v-model="long"
                  placeholder="ลองจิจูด (long)"
                  class="p-inputtext"
                />
              </div>
            </div>
            <!-- <div class="text-right mt-1">
                <small class="text-red-600">{{ errors.long }}</small>
              </div> -->
          </div>
        </div>
        <hr class="my-3" />
        <div class="flex flex-wrap gap-3 justify-content-end w-full">
          <Button
            label="ยกเลิก"
            @click="closeInsertDialog"
            type="button"
            severity="secondary"
            size="small"
            class="w-auto"
          />
          <Button label="บันทึก" type="submit" size="small" class="w-auto" />
        </div>
      </form>
    </Dialog>
  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" :error="errorAlert" />
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
// Primevue API
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

// *********** [ DIALOG SECTION] **************
const dialogInsert = ref(false)
const openNew = () => {
  dialogInsert.value = true
}
const closeInsertDialog = () => {
  dialogInsert.value = false
}

const conFirmation = ref(null) //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = (obj) => {
  console.log(obj)
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: obj.name,
    accept: () => {
      // เรียกฟังชั่นลบ แล้วส่งID ไป
      deletecustomer(obj.id)
    }
  }
  if (conFirmation.value) {
    conFirmation.value.openDialog(proCessConfirm)
  }
}

const errorAlert = ref(false)
const alertToast = ref({})
const deletecustomer = async (obj) => {
  errorAlert.value = false
  try {
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: 'ลบสำเร็จ'
    }
  } catch (error) {
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: 'Error from Api'
    }
    console.error(error)
  }
}

// *********** [ DATA SECTION ] ***************
const customers = ref()
const loadData = async () => {
  const data =
    // ข้อมูลลูกค้า
    [
      {
        id: 1000,
        name: 'James Butt',
        country: {
          name: 'Algeria',
          code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png'
        },
        balance: 70663
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
        country: {
          name: 'Egypt',
          code: 'eg'
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'proposal',
        verified: true,
        activity: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png'
        },
        balance: 82429
      },
      {
        id: 1002,
        name: 'Art Venere',
        country: {
          name: 'Panama',
          code: 'pa'
        },
        company: 'Chemel, James L Cpa',
        date: '2017-05-13',
        status: 'qualified',
        verified: false,
        activity: 63,
        representative: {
          name: 'Asiya Javayant',
          image: 'asiyajavayant.png'
        },
        balance: 28334
      }
    ]
  data.forEach((cus) => {
    cus.date = new Date(cus.date)
  })
  customers.value = data // กำหนดค่าให้กับ customers.value
}
onMounted(() => {
  loadData()
})
const selectedCustomers = ref()
const filters = ref()
const representatives = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png' },
  { name: 'Anna Fali', image: 'annafali.png' },
  { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { name: 'Onyama Limba', image: 'onyamalimba.png' },
  { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  { name: 'XuXue Feng', image: 'xuxuefeng.png' }
])
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'])

onMounted(() => {})

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  }
}
initFilters()

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
}
const clearFilter = () => {
  initFilters()
}
const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date)

    return d
  })
}
const getSeverity = (status) => {
  switch (status) {
    case 'unqualified':
      return 'danger'

    case 'qualified':
      return 'success'

    case 'new':
      return 'info'

    case 'negotiation':
      return 'warning'

    case 'renewal':
      return null
  }
}

const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
const breadcrumbItems = [{ label: 'crud form', to: '/lab/primevueform' }]
</script>