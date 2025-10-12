<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader :title="`สรุปยอดขาย`" title1="" />
    </div>
    <div class="card mb-2">
      <div class="card-body">
        <div class="mb-3 flex justify-content-between">
          <Form @submit="onSerch" class="flex w-full row p-0 m-0">
            <div class="col-12 col-md-4">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">วันที่เริ่มต้น</label>
              </div>
              <Calendar id="received_date" v-model="date_s" showIcon placeholder="วันที่เริ่มต้น" class="w-full"
                :dateFormat="customDateFormat(date_s)" showButtonBar />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_s }}</small>
            </div>
            <div class="col-12 col-md-4">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">วันที่สิ้นสุด</label>
              </div>
              <Calendar id="received_date" v-model="date_e" showIcon placeholder="วันที่สิ้นสุด" class="w-full"
                :dateFormat="customDateFormat(date_e)" :minDate="date_s" showButtonBar />
              <small class="px-2 mt-1 text-red-600">{{ errors.date_e }}</small>
            </div>

            <div class="col-12 col-md-4">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">sku barcode</label>
              </div>
              <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon bg-transparent" style="width: 2.5rem">
                  <i class="fa fa-barcode" data-bs-toggle="tooltip" title="fa fa-barcode"></i>
                </span>
                <InputText v-model="sku_barcode" placeholder="ค้นหาจาก barcode" class="" />
              </div>
              <small class="px-2 mt-1 text-red-600">{{ errors.sku_barcode }}</small>
            </div>

            <div class="col-12 col-md-4">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">พนักงาน</label>
              </div>
              <Dropdown :options="resUserEmployee" optionLabel="fullname" optionValue="id" placeholder="เลือกพนักงาน"
                class="w-full" v-model="employee_id" />
              <small class="px-2 mt-1 text-red-600">{{ errors.employee_id }}</small>
            </div>

            <div class="col-12 col-md-4">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">ช่องทางชำระเงิน</label>
              </div>
              <Dropdown :options="resPaymentOption" optionLabel="method_name" optionValue="id"
                placeholder="เลือกช่องทางการชำระเงิน" class="w-full" v-model="payment_method_id" />
              <small class="px-2 mt-1 text-red-600">{{ errors.payment_method_id }}</small>
            </div>

            <div class="col-12 col-md-4 flex align-items-center bg-red p-0 pt-3">
              <Button class="w-full text-lg" :loading="loadingBtn" severity="help" icon="pi pi-search" label="ค้นหา"
                size="small" type="submit" />
            </div>

          </Form>
        </div>
      </div>
    </div>

    <section class="" v-if="isShowData">
      <div class="card w-full">
        <div class="card-body py-3">
          <div class="px-3">
            <div class="row">
              <div class="col-12">
                <address>
                  <strong class="text-xl">ที่ตั้งสาขา <i class="pi pi-building"></i></strong><br />
                  {{ resBranchDetail.branch_name }} <br />
                  {{ resBranchDetail.address }},<br />
                  <abbr title="Phone"><i class="pi pi-phone"></i> :</abbr>
                  {{ resBranchDetail.phone_number }}<br />
                  <abbr title="Email"><i class="pi pi-envelope"></i> :</abbr>
                  {{ resBranchDetail.email }}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row my-0" style="display: flex">
        <div class="col-lg-6 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img :src="resGetShiftImage.summary" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>ยอดขายรายวัน</h6>
              <h5>
                ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2"
                  :delay="3" :endAmount="resGetShiftSummaryDaily.sum_amount" :duration="5" :autoinit="true" />
              </h5>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget dash1" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img :src="resGetShiftImage.count" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>จำนวนใบเสร็จ</h6>
              <h5>
                <vue3-autocounter v-if="resGetShiftSummaryDaily.count_bill" class="counter" ref="counter"
                  :startAmount="0" :delay="3" :endAmount="resGetShiftSummaryDaily.count_bill" :duration="5"
                  :autoinit="true" />
                <vue3-autocounter v-else class="counter" ref="counter" :startAmount="0" :delay="3" :endAmount="0"
                  :duration="5" :autoinit="true" />
              </h5>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img :src="resGetShiftImage.cash" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>เงินสด</h6>
              <h5>
                ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2"
                  :delay="3" :endAmount="resGetShiftSummaryDaily.sum_amount_cash" :duration="5" :autoinit="true" />
              </h5>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img :src="resGetShiftImage.qrpayment" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>QR CODE</h6>
              <h5>
                ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2"
                  :delay="3" :endAmount="resGetShiftSummaryDaily.sum_amount_qr_payment" :duration="5"
                  :autoinit="true" />
              </h5>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 col-12 d-flex align-items-stretch">
          <div class="dash-widget" style="flex: 1">
            <div class="dash-widgetimg">
              <span><img :src="resGetShiftImage.creditcard" alt="img" /></span>
            </div>
            <div class="dash-widgetcontent">
              <h6>บัตรเครดิต</h6>
              <h5>
                ฿<vue3-autocounter class="counter" ref="counter" :startAmount="0" decimalSeparator="." :decimals="2"
                  :delay="3" :endAmount="resGetShiftSummaryDaily.sum_amount_credit_card" :duration="5"
                  :autoinit="true" />
              </h5>
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
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- end top table -->

          <div class="flex justify-content-between text pb-2 align-items-end">
            <h4 class="card-title">รายการขาย</h4>
            <!-- <router-link to="/claimproduct">
              <Button
                label="เคลมสินค้า"
                icon="pi pi-replay"
                severity="success"
                size="large"
                style="background-color: rgb(76, 173, 72)"
              >
                <i class="fa fa-wrench mr-1" data-bs-toggle="tooltip" title="fa fa-wrench"></i
                >เคลมสินค้า
              </Button>
            </router-link> -->
          </div>

          <div class="table-responsive">
            <DataTable :exportFilename="`ข้อมูลสรุปยอดขาย${format(new Date(), 'ddMMyyyyHHmmss')}`"
              v-model:filters="filters" v-model:selection="selectedRowTable" class="p-datatable-sm"
              :value="resSummaryShift" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
      'index',
      'saledate',
      'dateonly',
      'sale_number',
      'cus_fullname',
      'sale_details_count',
      'net_amount',
      'phone_no'
    ]" :pt="{
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
              <template #empty>
                <div class="flex flex-column justify-content-center align-items-center flex-1 py-3">
                  No Data found.
                  <img src="@/assets/img/datanotfound/no-results.png" alt="Customer Image" class="w-3rem h-3rem" />
                </div>
              </template>

              <Column header="รายการที่" field="index" sortable style="min-width: 8rem">

                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>

                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>

                <template #body="{ data }"> {{ data.index }}</template>

                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column>

              <Column header="เลขที่ใบเสร็จ" field="sale_number" sortable style="min-width: 13rem">

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

              <Column header="วันที่" field="saledate" filterField="saledate" dataType="date" sortable
                style="min-width: 12rem">

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
                  <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy"
                    mask="99/99/9999" />
                </template>

                <template #body="{ data }">
                  {{ formatDate(data.saledate) }}
                </template>
              </Column>

              <!-- customer -->
              <!-- <Column header="เบอร์โทร" field="phone_no" sortable="phone_no" style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i>
                </template>
                <template #filter="{ filterModel }">
                  <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
                </template>
              </Column> -->
              <!-- <Column header="ชื่อลูกค้า" field="cus_fullname" sortable="cus_fullname" style="min-width: 14rem">
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
                  {{ data.cus_fullname }}
                </template>
              </Column> -->
              <Column header="เวลา" field="dateonly" sortable style="min-width: 14rem">

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
                  {{ data.dateonly }}
                </template>
              </Column>

              <Column header="จำนวนชิ้น" field="sale_details_count" sortable style="min-width: 9rem">

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
                  {{ formatNumber(data.sale_details_count) }}
                </template>
              </Column>

              <Column header="จำนวนเงิน" field="net_amount" sortable="net_amount" style="min-width: 12rem">

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
                  {{ formatCurrency(data.net_amount) }}
                </template>
              </Column>

              <Column header="ช่องทางชำระเงิน" field="payment_method_id" sortable="payment_method_id"
                style="min-width: 10rem">

                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>

              <Column header="สถานะการเคลม" field="" style="min-width: 9rem">

                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>

                <template #body="{ data }">
                  <!-- <span @click="onShowClaimDetail(data.id)"
                    class="underline flex justify-content-center cursor-pointer"
                    v-if="data.id">
                    สถานะการเคลม
                  </span> -->
                </template>
              </Column>

              <Column style="min-width: 6rem">

                <template #header>
                  <div class="flex-1 text-center">จัดการ</div>
                </template>

                <template #body="{ data }">
                  <div class="flex gap-1">
                    <Button @click="printReceiptRepeat(data.sale_number)" :loading="loadingBtn" class="w-10rem"
                      label="พิมพ์ใบเสร็จซ้ำ"></Button>
                    <Dropdown :options="resCliamReceipt" optionLabel="name" optionValue="name"
                      @change="(event) => showReceipt(data.sale_number, event)" placeholder="เรียกดูใบเสร็จ"
                      class="w-full md:w-10rem" icon="pi pi-print" />
                    <router-link :to="`/claimproduct/${data.id}`">
                      <Button icon="pi pi-replay" severity="success" class="w-full md:w-8rem" out
                        style="background-color: rgb(76, 173, 72)">
                        <i class="fa fa-wrench mr-1" data-bs-toggle="tooltip" title="fa fa-wrench"></i>เคลมสินค้า
                      </Button>
                    </router-link>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Dialog v-model:visible="isShowFullReceipt" maximizable modal header="ใบเสร็จแบบเต็ม" :style="{ width: 'auto' }">
    <div>
      <div v-if="loadReceipt" class="flex justify-content-center align-items-center">
        <div class="container bootstrap snippets bootdey">
          <div class="panel panel-default">
            <div class="panel-body shadow-7 border-round-xl px-2">
              <div class="row">
                <div class="col-12 text-center">
                  <h4 class="text-dark">
                    <strong>ใบเสร็จรับเงิน<br />Receipt</strong>
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-6 text-left">
                  <ul class="list-unstyled">
                    <li v-if="resFullReceiptData.customer">
                      <strong>ลูกค้า</strong>/Customer:
                      {{ resFullReceiptData.customer.title_name }}
                      {{ resFullReceiptData.customer.first_name }}
                      {{ resFullReceiptData.customer.last_name }}
                    </li>
                    <li v-if="resFullReceiptData.customer">
                      <strong>ที่อยู่:</strong>/Address:
                      <span>
                        {{ resFullReceiptData.customer.address_no }}

                        <!-- Check if district exists and is an object -->
                        {{
      resFullReceiptData.customer.district &&
        typeof resFullReceiptData.customer.district === 'object'
        ? resFullReceiptData.customer.district.name_th
        : 'N/A'
    }}

                        <!-- Check if amphur exists and is an object -->
                        {{
        resFullReceiptData.customer.amphur &&
          typeof resFullReceiptData.customer.amphur === 'object'
          ? resFullReceiptData.customer.amphur.name_th
          : 'N/A'
      }}

                        <!-- Check if province exists and is an object -->
                        {{
        resFullReceiptData.customer.province &&
          typeof resFullReceiptData.customer.province === 'object'
          ? resFullReceiptData.customer.province.name_th
          : 'N/A'
      }}
                      </span>
                    </li>
                    <li v-if="resFullReceiptData.customer">
                      <span class="line-height-1"><strong>ไปรษณีย์:</strong>:/Postcode
                        {{ resFullReceiptData.customer.zipcode }}</span>
                      <p class="line-height-1">
                        <strong>เบอร์โทร:</strong>/phon {{ resFullReceiptData.customer.phone_no }}
                      </p>
                      <!-- phone_no -->
                    </li>
                    <li><strong>วันที่:</strong>/Date: {{ resFullReceiptData.sale_date }}</li>
                  </ul>
                </div>

                <div class="col-md-6 col-sm-6 text-right">
                  <ul class="list-unstyled">
                    <span class="text-black"><strong>เลขที่ใบเสร็จ</strong></span>
                    #{{
      resFullReceiptData.sale_number
    }}
                    <li v-if="resFullReceiptData.employee">
                      <strong>พนักงานที่ทำรายการ:</strong>
                      {{ resFullReceiptData.employee.title_name }}
                      {{ resFullReceiptData.employee.first_name }}
                      {{ resFullReceiptData.employee.last_name }}
                    </li>
                    <!-- <li><strong>Account Number:</strong> 012345678901</li>
                                    <li><strong>SWIFT Code:</strong> SWITCH012345678CODE</li>
                                    <li><strong>V.A.T Reg #:</strong> VAT5678901CODE</li> -->
                  </ul>
                </div>
              </div>

              <div class="table-responsive">
                <DataTable :value="resFullReceiptData.sale_details" table-style="min-width: 50rem">
                  <Column field="_supplier_product.supplier_product_code" header="รหัสสินค้า">

                    <template #body="{ data }">
                      {{ data._supplier_product.supplier_product_code }}
                    </template>
                  </Column>
                  <Column field="supplier_product_name" header="ชื่อสินค้า" style="min-width: 10rem">

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
                <div class="flex md:flex-row md:align-items-start md:justify-content-between mt-8">
                  <div class="font-semibold mb-3 md:mb-0"><strong>หมายเหตุ</strong>/Remark</div>
                  <div class="flex flex-column">
                    <div class="flex justify-content-between align-items-center mb-2">
                      <span class="font-semibold mr-6"><strong>จำนวนสินค้าที่ซื้อทั้งหมด</strong></span><span
                        v-if="resFullReceiptData.total_count">{{ formatNumber(resFullReceiptData.total_count) }}
                        ชิ้น</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-2">
                      <span class="font-semibold mr-6"><strong>ช่องทางชำระเงิน</strong>/Payment Methods</span><span>{{
      resFullReceiptData.payment.method_name }}</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-2">
                      <span class="font-semibold mr-6"><strong>ราคาสุทธิก่อนเสียภาษี</strong>/Pre-VAT Amoute</span>
                      <span v-if="resFullReceiptData.total_amount">{{
      formatCurrency(resFullReceiptData.total_before)
    }}</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-2">
                      <span class="font-semibold mr-6"><strong>ภาษีมูลค่าเพิ่ม (บาท) #</strong>/VAT</span>
                      <span v-if="resFullReceiptData.vat">{{
      formatCurrency(resFullReceiptData.vat)
    }}</span>
                    </div>
                    <div class="flex justify-content-between align-items-center">
                      <span class="font-semibold mr-6"><strong>จำนวนเงินทั้งสิ้น (บาท)</strong>/Grand Total</span>
                      <span v-if="resFullReceiptData.total_amount">{{
      formatCurrency(resFullReceiptData.net_amount)
    }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="nomargin-top" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="isShowMiniReceipt" maximizable modal header="ใบเสร็จแบบย่อ" :style="{ width: 'auto' }">
    <div v-if="loadReceipt" class="flex justify-content-center align-items-center">
      <div class="card shadow-6 border-round-xl" style="width: 25rem">
        <div class="card-body mx-4">
          <div class="container">
            <p class="text-center" style="font-size: 25px">ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ</p>
            <div class="row">
              <ul class="list-unstyled">

                <li class="text-muted mt-1">
                  <span class="text-black">เลขที่ใบเสร็จ</span> #{{
      resMiniReceiptData.sale_number
    }}
                </li>
                <li class="text-black mt-1">{{ resMiniReceiptData.sale_date }}</li>
                <li class="text-black mt-1">ชื่อลูกค้า:{{ resMiniReceiptData.name }}</li>
              </ul>
              <hr />
            </div>
            <!-- resMiniReceiptData -->
            <div v-if="resMiniReceiptData.sale_details">
              <div v-for="(item, index) in resMiniReceiptData.sale_details" :key="index" class="row">
                <div class="col-xl-10">
                  <!-- v-if="item.supplier_product_name"  -->
                  <span class="text-wrap">#{{ index + 1 }} {{ item.supplier_product_name }} ({{
      formatCurrency(item.unit_price)
    }}) x {{ formatNumber(item.quantity) }}</span>
                </div>
                <div class="col-xl-2">
                  <p class="float-end">{{ formatCurrency(item.total_price) }}</p>
                </div>
                <hr />
              </div>
            </div>

            <div class="row text-black">
              <hr style="border: 2px solid black" />
              <div v-if="resMiniReceiptData.total_amount" class="col-xl-12">
                <div class="text-sm line-height-1 flex justify-content-between">
                  <div>จำนวนสินค้าทั้งหมดที่ซื้อ:</div>
                  <div v-if="resMiniReceiptData.total_count">
                    {{ formatNumber(resMiniReceiptData.total_count) }} ชิ้น
                  </div>
                </div>
                <div class="text-sm line-height-1 flex justify-content-between">
                  <div>ราคาก่อนรวมภาษี:</div>
                  <div v-if="resMiniReceiptData.total_amount">
                    {{ formatCurrency(resMiniReceiptData.total_before) }}
                  </div>
                </div>
                <div class="text-sm line-height-1 flex justify-content-between">
                  <div>ภาษี:</div>
                  <div v-if="resMiniReceiptData.vat">
                    {{ formatCurrency(resMiniReceiptData.vat) }}
                  </div>
                </div>
                <div class="text-sm line-height-1 flex justify-content-between">
                  <div>จำนวนเงินรวมทั้งหมด:</div>
                  <div v-if="resMiniReceiptData.net_amount">
                    {{ formatCurrency(resMiniReceiptData.net_amount) }}
                  </div>
                </div>
              </div>
              <hr style="border: 2px solid black" />
            </div>
            <div class="text-center" style="margin-top: 90px">
              <!-- <a><u class="text-info">View in browser</u></a> -->
              <p>@MIXVALUE POS RECEIP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="isShowDialogClaimdetail" maximizable modal header="ข้อมูลการเคลม"
    :style="{ width: '900px' }">
    <!-- {{ resGetClaimDetail }} -->
    <div class="p-4">
      <p class="line-height-1">สถานะการเคลม: {{ resGetClaimDetail.status_claim.status_description }}</p>
      <p class="line-height-1">วันที่เคลม: {{ resGetClaimDetail.claim_date }}</p>
      <p class="line-height-1">sku barcode : {{ resGetClaimDetail.sku_barcode }}</p>
      <p class="line-height-1">เหตุผลการเคลม : {{ resGetClaimDetail.claim_reason.reason_description }}</p>
      <p class="line-height-1"></p>
      <p class="line-height-1"></p>

      <div>
        <hr>
        <h6 class="font-bold">ข้อมูลการซื้อ</h6>
        <DataTable :rowClass="rowClass" :value="resGetClaimDetail.sale.sale_details">
          <Column field="supplier_product_name" header="ชื่อสินค้า"></Column>
          <Column field="sku_barcode" header="BARCODE"></Column>
          <Column field="quantity" header="จำนวน">

            <template #body="{ data }">
              {{ formatNumber(data.quantity) }}
            </template>
          </Column>
          <Column field="unit_price" header="ราคา/หน่วย">

            <template #body="{ data }">
              {{ formatCurrency(data.unit_price) }}
            </template>
          </Column>
          <Column field="total_price" header="ราคารวม">

            <template #body="{ data }">
              {{ formatCurrency(data.total_price) }}
            </template>
          </Column>

        </DataTable>
      </div>
      <!-- เหตุผลการเคลม : {{ resGetClaimDetail.claim_reason.reason_description }} -->
    </div>
  </Dialog>

  <Dialog v-model:visible="isShowPdfReceipt" maximizable modal header="ใบเสร็จแบบเต็ม" :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

    <template #header>
      <div
        class="inline-flex align-items-center justify-content-center gap-2 border-2 p-2 cursor-pointer btn btn-success"
        @click="printPDF()">
        <vue-feather type="printer" data-bs-toggle="tooltip" title="fe fe-printer"></vue-feather>
        <span class="font-bold white-space-nowrap" style="font-size: 16pt;">พิมพ์ PDF</span>
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
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, computed, unref, reactive, onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import { parse, format, isWithinInterval } from 'date-fns'
// [ PDF EMBED ]
import VuePdfEmbed from 'vue-pdf-embed'
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

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)
// ************************************* [[ RECEIPT SECTION]] ******************************************
// *****************************************************************************************************

