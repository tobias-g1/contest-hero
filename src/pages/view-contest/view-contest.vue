<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
    
            <!-- Post Container -->
    
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <post :postbody="post.data.body"></post>
            <a v-bind:href="postLink"><button class="btn-fill enter-contest">Enter Contest</button></a>
    
            <!-- Winners -->
    
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Winners</h1>
            <winners v-for="(winner, index) in contest.winners" :key="index" :winners="winner" />
    
            <!-- Other Winners -->
    
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Other Winners</h1>
            <div class="other-winners-container">
                <otherwinners v-for="(otherwin, index) in contest.otherwin" :key="index" :otherWinners="otherwin" />
            </div>
    
            <!-- Comments -->
    
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Comments</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="commentbody">
                    <markdownEditor v-model="ruleForm.commentbody" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Submit Comment</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
            <comment v-for="(comments, index) in post.comments" :key="index" :comment="comments" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
    
            <!-- Contest Deadline -->
    
            <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> This contest closes in:</h3>
            <Countdown :deadline="contestDeadline"></Countdown>
    
            <!-- About Author -->
    
            <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">About the Author</h3>
            <aboutauthor :authorBio="post.authorBio" :authorImage="post.authorImage" :authorName="post.author"></aboutauthor>
    
            <!-- Contest Entries -->
    
            <h3 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">Entries</h3>
            <!--  <entry v-for="(comments, index) in post.comments" :key="index" :comment="comments" /> -->
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
                post: {
                    author: null,
                    authorImage: null,
                    authorBio: null,
                    data: null,
                    permlink: null,
                    comments: null
                },
                contest: {
                    entries: [],
                    winners: [],
                    otherwin: [],
                    ruleForm: {
                        commentBody: ''
                    },
                    rules: {
                        commentbody: [{
                            required: true,
                            message: 'Please enter a comment',
                            trigger: 'blur'
                        }]
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
                    },
                    getAuthorDetails(author) {
                        this.getAccount(author)
                            .then(authorDetails => {
    
                                let userImage = ''
                                let userJson = JSON.parse(authorDetails[0].json_metadata)
    
                                if ('profile_image' in userJson.profile) {
                                    this.post.authorImage = userJson.profile.profile_image
                                } else {
                                    this.post.authorImage = "https://hlfppt.org/wp-content/uploads/2017/04/placeholder-768x576.png"
                                }
    
                                if ('about' in userJson.profile) {
                                    this.post.authorBio = userJson.profile.about
                                } else {
                                    this.post.authorBio = "This user has not added a bio"
                                }
    
                            })
                    },
                    getComments(author, permlink) {
                        let postComments = []
                        this.getPostComments(author, permlink)
                            .then(comments => {
                                comments.forEach(comment => {
                                    this.getAccount(comment.author)
                                        .then(commentAuthorDetails => {
                                            if ('json_metadata' in commentAuthorDetails[0]) {
                                                let commentJSON = commentAuthorDetails[0].json_metadata
                                                commentJSON = JSON.parse(commentJSON)
                                                let combinedAuthorComment = Object.assign(commentJSON, comment)
                                                postComments.push(combinedAuthorComment)
                                            }
                                        }).catch(err => {
                                            console.log(comment.author);
                                        })
                                })
                            })
                        this.post.comments = postComments
                    },
                    submitForm(formName) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.submitComment()
                            } else {
                                console.log('error submit!!')
                                return false
                            }
                        })
                    },
                    submitComment() {
    
                        // Parent author and parentPermLink not required for submitted a post to the blockchain
    
                        // Create JSON Metadata
    
                        let jsonMetaData = {
                            'app': 'contest-hero',
                            'contest-hero': {
                                'type': 'contest-comment'
                            }
                        }
    
                        // Send post via SteemConnect
    
                        this.$steemconnect.comment(
                            this.post.author,
                            this.post.permlink,
                            this.$store.state.steemconnect.user.name,
                            this.post.permlink + 'test1',
                            '',
                            this.ruleForm.commentbody,
                            jsonMetaData,
                            (err) => {
                                alert(err)
                            })
                    }
                },
                mounted() {
                    this.loadContent()
                    this.getAuthorDetails(this.post.author)
                    this.getComments(this.post.author, this.post.permlink)
                },
                computed: {
                    postLink: function() {
                        let postLink = `#/enter-contest/${this.post.author}/${this.post.permlink}`
                        return postLink
                    },
                    postJson: function() {
                        return JSON.parse(this.post.data.json_metadata)
                    },
                    contestDeadline: function() {
                        return this.postJson.contesthero.deadline
                    }
                }
            }
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .post-container {
        background: white;
        border-radius: 5px;
        padding: 20px 40px;
        box-shadow: 0 0 10px 2px #f1f1f1;
    }
    
    .post-container img {
        max-width: 100%;
        height: auto;
    }
    
    .enter-contest {
        margin-top: 20px;
        width: 100%;
        box-shadow: 0 0 10px 2px #f1f1f1;
    }
    
    .other-winners-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>
