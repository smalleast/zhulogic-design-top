import Vue from 'vue';
import {
  Cell, CellGroup, Button,
  Field, Loading, Actionsheet, Notify,
  Toast, Tabbar, TabbarItem,
  Tab, Tabs,
  Badge, BadgeGroup,
  Lazyload,
  Swipe, SwipeItem,
  List,
  PullRefresh,
  Sku,
  GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,
  Tag,
  NavBar,
  Checkbox, CheckboxGroup,
  Radio, RadioGroup,
  Dialog,
  AddressList, AddressEdit, Area,
  Popup,
  Picker,
  Stepper,
  Uploader,
  Step,Steps
} from 'vant';
Vue.use(Lazyload, { lazyComponent: true });
Vue.use(Dialog);
Vue.use(AddressEdit);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Step).use(Steps);
Vue.use(Uploader);
export default {
  install: function (Vue) {
    Vue.component('van-cell', Cell);
    Vue.component('van-cell-group', CellGroup);
    Vue.component('van-button', Button);
    Vue.component('van-field', Field);
    Vue.component('van-loading', Loading);
    Vue.component('van-actionsheet', Actionsheet);
    Vue.component('van-notify', Notify);
    Vue.component('van-toast', Toast);
    Vue.component('van-tabbar', Tabbar);
    Vue.component('van-tabbar-item', TabbarItem);
    Vue.component('van-tabs', Tabs);
    Vue.component('van-tab', Tab);
    Vue.component('van-badge', Badge);
    Vue.component('van-badge-group', BadgeGroup);
    Vue.component('van-swipe', Swipe);
    Vue.component('van-swipe-item', SwipeItem);
    Vue.component('van-list', List);
    Vue.component('van-pull-refresh', PullRefresh);
    Vue.component('van-sku', Sku);
    Vue.component('van-goods-action', GoodsAction);
    Vue.component('van-goods-action-big-btn', GoodsActionBigBtn);
    Vue.component('van-goods-action-mini-btn', GoodsActionMiniBtn);
    Vue.component('van-tag', Tag);
    Vue.component('van-nav-bar', NavBar);
    Vue.component('van-checkbox', Checkbox);
    Vue.component('van-checkbox-group', CheckboxGroup);
    Vue.component('van-radio', Radio);
    Vue.component('van-radio-group', RadioGroup);
    Vue.component('van-address-list', AddressList);
    Vue.component('van-area', Area);
    Vue.component('van-stepper', Stepper);

  }
}