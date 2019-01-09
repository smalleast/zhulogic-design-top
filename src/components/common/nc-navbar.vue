<template>
  <van-nav-bar :title="title" left-arrow fixed :z-index="999" @click-left="onClickLeft">
    <template slot="left">
      <nx-icon class="icon-more"></nx-icon>
    </template>
    <template slot="right"></template>
  </van-nav-bar>
</template>
<script>
import GE from "@/constants/global-events";
import GU from "@/constants/global-utils";
import { BACK_LIST } from "@/constants";
export default {
  data() {
    return {
      title: "恐龙商城"
    };
  },
  mounted() {
    //评价详情
    this.$on(GE.MALL_TITLE, res => {
      this.title = res;
    });
  },
  methods: {
    onClickLeft() {
      //判断是否需要跳转到app
      if (BACK_LIST.includes(this.$route.name)) {
        //返回到app终端
        this.terminal.toggleTerminal("BACK");
      } //地址列表返回，则跳转到确认订单页
      else if (["MallAddress"].includes(this.$route.name)) {
        this.$router.push({ name: "MallConfirm" });
      } else {
        //回退到上一个页面
        this.$router.go(-1);
      }
    },
    onClickRight() {
      if (GU.browser.versions.ios) {
        window.webkit.messageHandlers.iOS_ZLGAPP.postMessage({
          type: "SHARE",
          code: "http://www.baidu.com",
          objc: {
            title: "百度",
            desc: "百度描述",
            link: "http://www.baidu.com",
            img_url:
              "http://oss.zhulogic.com/operation_picture/op896e5b77646c49e58847d771827cf7ab.png"
          }
        });
      } else if (GU.browser.versions.android) {
        let params = {
          type: "SHARE",
          code: "http://www.baidu.com",
          objc: {
            title: "百度",
            desc: "百度描述",
            link: "http://www.baidu.com",
            img_url:
              "http://oss.zhulogic.com/operation_picture/op896e5b77646c49e58847d771827cf7ab.png"
          }
        };
        //安卓需要强类型String
        window.android.ANDROID_ZLGAPP(JSON.stringify(params));
      }
    }
  },
  created() {
    let token = {};
    try {
      token = JSON.parse(localStorage.getItem("token"));
      //this.title = token.accessToken;
    } catch (e) {
      token = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  /deep/ .van-nav-bar__left {
    left: 0px;
    width: 100px;
    text-align: left;
    padding-left: 15px;
  }
}
</style>

