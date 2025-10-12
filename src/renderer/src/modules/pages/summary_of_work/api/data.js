import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function getSummaryShift(date_s,date_e) {
    const url = `${apiUrl}/api/pos/v1/summary/shift-summary?date_s=${date_s}&date_e=${date_e}`;
    return request("get", url, {}, true);
}

export function getSummaryReceipt(date_s,date_e) {
    const url = `${apiUrl}/api/pos/v1/summary/receipt-summary?date_s=${date_s}&date_e=${date_e}`;
    return request("get", url, {}, true);
}

