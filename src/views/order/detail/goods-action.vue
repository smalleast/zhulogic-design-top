<template>
  <div class="detail-goods-action">
    <van-goods-action class="py15 pr15 row-col-end bg-f bottom-menu-fixed">
      <!-- 订单操作按钮 -->
     <common-action  :detail="detail"></common-action>
    </van-goods-action>
    <common-express></common-express>
  </div>
</template>
<script>
import CommonAction from "../common/action";

import CommonExpress from "../common/express";
export default {
  components: {
    CommonAction,CommonExpress
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
};
</script>
