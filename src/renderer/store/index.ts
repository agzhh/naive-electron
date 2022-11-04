import { createPinia } from 'pinia'
import {App} from "vue";

export default function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
