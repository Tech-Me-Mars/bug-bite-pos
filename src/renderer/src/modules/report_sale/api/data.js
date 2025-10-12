import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function getSummaryShift(date_s,date_e) {
    const url = `${apiUrl}/api/pos/v1/summary/shift-summary?date_s=${date_s}&date_e=${date_e}`;
    return request("get", url, {}, true);
}

export function getSummaryReceipt(date_s,date_e,sku_barcode,employee_id,payment_method_id) {
    const url = `${apiUrl}/api/pos/v1/summary/receipt-summary?date_s=${date_s}&date_e=${date_e}&sku_barcode=${sku_barcode}&employee_id=${employee_id}&payment_method_id=${payment_method_id}`;
    console.log('url',url)
    return request("get", url, {}, true);
}

export function getBranchDetail() {
    const url = `${apiUrl}/api/pos/v1/branch/get-branch-detail`;
    return request("get", url, {}, true);
}

// [RECEIPT]
export function getReceipt(date_s, date_e, paginator, sale_id, sortField) {
    let url = `${apiUrl}/api/pos/v1/receipt?date_s=${date_s}&date_e=${date_e}&page=${paginator.page}&limit=${paginator.limit}`;
    if (sale_id) {
        url += `&sale_id=${sale_id}`;
    }
    if (sortField.field && sortField.orderby) {
        url += `&field=${sortField.field}&orderby=${sortField.orderby}`;
    }
    console.log(url);
    return request("get", url, {}, true);
}
export function getReceiptById(id) {
    const url = `${apiUrl}/api/pos/v1/receipt/${id}`;
    return request("get", url, {}, true);
}

export function getUserEmployee() {
    const url = `${apiUrl}/api/pos/v1/management/user_employee`;
    return request("get", url, {}, true);
}

export function getPaymentOption() {
    const url = `${apiUrl}/api/pos/v1/paymentmethod`;
   return request("get", url, {}, true);
}

export function getClaimByid(id) {
    const url = `${apiUrl}/api/pos/v1/claim/${id}`;
   return request("get", url, {}, true);
}

export function getPdf(id) {
    const url = `${apiUrl}/api/pos/v1/print/receipt/${id}`;
   return request("get", url, {}, true);
}

export function printRepeat(payload) {
  const url = `${apiUrl}/api/pos/v1/sales/re-print`;
 return request("post", url, payload, true);
}
