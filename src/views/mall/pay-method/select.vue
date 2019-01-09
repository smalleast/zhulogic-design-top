<template>
  <div class="pay-method-select">
    <nx-label class="h2 mb20 pl15">选择支付方式</nx-label>
    <van-radio-group v-model="result">
      <van-cell-group>
        <van-cell v-for="(item,index) in list" clickable :key="index" @click="handleClick(item.status)">
          <template slot="title">
            <nx-layout>
              <nx-icon :class="item.icon"></nx-icon>
              <span class="ml10">{{item.title}}</span>
            </nx-layout>
          </template>
          <van-radio :name="item.status" checked-color="#f5a623"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>

import GE from "@/constants/global-events";
export default {
  data() {
    return {
      result: 'wx_wap',
      list: [
        {
          id: 2,
          icon: "icon-weixin1 f28 c-52",
          title: "微信",
          status:'wx_wap'
        },
        {
          id: 3,
          icon: "icon-zhifubao f28 c-5b",
          title: "支付宝",
          status:'alipay_wap'
        }
      ]
    };
  },
  methods: {
    handleClick(inId) {
      this.result = inId;
      this.handleResult();
    },
    handleResult() {
      this.$emit(GE.PAY_TYPE,this.result);
    }
  },
  created(){
    this.handleResult();
  }
};
</script>
