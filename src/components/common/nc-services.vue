<template>
  <van-popup v-model="hasService" position="right" class="vw vh">
    <div class="pl15 pr15">
      <nx-custom-bar @click="hasService=false">住逻辑用户服务协议</nx-custom-bar>
      <nx-label class="h1">用户服务</nx-label>
      <nx-label class="h2 mt20">发货时间</nx-label>
      <nx-layout class="mt15" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="col c-63">为保证品质，每一件商品住逻辑都会精心定制。普通商品发货时间为7个工作日，请耐心等待下哦！</div>
      </nx-layout>
      <nx-label class="h2 mt25">配送范围</nx-label>
      <nx-layout class="mt15" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="col c-63">包括：中国大陆地区</div>
      </nx-layout>
      <nx-layout class="mt5" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="col c-63">不包括：海外、港澳台地区、西藏、新疆、内蒙古、宁夏、青海等偏远地区</div>
      </nx-layout>
      <nx-label class="h2 mt25">如何联系精品中心</nx-label>
      <nx-layout class="mt15" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="c-63">住逻辑热线：</div>
        <div class="col c-f5">400-998-0137</div>
      </nx-layout>
      <nx-layout class="mt5" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="c-63">服务时间：</div>
        <div class="col c-f5">周一至周五 09:00-18:00</div>
      </nx-layout>
      <nx-label class="h2 mt25">如何申请售后</nx-label>
      <nx-layout class="mt15" :center="false">
        <div class="c-78 pr6 f12">◆</div>
        <div class="col c-63">用户收到商品如有质量问题，可在app申请售后或者直接电话联系400客服申请售后。</div>
      </nx-layout>
    </div>
  </van-popup>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      hasService: false
    };
  },
  mounted() {
    //弹框的显示状态
    this.$on(GE.ORDER_SERVICE, this.toggleStatus);
  },
  methods: {
    toggleStatus() {
      this.hasService = true;
    }
  }
};
</script>

