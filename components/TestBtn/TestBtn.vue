<template>
  <v-btn data-test="btn" :color="color" @click="$emit('click', $event)">
    <slot>
      {{ color }}
    </slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

  export default Vue.extend({
    name: 'TestBtn',
    props: {
      color: {
        type:String,
        default: 'primary'
      }
    },
    data: () => ({})
  })
</script>

<style lang="scss" scoped>

</style>
