<script setup lang="ts">
import { ref, reactive } from "vue";
import { useInventoryStore, type Item } from "../stores/inventory";
import { formatNumber } from "../utils/format";

import Sidebar from "../components/sidebar/SidebarBase.vue";
import SidebarItem from "../components/sidebar/SidebarItem.vue";

import GameItem from "../components/sidebar/items/GameItem.vue";
import BuyModeOptions from "../components/sidebar/items/BuyModeOptions.vue";

const inventory = useInventoryStore();

function onItemClicked(e: Event, item: Item) {
  e.stopPropagation();
  if (inventory.buyMode.selling) {
    inventory.sellItem(item.id, inventory.buyMode.quantity);
  } else {
    inventory.buyItem(item.id, inventory.buyMode.quantity);
  }
}
</script>

<template>
  <div class="layout horizontal">
    <div class="content vertical">
      <div class="breathe">
        <div class="sway">
          <button class="clicker" @click="inventory.currency += 1">
            <h1>{{ formatNumber(inventory.currency) }}</h1>
          </button>
        </div>
      </div>
    </div>
    <Sidebar>
      <section class="upgrades-section">
        <SidebarItem class="header"><h3>Upgrades</h3></SidebarItem>
        <SidebarItem class="upgrades">
          <div
            class="upgrade"
            v-for="upgrade in inventory.upgrades"
            v-bind:key="upgrade.id"
          >
            <div class="upgrade-name">{{ upgrade.name }}</div>
            <div class="upgrade-cost">{{ formatNumber(upgrade.cost) }}</div>
            <div class="upgrade-description">{{ upgrade.description }}</div>
          </div>
        </SidebarItem>
      </section>
      <section class="items-section">
        <SidebarItem class="header"><h3>Items</h3></SidebarItem>
        <BuyModeOptions />
        <GameItem
          v-for="item in inventory.items"
          v-bind:key="item.id"
          :item="item"
          @click="(e: Event) => onItemClicked(e, item)"
        />
      </section>
    </Sidebar>
  </div>
</template>

<style>
.content {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clicker {
  width: 20rem;
  height: 20rem;
  border: 1px solid var(--color-border);
  border-radius: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.1s;
}

.sway {
  animation: sway 20s infinite;
}

.breathe {
  animation: breathe 10s infinite;
}

@keyframes sway {
  0% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}

@keyframes breathe {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.clicker:hover {
  transform: scale(1.05) !important;
  background-color: var(--color-background-soft);
}

.clicker:active {
  transform: scale(0.98) !important;
  background-color: var(--color-background);
}
</style>
