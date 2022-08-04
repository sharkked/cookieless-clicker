import { defineStore } from "pinia";
import { formatNumber } from "../utils/format";

import { items } from "../data/items.json";

const R = 1.15;

interface Inventory {
  currency: number;
  items: Item[];
  upgrades: Upgrade[];
  buyMode: {
    selling: boolean;
    quantity: number;
  };
}

export interface Item {
  id: string;
  name: string;
  cost: number;
  description?: string;
  cps: number;
  owned: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  owned: boolean;
}

export const useInventoryStore = defineStore({
  id: "inventory",
  state: () =>
    ({
      currency: 0,
      items: items.map((item) => ({ ...item, owned: 0 })),
      buyMode: {
        selling: false,
        quantity: 1,
      },
    } as Inventory),
  getters: {
    getItem: (state) => (id: string) =>
      state.items.find((item) => item.id === id),

    getItemBuyPrice: (state) => (id: string, quantity: number) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) return NaN;

      return buyValue(item, quantity);
    },

    getItemSellPrice: (state) => (id: string, quantity: number) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) return NaN;

      return sellValue(item, quantity);
    },

    getItemCps: (state) => (id: string) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) return NaN;

      return item.cps;
    },

    getItemCpsFormatted: (state) => (id: string) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) return NaN;

      return formatNumber(item.cps);
    },
  },
  actions: {
    buyItem(id: string, quantity: number) {
      const item = this.items.find((item: Item) => item.id === id);

      if (!item) return;

      const cost = buyValue(item, quantity);
      if (this.currency < cost) return;

      this.currency -= cost;
      item.owned += quantity;
    },

    sellItem(id: string, quantity: number) {
      const item = this.items.find((item: Item) => item.id === id);

      if (!item) return;

      if (item.owned < 1) return;
      if (item.owned < quantity) quantity = item.owned;
      this.currency += sellValue(item, quantity);
      item.owned -= quantity;
    },

    buyModeToggle() {
      this.buyMode.selling = !this.buyMode.selling;
    },

    buyModeSet(opts: { selling: boolean; quantity: number }) {
      this.buyMode.selling = opts.selling;
      this.buyMode.quantity = opts.quantity;
    },
  },
});

export const buyValue = (item: Item, quantity: number) => {
  return geometricSum(item.cost, quantity, R) * R ** item.owned;
};

export const sellValue = (item: Item, quantity: number) => {
  quantity = Math.min(quantity, item.owned);
  return (
    geometricSum(item.cost, quantity, R) *
    0.5 *
    R ** (item.owned - quantity - 1)
  );
};

export const geometricSum = (a: number, n: number, r: number) => {
  return (a * (1 - r ** n)) / (1 - r);
};
