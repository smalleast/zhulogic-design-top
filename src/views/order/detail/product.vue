<template>
  <div class="detail-product mt15">
    <div v-for="(item,index) in detail.products" :key="index">
      <nx-layout>
        <nx-photo
          :lazy="item.coverFile&&item.coverFile.key | toImg"
          @click="openPreview([item.coverFile])"
        ></nx-photo>
        <div class="wp-200 pl15" @click="handleClick(item)">
          <div class="lc-wrap h2 mb8">{{item.name}}</div>
          <!-- 兑换方式 -->
          <common-exchange :exchange="detail.exchangeMode" :item="item"></common-exchange>
        </div>
        <div class="col tr">
          <div class="pr15">
            <!-- 订单状态 -->
            <common-status :status="detail.status"></common-status>
            <nx-label class="c-a2 mt15">x{{item.qtr}}</nx-label>
          </div>
        </div>
      </nx-layout>
      <div class="line-1 mt15"></div>
    </div>
  </div>
</template>

<script>
import CommonStatus from "../common/status";
import CommonExchange from "../common/exchange";
export default {
  components: {
    CommonStatus,
    CommonExchange
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    openPreview(lists) {
      //调用全屏预览
      this.generic.openPreview(lists);
    },
    //跳转到商品详情页
    handleClick(inItem) {
      this.$router.push({ name: "MallDetail", params: { id: inItem.productId } });
    }
  }
};
</script>
