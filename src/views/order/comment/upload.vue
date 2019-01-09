<template>
  <div class="comment-upload">
    <nx-layout class="mr10_">
      <nx-photo v-for="(item,index) in list" :key="index" :lazy="item.key | toImg" class="full" @click="openPreview(index)"></nx-photo>
      <van-uploader
        :after-read="onRead"
        accept="image/gif, image/jpeg, image/png"
        multiple
        :max-size="10737418240"
        @oversize="handleOversize"
      >
        <nx-icon class="icon-add f60 c-c6"></nx-icon>
      </van-uploader>
    </nx-layout>
  </div>
</template>
<script>
import { UPLOAD_TYPE } from "@/constants";
import GE from "@/constants/global-events";
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      policyRes: {}
    };
  },
  methods: {
    onRead(file) {
      this.uplaodAliOSS(file);
    },
    async getPolicy() {
      let res = await this.api.orders.upload(UPLOAD_TYPE.EVALUATION);
      this.policyRes = res;
    },
    //上传至阿里云
    uplaodAliOSS(inFile) {
      const res = this.policyRes;
      let key = inFile.file.name;
      let lastIndex = key.lastIndexOf(".");
      let suffix = key.substring(lastIndex, key.length); //后缀名
      let formData = new FormData();
      formData.append("x:type", res.type);
      formData.append("x:originname", inFile.file.name);
      formData.append("policy", res.policy);
      formData.append("OSSAccessKeyId", res.OSSAccessKeyId);
      formData.append("callback", res.callback);
      formData.append("signature", res.signature);
      formData.append("dir", res.dir);
      formData.append("key", res.dir + new Date().getTime() + "." + suffix);
      formData.append("success_action_status", 200);
      formData.append("file", this.dataURLtoBlob(inFile.content));
      axios
        .post(res.action, formData)
        .then(res => {
          this.list.push(res.data.data[0]);
          //评价图片传输
          this.$emit(GE.COMMENT_IMAGE, this.list);
        })
        .catch(res => {
          console.log("catch:", res);
        });
    },
    //base64转换为Blod
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    handleOversize(e) {
      this.$notify("文件限制为10M,请上传小于10M的");
    },
    openPreview(index) {
      //调用全屏预览
      this.generic.openPreview(this.list, index);
    }
  },
  created() {
    this.getPolicy();
  }
};
</script>


