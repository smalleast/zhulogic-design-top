<template>
  <div class="pay-method-goods-action px20">
    <van-button
      :loading="loading"
      :disabled="loading"
      round
      type="warning"
      size="large"
      @click="handleClick"
    >确认支付</van-button>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { PAY_TYPE } from "@/constants";

import pingpp from "pingpp-js";

export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    //商品付款方式
    this.$on(GE.PAY_TYPE, res => {
      console.log(res);
      this.payType = res;
    });
  },
  data() {
    return {
      payType: "wx_wap",
      loading: false
    };
  },
  methods: {
    handleClick() {
      //点击按钮的动画
      this.loading = true;
      //呼起支付的页面
      this.payOrder();
    },
    async payOrder() {
      await this.api.orders
        .payOrder({
          orderId: this.detail.id,
          channel: this.payType
        })
        .then(res => {
          this.openWap(res);
          setTimeout(() => {
            //关闭点击按钮的动画
            this.loading = false;
          }, 1000);
        })
        .catch(res => {
          setTimeout(() => {
            //关闭点击按钮的动画
            this.loading = false;
          }, 1000);
        });
    },
    openWap(charge) {
      //支付宝回调地址
      charge.extra.success_url = this.successURL();
      //微信回调地址
      charge.extra.result_url = this.successURL();
      pingpp.createPayment(charge);
    },
    successURL() {
      return `${window.location.origin}/mall/payment/${this.detail.id}`;
    }
  }
};
</script>

