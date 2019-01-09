<template>
  <div class="comment-item-card">
    <nx-layout>
      <div class="pr10">
        <nx-photo :lazy="user.avatarFile&&user.avatarFile.key | toImg" class="avatar full"></nx-photo>
      </div>
      <div class="col f13">
        <nx-label class="lc-wrap">{{user.loginName}}</nx-label>
      </div>
      <div class="pl10 pr15 f12 c-87">{{detail.createTime | toDateTime}}</div>
    </nx-layout>
    <div class="mt10 c-63 pr110">{{detail.content}}</div>
    <nx-layout class="mt10 row-wrap">
      <nx-photo
        v-for="(item,index) in detail.imageFiles"
        :key="index"
        :lazy="item.key | toImg"
        class="min full mr8 mb8"
        @click="openPreview(index)"
      ></nx-photo>
    </nx-layout>
    <div class="line-1 mt8"></div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import { IMAGE_BASE_URL } from "@/constants";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    openPreview(index) {
      const lists = this.detail.imageFiles;
      //调用全屏预览
      this.generic.openPreview(lists, index);
    }
  }
};
</script>

