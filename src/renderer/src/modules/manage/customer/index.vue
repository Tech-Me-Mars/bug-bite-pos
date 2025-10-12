<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="จัดการลูกค้า" title1="" />
      <div class="page-header">
        <div class="page-btn">
          <Button label="เพิ่มลูกค้า" size="small" icon="pi pi-plus" severity="pimary"
            class="mr-2 font-semibold border-round-md" @click="openDialogInsert()" />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <!-- top table -->

        <!-- end top table -->
        <div class="mb-3">
          <Form @submit="onSerch" class="flex w-full row p-0 m-0">
            <div class="col-12 col-md-5 ">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">ชื่อ - นามสกุล</label>
              </div>
              <Dropdown :options="resCustomersOption" filter optionLabel="fullname" optionValue="first_name"
                placeholder="ชื่อ - นามสกุล" class="w-full" v-model="customer_id" />
              <small class="px-2 mt-1 text-red-600">{{ errors.customer_id }}</small>
            </div>

            <div class="col-12 col-md-5">
              <div class="flex justify-content-center">
                <label class="font-semibold text-gray-600 text-center" for="birth_date">เบอร์โทร</label>
              </div>
              <Dropdown :options="resCustomersOption" filter optionLabel="phone_no" optionValue="phone_no"
                placeholder="เบอร์โทร" class="w-full" v-model="phone_no_search" />
              <small class="px-2 mt-1 text-red-600">{{ errors.phone_no_search }}</small>
            </div>



            <div class="col-12 col-md-2 flex align-items-end bg-red ">
              <Button class="w-full text-lg" :loading="loadingBtn" severity="help" icon="pi pi-search" label="ค้นหา"
                size="small" type="submit" />
            </div>

          </Form>
        </div>
        <div class="flex justify-content-between">
          <div class="flex align-items-center">
            <h4 class="card-title">ข้อมูลลูกค้า</h4>
          </div>
          <div class="flex align-items-center">
            <div class="wordset">
              <ul>
                <li>
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <DataTable :exportFilename="`ข้อมูลลูกค้า${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters"
            v-model:selection="selectedRowTable" class="p-datatable-sm" :value="resCustomers" :paginator="true" :rows="10"
            dataKey="id" filterDisplay="menu" ref="dt" :total-records="totalRecords" :first="firstRows" :lazy="true"
            :loading="tabaleLoading" @sort="onSort($event)" @page="onPage($event)"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rows-per-page-options="[2, 5, 10, 25, 50, 75, 100, 500, 1000]"
            currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ"
            :globalFilterFields="['index', 'fullname', 'cid', 'nick_name', 'phone_no']" :pt="{
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
            <template #empty> No customers found. </template>
            <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>-->
            <Column header="รายการที่" field="index" style="min-width: 8rem">
              <template #body="{ data }"> {{ data.index }}</template>
            </Column>

            <Column header="ชื่อ" field="fullname" style="min-width: 8rem">
              <template #body="{ data }">
                <span class="cursor-pointer underline" @click="openDialogHistory(data.phone_no)">
                  {{ data.fullname }}
                </span>

              </template>
            </Column>

            <Column header="ชื่อเล่น" field="nick_name" sortable style="min-width: 8rem">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
              <template #body="{ data }">
                {{ data.nick_name }}
              </template>
            </Column>
            <Column header="เบอร์โทร" class="" sortable field="phone_no">
              <template #sorticon="slotProps">
                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                  <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </div>
                <div v-else>
                  <i class="pi pi-angle-up" style="font-size: 12px"></i>
                </div>
              </template>
            </Column>
            <Column header="อีเมลล์" class="hidden" field="email" sortable style="min-width: 8rem">
            </Column>

            <Column header="รายละเอียดที่อยู่" style="min-width: 8rem">
              <template #body="{ data }">
                <Button :loading="loadingBtn" v-if="data.province" icon="pi pi-building" class="text-red-600 py-1"
                  label="แสดงข้อมูลที่อยู่" severity="warning" outlined @click="openDialogAddress(data)" />
              </template>
            </Column>

            <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible"
              style="min-width: 7rem">
              <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
              <template #body="slotProps">
                <Button :loading="loadingBtn" type="button" @click="openDialogEdit(slotProps.data.id)" icon="pi pi-pencil"
                  style="color: black; background: transparent; border: none" />
                <Button :loading="loadingBtn" @click="confirmDelete(slotProps.data)" type="button" icon="pi pi-trash"
                  style="color: red; background: transparent; border: none" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="dialogAddress" modal header="รายละเอียดที่อยู่" :style="{ width: '500px' }">
      <div class="container">
        <div class="row">
          <div class="col-md-12" v-if="showAddress">
            <address v-if="showAddress.address_no &&
              showAddress.district &&
              showAddress.amphur &&
              showAddress.province
              ">
              <strong>ที่อยู่</strong><br />
              <span v-if="showAddress.address_no">{{ showAddress.address_no }}</span><br />
              <span v-if="showAddress && showAddress.district && showAddress.amphur && showAddress.province
                ">
                {{ showAddress.district.name_th }},{{ showAddress.amphur.name_th }},{{
                  showAddress.province.name_th
                }},
              </span>
              <span class="line-height-1">
                {{ showAddress.zipcode }}
              </span>
              <br />
              <span v-if="showAddress.phone_no">เบอร์โทร:</span> {{ showAddress.phone_no }}
            </address>

            <address>
              <strong>ชื่อ</strong><br />
              <span v-if="showAddress.fullname">{{ showAddress.fullname }}</span>
            </address>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="dialogProcess" maximizable :style="{ width: '800px' }" header="รายละเอียดลูกค้า"
      :modal="true" class="p-fluid">
      <hr class="mb-3" />
      <Form @submit="onSubmit">
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
              <small class="text-red-600">{{ errors.title_name }}</small>
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
              <small class="text-red-600">{{ errors.first_name }}</small>
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
              <small class="text-red-600">{{ errors.last_name }}</small>
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
              <small class="text-red-600">{{ errors.nick_name }}</small>
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
              <small class="text-red-600">{{ errors.cid }}</small>
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
                <InputMask v-model="phone_no" date="phone" @keydown="validatePhoneNumber" mask="(999) 999-9999"
                  placeholder="(099) 999-9999" />
              </div>
            </div>
            <div class="px-2 mt-1">
              <small class="text-red-600">{{ errors.phone_no }}</small>
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
              <small class="text-red-600">{{ errors.address_no }}</small>
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
              <small class="text-red-600">{{ errors.province_id }}</small>
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
              <small class="text-red-600">{{ errors.amphure_id }}</small>
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
              <small class="text-red-600">{{ errors.district_id }}</small>
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
              <small class="text-red-600">{{ errors.zipcode }}</small>
            </div>
          </div>
        </div>
        <hr class="my-3" />
        <div class="flex flex-wrap gap-3 justify-content-end w-full">
          <Button :loading="loadingBtn" label="ยกเลิก" @click="closetDialog" type="button" severity="danger" size="small"
            class="w-auto" />
          <Button :loading="loadingBtn" label="บันทึก" severity="success" icon="pi pi-save" type="submit" size="small"
            class="w-auto" />
        </div>
      </Form>
    </Dialog>

    <Dialog v-model:visible="dialogProcessBuyDetail" maximizable :style="{ width: '1100px' }"
      header="รายละเอียดการซื้อสินค้า" :modal="true" class="p-fluid">
      <div class="">
        <h5><strong>ข้อมูลลูกค้า</strong></h5>
        <ol v-if="resCustomerDetail">
          <li>ชื่อลูกค้า:<span>{{ resCustomerDetail.title_name }} {{ resCustomerDetail.first_name }} {{
            resCustomerDetail.last_name }} </span><span v-if="resCustomerDetail.nick_name">({{
    resCustomerDetail.nick_name }})</span></li>
          <li>เบอร์โทร:<span>{{ resCustomerDetail.phone_no }}</span></li>
        </ol>
      </div>
      <div>

        <hr class="m-0 mb-2">
        <div class="flex justify-content-between">
          <div class="flex align-items-center">
            <h4 class="text-dark font-bold">ข้อมูลการซื้อขาย</h4>
          </div>
          <div class="flex align-items-center">
            <div class="table-top">
              <div class="search-set">
                <div class="search-path">
                  <a class="btn btn-filter" id="filter_search" @click="clearFilter2()" :class="{ setclose: filter }">
                    <img src="@/assets/img/icons/filter.svg" alt="img" />
                    <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
                  </a>
                </div>
                <div class="search-input">
                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                    <label>
                      <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText class="form-control" v-model="filters2['global'].value" placeholder="ค้นหา..." />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
            <div class="wordset">
              <ul>
                <li>
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel" @click="exportCSV2($event)"><img
                      src="@/assets/img/icons/excel.svg" alt="img" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DataTable v-if="resHistorySale" :value="resHistorySale" size="small"
          :exportFilename="`ข้อมูลสรุปยอดขาย${format(new Date(), 'ddMMyyyyHHmmss')}`" v-model:filters="filters2"
          class="p-datatable-sm" :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt_sale_detail"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
          currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="[
            'indexkey',
            'saledate',
            'dateonly',
            'sale_number',
            'sale_details_count',
            'payment_method_id',
          ]" :pt="{
  row: { class: 'p-0' },
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

          <Column header="ลำดับ" field="indexkey" sortable style="min-width: 5rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
            <template #body="{ data }"> {{ data.indexkey }}</template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search..." />
            </template>
          </Column>

          <Column header="เลขที่ใบเสร็จ" field="sale_number" sortable style="min-width: 10rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
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
            style="min-width: 8rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
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
              <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
            </template>
            <template #body="{ data }">
              {{ formatDate(data.saledate) }}
            </template>
          </Column>

          <Column header="เวลา" field="dateonly" sortable style="min-width: 7.5rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
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

          <Column header="จำนวนชิ้น" field="sale_details_count" sortable style="min-width: 8.5rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
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
          <!-- <Column header="จำนวนเงิน" field="total_amount" sortable="total_amount" style="min-width: 12rem">
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
                  {{ formatCurrency(data.total_amount) }}
                </template>
              </Column> -->
          <Column header="ช่องทางชำระเงิน" field="payment_method_id" sortable="payment_method_id"
            style="min-width: 9.5rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
            <template #sorticon="slotProps">
              <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                <i class="pi pi-angle-down" style="font-size: 12px"></i>
              </div>
              <div v-else>
                <i class="pi pi-angle-up" style="font-size: 12px"></i>
              </div>
            </template>
          </Column>

          <Column style="min-width: 4rem" :pt="{bodycell: { class: 'p-0 m-0' }}">
            <template #header>
              <div class="flex-1 text-center">ใบเสร็จ</div>
            </template>
            <template #body="{ data }">
              <div class="p-1">
                <Dropdown :options="resCliamReceipt" optionLabel="name" optionValue="name"
                  @change="(event) => showReceipt(data.sale_number, event)" placeholder="เรียกดูใบเสร็จ"
                  class="w-full md:w-8rem mr-1" />
              </div>
            </template>
          </Column>

        </DataTable>
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

    <Dialog v-model:visible="isShowPdfReceipt" maximizable modal header="ใบเสร็จpdf" :style="{ width: '50vw' }"
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


  </div>
  <ConfirmDelete ref="conFirmation" />
  <Alert :data="alertToast" />
</template>
<script setup>
import { useField, useForm, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
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
// [ FOLDER API ]
import * as dataApi from './api/data.js'
import * as addressDataServices from './api/address.js'

const dialogAddress = ref(false)
const showAddress = ref()
const openDialogAddress = (obj) => {
  dialogAddress.value = true
  showAddress.value = obj
  console.log(showAddress.value)
}

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

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
  // โหลดตำบล
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
// *********************************** [[จบช่วงข้อมูลตั้งต้น]] ***************************

//! /////// [validation] /////////
const requireValue = 'กรุณาระบุข้อมูล'
const validationSchema = toTypedSchema(
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

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
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

const { value: avatar_image } = useField('avatar_image')
const { value: selectedImageUrl } = useField('selectedImageUrl')
//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    const file = files[0]
    selectedImageUrl.value = URL.createObjectURL(file) // สร้าง URL จากไฟล์
    avatar_image.value = file // เก็บไฟล์ที่เลือกลงตัวแปร
  }
}

const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, '')
  if ((number.length >= 2 && ['0', '1', '7', '4'].includes(number[1])) || !['0'].includes(number[0])) {
    event.preventDefault()
    phone_no.value = phone_no.value
  }
}

