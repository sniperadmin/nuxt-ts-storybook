<template>
  <v-btn data-test="btn" :color="color">
    <slot>
      {{ color }}
    </slot>
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
    },
    data: () => ({})
  }
</script>

<style lang="scss" scoped>

</style>
