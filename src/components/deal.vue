<template>
  <div
    class="deal"
    :class="{
      deal_active: isActive,
    }"
  >
    <h3 class="deal__title">{{ deal.title }}</h3>
    <div class="deal__item">{{ deal.merchantId }}</div>
    <div class="deal__item">Expire date: {{ deal.expireDate }}</div>
    <div class="deal__item" v-if="deal.price">
      {{ deal.price }} {{ deal.oldPrice }}
    </div>
    <div class="deal__item" v-else>Discount {{ deal.discount }}</div>
  </div>
</template>

<script>
export default {
  props: {
    deal: {
      type: Object,
    },
  },

  computed: {
    isActive() {
      const { enabled, expireDate } = this.deal;
      return enabled && new Date(expireDate) > new Date();
    },
  },
};
</script>
<style>
.deal {
  max-width: 600px;
  height: 120px;
  border-radius: 4px;
  padding: 10px;
  border: 2px solid red;
}

.deal:not(:last-child) {
  margin-bottom: 10px;
}

.deal__title {
  margin: 5px 0 10px;
  font-size: 16px;
}

.deal__item {
  margin-bottom: 5px;
}

.deal_active {
  border-color: green;
}
</style>
