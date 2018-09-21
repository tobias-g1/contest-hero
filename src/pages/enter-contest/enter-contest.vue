
<template>
    <el-row :gutter="20">
        <h1> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Enter contest </h1>
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
                    <el-tag>Contest-Hero</el-tag>
                    <el-tag>Contest-Hero-Writing</el-tag>
                    <el-tag :key="tag" v-for="tag in entry.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('entry')">Create Entry</el-button>
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
                        },
                        {
                            min: 1,
                            max: 100,
                            message: 'Length should be 3 to 5',
                            trigger: 'blur'
                        }
                    ],
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
    
    .el-tag+.el-tag {
        margin-left: 10px;
    }
    
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
