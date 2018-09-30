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
                this.$steemconnect.vote(currentUser, author, permlink, weight)
                    .then(err => {
                        this.voted = true
                    })
            }
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