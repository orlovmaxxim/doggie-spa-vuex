<template>
  <div>
    <h1>{{ $attrs.breed.toUpperCase() }}</h1>
    <p class="disabled">{{ $attrs }}</p>
    <doggies :breed="true" :load-limit=loadLimit></doggies>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Doggies from '../components/Doggies'
import router from '../router'

export default {
  name: 'favourites',
  data () {
    return {
      loadLimit: 20,
      limit: 20
    }
  },
  components: {
    Doggies
  },
  computed: {
    ...mapGetters({
      breedPics: 'getBreed'
    })
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= (document.body.offsetHeight)) {
          this.loadLimit += this.limit
        }
      }
    }
  },
  mounted () {
    this.scroll()
  },

  beforeCreate () {
    this.$store.dispatch('getAllDoggies')
    if (!this.$store.state.doggiesList.includes(this.$attrs.breed)) {
      return router.push('NotFound')
    }
  },
  created () {
    this.$store.dispatch('getBreedPics', this.$attrs)
  },
  beforeUpdate () {
    if (!this.$store.state.doggiesList.includes(this.$attrs.breed)) {
      return router.push('NotFound')
    }
  },
  updated () {
    this.$store.dispatch('getBreedPics', this.$attrs)
  }
}
</script>

<style>

</style>
