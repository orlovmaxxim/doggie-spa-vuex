import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import axios from 'axios'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doggiesList: [],
    doggiesPictures: [],
    breedPics: [],
    likedDoggies: []
  },
  getters: {
    getDoggies: state => state.doggiesList,
    getDoggiesPictures: state => state.doggiesPictures,
    getBreed: state => state.breedPics,
    getLiked: state => state.likedDoggies
  },
  mutations: {
    [types.INIT_LIKED_DOGGIES] (state) {
      if (localStorage.getItem('likedDoggies')) {
        state.likedDoggies = localStorage.getItem('likedDoggies').split(',')
      }
    },
    [types.GET_FULL_DOGGIE_LIST] (state, { data }) {
      let doggieArr = []
      // console.log(data.message)
      for (const prop in data.message) {
        // console.log(data.message[prop])
        if (data.message[prop].length) {
          data.message[prop].map((val, i) => {
            // console.log(prop, val)
            // doggieArr = [...doggieArr, `${prop} ${val}`]
          })
        } else {
          doggieArr = [...doggieArr, prop]
        }
      }
      // const doggieNamesArr =
      state.doggiesList = doggieArr
    },
    [types.GET_DOGGIE_PICS] (state, data) {
      for (let i = 0; i < data.length; i++) {
        state.doggiesPictures = [...state.doggiesPictures, ...data[i].data.message]
      }
    },
    [types.GET_LIKED_DOGGIES] (state, data) {
      if (!state.likedDoggies.includes(data)) {
        state.likedDoggies = [...new Set([data, ...state.likedDoggies])]
        localStorage.setItem('likedDoggies', state.likedDoggies)
      }
    },
    [types.GET_BREED_PICS] (state, { data }) {
      state.breedPics = data.message
    }
  },
  actions: {
    getAllDoggies ({ commit, state, dispatch }) {
      api.getDoggies(state, (res) => {
        commit(types.GET_FULL_DOGGIE_LIST, res)
        dispatch('getAllDoggiesPic')
      })
    },
    getAllDoggiesPic ({ commit, state }) {
      const arrOfRequests = state.doggiesList.map((breed) => {
        // return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        return api.getAllDoggiesPic(breed)
      })
      Promise.all(arrOfRequests)
        .then(axios.spread((...args) => {
          commit(types.GET_DOGGIE_PICS, args)
        }))
    },
    getBreedPics ({ commit, state }, { breed }) {
      api.getBreedPics(state, breed, (res) => {
        commit(types.GET_BREED_PICS, res)
      })
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', state.likedDoggies)
})

export default store
