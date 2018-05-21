<template>
  <div id="app">
    <header class="header">
      <main-menu></main-menu>
      <dropdown></dropdown>
    </header>
    <router-view/>
  </div>
</template>

<script>
import mainMenu from './components/Menu'
import Dropdown from './components/Dropdown'
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'App',
  components: {
    mainMenu,
    Dropdown
  },
  beforeCreate () {
    this.$store.commit(types.INIT_LIKED_DOGGIES)
  },
  created () {
    this.$store.dispatch('getAllDoggies')
  },
  computed: {
    ...mapGetters({
      doggies: 'getDoggies'
    })
  }
}
</script>

<style>

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.disabled {
  display: none;
}

.header {
  top: 0;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #c3efce;
  z-index: 10;
}

.link {
    text-decoration: none;
  }
</style>
