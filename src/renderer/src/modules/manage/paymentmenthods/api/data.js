import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getPaymentMethod() {
    const url = `${apiUrl}/api/pos/v1/paymentmethod`;
   return request("get", url, {}, true);
}

export function getPaymentMethodById(id) {
    const url = `${apiUrl}/api/pos/v1/paymentmethod/${id}`;
   return request("get", url, {}, true);
}
export function savePaymentMethod(data) {
    const url = `${apiUrl}/api/pos/v1/paymentmethod`;
   return request("post", url, data, true);
}

export function updatePaymentMethod(data,id) {
    const url = `${apiUrl}/api/pos/v1/paymentmethod/${id}`;
   return request("put", url, data, true);
}

export function deletePaymentMethod(id) {
    const url = `${apiUrl}/api/pos/v1/paymentmethod/${id}`;
   return request("delete", url, {}, true);
}
export function toggleEnablePaymentMethod(id) {
    const url = `${apiUrl}/api/pos/v1/paymentmethod/toggle-is-enable/${id}`;
   return request("post", url, {}, true);
}