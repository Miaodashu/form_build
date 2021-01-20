import axios from "axios";
import { Message } from "element-ui";
const instance = axios.create({
  baseURL: "http://101.132.99.21:8122",
  timeout: 1000
});
instance.interceptors.request.use(function(config) {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.common["Authorization"] = "bearer " + accessToken;
  } else {
    config.headers.common["Authorization"] = "";
    // router.push({ name: "login" });
  }

  return config;
});
instance.interceptors.response.use(
  function(response) {
    if (response.data.code === 401) {
      Message.error("令牌失效,请重新登录");
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message.error(error.response.data.error_description);
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
export default instance;
