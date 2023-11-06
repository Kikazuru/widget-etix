import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Axios
import api from "./plugins/api"
import VueAxios from 'vue-axios'

// Vuex
import store from './plugins/store'

createApp(App).use(vuetify).use(VueAxios, api).use(store).mount('#app')
