<template>
  <div class="user-main">
    <div v-if="!user.id" class="user-operation">
      <div class="operation-main">
        <div class="left" :class="{ active: show === 'login' }" @click="showChange('login')">登录</div>
        <div class="right" :class="{ active: show === 'register' }" @click="showChange('register')">注册</div>
        <div class="form">
          <div class="form-item">
            <input v-model="username" class="input" placeholder="用户名称" />
            <span v-if="usernameInfo" class="info">{{ usernameInfo }}</span>
          </div>
          <div class="form-item">
            <input v-model="password" class="input" type="password" placeholder="密码" />
            <span v-if="passwordInfo" class="info">{{ passwordInfo }}</span>
          </div>
          <div v-if="show === 'login'">
            <button @click="login" class="button" size="mini" type="primary">登 录</button>
          </div>
          <div v-else>
            <div class="form-item">
              <input v-model="checkPassword" class="input" type="password" placeholder="确认密码" />
              <span v-if="checkInfo" class="info">{{ checkInfo }}</span>
            </div>
            <button @click="register" class="button" size="mini" type="primary">注 册</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="user-info">
      <div class="operation-main">
        <div class="form">
          <div class="point-form">
            <span>剩余积分：</span>
            <span>{{ user.info || 0 }}</span>
          </div>
          <div class="form-item">
            <input v-model="editForm.username" class="input" placeholder="用户名称" />
            <span v-if="usernameInfo" class="info">{{ usernameInfo }}</span>
          </div>
          <div class="form-item">
            <div class="reset">
              <input
                :class="{ disabled: !isChanged }"
                :disabled="!isChanged"
                class="input reset-input"
                v-model="editForm.password"
                type="password"
                placeholder="密码"
              />
              <div class="reset-btn" @click="resetCheck">重置</div>
            </div>
            <span v-if="passwordInfo" class="info">{{ passwordInfo }}</span>
          </div>
          <div class="form-item">
            <input v-model="editForm.email" class="input" placeholder="邮箱" />
            <span v-if="emailInfo" class="info">{{ emailInfo }}</span>
          </div>
          <div class="form-item">
            <input v-model="editForm.mobile" class="input" placeholder="手机" />
            <span v-if="mobileInfo" class="info">{{ mobileInfo }}</span>
          </div>
          <button @click="edit" class="button" size="mini" type="primary">修 改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmail, isMobile, encrypt } from '../../libs/util'
export default {
  data() {
    return {
      show: 'login',
      username: null,
      usernameInfo: null,
      password: null,
      passwordInfo: null,
      checkPassword: null,
      checkInfo: null,
      email: null,
      emailInfo: null,
      mobile: null,
      mobileInfo: null,
      isChanged: false,
      editForm: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user: {
      immediate: true,
      handler(data) {
        if (!data) return
        this.editForm.username = data.username
        this.editForm.password = data.password
        this.editForm.email = data.email
        this.editForm.mobile = data.mobile
      }
    }
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
    resetCheck() {
      this.isChanged = true
      this.editForm.password = null
    },
    login() {
      this.usernameInfo = this.username ? null : '用户名不能为空'
      this.passwordInfo = this.password ? null : '密码不能为空'
      if (this.usernameInfo || this.passwordInfo || this.checkInfo) return
      uni.request({
        url: '/api/user/key',
        method: 'Get',
        dataType: 'JSON',
        success: res => {
          if (res.data.code === 200) {
            this.loginAction(res.data.data)
          } else {
            this.$message('res.data.msg', 'error')
          }
        },
        fail: err => {
          this.$message(err.data.msg, 'error')
        }
      })
    },
    loginAction(key) {
      uni.request({
        url: '/api/user/login',
        method: 'POST',
        dataType: 'JSON',
        data: {
          username: this.username,
          password: encrypt(this.password, key)
        },
        success: res => {
          if (res.data.code === 200) {
            this.$store.dispatch('setUser', res.data.data)
          } else {
            this.$message(res.data.msg, 'error')
          }
        },
        fail: err => {
          this.$message(err.data.msg, 'error')
        }
      })
    },
    register() {
      this.usernameInfo = this.username ? null : '用户名不能为空'
      this.passwordInfo = this.password ? null : '密码不能为空'
      this.checkInfo = this.checkPassword ? null : '请确认密码'
      if (this.password !== this.checkPassword) this.checkInfo = '俩次密码不一致'
      if (this.usernameInfo || this.passwordInfo || this.checkInfo) return
      uni.request({
        url: '/api/user/register',
        method: 'POST',
        dataType: 'JSON',
        data: {
          username: this.username,
          password: this.password
        },
        success: res => {
          if (res.data.code === 200) {
            this.$store.dispatch('setUser', res.data.data)
          } else {
            this.$message(res.data.msg, 'error')
          }
        },
        fail: err => {
          this.$message(err.data.msg, 'error')
        }
      })
    },
    edit() {
      this.usernameInfo = this.editForm.username ? null : '用户名不能为空'
      this.passwordInfo = this.editForm.password || !this.isChanged ? null : '密码不能为空'
      if (this.usernameInfo || this.passwordInfo) return
      if (this.editForm.email) {
        this.emailInfo = isEmail(this.editForm.email) ? null : '邮箱格式不正确'
      }
      if (this.editForm.mobile) {
        this.mobileInfo = isMobile(this.editForm.mobile) ? null : '手机格式不正确'
      }
      if (this.mobileInfo || this.emailInfo) return
      uni.request({
        url: '/api/user/edit',
        method: 'POST',
        dataType: 'JSON',
        data: {
          username: this.editForm.username,
          password: this.editForm.password,
          email: this.editForm.email,
          mobile: this.editForm.mobile
        },
        success: res => {
          if (res.data.code === 200) {
            this.$message('修改成功', 'success')
            this.$store.dispatch('setUser', res.data.data)
          } else {
            this.$message(res.data.msg, 'error')
          }
        },
        fail: err => {
          this.$message(err.data.msg, 'error')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-main {
  width: 100%;
  height: 100%;

  .user-operation,
  .user-info {
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

    .reset-input {
      display: inline-block;
      border-radius: 0.25rem 0 0 0.25rem;
      width: 75%;
      box-sizing: border-box;

      &.disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
    .reset-btn {
      display: inline-block;
      overflow: hidden;
      width: 25%;
      border: 1px solid #dcdfe6;
      border-left: none;
      border-radius: 0 0.25rem 0.25rem 0;
      box-sizing: border-box;
      line-height: 2rem;
      height: 2rem;
      vertical-align: top;
      text-align: center;
      font-size: 0.875rem;
    }
  }
}

.point-form {
  line-height: 2.4rem;
  border-bottom: 1px dashed #cccccc;
  margin-bottom: 1rem;
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
