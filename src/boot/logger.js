import Vue from 'vue';

Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};
Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`);
};
