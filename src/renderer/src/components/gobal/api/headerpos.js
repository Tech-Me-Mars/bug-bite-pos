import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


// check in check out
export function saveCheckIn(payload) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-in`;
   return request("post", url, payload, true);
}

export function saveCheckOut(payload) {
    const url = `${apiUrl}/api/pos/v1/checkincheckout/check-out`;
   return request("post", url, payload, true);
}