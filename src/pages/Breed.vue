<template>
  <div>
    <h1>{{ $attrs.breed.toUpperCase() }}</h1>
    <p class="disabled">{{ $attrs }}</p>
    <doggies :breed="true" :load-limit=loadLimit></doggies>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    fetchData() {
      this.$nextTick (() => {
        this.$store.dispatch('getBreedPics', this.$attrs)
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
