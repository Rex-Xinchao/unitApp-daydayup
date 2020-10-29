<template>
  <transition name="slide-fade">
    <div class="re-message" v-if="show" :style="{ background: this.bgColor, borderColor: this.bgColor }">
      <p class="re-message--text" :style="{ color: this.textColor }">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
const textColorObj = {
  default: '#909399',
  success: '#67c23a',
  info: '#E6A23C',
  error: '#F56C6C'
}
const bgColorObj = {
  default: '#edf2fc',
  success: '#f0f9eb',
  info: '#fdf6ec',
  error: '#fef0f0'
}

export default {
  name: 're-message',
  data() {
    return {
      show: '',
      type: '',
      time: 3,
      message: '',
      style: {
        textColor: '',
        bgColor: ''
      }
    }
  },
  methods: {
    messageMsg() {
      this.show = true
      this.setColor()
      this.hidemessageMsg()
    },
    setColor() {
      this.textColor = textColorObj[this.type]
      this.bgColor = bgColorObj[this.type]
    },
    hidemessageMsg() {
      setTimeout(e => {
        this.show = false
      }, this.time * 1000)
    }
  },
  mounted() {
    this.messageMsg()
  }
}
</script>

<style lang="scss" scoped>
.re-message {
  display: flex;
  align-items: center;
  width: 80%;
  height: auto;
  overflow: hidden;
  padding: 0.5rem 1rem 0.5rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid #a0a0a0;
  box-sizing: border-box;
  background-color: #edf2fc;
  position: absolute;
  top: 5vh;
  left: 10%;

  .re-message--text {
    padding: 0;
    margin: 0;
    font-size: 0.75rem;
    text-align: center;
  }
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave,
.slide-fade-enter-to {
  top: 5vh;
  opacity: 1;
}

.slide-fade-enter,
.slide-fade-leave-to {
  top: 0;
  opacity: 0;
}
</style>
