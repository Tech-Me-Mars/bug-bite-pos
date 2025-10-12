<template>
    <div class="content">
        <Breadcrumb :items="breadcrumbItems" class="font-bold" />

        <div class="card">
            <div class="card-body py-3">

                <Form @submit="onSearchInCategory" class="">
                    <div class="grid">
                        <div class="col-5">
                            <div>
                                <label for="branchItemStatusId"
                                    class="pb-3 font-semibold text-gray-600 col-12">การแสดงผล</label>
                                <div class="w-full">
                                    <Dropdown filter autoFilterFocus v-model="branchItemStatusId"
                                        :options="resdisplayOptios" optionLabel="name" optionValue="id"
                                        placeholder="เลือกการแสดงผล" class="w-full" />
                                </div>
                            </div>
                        </div>

                        <div class="col-5">
                            <div>
                                <label for="categoryId" class="pb-3 font-semibold text-gray-600 col-12">หมวดหมู่สินค้า
                                </label>
                                <div class="w-full">
                                    <Dropdown filter autoFilterFocus v-model="categoryId" :options="resCategoryInBranch"
                                        optionLabel="supplier_product_category_name" optionValue="id"
                                        placeholder="เลือกหมวดหมู่" class="w-full" />
                                </div>
                            </div>
                        </div>
                        <div class="col-2 flex align-items-end justify-content-end text-end">
                            <Button label="ค้นหา" icon="pi pi-search" severity="help" :loading="loadingBtn" type="submit"
                                size="" class="w-full" />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="table-top">
                    <div class="search-set">
                        <div class="search-path">
                            <a class="btn btn-filter" id="filter_search" @click="clearFilter()"
                                :class="{ setclose: filter }">
                                <img src="@/assets/img/icons/filter.svg" alt="img" />
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
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"
                                    @click="exportCSV($event)"><img src="@/assets/img/icons/excel.svg" alt="img" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <DataTable v-model:selection="selectedProduct" ref="dt" class="p-datatable-sm" rowHover="true"
                    :value="resItemProductInCategory" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                    currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
                    :exportFilename="`สินค้าโดยCategory${format(new Date(), 'ddMMyyyyHHmmss')}`" :pt="{
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
                    <!--   <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="indexkey" header="ลำดับ" sortable style="min-width: 3rem" class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                        <template #body="{ data }">
                            {{ data.indexkey }}
                        </template>
                    </Column>
                    <Column field="product_code" header="รหัสสินค้า" sortable style="min-width: 8rem" class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                    </Column>
                    <Column field="supplier_product_name" header="ชื่อสินค้า" sortable style="min-width: 10rem"
                        class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                    </Column>
                    <Column field="branch_item_price" header="ราคา" sortable style="min-width: 8rem" class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                    </Column>
                    <Column field="product_category_name" header="หมวดหมู่" sortable style="min-width: 8rem" class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                    </Column>
                    <Column field="sku_barcode" header="Barcode" sortable style="min-width: 8rem" class="px-2">
                        <template #sorticon="slotProps">
                            <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                <i class="pi pi-angle-down" style="font-size: 12px"></i>
                            </div>
                            <div v-else>
                                <i class="pi pi-angle-up" style="font-size: 12px"></i>
                            </div>
                        </template>
                    </Column>

                    <!--<Column style="min-width: 5rem" class="px-2">
                        <template #header>
                            <div class="flex flex-1 align-items-center justify-content-center text-center">
                                <span class="">จำนวน Barcode / ดวง</span>
                            </div>
                        </template>
                        <template #body="{ data, index }">
                            <div class="text-center flex justify-content-center">
                                <InputNumber v-model="resItemProductInCategory[index].qty" showButtons
                                    buttonLayout="horizontal" :min="0" decrementButtonClassName="p-button-secondary"
                                    incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus" :pt="{
                                        incrementButton: { class: 'bg-green-500 border-green-500' },
                                        decrementButton: { class: 'bg-red-500 border-red-500' },
                                        input: { class: 'max-w-9rem text-center' }
                                    }" />
                            </div>
                        </template>
                    </Column> -->

                    <Column style="min-width: 5rem" class="px-2">
                        <template #header>
                            <div class="flex flex-1 align-items-center justify-content-center text-center">
                                <span class="">สร้าง Barcode</span>
                            </div>
                        </template>
                        <template #body="{ data, index }">
                            <Button label="สร้าง Barcod" icon="pi pi-replay" severity="success" size="small"
                                @click="onCreatBarcode(data)" style="background-color: rgb(76, 173, 72)">
                                <i class="fa fa-barcode mr-1" data-bs-toggle="tooltip" title="fa fa-barcode"></i>สร้าง
                                Barcod
                            </Button>
                        </template>
                    </Column>





                </DataTable>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="isShowPdf" maximizable modal header="" :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2 border-2 p-2 cursor-pointer btn btn-success"
                @click="printPDF()">
                <vue-feather type="printer" data-bs-toggle="tooltip" title="fe fe-printer"></vue-feather>
                <span class="font-bold white-space-nowrap" style="font-size: 16pt;">พิมพ์ Barcode</span>
            </div>
        </template>
        <div v-if="pdfLoading == true">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        <vue-pdf-embed :source="sourcePdf" ref="pdfViewer" @loaded="handleLoaded" @progress="handleProgress"
            :show-print="true" style="height: auto;" />

    </Dialog>

    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast" />
</template>

