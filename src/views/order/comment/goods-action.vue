<template>
  <div class="coment-goods-action px20 mt50">
    <van-button :loading="comment.loading" :disabled="comment.loading" round type="warning" size="large" @click="handleClick">确认评价</van-button>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      comment: {
        content: "",
        imageFiles: [],
        loading:false
      }
    };
  },
  mounted() {
    //评价详情
    this.$on(GE.COMMENT_MESSAGE, res => {
      this.comment.content = res;
    });
    //评价图片
    this.$on(GE.COMMENT_IMAGE, res => {
      this.comment.imageFiles = res;
    });
  },
  methods: {
    async handleClick() {
      //点击按钮的动画
      this.comment.loading=true;
      let params = Object.assign({}, this.comment, {
        orderId: this.$route.params.id,
        productId: this.$route.query.pid
      });
      let res = await this.api.orders.createEvaluation(params);
      //关闭点击按钮的动画
      this.comment.loading=false;
      this.$toast('评价成功');
      this.$router.go(-1);
    }
  }
};
</script>
