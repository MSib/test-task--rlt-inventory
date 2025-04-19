<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main.js'

const store = useMainStore()
const {} = store
const { inventory } = storeToRefs(store)
</script>

<template>
  <div class="inventory-panel">
    <ul class="inventory-panel__list">
      <li
        v-for="(item, index) in inventory.items"
        :key="item.id"
        class="inventory-panel__item item"
        :class="[
          { 'item--left': index % inventory.rows === 0 },
          { 'item--right': index % inventory.rows === inventory.rows - 1 },
          { 'item--top': index < inventory.rows },
          { 'item--bottom': inventory.rows * inventory.columns - index <= inventory.rows },
        ]"
      >
        <template v-if="!item?.empty">
          <picture v-if="item.image" class="item__image">
            <img :src="item.image" alt="" />
          </picture>
          <p class="item__quantity">
            {{ item.quantity }}
          </p>
        </template>
      </li>
    </ul>
  </div>
</template>

<style>
.inventory-panel {
  background-color: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: auto;
}
.inventory-panel__list {
  margin: 0;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(v-bind('inventory.rows'), 1fr);
  list-style: none;
}
.item {
  position: relative;
  width: 105px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  box-sizing: border-box;
  overflow: hidden;
}
.item--left {
  border-left: none;
}
.item--top {
  border-top: none;
}
/* 
.item--right {
}
.item--bottom {
}
*/
.item__image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item__image img {
  width: 100%;
  height: 100%;
}
.item__quantity {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 4px 5px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.4);
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-radius: 6px 0 0 0;
}
</style>
