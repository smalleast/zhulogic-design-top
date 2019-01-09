import Vue from 'vue';

import FastClick from 'fastclick'
//解决延迟300ms点击的效果
FastClick.attach(document.body)
import VueEventProxy from 'vue-event-proxy'
//全局事件代理
Vue.use(VueEventProxy)
//加载并注册路由组件
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//加载并注册复制粘贴组件
import VueCopy from 'vue-copy'
Vue.use(VueCopy);
//加载并注册Vant组件
import Vant from './vant-ui.js';
Vue.use(Vant);
//引用iconfont样式
import '../static/font/iconfont.js';
import '../static/font/iconfont.css';
//通用组件
import GenericComponents from 'components/generic/index.js';
Vue.use(GenericComponents)
//引用通用方法函数
import PrototypeComponents from 'components/prototype/index.js';
Vue.use(PrototypeComponents)
//引用过滤器
import './components/services/filter';
//引用公用scss样式
import 'components/styles/index.scss';
//引用错误日志监控文件 
//import 'components/services/error.js';