const printReceiptRepeat = async (sale_numbers) => {
  loadingBtn.value = true
  try {
    const printerNumber = localStorage.getItem('printerBranch') || null
    if (!printerNumber) {
      loadingBtn.value = false
      return (alertToast.value = {
        severity: 'warn',
        summary: 'เกิดข้อผิดพลาด',
        detail: 'เลือกปริ้นเตอร์ก่อน'
      })
    }
    const payload = {
      pusher_printer: printerNumber,
      sale_number: sale_numbers
    }
    const res = await dataApi.printRepeat(payload)
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
};
const resCliamReceipt = ref([
  { name: 'ใบเสร็จแบบย่อ', id: 1 },
  { name: 'ใบเสร็จแบบเต็ม', id: 2 },

])
const showReceipt = (id, event) => {
  console.log('event', event.value)
  if (event.value == 'ใบเสร็จแบบย่อ') {
    showMiniReceipt(id)
  }
  else if (event.value == 'ใบเสร็จแบบเต็ม') {
    showPdfReceipt(id)
  }
}

const rowClass = (data) => {
  try {
    return [{ 'bg-orange-400': data.sku_barcode == resGetClaimDetail.value.sku_barcode }];
  } catch (e) {
    console.error(e)
  }

};

const isShowDialogClaimdetail = ref(false);
const resGetClaimDetail = ref()
const onShowClaimDetail = async (id) => {
  await loadClaimDetail(id)
  isShowDialogClaimdetail.value = true;
}
const loadClaimDetail = async (id) => {
  loadingBtn.value = true
  try {
    const res = await dataApi.getClaimByid(id)
    resGetClaimDetail.value = res.data.data
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}

//************* [ Dialog PDF RECEIPT ]
const pdfViewer = ref(null);
function printPDF() {
  // เรียกใช้เมธอด print จาก VuePdfEmbed
  pdfViewer.value.print();
}
const pdfLoading = ref(false);
const handleProgress = (progressData) => {
  pdfLoading.value = true;
  console.log("PDF loading progress:", progressData);
};
const handleLoaded = (pdfDocumentProxy) => {
  pdfLoading.value = false;
  console.log("PDF document loaded:", pdfDocumentProxy);
};

const isShowPdfReceipt = ref(false)
const showPdfReceipt = async (id) => {
  loadDataPdfReceipt(id)
  isShowPdfReceipt.value = true
}

const sourcePdf = ref(null)
const loadDataPdfReceipt = async (id) => {
  loadingBtn.value = true
  try {
    const res = await dataApi.getPdf(id)
    sourcePdf.value = `data:application/pdf;base64,${res.data.base64Pdf}`;
  }
  catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}

const loadReceipt = ref(false)
// *** [ DIALOG LOADIG ]
const isShowFullReceipt = ref(false)
//************* [ Dialog FULL RECEIPT ]
const selectTypeReceipt = ref()
const resFullReceiptData = ref({
  sale_details: null,
  total_amount: null,
  customer: null,
  employee: null
})

const showFullReceipt = async (id) => {
  loadDataFullReceipt(id)
  isShowFullReceipt.value = true
}
const loadDataFullReceipt = async (id) => {
  loadReceipt.value = false
  const res = await dataApi.getReceiptById(id)
  resFullReceiptData.value = res.data.data
  resFullReceiptData.value.sale_details.forEach((e, i) => {
    e.index = i + 1
  })
  console.log('resFullReceiptData', resFullReceiptData.value)
  loadReceipt.value = true
}


//************* [ Dialog MINI RECEIPT ]
const isShowMiniReceipt = ref(false)
const resMiniReceiptData = ref({
  sale_details: null,
  total_amount: null,
  customer: null,
  employee: null
})

const showMiniReceipt = async (id) => {
  loadDataMiniReceipt(id)
  isShowMiniReceipt.value = true
}
const loadDataMiniReceipt = async (id) => {
  loadReceipt.value = false
  const res = await dataApi.getReceiptById(id)
  resMiniReceiptData.value = res.data.data;
  if (
    resMiniReceiptData.value.customer &&
    resMiniReceiptData.value.customer.title_name &&
    resMiniReceiptData.value.customer.first_name &&
    resMiniReceiptData.value.customer.last_name
  ) {
    resMiniReceiptData.value.name = `${resMiniReceiptData.value.customer.title_name} ${resMiniReceiptData.value.customer.first_name} ${resMiniReceiptData.value.customer.last_name}`;
  } else {
    resMiniReceiptData.value.name = "N/A";
  }
  resMiniReceiptData.value.sale_details.forEach((e, i) => {
    e.index = i + 1
  })
  console.log(resMiniReceiptData.value)
  loadReceipt.value = true
}

const closeMiniReceipt = () => {
  isShowMiniReceipt.value = false
}

// *************************************[[ END RECEIPT SECTION]] *****************************************
// *******************************************************************************************************

const resBranchDetail = ref()
const loadBranchDetail = async () => {
  loadingBtn.value = true
  try {
    const res = await dataApi.getBranchDetail()
    resBranchDetail.value = res.data.data
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}

//*********** VALIDATETION ****************
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
  zod.object({
    date_s: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    }),
    date_e: zod.date({
      required_error: requireValue,
      invalid_type_error: requireValue
    })
  })
)
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

