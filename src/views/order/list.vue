<template>
  <div class="order-list py46">
    <nx-label class="h1 pl15 mt15 mb15">我的兑换订单</nx-label>
    <!-- 状态分类 -->
    <list-navbar></list-navbar>
    <!-- 主体内容 -->
    <list-content class="mt20"></list-content>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import GU from "@/constants/global-utils";

import ListNavbar from "./list/navbar";
import ListContent from "./list/content";

import NxStore from "next-store";
export default {
  components: {
    ListNavbar,
    ListContent
  },
  data() {
    return {
      token: "1"
    };
  },
  methods: {
    gitToken() {
      if (GU.browser.versions.ios) {
        window.webkit.messageHandlers.iOS_ZLGAPP.postMessage({
          type: "APPTOKEN"
        });
      } else if (GU.browser.versions.android) {
        let params = {
          type: "APPTOKEN"
        };
        //安卓需要强类型String
        window.android.ANDROID_ZLGAPP(JSON.stringify(params));
      }
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
    this.$emit(GE.MALL_TITLE, "我的兑换订单");
    window.appWebToken = this.appWebToken;
    //获取token
    this.gitToken();
  }
};
</script>

