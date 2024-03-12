<template>
  <b-col md="6" class="m-4">
    <b-card header="Add Product">
      <b-card-body>
        <b-form>
          <b-form-group label="Enter your name">
            <b-form-input
              v-validate="{ required: true, min: 9 }"
              v-model="form.name"
              id="name"
              name="name"
              trim
            ></b-form-input>
            <div v-if="submitted" class="err-msg">
              {{ errors.first("name") }}
            </div>
          </b-form-group>
          <b-form-group label="Price $">
            <b-form-input
              v-validate="{ required: true, numeric: true }"
              v-model="form.price"
              id="price"
              name="price"
              trim
            ></b-form-input>
            <div v-if="submitted" class="err-msg">
              {{ errors.first("price") }}
            </div>
          </b-form-group>
          <b-form-group label="Brand name">
            <b-form-input
              v-validate="{ required: true }"
              v-model="form.brand"
              id="brand"
              name="brand"
              trim
            ></b-form-input>
            <div v-if="submitted" class="err-msg">
              {{ errors.first("brand") }}
            </div>
          </b-form-group>
          <b-form-group label="Inventory??">
            <div v-if="submitted" class="err-msg">
              {{ errors.first("inventoryStatus") }}
            </div>
            <b-form-radio
              v-validate="{ required: true }"
              v-model="form.inventoryStatus"
              name="inventoryStatus"
              :value="true"
              >In Stock</b-form-radio
            >
            <b-form-radio
              v-model="form.inventoryStatus"
              name="inventoryStatus"
              :value="false"
              >Out of Stock</b-form-radio
            >
          </b-form-group>
        </b-form>
      </b-card-body>
      <b-button block variant="primary" @click="addProduct">
        Add Product
        <b-spinner small variant="light" v-if="showSpinner"></b-spinner>
      </b-button>
    </b-card>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        price: "",
        brand: "",
        inventoryStatus: "",
      },
      submitted: false,
      showSpinner: false,
    };
  },
  methods: {
    async addProduct() {
      try {
        this.submitted = true;
        let result = await this.$validator.validate();
        if (result) {
          this.showSpinner = true;
          await new Promise((spinner) => setTimeout(spinner, 1000));
          await this.$store.dispatch("addProduct", {
            name: this.form.name,
            price: "$" + this.form.price,
            brand: this.form.brand,
            inventoryStatus: this.form.inventoryStatus === true,
          });
          this.showSpinner = false;
          this.$bvToast.toast("Product Added Successfully", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
            autoHideDelay: 1500,
            toster: "b-toaster-top-right",
          });
          this.form = {
            name: "",
            price: "",
            brand: "",
            inventoryStatus: "",
          };
          this.submitted = false;
          console.log(result);
          console.log(this.form);
        }
      } catch (error) {
        console.log(error);
        this.showSpinner = false;
        this.$bvToast.toast("error.message", {
          title: "ERROR",
          variant: "danger",
          solid: true,
          autoHideDelay: 1500,
          toster: "b-toaster-top-right",
        });
      }
    },
  },
};
</script>

<style>
.err-msg {
  color: red;
}
</style>
