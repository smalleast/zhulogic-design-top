import util from "../util";
import apiConfig from "../config";
export default {
  getAdverts() {
    return util.ajax.get(apiConfig.home.getAdverts());
  },
};
