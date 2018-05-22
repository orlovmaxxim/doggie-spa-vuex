<template>
  <div class="dropdown" ref="dropdown">
    <button class="btn-dropdown" type="button" data-toggle="dropdown" v-on:click.prevent="showDropDown=!showDropDown">
      <img class="dropdown-pic" src="../assets/doggie.png" alt="doggie">
      Choose Breed
      <span class="caret"></span>
    </button>
    <transition name="fade">
      <ul id="dropdown-menu" v-if="showDropDown">
        <li v-for="doggie in doggies" class="list" :key="doggie.id">
          <router-link class="link dd-link" :to="{ name: 'Breed', params: { breed: doggie }}">{{doggie}}</router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dropdown',
  data () {
    return {
      showDropDown: false
    }
  },
  methods: {
    outClick (e) {
      const dropdown = this.$refs.dropdown
      const target = e.target
      if ((dropdown !== target) && !dropdown.contains(target)) {
        this.showDropDown = false
      }
    }
  },
  computed: {
    ...mapGetters({
      doggies: 'getDoggies'
    })
  },
  created () {
    document.addEventListener('click', this.outClick)
  },
  destroyed () {
    document.removeEventListener('click', this.outClick)
  }
}
</script>
<style>
.dropdown {
  position: relative;
  z-index: 20;
}

button {
  position: relative;
  background: #c3efce;
  border: 0;
  color: #1b6342;
  outline: none;
  border-radius: 6px;
  padding: 12px 14px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;

}

.dropdown-pic {
  width: 25%;
  height: 25%;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

button:hover {
  background: #ffe9c9;
}

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 8px dashed;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}

#dropdown-menu {
  position: absolute;
  background: #c3efce;
  overflow: hidden;
  border-radius: 6px;
  list-style: none;
  margin: 5px 0 0 0;
  padding: 0;
  width: 180px;
  height: 250px;
  overflow-y: scroll;
}

  #dropdown-menu.open {
    visibility: visible;
    opacity: 1;
  }

  #dropdown-menu li:hover {
    background: #ffe9c9;
  }

  #dropdown-menu li:hover a{
    color: #1b6342;
  }

  a {
    display: block;
    padding: 10px;
    color: #000;
    text-decoration: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
