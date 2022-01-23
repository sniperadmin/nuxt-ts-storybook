<template>
  <v-btn :color="color">
    meow
  </v-btn>
</template>

<script>
  export default {
    name: 'TestBtn',
    props: {
      color: {
        type:String,
        default: 'primary'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
