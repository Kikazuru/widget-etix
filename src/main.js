import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(vuetify).use(VueAxios, axios).mount('#app')
