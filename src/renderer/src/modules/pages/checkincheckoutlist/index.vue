<template>
  <Breadcrumb :items="breadcrumbItems" class="font-bold" />
  <div class="d-flex justify-content-between">
    <pageheader title="เวลาเข้า-ออกงาน" title1="" />
  </div>

  <div class="row mb-0 px-4">
    <!-- Counter -->
    <div class="col-md-4">
      <div class="card rounded-4 shadow-4 text-cyan-500">
        <div class="card-body">
          <h5 class="text-center mb-3 fw-bold">CHECK IN</h5>
          <p class="text-center">01/01/2023 08:00:00</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card rounded-4 shadow-4 text-red-500">
        <div class="card-body">
          <h5 class="text-center mb-3 fw-bold">CHECK OUT</h5>
          <p class="text-center">01/01/2023 16:00:00</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card rounded-4 shadow-4 text-teal-500">
        <div class="card-body">
          <h5 class="text-center mb-3 fw-bold">TOTAL TIME</h5>
          <p class="text-center">08:00:00</p>
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="card">
      <div class="card-body">
        <!-- top table -->
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search" @click="clearFilter()">
                <img src="@/assets/img/icons/filter.svg" alt="img" />
                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText class="form-control" v-model="filters['global'].value" placeholder="ค้นหา..." />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="@/assets/img/icons/pdf.svg"
                    alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                    src="@/assets/img/icons/excel.svg" alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print" @click="printPage()"><img
                    src="@/assets/img/icons/printer.svg" alt="img" /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- end top table -->

        <h4 class="card-title">ข้อมูลเวลาการงาน</h4>
        <div class="table-responsive" v-if="resTimeWorkData">
          <DataTable :exportFilename="`ข้อมูลเวลางาน เข้า-ออก${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters"
            :value="resTimeWorkData" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]" currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
            :globalFilterFields="['checkin_dateonly', 'checkout_dateonly']" :pt="{
              paginator: {
                paginatorWrapper: { class: ' flex justify-content-end' },
                firstPageButton: { class: 'border-round-lg mr-1' },
                previousPageButton: { class: 'border-round-lg mr-1 ' },
                nextPageButton: { class: 'border-round-lg mr-1 ' },
                lastPageButton: { class: 'border-round-lg mr-1 ' },
                current: { class: 'border-round-lg text-orange-400' },
                pageButton: ({ props, state, context }) => ({
                  class: context.active
                    ? 'bg-orage-600 border-none border-round-lg mr-1'
                    : 'bg-gray-600 border-none border-round-lg text-white mr-1'
                })
              }
            }">
            <template #empty> No Data found. </template>
            <!-- <Column field="name" header="Name" sortable style="min-width: 14rem">
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
            </Column> -->
            <!-- <Column
              header="Country"
              sortable
              sortField="country.name"
              filterField="country.name"
              style="min-width: 14rem"
            >
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
            </Column> -->
            <!-- <Column
              header="Agent"
              sortable
              sortField="representative.name"
              filterField="representative"
              :showFilterMatchModes="false"
              :filterMenuStyle="{ width: '14rem' }"
              style="min-width: 14rem"
            >
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
            </Column> -->
            <Column field="checkin_dateonly" header="เช็คอิน" sortable filterField="checkin_dateonly" dataType="date"
              style="min-width: 10rem">
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
                {{ formatDate(data.checkin_dateonly) }}
              </template>
              <template #filter="{ filterModel }">
                <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
              </template>
            </Column>
            <Column field="checkout_dateonly" header="เช็คเอ้าท์" sortable filterField="checkout_dateonly" dataType="date"
              style="min-width: 10rem">
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
                {{ formatDate(data.checkout_dateonly) }}
              </template>
              <template #filter="{ filterModel }">
                <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
              </template>
            </Column>
            <!-- <Column
              field="balance"
              header="Balance"
              sortable
              filterField="balance"
              dataType="numeric"
              style="min-width: 10rem"
            >
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
                <a class="me-3" @click="editModal = true">
                  <img src="@/assets/img/icons/edit.svg" alt="img" />
                </a>

                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data)" />
                <a class="me-3 confirm-text">
                  <img @click="confirmDelete()" src="@/assets/img/icons/delete.svg" alt="img" />
                </a>
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
            </Column> -->
          </DataTable>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="card mb-0">
    <div class="card-body">
      <h4 class="card-title">เวลทำงาน</h4>
      <div class="table-responsive dataview datatableIndex">
        <a-table :columns="column" :data-source="datas">
          <template #bodyCell="{ column, record }"> </template>
        </a-table>
      </div>
    </div>
  </div> -->
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" :error="errorAlert" />
</template>


<script setup>
import { ref, computed, unref, reactive, onMounted } from 'vue'
import * as dataApi from './api/data.js'
import { SearchOutlined } from '@ant-design/icons-vue' // [[ ICON ]]
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { parse, format, isWithinInterval } from 'date-fns'

import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]

// Primevue API
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

onMounted(() => {
  loadData()
})

const resTimeWorkData = ref()
const loadData = async () => {
  const res = await dataApi.getData()
  resTimeWorkData.value = res.data.data

  if (resTimeWorkData.value.length > 0) {
    resTimeWorkData.value.forEach((item) => {
      if (item.checkout_time) {
        const checkoutTime = new Date(item.checkout_time)
        item.checkout_dateonly = new Date(checkoutTime.toISOString().slice(0, 10))
        item.checkout_timeonly = checkoutTime.toISOString().slice(11, 19)
      } else {
        item.checkout_dateonly = null
        item.checkout_timeonly = null
      }
      if (item.checkin_time) {
        const checkinTime = new Date(item.checkin_time)
        item.checkin_dateonly = new Date(checkinTime.toISOString().slice(0, 10))
        item.checkin_timeonly = checkinTime.toISOString().slice(11, 19)
      } else {
        item.checkin_dateonly = null
        item.checkin_timeonly = null
      }
    })
  }
  console.log(resTimeWorkData.value)
}

const empCheckIn = async () => {
  const res = await dataApi.getCheckIn()
}

const empCheckOut = async () => {
  const res = await dataApi.getCheckOut()
}
const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    checkout_dateonly: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    },
    checkin_dateonly: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    }
  }
}

initFilters()
const formatDate = (value) => {
  if (value != null) {
    return value.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
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

const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

const breadcrumbItems = [{ label: 'Check In Check Out', to: '/checkinandcheckout' }]
</script>