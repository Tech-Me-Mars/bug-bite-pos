import { request } from "@/service/serviceAxios.js";
const apiUrl = process.env.URL_API;

export function getUserAccessMenu() {
    const url = `${apiUrl}/api/auth/user_menu_access`;
    return request("get", url, {}, true);
}