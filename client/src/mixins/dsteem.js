import { Client } from 'dsteem'

const client = new Client('https://api.steemit.com')

var dsteem = {

  methods: {
    getContests: function (tag, limit, type) {
      return client.database.getDiscussions(type, {
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
    },
    getActiveVotes: function (author, permlink) {
      return client.database.call('get_active_votes', [author, permlink])
    },
    getSingleComment: function (author, permlink) {
      return client.database.getDiscussions('comments', {
        tag: author,
        start: permlink,
        start_author: author,
        limit: 1
      })
    }
  }
}

export default dsteem
