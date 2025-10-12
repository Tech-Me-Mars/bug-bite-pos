import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;
// const apiUrl = import.meta.env.URL_API;

export function dataDashboard() {
    const url = `${apiUrl}/api/pos/v1/dashboard/get-dashboard-main`;
    return request("get", url, {}, true);
}