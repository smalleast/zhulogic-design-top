import util from "../util";
import apiConfig from "../config";
export default {
  getLists(params) {
    return util.ajax.get(apiConfig.address.getLists(params));
  },
  getDetail(id) {
    return util.ajax.get(apiConfig.address.getDetail(id));
  },
  getLocation() {
    return util.ajax.get(apiConfig.address.getLocation());
  }, 
  setAddressDefault(id) {
    return util.ajax.put(apiConfig.address.setAddressDefault(id));
  },
  saveAddress(params) {
    return util.ajax.post(apiConfig.address.saveAddress(), params);
  },
  saveAddressEdit(params) {
    return util.ajax.put(apiConfig.address.saveAddress(), params);
  },
}; 
