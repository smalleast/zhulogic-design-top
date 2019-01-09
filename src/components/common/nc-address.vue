<template>
  <div class="nc-address" v-if="detail">
    <nx-layout>
      <nx-label>{{detail.userName | toName}}</nx-label>
      <nx-label class="pl15 pr10">{{detail.userMobile | toPhone}}</nx-label>
      <van-tag color="#F5A623" plain v-if="detail.isDefault">默认</van-tag>
    </nx-layout>
    <nx-label class="mt8 c-87">{{detail.detailAddress | toAddress}}</nx-label>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

