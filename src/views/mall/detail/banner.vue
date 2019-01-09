<template>
  <div class="detail-banner">
    <van-swipe :autoplay="5000" indicator-color="white ">
      <van-swipe-item v-for="(item, index) in lists" :key="index" >
        <nx-photo :lazy="item.key | toImg" class="product full" cover @click="openPreview(index)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openPreview(index) {
      //调用全屏预览
      this.generic.openPreview(this.lists, index);
    }
  }
};
</script>

