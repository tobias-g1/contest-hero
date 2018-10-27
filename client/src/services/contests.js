import api from '@/services/api.js'

export default {

  getContests (params) {
    return api().get(`/contests/all/${params}`)
  },
  createContest (params) {
    return api().post('/contests/create_contest', params)
  },
  getContestsByCategory (params) {
    return api().get(`/contests/category/${params.category}/${params.sortOrder}`)
  },
  getContestByPermlink (params) {
    return api().get(`/contests/permlink/${params}`)
  },
  updateWinners (params) {
    return api().put('/contests/set_winners/', params)
  },
  editContest (params) {
    return api().put('/contests/edit_contest/', params)
  }
}
