<template>
  <div class="confirm-message">
    <nx-label class="pl15">买家留言</nx-label>
    <van-field
    v-model="message"
    type="textarea"
    placeholder="请输入您的其他需求"
    rows="2"
    maxlength="50"
    autosize
  />
  </div>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data(){
    return{
      message:''
    }
  },
  watch:{
    message(curr){
       this.$emit(GE.PRODUCT_BUY_MESSAGE, curr);
    }
  }
}
</script>

