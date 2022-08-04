<script setup lang="ts">
import { useInventoryStore, type Item } from "@/stores/inventory";
import { formatNumber } from "@/utils/format";

import SidebarItem from "../SidebarItem.vue";

const inventory = useInventoryStore();

defineProps<{
  item: Item;
}>();

function costText(item: Item) {
  if (!item.cost) return "";
  if (inventory.buyMode.selling) {
    return `Sell: ${formatNumber(
      inventory.getItemSellPrice(item.id, inventory.buyMode.quantity)
    )}`;
  }
  return `Buy: ${formatNumber(
    inventory.getItemBuyPrice(item.id, inventory.buyMode.quantity)
  )}`;
}
</script>

<template>
  <SidebarItem v-bind:key="item" class="item">
    <div class="layout horizontal separated">
      <h2>{{ item.owned }}</h2>
      <h2>{{ item.name }}</h2>
      <div class="item-info">
        <div>{{ costText(item) }}</div>
        <div>CPS: {{ formatNumber(item.cps) }}</div>
      </div>
    </div>
  </SidebarItem>
</template>

<style>
.item {
  user-select: none;
}

.item:hover {
  background-color: var(--color-background-soft);
}
</style>
