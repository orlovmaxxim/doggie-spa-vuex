import axios from 'axios'

const commonUrl = `https://dog.ceo/api/`

export default {
  getDoggies: function (state, cb) {
    axios.get(`${commonUrl}breeds/list/all`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          cb(res)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getAllDoggiesPic: function (breed) {
    if (breed.split(' ').length === 1) {
      return axios.get(`${commonUrl}breed/${breed}/images`)
    } else {
      return axios.get(`${commonUrl}breed/${breed.split(' ')[0]}/${breed.split(' ')[1]}/images`)
    }
  },
  getBreedPics: function (state, breed, cb) {
    let fullUrl = ''
    if (breed.split(' ').length === 1) {
      fullUrl = `${commonUrl}breed/${breed}/images`
    } else {
      fullUrl = `${commonUrl}breed/${breed.split(' ')[0]}/${breed.split(' ')[1]}/images`
    }
    axios.get(fullUrl)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          cb(res)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }
}
