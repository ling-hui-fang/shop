//比如用户的登录状态，用户名称，头像，地理位置信息
//购物车中的物品，商品的收藏

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import moduleA from './modules/moduleA'

Vue.use(Vuex)

const state = {
    counter: 1000,
    students: [
        { name: 'key', age: 14 },
        { name: 'lhf', age: 20 },
        { name: "lxy", age: 25 },
        { name: 'yjx', age: 55 }
    ],
    info: {
        name: "coderwhy",
        age: 17,
        height: 1.888
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        a:moduleA
    }
})
export default store