<template>
  <div class="mall-confirm py61">
    <nx-label class="h1 ml15">确认订单</nx-label>
    <!-- 地址选择 -->
    <confirm-address class="mt25"></confirm-address>
    <div class="pl15">
      <div class="line-1"></div>
      <!-- 订单商品信息 -->
      <confirm-product :detail="detail" class="mt15"></confirm-product>
      <div class="line-1 mt15"></div>
    </div>
    <!-- 买家留言 -->
    <confirm-message class="mt15"></confirm-message>
    <div class="pl15">
      <div class="line-1"></div>
      <!-- 订单统计信息 -->
      <confirm-settlement :detail="detail" class="mt15"></confirm-settlement>
    </div>
    <!-- 提交订单按钮 -->
    <confirm-goods-action :detail="detail"></confirm-goods-action>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import nxStroe from "next-store";
import ConfirmAddress from "./confirm/address";
import ConfirmProduct from "./confirm/product";
import ConfirmMessage from "./confirm/message";
import ConfirmSettlement from "./confirm/settlement";
import ConfirmGoodsAction from "./confirm/goods-action";
export default {
  components: {
    ConfirmAddress,
    ConfirmProduct,
    ConfirmMessage,
    ConfirmSettlement,
    ConfirmGoodsAction
  },
  data() {
    return {
      detail: {},
      balance: 0
    };
  },
  methods: {
    getDetail() {
      const { sku_desc } = nxStroe.local;
      this.detail = Object.assign({}, sku_desc, { balance: this.balance });

      //关闭页面动画
      this.$emit(GE.MALL_LOADING, false);
    },
    async getBalance() {
      //获取恐龙蛋余额
      let res = await this.api.points.getBalance();
      this.balance = res;
      this.getDetail();
    }
  },
  created() {
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "确认订单");

    //启动页面动画
    this.$emit(GE.MALL_LOADING);
    //获取恐龙蛋余额
    this.getBalance();
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    //判断是否回退到商品详情页
    if (to.name == "MallDetail") {
      this.$dialog
        .confirm({
          message: "确定要放弃该订单吗",
          confirmButtonText: "我再想想",
          cancelButtonText: "去意已决"
        })
        .then(() => {
          next(false); //阻止跳转
        })
        .catch(() => {
          next(); //执行回退跳转
        });
    } else {
      next(); //执行跳转
    }
  }
};
</script>

