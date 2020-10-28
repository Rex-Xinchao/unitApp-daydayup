<template>
  <div class="user-main">
    <div v-if="!user.id" class="user-operation">
      <div class="operation-main">
        <div class="left" :class="{ active: show === 'login' }" @click="showChange('login')">登录</div>
        <div class="right" :class="{ active: show === 'register' }" @click="showChange('register')">注册</div>
        <div class="form">
          <div class="form-item">
            <input v-model="username" class="input" placeholder="用户名称" />
            <span v-if="usernameInfo" class="info">用户名不能为空</span>
          </div>
          <div class="form-item">
            <input v-model="password" class="input" type="password" placeholder="密码" />
            <span v-if="passwordInfo" class="info">密码不能为空</span>
          </div>
          <div v-if="show === 'login'">
            <button @click="login" class="button" size="mini" type="primary">登 录</button>
          </div>
          <div v-else>
            <div class="form-item">
              <input v-model="checkPassword" class="input" type="password" placeholder="确认密码" />
              <span v-if="checkInfo" class="info">请确认密码</span>
            </div>
            <button @click="register" class="button" size="mini" type="primary">注 册</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="user-info"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      show: 'login',
      username: null,
      usernameInfo: false,
      password: null,
      passwordInfo: false,
      checkPassword: null,
      checkInfo: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  onLoad() {},
  methods: {
    showChange(show) {
      this.show = show
      this.usernameInfo = false
      this.username = null
      this.passwordInfo = false
      this.password = null
      this.checkInfo = false
      this.checkPassword = null
    },
    login() {
      this.usernameInfo = !this.username
      this.passwordInfo = !this.password
      if (this.usernameInfo || this.passwordInfo) return
      uni.request({
        url: '/api/user/login',
        method: 'POST',
        dataType: 'JSON',
        data: {
          username: this.username,
          password: this.password
        },
        success: res => {
          console.log(res.data)
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    register() {
      this.usernameInfo = !this.username
      this.passwordInfo = !this.password
      this.checkInfo = !this.checkPassword
      if (this.usernameInfo || this.passwordInfo || this.checkInfo) return
    }
  }
}
</script>

<style lang="scss" scoped>
.user-main {
  width: 100%;
  height: 100%;

  .user-operation {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;

    .operation-main {
      position: absolute;
      width: 80%;
      height: auto;
      border-radius: 0.25rem;
      border: 1px solid #cccccc;
      left: 10%;
      top: 20%;

      .left,
      .right {
        display: inline-block;
        width: 50%;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;

        &.active {
          color: #409eff;
          font-weight: bold;
        }
      }

      .left {
        border-right: 1px solid #cccccc;
      }

      .form {
        width: 100%;
        padding: 1.25rem;
        box-sizing: border-box;
        height: auto;

        .form-item {
          position: relative;
          height: 3.75rem;

          .info {
            display: inline-block;
            width: 100%;
            height: 0.75rem;
            font-size: 0.75rem;
            color: red;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
}

.input {
  background-color: #fff;
  background-image: none;
  border-radius: 0.25rem;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 2rem;
  line-height: 2rem;
  outline: none;
  padding: 0 1rem;
  width: 100%;
  overflow: visible;
}

.button {
  width: 6rem;
  margin-left: calc(50% - 3rem);
}
</style>
