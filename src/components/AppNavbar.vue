<template>
  <nav class="navbar">
    <router-link to="/">Главная</router-link>
    <router-link to="/cart">Корзина</router-link>
    <router-link v-if="isModeratorOrAdmin" to="/users">Управление пользователями</router-link>
    <router-link v-if="isAdmin" to="/analytics">Аналитика</router-link>
    <button @click="logout">Выйти</button>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '../stores/UserStore';

export default {
  name: 'AppNavbar',
  setup() {
    const userStore = useUserStore();

    const isAdmin = computed(() => userStore.role === 'admin');
    const isModeratorOrAdmin = computed(() => 
      ['admin', 'moderator'].includes(userStore.role)
    );

    const logout = () => {
      userStore.logout();
    };

    return {
      isAdmin,
      isModeratorOrAdmin,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.navbar button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #cc0000;
}
</style>
