<template>
  <div class="list-content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <nx-layout class="row-wrap row-col-between">
          <item-card
            @click="handleClick(item)"
            class="mt15"
            v-for="(item,index) in list"
            :detail="item"
            :key="index"
          ></item-card>
          <item-card class="mt15"></item-card>
        </nx-layout>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { VUE_BROWSER } from "@/constants";
import ItemCard from "./item-card";
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
      isLoading: false
    };
  },
  components: {
    ItemCard
  },
  mounted() {
    this.$on(GE.MALL_TOKEN, this.getLists);
  },
  methods: {
    //下拉刷新
    onRefresh() {
      //启动页面动画
      this.$emit(GE.MALL_LOADING);
      this.list = [];
      this.getLists();
      setTimeout(() => {
        this.isLoading = false;
        //关闭页面动画
        this.$emit(GE.MALL_LOADING, false);
      }, 500);
    },
    //上拉加载
    onLoad() {

      // 异步更新数据
      setTimeout(() => {
        if (this.filter.pageSize * this.filter.pageNum < this.total) {
        this.filter.pageNum += 1;
          this.getLists();
        }
        // 加载状态结束
        this.loading = false;

        //关闭页面动画
        this.$emit(GE.MALL_LOADING, false);
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      }, 500);
    },
    getLists() {
      this.api.products.getLists(this.filter).then(res => {
        this.list = this.list.concat(res.list);
        this.total = res.total;
      });
    },
    handleClick(inItem) {
      this.$router.push({ name: "MallDetail", params: { id: inItem.id } });
    }
  },
  created() {
    if (VUE_BROWSER == "pc"||this.$route.query.vue=='pc') {
      this.getLists(); //pc测试方式
    }

  }
};
</script>

<style lang="scss" scoped>
.list-content {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
