<template>
  <h1>Shopping Cart</h1>
  <CartList :cartItems="cartItems" />
  <div v-if="cartItems.length === 0">
    No Items in your Cart
  </div>
</template>

<script>
import { cartItems } from '../resources/temp-data';
import CartList from '../components/CartList.vue'

export default {
  name: "ShoppingCartPage",
  data() {
    return{ cartItems }
  },
  components: {
    CartList,
  }
}
</script>