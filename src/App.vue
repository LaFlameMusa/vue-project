<template>
  <div id="app">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li v-if="isModeratorOrAdmin"><router-link to="/users">Управление пользователями</router-link></li>
        <li v-if="isAdmin"><router-link to="/analytics">Аналитика</router-link></li>
        <li><router-link to="/cart">Корзина</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Войти</router-link></li>
        <li v-if="isAuthenticated" @click="logout">Выйти</li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/UserStore';

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const isAdmin = computed(() => userStore.role === 'admin');
    const isModeratorOrAdmin = computed(() => 
      ['admin', 'moderator'].includes(userStore.role)
    );
    const isAuthenticated = computed(() => userStore.user !== null);

    const logout = () => {
      userStore.logout();
      router.push({ name: 'Login' });
    };

    return {
      isAdmin,
      isModeratorOrAdmin,
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar ul li a:hover {
  text-decoration: underline;
}
</style>
