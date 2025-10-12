import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getRequestItemDataById(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-request-item-receive/${id}`;
   return request("get", url, {}, true);
}


export function receivedToBranch(payload) {
    const url = `${apiUrl}/api/pos/v1/request/branch-recevied`;
   return request("post", url, payload, true);
}

export function receivedToBranchByBarcode(payload) {
    const url = `${apiUrl}/api/pos/v1/request/branch-recevied-barcode`;
   return request("post", url, payload, true);
}
