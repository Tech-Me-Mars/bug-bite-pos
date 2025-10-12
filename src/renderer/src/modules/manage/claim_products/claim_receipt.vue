<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="เคลมสินค้า" title1="เคลมโดยใบเสร็จ" />
      <div class="page-header">
        <div class="page-btn">
          <Button label="+เพิ่มลูกค้ารายใหม่" :disabled="customer_id" size="small" icon="pi pi-users" severity="pimary"
            class="mr-2 font-semibold border-round-md" @click="openDialogInsert()" />
        </div>
      </div>
    </div>

    <Form @submit="onSubmitClaim">
      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">ชื่อผู้ซื้อ</label>
                <div class="">
                  <InputGroup class="flex">
                    <Dropdown filter autoFilterFocus v-model="customer_id" :options="resCustomers" optionLabel="fullname"
                      optionValue="id" placeholder="เลือกผู้ซื้อ" class="w-full" />
                    <Button icon="pi pi-times" severity="danger" class="" @click="clearCustomerSelect()" />
                  </InputGroup>
                  <small class="px-2 mt-1 text-red-600">{{ errors.customer_id }}</small>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">เลขที่ใบเสร็จ</label>
                <InputText v-model="sale_id" placeholder="" disabled class="w-full" />
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">ชื่อผู้ซื้อ</label>
                <div class="">
                  <InputGroup class="flex">
                    <Dropdown filter autoFilterFocus v-model="customer_id" :options="resCustomers" optionLabel="fullname"
                      optionValue="id" placeholder="เลือกผู้ซื้อ" class="w-full" />
                    <Button icon="pi pi-times" severity="danger"  class=""
                      @click="clearCustomerSelect()" />
                  </InputGroup>
                  <small class="px-2 mt-1 text-red-600">{{ errors.customer_id }}</small>
                </div>
              </div>
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">เลขที่ใบเสร็จ</label>
                <InputText v-model="sale_id" placeholder="" disabled class="w-full" />
              </div>
            </div> -->
            <div class="col-6">
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">วันที่เคลม</label>
                <Calendar id="request_date" v-model="claim_date" showIcon placeholder="วันที่เคลม" showButtonBar
                  class="w-full" :dateFormat="customDateFormat(claim_date)" />
              </div>
            </div>

            

            <div class="col-6">
              <div class="mb-3">
                <label class="pb-1 font-semibold text-gray-600">สาเหตุการเคลม</label>
                <Dropdown filter autoFilterFocus v-model="claim_reason_id" :options="resRequestReasons"
                  optionLabel="request_reason_name" optionValue="id" placeholder="เลือกสาเหตุ" class="w-full" />
                <small class="px-2 mt-1 text-red-600">{{ errors.claim_reason_id }}</small>
              </div>
            </div>
            
          </div>
        </div>
      </div>



      <div class="card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-path">
                <a class="btn btn-filter" id="filter_search" @click="clearFilter()" :class="{ setclose: filter }">
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
                      <InputText class="form-control" v-model="filters['global'].value" placeholder="ค้นหา..." />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="wordset">
              <ul>
                <li>
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex justify-content-between ">
            <h4 class="card-title">รายการสินค้า</h4>

            <Button v-if="!isPagi" class="bg-white text-dark border-0 w-10rem underline text-xs" o label="ดูแบบแบ่งหน้า"
              size="small" @click="isPagi = !isPagi">
              <vue-feather type="book"></vue-feather>ดูแบบแบ่งหน้า </Button>
            <Button v-else label="ดูแบบไม่แบ่งหน้า" class="bg-white text-dark border-0 w-10rem underline text-xs"
              size="small" @click="isPagi = !isPagi">
              <vue-feather type="book-open"></vue-feather>ดูแบบไม่แบ่งหน้า
            </Button>

          </div>
          <h4 class="text-red-600" v-if="errors.selectedRowTable">เลือกสินค้าก่อนเคลม</h4>
          <div class="table-responsive">
            <DataTable v-model:filters="filters" v-model:selection="selectedRowTable" class="p-datatable-sm"
              :value="productList" :paginator="isPagi" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
                '_supplier_product.supplier_product_code',
                'supplier_product_name',
                'sku_barcode',
                'supplier_product_price',
                'quantity'
              ]" :pt="{
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
}">
              <template #empty> No Products found. </template>
              <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
              <Column header="รหัสสินค้า" field="_supplier_product.supplier_product_code" sortable
                style="min-width: 9rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>

              <Column header="ชื่อสินค้า" field="supplier_product_name" sortable="supplier_product_name"
                style="min-width: 14rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>
              <Column header="Barcode" field="sku_barcode" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>
              <Column header="ราคา/หน่วย" field="unit_price" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
                <template #body="{ data }">
                  {{ formatCurrency(data.unit_price) }}
                </template>
              </Column>

              <Column header="จำนวน" field="quantity" sortable style="min-width: 7rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
                <template #body="{ data }">
                  <span v-if="data?.quantity">{{ formatNumber(data.quantity) }} ชิ้น</span>
                </template>
              </Column>

              <Column header="จำนวนที่ต้องการเคลม" field="" style="min-width: 7rem">
                <template #body="{ data }">
                  <InputNumber v-model="data.number_claim" :max="data.quantity" :min="1" showButtons
                    buttonLayout="horizontal" decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success">
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus" />
                    </template>
                  </InputNumber>
                  <!-- <span v-if="data?.quantity">{{ formatNumber(data.quantity) }} ชิ้น</span> -->
                </template>
              </Column>





            </DataTable>

          </div>

        </div>
      </div>

      <Button label="บันทึกการเคลม" icon="pi pi-save" severity="success" :loading="loadingBtn" type="submit"
        class="w-auto" />
    </Form>


    <Dialog v-model:visible="dialogProcessCustomer" maximizable :style="{ width: '800px' }" header="รายละเอียดลูกค้า"
      :modal="true" class="p-fluid">
      <hr class="mb-3" />
      <Form @submit="onSubmitCreateCustomer">
        <div class="grid">
          <div class="col-12">
            <div>
              <label for="branch_name" class="pb-3 font-semibold text-gray-600 col-12">คำนำหน้า</label>
              <div class="w-full">
                <Dropdown filter autoFilterFocus v-model="title_name" :options="itemTitleName" optionLabel="name"
                  optionValue="name" placeholder="คำนำหน้า" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.title_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="first_name" class="pb-3 font-semibold text-gray-600 col-12">ชื่อ</label>
              <div class="w-full">
                <InputText v-model="first_name" placeholder="ชื่อ" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.first_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="last_name" class="pb-3 font-semibold text-gray-600 col-12">นามสกุล</label>
              <div class="w-full">
                <InputText v-model="last_name" placeholder="นามสกุล" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.last_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="nick_name" class="pb-3 font-semibold text-gray-600 col-12">ชื่อเล่น</label>
              <div class="w-full">
                <InputText v-model="nick_name" placeholder="ชื่อเล่น" class="" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.nick_name }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="cid" class="pb-3 font-semibold text-gray-600 col-12">เลขประจำตัวประชาชน</label>
              <div class="w-full">
                <InputMask v-model="cid" mask="9-9999-99999-99-9" placeholder="x-xxxx-xxxxx-xx-x" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.cid }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <div class="form-group">
                <label class="pb-3 font-semibold text-gray-600 col-12"> รูปโปรไฟล์</label>
                <div class="flex">
                  <Avatar :image="selectedImageUrl !== null && selectedImageUrl !== ''
                    ? selectedImageUrl
                    : '@/public/image/image404.jpg'
                    " class="mr-2" :class="{ 'bg-transparent': selectedImageUrl }" size="xlarge" shape="circle" />
                  <div class="image-upload">
                    <input class="" type="file" accept="image/*" :maxFileSize="1000000" @change="onUpload"
                      label="อัพโหลดรูปภาพ" />
                    <div class="image-uploads">
                      <img src="../../../assets/img/icons/upload.svg" alt="img" />
                      <h4>เลือกหรือลากภาพไฟล์ลงไปเพื่ออัพโหลดไฟล์...</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="phone_no" class="pb-3 font-semibold text-gray-600 col-12">หมายเลขโทรศัพท์</label>
              <div class="w-full">
                <InputMask v-model="phone_no" @keydown="validatePhoneNumber" date="phone" mask="(999) 999-9999"
                  placeholder="(099) 999-9999" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.phone_no }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="address_no" class="pb-3 font-semibold text-gray-600 col-12">รายละเอียดที่อยู่</label>
              <div class="w-full">
                <Textarea v-model="address_no" autoResize rows="5" cols="30" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.address_no }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="province_id" class="pb-3 font-semibold text-gray-600 col-12">จังหวัด</label>
              <div class="w-full">
                <Dropdown filter autoFilterFocus v-model="province_id" :options="resProvincesOption" optionLabel="name_th"
                  optionValue="id" placeholder="จังหวัด" class="w-full" @change="handleProvinceChange" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.province_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="amphure_id" class="pb-3 font-semibold text-gray-600 col-12">อำเภอ</label>
              <div class="w-full">
                <Dropdown filter autoFilterFocus v-model="amphure_id" :options="resAmphuresOption" optionLabel="name_th"
                  optionValue="id" placeholder="อำเภอ" class="w-full" @change="handleAmphureChange" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.amphure_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="district_id" class="pb-3 font-semibold text-gray-600 col-12">ตำบล</label>
              <div class="w-full">
                <Dropdown filter autoFilterFocus v-model="district_id" :options="resDistrictsOption" optionLabel="name_th"
                  optionValue="id" placeholder="ตำบล" class="w-full" @change="handleDistrictChange()" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.district_id }}</small>
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="zipcode" class="pb-3 font-semibold text-gray-600 col-12">ไปรษณีย์</label>
              <div class="w-full">
                <InputText id="zipcode" v-model="zipcode" :disabled="!district_id" type="text" placeholder="รหัสไปรษณื" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors2.zipcode }}</small>
            </div>
          </div>
        </div>
        <hr class="my-3" />
        <div class="flex flex-wrap gap-3 justify-content-end w-full">
          <Button label="ยกเลิก" @click="closetDialogInsert" type="button" severity="secondary" size="small"
            class="w-auto" />
          <Button label="บันทึก" :loading="loadingBtn" icon="pi pi-save" type="submit" size="small" class="w-auto" />
        </div>
      </Form>
    </Dialog>

    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast" />
  </div>
