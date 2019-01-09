<template>
  <div class="detail-status">
    <nx-layout>
      <div class="col">
        <nx-label class="h2" v-if="[ORDER_STATUS.WAIT_PAY].includes(detail.status)">买家待付款</nx-label>
        <nx-label class="h2" v-if="[ORDER_STATUS.WAIT_PACKAGE].includes(detail.status)">买家已付款</nx-label>
        <nx-label
          class="h2"
          v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)"
        >买家已发货</nx-label>
        <nx-label class="h2" v-if="[ORDER_STATUS.WAIT_COMMENT].includes(detail.status)">交易成功</nx-label>
        <nx-label class="h2" v-if="[ORDER_STATUS.FINISHED].includes(detail.status)">买家已评价</nx-label>
        <nx-label class="h2" v-if="[ORDER_STATUS.CANCEL].includes(detail.status)">买家已取消</nx-label>
        <nx-label class="h2" v-if="[ORDER_STATUS.CLOSED].includes(detail.status)">订单关闭</nx-label>
        <nx-label
          class="f12 c-a2 mt5"
          v-if="[ORDER_STATUS.WAIT_PAY,ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)"
        >
          <span v-if="[ORDER_STATUS.WAIT_PAY].includes(detail.status)">付款</span>
          <span v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)">收货</span> 截止时间：剩余
          <span class="c-3e">{{countdownDD}}</span>天
          <span class="c-3e">{{countdownHH}}</span>小时
          <span class="c-3e">{{countdownMM}}</span>分
        </nx-label>
      </div>
      <div class="pr10">
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.WAIT_PAY"
          v-if="[ORDER_STATUS.WAIT_PAY].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.WAIT_PACKAGE"
          v-if="[ORDER_STATUS.WAIT_PACKAGE].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.WAIT_RECEIVE_PACKAGE"
          v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.WAIT_COMMENT"
          v-if="[ORDER_STATUS.WAIT_COMMENT].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.FINISHED"
          v-if="[ORDER_STATUS.FINISHED].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.CANCEL"
          v-if="[ORDER_STATUS.CANCEL].includes(detail.status)"
        ></nx-photo>
        <nx-photo
          class="icon"
          :lazy="ORDER_STATUS_ICON.CLOSED"
          v-if="[ORDER_STATUS.CLOSED].includes(detail.status)"
        ></nx-photo>
      </div>
    </nx-layout>
    <div class="line-1 mt20"></div>
  </div>
</template>
<script>
import { ORDER_STATUS, ORDER_STATUS_ICON, COUNTDOWN_DATE } from "@/constants";
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
      ORDER_STATUS,
      ORDER_STATUS_ICON,
      countdownDuration: ""
    };
  },
  computed: {
    countdownDD() {
      if (!this.countdownDuration) return "00";
      return this.moment
        .utc(this.countdownDuration.asMilliseconds())
        .format("DD")-1;
    },
    countdownHH() {
      if (!this.countdownDuration) return "00";
      return this.moment
        .utc(this.countdownDuration.asMilliseconds())
        .format("HH");
    },

    countdownMM() {
      if (!this.countdownDuration) return "00";
      return this.moment
        .utc(this.countdownDuration.asMilliseconds())
        .format("mm");
    },

    disabledPay() {
      return !this.countdownDuration;
    }
  },

  destroyed() {
    stopCountdown();
  },

  watch: {
    detail: {
      handler(val) {
        // 当订单在待付款状态，启动付款截止时间倒计时
        if (val.status === ORDER_STATUS.WAIT_PAY) {
          this.countdownDuration = orderPayEndDuration(
            val.createTime,
            COUNTDOWN_DATE.WAIT_PAY
          );

          if (this.countdownDuration) {
            startCountdown(this.countdownDuration, duration => {
              this.countdownDuration = duration;
            });
          }
        }
        // 当订单在待收货状态，启动收货截止时间倒计时
        if (val.status === ORDER_STATUS.WAIT_RECEIVE_PACKAGE) {
          this.countdownDuration = orderPayEndDuration(
            val.deliveryTime,
            COUNTDOWN_DATE.WAIT_RECEIVE_PACKAGE
          );

          if (this.countdownDuration) {
            startCountdown(this.countdownDuration, duration => {
              this.countdownDuration = duration;
            });
          }
        }
      }
    }
  }
};
</script>

