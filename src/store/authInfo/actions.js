import Vue from 'vue';
import errorHelper from '../../utils/errorHelper';
import { ROLES_ENDPOINT, AUTH_ENDPOINT } from '../../api/constants';

export async function login(context, args) {
  return Vue.prototype.$axios
    .post(AUTH_ENDPOINT, args)
    .then(response => {
      if (response.data.token) {
        context.commit('setToken', response.data.token);
        context.commit('setRoles', response.data.profiles);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error('action login ' + error);
    });
}


export async function selectRole(context, role) {
  let data ={};
  data[role.type] = role.id;
  return Vue.prototype.$axios
    .post(ROLES_ENDPOINT, data)
    .then(response => {
      if (response.data.success) {
        context.commit('setRole', role);
        return true;
      }
      return false;
    })
    .catch(error => {
      throw new Error('action selectRole ' + error);
    });
}
