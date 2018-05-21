<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul class="liked__list">
      <li class="liked__element" v-for="dog in likedDoggies" :key="dog.id">
        <img :src="dog" alt="" class="favourite__pic">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'favourites',
  data () {
    return {
      msg: 'Favourites'
    }
  },
  computed: {
    ...mapGetters({
      likedDoggies: 'getLiked'
    })
  }
}
</script>

<style>
  .favourite__pic {
    width: 150px;
    height: 150px;
    object-fit: cover;
    -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }
</style>
