<template>
    <el-row :gutter="20">
        <el-col :span="18">
        <h1>{{ title }} </h1>
        <div v-html="body" class="post-container">
        </div>
         <el-button type="primary">Primary</el-button>
         <h1>Comments</h1>
         <div class="comment-container">
This is a comment 
         </div>
    
        </el-col>
        <el-col :span="6">
    
            <h3>About the Author</h3>
            <h3>Entries</h3>
            <div class="entry-container">
                @someone has entered this contest
            </div>
    
        </el-col>
    </el-row>
</template>

<script>
    // @ is an alias to /src
    
    import filterpanel from '@/components/feed/filter-panel/filter-panel.vue'
    import {
        Client
    } from 'dsteem'
    
    const client = new Client('https://api.steemit.com')
    
    export default {
        name: 'contest',
        components: {
    
        },
        data() {
            return {
                author: null,
                permlink: null,
                title: null,
                body: null,
                tags: null,
                entries: null,
                comments: null
            }
        },
        mounted() {
            this.getContest();
        },
        methods: {
            loadContent() {
    
                this.author = this.$route.params.author
                this.permlink = this.$route.params.permlink
    
                console.log(this.author)
                console.log(this.permlink)
    
                client.database.getDiscussions('blog', {
                    tag: this.author,
                    start_permlink: this.permlink,  
                    start_author: this.author,
                    limit: 1
                }).then(discussions => {
                    console.log(discussions)
                    this.body = discussions[0].body
                    this.title = discussions[0].title
                })
    
            }
        },
        mounted() {
            this.loadContent();
        }
    }
</script>

<style scoped>
    .post-container {
        background: white;
        border-radius: 5px;
        padding: 15px;
    }

    .entry-container {
        background: white;
        padding: 15px;
    }

    .comment-container {
         background: white;
        padding: 15px;  
    }
</style>
