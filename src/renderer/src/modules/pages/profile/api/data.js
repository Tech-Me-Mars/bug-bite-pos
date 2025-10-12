import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getMeData() {
    const url = `${apiUrl}/api/pos/v1/profile/me`;
   return request("get", url, {}, true);
}
export function updateMeData(payload) {
    const url = `${apiUrl}/api/pos/v1/profile/me`;
   return request("put", url, payload, true);
}



