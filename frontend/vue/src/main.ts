import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AmplifyVue from '@aws-amplify/ui-vue';
import { AuthenticatonSetup  } from './setupAuth';
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const app = createApp(App).use(createVuestic());
app.use(AmplifyVue);
app.use(createPinia())
app.use(router)
new AuthenticatonSetup();

app.mount('#app')
