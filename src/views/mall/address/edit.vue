<template>
  <van-popup v-model="hasAddress" position="right" class="vw vh">
    <div class="pl15">
      <nx-custom-bar @click="hasAddress=false">地址编辑</nx-custom-bar>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :address-info="addressInfo"
        @save="onSave"
      />
    </div>
  </van-popup>
</template>
<script>
import GE from "@/constants/global-events";
import Area from "@/constants/area";
import AreaAll from "@/constants/area_all";
export default {
  data() {
    return {
      hasAddress: false,
      address: {},
      areaList: Area,
      addressInfo: {},
      searchResult: [],
      currAddress: {}
    };
  },
  mounted() {
    //弹框的显示状态
    this.$on(GE.ORDER_ADDRESS_EDIT, this.toggleStatus);
  },
  methods: {
    toggleStatus(inItem) {
      console.log('inItem:',inItem)
      this.address = inItem;
      this.hasAddress = true;
      if (inItem.id != 0) {
        this.getLocation();
      }else{
        this.addressInfo={};//初始化对象
      }
    },
    async onSave(val) {
      let params = {
        detailAddress: val.addressDetail,
        isDefault: val.isDefault ? 1 : 0,
        locationId: this.getLocationId(val.areaCode),
        userMobile: val.tel,
        userName: val.name,
        addressId: this.address.id
      };
      if (this.address.id === 0) {
        await this.api.address.saveAddress(params);
      } else {
        await this.api.address.saveAddressEdit(params);
      }
      await this.$store.dispatch("getAddressList");
      //关闭当前弹框
      this.hasAddress = false;
      //刷新地址列表数据
      this.$emit(GE.ORDER_ADDRESS_EDIT_REFRESH);
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
      let _address = this.address.address_old;
      this.addressInfo = {
        id: this.address.id,
        name: this.address.name,
        tel: this.address.tel,
        areaCode: this.currAddress.code,
        addressDetail: _address.substring(_address.indexOf("[$]") + 3),
        isDefault: this.address.isDefault == 1
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
      if (inItem.id == this.address.locationId) {
        this.currAddress = inItem;
      }
    }
  }
};
</script>

