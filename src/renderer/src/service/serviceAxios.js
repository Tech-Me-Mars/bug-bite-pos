import axios from "axios";
axios.defaults.baseURL = "http://27.254.144.161:9021";
import router from '@/router/index.js';
const getToken = function () {
  return localStorage.getItem("token");
};

export async function request(method, url, data, auth = true) {
  const headers = {};
  if (auth) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
        // Handle other errors or exceptions, if necessary
    console.log('request catch (error) ',error);
        // If response status code is 401 (Unauthorized)
        // [[ กรณีกรอกรหัสผิด return 401]]
    if (error.response.status === 401) {
      // alert(error.response.data.message);
      localStorage.removeItem('token');
      await router.push({path:'/auth/login'});
    }
  // [[ กรณียิง Route APi ไปที่route ไม่ได้รับอนุญาติ  ]]
    if (error.response.status === 403) {
      await router.push({path:'/unauthorized'});
    }

    throw error;
  }
}
