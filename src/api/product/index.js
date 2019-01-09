import util from "../util";
import apiConfig from "../config";
export default {
  getLists(params) {
    return util.ajax.post(apiConfig.product.getLists(), params);
  },
  getDetail(id) {
    return util.ajax.get(apiConfig.product.getDetail(id));
  },
};
