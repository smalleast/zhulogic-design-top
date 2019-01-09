<template>
  <div class="common-express">
    <van-popup v-model="hasExpress"  position="top" class="transparent">
      <div class="py20 express-main">
        <nx-layout v-for="(item,index) in detail.products" :key="index" v-if="index===0">
          <nx-photo class="mr15 ml20" :lazy="item.coverFile&&item.coverFile.key | toImg"></nx-photo>
          <div class="col">
            <nx-label class="h2 lc-wrap">{{item.name}}</nx-label>
            <nx-label class="f12 c-a2 mt10">物流公司：{{express.company}}</nx-label>
            <nx-layout>
              <nx-label class="f12 c-a2 mr5">单号：{{express.no}}</nx-label>
              <!-- 复制按钮 -->
              <common-copy :code="express.no"></common-copy>
            </nx-layout>
          </div>
        </nx-layout>
        <div class="line-1 ml20 mt20"></div>
        <div class="mt20 express-main-content">
          <van-steps direction="vertical" :active="0" active-color="#f44">
            <van-step v-for="(item,index) in express.expressInfoList" :key="index">
              <nx-label class="c-29">{{item.remark}}</nx-label>
              <nx-label class="f12 c-98 mt5 ml8">{{item.datetime}}</nx-label>
            </van-step>
          </van-steps>
        </div>
      </div>
      <div class="express-close" @click="handleCancel">
        <div class="express-close-line"></div>
        <nx-icon class="icon-buoumaotubiao20 c-f f26"></nx-icon>
      </div>
    </van-popup>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import CommonCopy from "./copy";
export default {
  components: {
    CommonCopy
  },
  data() {
    return {
      hasExpress: false,
      express: {},
      detail: {}
    };
  },
  mounted() {
    //弹框的显示状态
    this.$on(GE.ORDER_EXPRESS, this.toggleStatus);
  },
  methods: {
    toggleStatus(inDetail) {
      this.detail = inDetail;
      this.hasExpress = true;
      //获取物流信息
      this.getExpress();
    },
    async getExpress() {
      let res = await this.api.orders.getExpress(this.detail.id);
      this.express = res;
    },
    //重置已显示的信息，并关闭物流显示框
    handleCancel() {
      this.detail={};
      this.express={};
      this.hasExpress = false;
    }
  },
  created() {
    //this.getExpress();
  }
};
</script>
<style lang="scss" scoped>
.common-express{
  overflow: hidden;
}
.express-main {
  width: 315px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  margin-top: 26px;
  &-content {
    height: 350px;
    overflow-y: auto;
  }
}
.express-close {
  width: 28px;
  height: 58px;
  margin-left: auto;
  margin-right: auto;
  &-line {
    position: relative;
    width: 2px;
    height: 27px;
    left: 12px;
    background-color: #fff;
    overflow: hidden;
    z-index: 1;
  }
  > i {
    position: relative;
    top: -1px;
    z-index: 2;
  }
}
</style>

