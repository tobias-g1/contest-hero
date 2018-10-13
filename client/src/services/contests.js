import api from '@/services/api'

export default {

  getContests () {
    return api().get('contests')
  },
  createContest (params) {
    return api().post('contests', params)
  },
  getContestsByCategory (params) {
    return api().get(`/contests/${params}`)
  }
}
