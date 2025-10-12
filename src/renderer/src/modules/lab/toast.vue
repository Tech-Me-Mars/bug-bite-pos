<template>
  
       <div>
        
       </div>
          <b-button variant="outline-success me-1 mb-1" @click="() => toast('error')"
            >Success</b-button
          >
         
</template>
  <script>

export default {
  data() {
    return {
      message: `<span><b>Miracle Max Says</b></span><span>Have fun storming the castle!</span>`,
      options: {
        duration: 3000
      },
      title: 'Toastr',
      text: 'Dashboard',
      text1: 'Toastr',
      name: '/index'
    }
  },
  methods: {
    toast(type = 'default', dismissible = true) {
      const options = {
        dismissible,
        onClick: this.onClick
      }
      typeof type === 'string' && (options.type = type)

      typeof this.options.maxToasts === 'string' &&
        (this.options.maxToasts = parseInt(this.options.maxToasts))

      this.$toast.show(this.message, {
        ...options,
        ...this.options
      })
    },
    changeDuration(e) {
      this.options.duration = !e.target.checked ? 3000 : false
    },
    onClick(e) {
      console.log(e)
    }
  },
 
}
</script>
  