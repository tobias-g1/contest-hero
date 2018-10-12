import Api from '@/services/Api'

export default {

  createContest (params) {
    return Api().post('contests', params)
  }
}
