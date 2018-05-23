<template>
  <div class="container">
    <ul class="doggie__list grid">
      <li class="doggie__element" v-for="dogPic in doggiesPics.slice(0, loadLimit)" :key="dogPic.id" v-if="!breed">
        <doggie :dogPic=dogPic></doggie>
      </li>
      <li class="doggie__element" v-for="dogPic in breedPics.slice(0, loadLimit)" :key="dogPic.id" v-if="breed">
        <doggie :dogPic=dogPic></doggie>
      </li>
    </ul>
  </div>
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
  .grid {
    column-gap: 30px;
    column-fill: initial;
  }

  .doggie__element {
    margin-bottom: 30px;
  }

  @media only screen and (min-width: 1024px) {
    .grid {
      column-count: 4;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .grid {
      column-count: 3;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 540px) {
    .grid {
      column-count: 2;
    }
  }
</style>
