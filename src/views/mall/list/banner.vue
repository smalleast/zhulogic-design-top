<template>
  <div class="list-banner">
    <van-swipe :autoplay="5000" indicator-color="white ">
      <van-swipe-item v-for="(item, index) in lists" :key="index">
        <nx-photo
          :lazy="item.imageFile&&item.imageFile.key | toImg"
          @click="handleClick(item)"
          class="banner full"
          cover
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { IMAGE_BASE_URL, VUE_BROWSER } from "@/constants";
export default {
  data() {
    return {
      lists: [],
      VUE_BROWSER
    };
  },
  mounted() {
    this.$on(GE.MALL_TOKEN, this.getAdverts);
  },
  methods: {
    async getAdverts() {
      let res = await this.api.homes.getAdverts();
      this.lists = res.appAdverts;
    },
    handleClick(inItem) {
      const params = {
        title: "恐龙商城",
        desc: "恐龙商城",
        link: inItem.webUrl,
        img_url: IMAGE_BASE_URL + inItem.imageFile.key
      };
      //连接包含http，是有效的地址
      if (item.webUrl.indexOf("http") > -1) {
        //呼起app的h5外部连接
        this.terminal.toggleTerminal("H5", params);
      }
    }
  },
  created() {
    if (VUE_BROWSER == "pc" || this.$route.query.vue == "pc") {
      //PC测试
      this.getAdverts();
    }
  }
};
</script>

