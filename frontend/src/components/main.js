import Vue from 'vue'
import Main from './message.vue'
let AlertConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

const Message = function(msg, type, time = 5) {
  if (Vue.prototype.$isServer) return
  let id = 'alert_' + seed++
  instance = new AlertConstructor({
    data: {
      message: msg,
      type: type,
      time: time
    }
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instances.push(instance)
  return instance
}

export default Message
