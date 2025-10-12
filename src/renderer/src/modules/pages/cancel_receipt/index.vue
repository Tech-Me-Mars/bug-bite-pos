<template>
    <div class="content">
        <Breadcrumb :items="breadcrumbItems" class="font-bold" />

        <div class="card">
            <div class="card-body py-3">

                <Form @submit="onSubmit" class="">
                    <div class="grid">
                        <div class="col-6">
                            <div>
                                <label for="branchItemStatusId"
                                    class="pb-3 font-semibold text-gray-600 col-12">เลขที่เอกสาร</label>
                                <div class="w-full">
                                    <InputText class="form-control" type="text" v-model="sale_number"
                                        placeholder="เลขที่เอกสาร" />
                                </div>
                            </div>
                        </div>
                        <div class="col-2 flex align-items-end justify-content-end text-end">
                            <Button label="ค้นหา" icon="pi pi-search" severity="help" :loading="loadingBtn"
                                type="submit" size="" class="w-full" />
                        </div>
                    </div>
                </Form>

            </div>
        </div>

        <div class="flex justify-content-center align-items-center" v-if="resReceiptData">
            <div class="bg-white w-full">
                <div class="panel panel-default ">
                    <div class="panel-body shadow-6 border-round-xl p-2">
                            <div class=" text-center">
                                <h4 class="text-dark"><strong>ใบเสร็จรับเงิน<br>Receipt</strong></h4>
                            </div>

                        <!-- <div class="row">
                            <div class="col-2 text-left">
                                <ul class="list-unstyled">
                                    <li><strong>วันที่</strong>{{ resReceiptData?.sale_date }}</li>
                                    <li><strong>เลขที่ใบเสร็จ:</strong>/Address: {{ resReceiptData?.sale_number }} </li>
                                    <li><strong>พนักงานที่ทำรายการ:</strong>:/Postcode {{ resReceiptData?.employee}}</li>
                                    <li><strong>วันที่:</strong>/Date: {{ resReceiptData?.employee }}</li>
                                </ul>
                            </div>

                            <div class="col-md-6 col-sm-6 text-right">
                                <ul class="list-unstyled">
                                </ul>

                            </div>

                        </div> -->
                        <div class="flex justify-content-between ">
                            <div>
                                <span>วันที่: </span>{{ resReceiptData?.sale_date }}
                            </div>
                            <div>
                                <span>เลขที่ใบเสร็จ: </span>{{ resReceiptData?.sale_number }}
                            </div>
                        </div>
                        <div class="flex justify-content-end ">
                            <div>
                                <span>พนักงานที่ทำรายการ: </span>{{ resReceiptData?.employee }}
                            </div>
                        </div>

                        <div class="table-responsive">
                            <DataTable :value="resReceiptData?.sale_details" tableStyle="min-width: 50rem">
                                <Column field="_supplier_product.supplier_product_code" header="รหัสสินค้า">

                                </Column>
                                <Column field="supplier_product_name" header="ชื่อสินค้า">
                                    <template #body="{ data }">
                                        {{ data.supplier_product_name }}
                                    </template>
                                </Column>
                                <Column field="sku_barcode" header="sku barcode">
                                    <template #body="{ data }">
                                        {{ data.sku_barcode }}
                                    </template>
                                </Column>
                                <Column field="unit_price" header="ราคา/ชิ้น">
                                    <template #body="{ data }">
                                        {{ formatCurrency(data.unit_price) }}
                                    </template>
                                </Column>
                                <Column field="quantity" header="จำนวน">
                                    <template #body="{ data }">
                                        {{ formatNumber(data.quantity) }}
                                    </template>
                                </Column>

                                <Column field="total_price" header="จำนวนเงินทั้งหมด">
                                    <template #body="{ data }">
                                        {{ formatCurrency(data.total_price) }}
                                    </template>
                                </Column>

                            </DataTable>
                            <div class="flex  md:flex-row md:align-items-start md:justify-content-between mt-8">
                                <div class="font-semibold mb-3 md:mb-0">
                                    <strong>หมายเหตุ</strong>/Remark
                                </div>
                                <div class="flex flex-column">
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>จำนวนสินค้าที่ซื้อทั้งหมด</strong></span><span
                                            v-if="resReceiptData">{{ formatNumber(resReceiptData?.total_count || 0) }}
                                            ชิ้น</span></div>
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ช่องทางชำระเงิน</strong>/Payment
                                            Methods</span><span>{{
                                                resReceiptData?.payment_method }}</span></div>
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ราคาสุทธิก่อนเสียภาษี</strong>/Pre-VAT
                                            Amoute</span><span>{{ resReceiptData?.total_before }}</span></div>

                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ภาษีมูลค่าเพิ่ม (บาท)
                                                #</strong>/VAT</span><span>{{
                                                    resReceiptData?.vat }}</span></div>
                                    <div class="flex justify-content-between align-items-center"><span
                                            class="font-semibold mr-6"><strong>จำนวนเงินทั้งสิ้น (บาท)</strong>/Grand
                                            Total</span><span>{{ resReceiptData?.net_amount }}</span></div>
                                </div>
                            </div>
                        </div>

                        <hr class="nomargin-top">
                        <div class="flex justify-content-end align-items-center gap-3">
                            <div><span for="จังหวัด" class="font-bold">หมายเหตุการยกเลิกใบเสร็จ :</span></div>
                            <div>
                                <Dropdown filter autoFilterFocus v-model="pos_cancel_reasons_id"
                                    :options="resCancelReasons" optionLabel="reason_description" optionValue="id"
                                    placeholder="เหตุผล..." class="w-full" style="min-width: 14rem;" />
                            </div>

                            <div>
                                <Button @click="updateCancel(resReceiptData?.id)" :disabled="!pos_cancel_reasons_id"
                                    label="บันทึกการยกเลิก" icon="pi pi-save" severity="help" :loading="loadingBtn" type="button"
                                    size="" class="w-full" />
                            </div>
                        </div>
                    </div>
                </div>

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



