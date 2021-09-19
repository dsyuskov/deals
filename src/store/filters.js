const filters = {
  namespaced: true,

  state: {
    enabled: false,
    expireDate: false,
    merchantId: false,
  },

  mutations: {
    update(state, data) {
      Object.assign(state, data);
    }
  }
}

export default filters;