<template>
  <div class="payment-failed tc mt50">
     <nx-icon class="icon-guanbi c-f0 f40"></nx-icon>
    <nx-label class="mt20 c-32 f15 blod">支付失败</nx-label>
   <nx-label class="mt10 c-98">最后一步出了点问题，请尝试重新支付</nx-label>
    <nx-layout class="row-col-center mt50">
      <van-button round plain type="warning" size="small">取消</van-button>
      <van-button round class="ml40" type="warning" size="small">重试</van-button>
    </nx-layout>
  </div>
</template>