// ******************** [ เรียกดูขช้อมูล OPTIONS] ********************************
const resCancelReasons = ref()
const loadCancelReasons = async () => {
    try {
        const res = await dataApi.getCancelReason()
        resCancelReasons.value = res.data.data
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    loadCancelReasons();
})
//*********** VALIDATETION CATEGORY SEARCH****************
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
    zod.object({
        sale_number: zod.string({
            required_error: requireValue,
            invalid_type_error: requireValue
        })
    })
)
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})

const { value: sale_number } = useField('sale_number')

const resReceiptData = ref();
const onSubmit = handleSubmit(async (values) => {

    const paylaod = {
        sale_number: sale_number.value
    }
    try {
        loadingBtn.value = true;
        const res = await dataApi.getCancelReceipt(paylaod)
        resReceiptData.value = res.data.data[0];
        errorAlert.value = false;
        alertToast.value = {
            severity: 'success',
            summary: 'ทำรายการสำเร็จ',
            detail: res.data.message,
        }
    } catch (error) {
        resReceiptData.value = undefined
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

const pos_cancel_reasons_id = ref();
const updateCancel = async (id) => {

    try {
        loadingBtn.value = true
        const res = await dataApi.updateCancelReceipt(id,pos_cancel_reasons_id.value);
        errorAlert.value = false;
        alertToast.value = {
            severity: 'success',
            summary: 'ทำรายการสำเร็จ',
            detail: res.data.message,
        }
        sale_number.value = undefined
        resReceiptData.value = undefined
        pos_cancel_reasons_id.value = undefined
    } catch (error) {
        console.error(error)
        loadingBtn.value = false
        errorAlert.value = true
        alertToast.value = {
            severity: 'error',
            summary: 'เกิดข้อผิดพลาด',
            detail: error.response.data.message
        }
       
    }
    loadingBtn.value = false
}

const isShowPdf = ref(false);
const sourcePdf = ref(null)
const onCreatBarcode = async (obj) => {
    console.log('create')
    // const data = selectedProduct.value.map((item) => ({
    //     id: item.id,
    //     qty_print: item.qty,
    // }));
    const data = [{ id: obj.id, qty_print: 3 }]
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

const breadcrumbItems = [{ label: 'ยกเลิกใบเสร็จ', to: '/cancel-receipt' }]
</script>
