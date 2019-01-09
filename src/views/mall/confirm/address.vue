<template>
  <div class="confirm-address">
     <van-cell is-link @click="handleClick" center>
      <template slot="title">
       <nc-address :detail="detail"></nc-address>
      </template>
    </van-cell>
    <address-list></address-list>
    <address-edit></address-edit>
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import NcAddress from "@/components/common/nc-address";
import AddressList from "../address/list";
import AddressEdit from "../address/edit";
export default {
  components: {
    NcAddress,
    AddressList,
    AddressEdit
  },
  data(){
    return{
      detail:{}
    }
  },
  mounted() {
    //弹框的显示状态
    this.$on(GE.ORDER_ADDRESS_REFRESH, this.getAddressDefault);
  },
   methods: {
    async getAddressDefault() {
      this.detail = this.$store.getters.addressDefault;

      //判断store是否存在默认地址
      if (!this.detail.userName) {
        let res = await this.$store.dispatch("getAddressList");
        this.getAddressDefault();
      }else{
        this.$emit(GE.ADDRESS_ID,this.detail.id)
      }
    },
    handleClick(){
      //呼起收货地址列表
      this.$emit(GE.ORDER_ADDRESS)
    }
  },
  created() {
    this.getAddressDefault();
  }
};
</script>

