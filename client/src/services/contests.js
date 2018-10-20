import api from '@/services/api.js'

export default {

  getContests () {
    return api().get('/contests/all')
  },
  createContest (params) {
    return api().post('/contests/create_contest', params)
  },
  getContestsByCategory (params) {
    return api().get(`/contests/${params}`)
  },
  getContestByPermlink (params) {
    return api().get(`/contests/permlink/${params}`)
  },
  updateWinners (params) {
    return api().put('/contests/set_winners/', params)
  }
}
