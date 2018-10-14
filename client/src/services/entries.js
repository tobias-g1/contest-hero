import api from '@/services/api.js'

export default {
  createEntry (params) {
    return api().post('entries', params)
  },
  getEntriesById (params) {
    return api().get(`/entries/${params}`)
  }
}