</template>


<script setup>
// [ VALIDATOR ]
import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
// [ ICON ]
import { SearchOutlined } from '@ant-design/icons-vue'
// [ VUE API ]
import { ref, computed, unref, reactive, onMounted } from 'vue'
//  [ DATE FNT ]
import { parse, format, isWithinInterval } from 'date-fns'
// [ COMPONENT CUSTOM ]
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
// Primevue API
import { Table } from 'ant-design-vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { da } from 'date-fns/locale'
//  [[ VUE ROUTER]]
import { useRoute, useRouter } from "vue-router";
// [ FOLDER API ]
import * as dataApi from './api/data.js'
import * as addressDataServices from './api/address.js'
// *********************************************************[[ END IMPORT ]]********************************************************
// *********************************************************************************************************************************
// *********************************************************************************************************************************


// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

const isPagi = ref(false);
// *************** [ loading button ]
const route = useRoute();
const router = useRouter();

const errorAlert = ref(false)
const alertToast = ref({})

// const selectedRowTable = ref()

// ************** [ LOAD DATA ON MOUNT ] **********
onMounted(() => {
  loadDataGetSaleById();
  loadDataCustomers();
  loadRequestReasons();
  loadProvinces();
})

const resSaleGetById = ref();
const productList = ref();
const loadDataGetSaleById = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.getSaleCustomerById(route.params.id);
    resSaleGetById.value = res.data.data[0];
    productList.value = res.data.data[0].sale_detail;
    if (resSaleGetById.value.customer_id) {
      customer_id.value = resSaleGetById.value.customer_id;
    }
    sale_id.value = resSaleGetById.value.id;
    productList.value = productList.value.map((e, i) => ({ ...e, indexkey: i + 1, number_claim: 1 }));
    console.log('productList.value', productList.value)
  }
  catch (error) {
    loadingBtn.value = false;
    console.error(error)
  }
  loadingBtn.value = false;
};

