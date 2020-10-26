import Vue from 'vue'
import Vuex from 'vuex'

import prices from './prices'
import registerUserInfo from './registerUserInfo'
import departments from './departments'

Vue.use(Vuex)

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
      departments
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
