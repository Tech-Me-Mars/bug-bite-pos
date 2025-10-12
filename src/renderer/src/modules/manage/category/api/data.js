import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getCategory() {
    const url = `${apiUrl}/api/pos/v1/categoryshow`;
    return request("get", url, {}, true);
}

export function getCategoryById(id) {
    const url = `${apiUrl}/api/pos/v1/categoryshow/${id}`;
    return request("get", url, {}, true);
}

export function saveCategory(payload) {
    const url = `${apiUrl}/api/pos/v1/categoryshow`;
    return request("post", url, payload, true);
}

export function saveProductToCategory(payload) {
    console.log(JSON.stringify(payload));
    const url = `${apiUrl}/api/pos/v1/categoryshow/create-product`;
    return request("post", url, payload, true);
}

export function deleteProductToCategory(payload) {
    console.log(JSON.stringify(payload));
    const url = `${apiUrl}/api/pos/v1/categoryshow/delete-product`;
    return request("post", url, payload, true);
}

export function supplierproductAutocomplete(payload) {
    const url = `${apiUrl}/api/pos/v1/supplierproduct/supplierproduct-autocomplete`;
    return request("post", url, payload, true);
}