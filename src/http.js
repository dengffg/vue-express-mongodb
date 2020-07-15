import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is 
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
        Vue.prototype.$message({type: 'error', message: error.response.data.message})
        router.push('/login')
        
    } else if (error.response.data.message) {
        Vue.prototype.$message({type: 'error', message: error.response.data.message})
    }
    
    return Promise.reject(error)
  });

export default http