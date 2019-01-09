<template>
  <div id="app">
    <transition :name="transitionName">
      <div class="app-content">
        <nc-navbar></nc-navbar>
        <router-view/>
      </div>
    </transition>
    <nc-loading></nc-loading>
  </div>
</template>
<script>
import NcNavbar from "@/components/common/nc-navbar";
import NcTabbar from "@/components/common/nc-tabbar";
import NcLoading from "@/components/common/nc-loading";
export default {
  components: {
    NcTabbar,
    NcNavbar,
    NcLoading
  },
  data() {
    return {
      transitionName: "van-slide-right"
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index < from.meta.index) {
        //设置动画名称
        this.transitionName = "van-slide-left";
      } else {
        this.transitionName = "van-slide-right";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app {
  &-content {
    position: relative;
    z-index: 0;
    width: 100vw;
    min-height: calc(100vh - 46px);
  }
}
</style>


