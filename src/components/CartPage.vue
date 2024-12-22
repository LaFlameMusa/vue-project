<template>
    <div class="cart-page">
      <h2>Корзина</h2>
  
      <div v-if="cartItems.length" class="cart-list">
        <div v-for="product in cartItems" :key="product.id" class="cart-item">
          <img v-if="product.image" :src="product.image" alt="Изображение товара" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ product.name }}</h3>
            <p>Тип: {{ product.type }}</p>
            <p>Цена: {{ product.price }} ₽</p>
          </div>
          <button @click="removeFromCart(product.id)" class="remove-button">Удалить</button>
        </div>
      </div>
  
      <p v-else>Ваша корзина пуста.</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useProductStore } from '../stores/ProductStore';
  
  export default {
    name: 'CartPage',
    setup() {
      const productStore = useProductStore();
  
      const cartItems = computed(() => productStore.cart);
  
      const removeFromCart = (id) => {
        productStore.removeFromCart(id);
      };
  
      return {
        cartItems,
        removeFromCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .cart-page h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cart-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
  }
  
  .cart-item-details {
    flex-grow: 1;
  }
  
  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .remove-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-button:hover {
    background-color: #cc0000;
  }
  </style>
  