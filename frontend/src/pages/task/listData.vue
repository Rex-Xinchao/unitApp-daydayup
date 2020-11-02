<template>
  <view class="list-main">
    <view>{{ title }}：</view>
    <sublist class="sub-list-main" v-for="(item, index) in listData" :key="index" :type="index" :list="item"></sublist>
  </view>
</template>

<script>
import sublist from './subList'
export default {
  data() {
    return {
      daily: [],
      weekly: [],
      monthly: [],
      others: [],
      isShow: false
    }
  },
  props: {
    title: {
      type: String
    },
    listData: {
      type: Object
    }
  },
  components: { sublist }
}
</script>

<style>
.list-main {
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: thin solid #ccc;
}
</style>
