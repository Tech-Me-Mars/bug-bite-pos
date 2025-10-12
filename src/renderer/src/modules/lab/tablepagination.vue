<template>
  <div class="content">
    <pageaddheader :title="title" :title1="title1" :items="items" />
    <div class="card">
      <div class="card-body">
        <!-- top table -->
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search"
                @click="() => { filter = !filter, data = originalData, searchText = '' }" :class="{ setclose: filter }">

                <img src="@/assets/img/icons/filter.svg" alt="img" />
                <!-- @/assets/img/icons/filter.svg -->
                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
              <a class="btn btn-searchset"><img src="@/assets/img/icons/search-white.svg" alt="img" /></a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input type="search" class="form-control form-control-sm" placeholder="Search..."
                    aria-controls="DataTables_Table_0" v-model="searchGobal" @input="eventGlobalSearch" />
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
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="@/assets/img/icons/excel.svg"
                    alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img
                    src="@/assets/img/icons/printer.svg" alt="img" /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- end top table -->

        <!-- /Filter -->
        <div class="card" id="filter_inputs" :style="{
          display: filter ? 'block' : 'none'
        }">
          <div class="card-body pb-0">
            <div class="row">
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <datepicker v-model="startdate" placeholder="Choose Start Date" class="picker cal-icon" :editable="true"
                    :clearable="false" />

                </div>
                {{ startdate }}
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <datepicker v-model="enddate" placeholder="Choose End Date" class="picker cal-icon" :editable="true"
                    :clearable="false" />

                </div>
                {{ enddate }}
              </div>




              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <button type="button" @click="searchBydate()" class="btn btn-filters ms-auto"><img
                      src="@/assets/img/icons/search-whites.svg" alt="img" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Filter -->
        <div class="table-responsive">
          <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">


            <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">

              <div style="padding: 8px">
                <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
                  style="width: 188px; margin-bottom: 8px; display: block"
                  @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                  @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                  @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
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

            <template #bodyCell="{ text,column, record }">
              <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
                <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === state.searchText.toLowerCase()" :key="i" class="highlight">
                    {{ fragment }}
                  </mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>

              <template v-else-if="column.key === 'Status'">
                <span class="badges bg-lightgreen" v-if="record.Status === 'Received'">{{
                  record.Status
                }}</span>
                <span class="badges bg-lightyellow" v-else-if="record.Status === 'Ordered'">{{
                  record.Status
                }}</span>
                <span class="badges bg-lightred" v-else="record.Status === 'Pending'">{{
                  record.Status
                }}</span></template>
              <template v-else-if="column.key === 'pay'">
                <span class="badges bg-lightgreen" v-if="record.PaymentStatus === 'Paid'">{{
                  record.PaymentStatus
                }}</span>
                <span class="badges bg-lightyellow" v-else-if="record.PaymentStatus === 'Partial'">{{ record.PaymentStatus
                }}</span>
                <span class="badges bg-lightred" v-else="record.PaymentStatus === 'Unpaid'">{{
                  record.PaymentStatus
                }}</span></template>

              <template v-else-if="column.key === 'GrandTotal'">
                {{ formatCurrency(record.GrandTotal) }}
              </template>

              <template v-else-if="column.key === 'action'">
                <div class="">
                  <router-link class="me-3" to="editpurchasereturn">
                    <img src="@/assets/img/icons/edit.svg" alt="img" />
                  </router-link>
                  <a class="me-3 confirm-text" href="javascript:void(0);" @click="showAlert">
                    <img src="@/assets/img/icons/delete.svg" alt="img" />
                  </a>
                </div>
              </template>
              <!-- search -->
              <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
                <template v-for="(fragment, i) in text
                  .toString()
                  .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === state.searchText.toLowerCase()" :key="i" class="highlight">
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
  </div>
</template>
<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { Table } from 'ant-design-vue';
import { parse, format, isWithinInterval } from 'date-fns';
const currentDate = ref(new Date())
const startdate = ref()
const enddate = ref()
const filter = ref(false)

const state = reactive({
  searchText: '',
  searchedColumn: '',
});
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
  value = parseFloat(value);
  return value.toLocaleString('th-TH', { style: "currency", currency: "THB" });
};

