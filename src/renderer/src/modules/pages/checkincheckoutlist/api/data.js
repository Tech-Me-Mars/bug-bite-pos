import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function testcall(data) {
    const url = `${apiUrl}/api/poscenter/v1/management/permission_user`;
   return request("get", url, data, true);
}

export function getData() {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/`;
   return request("get", url, {}, true);
}

export function getCheckIn(data) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-in`;
   return request("post", url, data, true);
}
export function getCheckOut(data) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-out`;
   return request("post", url, data, true);
}