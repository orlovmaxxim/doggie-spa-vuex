<template>
  <div class="link" @click="likeDog(dogPic)">
    <div class="doggie__c">
      <div class="like" style="color:red">
        <icon-template width="90" height="90" icon-name="heart"><icon-heart /></icon-template>
      </div>
      <img :src="dogPic" alt="" class="doggie__pic">
      <div class="filter">
        <p>Add to Favourite</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconTemplate from './IconTemplate.vue'
import IconHeart from './icons/IconHeart.vue'
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
    IconHeart
  },
  props: {
    breed: {
      type: Boolean,
      default: false
    },
    loadLimit: {
      type: Number,
      default: 20
    },
    dogPic: {
      type: String
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
  .doggie__pic {
    max-width: 100%;
    vertical-align: bottom;
    border-radius: 20px;
  }

  .like {
    z-index: 5
  }

  .doggie__c {
    position: relative;
    cursor: pointer;
  }

  .doggie__c .filter {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #c3efce;
    opacity: 0;
    z-index: 0;
  }

  .filter p {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
  }

  .like {
    display: none;
    position: absolute;
    top: 45%;
    left: 45%;
  }

  .doggie__c:hover .like {
    display: block;
  }

  .doggie__c:hover .filter {
    opacity: .5;
  }
</style>
