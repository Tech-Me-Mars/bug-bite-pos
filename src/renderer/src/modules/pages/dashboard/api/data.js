import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;
// const apiUrl = import.meta.env.URL_API;

export function getLastOrder(paginator,sortField) {
    let url = `${apiUrl}/api/pos/v1/dashboard/get-dashboard-main?page=${paginator.page}&limit=${paginator.limit}`;
    if (sortField.field && sortField.orderby) {
        url += `&field=${sortField.field}&orderby=${sortField.orderby}`;
    }
    return request("get", url, {}, true);
}

export function getSummaryReceipt(date_s,date_e) {
    const url = `${apiUrl}/api/pos/v1/summary/receipt-summary?date_s=${date_s}&date_e=${date_e}`;
    console.log(url)
    return request("get", url, {}, true);
}