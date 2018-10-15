import api from '@/services/api.js'

export default {

  getContests () {
    return api().get('contests')
  },
  createContest (params) {
    return api().post('contests', params)
  },
  getContestsByCategory (params) {
    return api().get(`/contests/category/${params}`)
  },
  getContestByPermlink (params) {
    return api().get(`/contests/permlink/${params}`)
  },
  updateWinners (params) {
    return api().put('contest/winners' + params.id, params)
  }
}
