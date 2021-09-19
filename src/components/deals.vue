<template>
  <div class="deals">
    <h3>{{ title }} {{ deals.length }}</h3>
    <div class="deal__header">
      <a
        class="deal__save-button"
        v-if="deals.length"
        :href="urlSave"
        download="deals.json"
      >
        Save json
      </a>
    </div>
    <Deal v-for="deal in deals" :key="deal.name" :deal="deal" :removable="removable" />
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
    removable: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    Deal,
  },

  computed: {
    urlSave() {
      return urlToSave(this.deals);
    },
  },

  methods: {
    handleSaveButton() {
      urlToSave;
    },
  },
};
</script>

<style>
.deals {
  margin: 0 20px;
}

.deal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.deal__dropdown {
  margin-left: 10px;
}

.deal__save-button {
}
</style>
