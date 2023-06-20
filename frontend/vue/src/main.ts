import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import AmplifyVue from '@aws-amplify/ui-vue';
import { AuthenticatonSetup  } from './setupAuth';


const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(AmplifyVue);
app.use(createPinia())
app.use(router)
new AuthenticatonSetup();

app.mount('#app')
