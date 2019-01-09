<template>
  <div class="common-action ml15_">
    <van-button
      :loading="loading.CHANNEL"
      :disabled="loading.CHANNEL"
      round
      plain
      type="default"
      size="small"
      v-if="[ORDER_STATUS.WAIT_PAY].includes(detail.status)"
      @click="handleChannel"
    >取消订单</van-button>
    <van-button
      :loading="loading.PAYMENT"
      :disabled="loading.PAYMENT"
      round
      plain
      type="warning"
      size="small"
      v-if="[ORDER_STATUS.WAIT_PAY].includes(detail.status)"
      @click="handlePayment"
    >去付款</van-button>
    <van-button
      :loading="loading.REMIND"
      :disabled="loading.REMIND"
      round
      plain
      type="default"
      size="small"
      v-if="[ORDER_STATUS.WAIT_PACKAGE].includes(detail.status)"
      @click="handleClickRemind"
    >提醒发货</van-button>
    <van-button
      :loading="loading.EXPRESS"
      :disabled="loading.EXPRESS"
      round
      plain
      type="default"
      size="small"
      v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)"
      @click="handleExpress"
    >查看物流</van-button>
    <van-button
      :loading="loading.RECEIPT"
      :disabled="loading.RECEIPT"
      round
      plain
      type="warning"
      size="small"
      v-if="[ORDER_STATUS.WAIT_RECEIVE_PACKAGE].includes(detail.status)"
      @click="handleConfirmReceipt"
    >确认收货</van-button>
    <van-button
      :loading="loading.AFTER"
      :disabled="loading.AFTER"
      round
      plain
      type="default"
      size="small"
      v-if="[ORDER_STATUS.WAIT_COMMENT,ORDER_STATUS.FINISHED].includes(detail.status)"
      @click="handleAfterSale"
    >申请售后 </van-button>
    <van-button
      :loading="loading.COMMENT"
      :disabled="loading.COMMENT"
      round
      plain
      type="warning"
      size="small"
      v-if="[ORDER_STATUS.WAIT_COMMENT].includes(detail.status)"
      @click="handleComment"
    >评价商品</van-button>
    <van-button
      :loading="loading.DELETE"
      :disabled="loading.DELETE"
      round
      plain
      type="default"
      size="small"
      v-if="[ORDER_STATUS.FINISHED,ORDER_STATUS.CANCEL,ORDER_STATUS.CLOSED].includes(detail.status)"
      @click="handleDelete"
    >删除订单</van-button>
    <!-- 物流弹框 -->
    
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { ORDER_STATUS } from "@/constants";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ORDER_STATUS,
      loading: {
        CHANNEL: false, //取消订单
        PAYMENT: false, //去付款
        REMIND: false, //提醒发货
        RECEIPT: false, //确认收货
        COMMENT: false, //评价商品
        DELETE: false, //删除订单
        EXPRESS: false, //查看物流
        AFTER: false //申请售后
      }
    };
  },
  methods: {
    handleClickRemind() {
      //动画开始
      this.loading.REMIND = true;
      this.$dialog
        .alert({
          title: "发货提醒",
          message:
            "亲，住逻辑已收到您的发货提醒，我们会尽快为您安排发货！普通商品发时间为7个工作日，请耐心等待下哦！"
        })
        .then(_ => {
          //动画结束
          this.loading.REMIND = false;
        });
    },
    //取消订单
    async handleChannel() {
      //动画开始
      this.loading.CHANNEL = true;
      this.$dialog
        .confirm({
          title: "操作提示",
          message: "确定要取消该订单吗？"
        })
        .then(() => {
          this.channelOrders();
        })
        .catch(() => {
          //动画结束
          this.loading.CHANNEL = false;
        });
    },
    //取消订单调用接口
    async channelOrders() {
      let res = await this.api.orders.channelOrders({
        orderId: this.detail.id
      });
      this.$toast("取消订单成功");
      //刷新页面数据
      this.$emit(GE.ORDER_REFRESH);

      //动画结束
      this.loading.CHANNEL = false;
    },
    //去付款,跳转到收银台
    handlePayment() {
      //动画开始
      this.loading.PAYMENT = true;
      this.$router.push({
        name: "MallPaymethod",
        params: { id: this.detail.id }
      });
    },
    //删除订单
    async handleDelete() {
      //动画开始
      this.loading.DELETE = true;
      this.$dialog
        .confirm({
          title: "操作提示",
          message: "确定要删除订单吗？"
        })
        .then(() => {
          this.deleteOrders();
        })
        .catch(() => {
          //动画结束
          this.loading.DELETE = false;
        });
    },
    //删除订单调用接口
    async deleteOrders() {
      let res = await this.api.orders.deleteOrders({ orderId: this.detail.id });
      this.$toast("删除订单成功");
      //在订单列表则刷新数据
      if (this.$route.name == "OrderList") {
        //刷新页面数据
        this.$emit(GE.ORDER_REFRESH);
        //动画结束
        this.loading.DELETE = false;
      } //其他页面一律跳转到订单列表页
      else {
        this.$router.push({ name: "OrderList" });
      }
    },
    //确认收货
    async handleConfirmReceipt() {
      //动画开始
      this.loading.RECEIPT = true;
      this.$dialog
        .confirm({
          title: "操作提示",
          message: "确定要确认收货吗？"
        })
        .then(() => {
          this.confirmReceipt();
        })
        .catch(() => {
          //动画结束
          this.loading.RECEIPT = false;
        });
    },
    //确认收货调用接口
    async confirmReceipt() {
      let res = await this.api.orders.confirmReceipt({
        orderId: this.detail.id
      });
      this.$toast("确认收货成功");
      //刷新页面数据
      this.$emit(GE.ORDER_REFRESH);
      //动画结束
      this.loading.RECEIPT = false;
    },
    //评价商品
    async handleComment() {
      //动画开始
      this.loading.COMMENT = true;
      const productId = this.detail.products[0].productId;
      console.log('p:',productId)
      this.$router.push({
        name: "OrderComment",
        params: { id: this.detail.id },
        query: { pid: productId }
      });
    },
    handleExpress() {
      //动画开始
      this.loading.EXPRESS = true;
      //通知显示物流弹框
      this.$emit(GE.ORDER_EXPRESS, this.detail);
      setTimeout(() => {
        //动画开始
        this.loading.EXPRESS = false;
      }, 2000);
    },
     //申请售后
    async handleAfterSale() {
      //动画开始
      this.loading.AFTER = true;
      //联系客服
      this.terminal.toggleTerminal('UDESK');
       //动画开始
      this.loading.AFTER = false;
    },
  }
};
</script>

