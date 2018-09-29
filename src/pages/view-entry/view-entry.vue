<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- Post Container -->
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <div class="post-container">
            <post :postbody="post.data.body">

                
            </post>
                <div class="tags">
                <el-tag v-for="(tag, index) in tags" :key="index" :comment="comments">{{ tag}}</el-tag>
            </div>
            </div>
        
        </el-col>
    </el-row>
</template>

<script>
    import dsteem from '@/mixins/dsteem.js'
    import post from '@/components/post/post.vue'
    
    export default {
        name: 'view-entry',
        mixins: [dsteem],
        components: {
            post
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
        },
        computed: {
            postJson: function() {
                return JSON.parse(this.post.data.json_metadata)
            },
            tags: function() {
                return this.postJson.tags
            }
    
        }
    }
</script>

<style src="@/pages/view-entry/view-entry.css">
    
</style>
