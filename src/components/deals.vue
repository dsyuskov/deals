<template>
  <div class="deals">
    <h3>{{ title }} {{ filtredDeals.length }}</h3>
    <div class="deal__header">
      <div class="deals__filter">
        <label>
          Expired
          <input type="checkbox" v-model="filterExpireDate" />
        </label>
        <label>
          Enabled
          <input type="checkbox" v-model="filterEnabled" />
        </label>
        <Dropdown
          class="deal__dropdown"
          :merchants="merchantsId"
          @on-change="handleDropdownChange($event)"
        />
      </div>
      <a
        class="deal__save-button"
        v-if="deals.length"
        :href="urlSave"
        download="deals.json"
      >
        Save json
      </a>
    </div>
    <Deal v-for="deal in filtredDeals" :key="deal.name" :deal="deal" />
  </div>
</template>

<script>
import Deal from './deal.vue';
import Dropdown from './dropdown.vue';

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
    Dropdown,
  },

  data() {
    return {
      filterEnabled: false,
      filterExpireDate: false,
      filterMerchant: false,
    };
  },

  computed: {
    urlSave() {
      return urlToSave(this.filtredDeals);
    },

    merchantsId() {
      return this.$store.state.merchantsId;
    },

    filtredDeals() {
      let filtredDeals = this.deals;

      if (this.filterEnabled) {
        filtredDeals = filtredDeals.filter((deal) => deal.enabled);
      }

      if (this.filterExpireDate) {
        filtredDeals = filtredDeals.filter(
          (deal) => new Date(deal.expireDate) > new Date()
        );
      }

      if (this.filterMerchant) {
        filtredDeals = filtredDeals.filter(
          (deal) => deal.merchantId === this.filterMerchant
        );
      }

      return filtredDeals;
    },
  },

  methods: {
    handleDropdownChange(event) {
      const merchantId = event.target.value;
      if (merchantId === 'false') {
        this.filterMerchant = false;
      } else {
        this.filterMerchant = merchantId;
      }
    },

    handleSaveButton() {
      urlToSave;
    },
  },
};
</script>

<style>
.deals {
  width: 600px;
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
