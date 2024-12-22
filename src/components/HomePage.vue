<template>
  <div class="home-page">
    <h2>Список товаров</h2>
    <div v-if="isAdminOrModerator">
      <button class="add-button" @click="openAddProduct">Добавить товар</button>
    </div>

    <div v-if="products.length" class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img v-if="product.image" :src="product.image" alt="Изображение товара" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>Тип: {{ product.type }}</p>
        <p>Цена: {{ product.price }} ₽</p>
        <div v-if="isAdminOrModerator">
          <button @click="editProduct(product)">Редактировать</button>
          <button @click="deleteProduct(product.id)">Удалить</button>
        </div>
        <div v-else>
          <button @click="addToCart(product)">Добавить в корзину</button>
        </div>
      </div>
    </div>

    <p v-else>Товаров пока нет.</p>

    <ProductForm v-if="showForm" :product="currentProduct" @save="saveProduct" @close="closeForm" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { useUserStore } from '../stores/UserStore';
import ProductForm from './ProductForm.vue';

export default {
  name: 'HomePage',
  components: { ProductForm },
  setup() {
    const productStore = useProductStore();
    const userStore = useUserStore();

    const products = computed(() => productStore.products);
    const isAdminOrModerator = computed(() =>
      ['admin', 'moderator'].includes(userStore.role)
    );

    const showForm = ref(false);
    const currentProduct = ref(null);

    const openAddProduct = () => {
      currentProduct.value = { id: null, name: '', description: '', type: '', price: null, image: '' };
      showForm.value = true;
    };

    const editProduct = (product) => {
      currentProduct.value = { ...product };
      showForm.value = true;
    };

    const saveProduct = (product) => {
      if (product.id) {
        productStore.updateProduct(product);
      } else {
        product.id = Date.now();
        productStore.addProduct(product);
      }
      showForm.value = false;
    };

    const deleteProduct = (id) => {
      productStore.deleteProduct(id);
    };

    const addToCart = (product) => {
      productStore.addToCart(product);
    };

    const closeForm = () => {
      showForm.value = false;
    };

    return {
      products,
      isAdminOrModerator,
      showForm,
      currentProduct,
      openAddProduct,
      editProduct,
      saveProduct,
      deleteProduct,
      closeForm,
      addToCart,
    };
  },
};
</script>


<style scoped>
.home-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home-page h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 100%;
  max-width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 4px;
}

.admin-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.edit-button {
  background-color: #ffa500;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #cc8400;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #cc0000;
}
</style>
