import { mapGetters } from 'vuex'

var contest = {

  data () {
    return {
      labelPosition: 'top',
      rules: {
        title: [{
          required: true,
          message: 'Please enter a title',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: 'Please select a contest category',
          trigger: 'change'
        }],
        entry_method: [{
          required: true,
          message: 'Please select an entry method',
          trigger: 'change'
        }],
        deadline: [{
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
        ],
        prizeType: [{
          required: true,
          message: 'Please select a prize type',
          trigger: 'blur'
        }],
        prizeValue: [{
          message: 'Please select a prize value',
          trigger: 'blur',
          required: true
        }]
      },
      editorConfig: {
        spellChecker: true,
        placeholder: 'Remember to add a description of your contest, any prizes you plan to offer and any additional information a reader should know about entering your contest. A user will automatically be able to enter your contest through the "Enter Contest" button shown on your contest page.'
      }
    }
  },

  computed: {
    postImages: function () {
      let images = this.contestForm.body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|svg)/g)
      if (images !== null) {
        return images
      } else {
        return []
      }
    },
    fixedTags: function () {
      return ['contest-hero']
    },
    finalTags: function () {
      return this.fixedTags.concat(this.contestForm.dynamicTags)
    },
    prizeType: function () {
      return this.contestForm.prizeType
    },
    ...mapGetters('steemconnect', ['user'])
  },
  watch: {
    prizeType () {
      if (this.contestForm.prizeType === 'None') {
        this.contestForm.prizeValue = ''
      }
    }
  },
}

export default contest
