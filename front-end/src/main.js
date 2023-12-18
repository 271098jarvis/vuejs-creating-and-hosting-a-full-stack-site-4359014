import { createApp } from 'vue'
import App from './App.vue'
import './resources/main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import PageNotFound from './pages/PageNotFound.vue'

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/cart',
    component: ShoppingCartPage
  },{
    path: '/products',
    component: ProductsPage
  },{
    path: '/product/:productId',
    component: ProductDetailPage
  },{
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  }]
}))
.mount('#app')
