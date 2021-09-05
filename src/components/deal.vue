<template>
  <div class="deal">
    <span>{{ deal.merchantId }}</span>
    <h3 class="deal__title">{{ deal.title }}</h3>
    <span>{{ deal.price }} {{ deal.oldPrice }}</span>
  </div>
</template>

<script>
export default {
  props: {
    deal: {
      type: Object,
    },
  },
};
</script>
<style>
.deal {
  width: 600px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid red;
}

.deal:not(:last-child) {
  margin-bottom: 10px;
}

.deal__title {
  font-size: 16px;
}
</style>