// *********** [ DIALOG SECTION] **************
const isEditForm = ref(false)
const dialogProcess = ref(false)
const openDialogInsert = () => {
  handleReset()

  isEditForm.value = false
  dialogProcess.value = true
}

const rowEditId = ref()
const openDialogEdit = async (id) => {
  handleReset()
  rowEditId.value = id
  isEditForm.value = true
  console.log(isEditForm.value)
  dialogProcess.value = true
  await loadDataToForm(id)
  await loadAddressWhenEdit(id)
}

const loadDataToForm = async (id) => {
  const res = await dataApi.getCustomerById(id)
  title_name.value = res.data.data.title_name
  first_name.value = res.data.data.first_name
  last_name.value = res.data.data.last_name
  nick_name.value = res.data.data.nick_name
  cid.value = res.data.data.cid
  phone_no.value = res.data.data.phone_no //ต้องres 10 หลัก
  address_no.value = res.data.data.address_no
  if (
    res.data.data.province_id &&
    res.data.data.district_id &&
    res.data.data.district &&
    res.data.data.amphure_id
  ) {
    province_id.value = parseInt(res.data.data.province_id)
    district_id.value = parseInt(res.data.data.district_id)
    amphure_id.value = parseInt(res.data.data.amphure_id)
    zipcode.value = String(res.data.data.district.zip_code)
  }

  console.log('res' + res.data.data.phone_no)
  console.log(phone_no.value)
}

