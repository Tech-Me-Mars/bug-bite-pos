
<template>
    <div class="content">
        <Breadcrumb :items="breadcrumbItems" class="font-bold" />
        <div class="d-flex justify-content-between">
            <pageheader title="จัดการรับสินค้าเข้าคลัง" title1="" />
        </div>

        <div class="mb-3">
            <Form @submit="onSerch" class="flex w-6">
                <span class="p-input-icon-left w-full">
                    <i class="pi pi-search" />
                    <InputText v-model="RequestId" class="h-3rem w-full" placeholder="ค้นหา REQUEST ID" />
                </span>
                <Button class="mx-2 h-3rem w-8rem text-lg" :loading="loadingBtn" severity="danger" icon="pi pi-search"
                    label="ค้นหา" type="submit" />
            </Form>
        </div>


        <div class="" v-if="resTransferRequestInfo">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">รายละเอียดคำขอสินค้า</h5>
                    <ul>
                        <li><strong>วันที่ร้องขอ:</strong>{{ resTransferRequestInfo.request_date }}</li>
                        <li><strong>สาขาปลายทาง:</strong>{{ resTransferRequestInfo.to_branch_name }} </li>
                        <li><strong>ประเภทการร้องขอ:</strong>{{ resTransferRequestInfo.transfer_type_name }}</li>
                        <li><strong>สถานะคำร้องขอ:</strong>{{ resTransferRequestInfo.status_transfer_request }}</li>
                        <li><strong>เหตุผลในการร้องขอ:</strong>{{ resTransferRequestInfo.request_reason_name }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="card" v-if="resReceiveData">
            <div class="card-body">
                <section>
                    <div class="table-top">
                        <div class="search-set">
                            <div class="search-path">
                                <a class="btn btn-filter" id="filter_search" @click="clearFilter()">
                                    <img src="@/assets/img/icons/filter.svg" alt="img" />
                                    <!-- @/assets/img/icons/filter.svg -->
                                    <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
                                </a>
                            </div>
                            <div class="search-input">
                                <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                    <label>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText class="form-control" v-model="filters['global'].value"
                                                placeholder="ค้นหา..." />
                                        </span>
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
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"
                                        @click="exportCSV($event)"><img src="@/assets/img/icons/excel.svg" alt="img" /></a>
                                </li>
                                <li>
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"
                                        @click="printPage()"><img src="@/assets/img/icons/printer.svg" alt="img" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- end top table -->

                    <h4 class="card-title">ข้อมูลรายการสินค้า</h4>
                    <div class="table-responsive">
                        <DataTable :exportFilename="`ข้อมูลสินค้าที่รับเข้าคลัง${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters" class="p-datatable-sm" :value="resTransferRequestItem"
                            :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]"
                            currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
                                'supplier_product_id',
                                'supplier_product_name',
                                'quantity',
                                'sku_barcode',
                                'unit',
                                'supplier_product_description',
                                'supplier_product_price',
                                'sum_price',
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
                            <template #empty> No Transfer Request Item found. </template>
                            <Column header="ID Product" field="supplier_product_id" sortable style="min-width: 9rem">
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
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                            </Column>
                            <Column header="ชื่อสินค้า" field="supplier_product_name" sortable style="min-width: 12rem">
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
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                            </Column>
                            

                            <Column header="สถานะอนุมัติ" field="status_approved" sortable="status_approved"
                                style="min-width: 8rem">
                                <template #sorticon="slotProps">
                                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                        <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                    </div>
                                    <div v-else>
                                        <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <span class="badges bg-lightgreen" v-if="data.status_approved == 1">เปิดใช้งาน</span>
                                    <span class="badges bg-lightred" v-if="data.status_approved == 0">ปิดใช้งาน</span>
                                </template>
                            </Column>

                            <Column header="SKU BARCODE" field="sku_barcode" sortable="sku_barcode"
                                style="min-width: 13rem">
                                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                                <template #sorticon="slotProps">
                                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                        <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                    </div>
                                    <div v-else>
                                        <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                    </div>
                                </template>
                            </Column>

                            <Column header="unit" field="unit" sortable="unit" style="min-width: 5rem">
                                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                                <template #sorticon="slotProps">
                                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                        <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                    </div>
                                    <div v-else>
                                        <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                    </div>
                                </template>
                            </Column>

                            <Column header="คำอธิบายสินค้า" field="supplier_product_description" sortable="supplier_product_description"
                                style="min-width: 15rem">

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
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                            </Column>

                            <Column header="ราคา/หน่วย" field="supplier_product_price" sortable="supplier_product_price"
                                style="min-width: 15rem">
                                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                                <template #sorticon="slotProps">
                                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                        <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                    </div>
                                    <div v-else>
                                        <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                    </div>
                                </template>
                                <template #body="{ data }">

                                    {{ formatCurrency(data.supplier_product_price) }}

                                </template>
                            </Column>

                            <Column header="จำนวน" class="text-end" field="quantity" sortable style="min-width: 6rem">
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
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                                <template #body="{ data }">
                                    {{ formatNumber(data.quantity) }}
                                </template>
                            </Column>

                            <Column  class="text-end" field="sum_price" sortable="sum_price" style="min-width: 15rem">
                                <template #header>
                                <div class="flex-1 text-center">ราคารวม</div>
                            </template>
                                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                        placeholder="Search..." />
                                </template>
                                <template #sorticon="slotProps">
                                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                        <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                    </div>
                                    <div v-else>
                                        <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    {{ formatCurrency(data.sum_price ? data.sum_price : 0) }}
                                </template>
                            </Column>
                            <ColumnGroup type="footer">
                                <Row>
                                    <Column footer="" :colspan="7" footerStyle="text-align:right" />
                                    <Column class="text-end" v-if="resReceiveData"
                                        :footer="`จำนวน${formatNumber(resReceiveData.quantity)}`" />
                                    <Column class="text-end" v-if="resReceiveData" style="min-width: 15rem;"
                                        :footer="`เงินรวมทั้งหมด${formatCurrency(resReceiveData.sumprice)}`" />
                                </Row>
                            </ColumnGroup>
                        </DataTable>
                    </div>
                </section>
            </div>
        </div>

        <div class="card mb-2" v-if="resReceiveData">
            <div class="card-body">
                <div class="card-title fs-5 ">รับสินค้าเข้าสาขาทั้งหมด</div>
                <Form @submit="onSubmitReceive" class="mb-2">
                    <div class="row">

                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label class="pb-1 font-semibold text-gray-600">วันที่รับสินค้า</label>
                                <div class="">
                                    <Calendar id="received_date" v-model="received_date" showIcon showButtonBar
                                        placeholder="วันที่รับสินค้า" class="w-full" :dateFormat="customDateFormat(received_date)" :pt="{
                                            dropdownButton: {
                                                root: { class: 'bg-red-500 border-red-500' }
                                            }
                                        }" />
                                </div>
                                <small class="px-2 mt-1 text-red-600">{{ errors2.received_date }}</small>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label class="pb-1 font-semibold text-gray-600">Notes</label>
                                <div class="">
                                    <InputText v-model="notes" placeholder="บันทึกเพิ่มเติม" class="w-full" />
                                </div>
                                <small class="px-2 mt-1 text-red-600">{{ errors2.notes }}</small>
                            </div>
                        </div>

                    </div>
                    <div class="text-end">
                        <Button size="sm" label="ยืนยัน" severity="" :loading="loadingBtn" type="submit" class="" />
                    </div>
                </Form>

                <hr class="" />

                <div class="card-title fs-5">รับสินค้าเข้าสาขาทีละรายการ</div>
                <Form @submit="onSubmitReceiveByBarCode">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label class="pb-1 font-semibold text-gray-600">รหัสบาโค้ด</label>
                                <div class="">
                                    <InputText v-model="sku_barcode" placeholder="sku barcode" class="w-full" />
                                </div>
                                <small class="px-2 mt-1 text-red-600">{{ errors3.sku_barcode }}</small>
                            </div>
                        </div>

                    </div>
                    <div class="text-end">
                        <Button size="sm" label="ยืนยัน" severity="" :loading="loadingBtn" type="submit" class="" />
                    </div>
                </Form>
            </div>
        </div>


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
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
// Primevue API
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { da } from 'date-fns/locale'
// [ FOLDER API ]
import * as dataApi from './api/data.js'

