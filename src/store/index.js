import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        datasetFlag: false,
        targetFlag: false,
    },
    getters: {
        getSetFlag: (state) => {
            return state.datasetFlag
        },
        getTargetFlag: (state) => {
            return state.targetFlag
        }
    },
    mutations: {
        setSetFlag: (state, flag) => {
            state.datasetFlag = flag
        },
        setTargetFlag: (state, flag) => {
            state.targetFlag = flag
        }
    },
    actions: {},
    modules: {}
})