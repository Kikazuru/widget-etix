<template>
  <v-card-text> Customer Information </v-card-text>

  <v-card-actions>
    <v-spacer> </v-spacer>
    <v-btn @click="back"> kembali </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  methods: {
    back() {
      this.$store.commit("backStep");
    },
  },
};
</script>

<style>
</style>