import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    userData: null,
    // messages...
    messages: [],
  },
  getters: {
    getUserData: (state) => state.userData,
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },

    setMessages(state, messages){
      state.messages = messages;
    },
    markAsRead(state, messageIds){
      state.messages.forEach(message => {
          if (messageIds.includes(message._id)) {
              message.isRead = true;
          }
      });
    }
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

    async fetchMessages({ commit }, roomId){
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/room/${roomId}/messages`);
      commit('setMessages', response.data);
    },

    async markMessagesAsRead({ commit }, messageIds){
      await axios.put(`${process.env.VUE_APP_API_URL}/messages/read`, { messageIds });
      commit('markAsRead', messageIds);
    }
  },
  modules: {},
});
