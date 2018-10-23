import api from '@/services/api.js'

export default {
  createEntry (params) {
    return api().post('/entries/create_entry', params)
  },
  getEntriesById (params) {
    return api().get(`/entries/get_entries/${params}`)
  },
  getEntriesByPermlink (params) {
    return api().get(`/entries/get_entries/permlink/${params}`)
  }
}
