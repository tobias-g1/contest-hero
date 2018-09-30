<template>
    <div class="stats-container">
        <i class="material-icons stat-option vote" :class="{ voted: voted }" @click.prevent="vote($store.state.steemconnect.user.name, post.author, post.permlink, 100)">thumb_up</i> <span>{{ post.net_votes}}</span>
        <i class="material-icons stat-option">attach_money</i> <span>{{post.pending_payout_value.slice(0, -3) * 1 }}</span>
    </div>
</template>

<script>
    export default {
        name: 'post-options',
        data() {
            return {
                voted: false
            }
        },
        props: {
            post: Object
        },
        methods: {
            vote(currentUser, author, permlink, weight) {
                this.$store.commit('setLoading', true)
                this.$steemconnect.vote(currentUser, author, permlink, weight)
                    .then(err => {
                        this.voted = true
                        this.$store.commit('setLoading', false)
                    })
            },
            checkVote: function() {
                for (let i = 0; i < this.post.active_votes.length; i++) {
                    console.log(this.post.active_votes[i])
                    if (this.post.active_votes[i].voter == this.$store.state.steemconnect.user.name) {
                        this.voted = true
                    }
                }
            }
        },
        mounted() {
            this.checkVote();
        }
    }
</script>

<style>
    .stats-container {
        display: flex;
        align-items: center;
    }
    
    .stat-option {
        font-size: 20px;
        margin: 5px;
    }
    
    .vote {
        cursor: pointer;
    }
    
    .voted {
        color: #FF1480;
    }
    
    .post-bar {
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
    }
</style>