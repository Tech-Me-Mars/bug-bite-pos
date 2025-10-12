import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getCustomer(paginator,sortField,customer_id,phone_no_search) {
    let url = `${apiUrl}/api/pos/v1/customer?page=${paginator.page}&limit=${paginator.limit}`;
    if (phone_no_search!=undefined && phone_no_search!=null) {
        url += `&phone_no=${phone_no_search}`
    }
    if (customer_id) {
        url += `&name=${customer_id}`
    }
    if (sortField.field && sortField.orderby) {
        url += `&field=${sortField.field}&orderby=${sortField.orderby}`;
    }
    console.log(url)
   return request("get", url, {}, true);
}


export function getCustomerNoTable() {
    let url = `${apiUrl}/api/pos/v1/customer`;
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

export function updateCustomer(data,id) {
    const url = `${apiUrl}/api/pos/v1/customer/${id}`;
   return request("put", url, data, true);
}

export function deleteCustomer(id) {
    const url = `${apiUrl}/api/pos/v1/customer/${id}`;
   return request("delete", url, {}, true);
}

export function getSaleHistory(payload) {
    const url = `${apiUrl}/api/pos/v1/customer/get-sales`;
   return request("post", url, payload, true);
}

export function getCustomerByphon(payload) {
    const url = `${apiUrl}/api/pos/v1/customer/get-customer-phone`;
   return request("post", url, payload, true);
}

export function getReceiptById(id) {
    const url = `${apiUrl}/api/pos/v1/receipt/${id}`;
    return request("get", url, {}, true);
}

export function getPdf(id) {
    const url = `${apiUrl}/api/pos/v1/print/receipt/${id}`;
   return request("get", url, {}, true);
}