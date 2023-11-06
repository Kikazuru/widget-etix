<template>
  <div
    :style="{ height: '70vh' }"
    class="d-flex justify-center align-center w-100 bg-transparent"
  >
    <v-card max-width="600">
      <v-card-item>
        <v-card-title>
          {{ product.product_name }}
        </v-card-title>

        <v-card-subtitle>
          {{ product?.store?.store_name }}
        </v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      product: {},
    };
  },
  async created() {
    const app = document.getElementById("app");
    const productID = app.getAttribute("product-id");

    this.productID = productID;

    const getToken = await this.axios.post(
      "http://108.137.16.47/dev/auth/guest"
    );
    const guestToken = getToken.data.response.guest_token;

    this.axios
      .get(`http://108.137.16.47/dev/product/${productID}`, {
        headers: {
          Authorization: `Bearer ${guestToken}`,
        },
      })
      .then((response) => {
        this.product = response.data.response;
      });
  },
};
</script>

<style>
</style>
