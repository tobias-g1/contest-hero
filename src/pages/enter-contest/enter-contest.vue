
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
            };
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
            this.setDetails();
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .el-form--label-top .el-form-item__label {
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 13px;
    }
    
    .el-tag {
        margin-right: 10px;
        background-color: #fb1a862e !important;
        color: #fb1a86 !important;
        border: 1px solid #fb1a86 !important;
    }
    
    .el-tag+.el-tag {
        margin-right: 10px;
    }
    
    .el-tag .el-icon-close {
        color: #fb1a86 !important;
    }
    
    .el-tag .el-icon-close:hover {
        background: #fb1a862e !important;
    }
    
    .el-button:focus,
    .el-button:hover {
        background-color: #fb1a862e !important;
        color: #fb1a86 !important;
        border: 1px solid #fb1a86 !important;
    }
    
    .tags-container {
        display: inline-flex;
    }
    
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    
    .input-new-tag {
        margin: -2px 0 0 0;
        padding: 0;
    }
</style>
