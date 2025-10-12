import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;



export function getAddressProvinces() {
    const url = `${apiUrl}/api/address/provinces`;
    return request("get", url, {}, false);
  }

export function getAddressAmphuresById(id) {
const url = `${apiUrl}/api/address/amphures/${id}`;
return request("get", url, {}, false);
}

export function getAddressDistrictsById(id) {
const url = `${apiUrl}/api/address/districts/${id}`;
return request("get", url, {}, false);
}
