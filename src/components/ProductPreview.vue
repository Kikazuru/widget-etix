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
              class="d-flex align-end justify-end"
              cols="12"
              xxl="3"
              xl="3"
              lg="3"
              md="3"
              sm="3"
            >
              <!-- handling unlimited qty -->
              <v-chip color="blue" class="text-caption" label>
                Sisa Tiket:&nbsp;
                <span v-if="type.is_limited">{{
                  type.producttype_qty - type.producttype_booked_qty
                }}</span>
                <v-icon v-else>mdi-infinity</v-icon>
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
          <!-- handling stok habis, stok kurang dari max order, tambah stok tidak boleh lebih dari max order -->
          <v-row no-gutters align="center">
            <v-col cols="12" xxl="8" xl="8" lg="8" md="8" sm="8">
              <div
                class="text-h6 text-orange-darken-3 font-weight-bold text-secondaryVariant text-left"
              >
                {{ numberToRupiah(type.producttype_price) }}
              </div>
            </v-col>
            <v-col
              class="d-flex justify-end"
              cols="12"
              xxl="4"
              xl="4"
              lg="4"
              md="4"
              sm="4"
            >
              <v-btn
                v-if="!findProductInCart(type.producttype_id)"
                variant="flat"
                @click="addToCart(type)"
                color="blue"
                class="text-none text-caption"
              >
                Pilih Tiket
              </v-btn>

              <div class="d-flex" v-else>
                <v-btn
                  @click="removeFromCart(type)"
                  size="large"
                  icon="mdi-trash-can"
                >
                </v-btn>
                <v-btn @click="reduceFromCart(type)" icon="mdi-minus"></v-btn>
                <span>{{ findProductInCart(type.producttype_id)?.qty }}</span>
                <v-btn @click="addToCart(type)" icon="mdi-plus"></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-card-item>

  <v-card-text class="d-flex justify-space-between align-center">
    <div>Subtotal ({{ totalCartQty }} tiket)</div>

    <div>
      <v-btn
        variant="flat"
        class="text-none text-caption"
        color="green"
        @click="next"
      >
        Daftar Sekarang
      </v-btn>
    </div>
  </v-card-text>
</template>

<script>
import { utcToLocale } from "@/utils/dateFormatter";
import { numberToRupiah } from "@/utils/numberFormatter";

export default {
  props: {
    product: {
      type: Object,
      require: true,
    },
  },
  computed: {
    totalCartQty() {
      return this.$store.getters.totalCartQty;
    },
  },

  methods: {
    numberToRupiah(number) {
      return numberToRupiah(number);
    },
    findProductInCart(productTypeID) {
      return this.$store.getters.findProductInCart(productTypeID);
    },
    removeFromCart(productType) {
      this.$store.commit("removeProductFromCart", {
        productType: productType,
      });
    },
    reduceFromCart(productType) {
      this.$store.commit("reduceProductFromCart", {
        productType: productType,
      });
    },
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