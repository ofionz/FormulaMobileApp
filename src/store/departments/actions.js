import errorHelper from "../../utils/errorHelper";
import { BRANCHES_ENDPOINT } from '../../api/constants';
import Vue from "vue";

export async  function  fetchBranches ( context ) {
  return Vue.prototype.$axios
    .get(BRANCHES_ENDPOINT)
    .then(response => {
      if (errorHelper(response) && response.data) {
        context.commit("setDepartments", response.data);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      throw new Error("action fetchBranches " + error);
    });
}
