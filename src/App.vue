<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header>this is literally just cookie clicker with no cookies lmfao</header>
  <RouterView />
  <footer>
    <div class="credits">
      <div>
        <a href="https://orteil.dashnet.org/cookieclicker/">the real thing</a>
      </div>
      ripped off by
      <a href="https://twitter.com/sharkkedy" style="color: #ff00a8"
        >@sharkkedy
      </a>
    </div>
  </footer>
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;

  user-select: none;
}

header,
footer {
  width: 100%;
  padding-left: 1rem;
  position: absolute;
}

footer {
  bottom: 0;
  display: flex;
}

.credits {
  flex: 1;
}
</style>
