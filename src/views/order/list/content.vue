<template>
  <div class="list-content">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <list-card v-for="(item,index) in list" :key="index" :detail="item" class="pl15 mt15"></list-card>
    </van-list>
    <common-express></common-express>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { VUE_BROWSER } from "@/constants";

import ListCard from "./card";
import CommonExpress from "../common/express";
export default {
  data() {
    return {
      filter: {
        pageSize: 20,
        pageNum: 1
      },
      list: [],
      total: 0,
      loading: false,
      finished: false,
      title: ""
    };
  },
  components: {
    ListCard,
    CommonExpress
  },
  mounted() {
    //切换状态
    this.$on(GE.ORDER_STATUS, this.toggleStatus);
    //获取TOKEN加载数据
    this.$on(GE.MALL_TOKEN, this.toggleStatus);
    //操作按钮之后，重新刷新数据
    this.$on(GE.ORDER_REFRESH, this.toggleStatus);
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        if (this.filter.pageSize * this.filter.pageNum < this.total) {
          this.getLists();
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      }, 500);
    },
    async getLists() {
      await this.api.orders.getLists(this.filter).then(res => {
        this.list = this.list.concat(res.list);
        this.total = res.total;
      });

      //关闭页面动画
      this.$emit(GE.MALL_LOADING, false);
    },
    toggleStatus(res) {
      //启动页面动画
      this.$emit(GE.MALL_LOADING);
      this.filter.statusList = [];
      if (res && res > 0) {
        this.filter.statusList.push(res);
      } else {
        //删除对象
        delete this.filter.statusList;
      }
      this.filter.pageNum = 1;
      this.list = [];
      this.getLists();
    }
  },
  created() {
    if (VUE_BROWSER == "pc" || this.$route.query.vue == "pc") {
      this.getLists(); //pc测试方式
    }
  }
};
</script>
