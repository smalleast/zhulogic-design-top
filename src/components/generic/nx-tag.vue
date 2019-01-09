<template>
  <div class="nx-tag" :plain="plain" :active="active" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    //空心样式
    plain: {
      type: Boolean,
      default: false
    },
    //选中状态
    active: {
      type: Boolean,
      default: false
    },
    //禁用状态
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.nx-tag {
  color: #fff;
  font-size: 10px;
  padding: 0.2em 0.5em;
  line-height: normal;
  display: inline-block;
  background: #f5a623;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  &[plain="true"] {
    background: transparent;
    border-radius: 20px;
    border: 1px solid #636464;
    * {
      color: #3e3e3e;
    }
  }
  &[active="true"] {
    border: 1px solid #f5a623;
    * {
      color: #f3a534;
    }
  }
  &[disabled="true"],
  &[disabled="disabled"] {
    border: 1px solid #ddd;
    * {
      color: #ddd;
    }
  }
  
}
</style>

