<template>
  <div class="detail-content mt15 pl15 pb50">
    <nx-layout>
      <nx-label>订单编号</nx-label>
      <nx-label class="col tr">{{detail.code}}</nx-label>
      <div class="pl10 pr15">
        <!-- 复制按钮 -->
        <common-copy :code="detail.code"></common-copy>
      </div>
    </nx-layout>
    <nx-layout class="mt10">
      <nx-label class="col">下单时间</nx-label>
      <nx-label class="pr15 tr c-87">{{detail.createTime | toDateTime}}</nx-label>
    </nx-layout>
    <div class="line-1 my15"></div>
    <nx-layout>
      <nx-label class="col">订单总计</nx-label>
      <nx-label class="pr15 c-3e">{{detail.totalPrice | currency('¥', '2')}}</nx-label>
    </nx-layout>
    <div v-for="(item,index) in detail.products" :key="index" class="pr15">
      <nx-layout class="mt10">
        <nx-label class="col">恐龙蛋抵扣</nx-label>
        <!-- 恐龙蛋 -->
        <div class="col tr" v-if="[EXCHANGE_MODE.EGG].includes(detail.exchangeMode)">
          <span class="c-3e mr5">-{{item.paidEgg| currency('¥', '2')}}</span>
          <span class="c-87">(
            <nx-icon class="icon-konglongdan3 c-87"></nx-icon>
            <span>{{item.paidEgg}} )</span>
          </span>
        </div>
        <!-- 恐龙蛋+人民币 -->
        <div class="col tr" v-if="[EXCHANGE_MODE.GROUP].includes(detail.exchangeMode)">
          <span class="c-87 mr5">-{{item.paidEgg/EGG_EXCHARGE_RATE | currency('¥', '2')}}</span>
          <span class="c-87">(
            <nx-icon class="icon-konglongdan3 c-87"></nx-icon>
            <span>{{item.paidEgg}} )</span>
          </span>
        </div>
        <!-- 人民币 -->
        <div class="col tr" v-if="[EXCHANGE_MODE.MONEY].includes(detail.exchangeMode)">
          <span class="c-3e mr5">-{{item.paidEgg | currency('¥', '2')}}</span>
        </div>
      </nx-layout>
      <div class="line-1 my15"></div>
      <!-- 恐龙蛋-->
      <nx-layout class="mt15" v-if="[EXCHANGE_MODE.EGG].includes(detail.exchangeMode)">
        <div class="h2">订单实付款</div>
        <div class="col"></div>
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}</nx-label>
      </nx-layout>
      <!-- 恐龙蛋+人民币 -->
      <nx-layout class="mt15" v-if="[EXCHANGE_MODE.GROUP].includes(detail.exchangeMode)">
        <div class="h2">订单实付款</div>
        <div class="col"></div>
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}</nx-label>
        <nx-label class="c-ea f18">+</nx-label>
        <nx-label class="c-ea f18">{{item.paidPrice| currency('¥', '2')}}</nx-label>
      </nx-layout>
      <!-- 人民币 -->
      <nx-layout class="mt15" v-if="[EXCHANGE_MODE.MONEY].includes(detail.exchangeMode)">
        <div class="h2">订单实付款</div>
        <div class="col"></div>
        <nx-label class="c-ea f18">{{item.paidPrice | currency('¥', '2')}}</nx-label>
      </nx-layout>
    </div>
    <div class="line-1 mt15"></div>
  </div>
</template>
<script>
import { EGG_EXCHARGE_RATE, EXCHANGE_MODE } from "@/constants";
import CommonCopy from "../common/copy";
export default {
  components:{
    CommonCopy
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EGG_EXCHARGE_RATE,
      EXCHANGE_MODE
    };
  },
};
</script>

