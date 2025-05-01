<script setup lang="ts">
import TheSkeleton from '@/components/TheSkeleton.vue'
import type { InventoryItem } from '@/types.ts'

defineProps<{ item: InventoryItem; onClose: () => void; onDelete: () => void }>()
</script>

<template>
  <div class="description">
    <button
      @click="onClose"
      class="description__close"
      type="button"
      title="Закрыть описание"
    ></button>
    <div class="description__image-wrapper">
      <picture class="description__image">
        <img :src="item.image" width="130" height="130" alt="" />
      </picture>
    </div>
    <div class="description__content">
      <TheSkeleton :rows="6" />
    </div>
    <div class="description__controls">
      <button @click="onDelete" class="description__delete-btn" type="button">
        Удалить предмет
      </button>
    </div>
  </div>
</template>

<style>
.description {
  padding: 25px 15px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.description__close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  background: url(/img/cross.svg) center no-repeat;
}
.description__image-wrapper {
  padding: 30px;
  min-width: 220px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
}
.description__image {
  display: flex;
}
.description__content {
  margin-bottom: 8px;
  flex-grow: 1;
}
.description__controls {
  padding-top: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--border-color);
}
.description__delete-btn {
  flex-basis: 100%;
  padding: 10px;
  font-family: 'SFProDisplay', sans-serif;
  font-size: 14px;
  font-weight: normal;
  border-radius: 8px;
  background-color: #f88;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;
}
.description__delete-btn:active {
  background-color: #f66;
}
</style>
