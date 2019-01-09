<template>
  <nx-layout class="custom-bar" @click="handleClick">
    <nx-icon class="icon-more"></nx-icon>
    <nx-label class="col tc f16 custom-bar-text">
      <slot></slot>
    </nx-label>
  </nx-layout>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-bar{
  height: 46px;
  position: relative;
  .icon-more{
    position: absolute;
  }
  &-text{
    font-weight: 500;
  }
}
</style>


