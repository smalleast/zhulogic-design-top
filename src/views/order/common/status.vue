<template>
  <div class="common-status">
    <nx-label v-if="[ORDER_STATUS.WAIT_PAY].includes(status)" class="c-f3">待付款</nx-label>
    <nx-label v-if="[ORDER_STATUS.WAIT_PACKAGE].includes(status)" class="c-f3">待发货</nx-label>
    <nx-label v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(status)" class="c-f3">待收货</nx-label>
    <nx-label v-if="[ORDER_STATUS.WAIT_COMMENT].includes(status)" class="c-f3">待评价</nx-label>
    <nx-label v-if="[ORDER_STATUS.FINISHED].includes(status)" class="c-87">已完成</nx-label>
    <nx-label v-if="[ORDER_STATUS.CANCEL].includes(status)" class="c-87">已取消</nx-label>
    <nx-label v-if="[ORDER_STATUS.CLOSED].includes(status)" class="c-87">已关闭</nx-label>
  </div>
</template>
<script>
import { ORDER_STATUS } from "@/constants";
export default {
  props: {
    status: {
      type: [Number, String]
    }
  },
  data() {
    return {
      ORDER_STATUS
    };
  }
};
</script>
