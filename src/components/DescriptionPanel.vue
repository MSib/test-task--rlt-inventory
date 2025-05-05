<script setup lang="ts">
import { ref } from 'vue'
import TheSkeleton from '@/components/TheSkeleton.vue'
import type { InventoryItem } from '@/types.ts'

const props = defineProps<{
  item: InventoryItem
  onClose: () => void
  onDelete: (itemId: number, count: number) => void
}>()

const isConfirmShown = ref(false)
const quantityRemoved = ref<number | null>(null)
const validationErrorMessage = ref('')

function onConfirmShow() {
  isConfirmShown.value = true
}

function onConfirmCancel() {
  isConfirmShown.value = false
  quantityRemoved.value = null
  validationErrorMessage.value = ''
}

function onConfirmOk() {
  validate()
  if (validationErrorMessage.value) {
    return
  }
  if (quantityRemoved.value) {
    props.onDelete(props.item.id, quantityRemoved.value)
    onConfirmCancel()
  }
}

function validate() {
  // Null
  if (quantityRemoved.value === null || typeof quantityRemoved.value === 'string') {
    validationErrorMessage.value = 'Введите количество'
    return
  }
  // Min
  if (quantityRemoved.value <= 0) {
    validationErrorMessage.value = 'Слишком мало'
    return
  }
  // Max
  if (quantityRemoved.value > props.item.quantity) {
    validationErrorMessage.value = 'Слишком много'
    return
  }
  // Fractional number
  if (quantityRemoved.value !== Math.floor(quantityRemoved.value)) {
    validationErrorMessage.value = 'Введите целое число'
    return
  }
  removeValidationError()
}

function removeValidationError() {
  validationErrorMessage.value = ''
}
</script>

<template>
  <div :class="{ 'description--confirm': isConfirmShown }" class="description">
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
      <button @click="onConfirmShow" class="description__delete-btn button" type="button">
        Удалить предмет
      </button>
    </div>
    <div class="description__confirm">
      <input
        v-model.number="quantityRemoved"
        @focus="removeValidationError"
        @input="removeValidationError"
        @keyup.enter="onConfirmOk"
        :class="{ 'description__confirm-input--error': validationErrorMessage }"
        class="description__confirm-input"
        type="number"
        name="quantityRemoved"
        id="quantityRemoved"
        placeholder="Введите количество"
      />
      <p class="description__confirm-error">
        {{ validationErrorMessage }}
      </p>
      <button @click="onConfirmCancel" class="description__confirm-cancel button" type="button">
        Отмена
      </button>
      <button
        @click="onConfirmOk"
        :disabled="!!validationErrorMessage"
        class="description__confirm-ok button"
        type="button"
      >
        Подтвердить
      </button>
    </div>
  </div>
</template>

<style>
.description {
  position: relative;
  padding: 25px 15px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
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
  color: #fff;
  background-color: var(--color-primary-red);
  transition: background-color 0.1s ease;
}
.description__delete-btn:active {
  background-color: color-mix(in srgb, var(--color-primary-red) 90%, #fff);
}
.description--confirm .description__delete-btn {
  background-color: var(--color-primary-red-dark);
}
.description__confirm {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 20px;
  display: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background-color: color(from var(--panel-bg) srgb r g b / 0.6);
  backdrop-filter: blur(calc(var(--blur-size) * 2));
  border-top: 1px solid var(--border-color);
}
.description--confirm .description__confirm {
  display: flex;
}
.description__confirm-input {
  flex-basis: 100%;
  padding: 11px;
  width: 100%;
  font: inherit;
  color: #fff;
  background-color: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
.description__confirm-input::placeholder {
  opacity: 0.4;
}
.description__confirm-input::-webkit-outer-spin-button,
.description__confirm-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.description__confirm-input {
  appearance: textfield;
}
.description__confirm-input--error {
  border-color: var(--color-primary-red);
}
.description__confirm-error {
  flex-basis: 100%;
  margin: 0;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--color-primary-red);
}
.description__confirm-cancel {
  flex-grow: 1;
}
.description__confirm-ok {
  flex-grow: 1;
  color: #fff;
  background-color: var(--color-primary-red);
}
.description__confirm-ok:disabled {
  background-color: var(--color-primary-red-dark);
  cursor: not-allowed;
}
.description__confirm-ok:not(:disabled):active {
  background-color: color-mix(in srgb, var(--color-primary-red) 90%, #fff);
}
</style>
