import Vue from 'vue'
import Router from 'vue-router'

import TestRouter from './test'

Vue.use(Router)
let routerObj = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
      redirect: 'mall/list'
    },
    {
      path: '',
      component: () => import('@/layouts/container.vue'),
      children: [
        //我的兑换订单列表
        {
          path: '/order/list',
          name: 'OrderList',
          meta:{index:0},
          component: () => import('@/views/order/list.vue')
        },
        //我的兑换详情
        {
          path: '/order/detail/:id',
          name: 'OrderDetail',
          meta:{index:1},
          component: () => import('@/views/order/detail.vue')
        },
        //发表评价
        {
          path: '/order/comment/:id',
          name: 'OrderComment',
          meta: { index: 2 },
          component: () => import('@/views/order/comment.vue')
        },
        //消息管理
        {
          path: '/message/order',
          name: 'MessageOrder',
          meta: { index: 2 },
          component: () => import('@/views/message/order.vue')
        },
        {
          path: '/message/point',
          name: 'MessagePoint',
          meta: { index: 2},
          component: () => import('@/views/message/point.vue')
        },
        //商品列表
        {
          path: '/mall/list',
          name: 'MallList',
          meta: { index: 0 },
          component: () => import('@/views/mall/list.vue')
        },
        //商品详情
        {
          path: '/mall/detail/:id',
          name: 'MallDetail',
          meta: { index: 1 },
          component: () => import('@/views/mall/detail.vue')
        },
        //地址选择页面
        {
          path: '/mall/address',
          name: 'MallAddress',
          meta: { index: 3},
          component: () => import('@/views/mall/address.vue')
        },
        //地址修改页面 
        {
          path: '/mall/address/edit/:id',
          name: 'MallAddressEdit',
          meta: { index: 4},
          component: () => import('@/views/mall/address-edit.vue')
        },
        //评价列表
        {
          path: '/mall/comment/:id',
          name: 'MallComment',
          meta: { index: 3 },
          component: () => import('@/views/mall/comment.vue')
        },
        //确认订单
        {
          path: '/mall/confirm',
          name: 'MallConfirm',
          meta: { index: 2 },
          component: () => import('@/views/mall/confirm.vue')
        },
        //住逻辑收银台
        {
          path: '/mall/paymethod/:id',
          name: 'MallPaymethod',
          meta: { index: 4 },
          component: () => import('@/views/mall/pay-method.vue')
        },
        //付款结果
        {
          path: '/mall/payment/:id',
          name: 'MallPayment',
          meta: { index: 5 },
          component: () => import('@/views/mall/payment.vue')
        }
      ]
    },
    ...TestRouter
  ],
  
});

export default routerObj;
