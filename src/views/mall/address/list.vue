<template>
  <van-popup v-model="hasAddress" position="right" class="vw vh">
    <div class="pl15">
      <nx-custom-bar @click="hasAddress=false">收货地址选择</nx-custom-bar>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="handleSelect"
      />
    </div>
  </van-popup>
</template>
<script>
import GE from "@/constants/global-events";
export default {
  data() {
    return {
      hasAddress: false,
      filter: {
        pageSize: 20,
        pageNum: 1
      },
      chosenAddressId: "",
      list: [],
      loading: false
    };
  },
  mounted() {
    //弹框的显示状态
    this.$on(GE.ORDER_ADDRESS, this.toggleStatus);
    //刷新地址列表
    this.$on(GE.ORDER_ADDRESS_EDIT_REFRESH, this.getLists);
  },
  methods: {
    toggleStatus() {
      this.hasAddress = true;
    },
    async handleSelect(item) {
      //选择之后，禁用新增按钮
      this.loading = true;
      //设置为默认地址
      await this.api.address.setAddressDefault(item.id);
      //获取最新的默认地址
      await this.$store.dispatch("getAddressList");
      //关闭当前页
      this.hasAddress = false;
      //刷新默认地址
      this.$emit(GE.ORDER_ADDRESS_REFRESH);
    },
    onAdd() {
      //未选择时才能点击新增
      if (!this.loading) {
        this.$emit(GE.ORDER_ADDRESS_EDIT, { id: 0 });
      }
    },
    onEdit(item, index) {
      this.$emit(GE.ORDER_ADDRESS_EDIT, item);
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
          isDefault: item.isDefault,
          address_old: item.detailAddress
        });
      });
    }
  },
  created() {
    this.getLists();
  }
};
</script>

<style lang="scss" scoped>
.van-button {
  /deep/ &--danger {
    background-color: #f3a534;
    border: 1px solid #f3a534;
  }
}
.van-address-list {
  padding-bottom: 0;
}
/deep/ .van-address-list__add,.van-icon-edit {
  display: none;
}
/deep/ .van-address-item__edit {
  display: none;
}
</style>
