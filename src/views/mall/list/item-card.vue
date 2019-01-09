<template>
  <div class="item-card" @click="handleClick" v-if="detail">
      <nx-photo :lazy="detail.coverFile&&detail.coverFile.keyTwo | toImg" v-if="detail.coverFile" class="card"></nx-photo>
      <nc-title class="mt8" :detail="detail"></nc-title>
  </div>
</template>
<script>
import NcTitle from '@/components/common/nc-title'
export default {
  components:{
    NcTitle
  },
  props:{
    detail:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    handleClick(){
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.item-card{
  width: 48%;
}
</style>


