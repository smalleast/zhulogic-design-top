<template>
  <div class="list-navbar">
    <van-tabs v-model="active" :swipe-threshold="5" animated swipeable @change="handleChange">
      <van-tab v-for="(item,index) in lists" :key="index">
        <div slot="title">
          <nx-badge :title="item.key" :info="item.key!='全部'?item.qtr:''"></nx-badge>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import GE from "@/constants/global-events";

import { VUE_BROWSER } from "@/constants";
export default {
  data() {
    return {
      active: 0,
      lists: []
    };
  },
  mounted() {
    //获取TOKEN加载数据
    this.$on(GE.MALL_TOKEN, this.getStatus);

    //操作按钮之后，重新刷新数据
    this.$on(GE.ORDER_REFRESH, this.getStatus);
  },
  methods: {
    async getStatus() {
      let res = await this.api.orders.getStatus();
      this.lists = res;
    },
    handleChange(index, title) {
      this.$emit(GE.ORDER_STATUS, this.lists[index].value);
    }
  },
  created() {
    if (VUE_BROWSER == "pc" || this.$route.query.vue == "pc") {
      this.getStatus(); //pc测试方式
    }
  }
};
</script>
