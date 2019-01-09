import util from "../util";
import apiConfig from "../config";
export default {
  getBalance() {
    return util.ajax.get(apiConfig.point.getBalance());
  },
};
