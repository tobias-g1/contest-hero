var formActions = {

  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].dynamicTags = 0
    }
  }

}

export default formActions
