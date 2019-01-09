<template>
  <div class="nx-default vw mt50 flex-xc">
    <div class="p10">
      <nx-photo :lazy="DEFAULT_ICON[status]" class="full transparent"></nx-photo>
      <nx-label class="mt20">
        <slot>暂无评价</slot>
      </nx-label>
    </div>
  </div>
</template>
<script>
import { DEFAULT_ICON } from "@/constants";
export default {
  props: {
    status: {
      type: [String, Number]
    }
  },
  data() {
    return {
      DEFAULT_ICON
    };
  }
};
</script>


