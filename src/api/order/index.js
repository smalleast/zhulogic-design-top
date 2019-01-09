import util from "../util";
import apiConfig from "../config";
export default {
  getEvaluation(params) {
    return util.ajax.get(apiConfig.order.getEvaluation(params));
  },
  createEvaluation(params) {
    return util.ajax.post(apiConfig.order.createEvaluation(), params);
  },
  createOrder(params) {
    return util.ajax.post(apiConfig.order.createOrder(), params);
  },
  payEgg(params) {
    return util.ajax.post(apiConfig.order.payEgg(), params);
  },
  getOrderDetail(id) {
    return util.ajax.get(apiConfig.order.getOrderDetail(id));
  },
  payOrder(params) {
    return util.ajax.post(apiConfig.order.payOrder(), params);
  },
  getLists(params) {
    return util.ajax.post(apiConfig.order.getLists(), params);
  },
  getStatus() {
    return util.ajax.get(apiConfig.order.getStatus());
  },
  channelOrders(params) {
    return util.ajax.post(apiConfig.order.channelOrders(),params);
  },
  deleteOrders(params) {
    return util.ajax.delete(apiConfig.order.deleteOrders(), { data: params});
  },
  confirmReceipt(params) {
    return util.ajax.post(apiConfig.order.confirmReceipt(), params);
  },
  hasPayOrdered() {
    return util.ajax.get(apiConfig.order.hasPayOrdered());
  },
  upload(type) {
    return util.ajax.get(apiConfig.order.upload(type));
  },
  getExpress(id) {
    return util.ajax.get(apiConfig.order.getExpress(id));
  },
}; 
