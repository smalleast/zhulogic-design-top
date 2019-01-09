<template>
  <div class="mall-list py46">
    <!-- 轮播Banner   -->
    <list-banner></list-banner>
    <nx-label class="h1 mt20 ml15">恐龙蛋兑换礼遇</nx-label>
    <!-- 列表内容 -->
    <list-content></list-content>
    <div class="mt50"></div>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import GU from "@/constants/global-utils";

import ListBanner from "./list/banner";
import ListContent from "./list/content";
import NxStore from "next-store";
export default {
  components: {
    ListBanner,
    ListContent
  },
  data() {
    return {
      token: "1"
    };
  },

  methods: {
    gitToken() {
      //获取app的Token
      this.terminal.toggleTerminal("APPTOKEN");
    },
    //接收移动端传来的token
    appWebToken(inStr) {
      this.token = inStr;
      NxStore.local = {
        token: {
          accessToken: this.token
        }
      };
      this.$emit(GE.MALL_TOKEN); //获取到TOKEN后通知查询数据
    }
  },
  created() {
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "恐龙商城");
    //启动页面动画
    this.$emit(GE.MALL_LOADING);
    window.appWebToken = this.appWebToken;
    //获取token
    this.gitToken();
  }
};
</script>
