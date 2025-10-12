<template>
  <!-- Main Wrapper -->
  <div class="h-full my-auto">
    <div class="content m-0 p-0 h-full my-auto">
      <div class="row h-full my-auto px-2">
        <div
          class="col-lg-9 col-sm-12 tabs_wrapper px-4"
          style="
            overflow-y: auto;
            height: 100%;
            background-color: rgb(223, 221, 221);
          "
        >
          <div class="owl-caousel-tab" v-if="resCategory">
            <carousel :settings="settings" :breakpoints="breakpoints">
              <Slide
                class="tabs border-0"
                v-for="item in resCategory"
                :key="item.id"
                @click="
                  handleShowCategory(item.productshow, item.category_name)
                "
                style="padding-top: 15px"
              >
                <li :id="item.posid">
                  <div
                    class="product-details hover:bg-orange-400 hover:shadow-xl overflow-hidden"
                    @click="showCategoryModal"
                  >
                    <img
                      :src="item.image"
                      @error="replaceByDefault"
                      style="width: 50px; height: 50px"
                      alt="img"
                    />
                    <h6>{{ item.category_name }}</h6>
                  </div>
                </li>
              </Slide>
              <template #addons>
                <navigation />
              </template>
            </carousel>
          </div>

          <h4 class="card-title line-height-1">รายการขาย</h4>
          <div class="tabs_container">
            <div class="bg-white mb-0 p-0 mb-3">
              <div
                class="p-1 mb-0 px-3"
                style="min-height: 400px; max-height: 400px"
              >
                <div class="table-responsive mb-2">
                  <DataTable
                    v-model:filters="filters"
                    v-model:selection="selectedRowTable"
                    class="p-datatable-sm"
                    :value="dataItemInList"
                    dataKey="id"
                    filterDisplay="menu"
                    ref="dt"
                    scrollable
                    scrollHeight="390px"
                    :pt="{
                      footer: { class: 'bg-transparent' },
                      row: { class: 'border-none bg-red-600' },
                      tbody: { class: 'font-bold text-xs' },
                      bodyRow: { class: 'border-none' },
                      headerRow: { class: ' border-bottom-2' },

                      row: { class: 'p-0' },
                      // column: { class: 'border-none' },
                      // hooks: { class: 'border-none' },
                      // transition: { class: 'border-none' },
                    }"
                  >
                    <Column
                      header=""
                      field="supplier_product_name"
                      style="min-width 2rem; padding: 0px;"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">ลำดับ</div>
                      </template>

                      <template #body="{ data, index }">
                        {{ index + 1 }}.
                      </template>
                    </Column>

                    <Column
                      field="supplier_product_name"
                      class=""
                      style="min-width: 27rem; max-width: 27rem; padding: 0px"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">
                          รายการ<br />
                          <small class="text-blue-800 text-xs"
                            >รหัสสินค้า</small
                          >
                        </div>
                      </template>

                      <template #body="slotProps">
                        <div class="one-line line-height-1.2 font-">
                          {{ slotProps.data.supplier_product_name }}
                          <br />
                          <small class="text-blue-800 text-sm line-height-10">{{
                            slotProps.data.sku_barcode
                          }}</small>
                        </div>
                      </template>
                    </Column>

                    <Column
                      field="qty"
                      style="min-width: 6rem; max-width: 6rem"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">จำนวน</div>
                      </template>

                      <template #body="{ data, index }">
                        <div
                          class="increment-decrement flex justify-content-center align-items-center"
                        >
                          <div
                            class="input-groups flex justify-content-center align-items-center"
                            style="padding-top: 1px"
                          >
                            <input
                              type="button"
                              value="-"
                              class="button-minus dec button text-red-500"
                              @click="decrement(index)"
                            />
                            <div class="ps-2 pe-2">{{ data.qty }}</div>
                            <input
                              type="button"
                              value="+"
                              class="button-plus inc button text-green-500"
                              @click="increment(index)"
                            />
                          </div>
                        </div>
                      </template>
                    </Column>

                    <Column
                      field="price"
                      header=""
                      style="min-width: 7rem; max-width: 7rem"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">ราคาสินค้า</div>
                      </template>

                      <template #body="slotProps">
                        <div class="text-end">
                          {{ formatCurrency(slotProps.data.price) }}
                        </div>
                      </template>
                    </Column>

                    <Column
                      field=""
                      header=""
                      style="min-width: 5rem; max-width: 5rem"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">ส่วนลด</div>
                      </template>

                      <template #body="slotProps">
                        <div class="text-end">
                          {{ formatCurrency(0) }}
                        </div>
                      </template>
                    </Column>

                    <Column
                      field=""
                      header=""
                      style="min-width: 7rem; max-width: 7rem"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #header>
                        <div class="flex-1 text-center text-sm">ราคาสุทธิ</div>
                      </template>

                      <template #body="slotProps">
                        <div class="text-end text-blue-600">
                          {{ formatCurrency(slotProps.data.sumPriceProduct) }}
                        </div>
                      </template>
                    </Column>

                    <Column
                      field="key"
                      class=""
                      style="min-width: 30px; max-width: 30px"
                      :pt="{
                        bodycell: { class: ' border-none p-0 m-0' },
                        headercell: { class: ' border-none' },
                      }"
                    >
                      <template #body="{ data, index }">
                        <div
                          class="flex justify-content-center align-items-end"
                        >
                          <Button
                            @click="removeItem(data.id)"
                            class="bg-transparent border-none text-red-500"
                            type="button"
                            icon="pi pi-trash"
                            style="height: 15px"
                          />
                        </div>
                      </template>
                    </Column>
                  </DataTable>
                </div>
                <!-- <Button v-if="dataItemInList.length>0" icon="pi pi-dollar" severity="info" class="text-white font-bold" label="PAYMENT" @click="saveOrderComplete()" /> -->
              </div>
            </div>
            <!-- <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1>
            <h1>TOTAL:฿35,000</h1> -->
          </div>

          <div class="bg-white mb-1">
            <div class="grid">
              <div class="col-3 pl-3">
                <div class="flex">
                  <div class="">
                    <h6 class="font-bold text-md mb-0">ข้อมูลลูกค้า</h6>
                    <Badge
                      disable
                      value="+ลูกค้ารายใหม่"
                      class="px-2 cursor-pointer"
                      severity="success"
                      @click="openDialogInsert"
                    ></Badge>
                  </div>
                  <div class="">
                    <img
                      src="@/assets/img/onestop/addnewcustomer.png"
                      alt="Customer Image"
                      class="w-7rem h-3rem"
                    />
                  </div>
                </div>
              </div>
              <div class="col-5">
                <h2
                  v-if="resCustomer"
                  class="one-line font-light line-height-1 text-lg"
                  style="color: rgb(0, 4, 255)"
                >
                  <div
                    v-if="
                      resCustomer.title_name !== '' &&
                      resCustomer.title_name !== null &&
                      resCustomer.first_name !== '' &&
                      resCustomer.first_name !== null &&
                      resCustomer.last_name !== '' &&
                      resCustomer.last_name !== null
                    "
                  >
                    {{ resCustomer.title_name }} {{ resCustomer.first_name }}
                    {{ resCustomer.last_name }}
                  </div>
                  <div v-else>ชื่อลูกค้า: -</div>
                </h2>
                <h2
                  v-else
                  class="one-line font-light line-height-1 text-lg"
                  style="color: rgb(0, 4, 255)"
                >
                  ชื่อลูกค้า: -
                </h2>
                <h2 v-if="resCustomer" class="line-height-1 text-lg">
                  รหัสลูกค้า
                  <span style="color: rgb(0, 119, 255)">{{
                    resCustomer.id
                  }}</span>
                </h2>
                <h2 v-else class="line-height-1 text-lg">
                  รหัสลูกค้า <span style="color: rgb(0, 119, 255)">-</span>
                </h2>
              </div>
              <div class="col-4 flex align-items-start">
                <span class="text-lg mr-2 mt-2">เบอร์โทร</span>
                <InputMask
                  v-model="phone_no_search"
                  date="phone"
                  mask="(999) 999-9999"
                  @keydown.enter.prevent="onSubmitSearchPhon"
                  @keydown="validatePhoneNumber"
                  placeholder="กรอกเบอร์โทรลูกค้า"
                  :pt="{ root: { class: 'bg-gray-400 border-round-md' } }"
                />
              </div>
            </div>
          </div>

          <div class="bg-white bottom-0 Fixed my-auto">
            <div class="flex justify-content-start text-5xl">
              <div class="flex w-6">
                <div class="bg-white text-orange-500 px-2">ชำระเงิน</div>
                <div
                  class="text-dark font-bold bg-orange-500 px-2 flex-1 one-line"
                  style=""
                >
                  {{ formatCurrency(netTotal) }}
                </div>
              </div>
              <div class="flex w-6">
                <div class="bg-white text-orange-500 px-2">ทอนเงิน</div>
                <div
                  class="text-dark font-bold px-2 flex-1 one-line"
                  style="background-color: rgb(55, 145, 247)"
                >
                  {{ formatCurrency(changeMoney) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-3 col-sm-12 right-col px-4 py-2"
          style="background-color: rgb(168, 167, 167)"
        >
          <div class="row">
            <label class="mb-1 font-semibold text-md line-height-1"
              >รหัสบาโค้ด</label
            >
            <div class="col-12 bg-white mb-2">
              <Form @submit="addBarCodeItem">
                <div class="flex">
                  <img
                    src="@/assets/img/onestop/posbarcode.png"
                    class="w-5rem mr-1"
                    alt="barcode"
                    style="height: 32px"
                  />

                  <InputText
                    placeholder=""
                    class="w-full"
                    v-model="barcodeId"
                    @keyup.enter="handleSubmit()"
                    style="height: 33px"
                    :pt="{
                      root: { class: 'bg-gray-400 text-2xl   border-round-md' },
                    }"
                  />
                </div>
              </Form>
            </div>
            <div class="col-12 bg-white mb-2" style="height: 21.7rem">
              <div id="receipt-card">
                <!-- <h3 class="text-2xl line-height-1">สรุปรายการ</h3> -->
                <h6 class="pl-5 text-blue-800 line-height-1">สรุปรายการ</h6>
                <div class="flex">
                  <div class="flex flex-column text-end w-6 line-height-1">
                    <h3 class="text-sm">ราคาก่อนหักภาษี</h3>
                    <h3 class="text-sm">VAT 7%</h3>
                    <h3 class="text-sm">ส่วนลด</h3>
                    <h3 class="text-sm">เงินสุทธิ</h3>
                  </div>
                  <div class="flex flex-column text-end w-6 line-height-1">
                    <h3 class="text-sm">{{ formatCurrency(total_before) }}</h3>
                    <h3 class="text-sm">{{ formatCurrency(vat) }}</h3>
                    <h3 class="text-sm">{{ formatCurrency(discount) }}</h3>
                    <h3 class="text-sm">{{ formatCurrency(netTotal) }}</h3>
                  </div>
                </div>
                <div class="flex flex-row-reverse flex-wrap mb-2">
                  <hr class="m-0 w-10 border-1" />
                </div>
                <h6 class="pl-5 text-blue-800 line-height-1">
                  โปรโมชั่นที่ได้รับ
                </h6>

                <perfect-scrollbar
                  class="scroll-area"
                  :settings="settings"
                  @ps-scroll-y="scrollHanle"
                  style="height: 72px; overflow-y: auto"
                >
                  <div class="line-height-1.2 mb-1">
                    <div
                      class="line-height-1 text-xs text-start flex justify-content-start font-medium"
                      v-for="(item, index) in dataGetPromotion"
                      :key="index"
                    >
                      {{ index + 1 }}. {{ item.promotion_name }}
                    </div>
                  </div>
                </perfect-scrollbar>

                <div class="flex flex-row-reverse flex-wrap mb-2">
                  <hr class="m-0 w-10 border-1" />
                </div>
                <h6 class="pl-5 text-blue-800 line-height-1">คูปองที่ได้รับ</h6>

                <perfect-scrollbar
                  class="scroll-area"
                  :settings="settings"
                  @ps-scroll-y="scrollHanle"
                  style="height: 80px; overflow-y: auto"
                >
                  <div class="line-height-1.2 mb-1">
                    <div
                      class="line-height-1 text-xs text-start flex justify-content-start py-1"
                      v-for="(item, index) in coupon_list"
                      :key="index"
                    >
                      <div class="px-1 font-medium">
                        <i
                          @click="removeCoupon(index)"
                          class="pi pi-times cursor-pointer text-red-500"
                          style="font-size: 10px"
                        ></i>
                        {{ index + 1 }}.
                        <span class="text-gray-600 text-center font-light"
                          >({{ item.coupon_code }})</span
                        >{{ item.name }}
                      </div>
                    </div>
                  </div>
                </perfect-scrollbar>

                <!-- <h6 class="pl-5 text-blue-800 line-height-1">คูปอง</h6> -->
              </div>
            </div>

            <div class="bg-white line-height-1">
              <div class="col-12 bg-white mb-2">
                <Form @submit="CheckCanUseCoupon">
                  <div class="flex">
                    <img
                      src="@/assets/img/onestop/coupon3.png"
                      class="w-5rem h-2rem mr-1"
                      alt="coupon"
                    />
                    <InputText
                      placeholder="ระบุคูปอง โค้ด"
                      v-model="coupon_code"
                      class="w-full"
                      @keyup.enter="handleSubmit5()"
                      :disabled="dataItemInList.length <= 0"
                      :pt="{
                        root: {
                          class: 'bg-gray-400 text-xl h-2rem  border-round-md',
                        },
                      }"
                    />
                  </div>
                </Form>
              </div>
              <label class="mb-1 font-semibold text-md line-height-1"
                >รูปแบบชำระเงิน</label
              >
              <perfect-scrollbar
                class="scroll-area m-0 p-0 mb-1"
                style="height: 108px; overflow-y: auto"
              >
                <div class="grid p-0 m-0 line-height-1">
                  <div
                    class="col-6 mb-0"
                    v-for="(item, index) in resPaymentOption"
                    :key="index"
                    @click="selectPayment(item, index)"
                    style="padding: 2px"
                  >
                    <div
                      v-if="item.id != paymentMethods"
                      class="bg-gray-300 border-1 border-gray-300 flex align-items-center shadow-1 hover:shadow-5 border-round-lg cursor-pointer"
                    >
                      <img
                        :src="item.image ? item.image : replaceByDefault"
                        @error="replaceByDefault"
                        class="p-2"
                        style="width: 55px; height: 42px"
                        alt=""
                      />
                      <h6 class="text-sm text-center">
                        {{ item.method_name }}
                      </h6>
                    </div>
                    <div
                      v-else
                      class="bg-orange-500 text-white flex align-items-center shadow-1 hover:shadow-5 border-round-lg cursor-pointer"
                    >
                      <img
                        :src="item.image"
                        @error="replaceByDefault"
                        class="w-4rem h-3rem p-2"
                        alt=""
                      />
                      <h6 class="text-sm text-center">
                        {{ item.method_name }}
                      </h6>
                    </div>
                  </div>
                </div>
              </perfect-scrollbar>

              <div class="flex justify-content-between m-0 p-0 p2-2">
                <!-- <img src="@/assets/img/onestop/calculator2.png" @click="focusInputNumber"
                  class="w-5rem mr-1 cursor-pointer" alt="barcode" style="height: 55px" /> -->
                <InputNumber
                  id="inputGetMoney"
                  placeholder="กรอกยอดเงิน"
                  class="w-full pb-1"
                  :min="0"
                  v-model="getMoney"
                  :disabled="!isCashPayment"
                  @input="onKeyGetMoney"
                  @click="focusInputNumber"
                  :minFractionDigits="2"
                  ref="inputGetMoney"
                  :pt="{
                    root: {
                      class: 'bg-white text-2xl border-round-xl max-w-16rem',
                      style: { height: '55px' },
                    },
                    input: { class: 'text-4xl max-w-16rem font-bold' },
                  }"
                />
                <img
                  v-if="
                    getMoney >= netTotal &&
                    getMoney != 0 &&
                    paymentMethods != null
                  "
                  src="@/assets/img/onestop/Approved_Bill.png"
                  @click="saveOrderComplete"
                  class="cursor-pointer"
                  alt="barcode"
                  style="height: 55px; width: 50px"
                />
                <img
                  v-else
                  src="@/assets/img/onestop/Bill_Payment.png"
                  class="cursor-pointer"
                  alt="barcode"
                  style="height: 55px; width: 50px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- customemodal -->
    <Dialog
      v-model:visible="dialogProcess"
      maximizable
      :style="{ width: '1200px' }"
      :header="`รายการ CATEGORY ${catagoryName}`"
      :modal="true"
      class="p-fluid"
    >
      <!-- <hr class="mb-3" /> -->
      <div data-tab="fruits">
        <div class="row">
          <div
            class="col-lg-2 col-sm-6 d-flex pointer-events-auto"
            v-for="(item, index) in objCateryShow"
            :key="index"
          >
            <div class="productset flex-fill">
              <div class="productsetimg">
                <img
                  :src="
                    item.branchitem?._supplier_product?.image ||
                    replaceByDefault
                  "
                  @error="replaceByDefault"
                  style="width: 120px; height: 110px"
                  alt="img"
                />
                <!-- <h6 class="text-white bg-red-500 border-0"><i class="pi pi-trash" style="font-size: 1rem"></i></h6> -->
                <div class="check-product">
                  <i class="fa fa-check"></i>
                </div>
              </div>
              <div class="productsetcontent">
                <div class="h-3rem">
                  <h4>{{ item.supplier_product_name }}</h4>
                </div>
                <!-- <h5>{{ item.description }}</h5> -->
                <div v-if="item.branchitem">
                  <h6>
                    {{ formatCurrency(item.branchitem.branch_item_price) }}
                  </h6>
                  <Button
                    size="small"
                    @click="AddItemTocart(item)"
                    class=""
                    label="เพิ่ม"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="dialogProcessCustomer"
      maximizable
      :style="{ width: '800px' }"
      header="รายละเอียดลูกค้า"
      :modal="true"
      class="p-fluid"
    >
      <TabView
        class=""
        :pt="{
          panelContainer: { class: 'border-round-md' },
          nav: {
            style:
              'background-color: transparent; padding: 0; max-height: 4rem; padding: 0px max-h-5rem',
          },
          navContainer: { class: 'p-0' },
        }"
      >
        <TabPanel
          :pt="{
            inkbar: { class: 'border-2 border-red-600' },
            headerAction: ({ props, parent }) => ({
              class: {
                'text-red-500': parent.state.d_activeIndex === 0,
                'border-bottom-2': parent.state.d_activeIndex === index,
              },
              style: {
                'border-bottom':
                  parent.state.d_activeIndex === 0 ? '2px solid red' : 'none',
              },
            }),
          }"
        >
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i
            ><span>ข้อมูลลูกค้าแบบย่อ</span>
          </template>
          <Form @submit="onSubmitCreateCustomerMini">
            <div class="grid">
              <!-- <div class="col-12">
                <div>
                  <label for="branch_name_mini" class="pb-3 font-semibold text-gray-600 col-12">คำนำหน้า</label>
                  <div class="w-full">
                    <Dropdown filter autoFilterFocus v-model="title_name_mini" :options="itemTitleName" optionLabel="name"
                      optionValue="name" placeholder="คำนำหน้า" class="" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.title_name_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="first_name_mini" class="pb-3 font-semibold text-gray-600 col-12">ชื่อ</label>
                  <div class="w-full">
                    <InputText v-model="first_name_mini" placeholder="ชื่อ" class="" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.first_name_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="last_name_mini" class="pb-3 font-semibold text-gray-600 col-12">นามสกุล</label>
                  <div class="w-full">
                    <InputText v-model="last_name_mini" placeholder="นามสกุล" class="" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.last_name_mini }}</small>
                </div>
              </div> -->

              <div class="col-12">
                <div>
                  <label
                    for="nick_name_mini"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >ชื่อเล่น</label
                  >
                  <div class="w-full">
                    <InputText
                      v-model="nick_name_mini"
                      placeholder="ชื่อเล่น"
                      class=""
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{
                    errors4.nick_name_mini
                  }}</small>
                </div>
              </div>

              <!-- <div class="col-12">
                <div>
                  <label for="cid_mini" class="pb-3 font-semibold text-gray-600 col-12">เลขประจำตัวประชาชน</label>
                  <div class="w-full">
                    <InputMask v-model="cid_mini" mask="9-9999-99999-99-9" placeholder="x-xxxx-xxxxx-xx-x" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.cid_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <div class="form-group">
                    <label class="pb-3 font-semibold text-gray-600 col-12"> รูปโปรไฟล์</label>
                    <div class="flex">
                      <Avatar :image="selectedImageUrl_mini !== null && selectedImageUrl_mini !== ''
                        ? selectedImageUrl_mini
                        : '@/public/image/image404.jpg'
                        " class="mr-2" :class="{ 'bg-transparent': selectedImageUrl_mini }" size="xlarge"
                        shape="circle" />
                      <div class="image-upload">
                        <input class="" type="file" accept="image/*" :maxFileSize="1000000" @change="onUploadMini"
                          label="อัพโหลดรูปภาพ" />
                        <div class="image-uploads">
                          <img src="../../assets/img/icons/upload.svg" alt="img" />
                          <h4>เลือกหรือลากภาพไฟล์ลงไปเพื่ออัพโหลดไฟล์...</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

              <div class="col-12">
                <div>
                  <label
                    for="phone_no_mini"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >หมายเลขโทรศัพท์</label
                  >
                  <div class="w-full">
                    <InputMask
                      v-model="phone_no_mini"
                      @keydown="validatePhoneNumberPhoneMini"
                      date="phone"
                      mask="(999) 999-9999"
                      placeholder="(099) 999-9999"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{
                    errors4.phone_no_mini
                  }}</small>
                </div>
              </div>

              <!-- <div class="col-12">
                <div>
                  <label for="address_no_mini" class="pb-3 font-semibold text-gray-600 col-12">รายละเอียดที่อยู่</label>
                  <div class="w-full">
                    <Textarea v-model="address_no_mini" autoResize rows="5" cols="30" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.address_no_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="province_id_mini" class="pb-3 font-semibold text-gray-600 col-12">จังหวัด</label>
                  <div class="w-full">
                    <Dropdown filter autoFilterFocus v-model="province_id_mini" :options="resProvincesOption_mini"
                      optionLabel="name_th" optionValue="id" placeholder="จังหวัด" class="w-full"
                      @change="handleProvinceChangeMini" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.province_id_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="amphure_id_mini" class="pb-3 font-semibold text-gray-600 col-12">อำเภอ</label>
                  <div class="w-full">
                    <Dropdown filter autoFilterFocus v-model="amphure_id_mini" :options="resAmphuresOption_mimi"
                      optionLabel="name_th" optionValue="id" placeholder="อำเภอ" class="w-full"
                      @change="handleAmphureChangeMini" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.amphure_id_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="district_id_mini" class="pb-3 font-semibold text-gray-600 col-12">ตำบล</label>
                  <div class="w-full">
                    <Dropdown filter autoFilterFocus v-model="district_id_mini" :options="resDistrictsOptionmini"
                      optionLabel="name_th" optionValue="id" placeholder="ตำบล" class="w-full"
                      @change="handleDistrictChangeMini()" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.district_id_mini }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="zipcode_mini" class="pb-3 font-semibold text-gray-600 col-12">ไปรษณีย์</label>
                  <div class="w-full">
                    <InputText id="zipcode_mini" v-model="zipcode_mini" :disabled="!district_id_mini" type="text"
                      placeholder="รหัสไปรษณื" />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors4.zipcode_mini }}</small>
                </div>
              </div> -->
            </div>
            <hr class="my-3" />
            <div class="flex flex-wrap gap-3 justify-content-end w-full">
              <Button
                label="ยกเลิก"
                @click="closetDialogInsert"
                type="button"
                severity="secondary"
                size="small"
                class="w-auto"
              />
              <Button
                label="บันทึก"
                :loading="loadingBtn"
                type="submit"
                size="small"
                class="w-auto"
              />
            </div>
          </Form>
        </TabPanel>
        <TabPanel
          :pt="{
            inkbar: { class: 'border-2 border-red-600' },
            headerAction: ({ props, parent }) => ({
              class: {
                'text-red-500': parent.state.d_activeIndex === 1,
                'border-bottom-2': parent.state.d_activeIndex === index,
              },
              style: {
                'border-bottom':
                  parent.state.d_activeIndex === 1 ? '2px solid red' : 'none',
              },
            }),
          }"
        >
          <template #header>
            <i class="mr-2 pi pi-circle-fill"></i
            ><span>ข้อมูลลูกค้าแบบเต็ม</span>
          </template>
          <Form @submit="onSubmitCreateCustomer">
            <div class="grid">
              <div class="col-12">
                <div>
                  <label
                    for="branch_name"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >คำนำหน้า</label
                  >
                  <div class="w-full">
                    <Dropdown
                      filter
                      autoFilterFocus
                      v-model="title_name"
                      :options="itemTitleName"
                      optionLabel="name"
                      optionValue="name"
                      placeholder="คำนำหน้า"
                      class=""
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.title_name }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="first_name"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >ชื่อ</label
                  >
                  <div class="w-full">
                    <InputText
                      v-model="first_name"
                      placeholder="ชื่อ"
                      class=""
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.first_name }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="last_name"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >นามสกุล</label
                  >
                  <div class="w-full">
                    <InputText
                      v-model="last_name"
                      placeholder="นามสกุล"
                      class=""
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.last_name }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="nick_name"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >ชื่อเล่น</label
                  >
                  <div class="w-full">
                    <InputText
                      v-model="nick_name"
                      placeholder="ชื่อเล่น"
                      class=""
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.nick_name }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="cid"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >เลขประจำตัวประชาชน</label
                  >
                  <div class="w-full">
                    <InputMask
                      v-model="cid"
                      mask="9-9999-99999-99-9"
                      placeholder="x-xxxx-xxxxx-xx-x"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.cid }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <div class="form-group">
                    <label class="pb-3 font-semibold text-gray-600 col-12">
                      รูปโปรไฟล์</label
                    >
                    <div class="flex">
                      <Avatar
                        :image="
                          selectedImageUrl !== null && selectedImageUrl !== ''
                            ? selectedImageUrl
                            : '@/public/image/image404.jpg'
                        "
                        class="mr-2"
                        :class="{ 'bg-transparent': selectedImageUrl }"
                        size="xlarge"
                        shape="circle"
                      />
                      <div class="image-upload">
                        <input
                          class=""
                          type="file"
                          accept="image/*"
                          :maxFileSize="1000000"
                          @change="onUpload"
                          label="อัพโหลดรูปภาพ"
                        />
                        <div class="image-uploads">
                          <img
                            src="../../assets/img/icons/upload.svg"
                            alt="img"
                          />
                          <h4>เลือกหรือลากภาพไฟล์ลงไปเพื่ออัพโหลดไฟล์...</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="phone_no"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >หมายเลขโทรศัพท์</label
                  >
                  <div class="w-full">
                    <InputMask
                      v-model="phone_no"
                      @keydown="validatePhoneNumberPhoneFull"
                      date="phone"
                      mask="(999) 999-9999"
                      placeholder="(099) 999-9999"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.phone_no }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="address_no"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >รายละเอียดที่อยู่</label
                  >
                  <div class="w-full">
                    <Textarea
                      v-model="address_no"
                      autoResize
                      rows="5"
                      cols="30"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.address_no }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="province_id"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >จังหวัด</label
                  >
                  <div class="w-full">
                    <Dropdown
                      filter
                      autoFilterFocus
                      v-model="province_id"
                      :options="resProvincesOption"
                      optionLabel="name_th"
                      optionValue="id"
                      placeholder="จังหวัด"
                      class="w-full"
                      @change="handleProvinceChange"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.province_id }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="amphure_id"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >อำเภอ</label
                  >
                  <div class="w-full">
                    <Dropdown
                      filter
                      autoFilterFocus
                      v-model="amphure_id"
                      :options="resAmphuresOption"
                      optionLabel="name_th"
                      optionValue="id"
                      placeholder="อำเภอ"
                      class="w-full"
                      @change="handleAmphureChange"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.amphure_id }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="district_id"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >ตำบล</label
                  >
                  <div class="w-full">
                    <Dropdown
                      filter
                      autoFilterFocus
                      v-model="district_id"
                      :options="resDistrictsOption"
                      optionLabel="name_th"
                      optionValue="id"
                      placeholder="ตำบล"
                      class="w-full"
                      @change="handleDistrictChange()"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.district_id }}</small>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label
                    for="zipcode"
                    class="pb-3 font-semibold text-gray-600 col-12"
                    >ไปรษณีย์</label
                  >
                  <div class="w-full">
                    <InputText
                      id="zipcode"
                      v-model="zipcode"
                      :disabled="!district_id"
                      type="text"
                      placeholder="รหัสไปรษณื"
                    />
                  </div>
                </div>
                <div class="px-2 mt-1">
                  <small class="text-red-600">{{ errors3.zipcode }}</small>
                </div>
              </div>
            </div>
            <hr class="my-3" />
            <div class="flex flex-wrap gap-3 justify-content-end w-full">
              <Button
                label="ยกเลิก"
                @click="closetDialogInsert"
                type="button"
                severity="secondary"
                size="small"
                class="w-auto"
              />
              <Button
                label="บันทึก"
                :loading="loadingBtn"
                type="submit"
                size="small"
                class="w-auto"
              />
            </div>
          </Form>
        </TabPanel>
      </TabView>
    </Dialog>

    <div class="modal" :class="{ show: isModalPrinterOpen }">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
          </div> -->
          <div class="modal-body">
            <div class="row">
              <!-- Your modal body content goes here -->
              <img src="@/assets/img/onestop/printer.gif" alt="GIF" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
    <MyModal :show="modalShow" @close="closeModal">
      <img src="path/to/your/gif.gif" alt="GIF">
    </MyModal>
  </div> -->
  </div>
  <Alert :data="alertToast" />
