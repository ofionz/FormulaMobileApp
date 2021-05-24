<template>
  <div>
    <div class="flex column desktop_container">
      <ui-page-title
        :class="$style.title"
        @backward="$router.push({ name: 'prices' })"
        :title="tariff.groupName + ', ' + tariff.name"
      >
      </ui-page-title>

      <span class="q-mb-sm q-mt-lg" :class="$style.info_title"
        >В этот пакет включено:</span
      >
      <ul :class="$style.row_list">
        <li
          v-for="(row, index) in tariff.detailDescriptionRows"
          :key="index"
          class="flex"
          :class="$style.row"
        >
          <span :class="$style.row_name">{{ row.name }}</span>
          <span class="q-mr-md">{{ row.value }}</span>
        </li>
      </ul>
      <span class="q-mt-md q-mb-md" :class="$style.info_title"
        >К каждому пакеты мы предоставляем: индивидуальный график теоретических
        и практических занятий; скидку на получение мед. справки; бесплатный
        доступ к онлайн-обучению.</span
      >
      <span :class="$style.price">{{ tariff.price | withCurrencySymbol }}</span>

      <div class="q-mr-md q-ml-md">
        <UiButton
          @click="startButtonHandler"
          fluid
          theme="background-brand"
          :class="$style.btn_start"
        >
          Начать обучение
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script>
  import UiPageTitle from "../../components/UiPageTitle";
import UiButton from "../../components/UiButton";
import withCurrencySymbol from "../../filters/money.filter.js";


export default {
  name: "Details",
  components: {
    UiButton,
    UiPageTitle
  },
  filters: {
    withCurrencySymbol
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      tariff: {}
    };
  },
  mounted() {
    this.tariff = this.$store.getters["prices/getTariffById"](this.id);
    if (!this.tariff) this.$router.push({ name: "prices" });
  },
  methods: {
    startButtonHandler() {
      this.$store.commit("registerUserInfo/setTariffId", this.id);
      this.$router.push({ name: "set_user_info" });
    }
  }
};
</script>

<style lang="scss" module>
//$

.title {
  margin: 58px 16px 36px;
}
.row_list {
  border: 0.5px solid $colorGray4;
  border-left: none;
  border-right: none;
  padding: 0 0 0 16px;
  margin: 0;
}

.row {
  @include text_16-22_medium;
  list-style-type: none;
  padding: 11px 0;
  justify-content: space-between;
}

.row:not(:last-child) {
  border-bottom: 0.5px solid $colorGray4;
}

.info_title {
  @include signature_12-16_semibold;
  color: $colorGray;
  padding: 0 16px;
}
.btn_start {
  margin-bottom: 96px;
}
.price {
  @include title-big_30-38_bold;
  margin: 0 auto 16px;
}
.row_name {
  width: 60%;
}
</style>