const closetDialog = () => {
  dialogProcess.value = false
  clearFormInput()
}

const clearFormInput = async () => {
  title_name.value = ''
  first_name.value = ''
  last_name.value = ''
  nick_name.value = ''
  cid.value = ''
  phone_no.value = ''
  address_no.value = ''
  province_id.value = null
  district_id.value = null
  amphure_id.value = null
  zipcode.value = ''
}

const conFirmation = ref(null) //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = (obj) => {
  console.log(obj)
  const proCessConfirm = {
    // ส่งชื่อที่จะไปแสดง
    message: obj.fullname,
    accept: () => {
      // เรียกฟังชั่นลบ แล้วส่งID ไป
      deletecustomer(obj.id)
    }
  }
  if (conFirmation.value) {
    conFirmation.value.openDialog(proCessConfirm)
  }
}

const errorAlert = ref(false)
const alertToast = ref({})
const deletecustomer = async (id) => {
  loadingBtn.value = true
  errorAlert.value = false
  try {
    const res = await dataApi.deleteCustomer(id)
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: 'ลบสำเร็จ'
    }
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
  loadData()
}


const tabaleLoading = ref(false);
const paginator = ref({
  page: 1,
  limit: 10
});
const sortField = ref({
  field: null,
  orderby: null
})
const firstRows = ref(0)
const totalRecords = ref(0)
const resLastOrder = ref({ data: null });
const onPage = async (event) => {
  console.log(event);
  firstRows.value = event.first + 1
  paginator.value.page = event.page + 1;
  paginator.value.limit = event.rows;
  await loadData();
};
const onSort = async (event) => {
  console.log(event)
  sortField.value.field = event.sortField;
  if (event.sortOrder == -1) {
    sortField.value.orderby = 'desc';
  } else {
    sortField.value.orderby = 'asc';
  }
  await loadData();
};
// *********** [ DATA SECTION ] ***************
const resCustomersOption = ref([])
const loadSelectOption = async () => {
  try {
    const res = await dataApi.getCustomerNoTable()
    resCustomersOption.value = res.data.data;
    resCustomersOption.value.forEach((e, i) => {
      e.index = i + 1;
      if (
        e.title_name !== undefined &&
        e.title_name !== null &&
        e.first_name !== undefined &&
        e.first_name !== null &&
        e.last_name !== undefined &&
        e.last_name !== null
      ) {
        e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
      } else {
        e.fullname = 'N/A'
      }

      e.full_address = ''
    })
    // resCustomersOption.value.unshift({fullname:'',})
    console.log('resCustomersOption', resCustomersOption.value)
  } catch (error) {
    loadingBtn.value = false
    tabaleLoading.value = false;
    console.error(error);
  }
}

