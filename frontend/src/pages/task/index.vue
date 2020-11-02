<template>
  <view class="content">
    <listData title="每日任务" :listData="daily"></listData>
    <listData title="每周任务" :listData="weekly"></listData>
    <listData title="每月任务" :listData="monthly"></listData>
    <listData title="额外任务" :listData="others"></listData>
  </view>
</template>

<script>
import listData from './listData'
export default {
  data() {
    return {
      daily: {
        life: [
          {
            name: '测试',
            point: 100,
            limit: 2,
            current: 1
          }
        ]
      },
      weekly: {},
      monthly: {},
      others: {},
      isShow: false
    }
  },
  components: { listData },
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
            console.log(res)
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
}
</style>