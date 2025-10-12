import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getBranchItemStatus() {
    const url = `${apiUrl}/api/pos/v1/branchitem_barcode/get-branch-item-status`;
   return request("get", url, {}, true);
}
export function getBranchItemCategory() {
    const url = `${apiUrl}/api/pos/v1/branchitem_barcode/get-branch-item-category`;
   return request("get", url, {}, true);
}
export function getBranchItem(payload) {
    const url = `${apiUrl}/api/pos/v1/branchitem_barcode/get-branch-item`;
   return request("post", url, payload, true);
}
export function getBranchDetail() {
    const url = `${apiUrl}/api/pos/v1/branch/get-branch-detail`;
    return request("get", url, {}, true);
}

export function createBarCode(barnchId,base64) {
    const url = `${apiUrl}/api/pos/print/sticker_barcode?branch_id=${barnchId}&item_id=${base64}`;
    return (url);
//    return request("get", url, {}, true);
}