</template>

<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import { useField, useForm, Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { format } from "date-fns";
import { SearchOutlined } from "@ant-design/icons-vue";
import {
  ref,
  computed,
  unref,
  reactive,
  onMounted,
  watch,
  onBeforeUnmount,
  inject,
  watchEffect,
} from "vue";
import VirtualScroller from "primevue/virtualscroller";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import Alert from "@/components/gobal/Alert.vue"; // [[ IMPORT COMPONENT Alert]]
import * as dataApi from "./api/data.js";
import * as addressDataServices from "./api/address.js";
import defaultImg from "@/assets/img/image404.jpg";

const refIsPull = ref(false);

// Define the reactive data and methods
const eventBus = inject("eventBus");
onMounted(() => {
  eventBus.on("stayData", (isPull) => {
    refIsPull.value = isPull;
  });
});

const initializeDataItemStay = async (isPull) => {
  const storedData = localStorage.getItem("dataItemStay");

  if (
    storedData !== null &&
    storedData !== "" &&
    JSON.parse(storedData)?.length !== 0
  ) {
    if (isPull != true) {
      return;
    }

    console.log("ดึง");
    // ถ้า localStorage มีค่าและไม่ใช่ '' ดึงค่าลง dataItemInList
    dataItemInList.value = [];
    dataItemInList.value = JSON.parse(storedData);
    localStorage.removeItem("dataItemStay");
    clearMoneyForNewCal();
    await calculateNetTotal();
  } else {
    if (isPull != false) {
      return;
    }
    clearMoneyForNewCal();
    console.log("อัพขึ้น");
    if (dataItemInList.value.length == 0) {
      return;
    }
    // ถ้าไม่ใช่ ให้เอาค่าจาก dataItemStay มาเก็บลงใน localStorage
    localStorage.removeItem("dataItemStay");
    localStorage.setItem("dataItemStay", JSON.stringify(dataItemInList.value));
    dataItemInList.value = [];
    // dataItemInList.value = null;

    await handleReset2(); // ล้างข้อมูลลูกค้า
    await clearSale();
  }
};
// const dataItemInList = ref([])
// ************* [ LOADING BTN ]
const loadingBtn = ref(false);

const replaceByDefault = (e) => {
  e.target.src = defaultImg;
};

const paymentMethods = ref();
const resPaymentOption = ref();
const lodaPaymentMethodsOptions = async () => {
  const res = await dataApi.getPaymentOption();
  resPaymentOption.value = res.data.data.filter((e) => {
    if (e.is_enabled === 0) {
      return false;
    } else {
      e.isActive = false;
      return true;
    }
  });
};

const dataGetPromotion = ref([]);

// ตัวแปรเงินหลัก
const netTotal = ref(0); //เงินที่ต้องจ่าย
const total_before = ref(0); //เงินรวมก่อนหักภาษี
const vat = ref(0); //ภาษี
const discount = ref(0); //ส่วนลด
const getMoney = ref(0); //เงินที่รับ
const changeMoney = ref(0); //เงินทอน

const loadCalculationPromotion = async () => {
  errorAlert.value = false;

  const promotion_id = coupon_list.value.map((item) => item.coupon_code);
  const cart = dataItemInList.value.map((item) => ({
    sku_barcode: item.sku_barcode,
    qty: item.qty,
  }));
  // const promotion_id d
  let cusId = "";
  if (resCustomer.value && resCustomer.value.id) {
    cusId = resCustomer.value.id;
  }
  const payload = {
    customer_id: cusId,
    promotion_id: promotion_id,
    cart: cart,
  };
  console.log(JSON.stringify(payload));
  try {
    const res = await dataApi.orderCalculator(payload);
    console.log(res);
    netTotal.value = res.data.data.common.net;
    console.log("Net value", res.data.data.common.net);
    vat.value = res.data.data.common.vat;
    total_before.value = res.data.data.common.total_before;
    discount.value = res.data.data.common.discount;
    dataGetPromotion.value = res.data.data.data_promotion;
    console.log(dataGetPromotion.value);
    if (isCashPayment.value != true) {
      getMoney.value = res.data.data.common.net;
    }
  } catch (error) {
    console.log(error);
    // if (error.response.data.message == "กรุณาเลือกลูกค้า") {
    // alert(error.response.data.message)
    // alert(JSON.stringify(error.response.data.message))
    coupon_list.value.pop();
    // }
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
};
//**************** [[ เก็บรายการในตระกร้า ]] */
const dataItemInList = ref([]);

const isCashPayment = ref(false);
const selectPayment = async (obj, index) => {
  if (dataItemInList.value.length <= 0) {
    return;
  }

  isCashPayment.value = false;
  resPaymentOption.value.forEach((e) => {
    e.isActive = false;
  });
  paymentMethods.value = obj.id;
  resPaymentOption.value[index].isActive = true;
  if (obj.method_name == "เงินสด") {
    isCashPayment.value = true;
  } else {
    changeMoney.value = 0;
    getMoney.value = netTotal.value;
  }
  await loadCalculationPromotion();
  calculateChangeMoney();
};

const focusInputNumber = () => {
  const inputElement = document
    .getElementById("inputGetMoney")
    ?.querySelector("input");
  if (inputElement) {
    inputElement.focus();
    inputElement.select();
  }
};

const onKeyGetMoney = async (event) => {
  if (event.value) {
    getMoney.value = parseFloat(event.value);
  } else {
    getMoney.value = 0;
  }
  calculateChangeMoney();
};
const calculateChangeMoney = () => {
  console.log("calculateChangeMoney");
  if (getMoney.value == undefined || getMoney.value == null) {
    return (changeMoney.value = 0);
  }
  changeMoney.value = getMoney.value - netTotal.value;
  if (changeMoney.value < 0) {
    changeMoney.value = 0;
  }
};

const AddItemTocart = async (obj) => {
  paymentMethods.value = null;
  let can_add_max = null;
  if (obj.branchitem != null && obj.branchitem.qty != null) {
    can_add_max = obj.branchitem.qty;
  }
  const foundItem = dataItemInList.value.find(
    (item) => item.supplier_product_id == obj.supplier_product_id
  );
  if (foundItem) {
    if (foundItem.qty == foundItem.can_add_max) {
      return (alertToast.value = {
        severity: "error",
        summary: "ทำรายการไม่สำเร็จ",
        detail: "สินค้าในคลังไม่เพียงพอ",
      });
    }
    foundItem.qty += 1;
    foundItem.sumPriceProduct =
      foundItem.qty * (foundItem.price - foundItem.discoute);
  } else {
    let price = parseFloat(obj.branchitem.branch_item_price);
    const objPush = {
      ...obj,
      qty: 1,
      price: price,
      discoute: 0,
      sumPriceProduct: price,
      can_add_max: can_add_max,
    };
    dataItemInList.value.push(objPush);
  }
  // calculateNetTotal()
  clearMoneyForNewCal();
  calculateNetTotal();
};

const resBranchDetail = ref();
const loadBranchDetail = async () => {
  const res = await dataApi.getBranchDetail();
  resBranchDetail.value = res.data.data;
};
onMounted(() => {
  getCategoryShow();
  lodaPaymentMethodsOptions();
  loadProvinces();
  loadProvincesMini();
  loadBranchDetail();
});

const resCategory = ref();
const getCategoryShow = async () => {
  const res = await dataApi.getCategoryShow();
  resCategory.value = res.data.data;
  console.log("resCategory", resCategory.value);
};

const catagoryName = ref();
const objCateryShow = ref();
const handleShowCategory = async (obj, name) => {
  catagoryName.value = name;
  objCateryShow.value = obj;
};

const errorAlert = ref(false);
const alertToast = ref({});
//*********** VALIDATETION KEY BARCODE ****************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
  zod.object({
    barcodeId: zod.string().nonempty(requireValue).default(""),
  })
);
const { handleReset, handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: barcodeId } = useField("barcodeId");

const addBarCodeItem = handleSubmit(async (values) => {
  // validate เสร็จแล้วมาเขีย
  appendItemtoForm();
});

const AddItemTocartBacode = async (obj) => {
  console.log("dataItemInList", dataItemInList.value);
  paymentMethods.value = null;
  const foundItem = dataItemInList.value.find(
    (item) => item.supplier_product_id == obj.supplier_product_id
  );
  if (foundItem) {
    //ครั้งต่อไป
    if (foundItem.qty == foundItem.can_add_max) {
      return (alertToast.value = {
        severity: "error",
        summary: "ทำรายการไม่สำเร็จ",
        detail: "สินค้าในคลังไม่เพียงพอ",
      });
    }
    foundItem.qty += 1;
    foundItem.sumPriceProduct =
      foundItem.qty * (foundItem.price - foundItem.discoute);
  } else {
    //ครั้งแรก
    let price = parseFloat(obj.branch_item_price);
    const objPush = {
      ...obj,
      qty: 1,
      price: price,
      discoute: 0,
      sumPriceProduct: price,
      can_add_max: obj.qty,
    };
    dataItemInList.value.push(objPush);
  }
  // await calculateNetTotal()
  clearMoneyForNewCal();
  await calculateNetTotal();
};

const appendItemtoForm = async (values) => {
  const payload = {
    sku_barcode: barcodeId.value, //ไปหาดูได้จาก get-branch-item-all
    branch_id: resBranchDetail.value.id, //ล็อคไว้ก่อน
  };
  try {
    errorAlert.value = false;
    // ************* [ เอาเลขbarcode ไปค้นหาจำนวน และราคา ] ******************
    const res = await dataApi.getItemSkuBarCode(payload);
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: "",
      error: false,
    };
    // ************* [ หลังจากได้ข้อมูลสินค้ามาแล้วเอาไปpush แสดงบนTABLE ] ******************

    await AddItemTocartBacode(res.data.data);
    await clearMoneyForNewCal();
    await calculateNetTotal();
    console.log(dataItemInList.value);
  } catch (error) {
    console.log(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
  handleReset();
};

const clearMoneyForNewCal = async () => {
  paymentMethods.value = null;
  // dataItemInList.value = []
  dataGetPromotion.value = [];
  total_before.value = 0;
  vat.value = 0;
  discount.value = 0;
  getMoney.value = 0;
  changeMoney.value = 0;
  netTotal.value = 0;
  coupon_list.value = [];
  coupon_code.value = "";
};
const removeItem = async (id) => {
  clearMoneyForNewCal();
  const indexToRemove = dataItemInList.value.findIndex((item) => item.id == id);
  if (indexToRemove !== -1) {
    dataItemInList.value.splice(indexToRemove, 1);
  }
  await calculateNetTotal();
};
const isModalPrinterOpen = ref(false);

const saveOrderComplete = async () => {
  if (dataItemInList.value.length <= 0) {
    return;
  }
  const printerNumber = localStorage.getItem("printerBranch") || null;
  if (!printerNumber) {
    return (alertToast.value = {
      severity: "warn",
      summary: "เกิดข้อผิดพลาด",
      detail: "เลือกปริ้นเตอร์ก่อน",
    });
  }
  // ******* [ MAP DATA เพื่อเก็บเอาแค่ KEY sku_barcode กับ qty] ************
  const cart = dataItemInList.value.map((item) => ({
    sku_barcode: item.sku_barcode,
    qty: item.qty,
  }));
  let cusId = "";
  if (resCustomer.value && resCustomer.value.id) {
    cusId = resCustomer.value.id;
  }
  const promotion_id = coupon_list.value.map((item) => item.coupon_code);
  const payload = {
    customer_id: cusId,
    payment_method_id: paymentMethods.value,
    pusher_printer: printerNumber,
    promotion_id: promotion_id,
    cart: cart,
    pay: paymentMethods.value == 1 ? getMoney.value : null,
    change: paymentMethods.value == 1 ? changeMoney.value : null,
    // change: changeMoney.value
  };
  console.log(JSON.stringify(payload));
  errorAlert.value = false;
  try {
    isModalPrinterOpen.value = true;
    const res = await dataApi.saveOrderComplete(payload);
    handleReset2(); // ล้างข้อมูลลูกค้า
    clearSale();
    clearMoneyForNewCal();
  } catch (error) {
    isModalPrinterOpen.value = false;
    console.log(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
  isModalPrinterOpen.value = false;
};

const clearSale = async () => {
  paymentMethods.value = null;
  dataItemInList.value = [];
  dataGetPromotion.value = [];
  total_before.value = 0;
  vat.value = 0;
  discount.value = 0;
  getMoney.value = 0;
  changeMoney.value = 0;
  netTotal.value = 0;
};

// ************************ [[ SECTION TELEPHON ]] ************************************
// ************************************************************************************
const validationSchema2 = toTypedSchema(
  zod.object({
    phone_no_search: zod.string().nonempty(requireValue).default(""),
  })
);
const {
  handleReset: handleReset2,
  handleSubmit: handleSubmit2,
  errors: errors2,
} = useForm({
  validationSchema: validationSchema2,
});
const { value: phone_no_search } = useField("phone_no_search");
const { value: resCustomer } = useField("resCustomer");
// const resCustomer = ref()

const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, "");

  if (
    (number.length >= 2 && ["0", "1", "7", "4"].includes(number[1])) ||
    !["0"].includes(number[0])
  ) {
    event.preventDefault();
    phone_no_search.value = phone_no_search.value;
  }
};

const onSubmitSearchPhon = handleSubmit2(async (values) => {
  console.log("searchh phon");
  errorAlert.value = false;
  phone_no_search.value = phone_no_search.value.replace(/\D/g, "");
  const payload = {
    phone_no: phone_no_search.value,
  };
  try {
    const res = await dataApi.getCustomerByPhon(payload);
    resCustomer.value = res.data.data;
    console.log(resCustomer.value);
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: "ค้นหาข้อมูลลูกค้าสำเร็จ",
    };
  } catch (error) {
    console.log(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
});

// ************************ [[ SECTION CUSTOMER CREATE ]] ************************************
// ************************************************************************************
// **********************[ DIALOG ] ********************************
const lastInsertPhon = ref();
const itemTitleName = ref([
  { name: "นาย" },
  { name: "นางสาว" },
  { name: "นาง" },
]);
// ********** [[ ที่อยู่]] *********************

const resProvincesOption = ref();
const resAmphuresOption = ref();
const resDistrictsOption = ref();
const loadProvinces = async () => {
  const rs = await addressDataServices.getAddressProvinces();
  resProvincesOption.value = rs.data.data;
};
const handleProvinceChange = async () => {
  const rs = await addressDataServices.getAddressAmphuresById(
    province_id.value
  );
  resAmphuresOption.value = rs.data.data;
  amphure_id.value = null;
  district_id.value = null;
  zipcode.value = null;
};
const handleAmphureChange = async () => {
  const rs = await addressDataServices.getAddressDistrictsById(
    amphure_id.value
  );
  resDistrictsOption.value = rs.data.data;
  console.log(amphure_id.value);
  district_id.value = null;
  zipcode.value = null;
};
const handleDistrictChange = () => {
  for (const item of resDistrictsOption.value) {
    if (item.id == district_id.value) {
      zipcode.value = String(item.zip_code);
      break; // Stop the loop since we found the matching item
    }
  }
};

// ******************************************* [[ ลูกค้าแบบเต็ม ]]
//! /////// [validation] /////////
const validationSchema3 = toTypedSchema(
  zod.object({
    title_name: zod
      .string({
        required_error: requireValue,
        invalid_type_error: requireValue,
      })
      .nonempty(requireValue)
      .default(""),
    first_name: zod.string().nonempty(requireValue).default(""),
    last_name: zod.string().nonempty(requireValue).default(""),
    cid: zod.string().nonempty(requireValue).min(13).default(""),
    phone_no: zod.string().nonempty(requireValue).min(10).default(""),
    address_no: zod.string().nonempty(requireValue).default(""),
    province_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue,
    }),
    district_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue,
    }),
    amphure_id: zod.number({
      required_error: requireValue,
      invalid_type_error: requireValue,
    }),
    zipcode: zod.string().nonempty(requireValue).default(""),
  })
);
const {
  handleReset: handleReset3,
  handleSubmit: handleSubmit3,
  errors: errors3,
} = useForm({
  validationSchema: validationSchema3,
});
const { value: title_name } = useField("title_name");
const { value: first_name } = useField("first_name");
const { value: last_name } = useField("last_name");
const { value: nick_name } = useField("nick_name");
const { value: cid } = useField("cid");
const { value: phone_no } = useField("phone_no");
const { value: address_no } = useField("address_no");
const { value: province_id } = useField("province_id");
const { value: district_id } = useField("district_id");
const { value: amphure_id } = useField("amphure_id");
const { value: zipcode } = useField("zipcode");
const { value: avatar_image } = useField("avatar_image");
const { value: selectedImageUrl } = useField("selectedImageUrl");

