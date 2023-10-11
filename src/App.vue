<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions('homeOptions', ['getHomeImg']),
    ...mapActions('userOptions', ['getUserInfo']),
  },
  mounted() {
    this.getHomeImg();
    this.getUserInfo();
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

.icon {
  width: .463rem;
  height: .463rem;
}
</style>
