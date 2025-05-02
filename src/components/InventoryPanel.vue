<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main.js'
import DescriptionPanel from '@/components/DescriptionPanel.vue'
import type { InventoryItem } from '@/types.ts'

const store = useMainStore()
const { moveItem } = store
const { inventory } = storeToRefs(store)

const descriptionItem = ref<InventoryItem | null>(null)
const isDialogOpen = ref(false)
const isDialogClosing = ref(false)

function onClick(item: InventoryItem) {
  if (descriptionItem.value) {
    onClose()
    return
  }
  if (item?.empty) {
    return
  }
  descriptionItem.value = item
  isDialogOpen.value = true
}

function onClose() {
  isDialogClosing.value = true
}

function onTransitionEnd() {
  if (isDialogClosing.value) {
    isDialogOpen.value = false
    descriptionItem.value = null
    isDialogClosing.value = false
  }
}

function onDelete() {
  console.log('delete')
}

function onDrag(evt: DragEvent, item: InventoryItem) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemId', item.id.toString())
  }
}

function onDrop(evt: DragEvent, item: InventoryItem) {
  moveItem(Number(evt.dataTransfer!.getData('itemId')), item?.id)
}
</script>

<template>
  <div class="inventory-panel">
    <ul v-if="inventory" class="inventory-panel__list">
      <li
        v-for="(item, index) in inventory.items"
        :key="item.id"
        @click="onClick(item)"
        @dragstart="onDrag($event, item)"
        @drop="onDrop($event, item)"
        @dragover.prevent
        @dragenter.prevent
        class="inventory-panel__item item"
        :class="[
          { 'item--left': index % inventory.rows === 0 },
          // { 'item--right': index % inventory.rows === inventory.rows - 1 },
          { 'item--top': index < inventory.rows },
          // { 'item--bottom': inventory.rows * inventory.columns - index <= inventory.rows },
        ]"
        :draggable="!isDialogOpen && !item?.empty"
      >
        <template v-if="!item?.empty">
          <picture v-if="item.image" class="item__image">
            <img :src="item.image" width="54" height="54" alt="" />
          </picture>
          <p class="item__quantity">
            {{ item.quantity }}
          </p>
        </template>
      </li>
    </ul>
    <div
      @transitionend="onTransitionEnd"
      :class="[{ open: isDialogOpen }, { closing: isDialogClosing }]"
      class="inventory-panel__description"
      ref="descriptionDialog"
    >
      <DescriptionPanel
        v-if="descriptionItem"
        :item="descriptionItem"
        @close="onClose"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<style>
.inventory-panel {
  position: relative;
  background-color: var(--panel-bg);
  border: 1px solid var(--border-color);
  /* TODO: chrome bug (https://stackoverflow.com/questions/63056976/does-transition-work-with-backdrop-filter) */
  border-radius: var(--border-radius);
  contain: layout paint;
  overflow: hidden;
}
.inventory-panel__list {
  margin: 0;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(v-bind('inventory.rows'), 1fr);
  list-style: none;
  overflow: auto;
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
  cursor: pointer;
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
  pointer-events: none;
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
.inventory-panel__description {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  width: 250px;
  border-left: 1px solid var(--border-color);
  transform: translateX(100%);
  will-change: transform, opacity;
  transition: transform 0.2s ease;
  backdrop-filter: blur(var(--blur-size));
}
.inventory-panel__description.open {
  transform: translateX(0);
}
.inventory-panel__description.closing {
  transform: translateX(100%);
}
</style>
