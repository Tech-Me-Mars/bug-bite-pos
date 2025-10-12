<template>
  <!-- Main Wrapper -->

  <div class="content">
    <pageaddheader :title="title" :title1="title1" :items="items" />

    <!-- /product list -->
    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search" v-on:click="filter = !filter" :class="{ setclose: filter }">
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
                    aria-controls="DataTables_Table_0" />
                </label>
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img
                    src="@/assets/img/icons/pdf.svg" alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img
                    src="@/assets/img/icons/excel.svg" alt="img" /></a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img
                    src="@/assets/img/icons/printer.svg" alt="img" /></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- /Filter -->
        <div class="card" id="filter_inputs" :style="{
          display: filter ? 'block' : 'none',
        }">
          <div class="card-body pb-0">
            <div class="row">
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <datepicker v-model="startdate" placeholder="Choose Date" class="picker cal-icon" :editable="true"
                    :clearable="false" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <input type="text" placeholder="Enter Reference" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <vue-select :options="Choose" placeholder="Choose Customer" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <vue-select :options="Status" placeholder="Choose Status" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <vue-select :options="Payment" placeholder="Choose Payment Status" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <a class="btn btn-filters ms-auto"><img src="@/assets/img/icons/search-whites.svg"
                      alt="img" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Filter -->
        <div class="table-responsive">
          <a-table :columns="columns" :data-source="data" :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }" @change="onChange">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'id'">
                <td class="productimgname">
                  <a href="javascript:void(0);" class="product-img">
                    <img :src="(`@/assets/img/product/${record.img}`)" alt="product" />
                  </a>
                  <a href="javascript:void(0);">{{ record.ProductName }}</a>
                </td>
              </template>
              <template v-else-if="column.key === 'Status'">
                <span class="badges bg-lightgreen" v-if="record.Status === 'Received'">{{ record.Status }}</span>
                <span class="badges bg-lightyellow" v-else-if="record.Status === 'Ordered'">{{ record.Status }}</span>
                <span class="badges bg-lightred" v-else="record.Status === 'Pending'">{{ record.Status
                }}</span></template>
              <template v-else-if="column.key === 'pay'">
                <span class="badges bg-lightgreen" v-if="record.PaymentStatus === 'Paid'">{{ record.PaymentStatus
                }}</span>
                <span class="badges bg-lightyellow" v-else-if="record.PaymentStatus === 'Partial'">{{ record.PaymentStatus
                }}</span>
                <span class="badges bg-lightred" v-else="record.PaymentStatus === 'Unpaid'">{{ record.PaymentStatus
                }}</span></template>
              <template v-else-if="column.key === 'action'">
                <router-link class="me-3" to="editpurchasereturn">
                  <img src="@/assets/img/icons/edit.svg" alt="img" />
                </router-link>
                <a class="me-3 confirm-text" href="javascript:void(0);" @click="showAlert">
                  <img src="@/assets/img/icons/delete.svg" alt="img" />
                </a>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- /product list -->
  </div>
</template>
<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())

