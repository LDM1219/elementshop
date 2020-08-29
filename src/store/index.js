import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import {
  instance
} from 'network/instance.js'

Vue.use(Vuex)

const state = {
  // 用户的信息
  queryInfo: {
    query: "",
    // 当前的页数
    pagenum: 1,
    // 当前每页显示多少条数据
    pagesize: 2
  },
  userlist: [],
  total: 0,
  roleslist: [],

  // 商品分类的信息
  cateQueryInfo: {
    type: 3,
    pagenum: 1,
    pagesize: 5
  },
  catelist: [],
  cateTotal: 0,

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})