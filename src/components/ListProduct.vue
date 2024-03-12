<template>
  <b-col class="m-3">
    <b-card header="Add List">
      <b-card-group deck>
        <b-card
          style="min-width: 30%; max-width: 30%"
          class="m-3"
          :border-variant="product.inventoryStatus ? 'success' : 'danger'"
          align="center"
          v-for="product in productList"
          :key="product.id"
        >
          <b-card-text> <strong>Name: </strong>{{ product.name }}</b-card-text>
          <b-card-text>
            <strong>Price: </strong>{{ product.price }}</b-card-text
          >
          <b-card-text>
            <strong>Brand: </strong>{{ product.brand }}</b-card-text
          >
          <b-badge :variant="product.inventoryStatus ? 'success' : 'danger'">{{
            product.inventoryStatus ? "In Stock" : "Out of Stock"
          }}</b-badge>
          <hr />
          <b-row>
            <b-col>
              <b-button variant="danger" @click="deleteProduct(product.id)"
                ><i class="fa-solid fa-trash"></i
              ></b-button>
            </b-col>
            <b-col>
              <UpdateProduct :product="product" />
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
      <h2 v-if="productList.length < 1">No Product Found</h2>
    </b-card>
  </b-col>
</template>

<script>
import UpdateProduct from "./UpdateProduct.vue";

export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    UpdateProduct,
  },
  methods: {
    deleteProduct(productId) {
      this.$store.dispatch("deleteProduct", productId);
    },
  },
  computed: {
    productList() {
      console.log("***********", this.$store.getters.productList);
      return this.$store.getters.productList;
      // console.log("***********", this.$store.state.productList);
      // return this.$store.state.productList
    },
  },
  mounted() {
    this.$store.dispatch("setProducts");
  },
};
</script>

<style></style>
