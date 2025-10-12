<template>
  <div class="content">
    <Breadcrumb :items="breadcrumbItems" class="font-bold" />
    <div class="d-flex justify-content-between">
      <pageheader title="นำเข้าสินค้า" title1="" />
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
        <!-- <h4 class="card-title">ข้อมูลช่องทางชำระเงิน</h4> -->
      </div>

      <TabView class="" :pt="{
        panelContainer: { class: 'border-round-md' },
        nav: {
          style:
            'background-color: transparent; padding: 0; max-height: 4rem; padding: 0px max-h-5rem',
        },
        navContainer: { class: 'p-0' },
      }">
        <TabPanel :pt="{
          inkbar: { class: 'border-2 border-red-600' },
          headerAction: ({ props, parent }) => ({
            class: {
              'text-red-500': parent.state.d_activeIndex === 0,
              'border-bottom-2': parent.state.d_activeIndex === index,
            },
            style: {
              'border-bottom':
                parent.state.d_activeIndex === 0
                  ? '2px solid red'
                  : 'none',
            },
          }),
        }">
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i><span>รายการทั้งหมด</span>
          </template>

          <div class="table-responsive">
            <DataTable class="p-datatable-sm" stripedRows ref="dt" :value="resListGetAll" string dataKey="id"
              :paginator="true" :rows="10" :loading="tableLoading" :filters="filters"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :pt="{
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

              <Column field="indexkey" header="รายการที่" sortable style="min-width: 6rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_code" header="เลขที่ใบร้องขอ" sortable style="min-width: 9rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_date" header="วันที่ส่งคำร้องขอ" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="want_receive_date" header="วันที่ต้องการรับของ" sortable style="min-width: 12rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="to_branch_name" header="สาขา" sortable style="min-width: 13rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_reason_name" header="เหตุผลร้องขอ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="_user._employee.fullname" header="ผู้สร้างรายการ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="status_transfer_requests.status_transfer_request_th" class="text-center" header="" sortable
                style="min-width: 10rem">
                <template #header>
                  <div class="flex-1 text-center">
                    สถานะการอนุมัติ
                  </div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column sortable style="min-width: 10rem">
                <template #header>
                  <div class="flex flex-1 justify-content-center text-center">จัดการ</div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #body="{ data, index }">
                  <div class="flex p-1">
                    <Button :loading="loadingBtn"
                      v-if="data.status_transfer_requests.status_transfer_request == 'pending'" label="นำเข้าสินค้า"
                      size="small" disabled severity="secondary" class="w-full" />
                    <Button :loading="loadingBtn" @click="showDialogImport(data)"
                      v-if="data.status_transfer_requests.status_transfer_request == 'approved'" label="นำเข้าสินค้า"
                      size="small" severity="success" class="w-full" />
                    <Button :loading="loadingBtn" v-if="data.status_transfer_requests.status_transfer_request == 'reject'"
                      label="ปฏิเสธ" size="small" disabled severity="secondary" class="w-full" />
                    <Button :loading="loadingBtn"
                      v-if="data.status_transfer_requests.status_transfer_request == 'received'" label="รับเข้าสาขาแล้ว"
                      size="small" disabled severity="secondary" class="w-full" />
                    <Button :loading="loadingBtn"
                      v-if="data.status_transfer_requests.status_transfer_request == 'completed'" label="นำเข้าสินค้าแล้ว"
                      size="small" disabled severity="secondary" class="w-full" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>

        </TabPanel>
        <TabPanel :pt="{
          inkbar: { class: 'border-2 border-red-600' },
          headerAction: ({ props, parent }) => ({
            class: {
              'text-red-500': parent.state.d_activeIndex === 1,
              'border-bottom-2': parent.state.d_activeIndex === index,
            },
            style: {
              'border-bottom':
                parent.state.d_activeIndex === 1
                  ? '2px solid red'
                  : 'none',
            },
          }),
        }">
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i><span>รออนุมัติ</span>
          </template>
          <p class="m-0">
          <div class="table-responsive">
            <DataTable class="p-datatable-sm" stripedRows ref="dt" :value="resListGetPending" dataKey="id"
              :paginator="true" :loading="tableLoading" :rows="10" :filters="filters"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
              currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :pt="{
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
              <Column field="indexkey" header="รายการที่" sortable style="min-width: 6rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_code" header="เลขที่ใบร้องขอ" sortable style="min-width: 9rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_date" header="วันที่ส่งคำร้องขอ" sortable style="min-width: 10rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="want_receive_date" header="วันที่ต้องการรับของ" sortable style="min-width: 12rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="to_branch_name" header="สาขา" sortable style="min-width: 13rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="request_reason_name" header="เหตุผลร้องขอ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="_user._employee.fullname" header="ผู้สร้างรายการ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column field="status_transfer_requests.status_transfer_request_th" class="text-center" header=""
                sortable="status_transfer_requests.id" style="min-width: 11rem">
                <template #header>
                  <div class="flex-1 text-center">
                    สถานะการอนุมัติ
                  </div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
              <Column sortable style="min-width: 8rem">
                <template #header>
                  <div class="flex flex-1 justify-content-center text-center">จัดการ</div>
                </template>
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
                <template #body="{ data, index }">
                  <div class="flex p-1">
                    <Button :loading="loadingBtn"
                      v-if="data.status_transfer_requests.status_transfer_request == 'pending'" label="นำเข้าสินค้า"
                      size="small" disabled severity="secondary" />
                    <Button :loading="loadingBtn" @click="showDialogImport(data)"
                      v-if="data.status_transfer_requests.status_transfer_request == 'approved'" label="นำเข้าสินค้า"
                      size="small" severity="success" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
          </p>
        </TabPanel>


        <TabPanel :pt="{
          inkbar: { class: 'border-2 border-red-600' },
          headerAction: ({ props, parent }) => ({
            class: {
              'text-red-500': parent.state.d_activeIndex === 2,
              'border-bottom-2': parent.state.d_activeIndex === index,
            },
            style: {
              'border-bottom':
                parent.state.d_activeIndex === 2
                  ? '2px solid red'
                  : 'none',
            },
          }),
        }">
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i><span>อนุมัติแล้ว</span>
          </template>
          <div class="m-0">
            <div class="table-responsive">
              <DataTable class="p-datatable-sm" stripedRows ref="dt" :value="resListGetApprove" dataKey="id"
                :paginator="true" :loading="tableLoading" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :pt="{
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
                <Column field="indexkey" header="รายการที่" sortable style="min-width: 6rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_code" header="เลขที่ใบร้องขอ" sortable style="min-width: 9rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_date" header="วันที่ส่งคำร้องขอ" sortable style="min-width: 10rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="want_receive_date" header="วันที่ต้องการรับของ" sortable style="min-width: 12rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="to_branch_name" header="สาขา" sortable style="min-width: 13rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_reason_name" header="เหตุผลร้องขอ" sortable style="min-width: 11rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="_user._employee.fullname" header="ผู้สร้างรายการ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
                <Column field="status_transfer_requests.status_transfer_request_th" class="text-center" header=""
                  sortable="status_transfer_requests.id" style="min-width: 11rem">
                  <template #header>
                    <div class="flex-1 text-center">
                      สถานะการอนุมัติ
                    </div>
                  </template>
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column sortable style="min-width: 8rem">
                  <template #header>
                    <div class="flex flex-1 justify-content-center text-center">จัดการ</div>
                  </template>
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                  <template #body="{ data, index }">
                    <div class="flex p-1">
                      <Button :loading="loadingBtn"
                        v-if="data.status_transfer_requests.status_transfer_request == 'pending'" label="นำเข้าสินค้า"
                        size="small" disabled severity="secondary" />
                      <Button :loading="loadingBtn" @click="showDialogImport(data)"
                        v-if="data.status_transfer_requests.status_transfer_request == 'approved'" label="นำเข้าสินค้า"
                        size="small" severity="success" />
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </TabPanel>

        <TabPanel :pt="{
          inkbar: { class: 'border-2 border-red-600' },
          headerAction: ({ props, parent }) => ({
            class: {
              'text-red-500': parent.state.d_activeIndex === 3,
              'border-bottom-2': parent.state.d_activeIndex === index,
            },
            style: {
              'border-bottom':
                parent.state.d_activeIndex === 3
                  ? '2px solid red'
                  : 'none',
            },
          }),
        }">
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i><span>นำเข้าสินค้าแล้ว</span>
          </template>
          <div class="m-0">
            <div class="table-responsive">
              <DataTable class="p-datatable-sm" stripedRows ref="dt" :value="resListGetReceived" dataKey="id"
                :paginator="true" :loading="tableLoading" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 75, 100, 500, 1000]"
                currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ">
                <Column field="indexkey" header="รายการที่" sortable style="min-width: 6rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_code" header="เลขที่ใบร้องขอ" sortable style="min-width: 9rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_date" header="วันที่ส่งคำร้องขอ" sortable style="min-width: 10rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="want_receive_date" header="วันที่ต้องการรับของ" sortable style="min-width: 12rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="to_branch_name" header="สาขา" sortable style="min-width: 13rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="request_reason_name" header="เหตุผลร้องขอ" sortable style="min-width: 11rem">
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>
                <Column field="_user._employee.fullname" header="ผู้สร้างรายการ" sortable style="min-width: 11rem">
                <template #sorticon="slotProps">
                  <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                    ">
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                  </div>
                  <div v-else>
                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                  </div>
                </template>
              </Column>
                <Column field="status_transfer_requests.status_transfer_request_th" class="text-center" header=""
                  sortable="status_transfer_requests.id" style="min-width: 10rem">
                  <template #header>
                    <div class="flex-1 text-center">
                      สถานะการอนุมัติ
                    </div>
                  </template>
                  <template #sorticon="slotProps">
                    <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1
                      ">
                      <i class="pi pi-angle-down" style="font-size: 12px"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-angle-up" style="font-size: 12px"></i>
                    </div>
                  </template>
                </Column>

              </DataTable>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>

  <Dialog v-model:visible="dialogProcess" maximizable :style="{ width: '1200px' }" header="รายละเอียดใบร้องขอ"
    :modal="true" class="p-fluid">
    <hr class="mb-1" />
    <Form @submit="onSubmitReceive">
      <div class="card mb-2">
        <div class="card-body line-height-1 " v-if="resRequestDetail">
          <p>เลขที่ใบร้องขอ: {{ resRequestDetail.transfer_request.request_code }}</p>
          <p>วันที่ส่งคำร้องขอ: {{ resRequestDetail.transfer_request.request_date }}</p>
          <p>วันที่ต้องการรับของ: {{ resRequestDetail.transfer_request.want_receive_date }}</p>
          <p>สาขา: {{ resRequestDetail.transfer_request.to_branch_name }}</p>
          <p>เหตุผลร้อง: {{ resRequestDetail.transfer_request.request_reason_name }}</p>
          <p>ผู้สร้างรายการ: {{ empOnDuty }}</p>
        </div>
      </div>
      <div class="card mb-1">
        <div class="card-body line-height-1 py-0">
          <div class="row">
            <div class="col-lg-6 col-sm-6 col-12">
              <div class="form-group">
                <label class="pb-1 font-semibold text-gray-600">Notes</label>
                <div class="">
                  <InputText v-model="notes" placeholder="บันทึกเพิ่มเติม" class="w-full" />
                </div>
                <small class="px-2 mt-1 text-red-600">{{ errors.notes }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-0">
        <div class="card-body line-height-1 mb-0">
          <h4 class="card-title">รายการนำเข้าสินค้า</h4>
          <DataTable class="" stripedRows :value="resRequestProduct" paginator :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50, 75, 100, 500, 1000]" :pt="{
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
            <Column field="" class="text-center" header="" style="min-width: 6rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">รายการที่</div>
              </template>
              <template #body="{ data, index }">
                {{ data.indexkey }}
              </template>
            </Column>
            <Column field="_supplier_product.supplier_product_code" header="" style="min-width: 9rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">รหัสสินค้า</div>
              </template>
            </Column>
            <Column field="supplier_product_name" header="" style="min-width: 12rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">ชื่อสินค้า</div>
              </template>
            </Column>
            <Column field="sku_barcode" header="" style="min-width: 10rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">Barcode</div>
              </template>
            </Column>
            <Column field="unit" header="" style="min-width: 5rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">หน่วยนับ</div>
              </template>
            </Column>
            <Column field="quantity" header="" style="min-width: 8rem">
              <template #header>
                <div class="flex flex-1 justify-content-center text-center">จำนวนเบิก</div>
              </template>
              <template #body="{ data, index }">
                {{ formatNumber(data.quantity) }}
              </template>
            </Column>

          </DataTable>

        </div>
      </div>



      <div class="grid nested-grid" v-if="resRequestDetail">
        <div class="col-5 p-3 mx-auto">
          <div class="bg-orange-500 text-white border-round-lg p-2 text-lg flex justify-content-center">จำนวนรายการทั้งหมด
            {{ formatNumber(resRequestDetail.quantity) }} ชิ้น</div>
        </div>
        <div class="col-5 p-3 mx-auto">
          <div class="bg-orange-500 text-white border-round-lg p-2 text-lg flex justify-content-center">ราคาทั้งหมด {{
            formatCurrency(resRequestDetail.sumprice) }} บาท</div>
        </div>

      </div>
      <hr class="my-3" />
      <div class="flex flex-wrap gap-3 justify-content-end w-full">
        <Button label="ยกเลิก" @click="closetDialog" type="button" severity="secondary" size="small" class="w-auto" />
        <Button label="บันทึก" icon="pi pi-save" :loading="loadingBtn" type="submit" size="small" class="w-auto" />
      </div>
    </Form>
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

// ************* [ LOADING BTN ]
const loadingBtn = ref(false)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const errorAlert = ref(false)
const alertToast = ref({})

onMounted(async () => {
  await loadBranchDetail()
  loadALlLisImport()
})
const branchId = ref()
const resBranchDetail = ref()
const loadBranchDetail = async () => {
  const res = await dataApi.getBranchDetail()
  resBranchDetail.value = res.data.data
  branchId.value = res.data.data.id
}

const resListGetAll = ref()
const resListGetPending = ref()
const resListGetApprove = ref()
const resListGetReceived = ref()

const tableLoading = ref(false)
const loadALlLisImport = async () => {
  tableLoading.value = true;
  const res = await dataApi.getRequestByBranchId(branchId.value)
  console.log(res.data.data)
  resListGetAll.value = res.data.data.get_all;
  resListGetAll.value = resListGetAll.value.map((e, i) => ({
    ...e,
    indexkey: i + 1,
    ...(e._user ? {
      _user: {
        _employee: {
          fullname: `${e._user._employee.title_name} ${e._user._employee.first_name} ${e._user._employee.last_name}`
        }
      }
    } : {})
  }));

  console.log(resListGetAll.value);
  resListGetPending.value = res.data.data.pending;
  resListGetPending.value = resListGetPending.value.map((e, i) => ({
    ...e,
    indexkey: i + 1,
    ...(e._user ? {
      _user: {
        _employee: {
          fullname: `${e._user._employee.title_name} ${e._user._employee.first_name} ${e._user._employee.last_name}`
        }
      }
    } : {})
  }));
  resListGetApprove.value = res.data.data.approved;
  resListGetApprove.value = resListGetApprove.value.map((e, i) => ({
    ...e,
    indexkey: i + 1,
    ...(e._user ? {
      _user: {
        _employee: {
          fullname: `${e._user._employee.title_name} ${e._user._employee.first_name} ${e._user._employee.last_name}`
        }
      }
    } : {})
  }));
  resListGetReceived.value = res.data.data.received;
  resListGetReceived.value = resListGetReceived.value.map((e, i) => ({
    ...e,
    indexkey: i + 1,
    ...(e._user ? {
      _user: {
        _employee: {
          fullname: `${e._user._employee.title_name} ${e._user._employee.first_name} ${e._user._employee.last_name}`
        }
      }
    } : {})
  }));

  tableLoading.value = false;
}

const dialogProcess = ref(false);
const resRequestDetail = ref()
const resRequestProduct = ref()
const empOnDuty = ref()
const closetDialog = () => {
  dialogProcess.value = false
}

const showDialogImport = async (obj) => {
  handleReset()
  request_code.value = obj.request_code
  console.log(obj.request_code)
  loadingBtn.value = true;
  dialogProcess.value = true;
  const payload = {
    request_code: obj.request_code
  }
  errorAlert.value = false
  try {
    const res = await dataApi.getRequestItemReceiveCode(payload)
    // const res = await dataApi.getRequestItemReceiveId(obj.id)
    resRequestDetail.value = res.data.data;
    resRequestProduct.value = res.data.data.transfer_request_item;
    resRequestProduct.value = resRequestProduct.value.map((e, i) => ({
      ...e,
      indexkey: i + 1,
    }));
    if (
      res?.data?.data?.transfer_request?._user?._employee?.title_name &&
      res?.data?.data?.transfer_request?._user?._employee?.first_name &&
      res?.data?.data?.transfer_request?._user?._employee?.last_name
    ) {
      empOnDuty.value = `${res.data.data.transfer_request._user._employee.title_name} ${res.data.data.transfer_request._user._employee.first_name} ${res.data.data.transfer_request._user._employee.last_name}`;
    } else {
      // Handle the case when some properties are missing
      empOnDuty.value = "ไม่มีข้อมูล";
    }
    empOnDuty.value = `${res.data.data.transfer_request._user._employee.title_name} ${res.data.data.transfer_request._user._employee.first_name} ${res.data.data.transfer_request._user._employee.last_name}`
  } catch (error) {
    loadingBtn.value = false;
    console.log(error)
    errorAlert.value = true
    alertToast.value = {
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: error.response.data.message
    }
  }
  loadingBtn.value = false;
};
// *********************************** [[จบช่วงข้อมูลตั้งต้น]] ***************************

//! /////// [validation2] /////////
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
  zod.object({
    // received_date: zod.date({
    //     required_error: requireValue,
    //     invalid_type_error: requireValue
    // }),
    // notes: zod.string().nonempty(requireValue).default(""),
  })

);
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: request_code } = useField("request_code");
const { value: notes } = useField("notes");

