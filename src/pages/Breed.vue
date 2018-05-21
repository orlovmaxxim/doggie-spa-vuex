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
  created () {
    console.log(this.$attrs)
    this.$store.dispatch('getBreedPics', this.$attrs)
  },
  updated () {
    console.log(this.$attrs)
    this.$store.dispatch('getBreedPics', this.$attrs)
  }
}
</script>

<style>

</style>
