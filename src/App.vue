<template>
  <div
    :style="{ height: '70vh' }"
    class="d-flex justify-center align-center w-100 bg-transparent"
  >
    <v-card max-width="650">
      <v-card-item>
        <v-card-title>
          {{ product.product_name }}
        </v-card-title>

        <v-card-subtitle>
          {{ product?.store?.store_name }}
        </v-card-subtitle>
      </v-card-item>

      <v-divider></v-divider>

      <v-window v-model="step">
        <v-window-item :value="1">
          <product-preview :product="product"></product-preview>
        </v-window-item>

        <v-window-item :value="2">
          <customer-information></customer-information>
        </v-window-item>
      </v-window>

      <v-card-item>
        <div class="d-flex flex-row justify-space-between">
          <div class="text-caption text-grey d-flex align-center">
            <div>Bahasa</div>
          </div>
          <div class="d-flex flex-row align-center">
            <div class="text-caption text-grey">Powered by</div>
            <div>
              <v-img height="26" width="45" :src="require('@/assets/logo.svg')">
              </v-img>
            </div>
          </div>
        </div>
      </v-card-item>
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
