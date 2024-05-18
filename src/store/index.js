import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    userData: null,

    unreadMessagesCount: 0,

  },
  getters: {
    getUserData: (state) => state.userData,

    unreadMessagesCount: (state) => state.unreadMessagesCount,
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },

    SET_UNREAD_MESSAGES_COUNT(state, count) {
      state.unreadMessagesCount = count;
    },
    INCREMENT_UNREAD_MESSAGES_COUNT(state) {
      state.unreadMessagesCount++;
    },
    DECREMENT_UNREAD_MESSAGES_COUNT(state) {
      state.unreadMessagesCount--;
    },

  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        // Assuming you have a variable 'token' available
        const token = localStorage.getItem('life-gaurd');

        // Correct axios syntax
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/user`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        // No need to use response.json() with Axios
        const data = response.data;
        this.state.userData = data;
        console.log("from store: ", data)

        commit('setUserData', data);
      } catch (error) {
        console.log('error from store/index.js:', error);
      }
    },

    setUnreadMessagesCount({ commit }, count) {
      commit('SET_UNREAD_MESSAGES_COUNT', count);
    },
    incrementUnreadMessagesCount({ commit }) {
      commit('INCREMENT_UNREAD_MESSAGES_COUNT');
    },
    decrementUnreadMessagesCount({ commit }) {
      commit('DECREMENT_UNREAD_MESSAGES_COUNT');
    },

  },
  modules: {},
});
