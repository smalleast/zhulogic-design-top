<template>
  <div class="mall-address-edit py46">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :address-info="addressInfo"
      @save="onSave"
    />
  </div>
</template>
<script>
import GE from "@/constants/global-events";
import Area from "@/constants/area";
import AreaAll from "@/constants/area_all";
export default {
  data() {
    return {
      areaList: Area,
      addressInfo: {},
      searchResult: [],
      currAddress: {}
    };
  },

  methods: {
    async onSave(val) {
      let params = {
        detailAddress: val.addressDetail,
        isDefault: val.isDefault ? 1 : 0,
        locationId: this.getLocationId(val.areaCode),
        userMobile: val.tel,
        userName: val.name,
        addressId: this.$route.query.addressId
      };
      if (this.$route.params.id === 0) {
        await this.api.address.saveAddress(params);
      } else {
        await this.api.address.saveAddressEdit(params);
      }
      this.$router.push({name:'MallAddress'})
    },
    //根据地址code获取地址id
    getLocationId(inCode) {
      let addressId = 0;
      AreaAll.n_list.map((item, index) => {
        if (item.code == inCode) addressId = item.id;
        item.children &&
          item.children.map(childItem => {
            if (childItem.code == inCode) addressId = childItem.id;
            childItem.children &&
              childItem.children.map(zItem => {
                if (zItem.code == inCode) addressId = zItem.id;
              });
          });
      });
      return addressId;
    },
    //初始化地址
    initDetail() {
      let _address = this.$route.query.address;
      this.addressInfo = {
        id: this.$route.params.id,
        name: this.$route.query.name,
        tel: this.$route.query.tel,
        areaCode: this.currAddress.code,
        addressDetail: _address.substring(_address.indexOf("[$]") + 3),
        isDefault: this.$route.query.isD == 1
      };
    },
    getLocation() {
      AreaAll.n_list.map((item, index) => {
        this.checkLocation(item); //检测是否匹配
        item.children &&
          item.children.map(childItem => {
            this.checkLocation(childItem); //检测是否匹配
            childItem.children &&
              childItem.children.map(zItem => {
                this.checkLocation(zItem); //检测是否匹配
              });
          });
      });
      this.initDetail();
    },
    checkLocation(inItem) {
      if (inItem.id == this.$route.params.id) {
        this.currAddress = inItem;
      }
    }
  },
  created() {
    if (this.$route.params.id != 0) {
      this.getLocation();
    }
    //设置页面标题
    this.$emit(GE.MALL_TITLE, "地址编辑");
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