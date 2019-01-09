<template>
  <div class="comment-message">
    <van-field
      v-model="message"
      type="textarea"
      placeholder="分享您的体验和心得，给万千想买的人一个参考"
      rows="3"
      maxlength="80"
      autosize
    />
  </div>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      message: ""
    };
  },
  watch: {
    message(curr) {
      this.$emit(GE.COMMENT_MESSAGE, curr);
    }
  }
};
</script>
