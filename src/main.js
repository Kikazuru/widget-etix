import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuex
import store from './plugins/store'

createApp(App).use(vuetify).use(VueAxios, axios).use(store).mount('#app')
