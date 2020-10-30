<template>
  <view class="sub-list-main" v-if="list && list.length">
    <view class="sub-title" @click="showMore">
      <view class="sub-title-text">{{ typeMap[type] }}</view>
      <icon v-if="isShow" type="arrow-up" color="#b1b1b1" size="40"></icon>
      <icon v-else type="arrow-down" color="#b1b1b1" size="40"></icon>
    </view>
    <view class="list-content" v-if="isShow" v-for="(item, key) in list" :key="item.name">
      <view class="name">
        {{ item.name }}
        <view class="point">{{ item.point }}</view>
      </view>
      <view class="progress">（{{ item.current }}/{{ item.limit }}）</view>
      <view v-if="item.current === item.limit" class="submit-button_finish" @click="finish">
        已完成
      </view>
      <view wx:else class="submit-button" @click="finish">完成</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      typeMap: {
        life: '生活',
        sport: '运动',
        education: '提升'
      }
    }
  },
  props: {
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  methods: {
    showMore() {
      this.isShow = !this.isShow
    },
    finish() {}
  }
}
</script>

<style>
.sub-list-main {
  display: flex;
  flex-direction: column;
  width: calc(100% - 24rpx);
  background-color: #eee;
  margin-top: 12rpx;
}

.sub-list-main .sub-title {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 24rpx);
  height: 48rpx;
  line-height: 48rpx;
  font-size: 36rpx;
  color: blue;
  padding: 12rpx;
}

.sub-list-main .list-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 24rpx);
  padding: 12rpx;
  margin: 12rpx 0 0 0;
  border-bottom: 1px solid #ccc;
  font-size: 32rpx;
  line-height: 40rpx;
}

.list-content .name {
  font-size: 32rpx;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-content .name .point {
  display: inline;
  font-size: 32rpx;
  margin-left: 30rpx;
  color: green;
}

.list-content .progress {
  font-size: 32rpx;
}

.list-content .submit-button {
  justify-self: flex-end;
  border-radius: 12rpx;
  background-color: #409eff;
  color: white;
  padding: 6rpx 12rpx;
}

.list-content .submit-button_finish {
  justify-self: flex-end;
  border-radius: 12rpx;
  background-color: green;
  color: white;
  padding: 6rpx 12rpx;
}
</style>
