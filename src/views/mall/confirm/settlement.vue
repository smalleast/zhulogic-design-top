<template>
  <div class="confirm-settlement pr10">
    <nx-layout>
      <div>商品件数</div>
      <div class="col tr">x {{detail.num}}</div>
    </nx-layout>
    <nx-layout class="mt10">
      <div>商品总计</div>
      <div class="col tr c-3e">{{(detail.price*detail.num) | currency('¥', '2')}}</div>
    </nx-layout>
    <nx-layout class="mt10">
      <div>恐龙蛋抵扣</div>
      <!-- 恐龙蛋 -->
      <div class="col tr" v-if="[1].includes(exchangeMode)">
        <span class="c-3e mr5">-{{point.discountMoney| currency('¥', '2')}}</span>
        <span class="c-87">(
          <nx-icon class="icon-konglongdan3 c-87"></nx-icon>
          <span>{{point.egg}} )</span>
        </span>
      </div>
      <!-- 恐龙蛋+人民币 -->
      <div class="col tr" v-if="[2].includes(exchangeMode)">
        <span class="c-3e mr5">-{{point.discountMoney| currency('¥', '2')}}</span>
        <span class="c-87">(
          <nx-icon class="icon-konglongdan3 c-87"></nx-icon>
          <span>{{point.egg}} )</span>
        </span>
      </div>
      <!-- 人民币 -->
      <div class="col tr" v-if="[3].includes(exchangeMode)">
        <span class="c-3e mr5">-{{point.egg| currency('¥', '2')}}</span>
      </div>
    </nx-layout>
    <div class="mt15 line-1"></div>
    <!-- 恐龙蛋-->
    <nx-layout class="mt15" v-if="[1].includes(exchangeMode)">
      <div class="h2">应付</div>
      <div class="col"></div>
      <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
      <nx-label class="c-ea f18">{{point.egg}}</nx-label>
    </nx-layout>
    <!-- 恐龙蛋+人民币 -->
    <nx-layout class="mt15" v-if="[2].includes(exchangeMode)">
      <div class="h2">应付</div>
      <div class="col"></div>
      <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
      <nx-label class="c-ea f18">{{point.egg}}</nx-label>
      <nx-label class="c-ea f18">+</nx-label>
      <nx-label class="c-ea f18">{{point.money| currency('¥', '2')}}</nx-label>
    </nx-layout>
    <!-- 人民币 -->
    <nx-layout class="mt15" v-if="[3].includes(exchangeMode)">
      <div class="h2">应付</div>
      <div class="col"></div>
      <nx-label class="c-ea f18">{{point.money | currency('¥', '2')}}</nx-label>
    </nx-layout>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { EXCHANGE_MODE, EGG_EXCHARGE_RATE } from "@/constants";

import { eggToMoney } from "@/utils/egg";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      point: {},
      exchangeMode: 1,
      paidPrice: 0
    };
  },
  methods: {
    calcPayMethod() {
      //兑换方式
      this.exchangeMode = this.detail.activeIndex;
      //总金额=单件*数量
      const totalPrice = this.detail.price * this.detail.num;
      switch (this.detail.activeIndex) {
        case EXCHANGE_MODE.EGG:
          this.point = {
            egg: totalPrice * EGG_EXCHARGE_RATE,
            money: totalPrice,
            discountMoney: totalPrice
          };
          break;
        case EXCHANGE_MODE.GROUP:
          let egg = this.detail.balance;
          let money = totalPrice - eggToMoney(this.detail.balance);
          const totalPriceEgg = totalPrice * EGG_EXCHARGE_RATE;

          // 边界值，实付恐龙蛋数量是否大于总价
          if (egg > totalPriceEgg) egg = totalPriceEgg;
          // 边界值，实付金额是否小于 0
          if (money < 0) money = 0;
          this.point = {
            egg: egg,
            money: money,
            discountMoney: eggToMoney(this.detail.balance)
          };
          break;
        case EXCHANGE_MODE.MONEY:
          this.point = {
            egg: 0,
            money: totalPrice
          };
          break;
      }

      this.$emit(GE.PRODUCT_PAY_METHOD, this.exchangeMode);
    },
    checkEgg() {}
  },
  watch: {
    detail(curr) {
      this.calcPayMethod();
    }
  },
  created() {
    this.calcPayMethod();
  }
};
</script>

