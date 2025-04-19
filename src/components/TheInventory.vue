<script setup lang="ts">
import PersonalizationPanel from '@/components/PersonalizationPanel.vue'
import InventoryPanel from '@/components/InventoryPanel.vue'
import StatusPanel from '@/components/StatusPanel.vue'
import DebugPanel from '@/components/DebugPanel.vue'
</script>

<template>
  <DebugPanel />
  <div class="inventory">
    <PersonalizationPanel />
    <InventoryPanel />
    <StatusPanel class="inventory__status" />
  </div>
</template>

<style>
.inventory {
  position: relative;
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 24px;
}
.inventory__status {
  flex-basis: 100%;
}
</style>