const columns = ref([
  {
    sorter: true
  },
  {
    title: 'Product Name',
    dataIndex: 'ProductName',
    key: 'id',
    sorter: {
      compare: (a, b) => {
        a = a.ProductName.toLowerCase()
        b = b.ProductName.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
      }
    }
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
    sorter: {
      compare: (a, b) => {
        a = a.GrandTotal.toLowerCase()
        b = b.GrandTotal.toLowerCase()
        return a > b ? -1 : b > a ? 1 : 0
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
    sorter: true
  }
])

const data = ref([
  {
    id: 1,
    ProductName: 'Macbook pro',
    img: 'product1.jpg',
    Date: '2/27/2022',
    Supplier: 'Apex Computers',
    Reference: 'PT001',
    Customer: 'Thomas',
    Status: 'Received',
    GrandTotal: '550',
    Paid: '120',
    Due: '550',
    PaymentStatus: 'Paid'
  },
  {
    id: 2,
    ProductName: 'Orange',
    img: 'product2.jpg',
    Date: '1/15/2022',
    Supplier: 'Modern Automobile',
    Reference: 'PT002',
    Customer: 'Benjamin',
    Status: 'Pending',
    GrandTotal: '550',
    Paid: '120',
    Due: '550',
    PaymentStatus: 'Unpaid'
  },
  {
    id: 3,
    ProductName: 'Pineapple',
    img: 'product3.jpg',
    Date: '3/24/2022',
    Supplier: 'AIM Infotech',
    Reference: 'PT003',
    Customer: 'James',
    Status: 'Pending',
    GrandTotal: '210',
    Paid: '120',
    Due: '210',
    PaymentStatus: 'Unpaid'
  },
  {
    id: 4,
    ProductName: 'Strawberry',
    img: 'product4.jpg',
    Date: '1/15/2022',
    Supplier: 'Best Power Tools',
    Reference: 'PT004',
    Customer: 'Bruklin',
    Status: 'Received',
    GrandTotal: '210',
    Paid: '120',
    Due: '210',
    PaymentStatus: 'Paid'
  },
  {
    id: 5,
    ProductName: 'Avocat',
    img: 'product5.jpg',
    Date: '1/15/2022',
    Supplier: 'AIM Infotech',
    Reference: 'PT005',
    Customer: 'Beverly',
    Status: 'Pending',
    GrandTotal: '210',
    Paid: '120',
    Due: '210',
    PaymentStatus: 'UnPaid'
  },
  {
    id: 6,
    ProductName: 'Macbook Pro',
    img: 'product6.jpg',
    Date: '3/24/2022',
    Supplier: 'Best Power Tools',
    Reference: 'PT006',
    Customer: 'Best Power Tools',
    Status: 'Ordered',
    GrandTotal: '210',
    Paid: '120',
    Due: '210',
    PaymentStatus: 'Partial'
  },
  {
    id: 7,
    ProductName: 'Apple Earpods',
    img: 'product7.jpg',
    Date: '1/15/2022',
    Supplier: 'Apex Computers',
    Reference: 'PT007',
    Customer: 'Apex Computers',
    Status: 'Received',
    GrandTotal: '1000',
    Paid: '500',
    Due: '1000',
    PaymentStatus: 'Paid'
  },
  {
    id: 8,
    ProductName: 'Macbook pro',
    img: 'product8.jpg',
    Date: '3/24/2022',
    Supplier: 'Best Power Tools',
    Reference: 'PT008',
    Customer: 'Thomas',
    Status: 'Ordered',
    GrandTotal: '210',
    Paid: '120',
    Due: '210',
    PaymentStatus: 'Partial'
  },
  {
    id: 9,
    ProductName: 'Orange',
    img: 'product9.jpg',
    Date: '3/24/2022',
    Supplier: 'Hatimi Hardware & Tools',
    Reference: 'PT009',
    Customer: 'Benjamin',
    Status: 'Pending',
    GrandTotal: '5500',
    Paid: '550',
    Due: '5500',
    PaymentStatus: 'Unpaid'
  },
  {
    id: 10,
    ProductName: 'Pineapple',
    img: 'product10.jpg',
    Date: '3/24/2022',
    Supplier: 'Best Power Tools',
    Reference: 'PT0010',
    Customer: 'James',
    Status: 'Pending',
    GrandTotal: '2580',
    Paid: '1250',
    Due: '2580',
    PaymentStatus: 'Unpaid'
  },
  {
    id: 11,
    ProductName: 'Strawberry',
    img: 'product5.jpg',
    Date: '3/24/2022',
    Supplier: 'Best Power Tools',
    Reference: 'PT0011',
    Customer: 'Apex Computers',
    Status: 'Pending',
    GrandTotal: '2580',
    Paid: '1250',
    Due: '2580',
    PaymentStatus: 'Unpaid'
  }
  
  // เพิ่มรายการข้อมูลที่คุณต้องการ
])

const filter = ref(false)

const title = ref('Sales Return List')
const title1 = ref('Manage your Returns')

const items = ref([
  {
    text: 'Add New Sales Return',
    addname: '/createsalesreturn'
  }
])

const startdate = ref(currentDate)

const Choose = ref(['Choose Customer', 'Customer['])
const Status = ref(['Choose Status', 'Inprogress'])
const Payment = ref(['Choose Payment Status', 'Payment Status'])
</script>
  