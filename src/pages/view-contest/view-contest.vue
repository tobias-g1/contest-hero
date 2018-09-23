<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt=""> {{ title }} </h1>
            <post :postbody="body"></post>
            <a v-bind:href="postLink"><button class="btn-fill enter-contest">Enter Contest</button></a>
    
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Winners</h1>
            <winners v-for="(winners, index) in winners" :key="index" :winners="winners" />
    
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Other Winners</h1>
            <div>
             <otherwinners v-for="(otherwin, index) in otherwin" :key="index" :otherWinners="otherwin" />
            </div>
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
    import winners from '@/components/winners-panel/winners-panel.vue'
    import otherwinners from '@/components/other-winners/other-winners.vue'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import form from '@/mixins/form-actions.js'
    import dsteem from '@/mixins/dsteem.js'
    import Countdown from 'vuejs-countdown'
    
    export default {
        name: 'contest',
        mixins: [form, dsteem],
        components: {
            entry,
            comment,
            markdownEditor,
            aboutauthor,
            Countdown,
            post,
            winners,
            otherwinners
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
                winners: [{
                        'author': 'tobias-g',
                        'place': '1'
                    },
                    {
                        'author': 'dave',
                        'place': '2'
                    },
                    {
                        'author': 'john',
                        'place': '3'
                    }
                ],
                otherwin: [{
                        "author": 'james'
                    },
                    {
                        "author": 'jack',
                    },
                    {
                        "author": 'sam',
                    },
                    {
                        "author": 'james'
                    },
                    {
                        "author": 'jack',
                    },
                    {
                        "author": 'sam',
                    }
                ],
                rules: {
                    commentbody: [{
                        required: true,
                        message: 'Please enter a comment',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            loadContent() {
                this.author = this.$route.params.author
                this.permlink = this.$route.params.permlink
                this.loadPost(this.author, this.permlink)
                    .then(discussions => {
                        this.body = discussions[0].body
                        this.title = discussions[0].title
                    })
            },
            getAuthorDetails(author) {
                this.getAccount(author)
                    .then(authorDetails => {
                        let userJson = JSON.parse(authorDetails[0].json_metadata)
                        this.authorImage = userJson.profile.profile_image
                        this.authorBio = userJson.profile.about
                    })
            },
            getComments(author, permlink) {
                let postComments = []
                this.getPostComments(author, permlink)
                    .then(comments => {
                        comments.forEach(comment => {
                            this.getAccount(comment.author)
                                .then(commentAuthorDetails => {
                                    let commentJSON = commentAuthorDetails[0].json_metadata
                                    commentJSON = JSON.parse(commentJSON)
                                    let combinedAuthorComment = Object.assign(commentJSON, comment)
                                    postComments.push(combinedAuthorComment)
                                })
                        })
                    })
                this.comments = postComments
            }
        },
        mounted() {
            this.loadContent()
            this.getAuthorDetails(this.author)
            this.getComments(this.author, this.permlink)
        },
        computed: {
            postLink: function() {
                let postLink = `#/enter-contest/${this.author}/${this.permlink}`
                return postLink
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
