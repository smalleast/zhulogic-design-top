<template>
  <div class="nx-photo" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
    <img v-lazy="lazy" :cover="cover">
  </div>
</template>
<script>
export default {
  props: {
    lazy: {
      type: [String, Number]
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      touch: {
        start: { clientX: 0 },
        move: { clientX: 0 },
        end: { clientX: 0 }
      }
    };
  },
  methods: {
    handleStart(e) {
      this.touch.start = e.changedTouches[0];
    },
    handleMove(e) {
      this.touch.move = e.changedTouches[0];
    },
    handleEnd(e) {
      this.touch.end = e.changedTouches[0];
      let end = this.touch.end.clientX;
      let start = this.touch.start.clientX;
      //判断滑动的间距小于20则算点击事件
      if (Math.abs(end - start) < 20) {
        this.$emit("click");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nx-photo {
  position: relative;
  width: 60px;
  height: 60px;
  background: #f1f1f1;
  border-radius: 5px;
  > img {
    object-fit: contain;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%; //间隔为10%
    height: 90%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    &[cover="true"] {
      object-fit: cover;
    }
  }
  &.full {
    > img {
      width: 100%;
      height: 100%;
    }
  }
  &.transparent {
    background: transparent;
  }
  &.banner {
    width: 100%;
    height: 210px;

    border-radius: 0;
    > img {
      border-radius: 0;
    }
  }
  &.product {
    width: 100%;
    height: 375px;
    border-radius: 0;
    > img {
      border-radius: 0;
    }
  }
  &.card {
    width: 100%;
    height: 162px;
  }
  &.avatar {
    width: 36px;
    height: 36px;
    border: 1px solid #ccc;
    border-radius: 100%;
    > img {
      border-radius: 100%;
    }
  }
  &.min {
    width: 80px;
    height: 80px;
  }
  &.icon {
    width: 60px;
    height: 60px;
    background: transparent;
  }
}
</style>

