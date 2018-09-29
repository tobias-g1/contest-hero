<template>

</template>

<script>

    import dsteem from '@/mixins/dsteem.js'

    export default {
        name: 'view-entry',
        mixins: [dsteem],
        components: {

        },
        data() {
            return {
                post: {
                    author: null,
                    data: null,
                    permlink: null,
                    comments: []
                }
            }
        },
        methods: {
            loadContent() {
                this.post.author = this.$route.params.author
                this.post.permlink = this.$route.params.permlink
                this.loadPost(this.post.author, this.post.permlink)
                    .then(discussions => {
                        this.post.data = discussions[0]
                   
                    })
            }
        },
        mounted() {
            this.loadContent();
        }
    }
</script>

<style src="@/pages/view-entry/view-entry.css">
    
</style>
