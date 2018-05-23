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
    console.log(this.$store.state.doggiesList)
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

h1, h2 {
  font-weight: normal;
}

a {
  color: #1b6342;
}

ul {
  list-style-type: none;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.container {
  width: 960px;
  margin: 0 auto;
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
