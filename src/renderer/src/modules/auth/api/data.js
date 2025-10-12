import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;
// const apiUrl = import.meta.env.URL_API;

export function login(data) {
    console.log('login')
    console.log(apiUrl)
    const url = `${apiUrl}/api/auth/login`;
   return request("post", url, data, false);
}

export function logout() {
   
    const url = `${apiUrl}/api/auth/logout`;
   return request("post", url, {}, true);
}