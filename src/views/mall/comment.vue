<template>
  <div class="mall-comment py61">
    <div class="pl15">
      <comment-item-card
        class="mt20"
        v-for="(item,index) in lists"
        v-if="lists.length>0"
        :key="index"
        :detail="item"
        :user="item.userInfo"
      ></comment-item-card>
    </div>
    <nx-default status="COMMENT" v-if="lists.length===0">暂无评价</nx-default>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import CommentItemCard from "./comment/item-card";
export default {
  components: {
    CommentItemCard
  },
  data() {
    return {
      lists: []
    };
  },

  methods: {
    async getLists() {
      let res = await this.api.orders.getEvaluation({
        productId: this.$route.params.id
      });
      this.lists = res;

      //关闭页面动画
      this.$emit(GE.MALL_LOADING, false);
    }
  },
  created() {
    //启动页面动画
    this.$emit(GE.MALL_LOADING);
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "用户评价");
    //获取评论数据
    this.getLists();
  }
};
</script>

