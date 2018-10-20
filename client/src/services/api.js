import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://contest-hero-api.herokuapp.com/`
  })
}
