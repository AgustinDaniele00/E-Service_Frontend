export default {
  head: {
    titleTemplate: 'E-Service',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  },
  build: {
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }  
  },
  target: 'static',
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'cookie-universal-nuxt'],
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:4001'
      //baseURL: 'http://34.227.147.249:3001'
    }
  },
  generate: {
    fallback: 'index.html'
  },
}
