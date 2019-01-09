<template>
  <div class="mall-payment py61">
    <nx-label class="h1 pl15">收银台</nx-label>
    <!-- 结算的金额 -->
    <pay-method-total :detail="detail" class="mt40"></pay-method-total>
    <!-- 选择结算的付款方式 -->
    <pay-method-select class="mt50"></pay-method-select>
    <!-- 按钮动作 -->
    <pay-method-goods-action :detail="detail" class="mt50"></pay-method-goods-action>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import PayMethodTotal from "./pay-method/total";
import PayMethodSelect from "./pay-method/select";
import PayMethodGoodsAction from "./pay-method/goods-action";
export default {
  components: {
    PayMethodTotal,
    PayMethodSelect,
    PayMethodGoodsAction
  },
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    async getOrderDetail() {
      let res = await this.api.orders.getOrderDetail(this.$route.params.id);
      this.detail = res;
    }
  },
  created() {
    this.getOrderDetail();
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "收银台");
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    //判断是否回退到(订单确认页||订单列表页||订单详情页)
    if (
      to.name == "MallConfirm" ||
      to.name == "OrderList" 
    ) {
      this.$dialog
        .confirm({
          title: "确认要离开订单支付吗？",
          message: "超过支付时效时订单将被取消，请尽快完成支付。",
          confirmButtonText: "继续支付",
          cancelButtonText: "确认离开"
        })
        .then(() => {
          next(false); //阻止跳转
        })
        .catch(() => {
          next('/order/detail/'+this.$route.params.id); //执行回退跳转
        });
    } else {
      next(); //继续执行
    }
  }
};
</script>


