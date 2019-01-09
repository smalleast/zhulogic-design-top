<template>
  <div class="detail-sku">
    <van-sku
      v-model="hasSku"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      close-on-click-overlay
      @buy-clicked="onBuyClicked"
      class="bottom-menu-fixed"
    >
      <template slot="sku-header-price">
        <nx-layout class="mt3">
          <nx-icon class="icon-konglongdan3"></nx-icon>
          <nx-label>{{detail.price*EGG_EXCHARGE_RATE}}</nx-label>
          <nx-label class="ml15">{{detail.price | currency('¥', '2')}}</nx-label>
          <nx-tag class="ml2" v-if="[2].includes(detail.buyLimit)">下单专享</nx-tag>
        </nx-layout>
        <nx-label class="c-a5 mt3">您当前有{{balance}}枚恐龙蛋</nx-label>
      </template>
      <template slot="sku-group">
        <div class="p20">
          <nx-label class="f13 c-63">付款方式</nx-label>
          <!-- 恐龙蛋 || 恐龙蛋不够则禁用点击事件-->
          <nx-tag
            class="mr20 mt12"
            plain
            :active="[EXCHANGE_MODE.EGG].includes(activeIndex)"
            :disabled="exchangeMode.EGG"
            @click="!exchangeMode.EGG&&handleClick(EXCHANGE_MODE.EGG)"
          >
            <nx-layout class="sku-item row-col-center pr40">
              <nx-icon class="icon-konglongdan3"></nx-icon>
              <!--  商品价格*恐龙蛋系数 -->
              <span class="f14">{{(detail.price*(productNum||1))*EGG_EXCHARGE_RATE}}</span>
            </nx-layout>
          </nx-tag>
          <!-- 恐龙蛋+人民币 || 恐龙蛋=0则禁用点击事件-->
          <nx-tag
            class="mr20 mt12"
            plain
            :active="[EXCHANGE_MODE.GROUP].includes(activeIndex)"
            :disabled="exchangeMode.GROUP"
            @click="!exchangeMode.GROUP&&handleClick(EXCHANGE_MODE.GROUP)"
          >
            <nx-layout class="sku-item row-col-center pr40">
              <nx-icon class="icon-konglongdan3"></nx-icon>
              <span class="f14">{{group.egg}}</span>
              <span class="f14">+</span>
              <!-- 总价格-余额/恐龙蛋系数 -->
              <span class="f14">{{group.price | currency('¥', '2')}}</span>
            </nx-layout>
          </nx-tag>
          <!-- 人民币 -->
          <nx-tag
            class="mr20 mt12"
            plain
            :active="[EXCHANGE_MODE.MONEY].includes(activeIndex)"
            :disabled="exchangeMode.MONEY"
            @click="handleClick(EXCHANGE_MODE.MONEY)"
          >
            <nx-layout class="sku-item row-col-center pr40">
              <span class="f14">{{(detail.price*(productNum||1)) | currency('¥', '2')}}</span>
            </nx-layout>
          </nx-tag>
        </div>
      </template>
      <template slot="sku-stepper">
        <div class="px20 mb50">
          <nx-label class="f13 c-63 mb15">数量</nx-label>
          <van-stepper v-model="productNum" integer :min="1" :max="detail.stock||1" disable-input></van-stepper>
        </div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
            :loading="loading"
            :disabled="loading||detail.stock<1"
            type="warning"
            bottom-action
            @click="props.skuEventBus.$emit('sku:buy')"
          >{{detail.stock>0?'立即下单':'已售罄'}}</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import { IMAGE_BASE_URL, EGG_EXCHARGE_RATE, EXCHANGE_MODE } from "@/constants";
