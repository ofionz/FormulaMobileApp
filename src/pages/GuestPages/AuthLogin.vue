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
        :to="{ name: 'login' }"
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
      >
        <label :class="$style.tab_label">Вход</label></q-route-tab
      >
      <q-route-tab
        name="register"
        :to="{ name: 'register' }"
        v-ripple="false"
        :class="$style.tab"
        class="text-capitalize"
        ><label :class="$style.tab_label">Регистрация</label>
      </q-route-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" :class="$style.panels" class="desktop_container" animated>
      <q-tab-panel name="login">
        <div :class="$style.login_title" class="q-mb-lg q-mt-md">
          Для курсантов и сотрудников
        </div>
        <q-input
          v-model="login"
          label-slot
          type="tel"
          unmasked-value
          fill-mask
          class="input"
          mask="+7(###) ### - ####"
          :rules="[val => val.length>9 || 'Введите номер телефона']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Номер телефона
            </div>
          </template>
        </q-input>
        <q-input
          v-model="password"
          type="password"
          label-slot
          class="input"
          :rules="[val => val.length>=6 || 'Введите пароль']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Пароль
            </div>
          </template>
        </q-input>

        <UiButton
          @click="loginButtonHandler()"
          class="q-mt-lg q-mb-lg"
          fluid
          theme="background-brand"
        >
          Войти
        </UiButton>
        <UiPopUp @close="closeSwiper" :visible="isSliderVisible">
          <template #label>Под кем заходим ?</template>
          <template #content>
            <UiButton
              v-if="roles.find(role => role.url === 'teacher')"
              class="q-mt-lg"
              fluid
              theme="outline-brand"
              @click="selectRoleHandler('teacher')"
            >
              Преподаватель
            </UiButton>
            <UiButton
              class="q-mt-md"
              @click="selectRoleHandler('student')"
              fluid
              theme="outline-brand"
              v-if="roles.find(role => role.url === 'student')"
            >
              Курсант
            </UiButton>
            <UiButton
              v-if="roles.find(role => role.url === 'instructor')"
              @click="selectRoleHandler('instructor')"
              class="q-mt-md"
              fluid
              theme="outline-brand"
            >
              Инструктор
            </UiButton>

            <UiButton
              v-if="roles.find(role => role.url === 'examinator')"
              class="q-mt-md q-mb-xl"
              fluid
              theme="outline-brand"
              @click="selectRoleHandler('examinator')"
            >
              Экзаменатор
            </UiButton>
          </template>
        </UiPopUp>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UiButton from "../../components/UiButton";
import UiPopUp from "../../components/UiPopUp";

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
      roles: []
    };
  },
  mounted() {
    if (window.device) {
      StatusBar.overlaysWebView(true);
    }
  },

  methods: {
    registerButtonHandler() {
      this.firstStepRegistration = false;
    },

    loginButtonHandler() {
      let payload = {
        login: this.login,
        password: this.password
      };
      this.$store.dispatch("authInfo/login", payload).then(this.getRoles);
    },

    async getRoles(isAuth) {
      if (isAuth) {
       await this.$store.dispatch("authInfo/fetchRoles");
        this.roles = this.$store.state.authInfo.roles;
        if (this.roles.length > 1) this.openSwiper();
        else if (this.roles.length === 1) {
          this.selectRoleHandler(this.roles[0].url);
        }

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

   async selectRoleHandler(role) {
      if (
       await this.$store.dispatch(
          "authInfo/selectRole",
          this.roles.find(elem => elem.url === role).ID
        )
      ) {
        await this.$router.push("/" + role);
      }
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

.login_title {
  @include text_16-22_medium;
}

.panels {
  height: calc(100vh - #{$tab_panel_height});
}
</style>