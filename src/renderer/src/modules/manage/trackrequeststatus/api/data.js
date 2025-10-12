

import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;


export function getDataRequestByBranch(id) {
    const url = `${apiUrl}/api/pos/v1/request/get-by-branch/${id}`;
   return request("get", url, id, true);
}
