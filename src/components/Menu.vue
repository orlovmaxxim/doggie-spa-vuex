<template>
  <menu class="menu">
    <ul class="menu__list">
      <li class="menu__item">
        <router-link v-bind:to="{ name: 'Home' }" class="link">Home</router-link>
      </li>
      <li class="menu__item">
        <router-link v-bind:to="{ name: 'favourites' }" class="link">Favourites</router-link>
      </li>
    </ul>
  </menu>
</template>

<script>

export default {
  name: 'mainMenu',
  data () {
    return {
      msg: 'Menu'
    }
  }
}
</script>

<style>

  a {
    color: #1b6342;
  }

  .menu {
    margin: 0;
    padding: 0;
  }

  .menu__item .link:hover {
    color: #073b23
  }
</style>