const validatePhoneNumberPhoneFull = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, "");

  if (
    (number.length >= 2 && ["0", "1", "7", "4"].includes(number[1])) ||
    !["0"].includes(number[0])
  ) {
    event.preventDefault();
    phone_no.value = phone_no.value;
  }
};

// ******************************************* [[ ลูกค้าแบบย่อ ]]
//! /////// [validation] /////////
const validationSchema4 = toTypedSchema(
  zod.object({
    phone_no_mini: zod.string().nonempty(requireValue).min(10).default(""),
  })
);
const {
  handleReset: handleReset4,
  handleSubmit: handleSubmit4,
  errors: errors4,
} = useForm({
  validationSchema: validationSchema4,
});
const { value: title_name_mini } = useField("title_name_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: first_name_mini } = useField("first_name_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: last_name_mini } = useField("last_name_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: nick_name_mini } = useField("nick_name_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: cid_mini } = useField("cid_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});

const { value: phone_no_mini } = useField("phone_no_mini");
const { value: address_no_mini } = useField("address_no_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: province_id_mini } = useField("province_id_mini");
const { value: district_id_mini } = useField("district_id_mini");
const { value: amphure_id_mini } = useField("amphure_id_mini");
const { value: zipcode_mini } = useField("zipcode_mini", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: avatar_image_mini } = useField("avatar_image_mini");
const { value: selectedImageUrl_mini } = useField("selectedImageUrl_mini");

const validatePhoneNumberPhoneMini = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, "");

  if (
    (number.length >= 2 && ["0", "1", "7", "4"].includes(number[1])) ||
    !["0"].includes(number[0])
  ) {
    event.preventDefault();
    phone_no_mini.value = phone_no_mini.value;
  }
};

