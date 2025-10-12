import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;




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

