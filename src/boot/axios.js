import Vue from "vue";
import axios from "axios";
import { Loading } from "quasar";
import errorHelper from '../utils/errorHelper';

Vue.prototype.$axios = axios;
export default ({ app, router, store, Vue }) => {
  axios.interceptors.request.use(
    createSetAuthInterceptor(store.state.authInfo)
  );
  axios.interceptors.request.use(startPreloaderInterceptor, ErrorRequestHandler);
  axios.interceptors.response.use(stopPreloaderInterceptor, ErrorRequestHandler);
  axios.interceptors.response.use(serverResponseErrorHandler, ErrorRequestHandler);




};

const createSetAuthInterceptor = options => config => {
  if (options.token) {
    // config.url =config.url+options.token+'/' ;
    //  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers["Content-Type"] = "text/plain;charset=utf-8";
    config.headers.Authorization = 'Bearer '+ options.token;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

const startPreloaderInterceptor = function(res) {
  Loading.show();
  return res;
};

const stopPreloaderInterceptor = function(res) {
  Loading.hide();
  return res;
};

const ErrorRequestHandler = function(error) {
  Loading.hide();
  console.log(error);
  Vue.prototype.$eventBus.$emit('error', {header : 'Ошибка соединения', text: error});
  return Promise.reject(error);
};


const serverResponseErrorHandler = function(res) {
  errorHelper(res);
  return res;
};
