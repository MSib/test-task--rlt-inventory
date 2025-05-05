<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main.js'

const store = useMainStore()
const { resetInventory, addRandomItem } = store
// const {  } = storeToRefs(store)
</script>

<template>
  <div class="debug">
    <button @click="resetInventory" class="debug__button" type="button" title="Сбросить инвентарь">
      🔄
    </button>
    <button @click="addRandomItem" class="debug__button" type="button" title="Добавить предмет">
      🎁
    </button>
  </div>
</template>

<style>
.debug {
  position: absolute;
  top: 0;
  left: 50%;
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background-color: var(--panel-bg);
  overflow: hidden;
  z-index: 1;
}
.debug__button {
  background-color: var(--panel-bg);
  border: none;
  color: var(--text-color);
  font-size: 16px;
  cursor: pointer;
}
</style>