const resCustomers = ref([])
const loadData = async () => {
  try {
    tabaleLoading.value = true;
    loadingBtn.value = true;
    let currentIndex = 1;
    const res = await dataApi.getCustomer(paginator.value, sortField.value, customer_id.value, phone_no_search.value)
    resCustomers.value = res.data.data.data;
    totalRecords.value = res.data.data.total
    firstRows.value = res.data.data.from - 1
    currentIndex = res.data.data.from;
    resCustomers.value.forEach((e, i) => {
      e.index = currentIndex;
      currentIndex++;
      if (
        e.title_name !== undefined &&
        e.title_name !== null &&
        e.first_name !== undefined &&
        e.first_name !== null &&
        e.last_name !== undefined &&
        e.last_name !== null
      ) {
        e.fullname = `${e.title_name} ${e.first_name} ${e.last_name}`
      } else {
        e.fullname = 'N/A'
      }

      e.full_address = ''
    })
    console.log('resCustomers.value', resCustomers.value)

  } catch (error) {
    loadingBtn.value = false
    tabaleLoading.value = false;
    console.error(error);
  }
  loadingBtn.value = false
  tabaleLoading.value = false;


}
onMounted(() => {
  loadSelectOption()
  loadData()
  loadProvinces()
})
const selectedRowTable = ref()
const filters = ref()
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    index: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    fullname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    nick_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    phone_no: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    cid: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  }
}
initFilters()

