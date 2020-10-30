<template>
  <view class="content">
    <view class="wish-main">
      <view class="wish-list">
        <text>*愿望清单*</text>
        <view class="list-main" v-for="(item, index) in typeList" :key="index">
          <view class="name">{{ item.name }}</view>
          <view class="point">成就点：{{ item.point }}</view>
          <view class="time">实现次数：{{ item.time }}</view>
          <view class="submit-button" @click="finish(item)">实现</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        {
          name: '测试数据',
          point: 100,
          time: 1
        }
      ],
      params: {
        current: 0,
        pageSize: 10,
        total: 0
      }
    }
  },
  onLoad() {
    this.initData()
  },
  methods: {
    initData(increase = false) {
      if (!increase) {
        this.params.current = 0
      }
      let openid = wx.getStorageSync('openid')
      wx.request({
        url: `/api`,
        data: {
          openid: openid,
          current: this.params.current,
          pageSize: this.params.pageSize
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' //post
        },
        success: res => {
          if (res.data.code == 200) {
            let list = this.typeList
            if (increase) {
              list = list.concat(res.data.data.list)
            } else {
              list = res.data.data.list
            }
            this.typeList = list
            this.params.total = res.data.data.total
          }
        }
      })
    },
    finish() {
      const wishid = e.mark.data.id
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: `${globalData.host}/wish/finish`,
        data: {
          id: wishid,
          openid: openid
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' //post
        },
        success: res => {
          if (res.data.code == 200) {
            this.initData()
          }
        }
      })
    },
    onReachBottom() {
      if (this.params.total > this.typeList.length) {
        this.params.current += 1
        this.initData(true)
      } else {
        console.info('已经到底了')
      }
    }
  }
}
</script>

<style>
.content {
  padding: 1rem 0.25rem;
  box-sizing: border-box;
}
.wish-main {
  display: inline-block;
  width: 100%;
  height: auto;
  vertical-align: top;
}

.wish-list {
  width: 100%;
  height: auto;
  padding: 12rpx 24rpx;
  font-size: 30rpx;
  box-sizing: border-box;
}

.wish-list .list-main {
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
  margin-top: 8rpx;
}

.wish-list .list-main .name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 60rpx;
  font-size: 36rpx;
}

.wish-list .list-main .point {
  width: auto;
  line-height: 20px;
}

.wish-list .list-main .time {
  width: auto;
  line-height: 20px;
}

.wish-list .list-main .submit-button {
  border-radius: 12rpx;
  background-color: #409eff;
  color: white;
  padding: 6rpx 12rpx;
}

.wish-list .list-main .submit-button_finish {
  background-color: green;
}
</style>
