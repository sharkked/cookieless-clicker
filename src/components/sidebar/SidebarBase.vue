<script setup lang="ts"></script>

<template>
  <div class="sidebar right">
    <slot></slot>
  </div>
</template>

<style>
.sidebar {
  width: 40rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.sidebar.left {
  border-right: 1px solid var(--color-border);
}

.sidebar.right {
  border-left: 1px solid var(--color-border);
}
</style>
