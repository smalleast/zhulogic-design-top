/**
 * Created by hooks huang on 2018/12/25.
 */
import api from '@/api'
import * as types from './mutation_types'
//获取地址数据
export const getAddressList = ({ commit }) => {
    return new Promise((resolve, reject) => {
        api.address.getLists({
            pageSize: 50,
            pageNum: 1
        }).then(res => {
            commit(types.ADDRESS_LIST, res.list)
            setTimeout(() => {
                resolve(res)
            }, 100)
        }).catch(res => {
            reject(res);
        })

    })

}

