<template>
  <view class="wish-main">
    <view class="wish-list">
      <text class="wish-title">*愿望清单*</text>
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="list-main" @scrolltolower="lower">
        <view class="row-main" v-for="(item, index) in typeList" :key="index">
          <view class="row">
            <view class="name">{{ item.name }}</view>
            <view class="point">成就点：{{ item.point }}</view>
            <view class="time">实现次数：{{ item.time }}</view>
            <view class="submit-button" @click="finish(item)">实现</view>
          </view>
        </view>
        <div class="refresh-tab">
          <p v-if="loading">
            <span class="refresh-icon"></span>
          </p>
          <p v-else-if="loadEnd">
            {{ user.id ? '暂无更多数据' : '前先登录账号' }}
          </p>
          <p v-else cla>{{ user.id ? '加载更多' : '前先登录账号' }}</p>
        </div>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      typeList: [],
      loading: false,
      loadEnd: false,
      page: 1,
      total: 0,
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.getWishList()
      }
    }
  },
  methods: {
    lower(e) {
      if (this.loadEnd) return
      this.page += 1
      this.getWishList()
    },
    getWishList() {
      if (!this.user.id) return
      this.loading = true
      wx.request({
        url: `/api/wish/list`,
        data: {
          page: this.page,
          size: 20
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' //post
        },
        success: res => {
          this.loading = false
          if (res.data.code === 200) {
            this.typeList.push(...res.data.data.list)
            this.total = res.data.data.total
            if (this.total === this.typeList.length) {
              this.loadEnd = true
            }
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
            this.getWishList()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wish-main {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.75rem 0;
  box-sizing: border-box;

  .wish-list {
    width: 100%;
    height: auto;
    box-sizing: border-box;

    .wish-title {
      font-size: 1rem;
      line-height: 1rem;
      margin-bottom: 0.5rem;
    }

    .list-main {
      width: 100%;
      height: 31.25rem;
      box-sizing: border-box;

      .row-main {
        padding: 0 0.5rem;
      }

      .row {
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

        .time {
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

      .refresh-tab {
        width: 100%;
        height: 3rem;
        padding-top: 0.25rem;
        font-size: 0.75rem;

        p {
          width: 100%;
          line-height: 2rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
