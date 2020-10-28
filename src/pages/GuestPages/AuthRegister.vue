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
        @click="resetSteps"
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
      <q-tab-panel name="register">
        <div v-if="firstStepRegistration" :class="$style.stepsRegistration">
          <q-input
            v-model="name"
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
            v-model="surname"
            class="input"
            label-slot
            :rules="[val => val.length || 'Введите фамилию']"
          >
            <template v-slot:label>
              <div
                class="row items-center all-pointer-events input_label"
              >
                Фамилия
              </div>
            </template>
          </q-input>
          <q-input
            v-model="phone"
            label-slot
            type="tel"
            class="input"
            @focusin="maskVisible = true"
            :fill-mask="maskVisible"
            mask="+7(###) ### - ## - ##"
            :rules="[val => val.length || 'Введите телефон']"
          >
            <template v-slot:label>
              <div
                class="row items-center all-pointer-events input_label"
              >
                Телефон
              </div>
            </template>
          </q-input>
          <q-input
            v-model="email"
            type="email"
            label-slot
            bottom-slots
            class="input"
            :rules="[emailRule]"
          >
            <template v-slot:label>
              <div
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
            @click="registerButtonHandler"
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

              <UiButton
                @click="$router.push({ name: 'prices' })"
                class="q-mt-md"
                fluid
                theme="background-brand"
              >
                Цены
              </UiButton>

              <UiButton class="q-mt-md q-mb-xl" fluid theme="outline-brand">
                Адреса филиалов
              </UiButton>
            </template>
          </UiPopUp>
        </div>
        <div v-else :class="$style.stepsRegistration">
          <q-input
            v-model="password"
            :rules="[val => val.length || 'Введите пароль']"
            label-slot
            type="password"
            class="input"
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events input_label">
                Придумайте пароль
              </div>
            </template>
          </q-input>
          <q-input
            v-model="password"
            class="input"
            label-slot
            type="password"
            :rules="[val => val.length || 'Введите еще раз пароль']"
          >
            <template v-slot:label>
              <div
                class="row items-center all-pointer-events input_label"
              >
                Повторите пароль
              </div>
            </template>
          </q-input>

          <UiButton
            @click="loadData"
            :class="$style.button_register"
            fluid
            theme="background-brand"
          >
            Поехали!
          </UiButton>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
  import UiPopUp from "../../components/UiPopUp";
  import UiCheckbox from "../../components/UiCheckbox";
  import UiButton from "../../components/UiButton";
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
        firstStepRegistration: true,
        maskVisible: false,
        license: false,
        tab: "login",
        password: "",
      };
    },

    computed: {
      name: {
        get () {
          return this.$store.state.registerUserInfo.name
        },
        set (value) {
          this.$store.commit('registerUserInfo/setName', value)
        }
      },
      surname: {
        get () {
          return this.$store.state.registerUserInfo.surname
        },
        set (value) {
          this.$store.commit('registerUserInfo/setSurname', value)
        }
      },
      phone: {
        get () {
          return this.$store.state.registerUserInfo.phone
        },
        set (value) {
          this.$store.commit('registerUserInfo/setPhone', value)
        }
      },
      email: {
        get () {
          return this.$store.state.registerUserInfo.email
        },
        set (value) {
          this.$store.commit('registerUserInfo/setEmail', value)
        }
      },

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
      resetSteps() {
        this.firstStepRegistration = true;
      },
      loadData() {
        // this.$axios
        //   .get("https://reqres.in/api/users?page=2")
        //   .then(response => {
        //     this.name = response.data.ad.company;
        //   })
        //   .catch(() => {});
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
  .stepsRegistration {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
