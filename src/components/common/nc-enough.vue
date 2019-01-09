<template>
  <div class="nc-enough">
    <van-dialog v-model="show" :showConfirmButton="false">
      <div class="py30 tc">
        <nx-icon class="icon-jinggao c-f0 f40"></nx-icon>
        <nx-label class="mt20 c-32 f16 blod">恐龙蛋不足</nx-label>
        <nx-label class="mt8 c-98">请重新下单购买</nx-label>
        <div class="mt15 px20">
          <van-button round type="warning" size="large" @click="handleClickPay">确认</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: this.visible
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickPay() {
      this.$router.push({ name: "MallPaymethod", params: { id: 1 } });
    }
  },
  watch: {
    visible(curr) {
      this.show = curr;
    }
  }
};
</script>
