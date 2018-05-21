<template>
  <div>
    <h1>{{ msg }}</h1>
    <doggies :load-limit=loadLimit></doggies>
  </div>
</template>

<script>
import Doggies from '../components/Doggies'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Doggie applicaion',
      loadLimit: 20,
      limit: 20
    }
  },
  components: {
    Doggies
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
  computed: {
    ...mapGetters({
      doggies: 'getDoggies',
      doggiesPics: 'getDoggiesPictures'
    })
  },
  ...mapActions({
    getBreedPics: 'getBreedPics'
  })
}
</script>

<style>
h1, h2 {
  font-weight: normal;
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
a {
  color: #1b6342;
}
</style>
