<template>
  <div class="nc-loading" :class="{full:!hasLoading}" :style="{width: progress+'%'}">
    <div class="nc-loading-content"></div>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      hasLoading: false,
      progress: 0
    };
  },
  mounted() {
    //页面动画的开关状态
    this.$on(GE.MALL_LOADING, this.toggleStatus);
  },
  methods: {
    toggleStatus(_bool = true) {
      if (!_bool) {
        setTimeout(() => {
          this.progress = 100;
        }, 1000);
        setTimeout(() => {
          this.hasLoading = _bool;
          this.progress = 0;
        }, 1500);
      } else {
        this.hasLoading = _bool;
        this.initLoading();
      }
    },
    initLoading() {
      var me = this;
      me.progress = 5;
      for (var i = 0; i < 30; i++) {
        if (i > 20 && i < 29) {
          setTimeout(function() {
            me.progress += 5;
          }, 50 * i);
        } else {
          setTimeout(function() {
            me.progress++;
          }, 10 * i);
        }
      }
    }
  }
};
</script>
<style lang="scss" >
.nc-loading {
  transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  position: fixed;
  top: 0;
  background: #f3a534;
  height: 2px;
  opacity: 1;
  &-content {
    top: 0;
    position: absolute;
    width: 100px;
    height: 100%;
    box-shadow: -2px 0 15px 1px rgba(243, 165, 52, 0.4);
  }
  &.full {
    transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -webkit-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    height: 0;
    opacity: 0;
  }
}
</style>


