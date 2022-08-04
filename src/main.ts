import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useInventoryStore } from "./stores/inventory";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const inventory = useInventoryStore();

let lastTick = Date.now();
const tps = 1 / 1000;

function tick() {
  const now = Date.now();
  const dt = (now - lastTick) * tps;
  lastTick = now;

  inventory.items.forEach((item) => {
    inventory.currency += dt * item.owned * item.cps;
  });

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);

app.mount("#app");
