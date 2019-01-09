//自定义通用组件
import NxLayout from './nx-layout'
import NxLabel from './nx-label'
import NxBadge from './nx-badge'
import NxPhoto from './nx-photo'
import NxIcon from './nx-icon'
import NxTag from './nx-tag'
import NxCustomBar from './nx-custom-bar'
import NxDefault from './nx-default'

export default {
  install:function(Vue){
    Vue.component('nx-layout', NxLayout);
    Vue.component('nx-label', NxLabel);
    Vue.component('nx-badge', NxBadge);
    Vue.component('nx-photo', NxPhoto);
    Vue.component('nx-icon', NxIcon);
    Vue.component('nx-tag', NxTag);
    Vue.component('nx-custom-bar', NxCustomBar);
    Vue.component('nx-default', NxDefault);
  }
}