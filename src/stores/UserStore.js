import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: null, // Текущий пользователь (имя)
    role: 'user', // Роль текущего пользователя (user, moderator, admin)
    allUsers: [ // Массив всех пользователей
      { username: 'admin', role: 'admin' },
      { username: 'moderator', role: 'moderator' },
      { username: 'user1', role: 'user' },
    ],
  }),
  actions: {
    /**
     * Вход пользователя
     * @param {string} username - Логин пользователя
     * @param {string} password - Пароль пользователя
     */
    login(username, password) {
      // Список пользователей с паролями
      const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'moderator', password: 'mod123', role: 'moderator' },
        { username: 'user1', password: 'user123', role: 'user' },
      ];

      // Поиск пользователя по логину и паролю
      const user = users.find(
        (u) => u.username.trim() === username.trim() && u.password === password
      );

      if (user) {
        this.user = user.username; // Устанавливаем имя пользователя
        this.role = user.role; // Устанавливаем роль
      } else {
        throw new Error('Неправильный логин или пароль'); // Ошибка, если пользователь не найден
      }
    },

    /**
     * Выход пользователя
     */
    logout() {
      this.user = null;
      this.role = 'user';
    },

    /**
     * Добавление нового пользователя
     * @param {Object} newUser - Данные нового пользователя { username, role }
     */
    addUser(newUser) {
      if (newUser.username && newUser.role) {
        const exists = this.allUsers.some(
          (u) => u.username.trim() === newUser.username.trim()
        );
        if (!exists) {
          this.allUsers.push({ username: newUser.username.trim(), role: newUser.role });
        } else {
          throw new Error('Пользователь с таким именем уже существует');
        }
      } else {
        throw new Error('Имя пользователя и роль обязательны');
      }
    },

    /**
     * Удаление пользователя
     * @param {string} username - Имя пользователя для удаления
     */
    removeUser(username) {
      this.allUsers = this.allUsers.filter((user) => user.username !== username);
    },
  },
});
