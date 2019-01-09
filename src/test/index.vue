<template>
  <div class="test">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
        @click-icon="$toast('question')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
    </van-cell-group>
    <van-button type="primary" @click="handleClickIOS">调用原生IOS</van-button>
    <div>IOSToken:{{token}}</div>
    <van-button type="warning" @click="handleClickAndroid">调用原生Android</van-button>
    <div>AndroidToken:{{token}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      token: ""
    };
  },
  methods: {
    handleClickIOS() {
      window.webkit.messageHandlers.iOS_ZLGAPP.postMessage({
        type: "AIQUPH",
        code: "100",
        username: this.username,
        password: this.password
      });
    },
    IOSToken(inStr) {
      this.token = inStr;
      this.$notify(`iosToken:${inStr}`);
    },
     handleClickAndroid() {
      let params={
        type: "AIQUPH",
        code: "100",
        username: this.username,
        password: this.password
      };
      //安卓需要强类型String
      window.android.ANDROID_ZLGAPP(JSON.stringify(params));
    },
    AndroidToken(inStr) {
      //接收类型也是强类型String
      this.token = inStr;
      this.$notify(`AndroidToken:${inStr}`);
    }
  },
  created() {
    window.IOSToken = this.IOSToken;
    window.AndroidToken = this.AndroidToken;
  }
};
</script>

