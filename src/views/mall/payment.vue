<template>
  <div class="mall-payment py61">
    <nx-label class="h1 pl15">支付订单</nx-label>
    <!-- 支付成功 -->
    <payment-success :detail="detail" v-if="[PAY_STATUS.PAY_SUCCESS].includes(detail.payStatus)"></payment-success>
    <!-- 支付失败 -->
    <payment-failed v-if="[PAY_STATUS.PAY_FAILD].includes(detail.payStatus)"></payment-failed>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import {PAY_STATUS} from "@/constants";
import PaymentSuccess from "./payment/success";
import PaymentFailed from "./payment/failed";
export default {
  data() {
    return {
      PAY_STATUS,
      detail:{}
    };
  },
  components: {
    PaymentSuccess,
    PaymentFailed,
  },
  methods: {
    async getOrderDetail() {
      let res = await this.api.orders.getOrderDetail(this.$route.params.id);
      this.detail = res;
    }
  },
  created() {
    this.getOrderDetail();
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "支付成功");
  }
};
</script>


