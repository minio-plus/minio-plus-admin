/**
 * @author ike jpx1024@gmail.com （不想保留author可删除）
 * @description 
 */
const state = {
    display: false,
    bucketName: '',
    prefix: ''
}
const getters = {
    bucketName: (state) => state.bucketName,
    prefix: (state) => state.prefix,
    display: (state) => state.display
}
const mutations = {
    setBucketName(state, bucketName) {
        state.bucketName = bucketName
    },
    setPrefix(state, prefix) {
        state.prefix = prefix
    },
    setDisplay(state, display) {
        state.display = display
    }
}
const actions = {
    async load({ commit }, bucketName, prefix) {
        commit('setBucketName', bucketName);
        commit('setPrefix', prefix);
    },
    async show({ commit }) {
        console.log("asdas")
        commit('setDisplay', true);
    },
    async none({ commit }) {
        commit('setDisplay', false);
    }
}
export default { state, getters, mutations, actions }