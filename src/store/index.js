import Vue from 'vue'
import Vuex from 'vuex'

import prices from './prices'
import registerUserInfo from './registerUserInfo'
import departments from './departments'
import studentInfo from './studentInfo'
import questions from './questions'
import notifications from './notifications'
import instructorInfo from './instructorInfo'
import authInfo from './authInfo'


Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function ( { ssrContext } ) {
  const Store = new Vuex.Store({
    modules: {
      prices,
      registerUserInfo,
      departments,
      studentInfo,
      questions,
      notifications,
      instructorInfo,
      authInfo
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
