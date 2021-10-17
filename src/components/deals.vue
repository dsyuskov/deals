<template>
  <div class="deals">
    <h3>{{ title }} {{ deals.length }}</h3>
    <div class="deals__header">
      <a
        class="deals__save-button"
        v-if="deals.length"
        :href="urlSave"
        download="deals.json"
      >
        Save json
      </a>
    </div>
    <div class="deals__row" v-for="pairDeals in deals" :key="pairDeals[0].name">
      <Deal class="deals__deal" :deal="pairDeals[0]" />
      <Deal class="deals__deal" :deal="pairDeals[1]" :removable="true"/>
    </div>
  </div>
</template>

<script>
import Deal from './deal.vue';
import { urlToSave } from '../utils';

export default {
  props: {
    deals: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },

  components: {
    Deal,
  },

  computed: {
    urlSave() {
      return urlToSave(this.deals);
    },
  },
};
</script>

<style>
.deals {
  max-width: 1700px;
  margin: 0 auto;
}

.deals__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deals__dropdown {
  margin-left: 10px;
}

.deals__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.deals__deal {
  flex-grow: 1;
}
</style>
