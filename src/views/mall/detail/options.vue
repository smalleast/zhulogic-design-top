<template>
  <div class="detail-options">
    <van-cell-group>
      <van-cell title="已选" title-class="c-87" :value="'数量x'+num" is-link @click="handleClick"></van-cell>
      <van-cell
        title="用户评价"
        is-link
        :value="(detail.evaluationQtr||0)+'条'"
        :to="'/mall/comment/'+detail.id"
      ></van-cell>
      <van-cell title="用户服务" value="7个工作日发货" is-link @click="handleService"></van-cell>
    </van-cell-group>
    <nc-services></nc-services>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import NcServices from "@/components/common/nc-services";
export default {
  components: {
    NcServices
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      num: 1
    };
  },
  mounted() {
    this.$on(GE.SKU_NUM, this.onSkuNum);
  },
  methods: {
    handleClick() {
      this.$emit(GE.SKU_STATUS, true);
    },
    onSkuNum(inNum) {
      this.num = inNum || 1;
    },
    handleService() {
      //呼起用户协议弹框
      this.$emit(GE.ORDER_SERVICE);
    }
  }
};
</script>

