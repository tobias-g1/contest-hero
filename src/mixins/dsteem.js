import { Client } from 'dsteem'

const client = new Client('https://api.steemit.com')

var dsteem = {

  methods: {
    getContests: function (tag, limit) {
      return client.database.getDiscussions('trending', {
        tag: tag,
        limit: limit
      })
    },
    loadPost: function (author, permlink) {
      return client.database.getDiscussions('blog', {
        tag: author,
        start_permlink: permlink,
        start_author: author,
        limit: 1
      })
    },
    getAccount: function (author) {
      return client.database.getAccounts([author])
    },
    getPostComments: function (author, permlink) {
      return client.database.call('get_content_replies', [author, permlink])
    }
  }
}

export default dsteem