// ********** [[ ที่อยู่]] *********************

const resProvincesOption_mini = ref();
const resAmphuresOption_mimi = ref();
const resDistrictsOptionmini = ref();
const loadProvincesMini = async () => {
  const rs = await addressDataServices.getAddressProvinces();
  resProvincesOption_mini.value = rs.data.data;
};
const handleProvinceChangeMini = async () => {
  const rs = await addressDataServices.getAddressAmphuresById(
    province_id_mini.value
  );
  resAmphuresOption_mimi.value = rs.data.data;
  amphure_id_mini.value = null;
  district_id_mini.value = null;
  zipcode_mini.value = null;
};
const handleAmphureChangeMini = async () => {
  const rs = await addressDataServices.getAddressDistrictsById(
    amphure_id_mini.value
  );
  resDistrictsOptionmini.value = rs.data.data;
  district_id_mini.value = null;
  zipcode_mini.value = null;
};
const handleDistrictChangeMini = () => {
  for (const item of resDistrictsOptionmini.value) {
    if (item.id == district_id_mini.value) {
      zipcode_mini.value = String(item.zip_code);
      break; // Stop the loop since we found the matching item
    }
  }
};
//  ******************* EVENTS UPLOAD IMAGE***************************
const onUploadMini = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    selectedImageUrl_mini.value = URL.createObjectURL(file); // สร้าง URL จากไฟล์
    avatar_image_mini.value = file; // เก็บไฟล์ที่เลือกลงตัวแปร
  }
};