//*********** CONST VARIABLE FORM ****************

const { value: date_s } = useField('date_s', null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
})
const { value: date_e } = useField('date_e', null, {
  initialValue: new Date() // กำหนดค่าเริ่มต้นที่นี่
})
const { value: sku_barcode } = useField('sku_barcode', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: employee_id } = useField('employee_id', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})
const { value: payment_method_id } = useField('payment_method_id', null, {
  initialValue: '' // กำหนดค่าเริ่มต้นที่นี่
})


const onSerch = handleSubmit(async (values) => {
  console.log(values)
  loadDataSearch()
})

const resPaymentOption = ref()
const lodaPaymentMethodsOptions = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.getPaymentOption()
    resPaymentOption.value = res.data.data.filter((e) => {
      if (e.is_enabled === 0) {
        return false
      } else {
        e.isActive = false
        return true
      }
    })
    resPaymentOption.value.unshift({ id: '', method_name: 'เลือกทั้งหมด' })
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
  }
  loadingBtn.value = false;
}

const resUserEmployee = ref();
const loadDataUserEmployee = async () => {
  loadingBtn.value = true;
  try {
    const res = await dataApi.getUserEmployee();
    resUserEmployee.value = res.data.data;
    console.log(resUserEmployee.value);
    resUserEmployee.value.forEach((e) => {
      if (e._employee) {
        e.fullname = `${e._employee.title_name} ${e._employee.first_name} ${e._employee.last_name}`
      }
    });
    resUserEmployee.value.unshift({ id: '', fullname: 'เลือกทั้งหมด' })
  } catch (error) {
    loadingBtn.value = false;
    console.error(error)
  }
  loadingBtn.value = false;



};