import nxStroe from "next-store";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EGG_EXCHARGE_RATE,
      EXCHANGE_MODE,
      hasSku: false,
      goodsId: 1,
      quota: 0,
      quotaUsed: 2,
      sku: {
        tree: [],
        list: [],
        hide_stock: false
      },
      goods: {},
      payMethods: [],
      productNum: 1,
      activeIndex: 0,
      balance: 0,
      exchangeMode: {
        EGG: true,
        GROUP: true,
        MONEY: false
      },
      hasPay: true,
      group: {
        egg: 0,
        price: 0
      },
      loading: false
    };
  },
  mounted() {
    this.$on(GE.SKU_STATUS, this.onSkuStatus);
  },
  methods: {
    onBuyClicked() {
      //点击按钮的动画
      this.loading = true;
      //拼接到detail并存储到localstorage
      let new_detail = Object.assign({}, this.detail, {
        num: this.productNum,
        activeIndex: this.activeIndex
      });
      nxStroe.local = {
        sku_desc: new_detail
      };
      this.$router.push({
        name: "MallConfirm"
      });
    },
    onSkuStatus(_bool) {
      this.hasSku = _bool;
    },
    handleClick(inIndex) {
      this.activeIndex = inIndex;
    },
    initDetail() {
      const skuKey = IMAGE_BASE_URL + this.detail.coverFile.key;
      //商品标题与缩略图
      this.goods = {
        title: this.detail.name,
        picture: skuKey
      };
      //验证付款方式
      this.togglePayMethods();
    },
    //获取恐龙蛋余额
    async getBalance() {
      let res = await this.api.points.getBalance();
      this.balance = res;
      if (this.detail.coverFile) {
        this.initDetail();
      }
    },
    //获取是否具有下单专享的权限
    async hasPayOrdered() {
      let res = await this.api.orders.hasPayOrdered();
      this.hasPay = res;
      this.getBalance();
    },
    //检查是否有购买权限
    checkHasPay() {
      return (
        this.detail.buyLimit === 1 ||
        (this.detail.buyLimit === 2 && this.hasPay)
      );
    },
    //验证付款方式
    togglePayMethods() {
      //检查是否有购买权限,true则有权限false则无权限
      if (this.checkHasPay()) {
        //验证数量是否达到最大的库存
        this.toggleProductNum();
        //如果兑换方式是钱，则不验证兑换方式了
        if (this.activeIndex != this.EXCHANGE_MODE.MONEY) {
          //判断恐龙蛋是否充足
          if (
            this.detail.price * this.productNum * EGG_EXCHARGE_RATE <=
            this.balance
          ) {
            this.activeIndex = this.EXCHANGE_MODE.EGG;
            //恐龙蛋支付充足，则恐龙蛋+钱禁用
            this.exchangeMode.EGG = false;
            this.exchangeMode.GROUP = true;
          } //恐龙蛋大于零
          else if (this.balance > 0) {
            this.activeIndex = this.EXCHANGE_MODE.GROUP;
            //使用恐龙蛋+钱，则完全禁用恐龙蛋支付
            this.exchangeMode.GROUP = false;
            this.exchangeMode.EGG = true;
          } //恐龙蛋等于零
          else if (this.balance == 0) {
            this.activeIndex = this.EXCHANGE_MODE.MONEY;
            this.exchangeMode.GROUP = true;
          }
          //使用人民币
          else {
            this.exchangeMode.EGG = true;
            this.activeIndex = this.EXCHANGE_MODE.MONEY;
          }
        }
      }
      //设置组合兑换方式的余额,小于零则显示0
      const _price =
        this.detail.price * this.productNum - this.balance / EGG_EXCHARGE_RATE;
      //设置组合兑换方式的恐龙蛋余额，大于则显示恐龙蛋余额
      const _egg = this.detail.price * this.productNum * EGG_EXCHARGE_RATE;
      this.group = {
        egg: _egg > this.balance ? this.balance : _egg,
        price: _price > 0 ? _price : 0
      };
    },
    //验证数量是否达到最大的库存
    toggleProductNum() {
      if (this.productNum > this.detail.stock) {
        this.productNum = this.detail.stock || 1;
        //this.$toast("已达到最高的库存");
      }
      //把购买权限派发到下单按钮(无下单专享权限)
      const hasPaySubmit = !this.checkHasPay();
      this.$emit(GE.SKU_BUY, hasPaySubmit);
    }
  },
  watch: {
    //监听参数detail
    detail(curr) {
      if (curr) {
        this.getBalance();
      }
    },
    //商品数量变化
    productNum(curr) {
      this.$emit(GE.SKU_NUM, curr);
      this.togglePayMethods();
    }
  },
  created() {
    this.hasPayOrdered();
  }
};
</script>

<style lang="scss" scoped>
.detail-sku {
  .van-popup {
    background-color: #fff;
  }
  .sku-item {
    height: 36px;
  }
  /deep/ .van-sku-messages {
    padding-bottom: 0;
  }
  /deep/ .van-stepper__input[disabled] {
    color: #7d7e80;
    background-color: transparent;
  }
}
</style>
