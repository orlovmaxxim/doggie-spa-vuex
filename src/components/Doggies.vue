<template>
  <ul class="doggie__list grid">
    <li class="doggie__element" v-for="dogPic in doggiesPics.slice(0, loadLimit)" :key="dogPic.id" v-if="!breed">
      <doggie :dogPic=dogPic></doggie>
    </li>
    <li class="doggie__element" v-for="dogPic in breedPics.slice(0, loadLimit)" :key="dogPic.id" v-if="breed">
      <doggie :dogPic=dogPic></doggie>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconTemplate from './IconTemplate.vue'
import IconHeart from './icons/IconHeart.vue'
import Doggie from './Doggie.vue'
import * as types from '../../store/mutation-types'

export default {
  name: 'doggies',
  data () {
    return {
      msg: 'doggies'
    }
  },
  components: {
    IconTemplate,
    IconHeart,
    Doggie
  },
  props: {
    breed: {
      type: Boolean,
      default: false
    },
    loadLimit: {
      type: Number,
      default: 20
    }
  },
  methods: {
    likeDog (doggie) {
      this.$store.commit(types.GET_LIKED_DOGGIES, doggie)
    }
  },
  computed: {
    ...mapGetters({
      doggiesPics: 'getDoggiesPictures',
      breedPics: 'getBreed'
    })
  },
  ...mapActions({
    getBreedPics: 'getBreedPics'
  })
}
</script>

<style>
  .doggie__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
