/**
 * Created by hooks huang on 2018/12/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
    addressList:[],
    addressDefault:{}
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
