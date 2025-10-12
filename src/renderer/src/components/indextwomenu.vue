<template>
  <!-- Sidebar -->
  <div class="sidebar sidebar-two" id="sidebar">
    <div class="slimScrollDiv">
      <div class="sidebar-inner slimscroll">
        <perfect-scrollbar
          class="scroll-area"
          :settings="settings"
          @ps-scroll-y="scrollHanle"
        >
          <div id="sidebar-menu" class="sidebar-menu">
            <ul>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Main</h6>
                <ul>
                  <li class="active">
                    <router-link to="index"
                      ><vue-feather type="grid"></vue-feather><span> Dashboard</span>
                    </router-link>
                  </li>
                  <li class="submenu">
                    <a
                      href="#sidebarApplication"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarApplication"
                      v-on:click="chatMenu = !chatMenu"
                      :class="{ subdrop: chatMenu }"
                      ><vue-feather type="smartphone"></vue-feather
                      ><span>Application</span><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarApplication">
                      <li>
                        <router-link
                          :class="currentPath == 'chat' ? 'active' : 'notactive'"
                          to="chat"
                          >Chat</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'calendar' ? 'active' : 'notactive'"
                          to="calendar"
                          >Calendar</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'email' ? 'active' : 'notactive'"
                          to="email"
                          >Email</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Products</h6>
                <ul>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'productlist' || currentPath == 'editproduct'
                          ? 'active'
                          : 'notactive'
                      "
                      to="productlist"
                      ><vue-feather type="box"></vue-feather
                      ><span>Products</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'addproduct' || currentPath == 'product-details'
                          ? 'active'
                          : 'notactive'
                      "
                      to="addproduct"
                      ><vue-feather type="plus-square"></vue-feather
                      ><span>Create Product</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'categorylist' ? 'active' : 'notactive'"
                      to="categorylist"
                      ><vue-feather type="codepen"></vue-feather
                      ><span>Category</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'brandlist' ? 'active' : 'notactive'"
                      to="brandlist"
                      ><vue-feather type="tag"></vue-feather
                      ><span>Brands</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'subcategorylist' ? 'active' : 'notactive'"
                      to="subcategorylist"
                      ><vue-feather type="speaker"></vue-feather
                      ><span>Sub Category</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'barcode' ? 'active' : 'notactive'"
                      to="barcode"
                      ><vue-feather type="align-justify"></vue-feather
                      ><span>Print Barcode</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'importproduct' ? 'active' : 'notactive'"
                      to="importproduct"
                      ><vue-feather type="minimize-2"></vue-feather
                      ><span>Import Products</span></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Sales</h6>
                <ul>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'saleslist' || currentPath == 'sales-details'
                          ? 'active'
                          : 'notactive'
                      "
                      to="saleslist"
                      ><vue-feather type="shopping-cart"></vue-feather
                      ><span>Sales</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'invoicereport' ? 'active' : 'notactive'"
                      to="invoicereport"
                      ><vue-feather type="file-text"></vue-feather
                      ><span>Invoices</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'salesreturnlists' ||
                        currentPath == 'editsalesreturns'
                          ? 'active'
                          : 'notactive'
                      "
                      to="salesreturnlists"
                      ><vue-feather type="copy"></vue-feather
                      ><span>Sales Return</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'quotationlist' || currentPath == 'editquotation'
                          ? 'active'
                          : 'notactive'
                      "
                      to="quotationlist"
                      ><vue-feather type="save"></vue-feather
                      ><span>Quotation</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'pos' ? 'active' : 'notactive'"
                      to="pos"
                      ><vue-feather type="hard-drive"></vue-feather
                      ><span>POS</span></router-link
                    >
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="transferMenu ? 'active' : 'notactive'"
                      href="#sidebarTransfer"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarTransfer"
                      v-on:click="transferMenu = !transferMenu"
                      :class="{ subdrop: transferMenu }"
                      ><vue-feather type="shuffle"></vue-feather><span>Transfer</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarTransfer">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'transferlist' || currentPath == 'edittransfer'
                              ? 'active'
                              : 'notactive'
                          "
                          to="transferlist"
                          >Transfer List</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'importtransfer' ? 'active' : 'notactive'
                          "
                          to="importtransfer"
                          >Import Transfer
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="returnMenu ? 'active' : 'notactive'"
                      href="#sidebarsalesreturnlist"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarsalesreturnlist"
                      v-on:click="returnMenu = !returnMenu"
                      :class="{ subdrop: returnMenu }"
                      ><vue-feather type="corner-up-left"></vue-feather><span>Return</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarsalesreturnlist">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'salesreturnlist' ||
                            currentPath == 'editsalesreturn'
                              ? 'active'
                              : 'notactive'
                          "
                          to="salesreturnlist"
                          >Sales Return</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'purchasereturnlist' ? 'active' : 'notactive'
                          "
                          to="purchasereturnlist"
                          >Purchase Return</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Purchases</h6>
                <ul>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'purchaselist' || currentPath == 'editpurchase'
                          ? 'active'
                          : 'notactive'
                      "
                      to="purchaselist"
                      ><vue-feather type="shopping-bag"></vue-feather
                      ><span>Purchases</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'importpurchase' ? 'active' : 'notactive'"
                      to="importpurchase"
                      ><vue-feather type="minimize-2"></vue-feather
                      ><span>Import Purchases</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'purchaseorderreport' ? 'active' : 'notactive'
                      "
                      to="purchaseorderreport"
                      ><vue-feather type="file-minus"></vue-feather
                      ><span>Purchase Order</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'purchasereturnlist' ? 'active' : 'notactive'
                      "
                      to="purchasereturnlist"
                      ><vue-feather type="refresh-cw"></vue-feather
                      ><span>Purchase Return</span></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Finance & Accounts</h6>
                <ul>
                  <li class="submenu">
                    <a
                      v-bind:class="expenseMenu ? 'active' : 'notactive'"
                      href="#sidebarExpense"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarExpense"
                      v-on:click="expenseMenu = !expenseMenu"
                      :class="{ subdrop: expenseMenu }"
                      ><vue-feather type="file-text"></vue-feather><span>Expense</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarExpense">
                      <li>
                        <router-link
                          :class="currentPath == 'expenselist' ? 'active' : 'notactive'"
                          to="expenselist"
                          >Expenses</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'expensecategory' ? 'active' : 'notactive'
                          "
                          to="expensecategory"
                          >Expense Category</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Peoples</h6>
                <ul>
                  <li>
                    <router-link
                      :class="currentPath == 'customerlist' ? 'active' : 'notactive'"
                      to="customerlist"
                      ><vue-feather type="user"></vue-feather
                      ><span>Customers</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'supplierlist' ? 'active' : 'notactive'"
                      to="supplierlist"
                      ><vue-feather type="users"></vue-feather
                      ><span>Suppliers</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'userlist' ? 'active' : 'notactive'"
                      to="userlist"
                      ><vue-feather type="user-check"></vue-feather
                      ><span>Users</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'storelist' ? 'active' : 'notactive'"
                      to="storelist"
                      ><vue-feather type="home"></vue-feather
                      ><span>Stores</span></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Reports</h6>
                <ul>
                  <li>
                    <router-link
                      :class="currentPath == 'salesreport' ? 'active' : 'notactive'"
                      to="salesreport"
                      ><vue-feather type="bar-chart-2"></vue-feather
                      ><span>Sales Report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="
                        currentPath == 'purchaseorderreport' ? 'active' : 'notactive'
                      "
                      to="purchaseorderreport"
                      ><vue-feather type="pie-chart"></vue-feather
                      ><span>Purchase report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'inventoryreport' ? 'active' : 'notactive'"
                      to="inventoryreport"
                      ><vue-feather type="credit-card"></vue-feather
                      ><span>Inventory Report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'invoicereport' ? 'active' : 'notactive'"
                      to="invoicereport"
                      ><vue-feather type="file"></vue-feather
                      ><span>Invoice Report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'purchasereport' ? 'active' : 'notactive'"
                      to="purchasereport"
                      ><vue-feather type="bar-chart"></vue-feather
                      ><span>Purchase Report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'supplierreport' ? 'active' : 'notactive'"
                      to="supplierreport"
                      ><vue-feather type="database"></vue-feather
                      ><span>Supplier Report</span></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'customerreport' ? 'active' : 'notactive'"
                      to="customerreport"
                      ><vue-feather type="pie-chart"></vue-feather
                      ><span>Customer Report</span></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">User Management</h6>
                <ul>
                  <li class="submenu">
                    <a
                      v-bind:class="userMenu ? 'active' : 'notactive'"
                      href="#sidebarUsers"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarUsers"
                      v-on:click="userMenu = !userMenu"
                      :class="{ subdrop: userMenu }"
                      ><vue-feather type="users"></vue-feather><span>Manage Users</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarUsers">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'newuser' || currentPath == 'newuseredit'
                              ? 'active'
                              : 'notactive'
                          "
                          to="newuser"
                          >New User
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'userlists' ? 'active' : 'notactive'"
                          to="userlists"
                          >Users List</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Pages</h6>
                <ul>
                  <li class="submenu">
                    <a
                      v-bind:class="authenticationPageMenu ? 'active' : 'notactive'"
                      href="#sidebarAuthentication"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarAuthentication"
                      v-on:click="authenticationPageMenu = !authenticationPageMenu"
                      :class="{ subdrop: authenticationPageMenu }"
                      ><vue-feather type="shield"></vue-feather><span>Authentication</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarAuthentication">
                      <li><router-link to="/">Log in</router-link></li>
                      <li><router-link to="signup">Register</router-link></li>
                      <li>
                        <router-link to="forgetpassword">Forgot Password</router-link>
                      </li>
                      <li>
                        <router-link to="resetpassword">Reset Password</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="errorpageMenu ? 'active' : 'notactive'"
                      href="#sidebarError"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarError"
                      v-on:click="errorpageMenu = !errorpageMenu"
                      :class="{ subdrop: errorpageMenu }"
                      ><vue-feather type="file-minus"></vue-feather
                      ><span>Error Pages</span><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarError">
                      <li>
                        <router-link
                          :class="currentPath == 'error-404' ? 'active' : 'notactive'"
                          to="error-404"
                          >404 Error
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'error-500' ? 'active' : 'notactive'"
                          to="error-500"
                          >500 Error
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="placesMenu ? 'active' : 'notactive'"
                      href="#sidebarCountry"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarCountry"
                      v-on:click="placesMenu = !placesMenu"
                      :class="{ subdrop: placesMenu }"
                      ><vue-feather type="map"></vue-feather><span>Places</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarCountry">
                      <li>
                        <router-link
                          :class="currentPath == 'countrieslist' ? 'active' : 'notactive'"
                          to="countrieslist"
                          >Countries</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'statelist' ? 'active' : 'notactive'"
                          to="statelist"
                          >States</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'blankpage' ? 'active' : 'notactive'"
                      to="blankpage"
                      ><vue-feather type="file"></vue-feather><span>Blank Page</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :class="currentPath == 'components' ? 'active' : 'notactive'"
                      to="components"
                      ><vue-feather type="pen-tool"></vue-feather><span>Components</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">UI Interface</h6>
                <ul>
                  <li class="submenu">
                    <a
                      v-bind:class="elementMenu ? 'active' : 'notactive'"
                      href="#sidebarSweet"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarSweet"
                      v-on:click="elementMenu = !elementMenu"
                      :class="{ subdrop: elementMenu }"
                      ><vue-feather type="layers"></vue-feather><span>Elements</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarSweet">
                      <li>
                        <router-link
                          :class="currentPath == 'sweetalerts' ? 'active' : 'notactive'"
                          to="sweetalerts"
                          >Sweet Alerts</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'tooltip' ? 'active' : 'notactive'"
                          to="tooltip"
                          >Tooltip</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'popover' ? 'active' : 'notactive'"
                          to="popover"
                          >Popover</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'ribbon' ? 'active' : 'notactive'"
                          to="ribbon"
                          >Ribbon</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'clipboard' ? 'active' : 'notactive'"
                          to="clipboard"
                          >Clipboard</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'drag-drop' ? 'active' : 'notactive'"
                          to="drag-drop"
                          >Drag & Drop</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'rangeslider' ? 'active' : 'notactive'"
                          to="rangeslider"
                          >Range Slider</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'rating' ? 'active' : 'notactive'"
                          to="rating"
                          >Rating</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'toastr' ? 'active' : 'notactive'"
                          to="toastr"
                          >Toastr</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'text-editor' ? 'active' : 'notactive'"
                          to="text-editor"
                          >Text Editor</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'counter' ? 'active' : 'notactive'"
                          to="counter"
                          >Counter</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'scrollbar' ? 'active' : 'notactive'"
                          to="scrollbar"
                          >Scrollbar</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'spinner' ? 'active' : 'notactive'"
                          to="spinner"
                          >Spinner</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'notification' ? 'active' : 'notactive'"
                          to="notification"
                          >Notification</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'lightbox' ? 'active' : 'notactive'"
                          to="lightbox"
                          >Lightbox</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'stickynote' ? 'active' : 'notactive'"
                          to="stickynote"
                          >Sticky Note</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'timeline' ? 'active' : 'notactive'"
                          to="timeline"
                          >Timeline</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'form-wizard' ? 'active' : 'notactive'"
                          to="form-wizard"
                          >Form Wizard</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="chartMenu ? 'active' : 'notactive'"
                      href="#sidebarCharts"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarCharts"
                      v-on:click="chartMenu = !chartMenu"
                      :class="{ subdrop: chartMenu }"
                      ><vue-feather type="bar-chart-2"></vue-feather><span>Charts</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarCharts">
                      <li>
                        <router-link
                          :class="currentPath == 'chart-apex' ? 'active' : 'notactive'"
                          to="chart-apex"
                          >Apex Charts</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'chart-js' ? 'active' : 'notactive'"
                          to="chart-js"
                          >Chart Js</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'chart-morris' ? 'active' : 'notactive'"
                          to="chart-morris"
                          >Morris Charts</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'chart-flot' ? 'active' : 'notactive'"
                          to="chart-flot"
                          >Flot Charts</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="iconMenu ? 'active' : 'notactive'"
                      href="#sidebarIcons"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarIcons"
                      v-on:click="iconMenu = !iconMenu"
                      :class="{ subdrop: iconMenu }"
                      ><vue-feather type="database"></vue-feather><span>Icons</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarIcons">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'icon-fontawesome' ? 'active' : 'notactive'
                          "
                          to="icon-fontawesome"
                          >Fontawesome Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-feather' ? 'active' : 'notactive'"
                          to="icon-feather"
                          >Feather Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-ionic' ? 'active' : 'notactive'"
                          to="icon-ionic"
                          >Ionic Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-material' ? 'active' : 'notactive'"
                          to="icon-material"
                          >Material Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-pe7' ? 'active' : 'notactive'"
                          to="icon-pe7"
                          >Pe7 Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'icon-simpleline' ? 'active' : 'notactive'
                          "
                          to="icon-simpleline"
                          >Simpleline Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-themify' ? 'active' : 'notactive'"
                          to="icon-themify"
                          >Themify Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-weather' ? 'active' : 'notactive'"
                          to="icon-weather"
                          >Weather Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-typicon' ? 'active' : 'notactive'"
                          to="icon-typicon"
                          >Typicon Icons</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'icon-flag' ? 'active' : 'notactive'"
                          to="icon-flag"
                          >Flag Icons</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="formMenu ? 'active' : 'notactive'"
                      href="#sidebarForms"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarForms"
                      v-on:click="formMenu = !formMenu"
                      :class="{ subdrop: formMenu }"
                      ><vue-feather type="edit"></vue-feather><span>Forms</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarForms">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'form-basic-inputs' ? 'active' : 'notactive'
                          "
                          to="form-basic-inputs"
                          >Basic Inputs
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'form-input-groups' ? 'active' : 'notactive'
                          "
                          to="form-input-groups"
                          >Input Groups
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'form-horizontal' ? 'active' : 'notactive'
                          "
                          to="form-horizontal"
                          >Horizontal Form
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'form-vertical' ? 'active' : 'notactive'"
                          to="form-vertical"
                        >
                          Vertical Form
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'form-mask' ? 'active' : 'notactive'"
                          to="form-mask"
                          >Form Mask
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'form-validation' ? 'active' : 'notactive'
                          "
                          to="form-validation"
                          >Form Validation
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'form-select2' ? 'active' : 'notactive'"
                          to="form-select2"
                          >Form Select2
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'form-fileupload' ? 'active' : 'notactive'
                          "
                          to="form-fileupload"
                          >File Upload
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="submenu">
                    <a
                      v-bind:class="tableMenu ? 'active' : 'notactive'"
                      href="#sidebarTable"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarTable"
                      v-on:click="tableMenu = !tableMenu"
                      :class="{ subdrop: tableMenu }"
                      ><vue-feather type="columns"></vue-feather><span>Tables</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarTable">
                      <li>
                        <router-link
                          :class="currentPath == 'tables-basic' ? 'active' : 'notactive'"
                          to="tables-basic"
                          >Basic Tables
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'data-tables' ? 'active' : 'notactive'"
                          to="data-tables"
                          >Data Table
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu-open">
                <h6 class="submenu-hdr">Settings</h6>
                <ul>
                  <li class="submenu">
                    <a
                      v-bind:class="settingMenu ? 'active' : 'notactive'"
                      href="#sidebarSettings"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarSettings"
                      v-on:click="settingMenu = !settingMenu"
                      :class="{ subdrop: settingMenu }"
                      ><vue-feather type="settings"></vue-feather><span>Settings</span
                      ><span class="menu-arrow"></span
                    ></a>
                    <ul class="collapse menu-dropdown" id="sidebarSettings">
                      <li>
                        <router-link
                          :class="
                            currentPath == 'generalsettings' ? 'active' : 'notactive'
                          "
                          to="generalsettings"
                          >General Settings</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'emailsettings' ? 'active' : 'notactive'"
                          to="emailsettings"
                          >Email Settings</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'paymentsettings' ? 'active' : 'notactive'
                          "
                          to="paymentsettings"
                          >Payment Settings</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'currencysettings' ? 'active' : 'notactive'
                          "
                          to="currencysettings"
                          >Currency Settings</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="
                            currentPath == 'grouppermissions' ||
                            currentPath == 'createpermission' ||
                            currentPath == 'editpermission'
                              ? 'active'
                              : 'notactive'
                          "
                          to="grouppermissions"
                          >Group Permissions</router-link
                        >
                      </li>
                      <li>
                        <router-link
                          :class="currentPath == 'taxrates' ? 'active' : 'notactive'"
                          to="taxrates"
                          >Tax Rates</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link class="dropdown-item  bg-transparent hover:bg-gray-100 hover:text-orange-300" to="/profile"
            ><vue-feather type="user" class=""></vue-feather>My Profile</router-link>
                    <router-link to="/"
                      ><vue-feather type="log-out"></vue-feather><span>Logout</span>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
  <!-- /Sidebar -->
</template>
<script>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
export default {
  data() {
    return {
      settings: { suppressScrollX: true },
      activeClass: "active",
    };
    //  isactive : true
  },
  methods: {
    scrollHanle(evt) {},
  },
  components: {
    PerfectScrollbar,
  },
};
</script>
