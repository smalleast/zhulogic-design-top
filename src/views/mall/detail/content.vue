<template>
  <div class="detail-content">
    <nx-label class="h2 mt20 ml15">图文详情</nx-label>
    <div>
      <div class="content" style="height: auto;">
        <p v-html="detail.appDetail"></p>
      </div>
    </div>
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

<style lang="scss" scoped>
.detail-content {
  /deep/ img {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>

