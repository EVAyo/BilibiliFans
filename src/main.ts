import { createApp } from "vue";
import "./styles/index.css";
import "./styles/global.css";
/** The import order of vue-i18n pinia router App.vue should be fixed here */
/** Otherwise it will affect the auto import in Vue template */
/** It's because vue-i18n@9 exports ComponentCustomProperties from '@vue/runtime-core' */
/** vue-i18n@10 has re-exported ComponentCustomProperties from 'vue' */
/** After the release of vue-i18n@10, the import order here can be changed */
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import { router } from "./router";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import zhCN from "./locale/zh-CN";
import enUS from "./locale/en-US";

const i18n = createI18n<[typeof zhCN], "zh-CN" | "en-US">({
  legacy: false,
  locale: "zh-CN",
  fallbackLocale: "en-US",
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS,
  },
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(i18n);
app.use(router);
app.use(pinia);
app.mount("#app");
