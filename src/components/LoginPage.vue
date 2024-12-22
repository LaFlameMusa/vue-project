<template>
  <div class="login-page">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <label>Логин:</label>
      <input v-model="username" type="text" required />

      <label>Пароль:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Войти</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginPage',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      errorMessage.value = ''; // Сбрасываем сообщение об ошибке
      try {
        await userStore.login(username.value, password.value);
        router.push('/'); // Перенаправляем на главную страницу после входа
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>

  
  <style scoped>
  .login-page {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .login-page h2 {
    text-align: center;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 10px;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #42a5f5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #1e88e5;
  }
  
  .error-message {
    color: red;
    font-size: 0.9em;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  