<template>
  <div v-if="cartItems.length > 0">
    <div class="product-container" v-for="product in cartItems" :key="product.id">
      <img class="product-image" :src="product.imageName" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>

      <button class="remove-button">Remove from cart</button>
    </div>

    <button class="checkout-button">Check Out</button>
  </div>
</template>

<script>
export default {
  name: "CartList",
  props: ['cartItems']
}
</script>