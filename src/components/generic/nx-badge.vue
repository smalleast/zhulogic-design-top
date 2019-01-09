<template>
  <div class="nx-badge">
    <span class="dib">{{title}}</span>
    <span class="nx-badge-info flex-yc flex-xc" v-if="info">{{info}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: [String, Number]
    },
    info: {
      type: [String, Number]
    }
  }
};
</script>
<style lang="scss" scoped>
.nx-badge {
  position: relative;
   &-info {
    position: absolute;
    right: 0px;
    top: 3px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    box-sizing: border-box;
    padding: 0 3px;
    min-width: 20px;
    height: 20px;
    border: 1px solid #fff;
    border-radius: 20px;
    background-color: #f44;
    display: flex;
  }
}
</style>


