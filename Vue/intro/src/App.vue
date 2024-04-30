<template>
  <div id="app">
    <ProductAdd @add:product="addProduct"></ProductAdd>

    <ProductList
      @delete:product="deleteProduct"
      @update:product="updateProduct"
      :products="products"
    ></ProductList>
  </div>
</template>

<script>
import ProductAdd from "./components/ProductAdd.vue";
import ProductList from "./components/ProductList.vue";
export default {
  name: "App",
  components: {
    ProductList,
    ProductAdd,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const result = await fetch("http://localhost:3000/products");
      const data = await result.json();
      this.products = data;
    },
    async deleteProduct(product) {
      await fetch("http://localhost:3000/products/" + product.id, {
        method: "DELETE",
      });
      this.getProducts();
    },
    async updateProduct(product) {
      const result = await fetch(
        "http://localhost:3000/products/" + product.id,
        {
          method: "PUT",
          body: JSON.stringify(product),
          headers: { "Content-Type": "application/json" },
        }
      );

      const updatedProduct = await result.json();
      this.products = this.products.map((p) =>
        p.id === product.id ? updatedProduct : p
      );
    },
    async addProduct(product) {
      const result = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });

      const newProduct = await result.json();
      this.products = [...this.products, newProduct];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
