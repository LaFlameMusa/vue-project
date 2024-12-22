import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [], // Список всех продуктов
    cart: [], // Корзина для добавленных продуктов
  }),
  actions: {
    // Добавление нового продукта
    addProduct(product) {
      this.products.push(product);
    },
    // Обновление существующего продукта
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) this.products[index] = updatedProduct;
    },
    // Удаление продукта
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
    // Добавление продукта в корзину
    addToCart(product) {
      if (!this.cart.some((p) => p.id === product.id)) {
        this.cart.push(product);
      }
    },
    // Удаление продукта из корзины
    removeFromCart(id) {
      this.cart = this.cart.filter((p) => p.id !== id);
    },
  },
});
