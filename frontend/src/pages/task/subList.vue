<template>
  <view class="sub-list-main" v-if="list && list.length">
    <view class="sub-title" @click="showMore">
      <view class="sub-title-text">{{ typeMap[type] }}</view>
      <i v-if="isShow" class="icon-arrow icon-arrow_up"></i>
      <i v-else class="icon-arrow icon-arrow_down"></i>
    </view>
    <view class="list-content" v-if="isShow" v-for="(item, key) in list" :key="item.name">
      <view class="name">
        {{ item.name }}
        <view class="point">{{ item.point }}</view>
      </view>
      <view class="progress">（{{ item.current }}/{{ item.limit }}）</view>
      <view v-if="item.current === item.limit" class="submit-button submit-button_finish" @click="finish">
        已完成
      </view>
      <view v-else class="submit-button" @click="finish(item)">完成</view>
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
    finish(item) {
      wx.request({
        url: `/api/task/finish`,
        data: {
          id: item.id
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          this.loading = false
          if (res.data.code === 200) {
            item.current += 1
          } else {
            this.$message(res.data.msg, 'error')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-list-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #eee;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  box-sizing: border-box;

  .sub-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color: blue;
    font-size: 0.875rem;
    padding: 0 0.25rem;
    box-sizing: border-box;
  }
  .list-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    font-size: 0.875rem;
    padding: 0 0.25rem;
    box-sizing: border-box;
    line-height: 2rem;

    .name {
      font-size: 0.75rem;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .point {
        display: inline;
        font-size: 0.75rem;
        margin-left: 1.25rem;
        color: green;
      }
    }
    .progress {
      font-size: 0.75rem;
    }
    .submit-button {
      font-size: 0.75rem;
      border-radius: 0.125rem;
      color: white;
      padding: 0 0.5rem;
      background-color: #409eff;
      height: 1.5rem;
      line-height: 1.5rem;
      margin-top: 0.25rem;
    }
    .submit-button_finish {
      background-color: green;
    }
  }
}

.icon-arrow {
  display: inline-block;
  width: 1rem;
  height: 2rem;
  background-image: url(~@/static/icon/arrow.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: 0.5rem;
}
.icon-arrow_up {
  transform: rotate(180deg);
}
</style>
