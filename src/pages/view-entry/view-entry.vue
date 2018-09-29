<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- Post Container -->
            <h1 class="header"><img class="small-circle" src="@/assets/gradient-circle.png" alt="">{{ post.data.title }}</h1>
            <div class="post-container">
                <post :postbody="post.data.body"></post>
                <div class="tags">
                    <el-tag v-for="(tag, index) in tags" :key="index" :comment="comments">{{ tag}}</el-tag>
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
    
        </el-col>
    </el-row>
</template>

<script>
    import dsteem from '@/mixins/dsteem.js'
    import post from '@/components/post/post.vue'
    import form from '@/mixins/form-actions.js'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    
    export default {
        name: 'view-entry',
        mixins: [dsteem, form],
        components: {
            markdownEditor,
            post
    
        },
        data() {
            return {
                post: {
                    author: null,
                    data: null,
                    permlink: null,
                    comments: []
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
                    })
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
                        'type': 'entry_comment'
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