onMounted(() => {
  lodaPaymentMethodsOptions();
  loadBranchDetail();
  loadDataUserEmployee();
})

const strToDecimals = async (num) => {
  if (num == undefined || num == null) {
    return 0
  }
  const result = await parseFloat(num.replace(/,/g, ''))
  console.log(result)
  return result
}
const isShowData = ref(false)
const resSummaryShift = ref([
  {
    index: null,
    saledate: null,
    sale_number: null,
    cus_fullname: null,
    sale_details_count: null,
    net_amount: null
  }
])
const resGetShiftSummaryDaily = ref({ sum_amount: 0, count_bill: 0, sum_amount_cash: 0, sum_amount_credit_card: 0, sum_amount_qr_payment: 0 })
const resGetShiftImage = ref({})
const loadDataSearch = async () => {
  loadingBtn.value = true
  isShowData.value = false
  const date_sFormat = format(new Date(date_s.value), 'yyyy-MM-dd')
  const date_eFormat = format(new Date(date_e.value), 'yyyy-MM-dd')
  errorAlert.value = false
  try {
    const res = await dataApi.getSummaryReceipt(date_sFormat, date_eFormat, sku_barcode.value, employee_id.value, payment_method_id.value)
    resSummaryShift.value = res.data.data.GetShiftSummary

    // นำไปแปลงเพื่อให้ sort date ได้
    if (resSummaryShift.value.length > 0) {
      resSummaryShift.value.forEach((item, i) => {
        item.payment_method_id = item.payment.method_name
        item.claim_status = item.pos_product_claim ? item.pos_product_claim : null;
        item.index = i + 1
        if (
          (item.employee != null || item.employee != undefined) &&
          item.employee.first_name &&
          item.employee.last_name
        ) {
          item.emp_fullname = `${item.employee.title_name} ${item.employee.first_name} ${item.employee.last_name}`
        } else {
          item.emp_fullname = ''
        }
        if (
          item.customer !== null &&
          item.customer !== undefined &&
          item.customer.first_name !== null &&
          item.customer.first_name !== undefined &&
          item.customer.last_name !== null &&
          item.customer.last_name !== undefined
        ) {
          item.cus_fullname = `${item.customer.title_name} ${item.customer.first_name} ${item.customer.last_name}`
        } else {
          item.cus_fullname = ''
        }
        item.phone_no = (item.customer && item.customer.phone_no) ? item.customer.phone_no : null;


        if (item.sale_date) {
          item.dateonly = format(new Date(item.sale_date), 'HH:mm:ss');
          item.saledate = format(new Date(item.sale_date), 'yyyy-MM-dd')
          item.saledate = new Date(item.saledate)
        } else {
          item.dateonly = null
        }
      })
    }
    resGetShiftImage.value = res.data.data.image_summary;
    resGetShiftSummaryDaily.value = res.data.data.GetShiftSummaryDaily[0]
    resGetShiftSummaryDaily.value.sum_amount = await strToDecimals(
      resGetShiftSummaryDaily.value.sum_amount
    )
    resGetShiftSummaryDaily.value.sum_amount_cash = await strToDecimals(
      resGetShiftSummaryDaily.value.sum_amount_cash
    )
    resGetShiftSummaryDaily.value.sum_amount_credit_card = await strToDecimals(
      resGetShiftSummaryDaily.value.sum_amount_credit_card
    )
    resGetShiftSummaryDaily.value.sum_amount_qr_payment = await strToDecimals(
      resGetShiftSummaryDaily.value.sum_amount_qr_payment
    )
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: res.data.message
    }
    isShowData.value = true
  } catch (error) {
    loadingBtn.value = false
    isShowData.value = false
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

const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    saledate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    },
    dateonly: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    sale_number: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    cus_fullname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    net_amount: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    sale_details_count: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    phone_no: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
  }
}

initFilters()

const clearFilter = () => {
  initFilters()
}

const formatDate = (value) => {
  if (!value) {
    return '' // หรือค่าที่คุณต้องการในกรณีที่ไม่มีค่า
  }
  if (!(value instanceof Date)) {
    // ในกรณีที่ value ไม่ใช่ Date object
    // คุณอาจต้องแปลง value เป็น Date object ก่อน
    value = new Date(value)
  }
  return value.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// ************* customDateFormat ************
const customDateFormat = (date) => {
  if (date) {
    const thaiYear = new Date(date).getFullYear() + 543
    return format(new Date(date), `dd/MM/${thaiYear}`)
  }
}

const formatCurrency = (value) => {
  if (typeof value === 'string') {
    value = value.replace(',', '')
  }
  value = parseFloat(value)
  return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}

const formatNumber = (value) => {
  value = parseInt(value)
  return value.toLocaleString({ style: 'currency', currency: 'THB' })
}

const breadcrumbItems = [{ label: 'สรุปยอดขาย', to: '/report-sale-main' }]

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

<style>
.p-dialog .p-dialog-header {
  border-bottom: 1px solid #e9ecef;
  background: #fff;
  color: #212529;
  padding: 0.5rem;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
</style>
