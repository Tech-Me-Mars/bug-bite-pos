import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function getCancelReceipt(payload) {
    const url = `${apiUrl}/api/pos/v1/receipt/cancel-receipt`;
   return request("post", url, payload, true);
}
export function getCancelReason() {
    const url = `${apiUrl}/api/pos/v1/receipt/pos-cancel-reasons`;
   return request("get", url, {}, true);
}
export function updateCancelReceipt(sale_id,reason_id) {
    const url = `${apiUrl}/api/pos/v1/receipt/update-cancel-receipt/${sale_id}/${reason_id}`;
   return request("put", url, {}, true);
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
