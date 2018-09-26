
<template>
    <el-row :gutter="20" >
        <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Create a contest </h1>
        <el-form :model="contestForm" :label-position="labelPosition" :rules="rules" ref="contestForm">
            <el-col :span="24">
                <el-form-item  label="Contest Title" prop="title">
                    <el-input v-model="contestForm.title" placeholder="Enter a title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Deadline" required>
                    <el-form-item prop="deadline">
                        <el-date-picker type="date" placeholder="Select Deadline" v-model="contestForm.deadline" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Contest Type" prop="type">
                    <el-select v-model="contestForm.type" placeholder="Select Type">
                        <el-option label="Writing" default value="contest-hero-writing"></el-option>
                        <el-option label="Design" value="contest-hero-design"></el-option>
                        <el-option label="Photo" value="contest-hero-photo"></el-option>
                        <el-option label="Giveaway" value="contest-hero-giveaway"></el-option>
                        <el-option label="Other" value="contest-hero-other"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Contest Body" prop="body">
                    <markdownEditor v-model="contestForm.body" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Tags">
                    <div class="tags-container">
                        <el-tag :key="tags" v-for="tags in fixedTags" v-show="tags">  {{ tags }} </el-tag>
                            <el-tag :key="tag" v-for="tag in contestForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag, contestForm)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(contestForm)" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="(finalTags.length < 5)">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item>
                    <button @click="submitForm('contestForm')" :disabled="!contestForm.title || !contestForm.type || !contestForm.deadline || !contestForm.body" class="btn-fill">Create Contest</button>
                    <el-button @click="resetForm('contestForm')">Reset</el-button>
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
                contestForm: {
                    title: '',
                    type: '',
                    deadline: '',
                    body: '',
                    dynamicTags: []
                },
                rules: {
                    title: [{
                        required: true,
                        message: 'Please enter a title',
                        trigger: 'blur'
                    }],
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
                        },
                        {
                            min: 150,
                            message: 'Your contest body should be at least 150 characters',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        components: {
            markdownEditor
        },
        mixins: [form, tags],
        computed: {
            fixedTags: function() {
                let fixedTags = ['contest-hero']
                fixedTags.push(this.contestForm.type)
                return fixedTags
            },
            finalTags: function() {
                return this.fixedTags.concat(this.contestForm.dynamicTags)
            }
        },
        methods: {
    
        }
    }
</script>

<style src="@/pages/create-contest/create-contest.css">
    
</style>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>