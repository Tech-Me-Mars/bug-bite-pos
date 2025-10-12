<template>
  <div class="content">
    <div class="d-flex justify-content-between">
      <pageheader title="ตำแหน่งงาน" title1="จัดการตำแหน่งงาน" :items="items" />
      <div class="page-header">
        <div class="page-btn">
        <b-button variant="primary" class="btn btn-added" @click="insertModal = true">
          <img src="@/assets/img/icons/plus.svg" alt="Icon" class="me-2" />
          <span class="text-center">เพิ่มตำแหน่ง</span>
        </b-button>
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
                @click="
                  () => {
                    ;(filter = !filter), (data = originalData), (searchText = '')
                  }
                "
                :class="{ setclose: filter }"
              >
                <img src="@/assets/img/icons/filter.svg" alt="img" />
                <!-- @/assets/img/icons/filter.svg -->
                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
              <a class="btn btn-searchset"
                ><img src="@/assets/img/icons/search-white.svg" alt="img"
              /></a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Search..."
                    aria-controls="DataTables_Table_0"
                    v-model="searchGobal"
                    @input="eventGlobalSearch"
                  />
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
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"
                  ><img src="@/assets/img/icons/excel.svg" alt="img"
                /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"
                  ><img src="@/assets/img/icons/printer.svg" alt="img"
                /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- end top table -->

        <!-- /Filter -->
        <div
          class="card"
          id="filter_inputs"
          :style="{
            display: filter ? 'block' : 'none'
          }"
        >
          <div class="card-body pb-0">
            <div class="row">
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <datepicker
                    v-model="startdate"
                    placeholder="Choose Start Date"
                    class="picker cal-icon"
                    :editable="true"
                    :clearable="false"
                  />
                </div>
              
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <datepicker
                    v-model="enddate"
                    placeholder="Choose End Date"
                    class="picker cal-icon"
                    :editable="true"
                    :clearable="false"
                  />
                </div>
               
              </div>

              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <button type="button" @click="searchBydate()" class="btn btn-filters ms-auto">
                    <img src="@/assets/img/icons/search-whites.svg" alt="img" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Filter -->
        <h4 class="card-title">ข้อมูลตำแหน่ง</h4>
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
            <template #empty> No Position Found. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" header="รายการที่" sortable style="min-width: 14rem">
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
            <Column field="name" header="รหัสตำแหน่ง" sortable style="min-width: 12rem">
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

            <Column field="name" header="ชื่อตำแหน่ง" sortable style="min-width: 12rem">
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


            
            <Column header="เครื่องมือ" style="min-width: 7rem">
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

    <!-- modal Edit-->
    <a-modal v-model:open="editModal" width="1000px" class="" title="แก้ไขตำแหน่งงาน">
      <template #footer>
        <b-button key="back" class="mx-2" @click="editModal = false">Close</b-button>
        <!-- <b-button key="submit" variant="primary" @ok="handleEditModalOk">Submit</b-button> -->
        <b-button key="submit" variant="primary" @click="handleEditModalOk()">Submit</b-button>
      </template>
      <div class="card-body">
        <b-form action="#">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label">รหัสตำแหน่ง</label>
            <div class="col-lg-9">
              <b-form-input type="text" class="form-control"></b-form-input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label">ชื่อตำแหน่ง</label>
            <div class="col-lg-9">
              <b-form-input type="text" class="form-control"></b-form-input>
            </div>
          </div>
        </b-form>
      </div>
    </a-modal>

    <!-- modal Insert-->
    <a-modal v-model:open="insertModal" width="1000px" class="" title="เพิ่มตำแหน่งงาน">
      <template #footer>
        <b-button key="back" class="mx-2" @click="insertModal = false">Close</b-button>
        <!-- <b-button key="submit" variant="primary" @ok="handleEditModalOk">Submit</b-button> -->
        <b-button key="submit" variant="primary" @click="handleInsertModalOk()">Submit</b-button>
      </template>
      <div class="card-body">
        <b-form action="#">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label">รหัสตำแหน่ง</label>
            <div class="col-lg-9">
              <b-form-input type="text" class="form-control"></b-form-input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label">ชื่อตำแหน่ง</label>
            <div class="col-lg-9">
              <b-form-input type="text" class="form-control"></b-form-input>
            </div>
          </div>
        </b-form>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import { parse, format, isWithinInterval } from 'date-fns'

const editModal = ref(false)
const handleEditModalOk = (e) => {
  console.log(e)
  editModal.value = false
}

