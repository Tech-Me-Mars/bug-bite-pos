import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function getSaleCustomer(date) {
    let url;
    if (date) {
        url = `${apiUrl}/api/pos/v1/sales/sales-customer?date=${date}`;
    } else {
        url = `${apiUrl}/api/pos/v1/sales/sales-customer`;
    }
    
    return request("get", url, {}, true);
}


export function getSaleCustomerById(id) {
    const url = `${apiUrl}/api/pos/v1/sales/get-sales/${id}`;
   return request("get", url, {}, true);
}

export function getCustomer() {
    const url = `${apiUrl}/api/pos/v1/customer`;
   return request("get", url, {}, true);
}

export function getRequestReasons() {
    const url = `${apiUrl}/api/pos/v1/requestreasons`;
   return request("get", url, {}, true);
}

export function saveClaimSku(payload) {
    const url = `${apiUrl}/api/pos/v1/claim/claim-sku`;
   return request("post", url, payload, true);
}
