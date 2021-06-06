<template>
  <div>
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
    <q-tab-panels v-model="tab" :class="$style.panels" class="desktop_container" animated>
      <q-tab-panel name="register">
        <div v-if="firstStepRegistration" :class="$style.stepsRegistration">
          <q-input
            v-model="name"
            ref = "name"
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
            ref = 'surname'
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
            v-model="email"
            type="email"
            label-slot
            ref = "email"
            bottom-slots
            class="input"
            :rules="[val => !!val || 'Введите email', isValidEmail ]"

          >
            <template v-slot:label>
              <div
                class="row items-center all-pointer-events input_label"
              >
                Почта
              </div>
            </template>
          </q-input>

          <q-input
            v-model="phone"
            label-slot
            type="tel"
            class="input"
            unmasked-value
            ref = "phone"
            bottom-slots
            fill-mask
            mask="+7(###) ### - ####"
            :rules="[val => val.length>9 || 'Введите номер телефона']"
          >
            <template v-slot:label>
              <div
                class="row items-center all-pointer-events input_label"
              >
                Телефон
              </div>
            </template>
            <template v-slot:hint>
              <span class="q-mb-md input_hint">
                Указанный при оплате в приложении или в филиале.
              </span>
            </template>
          </q-input>

          <div class="q-mb-lg q-mt-xs">
            <span :class="$style.email_link" @click="openSwiper">
              Как оплатить?</span
            >
          </div>
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
              <span class="q-mb-lg q-mt-md" :class="$style.panel_desctiption">
                Чтобы зарегистрироваться, оплатите пакет обучения во вкладке
                «Цены» или в любом филиале автошколы «Формула». Каждый пакет
                доступен при оплате от 1000 ₽</span
              >

              <UiButton
                @click="closeSwiper(); $router.push({ name: 'prices' })"
                class="q-mt-lg"
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
            ref="password"
            v-model="password"
            :rules="[val =>  val.length>=6 || 'Введите пароль']"
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
            ref="passwordCopy"
            v-model="passwordCopy"
            class="input"
            label-slot
            type="password"
            :rules="[val => !!val || 'Введите пароль еще раз' , val => val === this.password || 'Введённые пароли не совпадают']"
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
  import Vue from 'vue';
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
        firstStepRegistration: true,
        tab: "login",
        password: "",
        passwordCopy: "",
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

        if ( this.$refs.name.validate() & this.$refs.email.validate() &  this.$refs.surname.validate() & this.$refs.phone.validate()) {
          this.firstStepRegistration = false;
        }

      },
      closeSwiper() {
        this.$emit("blockToggle", false);
        this.isSliderVisible = false;
      },
      openSwiper() {
        this.$emit("blockToggle", true);
        this.isSliderVisible = true;
      },

      resetSteps() {
        this.firstStepRegistration = true;
      },
      async loadData() {
        this.$refs.password.validate();
        this.$refs.passwordCopy.validate();
        if (!this.$refs.password.hasError && !this.$refs.passwordCopy.hasError) {
          this.$store.commit('registerUserInfo/setPassword', this.password);
         if (await this.$store.dispatch('registerUserInfo/sendRegisterData')) {
           this.$eventBus.$emit('error', { header: '', text: "Регистрация прошла успешно" });
         }
          // this.$axios
          //   .get("https://reqres.in/api/users?page=2")
          //   .then(response => {
          //     this.name = response.data.ad.company;
          //   })
          //   .catch(() => {});
        }


      },
      isValidEmail () {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(this.email) || 'Проверьте правильность ввода почты';
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

  .checkbox_label,
  .panel_desctiption {
    @include text_16-22_medium;
  }

  .button_register {
    margin-top: auto;
    margin-bottom: 86px;
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
