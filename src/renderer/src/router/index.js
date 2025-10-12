import { createRouter, createWebHashHistory } from 'vue-router'

import auth from "@/middleware/auth.js";
const routes = [
  {
    path: '/auth',
    name: 'auth',
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('@/modules/auth/views/signin.vue')
      },
      {
        path: 'logout',
        name: 'auth-logout',
        component: () => import('@/modules/auth/views/Logout.vue')
      }
    ]
  },
  // **********************************Layout ปกติ***********************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  {
    path: '/',
    beforeEnter: [auth], // เพิ่ม middleware โดยใช้ beforeEnter
    component: () => import('@/layouts/Layout.vue'),
    children: [
      {
        path: '/main',
        name: 'pages',
        meta: {
          headerClass: 'header',
          sidebarClass: '',
          hideClass: 'v-cloak'
        },
        children: [
          {
            path: 'dashboard',
            name: 'pages-index',

            component: () => import('@/modules/pages/dashboard/Index.vue')
          }
        ]
      },
      {
        path: 'receipt-preview',
        name: 'receiptpreviews-index',
        children: [
          {
            path: '',
            name: 'receiptpreviews-all',
            component: () => import('@/modules/pages/receipt_previews/all_receipt.vue')
          },
          {
            path: 'receipt-full/:id',
            name: 'receiptpreviews-full',
            component: () => import('@/modules/pages/receipt_previews/full_receipt.vue')
          },
          {
            path: 'receipt-mini/:id',
            name: 'receiptpreviews-mini',
            component: () => import('@/modules/pages/receipt_previews/mini_receipt.vue')
          },

        ]
      },
      {
        path: 'access-control',
        name: 'access-control',
        children: [
          // {
          //   path: 'user-position',
          //   name: 'receiptpreviews-all',
          //   component: () => import('@/modules/pages/access_control/user_position/index.vue')
          // },
          {
            path: 'perminssion-user',
            name: 'perminssion-user',
            children: [
              {
                path: '',
                name: 'perminssion-user-index',
                component: () => import('@/modules/access_control/perminssion_user/index.vue')
              },
              {
                path: 'manage/:id',
                name: 'perminssion-user-manage-permission',
                component: () => import('@/modules/access_control/perminssion_user/managepermission.vue')
              }

            ]
          },
          {
            path: 'user-employee',
            name: 'user-employee',
            children: [
              {
                path: '',
                name: 'user-employee-index',
                component: () => import('@/modules/access_control/user_employee/index.vue')
              },
              {
                path: 'create',
                name: 'user-employee-create',
                component: () => import('@/modules/access_control/user_employee/create.vue')
              },
              {
                path: 'edit/:id',
                name: 'user-employee-edit',
                component: () => import('@/modules/access_control/user_employee/edit.vue')
              }

            ]
          },


        ]
      },


      {
        path: 'print',
        name: 'print-index',
        children: [
          {
            path: 'barcode',
            name: 'print-barcode',
            component: () => import('@/modules/print/barcode.vue')
          }
        ]
      },
      {
        path: 'cancel-receipt',
        name: 'cancel-receipt',
        component: () => import('@/modules/pages/cancel_receipt/index.vue')
      },

      {
        path: 'report-sale-main',
        name: 'reportsale-index',
        component: () => import('@/modules/report_sale/index.vue')
      },
      {
        path: 'report-sale-employee',
        name: 'report-sale-employee',
        component: () => import('@/modules/report_sale/employee.vue')
      },
      {
        path: 'checkinandcheckout',
        name: 'checkinandcheckout-index',
        component: () => import('@/modules/pages/checkincheckoutlist/index.vue')
      },
      {
        path: 'requestreceipt',
        name: 'requestreceipt-index',
        component: () => import('@/modules/pages/request_receipt/index.vue')
      },
      {
        path: 'customersaleslist',
        name: 'customersaleslist-index',
        component: () => import('@/modules/pages/customer_sales_list/index.vue')
      },
      {
        path: 'summaryofwork',
        name: 'summaryofwork-index',
        component: () => import('@/modules/pages/summary_of_work/index.vue')
      },
      {
        path: 'summaryofreceipt',
        name: 'summaryofreceipt-index',
        component: () => import('@/modules/pages/summary_of_receipt/index.vue')
      },
      {
        path: 'importproducts',
        name: 'importproducts-index',
        component: () => import('@/modules/pages/import_products/index.vue')
      },
      {
        path: 'paymentmenthods',
        name: 'paymentmenthods-index',
        component: () => import('@/modules/manage/paymentmenthods/index.vue')
      },
      {
        path: 'payment',
        name: 'payment-index',
        component: () => import('@/modules/manage/payment/index.vue')
      },
      {
        path: 'position',
        name: 'position-index',
        component: () => import('@/modules/manage/position/index.vue')
      },
      {
        path: 'employee',
        name: 'employee-index',
        component: () => import('@/modules/manage/employee/index.vue')
      },
      {
        path: 'request',
        name: 'request-index',
        component: () => import('@/modules/manage/request/index.vue')
      },
      {
        path: 'receive',
        name: 'receive-index',
        component: () => import('@/modules/manage/receive/index.vue')
      },
      {
        path: 'category',
        name: 'category-index',
        component: () => import('@/modules/manage/category/index.vue')
      },
      {
        path: 'trackrequeststatus',
        name: 'trackrequeststatus-index',
        component: () => import('@/modules/manage/trackrequeststatus/index.vue')
      },
      {
        path: 'claimproduct',
        name: 'claimproduct-index',
        children: [
          {
            path: '',
            name: 'claimproduct-no-receipt',

            component: () => import('@/modules/manage/claim_products/claim_no_receipt.vue')
          },
          {
            path: ':id',
            name: 'claimproduct-by-receipt',

            component: () => import('@/modules/manage/claim_products/claim_receipt.vue')
          }
        ]

      },
      {
        path: '/customer',
        name: 'customer',

        children: [
          {
            path: '',
            name: 'customer-index',
            component: () => import('@/modules/manage/customer/index.vue')
          },
          {
            path: 'create',
            name: 'customer-create',
            component: () => import('@/modules/manage/customer/create.vue')
          },
        ]
      },
      {
        path: '/example',
        name: 'example',

        children: [
          {
            path: 'mqtt',
            name: 'mqtt-index',
            component: () => import('@/modules/example/views/mqtt.vue')
          },
          {
            path: 'primevueformtable',
            name: 'example-primevueformtable',

            component: () => import('@/modules/lab/primevueform.vue')
          },

        ]
      },
      {
        path: '/connnent-pos-center',
        name: 'connnentposcenter',
        children: [
          {
            path: '',
            name: 'connnentposcenter-index',
            component: () => import('@/modules/manage/connnent_pos_center/index.vue')
          },
          {
            path: 'old',
            name: 'connnentposcenter-index-old',
            component: () => import('@/modules/manage/connnent_pos_center/indexold.vue')
          },
        ]
      },



      {
        path: '/labs',
        name: 'labs',
        meta: {
          headerClass: 'header',
          sidebarClass: '',
          hideClass: ''
        },
        children: [
          {
            path: 'ifram',
            name: 'lab-ifram',

            component: () => import('@/modules/lab/ifram.vue')
          },
          {
            path: 'tableserverside',
            name: 'lab-tableserverside',

            component: () => import('@/modules/lab/tableserverside.vue')
          },
          {
            path: 'table',
            name: 'lab-table',

            component: () => import('@/modules/lab/table.vue')
          },
          {
            path: 'tablecrud',
            name: 'lab-tablecrud',

            component: () => import('@/modules/lab/tablecrud.vue')
          },
          {
            path: 'tablepagination',
            name: 'lab-tablepagination',

            component: () => import('@/modules/lab/tablepagination.vue')
          },
          {
            path: 'toast',
            name: 'lab-toast',

            component: () => import('@/modules/lab/toast.vue')
          }
        ]
      },
      // {
      //   path: '/generalsettings',
      //   name: 'generalsettings',
      //   meta: {
      //     headerClass: 'header',
      //     sidebarClass: ''
      //   },
      //   component: () => import('@/modules/pages/profile/views/index.vue'),
      // },
      // [[PROFILE]]
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/modules/pages/profile/index.vue'),
      },
      // SETTINGS
      {
        path: '/settings',
        name: 'settings',
        children: [
          // [[ GENERALSETTINGS ]]
          {
            path: 'generalsetting',
            name: 'generalsetting',
            component: () => import('@/modules/settings/generalsetting/index.vue'),
          },
        ]

      },
    ]
  },

  // ********************************* [[ POS Layouts ]] **************************
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/
  /*********************************************************************************/

  {
    path: '/pos',
    beforeEnter: [auth], // เพิ่ม middleware โดยใช้ beforeEnter
    component: () => import('@/layouts/Layout_POS.vue'),
    meta: {
      headerClass: 'header',
      sidebarClass: '',
      hideClass: ''
    },
    children: [
      {
        path: 'onestop',
        name: 'pos-index',
        component: () => import('@/modules/pos/pos.vue')
      }
    ]
  },

  {
    path: '',
    redirect: '/main/dashboard'
  },


  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/modules/Unauthorized.vue')
  },
  // ... other paths ...
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/modules/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  linkActiveClass: 'active',
  routes
})

export default router
