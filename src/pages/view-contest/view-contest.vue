<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
    
            <!-- Post Container -->
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <post :postbody="post.data.body"></post>
            <a v-bind:href="postLink"><button class="btn-fill enter-contest">Enter Contest</button></a>
    
            <!-- Winners -->
            <div class="winners-container" v-show="contest.winners">
                <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Winners</h1>
                <winners v-for="(winner, index) in contest.winners" :key="index" :winners="winner" />
            </div>
    
            <!-- Other Winners -->
            <div class="other-winners-container" v-show="contest.otherwinners">
                <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Other Winners</h1>
                <div class="other-winners-list-container">
                    <otherwinners v-for="(otherwin, index) in contest.otherwin" :key="index" :otherWinners="otherwin" />
                </div>
            </div>
    
            <!-- Post Comments -->
            <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Comments</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="commentbody">
                    <markdownEditor v-model="ruleForm.commentbody" />
                </el-form-item>
                <el-form-item>
                    <button @click="submitForm('ruleForm')" class="btn-fill">Create Comment</button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
    
            <!-- Comments List -->
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
            <noentries v-if="!contest.entries" />
            <entry v-else v-for="(comments, index) in post.comments" :key="index" :comment="comments" />
        </el-col>
    </el-row>
</template>

<script>
    import entry from '@/components/entered-contest/entered-contest.vue'
    import comment from '@/components/contest-comment/contest-comment.vue'
    import aboutauthor from '@/components/about-author/about-author.vue'
    import post from '@/components/post/post.vue'
    import noentries from '@/components/no-entries/no-entries.vue'
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
            otherwinners,
            noentries
        },
        data() {
            return {
                post: {
                    author: null,
                    authorImage: null,
                    authorBio: null,
                    data: null,
                    permlink: null,
                    comments: []
                },
                contest: {
                    entries: [],
                    winners: null,
                    otherwin: null
                },
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
            }
        },
        methods: {
            loadContent() {
                this.post.author = this.$route.params.author
                this.post.permlink = this.$route.params.permlink
                this.loadPost(this.post.author, this.post.permlink)
                    .then(discussions => {
                        this.post.data = discussions[0]
                        // Redirect if the contest wasn't made on Contest Hero
                        if (this.postJson.app !== 'contest_hero') {
                            this.$router.push('/contests')
                        }
                    })
            },
            getAuthorDetails(author) {
                this.getAccount(author)
                    .then(authorDetails => {
                        let userJson = JSON.parse(authorDetails[0].json_metadata)
                        if (userJson !== undefined) {
                            ('profile_image' in userJson.profile) ? this.post.authorImage = userJson.profile.profile_image: this.post.authorImage = require('@/assets/post-placeholder.png'),
                                ('about' in userJson.profile) ? this.post.authorBio = userJson.profile.about : this.post.authorBio = "This user has not added a bio"
                        }
                    })
            },
            getComments(author, permlink) {
                this.getPostComments(author, permlink)
                    .then(postComments => {
                        postComments.forEach(comment => {
                            let postCommentJSON = JSON.parse(comment.json_metadata)
                            this.getAccount(comment.author)
                                .then(commentAuthorDetails => {
                                        commentAuthorDetails[0].json_metadata = JSON.parse(commentAuthorDetails[0].json_metadata)
                                        comment.authorDetails = commentAuthorDetails[0]
                                    },
                                    (postCommentJSON.contest_hero.type === 'contest_entry_comment') ? this.post.comments.push(comment) : this.contest.entries.push(comment)
                                )
                        })
                    })
            }
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
    
            this.$store.commit('setLoading', true)
    
            // Create JSON Metadata
    
            let jsonMetaData = {
                'app': 'contest-hero',
                'contest-hero': {
                    'type': 'contest_comment'
                }
            }
    
            // Send comment via SteemConnect
    
            this.$steemconnect.comment(
                this.post.author,
                this.post.permlink,
                this.$store.state.steemconnect.user.name,
                this.post.permlink + Math.floor(Math.random() * 9000000000) + 1000000000,
                '',
                this.ruleForm.commentbody,
                jsonMetaData).then(err => {
                this.$store.commit('setLoading', false)
                this.getComments(this.post.author, this.post.permlink)
                this.ruleForm.commentbody = ''
            })
        },
        mounted() {
            this.loadContent()
            this.getAuthorDetails(this.post.author)
            this.getComments(this.post.author, this.post.permlink)
        },
        computed: {
            postLink: function() {
                return `#/enter-contest/${this.post.author}/${this.post.permlink}`
            },
            postJson: function() {
                return JSON.parse(this.post.data.json_metadata)
            },
            contestDeadline: function() {
                return this.postJson.contest_hero.deadline
            }
        }
    }
</script>

<style src="@/pages/view-contest/view-contest.css">
    
</style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>
