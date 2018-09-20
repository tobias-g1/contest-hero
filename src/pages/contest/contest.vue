<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <h1><img class="small-circle" src="@/assets/gradient-circle.png" alt=""> {{ title }} </h1>
            <div class="post-container">
                <vue-simple-markdown :source="body"></vue-simple-markdown>
            </div>
            <button class="btn-fill enter-contest">Enter Contest</button>
            <h1>Comments</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="commentbody">
                    <markdownEditor v-model="ruleForm.commentbody" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
            <comment v-for="(comments, index) in comments" :key="index" :body="comments.body" />
    
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
    
            <h3>About the Author</h3>
            <div class="author-container">
                <img v-bind:src="authorImage">
                <span>{{authorBio}}</span>
            </div>
            <h3>Entries</h3>
            <entry v-for="(comments, index) in comments" :key="index" :author="comments.author" />
    
    
        </el-col>
    </el-row>
</template>

<script>
    // @ is an alias to /src
    
    import entry from '@/components/contests/entered-contest.vue'
    import comment from '@/components/contests/comment.vue'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    
    import {
        Client
    } from 'dsteem'
    
    const client = new Client('https://api.steemit.com')
    
    export default {
        name: 'contest',
        components: {
            entry,
            comment,
            markdownEditor
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
                rules: {
                    commentbody: [{
                        required: true,
                        message: 'Please enter a comment',
                        trigger: 'blur'
                    }]
                }
            };
        },
        mounted() {
            this.getContest();
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
                client.database.call('get_content_replies', [author, permlink]).then(comments => {
                    this.comments = comments
                })
            },
             submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.loadContent();
            this.getAuthorDetails(this.author)
            this.getComments(this.author, this.permlink);
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .post-container {
        background: white;
        border-radius: 5px;
        padding: 15px;
    }
    
    .post-container img {
        max-width: 100%;
        height: auto;
    }
    
    .author-container {
        display: inline-flex;
    }
    
    .author-container span {
        font-size: 14px;
        margin: 0 0 0 0.5rem;
    }
    
    .author-container img {
        max-height: 50px;
        max-width: 50px;
        border: 2px solid white;
        border-radius: 50px;
        box-shadow: 0 0 4px #ccc9c9;
    }
    
    .enter-contest {
        margin-top: 10px;
        width: 100%;
    }
</style>
