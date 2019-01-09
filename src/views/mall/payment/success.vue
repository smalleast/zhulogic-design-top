<template>
  <div class="payment-success mt50 tc">
    <nx-icon class="icon-wancheng c-f5 f40"></nx-icon>
    <nx-label class="mt20 c-32 f15">支付完成</nx-label>
    <div class="mt10" v-for="(item,index) in detail.products" :key="index" v-if="index===0">
      <!-- 恐龙蛋 -->
      <nx-layout class="row-col-center" v-if="[EXCHANGE_MODE.EGG].includes(detail.exchangeMode)">
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}</nx-label>
      </nx-layout>
      <!-- 恐龙蛋+人民币 -->
      <nx-layout class="row-col-center" v-if="[EXCHANGE_MODE.GROUP].includes(detail.exchangeMode)">
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}+{{detail.paidPrice| currency('¥', '2')}}</nx-label>
      </nx-layout>
      <!-- 人民币 -->
      <nx-layout class="row-col-center" v-if="[EXCHANGE_MODE.MONEY].includes(detail.exchangeMode)">
        <nx-label class="c-ea f18">{{item.paidPrice | currency('¥', '2')}}</nx-label>
      </nx-layout>
    </div>
    <nx-layout class="row-col-center mt50">
      <van-button round plain type="warning" size="small" @click="handleOrderList">查看订单</van-button>
      <van-button round class="ml40" type="warning" size="small" @click="handleMallList">继续购物</van-button>
    </nx-layout>
    <nx-label class="mt30 h2 tl pl15">送货信息</nx-label>
    <nx-label class="mt8 px15 c-87 tl line-text">我们将尽快安排发货，请买家保持手机通讯畅通，以便 快递哥哥能第一时间见到您。</nx-label>
    <nx-label class="mt30 payment-success-tip c-a2 f13 tl">
      <nx-icon class="icon-tips"></nx-icon>安全提醒：住逻辑不会以任何理由要求您提供银行 信息或支付额外费用，请谨防钓鱼链接和诈骗电话。
    </nx-label>
  </div>
</template>
<script>
import { EXCHANGE_MODE } from "@/constants";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EXCHANGE_MODE
    };
  },
  methods: {
    handleOrderList() {
      this.$router.push({
        name: "OrderDetail",
        params: { id: this.detail.id }
      });
    },
    handleMallList() {
      this.$router.push({
        name: "MallList"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-success {
  &-tip {
    width: 313px;
    border-radius: 5px;
    background-color: #f8f8f8;
    margin-left: auto;
    margin-right: auto;
    line-height: 20px;
    padding: 15px;
  }
}
</style>

