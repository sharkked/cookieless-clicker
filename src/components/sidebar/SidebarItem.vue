<template>
  <div class="sidebar-item">
    <slot>
      <div>/*TODO*/</div>
    </slot>
  </div>
</template>

<style>
.sidebar-item {
  width: 100%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-item.header {
  border-bottom: none;
  padding-bottom: 0;
  width: 100%;
}

.sidebar-item.header::after {
  content: "";
  background-color: var(--color-border);
  width: 100%;
  height: 1px;
}
</style>
