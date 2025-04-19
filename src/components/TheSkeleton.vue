<script setup lang="ts">
defineProps<{ rows?: number; large?: boolean }>()

const DEFAULT_ROWS = 1

type WidthPatterns = {
  [key: number]: number[]
}

/** Calculate width using formula: (currentWidth - maxWidth) / maxWidth * 100; remove sign and round value  */
const sceletonWidthPatterns: WidthPatterns = {
  6: [0, 0, 0, 0, 15, 62],
  7: [0, 21, 0, 10, 15, 26, 58],
}

function getWidth(rows: number, row: number) {
  if (!sceletonWidthPatterns.hasOwnProperty(rows)) {
    return 100
  }
  const percent = sceletonWidthPatterns[rows][row]
  if (percent === undefined || percent > 100 || percent < 0) {
    return 100
  }
  return 100 - percent
}
</script>

<template>
  <div class="skeleton-wrapper">
    <p
      v-for="i in rows || DEFAULT_ROWS"
      :key="i"
      class="skeleton"
      :class="[
        { 'skeleton--last-indentation': rows || DEFAULT_ROWS > 6 },
        { 'skeleton--large': large },
      ]"
      :style="{ width: `${getWidth(rows || DEFAULT_ROWS, i - 1)}%` }"
    ></p>
  </div>
</template>

<style>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.skeleton {
  margin: 0;
  width: 100%;
  height: 10px;
  border-radius: 4px;
  background-color: var(--border-color);
  background-image: linear-gradient(0.25turn, #3c3c3c 15%, #444444 50%, #333333 85%);
}
.skeleton:first-of-type {
  height: 26px;
  border-radius: 8px;
}
.skeleton:last-of-type.skeleton--last-indentation {
  margin-top: 8px;
}
.skeleton:first-of-type.skeleton--large {
  height: 36px;
  border-radius: 12px;
}
</style>
