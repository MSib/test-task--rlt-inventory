<script setup lang="ts">
import TheSkeleton from '@/components/TheSkeleton.vue'
</script>

<template>
  <div class="personalization">
    <div class="personalization__image-wrapper">
      <picture class="personalization__image">
        <img src="/img/userpic.jpg" alt="" />
      </picture>
    </div>
    <TheSkeleton :rows="7" />
  </div>
</template>

<style>
.personalization {
  padding: 18px 14px 24px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--panel-bg);
}
.personalization__image-wrapper {
  border-radius: 8px;
  overflow: hidden;
}
.personalization__image {
  display: flex;
  filter: blur(5px);
}
</style>