const errorAlert = ref(false)
const alertToast = ref({})
// ************* [ START SEARCH DATA SECTIONS] **************

//*********** VALIDATETION ****************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        RequestId: zod.string().nonempty(requireValue).default(""),
    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema,
});

//*********** CONST VARIABLE FORM ****************
const { value: RequestId } = useField("RequestId");

const resReceiveData = ref();
const resTransferRequestItem = ref();
const resTransferRequestInfo = ref();
const onSerch = handleSubmit(async (values) => {
    loadBtn()
    try {
        errorAlert.value = false;
        const res = await dataApi.getRequestItemDataById(RequestId.value);
        resReceiveData.value = res.data.data;
        resTransferRequestItem.value = res.data.data.transfer_request_item;
        resTransferRequestInfo.value = res.data.data.transfer_request;
        alertToast.value = {
            severity: 'success',
            summary: 'ค้นหาข้อมูลสำเร็จ',
            detail: ''
        }
        console.log(resReceiveData.value)
    } catch (error) {
        console.error(error)
        errorAlert.value = true
        alertToast.value = {
            detail: error.response.data.message
        }

    }
});
// ************* [ END SEARCH DATA SECTIONS] **************

//! /////// [validation2] /////////
const validationSchema2 = toTypedSchema(
    zod.object({
        received_date: zod.date({
            required_error: requireValue,
            invalid_type_error: requireValue
        }),
        notes: zod.string().nonempty(requireValue).default(""),
    })

);

