
<template>
    <el-row :gutter="20">
        <h1> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Create a contest </h1>
        <el-form :model="ruleForm" :label-position="labelPosition" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-col :span="20">
                <el-form-item label="Contest Title" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="Contest Type" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="Select Type">
                        <el-option label="Writing" value="Writing"></el-option>
                        <el-option label="Design" value="Design"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Contest Body" prop="body">
                    <markdownEditor v-model="ruleForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Tags">
                    <el-tag>Contest-Hero</el-tag>
                    <el-tag>Contest-Hero-Writing</el-tag>
                    <el-tag :key="tag" v-for="tag in ruleForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Deadline" required>
                    <el-form-item prop="deadline">
                        <el-date-picker type="date" placeholder="Select Deadline" v-model="ruleForm.deadline" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
                ruleForm: {
                    title: '',
                    type: '',
                    deadline: '',
                    resource: '',
                    body: '',
                    dynamicTags: []
                },
                rules: {
                    title: [{
                            required: true,
                            message: 'Please enter a title',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 100,
                            message: 'Length should be 3 to 5',
                            trigger: 'blur'
                        }
                    ],
                    type: [{
                        required: true,
                        message: 'Please select a contest category',
                        trigger: 'change'
                    }],
                    deadline: [{
                        type: 'date',
                        required: true,
                        message: 'Please select a deadline',
                        trigger: 'change'
                    }],
                    body: [{
                        required: true,
                        message: 'Please enter the body of your contest',
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
