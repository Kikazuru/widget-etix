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
      </v-card-item>

      <v-window v-model="step">
        <v-window-item :value="1">
          <product-preview></product-preview>
        </v-window-item>

        <v-window-item :value="2">
          <customer-information></customer-information>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script>
import CustomerInformation from "./components/CustomerInformation.vue";
import ProductPreview from "./components/ProductPreview.vue";

export default {
  name: "App",
  components: { ProductPreview, CustomerInformation },
  data() {
    return {
      product: {},
      step: this.$store.state.step,
    };
  },

  computed: {
    currentStep() {
      return this.$store.state.step;
    },
  },

  watch: {
    currentStep(value) {
      this.step = value;
    },
  },

  async created() {
    console.log(this.$store.state.step);
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
