<script>
export default {
  mounted() {
    uni.request({
      url: '/api/user/info',
      method: 'GET',
      dataType: 'JSON',
      success: res => {
        if (res.data.code === 200) {
          this.$store.dispatch('setUser', res.data.data)
        }
      }
    })
  }
}
</script>

<style>
/*每个页面公共css */
uni-page-body {
  height: 100%;
}
</style>
