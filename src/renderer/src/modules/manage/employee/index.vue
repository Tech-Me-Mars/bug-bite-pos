<template>
  <div class="content">
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการพนักงาน" title1="" :items="items" />
      <div class="page-header">
        <div class="page-btn">
          <b-button variant="primary" class="btn btn-added" @click="insertModal = true">
            <img src="@/assets/img/icons/plus.svg" alt="Icon" class="me-2" />
            <span class="text-center">เพิ่มพนักงาน</span>
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
        <h4 class="card-title">ข้อมูลพนักงาน</h4>
        <div class="table-responsive">
          <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
            <template
              #customFilterDropdown="{
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                column
              }"
            >
              <div style="padding: 8px">
                <a-input
                  ref="searchInput"
                  :placeholder="`Search ${column.dataIndex}`"
                  :value="selectedKeys[0]"
                  style="width: 188px; margin-bottom: 8px; display: block"
                  @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                  @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                  type="primary"
                  size="small"
                  style="width: 90px; margin-right: 8px"
                  @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                  <template #icon>
                    <SearchOutlined />
                  </template>
                  Search
                </a-button>
                <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                  Reset
                </a-button>
              </div>
            </template>

            <template #customFilterIcon="{ filtered }">
              <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
            </template>

            <template #bodyCell="{ text, column, record }">
              <span v-if="!state.searchText && state.searchedColumn === column.dataIndex">
                <template
                  v-for="(fragment, i) in text
                    .toString()
                    .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
                >
                  <mark
                    v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                  >
                    {{ fragment }}
                  </mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
              <template v-else-if="column.key === 'routePermission'">
                <div v-for="(item ,index) in record.routePermission" :key="index">
                {{ item }}
                </div>
            </template>
              

              <template v-else-if="column.key === 'Status'">
                <span class="badges bg-lightgreen" v-if="record.Status == 1">เปิด</span>
                <span class="badges bg-lightyellow" v-if="record.Status == 0">ปิด</span>
            </template>

              <template v-else-if="column.key === 'action'">
                <div class="">
                  <a class="me-3" @click="editModal = true">
                    <img src="@/assets/img/icons/edit.svg" alt="img" />
                  </a>

                  <a-popconfirm
                    v-if="data.length"
                    title="ยืนยันการลบ?"
                    @confirm="onDelete(record.key)"
                  >
                    <a class="me-3 confirm-text" href="javascript:void(0);" @click="showAlert">
                      <img src="@/assets/img/icons/delete.svg" alt="img" />
                    </a>
                  </a-popconfirm>
                </div>
              </template>
              <!-- search -->
              <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
                <template
                  v-for="(fragment, i) in text
                    .toString()
                    .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
                >
                  <mark
                    v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                  >
                    {{ fragment }}
                  </mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
            </template>
          </a-table>
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
  <Alert ref="alertToast"/>
</template>
  <script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import { parse, format, isWithinInterval } from 'date-fns'
import Alert from "@/components/gobal/Alert.vue"; // [[ IMPORT COMPONENT Alert]]


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

const alertToast = ref(null)
const onDelete = (key) => {
  console.log(key)
  data.value = data.value.filter((item) => item.key !== key)
  alertToast.value.toast({type:"success",title:'Success',detail:"Item Removed!"})

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
  },
  {
    title: 'รูปโปรไฟล์',
    dataIndex: 'profileimage',
    key: 'profileimage',
    sorter: (a, b) => a.profileimage.localeCompare(b.profileimage),
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.profileimage.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'เพศ',
    dataIndex: 'sex',
    key: 'sex',
    sorter: {
      compare: (a, b) => {
        a = a.sex.toLowerCase()
        b = b.sex.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.sex.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'ชื่อ',
    dataIndex: 'name',
    key: 'name',
    sorter: {
      compare: (a, b) => {
        a = a.name.toLowerCase()
        b = b.name.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'ข้อมูลเพิ่มเติม',
    dataIndex: 'info',
    key: 'info',
    sorter: {
      compare: (a, b) => {
        a = a.info.toLowerCase()
        b = b.info.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.info.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'ตำแหน่ง',
    dataIndex: 'position',
    key: 'position',
    sorter: {
      compare: (a, b) => {
        a = a.position.toLowerCase()
        b = b.position.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.position.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'การเข้าถึง Route Permission',
    dataIndex: 'routePermission',
    key: 'routePermission',
    sorter: {
      compare: (a, b) => {
        a = a.routePermission.toLowerCase()
        b = b.routePermission.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.routePermission.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'Status',
    key: 'Status',
    sorter: {
      compare: (a, b) => {
        a = a.Status.toLowerCase()
        b = b.Status.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    },
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.Status.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
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
      profileimage: 'P001',
      sex: 'ชาย',
      name: 'agalil bahaeldyn',
      info: 'agalil bahaeldyn from turkis',
      position: 'dev',
      routePermission: ["Management Stock Products","Management Employee"],
      Status: 1,
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