//************************* */ Dialog Create Customer แบบเต็ม
const dialogProcessCustomer = ref(false);
const openDialogInsert = () => {
  handleReset3();
  handleReset4();
  dialogProcessCustomer.value = true;
};
const closetDialogInsert = () => {
  dialogProcessCustomer.value = false;
  handleReset3();
  handleReset4();
};
const onSubmitCreateCustomer = handleSubmit3((values) => {
  saveCustomer(values);
});

const saveCustomer = async (values) => {
  cid.value = await cid.value.replace(/[^0-9]/g, "");
  phone_no.value = await phone_no.value.replace(/\D/g, "");
  // เก็บไว้เพื่อนำไปยิงแล้ว quick show ลูกค้า
  lastInsertPhon.value = phone_no.value;
  console.log(values);

  const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };

  const formData = new FormData();
  formData.append("title_name", title_name.value);
  formData.append("first_name", first_name.value);
  formData.append("last_name", last_name.value);
  formData.append("nick_name", nick_name.value);
  formData.append("cid", cid.value);
  if (avatar_image.value) {
    formData.append("avatar_image", avatar_image.value);
  }
  formData.append("phone_no", phone_no.value);
  formData.append("address_no", address_no.value);
  formData.append("province_id", province_id.value);
  formData.append("district_id", district_id.value);
  formData.append("amphure_id", amphure_id.value);
  formData.append("zipcode", zipcode.value);
  console.log("formData out try", formData);

  const formDataObject = formDataToObject(formData);
  errorAlert.value = false;
  // save
  loadingBtn.value = true;
  try {
    const res = await dataApi.saveCustomer(formData);
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };

    handleReset3();
    phone_no_search.value = lastInsertPhon.value;
    await onSubmitSearchPhon();
    dialogProcessCustomer.value = false;
  } catch (error) {
    loadingBtn.value = false;
    console.error(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
  loadingBtn.value = false;
};

//  ******************* EVENTS UPLOAD IMAGE***************************
const onUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    selectedImageUrl.value = URL.createObjectURL(file); // สร้าง URL จากไฟล์
    avatar_image.value = file; // เก็บไฟล์ที่เลือกลงตัวแปร
  }
};