const formatNumber = (value) => {
  value = parseInt(value);
  return value.toLocaleString({ style: "currency", currency: "THB" });
};



const searchBydate = () => {

  if (!startdate.value || !enddate.value) {
    return; // ถ้ายังไม่ได้เลือก startdate หรือ enddate ให้ไม่ทำอะไร
  }

  const startDateValue = new Date(startdate.value);
  const endDateValue = new Date(enddate.value);
  console.log(startDateValue, endDateValue);
  data.value = originalData.value.filter((item) => {
    const dateFormat = 'dd/MM/yyyy';
    const itemDate = parse(item.Date, dateFormat, new Date());
    console.log(itemDate)
    return itemDate >= startDateValue && itemDate <= endDateValue;
  }).map((item) => {
    // แปลงวันที่ให้อยู่ในรูปแบบ "dd/MM/yyyy"
    const dateFormat = 'dd/MM/yyyy';
    const itemDate = parse(item.Date, dateFormat, new Date());
    const day = itemDate.getDate();
    const month = itemDate.getMonth() + 1;
    const year = itemDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return {
      ...item,
      Date: formattedDate
    };
  });
};







const searchInput = ref();

const columns = [
  {

    title: 'Product Name',
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
    onFilter: (value, record) => record.productname.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sortDirections: ['descend']
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    sorter: (a, b) => a.Date.localeCompare(b.Date)
  },
  {
    title: 'Customer',
    dataIndex: 'Customer',
    sorter: {
      compare: (a, b) => {
        a = a.Customer.toLowerCase()
        b = b.Customer.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'Status',
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
    title: 'Grand Total ($)',
    dataIndex: 'GrandTotal',
    key: "GrandTotal",
    sorter: {
      compare: (a, b) => {
        // แปลงค่า 'GrandTotal' เป็นตัวเลข
        const grandTotalA = parseFloat(a.GrandTotal);
        const grandTotalB = parseFloat(b.GrandTotal);

        // เปรียบเทียบค่าตัวเลขแทน
        return grandTotalA - grandTotalB;
      }
    }
  },
  {
    title: 'Paid ($)',
    dataIndex: 'Paid',
    sorter: {
      compare: (a, b) => {
        a = a.Paid.toLowerCase()
        b = b.Paid.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'Due ($)',
    dataIndex: 'Due',
    sorter: {
      compare: (a, b) => {
        a = a.Due.toLowerCase()
        b = b.Due.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'Payment Status',
    dataIndex: 'PaymentStatus',
    key: 'pay',
    sorter: {
      compare: (a, b) => {
        a = a.PaymentStatus.toLowerCase()
        b = b.PaymentStatus.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right'
  }
]


const data = ref([])
const originalData = ref([]);
const searchText = ref('');
const searchGobal = ref('');
const eventGlobalSearch = () => {
  if (searchGobal.value === '') {
    data.value = originalData.value;
  } else {
    const searchKeywords = searchGobal.value.toLowerCase().split(' ');
    data.value = originalData.value.filter((item) => {
      return searchKeywords.some((keyword) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(keyword)
        );
      });
    });
  }
};
function randomDate() {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = Math.random() < 0.5 ? 1 : 2;
  const year = 2023;
  const dateStr = `${day}/${month}/${year}`;
  return dateStr;
}

const loadData = async () => {
  for (let i = 0; i < 100; i++) {
    originalData.value.push({
      key: i,
      productname: `Sumsung ${i}`,
      Date: randomDate(),
      Supplier: 'Modern Automobile',
      Reference: 'PT002',
      Customer: 'Benjamin',
      Status: 'Pending',
      GrandTotal: 1000 + i,
      Paid: '120',
      Due: '550',
      PaymentStatus: 'Unpaid'
    })
  }
}

onMounted(async () => {
  await loadData();
  data.value = originalData.value
  console.log(data.value)

});


const title = ref('Sales Return List')
const title1 = ref('Manage your Returns')

const items = ref([
  {
    text: 'Add New Sales Return',
    addname: '/createsalesreturn'
  }
])



const selectedRowKeys = ref([]); // Check here to configure the default column
const onSelectChange = changableRowKeys => {
  console.log('selectedRowKeys changed: ', changableRowKeys);
  selectedRowKeys.value = changableRowKeys;
};
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
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
    ],
  };
});
</script>