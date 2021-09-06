<template>
  <select @change="$emit('on-change', $event)" class="dropdown">
    <option value="false">All merchants</option>
    <option v-for="merchant in merchants" :value="merchant" :key="merchant">
      {{ merchant }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    merchants: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.dropdown {
  padding: 5px;
  border-radius: 4px;
  font-size: 16px;
}
</style>
