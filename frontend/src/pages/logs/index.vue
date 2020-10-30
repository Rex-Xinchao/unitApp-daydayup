<template>
  <div class="log-main">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="log-main_scroll" @scrolltolower="lower">
      <div class="log-row" v-for="(item, index) in logs">
        <div class="log-item left">
          <span class="type">【{{ typeMap[item.type] }}】</span>
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="log-item right">
          <p class="time">{{ item.time }}</p>
          <p class="point">
            <span v-if="item.optType === 'add'" class="point-type_add">+</span>
            <span v-else class="point-type_del">-</span>
            <span class="point-num">{{ item.point }}</span>
          </p>
        </div>
      </div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      logs: [],
      typeMap: {
        ache: '成就',
        task: '任务',
        wish: '愿望'
      },
      scrollTop: 0,
      past: {
        scrollTop: 0
      },
      loading: false,
      loadEnd: false,
      page: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.getLogList()
      }
    }
  },
  methods: {
    lower(e) {
      if (this.loadEnd) return
      this.page += 1
      this.getLogList()
    },
    getLogList() {
      if (!this.user.id) return
      this.loading = true
      uni.request({
        url: '/api/log/list',
        method: 'GET',
        dataType: 'JSON',
        data: {
          page: this.page,
          size: 20
        },
        success: res => {
          this.loading = false
          if (res.data.code === 200) {
            this.logs.push(...res.data.data.list)
            this.total = res.data.data.total
            if (this.total === this.logs.length) {
              this.loadEnd = true
            }
          }
        }
      })
    },
    addLog() {
      uni.request({
        url: '/api/log/add',
        method: 'POST',
        dataType: 'JSON',
        data: {
          name: 1,
          type: 'ache',
          optType: 'del',
          point: 1
        },
        success: res => {
          this.loading = false
          if (res.data.code === 200) {
            this.logs.push(...res.data.data.list)
            this.total = res.data.data.total
            if (this.total === this.logs.length) {
              this.loadEnd = true
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.log-main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .log-main_scroll {
    width: 100%;
    height: 100%;
    padding: 0.75rem 0;
    box-sizing: border-box;
  }

  .log-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2.5rem;
    border-bottom: 1px solid #cccccc;
    padding: 0.25rem 0.5rem;
    box-sizing: border-box;

    .log-item {
      width: 100%;
      height: 100%;

      .type {
        color: #409eff;
      }

      span {
        font-size: 0.875rem;
      }
    }

    .left {
      width: 50%;
      overflow: hidden;

      .name {
        white-space: nowrap;
      }
    }

    .right {
      width: 50%;
      overflow: hidden;

      .time {
        width: 100%;
        text-align: right;
        font-size: 0.75rem;
        line-height: 1rem;
      }

      .point {
        width: 100%;
        text-align: right;
        font-size: 0.75rem;
        line-height: 1rem;

        .point-type_add {
          color: #67c23a;
        }

        .point-type_del {
          color: #f56c6c;
        }
      }
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
.refresh-icon {
  display: inline-block;
  height: 2rem;
  width: 2rem;
  border: 5px solid rgba(150, 150, 150, 0.2);
  border-radius: 50%;
  border-top-color: rgb(150, 150, 150);
  animation: rotate 1s 0s infinite linear normal;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
