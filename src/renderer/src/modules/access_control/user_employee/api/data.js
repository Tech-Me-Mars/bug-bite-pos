import { request } from "@/service/serviceAxios.js";

const apiUrl = process.env.URL_API;

export function getUserEmployee() {
  const url = `${apiUrl}/api/pos/v1/management/user_employee`;
  return request("get", url, {}, true);
}

export function getUserEmployeeById(id) {
  const url = `${apiUrl}/api/pos/v1/management/user_employee/${id}`;
  return request("get", url, {}, true);
}

export function saveUserEmployee(data) {
  const url = `${apiUrl}/api/pos/v1/management/user_employee`;
  return request("post", url, data, true);
}

export function updateUserEmployee(id, data) {
  const url = `${apiUrl}/api/pos/v1/management/user_employee/${id}`;
  return request("post", url, data, true);
}

export function deleteUserEmployee(id) {
  const url = `${apiUrl}/api/pos/v1/management/user_employee/${id}`;
  return request("delete", url, {}, true);
}

// [[PERMISSTIONS]]
export function getPermisstions() {
    const url = `${apiUrl}/api/pos/v1/management/std/permissions`;
    return request("get", url, {}, true);
  }


// [[POSITION]]
export function getPosition() {
  const url = `${apiUrl}/api/pos/v1/management/std/position`;
  return request("get", url, {}, true);
}