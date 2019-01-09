/**
 * Created  2017/7/21.
 * Author hooks Huang
 */

import { constructQueryParams } from "./common";
let rootUrl = `/im_api`;
const rootZhuUrl=`/designer_api`;
export default {
  //主页
  home: {
    getAdverts: () => `${rootUrl}/index/advert`,//获取主页的广告
  },
  //地址
  address:{
    getLists: (params) => `${rootZhuUrl}/delivery_addresses` + constructQueryParams(params),//获取地址列表
    getDetail: (id) => `${rootZhuUrl}/delivery_addresses/${id}`,//获取地址详情
    getLocation:(id)=>`${rootZhuUrl}/location`,//获取城市列表
    setAddressDefault: (id) => `${rootZhuUrl}/delivery_addresses/set_default/${id}`,//修改收货地址
    saveAddress: () => `${rootZhuUrl}/delivery_addresses`,//保存新增的地址
  }, 
  //恐龙蛋
  point: {
    getBalance: (id) => `${rootZhuUrl}/points/balance`,//获取恐龙蛋余额
  }, 
  //单品
  product: {
    getLists: () => `${rootUrl}/products`,//获取商品列表
    getDetail: (id) => `${rootUrl}/products/${id}`,//获取商品详情
  },
  //订单
  order:{
    getEvaluation: (params) => `${rootUrl}/order/evaluation` + constructQueryParams(params),//获取订单评价
    createEvaluation: () => `${rootUrl}/order/evaluation`,//新增订单评价
    createOrder: () => `${rootUrl}/orders/create`,//创建订单
    payEgg: () => `${rootUrl}/orders/pay_egg`,//使用恐龙蛋付款
    getOrderDetail: (id) => `${rootUrl}/orders/${id}`,//获取订单详情
    payOrder: () => `${rootUrl}/orders/pay`,//去付款
    getLists: () => `${rootUrl}/orders`,//获取订单列表
    getStatus: () => `${rootUrl}/orders/status_num`,//获取订单状态列表
    channelOrders: () => `${rootUrl}/orders/channel`,//取消订单
    deleteOrders: () => `${rootUrl}/orders`,//删除订单
    confirmReceipt: () => `${rootUrl}/orders/confirm_receipt`,//确认收货
    hasPayOrdered: () => `${rootUrl}/orders/has_pay_ordered`,//是否下过家具订单
    upload: (type) => `${rootUrl}/files/policy?type=${type}`,//直接上传阿里所需要的参数
    getExpress: (id) => `${rootUrl}/orders/express/${id}`,//获取订单的物流信息
  }
};
