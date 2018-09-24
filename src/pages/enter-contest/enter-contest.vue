
<template>
    <el-row :gutter="20">
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Enter contest </h1>
        <el-form :model="entry" :label-position="labelPosition" :rules="rules" ref="entry" class="demo-entry">
            <el-col :span="24">
                <el-form-item label="Entry Title" prop="title">
                    <el-input v-model="entry.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Entry Body" prop="body">
                    <markdownEditor v-model="entry.body" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag>Contest-Hero</el-tag>
                        <el-tag>Contest-Hero-Writing</el-tag>
                        <el-tag :key="tag" v-for="tag in entry.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button @click="submitForm('entry')" class="btn-fill">Enter Contest</button>
                    <el-button @click="resetForm('entry')">Reset</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>

<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import form from '@/mixins/form-actions.js'
    import tags from '@/mixins/tags.js'
    
    export default {
        data() {
            return {
                labelPosition: 'top',
                inputVisible: false,
                inputValue: '',
                author: '',
                permlink: '',
                entry: {
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
        methods: {
            setDetails() {
                this.author = this.$route.params.author
                this.permlink = this.$route.params.permlink
            }
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