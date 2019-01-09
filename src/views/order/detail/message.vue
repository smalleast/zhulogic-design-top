<template>
  <div class="detail-message mt15">
    <nx-label class="c-35">买家留言</nx-label>
    <nx-label class="c-87 mt10">
    {{detail.buyMessage}}
    </nx-label>
    <div class="line-1 mt15"></div>
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
