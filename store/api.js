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
    return axios.get(`${commonUrl}breed/${breed}/images`)
  },
  getBreedPics: function (state, breed, cb) {
    axios.get(`${commonUrl}breed/${breed}/images`)
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
