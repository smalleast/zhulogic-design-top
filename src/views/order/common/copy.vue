<template>
  <div class="common-copy">
    <button
      type="button"
      class="copy"
      v-clipboard:copy="code"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >复制</button>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: [String, Number]
    }
  },
  methods: {
    onCopy: function(e) {
      this.$toast("恭喜你，订单编号复制成功");
    },
    onError: function(e) {
      this.$toast("无法复制订单编号");
    }
  }
};
</script>
<style lang="scss" scoped>
.copy {
  background: #fffaf2;
  border-radius: 2px;
  color: #f5a623;
  font-size: 9px;
  border: transparent;
  padding: 4px 8px;
}
</style>