const insertModal = ref(false)
const handleInsertModalOk = (e) => {
  console.log(e)
  insertModal.value = false
}

const currentDate = ref(new Date())
const startdate = ref()
const enddate = ref()
const filter = ref(false)

const onDelete = (key) => {
  console.log(key)
  data.value = data.value.filter((item) => item.key !== key)
}

const state = reactive({
  searchText: '',
  searchedColumn: ''
})
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}
const handleReset = (clearFilters) => {
  clearFilters({ confirm: true })
  state.searchText = ''
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

const searchBydate = () => {
  if (!startdate.value || !enddate.value) {
    return // ถ้ายังไม่ได้เลือก startdate หรือ enddate ให้ไม่ทำอะไร
  }

  const startDateValue = new Date(startdate.value)
  const endDateValue = new Date(enddate.value)
  console.log(startDateValue, endDateValue)
  data.value = originalData.value
    .filter((item) => {
      const dateFormat = 'dd/MM/yyyy'
      const itemDate = parse(item.Date, dateFormat, new Date())
      console.log(itemDate)
      return itemDate >= startDateValue && itemDate <= endDateValue
    })
    .map((item) => {
      // แปลงวันที่ให้อยู่ในรูปแบบ "dd/MM/yyyy"
      const dateFormat = 'dd/MM/yyyy'
      const itemDate = parse(item.Date, dateFormat, new Date())
      const day = itemDate.getDate()
      const month = itemDate.getMonth() + 1
      const year = itemDate.getFullYear()
      const formattedDate = `${day}/${month}/${year}`

      return {
        ...item,
        Date: formattedDate
      }
    })
}

const searchInput = ref()

const columns = [
  {
    title: 'รายการที่',
    dataIndex: 'productname',
    key: 'productname',
    // sorter: {
    //   compare: (a, b) => {
    //     a = a.productname.toLowerCase()
    //     b = b.productname.toLowerCase()
    //     return a > b ? -1 : b > a ? 1 : 0
    //   }
    // },
    sorter: (a, b) => a.productname.localeCompare(b.productname),
    customFilterDropdown: true,
    // onFilter: (value, record) => record.productname.indexOf(value) === 0,
    onFilter: (value, record) =>
      record.productname.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
    sortDirections: ['descend']
  },
  {
    title: 'รหัสตำแหน่ง',
    dataIndex: 'Date',
    sorter: (a, b) => a.Date.localeCompare(b.Date)
  },
  {
    title: 'ชื่อตำแหน่ง',
    dataIndex: 'Status',
    key: 'Status',
    sorter: {
      compare: (a, b) => {
        a = a.Status.toLowerCase()
        b = b.Status.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'จัดการ',
    key: 'action',
    fixed: 'right'
  }
]

const data = ref([])
const originalData = ref([])
const searchText = ref('')
const searchGobal = ref('')
const eventGlobalSearch = () => {
  if (searchGobal.value === '') {
    data.value = originalData.value
  } else {
    const searchKeywords = searchGobal.value.toLowerCase().split(' ')
    data.value = originalData.value.filter((item) => {
      return searchKeywords.some((keyword) => {
        return Object.values(item).some((value) => value.toString().toLowerCase().includes(keyword))
      })
    })
  }
}
function randomDate() {
  const day = Math.floor(Math.random() * 28) + 1
  const month = Math.random() < 0.5 ? 1 : 2
  const year = 2023
  const dateStr = `${day}/${month}/${year}`
  return dateStr
}

const loadData = async () => {
  for (let i = 0; i < 100; i++) {
    originalData.value.push({
      key: i,
      productname: `${i + 1}`,
      Date: 'P001',
      Supplier: 'Modern Automobile',
      Reference: 'PT002',
      Customer: 'Benjamin',
      Status: 'CEO',
      GrandTotal: 1000 + i,
      Paid: '120',
      Due: '550',
      PaymentStatus: 'Unpaid'
    })
  }
}

onMounted(async () => {
  await loadData()
  data.value = originalData.value
  console.log(data.value)
})

const title = ref('Sales Return List')
const title1 = ref('Manage your Returns')

const items = ref([
  {
    text: 'Add New Sales Return',
    addname: '/createsalesreturn'
  }
])

const selectedRowKeys = ref([]) // Check here to configure the default column
const onSelectChange = (changableRowKeys) => {
  console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}
const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          selectedRowKeys.value = newSelectedRowKeys
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          selectedRowKeys.value = newSelectedRowKeys
        }
      }
    ]
  }
})
</script>