//************************* */ Dialog Create Customer แบบย่อ

const onSubmitCreateCustomerMini = handleSubmit4((values) => {
  saveCustomerMini(values);
});

const saveCustomerMini = async (values) => {
  cid.value = await cid.value.replace(/[^0-9]/g, "");
  phone_no_mini.value = await phone_no_mini.value.replace(/\D/g, "");
  // เก็บไว้เพื่อนำไปยิงแล้ว quick show ลูกค้า
  lastInsertPhon.value = phone_no_mini.value;
  console.log(values);

  const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };

  const formData = new FormData();
  formData.append("title_name", title_name_mini.value);
  formData.append("first_name", first_name_mini.value);
  formData.append("last_name", last_name_mini.value);
  formData.append("nick_name", nick_name_mini.value);
  formData.append("cid", cid_mini.value);
  if (avatar_image.value) {
    formData.append("avatar_image", avatar_image_mini.value);
  }
  formData.append("phone_no", phone_no_mini.value);
  formData.append("address_no", address_no_mini.value);
  formData.append("province_id", province_id_mini.value);
  formData.append("district_id", district_id_mini.value);
  formData.append("amphure_id", amphure_id_mini.value);
  formData.append("zipcode", zipcode_mini.value);

  const formDataObject = formDataToObject(formData);
  errorAlert.value = false;
  // save
  loadingBtn.value = true;
  try {
    const res = await dataApi.saveCustomerShort(formData);
    alertToast.value = {
      severity: "success",
      summary: "ทำรายการสำเร็จ",
      detail: res.data.message,
    };

    handleReset4();
    phone_no_search.value = lastInsertPhon.value;
    await onSubmitSearchPhon();
    dialogProcessCustomer.value = false;
  } catch (error) {
    loadingBtn.value = false;
    console.error(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
  loadingBtn.value = false;
};
//  คำนวนเงินแต่ละแถว qty*price
const calculateSumPrice = async (index) => {
  const item = dataItemInList.value[index];
  item.sumPriceProduct = item.qty * (item.price - item.discoute);
};
// คำนวนเงินรวมทั้งหมดก่อนหักส่วนลด
const calculateNetTotal = () => {
  console.log("dataItemInList", dataItemInList.value);
  netTotal.value = dataItemInList.value.reduce(
    (total, item) => total + item.sumPriceProduct,
    0
  );
};

const increment = async (index) => {
  paymentMethods.value = null;
  if (
    dataItemInList.value[index].can_add_max === null ||
    dataItemInList.value[index].can_add_max > dataItemInList.value[index].qty
  ) {
    dataItemInList.value[index].qty++;
    await calculateSumPrice(index);
    clearMoneyForNewCal();
    calculateNetTotal();
    // calculateChangeMoney()
  } else {
    return (alertToast.value = {
      severity: "error",
      summary: "ทำรายการไม่สำเร็จ",
      detail: "สินค้าในคลังไม่เพียงพอ",
    });
  }
};
const decrement = async (index) => {
  paymentMethods.value = null;
  if (dataItemInList.value[index].qty > 1) {
    dataItemInList.value[index].qty--;
    await calculateSumPrice(index);
    clearMoneyForNewCal();
    calculateNetTotal();
    // await calculateChangeMoney()
  }
};

//! /////// [validation] /////////
const validationSchema5 = toTypedSchema(
  zod.object({
    // phone_no_mini: zod.string().nonempty(requireValue).min(10).default('')
  })
);
const {
  handleReset: handleReset5,
  handleSubmit: handleSubmit5,
  errors: errors5,
} = useForm({
  validationSchema: validationSchema5,
});
const { value: coupon_code } = useField("coupon_code", null, {
  initialValue: "", // กำหนดค่าเริ่มต้นที่นี่
});
const { value: coupon_list } = useField("coupon_list", null, {
  initialValue: [], // กำหนดค่าเริ่มต้นที่นี่
});

const CheckCanUseCoupon = handleSubmit5((values) => {
  checkCoupon(values);
});

const checkCoupon = async () => {
  loadingBtn.value = true;
  const payload = {
    coupon_code: coupon_code.value ? coupon_code.value : "",
  };
  try {
    const res = await dataApi.checkCouponCanUse(payload);
    const isCouponCodeExists = coupon_list.value.some(
      (coupon) => coupon.coupon_code === res.data.data.coupon_code
    );
    if (isCouponCodeExists) {
      return (coupon_code.value = "");
    } else {
      coupon_code.value = ""; //เคลียค่า
      coupon_list.value.push(res.data.data);
      await loadCalculationPromotion();
      await calculateChangeMoney();
    }
    // coupon_list.value.push(res.data.data)
  } catch (error) {
    loadingBtn.value = false;
    coupon_code.value = ""; //เคลียค่า
    console.error(error);
    errorAlert.value = true;
    alertToast.value = {
      severity: "error",
      summary: "เกิดข้อผิดพลาด",
      detail: error.response.data.message,
    };
  }
  loadingBtn.value = false;
};

const removeCoupon = async (index) => {
  if (Array.isArray(coupon_list.value)) {
    coupon_list.value.splice(index, 1);
  }
  paymentMethods.value = null;
  dataGetPromotion.value = [];
  total_before.value = 0;
  vat.value = 0;
  discount.value = 0;
  getMoney.value = 0;
  changeMoney.value = 0;
  netTotal.value = 0;
  // clearMoneyForNewCal()
  await calculateNetTotal();
  await loadCalculationPromotion();
};

const formatDate = (value) => {
  return value.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value) => {
  if (typeof value === "string") {
    value = value.replace(",", "");
  }
  if (value == null || value == undefined) {
    value = 0.0;
  }
  value = parseFloat(value);
  return value.toLocaleString("th-TH", { style: "currency", currency: "THB" });
};

const formatNumber = (value) => {
  value = parseInt(value);
  return value.toLocaleString({ style: "currency", currency: "THB" });
};

const dialogProcess = ref(false);
const showCategoryModal = async () => {
  dialogProcess.value = true;
};

const selectedRowTable = ref();
const filters = ref();
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    supplier_product_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    qty: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  };
};
initFilters();

