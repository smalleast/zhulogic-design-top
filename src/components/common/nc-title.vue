<template>
  <div class="nc-title">
    <div class="lc-wrap h1">{{detail.name}}</div>
    <nx-layout class="mt5">
      <nx-icon class="icon-konglongdan3 c-98 f16"></nx-icon>
      <div class="c-98 f16 ml2">{{detail.qtr}}</div>
      <div class="c-98 f16 ml8">|</div>
      <nx-label class="f16 c-a5 ml8" v-if="price">{{detail.price | currency('¥', '2')}}</nx-label>
      <nx-tag class="ml6" v-if="[2].includes(detail.buyLimit)">下单专享</nx-tag>
    </nx-layout>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    },
    price: {
      type: Boolean,
      default: false
    }
  }
};
</script>
