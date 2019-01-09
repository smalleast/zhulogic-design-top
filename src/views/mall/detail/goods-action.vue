<template>
  <div class="detail-goods-action">
    <van-goods-action class="bg-f van-hairline--top bottom-menu-fixed">
      <nx-layout @click="handleClick" class="wp-120 row-col-center">
        <nx-icon class="icon-zaixiankefu iconfont"></nx-icon>
        <nx-label class="ml5">在线客服</nx-label>
      </nx-layout>
      <van-goods-action-big-btn text="立即兑换" @click="onClickBigBtn" :disabled="disabled"/>
    </van-goods-action>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import GU from "@/constants/global-utils";
export default {
  data() {
    return {
      disabled: false
    };
  },
  mounted() {
    this.$on(GE.SKU_BUY, res => {
      this.disabled = res;
    });
  },
  methods: {
    handleClick() {
      //联系客服
      this.terminal.toggleTerminal('UDESK');
    },
    onClickBigBtn() {
      this.$emit(GE.SKU_STATUS, true);
    },
    
  }
};
</script>

