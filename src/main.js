import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import vuetify from './plugins/vuetify'


//createApp(App).mount('#app')

createApp(App)
  .use(router)
  .mount('#app')