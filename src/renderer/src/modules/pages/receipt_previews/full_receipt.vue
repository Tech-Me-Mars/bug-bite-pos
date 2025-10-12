<template>
    <div class="content " style="min-height: 50rem;">
        <Breadcrumb :items="breadcrumbItems" class="font-bold" />
        <div class="d-flex justify-content-between">
            <pageheader :title="`ใบเสร็จที่ ${route.params.id} แบบเต็ม`" title1="" />
        </div>


        <div class="flex justify-content-center align-items-center  " v-if="loadReceipt">
            <div class="container bootstrap snippets bootdey ">
                <div class="panel panel-default ">
                    <div class="panel-body shadow-6 border-round-xl">
                        <div class="row">
                            <div class="col-12 text-center">
                                <h4 class="text-dark"><strong>ใบเสร็จรับเงิน<br>Receipt</strong></h4>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 text-left">
                                <ul class="list-unstyled">
                                    <li><strong>ลูกค้า</strong>/Customer: {{ resReceiptData.customer.title_name }} {{
                                        resReceiptData.customer.first_name }} {{ resReceiptData.customer.last_name }}</li>
                                    <li><strong>ที่อยู่:</strong>/Address: {{ resReceiptData.customer.address_no }} {{
                                        resReceiptData.customer.district.name_th }} {{ resReceiptData.customer.amphur.name_th }} {{ resReceiptData.customer.province.name_th }}</li>
                                    <li><strong>ไปรษณีย์:</strong>:/Postcode {{ resReceiptData.customer.zipcode }}</li>
                                    <li><strong>วันที่:</strong>/Date: {{ resReceiptData.sale_date }}</li>
                                </ul>
                            </div>

                            <div class="col-md-6 col-sm-6 text-right">
                                <ul class="list-unstyled">
                                    <li><strong>พนักงานที่ทำรายการ:</strong> {{ resReceiptData.employee.title_name }} {{ resReceiptData.employee.first_name }} {{ resReceiptData.employee.last_name }}</li>
                                    <!-- <li><strong>Account Number:</strong> 012345678901</li>
                                    <li><strong>SWIFT Code:</strong> SWITCH012345678CODE</li>
                                    <li><strong>V.A.T Reg #:</strong> VAT5678901CODE</li> -->
                                </ul>

                            </div>

                        </div>

                        <div class="table-responsive">
                            <DataTable :value="resReceiptData.sale_details" tableStyle="min-width: 50rem">
                                <Column field="id" header="รหัสสินค้า">
                                    <template #body="{ data }">
                                        #{{ data.id }}
                                    </template>
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
                                            class="font-semibold mr-6"><strong>จำนวนสินค้าที่ซื้อทั้งหมด</strong></span><span v-if="resReceiptData.sum_qty">{{ formatNumber(resReceiptData.sum_qty) }} ชิ้น</span></div>
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ช่องทางชำระเงิน</strong>/Payment Methods</span><span>{{ resReceiptData.payment[0].method_name }}</span></div>
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ราคาสุทธิสินค้าที่เสียภาษี</strong>/Pre-VAT
                                            Amoute</span><span>0.00</span></div>
                                    <div class="flex justify-content-between align-items-center mb-2"><span
                                            class="font-semibold mr-6"><strong>ภาษีมูลค่าเพิ่ม (บาท) #</strong>/VAT</span><span>0</span></div>
                                    <div class="flex justify-content-between align-items-center"><span
                                            class="font-semibold mr-6"><strong>จำนวนเงินทั้งสิ้น (บาท)</strong>/Grand
                                            Total</span><span>{{ resReceiptData.total_amount }}</span></div>
                                </div>
                            </div>
                        </div>

                        <hr class="nomargin-top">

                    </div>
                </div>

            </div>

        </div>
    </div>
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
// [ VUE ROUTER ]
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const errorAlert = ref(false)
const alertToast = ref({})

const loadReceipt = ref(false);
onMounted(() => {
    loadDataReceipt();
})
const resReceiptData = ref({ sale_details: null, total_amount: null, customer: null, employee: null, })
const loadDataReceipt = async () => {
    loadReceipt.value = false;
    const res = await dataApi.getReceiptById(route.params.id)
    resReceiptData.value = res.data.data;
    resReceiptData.value.sale_details.forEach((e, i) => {
        e.index = i + 1;
    });
    loadReceipt.value = true;
};


const formatDate = (value) => {
    return value.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const formatCurrency = (value) => {
    value = parseFloat(value)
    return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}

const formatNumber = (value) => {
    value = parseInt(value)
    return value.toLocaleString({ style: 'currency', currency: 'THB' })
};

const breadcrumbItems = [
    { label: 'ใบเสร็จทั้งหมด', to: '/receipt-preview' },
    { label: 'ใบเสร็จแบบย่อ', to: `/receipt-preview/receipt-mini/${route.params.id}` }
]
</script>

<style scoped>
/**    17. Panel
 *************************************************** **/
/* pannel */
.panel {
    position: relative;

    background: transparent;

    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}

.panel.fullscreen .accordion .panel-body,
.panel.fullscreen .panel-group .panel-body {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
}

.panel.fullscreen .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}


.panel>.panel-heading {
    text-transform: uppercase;

    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}

.panel>.panel-heading small {
    text-transform: none;
}

.panel>.panel-heading strong {
    font-family: Arial, Helvetica, Sans-Serif;
}

.panel>.panel-heading .buttons {
    display: inline-block;
    margin-top: -3px;
    margin-right: -8px;
}

.panel-default>.panel-heading {
    padding: 15px 15px;
    background: #fff;
}

.panel-default>.panel-heading small {
    color: #9E9E9E;
    font-size: 12px;
    font-weight: 300;
}

.panel-clean {
    border: 1px solid #ddd;
    border-bottom: 3px solid #ddd;

    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}

.panel-clean>.panel-heading {
    padding: 11px 15px;
    background: #fff !important;
    color: #000;
    border-bottom: #eee 1px solid;
}

.panel>.panel-heading .btn {
    margin-bottom: 0 !important;
}

.panel>.panel-heading .progress {
    background-color: #ddd;
}

.panel>.panel-heading .pagination {
    margin: -5px;
}

.panel-default {
    border: 0;
}

.panel-light {
    border: rgba(0, 0, 0, 0.1) 1px solid;
}

.panel-light>.panel-heading {
    padding: 11px 15px;
    background: transaprent;
    border-bottom: rgba(0, 0, 0, 0.1) 1px solid;
}

.panel-heading a.opt>.fa {
    display: inline-block;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    margin-right: 2px;
    padding: 5px;
    position: relative;
    text-align: right;
    top: -1px;
}

.panel-heading>label>.form-control {
    display: inline-block;
    margin-top: -8px;
    margin-right: 0;
    height: 30px;
    padding: 0 15px;
}

.panel-heading ul.options>li>a {
    color: #999;
}

.panel-heading ul.options>li>a:hover {
    color: #333;
}

.panel-title a {
    text-decoration: none;
    display: block;
    color: #333;
}

.panel-body {
    background-color: #fff;
    padding: 15px;

    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}

.panel-body.panel-row {
    padding: 8px;
}

.panel-footer {
    font-size: 12px;
    border-top: rgba(0, 0, 0, 0.02) 1px solid;
    background-color: rgba(0255, 255, 255, 1);

    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}
</style>