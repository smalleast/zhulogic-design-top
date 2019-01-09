<template>
  <div class="mall-detail py46">
    <!-- 商品详情banner -->
    <detail-banner :lists="bannerList"></detail-banner>
    <!-- 商品标题 -->
    <nc-title :detail="detail" class="pl15 mt20" price></nc-title>
    <!-- 商品参数 -->
    <detail-options :detail="detail" class="mt15"></detail-options>
    <!-- 商品详情 -->
    <detail-content :detail="detail"></detail-content>
    <!-- 操作按钮 -->
    <detail-goods-action></detail-goods-action>
    <!-- 商品规格选择 -->
    <detail-sku :detail="detail"></detail-sku>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import DetailBanner from "./detail/banner";
import NcTitle from "@/components/common/nc-title";
import DetailOptions from "./detail/options";
import DetailContent from "./detail/content";
import DetailGoodsAction from "./detail/goods-action";
import DetailSku from "./detail/sku";

export default {
  components: {
    DetailBanner,
    NcTitle,
    DetailOptions,
    DetailContent,
    DetailGoodsAction,
    DetailSku
  },
  data() {
    return {
      hasSku: false,
      detail: {},
      bannerList: []
    };
  },
  methods: {
    async getDetail() {
      let res = await this.api.products.getDetail(this.$route.params.id);
      this.detail = res;
      //banner图片集合
      this.bannerList = [res.coverFile].concat(res.partFiles);
      //设置页面标题
      this.$emit(GE.MALL_TITLE, this.detail.name);

      //关闭页面动画
      this.$emit(GE.MALL_LOADING, false);
      //提前获取默认地址
      await this.$store.dispatch("getAddressList");
    }
  },
  created() {
    //启动页面动画
    this.$emit(GE.MALL_LOADING);
    this.getDetail();
  }
};
</script>

