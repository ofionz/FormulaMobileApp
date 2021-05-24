import Vue from "vue";
import errorHelper from "../../utils/errorHelper";
import { ROLES_ENDPOINT, AUTH_ENDPOINT } from "../../api/constants";
export async function login(context, args) {
  return Vue.prototype.$axios
    .get(AUTH_ENDPOINT, {
      params: args
    })
    .then(response => {
      if (response.data.token) {
        context.commit("setToken", response.data.token);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action login " + error);
    });
}

export async function fetchRoles(context) {
  return Vue.prototype.$axios
    .get(ROLES_ENDPOINT)
    .then(response => {
      if (response.data) {
        context.commit("setRoles", response.data);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchRoles " + error);
    });
}

export async function selectRole(context, roleId) {
  return Vue.prototype.$axios
    .post(ROLES_ENDPOINT, {   ACTION: "SET_PROFILE", ID: roleId  })
    .then(response => {
      return errorHelper(response);
    })
    .catch(error => {
      throw new Error("action selectRole " + error);
    });
}