const onSubmit = handleSubmit((values) => {
  saveCustomer(values)
})

const saveCustomer = async (values) => {
  // isEditForm
  loadingBtn.value = true
  if (cid.value) {
    cid.value = await cid.value.replace(/[^0-9]/g, '')
  }
  phone_no.value = await phone_no.value.replace(/\D/g, '')
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
  formData.append('nick_name', nick_name.value)
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
  // save or update
  try {
    errorAlert.value = false
    if (isEditForm.value != true) {
      console.log('formData In try create', formData)
      const res = await dataApi.saveCustomer(formData)
      alertToast.value = {
        severity: 'success',
        summary: 'ทำรายการสำเร็จ',
        detail: res.data.message
      }
      await clearFormInput()
    } else {
      console.log('formData In try edit', formData)
      const res = await dataApi.updateCustomer(formDataObject, rowEditId.value)
      alertToast.value = {
        severity: 'success',
        summary: 'ทำรายการสำเร็จ',
        detail: res.data.message
      }
      // await clearFormInput();
    }
    loadData()
    dialogProcess.value = false
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

const validationSchema2 = toTypedSchema(
  zod.object({
  })
)

const { handleReset: handleReset2, handleSubmit: handleSubmit2, errors: errors2 } = useForm({
  validationSchema: validationSchema2,
});
const { value: customer_id } = useField("customer_id");
const { value: phone_no_search } = useField("phone_no_search");


const onSerch = handleSubmit2(async (values) => {
  loadData()
  // await handleSubmit2()
  customer_id.value = ""
  phone_no_search.value = ""
});

const resHistorySale = ref({})
const loadHistorySale = async (phon) => {

  try {
    loadingBtn.value = true;
    const payload = { phone_no: phon }
    const res = await dataApi.getSaleHistory(payload);
    resHistorySale.value = res.data.data;
    resHistorySale.value = resHistorySale.value.map((e, i) => {
      const formattedSaleDate = e.sale_date ? format(new Date(e.sale_date), 'yyyy-MM-dd HH:mm:ss') : null;
      return {
        ...e,
        payment_method_id: e.payment.method_name,
        dateonly: formattedSaleDate ? formattedSaleDate.split(' ')[1] : null,
        saledate: formattedSaleDate ? new Date(formattedSaleDate) : null,
        indexkey: i + 1,
      };
    });


    console.log('resHistorySale.value', resHistorySale.value)
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}
const filters2 = ref()
const initFilters2 = () => {
  filters2.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    indexkey: {
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
    sale_details_count: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    payment_method_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },

  }
}
initFilters2()
const clearFilter2 = () => {
  initFilters2()
}

const resCustomerDetail = ref()
const loadCustomerDetail = async (phon) => {
  try {
    loadingBtn.value = true;
    const payload = {
      phone_no: phon
    }
    const res = await dataApi.getCustomerByphon(payload)
    resCustomerDetail.value = res.data.data;
  } catch (error) {
    loadingBtn.value = false
    console.error(error)
  }
  loadingBtn.value = false
}

const dialogProcessBuyDetail = ref(false)
const openDialogHistory = async (phon) => {
  await loadHistorySale(phon)
  await loadCustomerDetail(phon)
  dialogProcessBuyDetail.value = true
}

const formatDate = (value) => {
  return value.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

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

const loadReceipt = ref(false)

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
const dt_sale_detail = ref()
const exportCSV2 = () => {
  dt_sale_detail.value.exportCSV()
}

const breadcrumbItems = [{ label: 'ลูกค้า', to: '/customer' }]
</script>

<style scope></style>
