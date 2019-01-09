<template>
  <div class="pay-method-total tc">
    <nx-label class="c-32">应付总额</nx-label>
    <div v-for="(item,index) in detail.products" :key="index" v-if="index===0">
      <!-- 恐龙蛋 -->
      <nx-layout class="mt10 row-col-center" v-if="[1].includes(detail.exchangeMode)">
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}</nx-label>
      </nx-layout>
      <!-- 恐龙蛋+人民币 -->
      <nx-layout class="mt10 row-col-center" v-if="[2].includes(detail.exchangeMode)">
        <nx-icon class="icon-konglongdan3 c-ea"></nx-icon>
        <nx-label class="c-ea f18">{{item.paidEgg}}+{{item.paidPrice | currency('¥', '2')}}</nx-label>
      </nx-layout>
      <!-- 人民币 -->
      <nx-layout class="mt10 row-col-center" v-if="[3].includes(detail.exchangeMode)">
        <nx-label class="c-ea f18">{{item.paidPrice | currency('¥', '2')}}</nx-label>
      </nx-layout>
    </div>
    <nx-label class="mt10 c-87">剩余支付时间 {{countdown}}</nx-label>
  </div>
</template>
<script>
import {
  orderPayEndDuration,
  startCountdown,
  stopCountdown
} from "@/utils/countdown";

export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      countdownDuration: ""
    };
  },
  destroyed() {
    stopCountdown();
  },
  computed: {
    countdown() {
      if (!this.countdownDuration) return "0:00:00";
      return this.moment
        .utc(this.countdownDuration.asMilliseconds())
        .format("HH:mm:ss");
    },

    disabledPay() {
      return this.countdown === "0:00:00";
    }
  },
  methods: {
    initCountDown() {
      this.countdownDuration = orderPayEndDuration(this.detail.createTime);
      if (this.countdownDuration) {
        startCountdown(this.countdownDuration, duration => {
          this.countdownDuration = duration;
        });
      }
    }
  },
  watch: {
    detail(curr) {
      this.initCountDown();
    }
  },
  created() {
    this.initCountDown();
  }
};
</script>

