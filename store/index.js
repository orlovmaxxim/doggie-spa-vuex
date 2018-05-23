import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import axios from 'axios'
import * as types from './mutation-types'
import router from '../src/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doggiesList: [],
    doggiesPictures: [],
    breedPics: [],
    likedDoggies: [],
    breed: ''
  },
  getters: {
    getDoggies: state => state.doggiesList,
    getDoggiesPictures: state => state.doggiesPictures,
    getBreed: state => state.breedPics,
    getLiked: state => state.likedDoggies,
    getCurBreed: state => state.breed
  },
  mutations: {
    [types.INIT_LIKED_DOGGIES] (state) {
      if (localStorage.getItem('likedDoggies')) {
        state.likedDoggies = localStorage.getItem('likedDoggies').split(',')
      }
    },
    [types.GET_FULL_DOGGIE_LIST] (state, { data }) {
      let doggieArr = []
      for (const prop in data.message) {
        if (data.message[prop].length) {
          data.message[prop].map((val, i) => {
            doggieArr = [...doggieArr, `${prop} ${val}`]
          })
        } else {
          doggieArr = [...doggieArr, prop]
        }
      }
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
    },
    [types.DEL_BREDD_PICS] (state) {
      state.breedPics = []
    },
    [types.SET_CURRENT_BREED] (state, breed) {
      state.breed = breed
    }
  },
  actions: {
    getAllDoggies ({ commit, state, dispatch }) {
      if (!state.doggiesList.length) {
        api.getDoggies(state, (res) => {
          commit(types.GET_FULL_DOGGIE_LIST, res)
          dispatch('getAllDoggiesPic')
        })
      }
    },
    getFullBreedsList ({ commit, state }, routeParams) {
      if (!state.doggiesList.length) {
        api.getDoggies(state, (res) => {
          commit(types.GET_FULL_DOGGIE_LIST, res)
        })
      }
    },
    getAllDoggiesPic ({ commit, state }) {
      const arrOfRequests = state.doggiesList.map((breed) => {
        return api.getAllDoggiesPic(breed)
      })
      Promise.all(arrOfRequests)
        .then(axios.spread((...args) => {
          commit(types.GET_DOGGIE_PICS, args)
        }))
    },
    getBreedPics ({ commit, state, dispatch }, breed) {
      api.getBreedPics(state, breed, (res) => {
        if (!state.doggiesList.includes(breed)) {
          return router.push('NotFound')
        }
        commit(types.DEL_BREDD_PICS)
        commit(types.GET_BREED_PICS, res)
        commit(types.SET_CURRENT_BREED, breed)
      })
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', state.likedDoggies)
})

export default store
