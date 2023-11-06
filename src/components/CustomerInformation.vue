<template>
  <v-card-text> Customer Information </v-card-text>

  {{ cart }}

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
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
};
</script>

<style>
</style>