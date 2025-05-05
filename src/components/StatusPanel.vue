<script setup lang="ts">
import TheSkeleton from '@/components/TheSkeleton.vue'
</script>

<template>
  <div class="status">
    <TheSkeleton large />
    <button class="status__close" type="button" title="Закрыть"></button>
  </div>
</template>

<style>
.status {
  position: relative;
  padding: 18px;
  padding-right: 68px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--panel-bg);
}
.status__close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  background: url(/img/cross.svg) center no-repeat;
}
</style>
