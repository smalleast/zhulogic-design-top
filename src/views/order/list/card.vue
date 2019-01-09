<template>
  <div class="order-card">
    <div @click="handleClick(detail.id)">
      <nx-layout :center="false">
        <div class="wp-70">
          <nx-photo
            v-for="(item,index) in detail.products"
            :key="index"
            v-if="index===0"
            :lazy="item.coverFile&&item.coverFile.key | toImg"
          ></nx-photo>
        </div>
        <div class="col" v-for="(item,index) in detail.products" :key="index" v-if="index===0">
          <div class="h2 mt8 lc-wrap max-200">{{item.name}}</div>
          <nx-label class="mt8 c-87">x{{item.qtr||1}}</nx-label>
        </div>
        <div class="wp-60 mt8">
          <!-- 订单状态 -->
          <common-status :status="detail.status"></common-status>
        </div>
      </nx-layout>
      <nx-layout class="mt20">
        <nx-label class="col c-87 f12">{{detail.createTime | toDateTime}}</nx-label>
        <nx-label class="pr2 c-87 f12">合计：</nx-label>
        <div v-for="(item,index) in detail.products" :key="index" v-if="index===0" class="pr15">
          <!-- 兑换方式 -->
          <common-exchange :exchange="detail.exchangeMode" :item="item"></common-exchange>
        </div>
      </nx-layout>
    </div>
    <nx-layout class="mt15 mr15_ card-goods-action">
      <div class="col"></div>
      <!-- 订单操作按钮 -->
      <common-action :detail="detail"></common-action>
    </nx-layout>
    <div class="line-1 mt15"></div>
  </div>
</template>
<script>
import CommonStatus from "../common/status";
import CommonExchange from "../common/exchange";
import CommonAction from "../common/action";
export default {
  components: {
    CommonStatus,
    CommonExchange,
    CommonAction
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick(inId) {
      this.$router.push({ name: "OrderDetail", params: { id: inId } });
    },
  }
};
</script>
<style lang="scss" scoped>
.card-goods-action{
  position: relative;
  z-index: 998;
}
</style>


