<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageName" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import { products } from '../resources/temp-data';
import PageNotFound from './PageNotFound.vue';

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: products.find( product => product.id === this.$route.params.productId )
    }
  },
  components: {
    PageNotFound,
  }
}
</script>