<template>
    <div class="user-management">
      <h2>Управление пользователями</h2>
  
      <div class="add-user-form">
        <input v-model="newUser.username" placeholder="Имя пользователя" />
        <input v-model="newUser.role" placeholder="Роль (user/moderator)" />
        <button @click="addUser">Добавить пользователя</button>
      </div>
  
      <div class="user-list">
        <h3>Список пользователей</h3>
        <ul>
          <li v-for="user in users" :key="user.username">
            {{ user.username }} - {{ user.role }}
            <button @click="removeUser(user.username)">Удалить</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useUserStore } from '../stores/UserStore';
  
  export default {
    name: 'UserManagement',
    setup() {
      const userStore = useUserStore();
      const newUser = ref({ username: '', role: '' });
  
      const users = computed(() => userStore.allUsers);
  
      const addUser = () => {
        if (newUser.value.username && newUser.value.role) {
          userStore.addUser(newUser.value);
          newUser.value = { username: '', role: '' };
        }
      };
  
      const removeUser = (username) => {
        userStore.removeUser(username);
      };
  
      return {
        users,
        newUser,
        addUser,
        removeUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Добавьте стили для управления пользователями */
  </style>
  