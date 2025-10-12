import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getItemSkuBarCode(payload) {
    const url = `${apiUrl}/api/pos/v1/branchitem/get-item-sku-barcode`;
   return request("post", url, payload, true);
}

export function getPaymentOption() {
    const url = `${apiUrl}/api/pos/v1/paymentmethod`;
   return request("get", url, {}, true);
}

export function saveOrderComplete(payload) {
    const url = `${apiUrl}/api/pos/v1/sales/order-completed`;
   return request("post", url, payload, true);
};

export function getCategoryShow() {
    const url = `${apiUrl}/api/pos/v1/categoryshow`;
   return request("get", url, {}, true);
};

export function getCustomerByPhon(payload) {
    const url = `${apiUrl}/api/pos/v1/customer/get-customer-phone`;
   return request("post", url, payload, true);
};


// CUSTOMER 
export function getCustomer() {
    const url = `${apiUrl}/api/pos/v1/customer`;
   return request("get", url, {}, true);
}

export function getCustomerById(id) {
    const url = `${apiUrl}/api/pos/v1/customer/${id}`;
   return request("get", url, {}, true);
}
export function saveCustomer(data) {
    const url = `${apiUrl}/api/pos/v1/customer`;
   return request("post", url, data, true);
}
export function saveCustomerShort(data) {
    const url = `${apiUrl}/api/pos/v1/customer/short-customer`;
   return request("post", url, data, true);
}
export function updateCustomer(data,id) {
    const url = `${apiUrl}/api/pos/v1/customer/${id}`;
   return request("put", url, data, true);
}

export function deleteCustomer(id) {
    const url = `${apiUrl}/api/pos/v1/customer/${id}`;
   return request("delete", url, {}, true);
}

// BRANCH
export function getBranchDetail () {
    const url = `${apiUrl}/api/pos/v1/branch/get-branch-detail`;
   return request("get", url, {}, true);
}

// CALCULATE PROMOTIONS

export function orderCalculator(payload) {
    const url = `${apiUrl}/api/pos/v1/sales/order-calculator`;
   return request("post", url, payload, true);
}

// check in check out
export function saveCheckIn(payload) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-in`;
   return request("post", url, payload, true);
}

export function saveCheckOut(id) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-out/${id}`;
   return request("post", url, {}, true);
}

export function checkCouponCanUse(payload) {
    const url = `${apiUrl}/api/pos/v1/sales/check-coupon-can-use`;
   return request("post", url, payload, true);
}

