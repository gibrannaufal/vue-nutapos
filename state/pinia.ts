import { useDiskonStore } from "./pinia/diskon";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
export default pinia;
pinia.use(piniaPluginPersistedstate);


export { useDiskonStore };

