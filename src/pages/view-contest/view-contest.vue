<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt=""> {{ title }} </h1>
            <post :postbody="body"></post>
            <a v-bind:href="postLink"><button class="btn-fill enter-contest">Enter Contest</button></a>
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Comments</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="commentbody">
                    <markdownEditor v-model="ruleForm.commentbody" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
            <comment v-for="(comments, index) in comments" :key="index" :comment="comments" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> This contest closes in:</h3>
            <Countdown :deadline="contestDeadline"></Countdown>
            <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">About the Author</h3>
            <aboutauthor :authorBio="authorBio" :authorImage="authorImage" :authorName="author"></aboutauthor>
            <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">Entries</h3>
            <entry v-for="(comments, index) in comments" :key="index" :comment="comments" />
        </el-col>
    </el-row>
</template>

<script>
    import entry from '@/components/entered-contest/entered-contest.vue'
    import comment from '@/components/contest-comment/contest-comment.vue'
    import aboutauthor from '@/components/about-author/about-author.vue'
    import post from '@/components/post/post.vue'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import form from '@/mixins/form-actions.js'
    import Countdown from 'vuejs-countdown'
    import { Client } from 'dsteem'
    
    const client = new Client('https://api.steemit.com')
    
    export default {
        name: 'contest',
        mixins: [form],
        components: {
            entry,
            comment,
            markdownEditor,
            aboutauthor,
            Countdown,
            post
        },
        data() {
            return {
                author: null,
                authorImage: null,
                authorBio: null,
                permlink: null,
                title: null,
                body: '',
                tags: null,
                entries: null,
                comments: null,
                ruleForm: {
                    commentbody: ''
                },
                contestDeadline: 'August 22, 2022',
                firstPlace: '',
                sencondPlace: '',
                thirdPlace: '',
                otherWinners: [],
                rules: {
                    commentbody: [{
                        required: true,
                        message: 'Please enter a comment',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            loadContent() {
                this.author = this.$route.params.author
                this.permlink = this.$route.params.permlink
                client.database.getDiscussions('blog', {
                    tag: this.author,
                    start_permlink: this.permlink,
                    start_author: this.author,
                    limit: 1
                }).then(discussions => {
                    this.body = discussions[0].body
                    this.title = discussions[0].title
                })
            },
            getAuthorDetails(author) {
                client.database.getAccounts([author]).then(authorDetails => {
                    let userJson = JSON.parse(authorDetails[0].json_metadata)
                    this.authorImage = userJson.profile.profile_image
                    this.authorBio = userJson.profile.about
                })
            },
            getComments(author, permlink) {
    
                let postComments = []
    
                client.database.call('get_content_replies', [author, permlink]).then(comments => {
    
                    comments.forEach(function(comment, i) {
    
                        client.database.getAccounts([comment.author]).then(commentAuthorDetails => {
    
                            let commentJSON = commentAuthorDetails[0].json_metadata
                            commentJSON = JSON.parse(commentJSON)
    
                            let combinedAuthorComment = Object.assign(commentJSON, comment)
    
                            postComments.push(combinedAuthorComment);
                        });
                    })
                })
    
                this.comments = postComments
    
            }
        },
        mounted() {
            this.loadContent();
            this.getAuthorDetails(this.author)
            this.getComments(this.author, this.permlink);
        },
        computed: {
            postLink: function() {
                let postLink = `#/enter-contest/${this.author}/${this.permlink}`
                return postLink;
            }
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .post-container {
        background: white;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 0 0 10px 2px #0000001f;
    }
    
    .post-container img {
        max-width: 100%;
        height: auto;
    }
    
    .enter-contest {
        margin-top: 15px;
        width: 100%;
        box-shadow: 0 0 10px 2px #0000001f;
    }
</style>


