<template>
  <div
    class="deal"
    :class="{
      deal_active: isActive,
    }"
  >
  <template v-if="deal.name">
    <div class="deal__header">
      <h3
        class="deal__title"
        :class="{
          'deal__item_changed': deal.title.isChange
        }"
      >
        {{ deal.title.value }}
      </h3>
      <img
        class="deal__merchant-logo"
        :src="`${$options.CDN_ROOT}${deal.merchantId.value}.svg`"
      >
    </div>
    <ul class="deals__items">
      <template v-for="(value, field) in deal">
        <li
          v-if="deal[field].value"
          class="deal__item"
          :class="{
            'deal__item_changed': deal[field].isChange
          }"
          :key="field"
        >
          <span>{{ field }}:</span> {{ deal[field].value }}
        </li>
      </template>
      <table v-if="deal.examples.length" class="deal__examples">
        <tr>
          <td>title</td>
          <td
            v-for="example in deal.examples"
            :key="example.name"
          >
            {{ example.title.value }}
          </td>
        </tr>
        <tr>
          <td>link</td>
          <td
            v-for="example in deal.examples"
            :key="example.name"
          >
            {{ example.link.value }}
          </td>
        </tr>
        <tr>
          <td>price</td>
          <td
            v-for="example in deal.examples"
            :key="example.name"
            :class="{
              'deal__examples_changed': example.price.isChange
            }"
          >
            {{ example.price.value }}
          </td>
        </tr>
        <tr>
          <td>oldPrice</td>
          <td
            v-for="example in deal.examples"
            :key="example.name"
            :class="{
              'deal__examples_changed': example.oldPrice.isChange
            }"
          >
            {{ example.oldPrice.value }}
          </td>
        </tr>
      </table>
    </ul>
    <div class="deal__footer">
      <button
        class="deal__button deal__button_add"
        v-if="deal.isAdd"
        @click="handleAddButton(deal)"
      >
        add
      </button>
      <button
        class="deal__button deal__button_update"
        v-if="deal.isChange"
        @click="handleUpdateButton(deal)"
      >
        update
      </button>
      <button
        class="deal__button deal__button_remove"
        v-if="removable"
        @click="handleRemoveButton(deal)"
      >
        Remove
      </button>
    </div>
  </template>
  </div>
</template>

<script>
import { CDN_ROOT } from '../utils/constants';
import  { isChangedDeal } from '../utils';

export default {
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

      return enabled?.value && new Date(expireDate.value) > new Date();
    },

    isShowUpdateButton() {
      if (this.deal.update?.length) {
        return true;
      }

      return false;
    },
  },

  methods: {
    isChangedDeal,
    handleAddButton(deal) {
      this.$store.commit('addDeal', deal);
    },
    handleUpdateButton(deal) {
      this.$store.commit('updateDeal', deal);
    },
    handleRemoveButton(deal) {
      this.$store.commit('removeDeal', deal);
    },
  }
};
</script>
<style>
.deal {
  position: relative;
  max-width: 700px;
  border-radius: 4px;
  padding: 10px;
  border: 2px solid red;
  margin: 10px;
}

.deal:not(:last-child) {
  margin-bottom: 10px;
}

.deal__header {
  display: flex;
  justify-content: space-between;
}

.deal__footer {
  display: flex;
  justify-content: flex-end;
}

.deal__title {
  margin: 5px 0 10px;
  font-size: 16px;
}

.deal__merchant-logo {
  margin-left: 15px
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
  width: 100px;
  height: 30px;
  margin-left: 20px;
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
  max-width: 90px;
  font-size: 12px;
}

.deal__examples_changed {
  color: red;
}
</style>
