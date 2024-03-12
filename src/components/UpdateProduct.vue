<template>
  <div>
    <b-button variant="success" @click="modalShow = !modalShow"
      ><i class="fa-regular fa-pen-to-square"></i
    ></b-button>
    <b-modal
      v-model="modalShow"
      title="Update Product"
      @show="ShowModal"
      @hidden="resetModal"
      @ok="handleSubmit"
    >
      <b-form>
        <b-form-group label="Enter your name">
          <div v-if="submitted" class="err-msg">
            {{ errors.first("name") }}
          </div>
          <b-form-input
            v-validate="{ required: true, min: 9 }"
            v-model="form.name"
            id="name"
            name="name"
            trim
          ></b-form-input>
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
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "updateProduct",
  props: ["product"],
  data() {
    return {
      modalShow: false,
      form: {
        name: "",
        price: "",
        brand: "",
        inventoryStatus: "",
      },
      submitted: false,
    };
  },
  methods: {
    ShowModal() {
      console.log("Opened");
      this.form = {
        name: this.$props.product.name,
        price: this.$props.product.price.split("$")[1],
        brand: this.$props.product.brand,
        inventoryStatus: this.$props.product.inventoryStatus.toString(),
      };
    },
    resetModal() {
      console.log("Closed");
      this.form = {};
    },
    async handleSubmit(bvModalEvt) {
      bvModalEvt.preventDefault();
      console.log("Submitted");
      this.submitted = true;
      let result = await this.$validator.validate();
      console.log("result", result);
      if (result) {
        this.$store.dispatch("updateProduct", {
          name: this.form.name,
          price: "$" + this.form.price,
          brand: this.form.brand,
          inventoryStatus: this.form.inventoryStatus === true,
          id: this.$props.product.id,
        });
        this.modalShow = false;
        this.submitted = false;
      }
      // this.modalShow = false;
    },
  },
};
</script>

<style>
.err-msg {
  color: red;
}
</style>
