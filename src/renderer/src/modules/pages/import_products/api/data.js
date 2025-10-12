import { request } from "@/service/serviceAxios.js";
const apiUrl = process.env.URL_API;


export function getBranchDetail() {
    const url = `${apiUrl}/api/pos/v1/branch/get-branch-detail`;
    return request("get", url, {}, true);
}

export function getRequestByBranchId(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-by-branch/${id}`;
    return request("get", url, {}, true);
}

// ************** [ เลือกใช้อย่างใดอย่างหนึ่งได้] ****************
// ************** [[ ดูรายการร้องขอในสาขาโดยใช้ ID ]]
export function getRequestItemReceiveId(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-request-item-receive/${id}`;
    return request("get", url, {}, true);
}
// ************** [[ ดูรายการร้องขอในสาขาโดยใช้ Request code ]]
export function getRequestItemReceiveCode(payload) {
    const url = `${apiUrl}/api/pos/v1/request/get-request-item-receive-code`;
    return request("post", url, payload, true);
}

// ************** [[ รับของเข้าคลังทุกรายการ ]]
export function receivedToBranch(payload) {
    console.log(JSON.stringify(payload));
    const url = `${apiUrl}/api/pos/v1/request/branch-recevied`;
   return request("post", url, payload, true);
}