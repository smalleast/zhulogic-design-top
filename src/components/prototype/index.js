import moment from 'moment';
import api from '@/api';
import terminal from '@/utils/terminal-interaction';
import generic from '@/utils/generic-method';
export default {
  install: function (Vue) {
    Vue.prototype.moment = moment;//时间函数插件
    Vue.prototype.api = api;//接口封装类
    Vue.prototype.terminal = terminal;//与终端交互接口封装类
    Vue.prototype.generic = generic;//通用方法工具类
  }
}