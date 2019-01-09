<template>
  <div class="detail-address mt15">
    <nc-address :detail="detail.address"></nc-address>
    <div class="line-1 mt15"></div>
  </div>
</template>
<script>
import NcAddress from "@/components/common/nc-address";
export default {
  components: {
    NcAddress
  },
  props:{
    detail:{
      type:Object,
      default:()=>{}
    }
  }
};
</script>

