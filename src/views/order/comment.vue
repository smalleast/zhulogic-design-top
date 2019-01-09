<template>
  <div class="order-commit py61">
    <nx-label class="h1 mb20 pl15">发表评价</nx-label>
    <!-- 评价内容 -->
    <comment-message></comment-message>
    <div class="pl15">
      <div class="line-1 mb10"></div>
      <!-- 上传的图片 -->
      <comment-upload></comment-upload>
      <!-- 动作按钮 -->
      <comment-goods-action></comment-goods-action>
    </div>
  </div>
</template>
<script>

import GE from "@/constants/global-events";
import CommentMessage from "./comment/message";
import CommentUpload from "./comment/upload";
import CommentGoodsAction from "./comment/goods-action";
export default {
  components: {
    CommentMessage,
    CommentUpload,
    CommentGoodsAction
  },
  created(){
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "发表评价");
  }
};
</script>

