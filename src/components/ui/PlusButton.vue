<script lang="ts">
export default {}
</script>

<template>
  <button>+</button>
</template>

<style lang="scss" scoped>
button {
  padding: 12px 20px;
  background: #38e8ff;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(80, 120, 255, 0.15);
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    transform 0.1s;
  outline: none;
  &:hover,
  button:focus {
    background: #4f8cff;
    box-shadow: 0 4px 16px rgba(80, 120, 255, 0.25);
    transform: translateY(-2px) scale(1.05);
  }
  &:active {
    transform: scale(0.97);
    box-shadow: 0 1px 4px rgba(80, 120, 255, 0.1);
  }
}
</style>
