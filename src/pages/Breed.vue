<template>
  <div>
    <h1>{{ this.$route.params.breed.toUpperCase() }}</h1>
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
      breedPics: 'getBreed',
      doggiesList: 'getDoggies'
    })
  },
  mounted () {
    this.scroll()
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$nextTick(() => {
        this.$store.dispatch('getBreedPics', this.$route.params.breed)
      })
    },
    scroll () {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= (document.body.offsetHeight)) {
          this.loadLimit += this.limit
        }
      }
    }
  }
}
</script>

<style>
  a {
    color: #1b6342;
  }
</style>
