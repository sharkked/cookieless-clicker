<script setup lang="ts">
import { useInventoryStore } from "@/stores/inventory.js";
import SidebarItem from "@/components/sidebar/SidebarItem.vue";

const inventory = useInventoryStore();

const onClick = (e: Event, selling: boolean, quantity: number) => {
  e.stopPropagation();
  inventory.buyModeSet({
    selling,
    quantity,
  });
};
</script>

<template>
  <SidebarItem class="buy-mode-options">
    <div class="layout vertical">
      == Buy ==
      <div class="buy-mode-button-grid">
        <button @click="(e) => onClick(e, false, 1)">+1</button>
        <button @click="(e) => onClick(e, false, 10)">+10</button>
        <button @click="(e) => onClick(e, false, 100)">+100</button>
        <button @click="(e) => onClick(e, true, 1)">-1</button>
        <button @click="(e) => onClick(e, true, 10)">-10</button>
        <button @click="(e) => onClick(e, true, 100)">-100</button>
      </div>
      == Sell ==
    </div>
  </SidebarItem>
</template>

<style>
.buy-mode-options {
  width: 100%;
  user-select: none;
}

.buy-mode-button-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
  background-color: var(--color-border);
}

.buy-mode-button-grid button {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1.6rem;
  cursor: pointer;
}
</style>
