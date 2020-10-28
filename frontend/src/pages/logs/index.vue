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
            <span v-if="item.option === 'add'" class="point-type_add">+</span>
            <span v-else class="point-type_del">-</span>
            <span class="point-num">{{ item.point }}</span>
          </p>
        </div>
      </div>
      <div class="refresh-tab">
        <p v-if="loading">
          <span class="refresh-icon"></span>
        </p>
        <p v-else-if="loadEnd">暂无更多数据</p>
        <p v-else cla>加载更多</p>
      </div>
    </scroll-view>
  </div>
</template>

<script>
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
      loadEnd: false
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    lower(e) {
      if (this.loadEnd) return
      this.getData()
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        if (this.logs.length < 50) {
          for (let i = 0; i < 20; i++) {
            this.logs.push({ type: 'ache', name: '长跑达人', time: '2020/10/28 11:38', point: 50, option: 'del' })
          }
        } else {
          this.loadEnd = true
        }
      }, 300)
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
      width: 40%;
    }

    .right {
      width: 60%;

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
