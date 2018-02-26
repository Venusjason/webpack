import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store ({
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : []
})
