import Vue from 'vue';
import VueRouter from '../router'

const errorHelper = function (response) {
  let error = response.data.error;
  if (response.data && !error && !response.data.message) return true;
  else if (response.data.message) {
    let payload = { header: '', text: response.data.message };
    Vue.prototype.$eventBus.$emit('error', payload);
  }
  else {
    let payload = { header: 'Ошибка', text: error.message };
    if (error.code === 13 || error.message === 'Не верный токен доступа') {
      payload.header = 'Ошибка авторизации';
      window.router.push({ name: 'login' }).then(() => Vue.prototype.$eventBus.$emit('error', payload) ).catch((err)=> {});
    }
    Vue.prototype.$eventBus.$emit('error', payload);
    return false;
  }
};


export default errorHelper;