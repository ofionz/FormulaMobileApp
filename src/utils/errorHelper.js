import Vue from 'vue';

const errorHelper = function (response) {

  let error = response.data.error;
  if (response.data && !error) return true;
  else {
    let payload = { header: 'Ошибка', text: error.message };
    if (error.code === 13) {
      payload.header = 'Ошибка авторизации';
    }
    Vue.prototype.$eventBus.$emit('error', payload);
    return false;
  }
};


export default errorHelper;