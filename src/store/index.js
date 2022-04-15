import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserName:"",
    Users:[],
    isValidUsers:false,
    messages: [],
    Connection:null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