const resCustomers = ref()
const loadDataCustomers = async () => {
  const res = await dataApi.getCustomer();
  resCustomers.value = res.data.data;
  resCustomers.value.forEach((e, i) => {
    // e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
    if (
      e.title_name !== undefined && e.title_name !== null &&
      e.first_name !== undefined && e.first_name !== null &&
      e.last_name !== undefined && e.last_name !== null
    ) {
      e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`;
    } else {
      e.fullname = "N/A"; // Or any other default value if the properties are null or undefined
    }
  });
};

const resRequestReasons = ref()
const loadRequestReasons = async () => {
  const res = await dataApi.getRequestReasons()
  resRequestReasons.value = res.data.data;
};
//*********** VALIDATETION ****************
const requireValue = "กรุณาระบุข้อมูล";



//! /////// [validation2 Event On Claim in dialog] /////////
const validationSchema = toTypedSchema(
  zod.object({
    customer_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    claim_date: zod.date({
      required_error: requireValue,
      invalid_type_error: 'กรุณาเลือกวันที่'
    }),
    // sku_barcode: zod.string().nonempty(requireValue).default(""),
    claim_reason_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    selectedRowTable: zod.any().refine(value => value !== null && value !== undefined && value !== '', {
      message: requireValue,
    }),

  })

);

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: selectedRowTable } = useField("selectedRowTable");
const { value: customer_id } = useField("customer_id");
const { value: claim_date } = useField("claim_date", null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
});
const { value: sale_id } = useField("sale_id");
const { value: sku_barcode } = useField("sku_barcode");
const { value: claim_reason_id } = useField("claim_reason_id");

const onSubmitClaim = handleSubmit(async (values) => {
  console.log('selectedRowTable.value', selectedRowTable.value)
  saveClaimSku(values)
});


const saveClaimSku = async (values) => {

  loadingBtn.value = true;
  try {
    const cart_claim = selectedRowTable.value.map(item => {
      return {
        sku_barcode: item.sku_barcode, // แปลง id เป็น string แล้วให้เป็น sku_barcode
        qty: item.number_claim,
      };
    });
    claim_date.value = format(new Date(claim_date.value), "yyyy-MM-dd");
    const payload = {
      customer_id: customer_id.value,
      claim_date: claim_date.value,
      sale_id: sale_id.value ? sale_id.value : '',
      claim_reason_id: claim_reason_id.value,
      cart_claim: cart_claim
    }
    console.log('payload', payload)

    const res = await dataApi.saveClaimSku(payload);
    errorAlert.value = false;
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: ''
    }
    setTimeout(() => {
      // return router.push({ path: '/report-sale-main' })
      return router.go(-1);
    }, 1500);
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false;
  loadDataGetSaleById();
  handleReset();
};

const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    '_supplier_product.supplier_product_code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    supplier_product_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    sku_barcode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    unit_price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    quantity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  }
}
initFilters()

// ************************ [[ SECTION CUSTOMER CREATE ]] ************************************
// ************************************************************************************
// **********************[ DIALOG ] ********************************
const itemTitleName = ref([{ name: 'นาย' }, { name: 'นางสาว' }, { name: 'นาง' }])
// ********** [[ ที่อยู่]] *********************

const resProvincesOption = ref()
const resAmphuresOption = ref()
const resDistrictsOption = ref()
const loadProvinces = async () => {
  const rs = await addressDataServices.getAddressProvinces()
  resProvincesOption.value = rs.data.data
}
const loadAddressWhenEdit = async () => {
  const rsprovinces = await addressDataServices.getAddressProvinces()
  resProvincesOption.value = rsprovinces.data.data
  const rsAmphur = await addressDataServices.getAddressAmphuresById(province_id.value)
  resAmphuresOption.value = rsAmphur.data.data
  const rsDistrict = await addressDataServices.getAddressDistrictsById(amphure_id.value)
  resDistrictsOption.value = rsDistrict.data.data
}
const handleProvinceChange = async () => {
  console.log('เลือกจังหวัด')
  // โหลดอำเภอ
  const rs = await addressDataServices.getAddressAmphuresById(province_id.value)
  resAmphuresOption.value = rs.data.data
  console.log(resAmphuresOption.value)

  amphure_id.value = null
  district_id.value = null
  zipcode.value = null
}
const handleAmphureChange = async () => {
  const rs = await addressDataServices.getAddressDistrictsById(amphure_id.value)
  resDistrictsOption.value = rs.data.data
  console.log(amphure_id.value)
  district_id.value = null
  zipcode.value = null
}
const handleDistrictChange = () => {
  for (const item of resDistrictsOption.value) {
    if (item.id == district_id.value) {
      zipcode.value = String(item.zip_code)
      break // Stop the loop since we found the matching item
    }
  }
}
//! /////// [validation] /////////
const validationSchema3 = toTypedSchema(
  zod.object({
    title_name: zod
      .string({ required_error: requireValue, invalid_type_error: requireValue })
      .nonempty(requireValue)
      .default(''),
    first_name: zod.string().nonempty(requireValue).default(''),
    last_name: zod.string().nonempty(requireValue).default(''),
    cid: zod.string().nonempty(requireValue).min(13).default(''),
    phone_no: zod.string().nonempty(requireValue).min(10).default(''),
    address_no: zod.string().nonempty(requireValue).default(''),
    province_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    district_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    amphure_id: zod.number({ required_error: requireValue, invalid_type_error: requireValue }),
    zipcode: zod.string().nonempty(requireValue).default('')
  })
)
const {
  handleReset: handleReset2,
  handleSubmit: handleSubmit2,
  errors: errors2
} = useForm({
  validationSchema: validationSchema3
})
const { value: title_name } = useField('title_name')
const { value: first_name } = useField('first_name')
const { value: last_name } = useField('last_name')
const { value: nick_name } = useField('nick_name')
const { value: cid } = useField('cid')
const { value: phone_no } = useField('phone_no')
const { value: address_no } = useField('address_no')
const { value: province_id } = useField('province_id')
const { value: district_id } = useField('district_id')
const { value: amphure_id } = useField('amphure_id')
const { value: zipcode } = useField('zipcode')

const lastInsertPhon = ref()

const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, '')

  if (
    (number.length >= 2 && ['0', '1', '7', '4'].includes(number[1])) ||
    !['0'].includes(number[0])
  ) {
    event.preventDefault()
    phone_no.value = phone_no.value
  }
}

const avatar_image = ref() // รูปเริ่มต้น
const selectedImageUrl = ref()
//************************* */ Dialog Create Customer
const dialogProcessCustomer = ref(false)
const openDialogInsert = () => {
  handleReset2()
  dialogProcessCustomer.value = true
}
const closetDialogInsert = () => {
  dialogProcessCustomer.value = false
  handleReset2()
}
const onSubmitCreateCustomer = handleSubmit2((values) => {
  saveCustomer(values)
})

const saveCustomer = async (values) => {
  cid.value = await cid.value.replace(/[^0-9]/g, '')
  phone_no.value = await phone_no.value.replace(/\D/g, '')
  // เก็บไว้เพื่อนำไปยิงแล้ว quick show ลูกค้า
  lastInsertPhon.value = phone_no.value
  console.log(values)

  const formDataToObject = (formData) => {
    const object = {}
    formData.forEach((value, key) => {
      object[key] = value
    })
    return object
  }

  const formData = new FormData()
  formData.append('title_name', title_name.value)
  formData.append('first_name', first_name.value)
  formData.append('last_name', last_name.value)
  formData.append('cid', cid.value)
  if (avatar_image.value) {
    formData.append('avatar_image', avatar_image.value)
  }
  formData.append('phone_no', phone_no.value)
  formData.append('address_no', address_no.value)
  formData.append('province_id', province_id.value)
  formData.append('district_id', district_id.value)
  formData.append('amphure_id', amphure_id.value)
  formData.append('zipcode', zipcode.value)
  console.log('formData out try', formData)

  const formDataObject = formDataToObject(formData)
  errorAlert.value = false
  // save
  loadingBtn.value = true
  try {
    const res = await dataApi.saveCustomer(formData)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    handleReset2()
    await loadDataCustomers()
    await onSubmitSearchPhon()
    await updateCustomer()
    dialogProcessCustomer.value = false
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
}

const onSubmitSearchPhon = async (values) => {
  errorAlert.value = false
  const payload = {
    phone_no: lastInsertPhon.value
    // phone_no: "0854684841"
  }
  loadingBtn.value = true
  try {
    const res = await dataApi.getCustomerByPhon(payload)
    console.log('getCustomerByPhon', res.data.data)
    customer_id.value = res.data.data.id
  } catch (error) {
    loadingBtn.value = false
    console.log(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
}

//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    selectedImageUrl.value = URL.createObjectURL(file) // สร้าง URL จากไฟล์
    avatar_image.value = file // เก็บไฟล์ที่เลือกลงตัวแปร
  }
}

const updateCustomer = async () => {
  try {
    const payload = {
      customer_id: customer_id.value,
      sale_id: route.params.id
    }
    loadingBtn.value = true;
    const res = await dataApi.updateCustomer(payload)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
  }
  catch (error) {
    loadingBtn.value = false
    console.error(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false
}


const clearCustomerSelect = async () => {
  customer_id.value = undefined
}




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

const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543;
    return format(new Date(date), `dd/MM/${thaiYear}`);
  }
};

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
const breadcrumbItems = [{ label: 'สรุปยอดขายรายบุคคล', to: `/report-sale-employee` }, { label: 'เคลมสินค้า', to: `/claimproduct/${route.params.id}` }]
</script>