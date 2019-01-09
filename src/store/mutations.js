/**
 * Created by hooks huang on 2018/12/25.
 */
import Vue from 'vue'
import * as types from './mutation_types'

export default {
    [types.ADDRESS_LIST](state, data) {
        Vue.set(state, 'addressList', data);
        Vue.set(state, 'addressDefault', data.filter(item => item.isDefault===1)[0] || data[0]);
    },
}