const { handleReset: handleReset2, handleSubmit: handleSubmit2, errors: errors2 } = useForm({
    validationSchema: validationSchema2,
});

const { value: received_date } = useField("received_date");
const { value: notes } = useField("notes");

const onSubmitReceive = handleSubmit2(async (values) => {
    receivedToBranch(values)

});
const receivedToBranch = async (values) => {
    received_date.value = format(new Date(received_date.value), "yyyy-MM-dd");
    const payload = {
        "transfer_request_id": RequestId.value,
        "received_date": received_date.value,
        "notes": notes.value
    }
    try {
        errorAlert.value = false;
        const res = await dataApi.receivedToBranch(payload);
        alertToast.value = {
            severity: 'success',
            summary: 'ทำรายการสำเร็จ',
            detail: ''
        }
    } catch (error) {
        console.error(error)
        errorAlert.value = true
        alertToast.value = {
            detail: error.response.data.message
        }
    }
};


//! /////// [validation3] /////////
const validationSchema3 = toTypedSchema(
    zod.object({
        sku_barcode: zod.string().nonempty(requireValue).default(""),
    })

);

const { handleReset: handleReset3, handleSubmit: handleSubmit3, errors: errors3 } = useForm({
    validationSchema: validationSchema3,
});

const { value: sku_barcode } = useField("sku_barcode");

const onSubmitReceiveByBarCode = handleSubmit3(async (values) => {
    ReceiveByBarCode(values)

});
const ReceiveByBarCode = async (values) => {
    const payload = {
        "transfer_request_id": RequestId.value,
        "sku_barcode": sku_barcode.value
    }
    try {
        errorAlert.value = false;
        const res = await dataApi.receivedToBranchByBarcode(payload);
        alertToast.value = {
            severity: 'success',
            summary: 'ทำรายการสำเร็จ',
            detail: ''
        }
    } catch (error) {
        console.error(error)
        errorAlert.value = true
        alertToast.value = {
            detail: error.response.data.message
        }
    }
};


const filters = ref()
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        supplier_product_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        supplier_product_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        quantity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        sku_barcode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        unit: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        supplier_product_description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        supplier_product_price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        sum_price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    }
}
initFilters()

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
const loadBtn = () => {
    loadingBtn.value = true
    setTimeout(() => {
        loadingBtn.value = false
    }, 2000)
}

const formatDate = (value) => {
    return value.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543;
    return format(new Date(date), `dd/MM/${thaiYear}`);
  }
};


const formatCurrency = (value) => {
value= value.replace(",","")
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
const breadcrumbItems = [{ label: 'รับสินค้าเข้าคลัง', to: '/receive ' }]
</script>
  
<style scope></style>