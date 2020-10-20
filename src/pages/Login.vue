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
      <q-tab
        name="login"
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
      >
        <label :class="$style.tab_label">Вход</label></q-tab
      >
      <q-tab
        name="register"
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
        ><label :class="$style.tab_label">Регистрация</label>
      </q-tab>
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
            <UiButton class="q-mt-md" @click="$router.push('/')" fluid theme="outline-brand">
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

      <q-tab-panel :class="$style.panel" name="register">
        <q-input
          v-model="registerForm.name"
          :rules="[val => val.length || 'Введите имя']"
          label-slot
          class="input"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Имя
            </div>
          </template>
        </q-input>

        <q-input
          v-model="registerForm.surname"
          class="input"
          label-slot
          :rules="[val => val.length || 'Введите фамилию']"
        >
          <template v-slot:label>
            <div
              :class="$style.input_label"
              class="row items-center all-pointer-events input_label"
            >
              Фамилия
            </div>
          </template>
        </q-input>
        <q-input
          v-model="registerForm.phone"
          label-slot
          class="input"
          mask="+7(###) ### - ## - ##"
          :rules="[val => val.length || 'Введите телефон']"
        >
          <template v-slot:label>
            <div
              :class="$style.input_label"
              class="row items-center all-pointer-events input_label"
            >
              Телефон
            </div>
          </template>
        </q-input>
        <q-input
          v-model="registerForm.email"
          label-slot
          bottom-slots
          class="input"

          :rules="[emailRule]"
        >
          <template v-slot:label>
            <div
              :class="$style.input_label"
              class="row items-center all-pointer-events input_label"
            >
              Почта
            </div>
          </template>
          <template v-slot:hint>
            <span class="q-mb-md input_hint">
              Указанная при оплате в приложении или в филиале.
            </span>
          </template>
        </q-input>
        <div class="q-mb-lg q-mt-xs">
          <span :class="$style.email_link" @click="openSwiper">
            Как оплатить?</span
          >
        </div>
        <UiCheckbox class="q-mb-lg"
          ><span :class="$style.checkbox_label"
            >Я согласен на обработку моих персональных данных</span
          ></UiCheckbox
        >
        <UiButton
          @click="loadData"
          :class="$style.button_register"
          fluid
          theme="background-brand"
        >
          Зарегистрироваться
        </UiButton>
        <UiPopUp @close="closeSwiper" :visible="isSliderVisible">
          <template #label>Как оплатить ?</template>
          <template #content>
            <span class="q-mt-lg" :class="$style.panel_desctiption">
              Чтобы зарегистрироваться, оплатите пакет обучения во вкладке
              «Цены» или в любом филиале автошколы «Формула». Каждый пакет
              доступен при оплате от 1000 ₽</span
            >

            <UiButton class="q-mt-md" fluid theme="background-brand">
              Цены
            </UiButton>

            <UiButton class="q-mt-md q-mb-xl" fluid theme="outline-brand">
              Адреса филиалов
            </UiButton>
          </template>
        </UiPopUp>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UiPopUp from "../components/UiPopUp";
import UiCheckbox from "../components/UiCheckbox";
import UiButton from "../components/UiButton";
export default {
  name: "MainLayout",
  components: {
    UiPopUp,
    UiCheckbox,
    UiButton
  },
  data() {
    return {
      isSliderVisible: false,
      license: false,
      tab: "login",
      login: "",
      password: "",
      registerForm: {
        name: "",
        surname: "",
        phone: "",
        email: ""
      }
    };
  },
  mounted() {
    if (window.device) {
      StatusBar.hide();
    }
  },
  methods: {

    closeSwiper() {
      this.$emit('blockToggle', false);
      this.isSliderVisible = false;
    },
    openSwiper() {
      this.$emit('blockToggle', true);
      this.isSliderVisible = true;
    },

    emailRule(val) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // call
          //  resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message
          resolve(
            !!val ||
              "Не найдено оплат, привязанных к этой почте. Возможно оплата обрабатывается, повторите позднее."
          );

          // calling reject(...) will also mark the input
          // as having an error, but there will not be any
          // error message displayed below the input
          // (only in browser console)
        }, 3000);
      });
    },
    loadData() {
      this.$axios
        .get("https://reqres.in/api/users?page=2")
        .then(response => {
          this.registerForm.name = response.data.ad.company;
        })
        .catch(() => {});
    }
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
.login_title,
.checkbox_label,
.panel_desctiption {
  @include text_16-22_medium;
}

.button_register {
  margin-top: auto;
  margin-bottom: 70px;
}

.email_link {
  @include btn-signature_13-18_semibold;
  margin-top: 6px;
  @media (max-width: 660px) {
    margin-top: 16px;
  }
  @media (max-width: 380px) {
    margin-top: 24px;
  }
}

.panels {
  height: calc(100vh - #{$tab_panel_height});
}
.panel {
  display: flex;
  flex-direction: column;
}
</style>
