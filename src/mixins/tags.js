var tags = {

  methods: {

    handleClose (tag, form) {
      form.dynamicTags.splice(form.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm (form) {
      let inputValue = this.inputValue.replace(/\s/g, '')
      if (inputValue) {
        form.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}

export default tags
