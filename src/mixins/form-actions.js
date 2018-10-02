var formActions = {
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

export default formActions
