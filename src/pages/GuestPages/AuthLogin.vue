<template>
  <div class="">
    <q-tabs
      v-model="tab"
      class="text-white"
      :class="$style.tab_wrap"
      align="center"
      :breakpoint="200"
      narrow-indicator
      indicator-color="white"
    >
      <q-route-tab
        name="login"
        :to ='{name: "login"}'
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
      >
        <label :class="$style.tab_label">Вход</label></q-route-tab
      >
      <q-route-tab
        name="register"
        :to ='{name: "register"}'
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
      ><label :class="$style.tab_label">Регистрация</label>
      </q-route-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" :class="$style.panels" animated>
      <q-tab-panel name="login">
        <div :class="$style.login_title" class="q-mb-lg q-mt-md">
          Для курсантов и сотрудников
        </div>
        <q-input
          v-model="login"
          label-slot
          class="input"
          :rules="[val => val.length || 'Введите телефон или e-mail']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Телефон или почта
            </div>
          </template>
        </q-input>
        <q-input
          v-model="password"
          type="password"
          label-slot
          class="input"
          :rules="[val => val.length || 'Введите пароль']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Пароль
            </div>
          </template>
        </q-input>

        <UiButton
          @click="openSwiper"
          class="q-mt-lg q-mb-lg"
          fluid
          theme="background-brand"
        >
          Войти
        </UiButton>
        <UiPopUp @close="closeSwiper" :visible="isSliderVisible">
          <template #label>Под кем заходим ?</template>
          <template #content>
            <UiButton class="q-mt-lg" fluid theme="outline-brand">
              Преподаватель
            </UiButton>
            <UiButton
              class="q-mt-md"
              @click="$router.push('/student')"
              fluid
              theme="outline-brand"
            >
              Курсант
            </UiButton>
            <UiButton class="q-mt-md" fluid theme="outline-brand">
              Инструктор
            </UiButton>

            <UiButton class="q-mt-md q-mb-xl" fluid theme="outline-brand">
              Экзаменатор
            </UiButton>
          </template>
        </UiPopUp>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UiPopUp from "../../components/UiPopUp";

import UiButton from "../../components/UiButton";
export default {
  name: "MainLayout",
  components: {
    UiPopUp,

    UiButton
  },
  data() {
    return {
      isSliderVisible: false,
      tab: "register",
      login: "",
      password: "",
    };
  },
  mounted() {
    if (window.device) {
      //TODO FIX проблема  с клавиатурой в полноэкранном режиме
      StatusBar.overlaysWebView(true);
    }
  },

  methods: {
    registerButtonHandler() {
      this.firstStepRegistration = false;
    },
    closeSwiper() {
      this.$emit("blockToggle", false);
      this.isSliderVisible = false;
    },
    openSwiper() {
      this.$emit("blockToggle", true);
      this.isSliderVisible = true;
    },


  }
};
</script>
<style lang="scss" module>
//$
$tab_panel_height: 120px;

.tab {
  align-self: flex-end;
}
.tab_wrap {
  @include gradientBrand;
  height: $tab_panel_height;
}
.tab_label {
  @include title_20-24_bold;
  color: $colorWhite;
  padding: 0 8px;
  margin-bottom: 16px;
}
.login_title{
  @include text_16-22_medium;
}
.panels {
  height: calc(100vh - #{$tab_panel_height});
}
</style>
