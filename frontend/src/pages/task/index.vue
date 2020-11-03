<template>
  <view class="content">
    <view class="list-main">
      <view>每日任务：</view>
      <sublist class="sub-list-main" v-for="(item, index) in daily" :key="index" :type="index" :list="item"></sublist>
    </view>
    <view class="list-main">
      <view>每周任务：</view>
      <sublist class="sub-list-main" v-for="(item, index) in weekly" :key="index" :type="index" :list="item"></sublist>
    </view>
    <view class="list-main">
      <view>每月任务：</view>
      <sublist class="sub-list-main" v-for="(item, index) in monthly" :key="index" :type="index" :list="item"></sublist>
    </view>
    <view class="list-main">
      <view>额外任务：</view>
      <sublist class="sub-list-main" v-for="(item, index) in others" :key="index" :type="index" :list="item"></sublist>
    </view>
  </view>
</template>

<script>
import sublist from './subList'
export default {
  data() {
    return {
      daily: {},
      weekly: {},
      monthly: {},
      others: {}
    }
  },
  components: { sublist },
  onLoad() {
    this.initData()
  },
  methods: {
    initData() {
      uni.request({
        url: '/api/task/list',
        method: 'GET',
        dataType: 'JSON',
        success: res => {
          if (res.data.code === 200) {
            let obj = {}
            res.data.data.list.forEach(item => {
              obj[item.timely] || (obj[item.timely] = {})
              obj[item.timely][item.type] || (obj[item.timely][item.type] = [])
              obj[item.timely][item.type].push(item)
            })
            this.daily = obj.daily || {}
            this.weekly = obj.weekly || {}
            this.monthly = obj.monthly || {}
            this.others = obj.others || {}
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 1rem 0.5rem;
  box-sizing: border-box;

  .list-main {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: thin solid #ccc;
  }
}
</style>