<template>
  <div class="mall-address py50">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="handleSelect"
    />
  </div>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      filter: {
        pageSize: 20,
        pageNum: 1
      },
      chosenAddressId: "",
      list: [],
      loading: false
    };
  },

  methods: {
    async handleSelect(item) {
      //选择之后，禁用新增按钮
      this.loading = true;
      //设置为默认地址
      await this.api.address.setAddressDefault(item.id);
      //获取最新的默认地址
      await this.$store.dispatch("getAddressList");
      //返回确认订单页
      this.$router.replace({ name: "MallConfirm" });
    },
    onAdd() {
      //未选择时才能点击新增
      if (!this.loading) {
        this.$router.replace({ name: "MallAddressEdit", params: { id: 0 } });
      }
    },
    onEdit(item, index) {
      this.$router.replace({
        name: "MallAddressEdit",
        params: { id: item.locationId },
        query: {
          name: item.name,
          tel: item.tel,
          address: item.address,
          isD: item.isDefault,
          addressId: item.id
        }
      });
    },
    async getLists() {
      let _list = this.$store.getters.addressList;
      console.log("list:", _list);
      //判断store是否存在默认地址列表
      if (_list.length === 0) {
        let res = await this.$store.dispatch("getAddressList");
        this.getLists();
      } else {
        //重组地址数组
        this.rebuildAddress(_list);
      }
    },
    rebuildAddress(inLists) {
      this.list = [];
      inLists.map((item, index) => {
        if (item.isDefault) {
          this.chosenAddressId = item.id;
        }
        this.list.push({
          id: item.id,
          name: item.userName,
          tel: item.userMobile,
          address: item.detailAddress.replace("[$]", ""),
          locationId: item.locationId,
          isDefault: item.isDefault
        });
      });
    }
  },
  created() {
    this.getLists();
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "地址选择");
  }
};
</script>
<style lang="scss" scoped>
.van-button{
  /deep/ &--danger{
    background-color: #F3A534;
    border: 1px solid #F3A534;
  }
}
</style>

