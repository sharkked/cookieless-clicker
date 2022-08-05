<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>this is literally just cookie clicker with no cookies lmfao</header>
  <RouterView />
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;

  user-select: none;
}

header {
  padding-left: 1rem;
  position: absolute;
}
</style>
