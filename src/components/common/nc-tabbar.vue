<template>
  <div class="nc-tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/order/list">订单</van-tabbar-item>
      <van-tabbar-item icon="chat" to="/message/order">消息</van-tabbar-item>
      <van-tabbar-item icon="records" to="/mall/list">商城</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" to="/mall/comment">帮助</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:0
    }
  },
  methods:{
    handleClick(){
      
    }
  }
}
</script>

