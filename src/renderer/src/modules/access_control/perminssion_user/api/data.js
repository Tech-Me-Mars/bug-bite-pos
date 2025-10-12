import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function permissionUserGet() {
    const url = `${apiUrl}/api/pos/v1/management/permission_user`;
    return request("get", url, {}, true);
}

export function permissionUserGetById(id) {
    const url = `${apiUrl}/api/pos/v1/management/permission_user/${id}`;
    return request("get", url, {}, true);
}

export function savePermissionUser(payload) {
    const url = `${apiUrl}/api/pos/v1/management/permission_user`;
    return request("post", url, payload, true);
  }

  export function deletePermissionUser(id) {
    const url = `${apiUrl}/api/pos/v1/management/permission_user/${id}`;
    return request("delete", url, {}, true);
  }

  //*****************[[ POSITION ]] ************/
export function getPosition() {
    const url = `${apiUrl}/api/pos/v1/management/std/position`;
    return request("get", url, {}, true);
  }
  
  
  // *****************[[ USERPOSITION]] ********/
  export function updateUserPosition(data,id) {
    const url = `${apiUrl}/api/pos/v1/management/user_position/${id}`;
    return request("put", url, data, true);
  }
  
  export function getUserPosition() {
    const url = `${apiUrl}/api/pos/v1/management/user_position`;
    return request("get", url, {}, true);
  }