const settings = {
  itemsToShow: 2,
  snapAlign: "center",
};

const breakpoints = {
  575: {
    itemsToShow: 4,
    snapAlign: "center",
  },
  767: {
    itemsToShow: 6,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 8,
    snapAlign: "start",
  },
};
watchEffect(
  () =>
    (refIsPull.value =
      (console.log("Ref is changed", refIsPull.value),
      initializeDataItemStay(refIsPull.value)))
);

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<style>
.owl-product {
  /* padding-top: 2px; */
}

.increment-decrement .input-groups {
  margin-top: 2px;
}

.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* เพิ่มนอกเหนือ */
}

.two-line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
}

.owl-caousel-tab .carousel button {
  margin-top: 10px;
  position: absolute;
  top: 5px;
  right: 21px;
  background: 0 0;
  color: inherit;
  border: none;
  padding: 0 !important;
  font: inherit;
}

.tabs_wrapper .owl-product {
  margin-bottom: 5px;
}

.carousel__prev {
  display: none;
}

.carousel__next {
  display: none;
}

.owl-caousel-tab .carousel__track .carousel__slide li {
  list-style: none;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  color: #fff;
  font-family: sans-serif;
  width: 100%;
  margin-right: 10px;
}

.product-details {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 4px 4px 0px rgba(237, 237, 237, 0.2509803922);
  border: 1px solid #f8f8f8 !important;
  height: 90px;
  flex-direction: column;
}

.tabs_wrapper .owl-product {
  margin-bottom: 0px;
}

/* Add your modal styling here */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal.show {
  display: flex;
}

.product-details h6 {
  font-size: 13px;
  color: #000;
  margin-top: 2px;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid;
  border-width: 0px;
  border-color: #fff #fff #dee2e6 #fff;
  background: #fff;
  color: #6c757d;
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  transition: box-shadow 0.15s;
  margin: 0 0 -1px 0;
}

/* table */

/* .p-datatable .p-datatable-thead>tr>th {
  text-align: left;
  padding: 1rem 1rem;
  border: 0px solid #dee2e6;
  border-width: 0px 0 2px 0;
  border-color: black;
  font-weight: 600;
  color: #212529;
  background: none;
  transition: box-shadow 0.15s;
} */

/* .p-datatable .p-datatable-tbody>tr>td {
  text-align: left;
  border: none;
  border-width: 1px 0 0 0;
  padding: 1rem 1rem;
} */

/* .p-datatable.p-datatable-sm .p-datatable-tbody>tr>td {
  padding: 0px;
} */

/* .p-datatable.p-datatable-sm .p-datatable-thead>tr>th {
  padding: 0.1px 0.1rem;
} */
</style>
