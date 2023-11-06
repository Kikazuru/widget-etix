<template>
  <v-card-text> Product Preview </v-card-text>

  <v-card-actions>
    <v-spacer> </v-spacer>
    <v-btn @click="next"> Lanjut </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  methods: {
    next() {
      this.$store.commit("nextStep");
    },
  },
};
</script>

<style>
</style>