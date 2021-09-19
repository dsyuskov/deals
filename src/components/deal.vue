<template>
  <div
    class="deal"
    :class="{
      deal_active: isActive,
    }"
  >
    <h3
      class="deal__title"
      :class="{
        'deal__item_changed': isUpdated('title')
      }"
    >
      {{ deal.title }}
    </h3>
    <ul class="deals__items">
      <template v-for="field in $options.FIELDS">
        <li
          v-if="deal[field]"
          class="deal__item"
          :class="{
            'deal__item_changed': isUpdated(field)
          }"
          :key="field"
        >
          <span>{{ field }}:</span> {{deal[field]}}
        </li>
      </template>
      <table v-if="deal.examples" class="deal__examples">
        <tr>
          <td>title</td>
          <td v-for="example in deal.examples" :key="example.name">
            {{example.title}}
          </td>
        </tr>
        <tr>
          <td>price</td>
          <td v-for="example in deal.examples" :key="example.name">
            {{example.price}}
          </td>
        </tr>
        <tr>
          <td>oldPrice</td>
          <td v-for="example in deal.examples" :key="example.name">
            {{example.oldPrice}}
          </td>
        </tr>
      </table>
    </ul>
    <img
      class="deal__merchant-logo"
      :src="`${$options.CDN_ROOT}${deal.merchantId}.svg`"
    >
    <button
      class="deal__button deal__button_add"
      v-if="deal.add"
      @click="handleAddButton(deal)"
    >
      add
    </button>
    <button
      class="deal__button deal__button_update"
      v-if="isShowUpdateButton"
      @click="handleUpdateButton(deal)"
    >
      update
    </button>
    <button
      class="deal__button deal__button_update"
      v-if="removable"
      @click="handleRemoveButton(deal)"
    >
      Remove
    </button>
  </div>
</template>

<script>
import { CDN_ROOT } from '../utils/constants';

export default {
  FIELDS: ['type', 'expireDate', 'link', 'price', 'oldPrice', 'discount', 'description', 'enabled'],
  EXAMPLE_FIELDS: ['price', 'oldPrice'],

  CDN_ROOT,
  props: {
    deal: {
      type: Object,
    },
    dev: {
      type: Boolean,
    },
    removable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isActive() {
      const { enabled, expireDate } = this.deal;
      return enabled && new Date(expireDate) > new Date();
    },

    isShowUpdateButton() {
      if (this.deal.update?.length) {
        return true;
      }

      return false;
    }
  },

  methods: {
    handleAddButton(deal) {
      this.$store.commit('addDeal', deal);
    },
    handleUpdateButton(deal) {
      this.$store.commit('updateDeal', deal);
    },
    handleRemoveButton(deal) {
      this.$store.commit('removeDeal', deal);
    },
    isUpdated(key) {
      return this.deal.update?.includes(key)
    }
  }
};
</script>
<style>
.deal {
  position: relative;
  max-width: 600px;
  height: 300px;
  border-radius: 4px;
  padding: 10px;
  border: 2px solid red;
}

.deal:not(:last-child) {
  margin-bottom: 10px;
}

.deal__merchant-logo {
  height: 30px;
  position: absolute;
  bottom: 60px;
  right: 10px;
}

.deal__title {
  margin: 5px 0 10px;
  font-size: 16px;
}

.deals__items {
  padding: 0;
}

.deal__item {
  margin-bottom: 5px;
}

.deal__item_changed {
  color: red;
}

.deal_active {
  border-color: green;
}

.deal__button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 30px;
}

.deal__update,
.deal__add {
  color: red;
}

.deal__item {
  list-style: none;
  overflow: hidden;
  white-space: nowrap;
}

.deal__item span {
  font-weight: 600;
}

.deal__examples {
  border-collapse: collapse;
  border: 1px solid black;
}

td {
  border: 1px solid black;
  padding: 5px;
  overflow: hidden;
  white-space: nowrap;
  max-width: 60px;
  font-size: 12px;
}
</style>
