<script setup lang="ts">
interface Option {
  value: string | number
  label?: string
  text?: string
}

const { options, modelValue, placeholder, disabled } = defineProps<{
  options: Option[]
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select :value="modelValue" @change="onChange" :disabled="disabled" class="ui-select">
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label ?? option.text ?? option.value }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.ui-select {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-size: 1.1rem;
  color: #222;
  background: #f9fafb;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
  appearance: none;

  &:focus {
    border-color: #38e8ff;
    box-shadow: 0 0 0 2px rgba(56, 232, 255, 0.15);
    background: #fff;
  }

  &:disabled {
    background: #f1f5f9;
    color: #b0b8c1;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
}
</style>
