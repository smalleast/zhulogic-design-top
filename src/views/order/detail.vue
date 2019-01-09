<template>
  <div class="order-detail py61">
    <div class="pl15">
      <nx-label class="h1 mb20">订单详情</nx-label>
      <!-- 订单状态 -->
      <detail-status :detail="detail"></detail-status>
      <!-- 订单收货地址 -->
      <detail-address :detail="detail"></detail-address>
      <!-- 商品详情 -->
      <detail-product :detail="detail"></detail-product>
      <!-- 买家留言 -->
      <detail-message :detail="detail"></detail-message>
    </div>
    <!-- 订单内容相关信息 -->
    <detail-content :detail="detail"></detail-content>
    <!-- 动作按钮 -->
    <detail-goods-action :detail="detail"></detail-goods-action>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import DetailStatus from "./detail/status";
import DetailAddress from "./detail/address";
import DetailProduct from "./detail/product";
import DetailMessage from "./detail/message";
import DetailContent from "./detail/content";
import DetailGoodsAction from "./detail/goods-action";
export default {
  components: {
    DetailStatus,
    DetailAddress,
    DetailProduct,
    DetailMessage,
    DetailContent,
    DetailGoodsAction
  },
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    //操作按钮之后，重新刷新数据
    this.$on(GE.ORDER_REFRESH, this.getDetail);
  },
  methods: {
    async getDetail() {
      let res = await this.api.orders.getOrderDetail(this.$route.params.id);
      this.detail = res;
      //设置页面标题
      this.$emit(GE.MALL_TITLE, this.detail.products[0].name);
      //关闭页面动画
      this.$emit(GE.MALL_LOADING, false);
    }
  },
  created() {
    //启动页面动画
    this.$emit(GE.MALL_LOADING);
    this.getDetail();
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    //如果判断是[支付完成页]
    if (["MallPayment","MallConfirm"].includes(to.name)) {
      //离开页面，则跳转到订单列表页
      next("/order/list");
    } else {
     next();
    }
  }
};
</script>
