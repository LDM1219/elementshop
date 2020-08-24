import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  queryInfo: {
    query: "",
    // 当前的页数
    pagenum: 1,
    // 当前每页显示多少条数据
    pagesize: 2
  },
  userlist: [],
  total: 0,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})