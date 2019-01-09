<template>
  <div class="confirm-goods-action">
    <van-goods-action class="bottom-menu-fixed">
      <van-goods-action-big-btn
        :loading="loading"
        :disabled="loading"
        text="提交订单"
        @click="handleClick"
      />
    </van-goods-action>
    <nc-enough :visible="show"></nc-enough>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import NcEnough from "@/components/common/nc-enough";
export default {
  components: {
    NcEnough
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      product: {},
      loading: false
    };
  },
  mounted() {
    //商品收货地址ID
    this.$on(GE.ADDRESS_ID, res => {
      this.product.addressId = res;
    });
    //商品付款方式
    this.$on(GE.PRODUCT_PAY_METHOD, res => {
      this.product.exchangeMode = res;
    });
    //商品买家留言
    this.$on(GE.PRODUCT_BUY_MESSAGE, res => {
      this.product.buyMessage = res;
    });
  },
  methods: {
    handleClick() {
      //显示恐龙蛋不足
      //this.show = true;
      //点击按钮的动画
      this.loading = true;
      //创建订单
      this.createOrder();
    },
    async createOrder() {
      if (!this.product.addressId) {
        this.product.addressId = this.$store.getters.addressDefault.id;
      }
      let params = Object.assign({}, this.product, {
        products: [{ productId: this.detail.id, qtr: this.detail.num }]
      });
      //如果恐龙蛋充足，创建订单直接扣除恐龙蛋
      await this.api.orders
        .createOrder(params)
        .then(res => {
          //用恐龙蛋支付
          if (this.product.exchangeMode === 1) {
            this.$router.push({
                name: "MallPayment",
                params: { id: res.id }
              });
          } //跳转到收银台
          else {
            this.$router.push({
              name: "MallPaymethod",
              params: { id: res.id }
            });
          }
        })
        .catch(_ => {
          //动画结束
          this.loading = false;
        });
    }
  }
};
</script>

