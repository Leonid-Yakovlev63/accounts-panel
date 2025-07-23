<script lang="ts">
export default {
  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <input :type="inputType" :placeholder="placeholder" />
</template>

<style lang="scss" scoped>
input {
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

  &:focus {
    border-color: #38e8ff;
    box-shadow: 0 0 0 2px rgba(56, 232, 255, 0.15);
    background: #fff;
  }

  &::placeholder {
    color: #b0b8c1;
    opacity: 1;
    font-size: 1rem;
  }

  &:disabled {
    background: #f1f5f9;
    color: #b0b8c1;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
}
</style>
