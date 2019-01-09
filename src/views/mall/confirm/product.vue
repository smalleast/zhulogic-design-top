<template>
  <div class="confirm-product">
    <nx-layout>
      <lazy-component>
        <nx-photo :lazy="detail.coverFile&&detail.coverFile.key | toImg" @click="openPreview([detail.coverFile])"></nx-photo>
      </lazy-component>
      <div class="wp-240 pl15">
        <nc-title :detail="detail" price></nc-title>
      </div>
      <div class="col tr">
        <nx-label class="pr10 c-a2">x{{detail.num}}</nx-label>
      </div>
    </nx-layout>
  </div>
</template>
<script>
import NcTitle from "@/components/common/nc-title";
export default {

  components: {
    NcTitle
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  methods:{
    openPreview(lists) {
      //调用全屏预览
      this.generic.openPreview(lists);
    }
  }
 
};
</script>

