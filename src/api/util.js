import Vue from 'vue';
import axios from 'axios';
import router from "../router";
import store from "../store";
import { Notify } from "vant";
Vue.use(Notify);
let util = {};
let ajaxUrl = process.env.VUE_APP_AJAX_URL

console.log(ajaxUrl)
util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});
// http request 拦截器
util.ajax.interceptors.request.use(
  config => {
    let token = {};
    try {
      token = JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      token = {}
    }
    if (token.accessToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${token.accessToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
util.ajax.interceptors.response.use(
  response => {
    switch (response.data.status_code) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        store.dispatch("clearUser");
        console.log(router.currentRoute.path);
        /* if (router.currentRoute.path !== "/login/") {
          router.replace({
            path: "/login/",
            query: { redirect: router.currentRoute.fullPath }
          });
        } */
        return Promise.reject(response.data);
      case 400:
        Notify(response.data.message);
        return Promise.reject(response);
      case 500:
        Notify("服务器出错了,稍后再试");
        return Promise.reject(response);
      case 200:
        return response.data.data;
      default:
        return response;
    }
  },
  error => {
    console.log(error);
    if (error.response) {
      return Promise.reject(error.response.data); // 返回接口返回的错误信息
    } else {
      console.log(String(error));
      let errorMsg = String(error);
      if (errorMsg.includes("Error: timeout")) {
        Notify("请求超时,请稍后刷新");
      } else if (errorMsg.includes("Network Error")) {
        Notify("网络出错了,请稍后刷新");
      } 
    }
  }
);
export default util;
