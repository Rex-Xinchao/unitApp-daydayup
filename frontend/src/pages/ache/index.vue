<template>
  <view class="content">
    <view class="wishbar">
      <view class="list" v-for="(item, key) in typeMap" :key="key">
        <button class="check-btn" @click="typeChange(key)">{{ item }}</button>
      </view>
    </view>
    <view class="wish-main">
      <view class="wish-statistic">
        <view class="name">{{ typeName }}</view>
        <view class="progress">
          <view class="bar" :style="{ width: `${(finished / total) * 100}%` }"></view>
          <view class="text">{{ finished }} / {{ total }}</view>
        </view>
      </view>
      <view class="wish-list">
        <text>*成就*</text>
        <view class="list-main" v-for="item in typeList" :key="index">
          <view class="name">{{ item.name }}</view>
          <view class="point">成就点：{{ item.point }}</view>
          <span v-if="item.finished === 1" class="submit-button submit-button_finish">已完成</span>
          <span v-else class="submit-button" @click="finish(item.id)">完成</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: 'all',
      typeName: '全部',
      total: 0,
      finished: 0,
      typeList: [],
      typeMap: {
        all: '全部',
        life: '生活',
        education: '提升',
        sport: '运动'
      }
    }
  },
  onLoad() {
    this.initData()
  },
  methods: {
    initData() {
      uni.request({
        url: '/api/ache/list',
        method: 'GET',
        dataType: 'JSON',
        data: {
          type: this.type
        },
        success: res => {
          if (res.data.code === 200) {
            this.typeList = res.data.data
            this.total = res.data.data.length
            this.finished = res.data.data.filter(item => item.finished == 1).length
          }
        }
      })
    },
    typeChange(key) {
      this.type = key
      this.typeName = this.typeMap[key]
      this.initData()
    },
    finish(id) {
      uni.request({
        url: '/api/ache/list',
        method: 'POST',
        dataType: 'JSON',
        data: {
          id: id
        },
        success: res => {
          if (res.data.code === 200) {
            this.initData()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* pages/wish/index.wxss */

.content {
  padding: 1rem 0.25rem;
  box-sizing: border-box;
}

.wishbar {
  display: inline-block;
  width: 30%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .list {
    width: 100%;
    height: auto;
  }

  .check-btn {
    width: calc(100% - 12rpx);
    font-size: 36rpx;
    line-height: 36rpx;
    text-align: center;
    white-space: nowrap;
    background-image: linear-gradient(to bottom right, #ffcc33, #ffff00);
    padding: 8px 9px;
    margin-bottom: 20rpx;
    color: #000033;
  }
}

.wish-main {
  display: inline-block;
  width: 70%;
  height: auto;
  vertical-align: top;
}

.wish-statistic {
  width: 100%;
  height: auto;
  padding: 12rpx 24rpx;
  display: flex;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  line-height: 40rpx;
  .name {
    width: 80rpx;
    font-size: 32rpx;
    color: #c93;
    font-weight: bolder;
    box-sizing: border-box;
  }
  .progress {
    position: relative;
    flex: 1;
    height: auto;
    border-radius: 8rpx;
    background-color: #ccc;

    .text {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      text-align: center;
      color: white;
    }
  }
  .bar {
    height: 100%;
    box-sizing: border-box;
    border-radius: 8rpx;
    background-color: #cff;
  }
}

.wish-list {
  width: 100%;
  height: auto;
  padding: 12rpx 24rpx;
  font-size: 30rpx;
  box-sizing: border-box;

  text {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .list-main {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 12rpx;
    display: flex;
    flex-wrap: wrap;
    padding: 12rpx 12rpx;
    justify-content: space-between;
    margin-bottom: 8rpx;

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 60rpx;
      font-size: 36rpx;
    }

    .point {
      width: auto;
      line-height: 20px;
    }

    .submit-button {
      border-radius: 12rpx;
      background-color: #409eff;
      color: white;
      padding: 6rpx 12rpx;
    }

    .submit-button_finish {
      background-color: green;
    }
  }
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
