<template>
  <v-card-text> Kategori Tiket </v-card-text>

  <v-card-item>
    <template v-for="type in product.product_types" :key="type">
      <v-card class="mb-2" variant="outlined" border="1">
        <v-card-item>
          <v-card-title class="text-body-1 font-weight-bold">
            {{ type.producttype_name }}
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" xxl="9" xl="9" lg="9" md="9" sm="9">
              <div class="d-flex">
                <div class="me-2 d-flex align-center">
                  <v-icon class="me-1" size="medium"
                    >mdi-calendar-multiselect</v-icon
                  >
                  <div>
                    {{ convertDate(product.event_start) }} -
                    {{ convertDate(product.event_end) }}
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-icon class="me-1" size="medium"
                    >mdi-clock-time-three</v-icon
                  >
                  <div>
                    {{ convertHour(product.event_start) }} -
                    {{ convertHour(product.event_end) }}
                  </div>
                </div>
              </div>

              <div class="d-flex align-center">
                <v-icon class="me-1" size="medium">mdi-clock-time-five</v-icon>
                <div class="text-blue">
                  Penjualan tiket berakhir pada
                  {{
                    formatDate(
                      product.product_pull_out_date,
                      "DD MMMM YYYY, HH.mm"
                    )
                  }}
                </div>
              </div>
            </v-col>

            <v-col
              class="d-flex align-end"
              cols="12"
              xxl="3"
              xl="3"
              lg="3"
              md="3"
              sm="3"
            >
              <v-chip color="blue" class="text-caption" label>
                Sisa Tiket: 10000
              </v-chip>
            </v-col>
          </v-row>

          <v-divider
            class="my-2 border-dashed"
            color="black"
            thickness="3"
          ></v-divider>
        </v-card-text>

        <v-card-text class="pt-0">
          <v-row no-gutters align="center">
            <v-col cols="12" xxl="10" xl="10" lg="10" md="10" sm="10">
              <div
                class="text-h6 text-orange-darken-3 font-weight-bold text-secondaryVariant text-left"
              >
                Rp {{ type.producttype_price }}
              </div>
            </v-col>
            <v-col cols="12" xxl="2" xl="2" lg="2" md="2" sm="2">
              <v-btn
                variant="flat"
                @click="addToCart(type)"
                color="blue"
                class="text-none text-caption"
              >
                Pilih Tiket
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-card-item>

  <v-card-actions>
    <v-spacer> </v-spacer>
    <v-btn @click="next"> Lanjut </v-btn>
  </v-card-actions>
</template>

<script>
import { utcToLocale } from "@/utils/formatter";
export default {
  props: {
    product: {
      type: Object,
      require: true,
    },
  },
  methods: {
    addToCart(productType) {
      this.$store.commit("addProductToCart", {
        productType: productType,
        qty: 1,
      });
    },
    next() {
      this.$store.commit("nextStep");
    },

    formatDate(isoDate, format) {
      return utcToLocale(isoDate, format);
    },

    convertDate(isoDate) {
      return utcToLocale(isoDate, "DD MMM YYYY");
    },

    convertHour(isoDate) {
      return utcToLocale(isoDate, "HH:mm");
    },
  },
};
</script>

<style>
</style>