const onSubmitReceive = handleSubmit(async (values) => {
  receivedToBranch(values)

});
const receivedToBranch = async (values) => {
  loadingBtn.value = true;
  const toDayReceived = format(new Date(), "yyyy-MM-dd");
  const payload = {
    transfer_request_id: request_code.value,
    received_date: toDayReceived,
    notes: notes.value
  }
  try {
    errorAlert.value = false;
    const res = await dataApi.receivedToBranch(payload);
    alertToast.value = {
      severity: 'success',
      summary: 'ทำรายการสำเร็จ',
      detail: ''
    }
    handleReset();
    dialogProcess.value = false;
    loadALlLisImport()
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
};

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

const formatNumber = (value) => {
  value = parseInt(value)
  return value.toLocaleString({ style: 'currency', currency: 'THB' })
}

const printPage = () => {
  window.print() // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
const breadcrumbItems = [{ label: 'นำเข้าสินค้า', to: '/importproducts' }]
</script>

<style >
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid;
  border-width: 0px;
  border-color: #fff #fff #dee2e6 #fff;
  background: #fff;
  color: #6c757d;
  padding: .75rem 1rem;
  font-weight: 600;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  transition: box-shadow .15s;
  margin: 0 0 -1px 0;
}

.p-datatable.p-datatable-sm .p-datatable-thead>tr>th {
  padding: .5rem .5rem;
}

.p-datatable .p-datatable-thead>tr>th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #dee2e6;
  border-width: 1px 0 2px 0;
  font-weight: 600;
  color: #000000;
  background: #fff;
  transition: box-shadow .15s;
}
</style>
