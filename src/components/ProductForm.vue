<template>
  <div class="product-form">
    <h3>{{ localProduct.id ? 'Редактировать товар' : 'Добавить товар' }}</h3>
    <form @submit.prevent="submitForm">
      <label>Название:</label>
      <input v-model="localProduct.name" type="text" required />

      <label>Описание:</label>
      <textarea v-model="localProduct.description" required></textarea>

      <label>Тип:</label>
      <select v-model="localProduct.type" required>
        <option value="" disabled>Выберите тип</option>
        <option value="Обувь">Обувь</option>
        <option value="Одежда">Одежда</option>
        <option value="Бельё">Бельё</option>
        <option value="Другое">Другое</option>
      </select>

      <label>Цена:</label>
      <input v-model.number="localProduct.price" type="number" required />

      <label>Изображение:</label>
      <input type="file" @change="handleImageUpload" />

      <div class="actions">
        <button type="submit">Сохранить</button>
        <button type="button" @click="$emit('close')">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({ id: null, name: '', description: '', type: '', price: null, image: '' }),
    },
  },
  data() {
    return {
      localProduct: { ...this.product },
    };
  },
  methods: {
    submitForm() {
      this.$emit('save', this.localProduct);
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localProduct.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.product-form {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-form h3 {
  text-align: center;
  margin-bottom: 20px;
}

.product-form label {
  display: block;
  margin: 10px 0 5px;
}

.product-form input,
.product-form textarea,
.product-form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:first-child {
  background-color: #4caf50;
  color: white;
}

.actions button:last-child {
  background-color: #f44336;
  color: white;
}
</style>
