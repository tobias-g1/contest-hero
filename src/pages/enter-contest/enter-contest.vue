
<template>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Enter contest </h1>
        <el-form :model="entryForm" :label-position="labelPosition" :rules="rules" ref="entryForm" class="demo-entry" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
            <el-col :span="24">
                <el-form-item label="Entry Title" prop="title">
                    <el-input v-model="entryForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Entry Body" prop="body">
                    <markdownEditor v-model="entryForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag>Contest-Hero</el-tag>
                        <el-tag :key="tag" v-for="tag in entryForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, entryForm)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(entryForm)" @blur="handleInputConfirm(entryForm)">
                        </el-input>
                        <el-button v-else class="button-new-tag" v-show="(finalTags.length < 5)" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button @click="submitForm('entryForm')" class="btn-fill">Enter Contest</button>
                    <el-button @click="resetForm('entryForm'), entryForm.dynamicTags = []">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>

<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import form from '@/mixins/form-actions.js'
    import tags from '@/mixins/tags.js'
    import {
        mapGetters
    } from 'vuex'
    
    export default {
        data() {
            return {
                labelPosition: 'top',
                inputVisible: false,
                inputValue: '',
                contestAuthor: '',
                contestPermlink: '',
                entryForm: {
                    title: '',
                    body: '',
                    dynamicTags: []
                },
                rules: {
                    title: [{
                        required: true,
                        message: 'Please enter your contest title',
                        trigger: 'blur'
                    }],
                    body: [{
                        required: true,
                        message: 'Please enter your entry body',
                        trigger: 'blur'
                    }]
                }
            }
        },
        components: {
            markdownEditor
        },
        mixins: [form, tags],
        computed: {
            entryPermlink: function() {
                return 'contest-hero-' + this.entryForm.title.toLowerCase().replace(/\s/g, '-') + '-' + Math.floor(Math.random() * 9000000000) + 1000000000
            },
            fixedTags: function() {
                return ['test434343']
            },
            finalTags: function() {
                return this.fixedTags.concat(this.entryForm.dynamicTags)
            },
            ...mapGetters('steemconnect', ['user']),
        },
        methods: {
            setDetails() {
                this.contestAuthor = this.$route.params.author
                this.contestPermlink = this.$route.params.permlink
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.createContest()
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            createContest() {
                this.createEntryPost()
                setTimeout(function() {
                    this.createEntryComment()
                }, 3000);
            },
            createEntryPost() {
    
                // Parent author and parentPermLink not required for submitted a post to the blockchain
    
                let parentAuthor = ''
                let parentPermlink = this.finalTags[0]
    
                // Create JSON Metadata
    
                let jsonMetaData = {
                    'tags': this.finalTags,
                    'app': 'contest_hero',
                    'contest_hero': {
                        'type': 'contest_entry',
                        'parent_contest_permlink': this.contestPermlink
                    }
                }
    
                // Send post via SteemConnect
    
                this.$steemconnect.comment(
                    parentAuthor,
                    parentPermlink,
                    this.$store.state.steemconnect.user.name,
                    this.entryPermlink,
                    this.entryForm.title,
                    this.entryForm.body,
                    jsonMetaData,
                    (err) => {
                        alert(err)
                    })
            }
        },
        createEntryComment() {
    
            // Create JSON Metadata
    
            let jsonMetaData = {
                'tags': this.finalTags,
                'app': 'contest_hero',
                'contest_hero': {
                    'type': 'contest_entry_comment'
                }
            }
    
            // Send post via SteemConnect
    
            this.$steemconnect.comment(
                this.contestAuthor,
                this.contestPermlink,
                this.$store.state.steemconnect.user.name,
                this.contestPermlink + '-' + Math.floor(Math.random() * 9000000000) + 1000000000,
                '',
                `I have just entered this contest, you can view my entry <a href="/#/${this.entryPermlink}">here</a>`,
                jsonMetaData,
                (err) => {
                    alert(err)
                })
    
        },
        mounted() {
            this.setDetails()
        }
    }
</script>

<style src="@/pages/enter-contest/enter-contest.css">
    
</style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>