<script setup>
import { useField, useForm, Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { parse, format, isWithinInterval } from 'date-fns'
import { ref, computed, unref, reactive, onMounted, watch } from 'vue'
import VirtualScroller from 'primevue/virtualscroller'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
// IMPORT EMBEDB
import VuePdfEmbed from 'vue-pdf-embed';
// [[ IMPORT COMPONENT Alert]]
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]
import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue' // [[ IMPORT COMPONENT Alert]]
import { useRoute, useRouter } from 'vue-router'
import * as dataApi from './api/data.js'

const router = useRouter()
const route = useRoute()

const formatDate = (value) => {
    return value.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}
const formatCurrency = (value) => {
    if (typeof value === 'string') {
        value = value.replace(',', '')
    }
    if (value == null || value == undefined) {
        value = 0.0
    }
    value = parseFloat(value)
    return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}
const errorAlert = ref(false)
const alertToast = ref({})

const formatNumber = (value) => {
    value = parseInt(value)
    return value.toLocaleString({ style: 'currency', currency: 'THB' })
}
const loadingBtn = ref(false)

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const clearFilter = () => {
    initFilters()
}
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
}
initFilters()

// ******************** [ เรียกดูขช้อมูล OPTIONS] ********************************
const resdisplayOptios = ref()
const loadBranhStatus = async () => {
    try {
        const res = await dataApi.getBranchItemStatus()
        resdisplayOptios.value = res.data.data
        resdisplayOptios.value.forEach((item) => {
            item.id = parseInt(item.id)
        });
    } catch (error) {
        console.log(error)
    }
}
const resCategoryInBranch = ref()
const loadBranchCategory = async () => {
    try {
        const res = await dataApi.getBranchItemCategory()
        resCategoryInBranch.value = res.data.data
        resCategoryInBranch.value.unshift({ id: 0, supplier_product_category_name: 'เลือกทั้งหมด' })
    } catch (error) {
        console.log(error)
    }
}
const resBranchId = ref(1)
const loadBranchDetail = async () => {
    try {
        const res = await dataApi.getBranchDetail()
        resBranchId.value = res.data.data.id
    } catch (error) {
        console.log(error)
    }
}
//*********** VALIDATETION CATEGORY SEARCH****************
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
    zod.object({
        branchItemStatusId: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue
        }),
        categoryId: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue
        })
    })
)
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})
const resItemProductInCategory = ref([])
const selectedProduct = ref([])
const { value: branchItemStatusId } = useField('branchItemStatusId')
const { value: categoryId } = useField('categoryId')
onMounted(() => {
    loadBranhStatus()
    loadBranchCategory()
    loadBranchDetail()
})

const onSearchInCategory = handleSubmit(async (values) => {
    resItemProductInCategory.value = [];
    selectedProduct.value = [];
    loadingBtn.value = true
    errorAlert.value = false
    const paylaod = {
        branch_item_status: branchItemStatusId.value,
        branch_item_category: categoryId.value
    }
    try {
        const res = await dataApi.getBranchItem(paylaod)
        resItemProductInCategory.value = res.data.data
        resItemProductInCategory.value = resItemProductInCategory.value.map((e, i) => ({
            ...e,
            indexkey: i + 1,
        }));
    } catch (error) {
        loadingBtn.value = false
        errorAlert.value = true
        alertToast.value = {
            severity: 'error',
            summary: 'เกิดข้อผิดพลาด',
            detail: error.response.data.message
        }
        console.error(error)
    }
    loadingBtn.value = false
})

const isShowPdf = ref(false);
const sourcePdf = ref(null)
const onCreatBarcode = async (obj) => {
    console.log('create')
    // const data = selectedProduct.value.map((item) => ({
    //     id: item.id,
    //     qty_print: item.qty,
    // }));
    const data = [{ id: obj.sku_barcode, qty_print: 3 }]
    // แปลง JSON ให้เป็นสตริง
    const dataJSON = JSON.stringify(data);
    console.log('dataJSON', dataJSON)
    // แปลงสตริงให้เป็น base64
    const dataEncoded = btoa(dataJSON);
    console.log('dataEncoded', dataEncoded)
    console.log('resBranchId', resBranchId.value)
    loadingBtn.value = true
    errorAlert.value = false
    try {
        const res = await dataApi.createBarCode(resBranchId.value, dataEncoded)
        console.log(res)
        sourcePdf.value = res
        isShowPdf.value = true

    } catch (error) {
        loadingBtn.value = false
        errorAlert.value = true
        alertToast.value = {
            severity: 'error',
            summary: 'เกิดข้อผิดพลาด',
            detail: error.response.data.message
        }
        console.error(error)
    }
    loadingBtn.value = false

};
const pdfViewer = ref(null);
function printPDF() {
    // เรียกใช้เมธอด print จาก VuePdfEmbed
    pdfViewer.value.print();
}


const pdfLoading = ref(false);
const handleProgress = (progressData) => {
    // Do something with the progress data
    pdfLoading.value = true;
    console.log("PDF loading progress:", progressData);
};
const handleLoaded = (pdfDocumentProxy) => {
    // Do something with the loaded PDF document
    pdfLoading.value = false;
    console.log("PDF document loaded:", pdfDocumentProxy);
};



const dt = ref()
const exportCSV = () => {
    dt.value.exportCSV();
};

const breadcrumbItems = [{ label: 'จัดการ Barcode', to: '/print/barcode' }]
</script>
