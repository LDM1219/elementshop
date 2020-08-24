export default {
    getUserlist(state, payload) {
        state.userlist = payload
    },
    getTotal(state, payload) {
        state.total = payload
    },
    getQueryInfo(state, payload) {
        state.queryInfo = payload
    },
    getQueryInfoQuery(state, query) {
        state.queryInfo.query = query
    }


}