import { GUEST_REGISTRATION_ENDPOINT, GUEST_BUY_ENDPOINT, GUEST_REQUEST_ENDPOINT  } from '../../api/constants';
import Vue from "vue";
export async  function  sendRegisterData ( context ) {
  let data =  {
    NAME: context.state.name,
    LAST_NAME: context.state.lastName,
    PHONE: context.state.phone,
    EMAIL: context.state.email,
    PASSWORD: context.state.password,
  };
return Vue.prototype.$axios
    .post(GUEST_REGISTRATION_ENDPOINT, data).then(response => {
    return !!response.data.success;
  })
    .catch(error => {
      throw new Error("action sendRegisterData " + error);
    });
}

export async  function  sendPaymentInfo ( context, paymentinfo ) {
  let data =  {
    NAME: context.state.name,
    LAST_NAME: context.state.lastName,
    PHONE: context.state.phone,
    EMAIL: context.state.email,
    PRODUCT_ID: context.state.tariffId,
    BRANCH: context.state.department,
    CATEGORY: "B", // TODO убрать статику - только для теста!
    GIFT: context.state.isGift,
    PAYMENT_INFO: paymentinfo,
  };
  return Vue.prototype.$axios
    .post(GUEST_BUY_ENDPOINT, data)
    .then(response => {
      return !!response.data.success;
    })
    .catch(error => {
      throw new Error("action sendPaymentInfo " + error);
    });
}

export async  function  sendGuestRequest ( context ) {
  let data =  {
    NAME: context.state.name,
    LAST_NAME: context.state.lastName,
    PHONE: context.state.phone,
    EMAIL: context.state.email,
    PRODUCT_ID: context.state.tariffId,
    BRANCH: context.state.department,
    CATEGORY:  context.state.category,
    GIFT: context.state.isGift,
  };
  return Vue.prototype.$axios
    .post(GUEST_REQUEST_ENDPOINT, data).then(response => {
      return !(response.data && response.data.error);

    })
    .catch(error => {
      throw new Error("action sendGuestRequest " + error);
    });
}