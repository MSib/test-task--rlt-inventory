<script setup lang="ts">
import PersonalizationPanel from '@/components/PersonalizationPanel.vue'
import InventoryPanel from '@/components/InventoryPanel.vue'
import StatusPanel from '@/components/StatusPanel.vue'
import DebugPanel from '@/components/DebugPanel.vue'
</script>

<template>
  <DebugPanel />
  <div class="inventory">
    <div class="inventory__wrapper">
      <PersonalizationPanel />
      <InventoryPanel />
    </div>
    <StatusPanel class="inventory__status" />
  </div>
</template>

<style>
.inventory {
  padding: 32px;
  display: grid;
  grid-template-columns: fit-content(100%);
  gap: 24px;
}
.inventory__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 24px;
  overflow: auto;
}
.inventory__status {
  flex-basis: 100%;
}
</style>
