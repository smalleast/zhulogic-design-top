<template>
  <div class="common-exchange">
    <!-- 恐龙蛋 -->
    <nx-layout v-if="[EXCHANGE_MODE.EGG].includes(exchange)">
      <nx-icon class="icon-konglongdan3 c-a2"></nx-icon>
      <nx-label class="c-a2">{{item.paidEgg}}</nx-label>
    </nx-layout>
    <!-- 恐龙蛋+人民币 -->
    <nx-layout v-if="[EXCHANGE_MODE.GROUP].includes(exchange)">
      <nx-icon class="icon-konglongdan3 c-a2"></nx-icon>
      <nx-label class="c-a2">{{item.paidEgg}} + {{item.paidPrice | currency('¥', '2')}}</nx-label>
    </nx-layout>
    <!-- 人民币 -->
    <nx-layout v-if="[EXCHANGE_MODE.MONEY].includes(exchange)">
      <nx-label class="c-a2">{{item.paidPrice | currency('¥', '2')}}</nx-label>
    </nx-layout>
  </div>
</template>
<script>
import { EXCHANGE_MODE } from "@/constants";
export default {
  props: {
    exchange: {
      type: [Number, String]
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EXCHANGE_MODE
    };
  }
};
</script>
