import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

// ไม่เอาItem list เอามาดูแค่status
export function loadStatusProductInBranch() {
    const url = `${apiUrl}/api/pos/v1/dashboard/get-dashboard-main?page=1&limit=1&field=sum_qty&orderby=asc`;
   return request("get", url, {}, true);
}


export function saveRequestOrderItems(payload) {
    const url = `${apiUrl}/api/pos/v1/request/request-order-item`;
   return request("post", url, payload, true);
}

export function getCustomer() {
    const url = `${apiUrl}/api/pos/v1/customer`;
   return request("get", url, {}, true);
}

export function getBranch() {
    const url = `${apiUrl}/api/pos/v1/branch`;
   return request("get", url, {}, true);
}

export function getBranchBuId(id) {
    const url = `${apiUrl}/api/pos/v1/branch/${id}`;
   return request("get", url, {}, true);
}


export function getRequestReasons() {
    const url = `${apiUrl}/api/pos/v1/requestreasons`;
   return request("get", url, {}, true);
}

export function getRequestReasonsById(id) {
    const url = `${apiUrl}/api/pos/v1/requestreasons/${id}`;
   return request("get", url, {}, true);
}

export function supplierproductAutocomplete(payload) {
    const url = `${apiUrl}/api/pos/v1/supplierproduct/supplierproduct-autocomplete`;
   return request("post", url, payload, true);
}

export function getBranchDetail() {
    const url = `${apiUrl}/api/pos/v1/branch/get-branch-detail`;
    return request("get", url, {}, true);
}

// ********************** [ SAVE DARFT] ********
export function getDraft() {
    const url = `${apiUrl}/api/pos/v1/request/get-save-draft-order`;
    return request("get", url, {}, true);
}

export function getDraftById(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-save-draft-order/${id}`;
    return request("get", url, {}, true);
}

export function saveDraft(payload) {
    const url = `${apiUrl}/api/pos/v1/request/save-draft-request-order-item`;
    return request("post", url, payload, true);
}

export function deleteDraft(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-save-draft-order/${id}`;
    return request("delete", url, {}, true);
}

//********************** [[suplierProduct ]] 
export function getsuplierProduct() {
    const url = `${apiUrl}/api/pos/v1/supplierproduct`;
    return request("get", url, {}, true);
}


