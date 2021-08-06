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
    <q-tab-panels
      v-model="tab"
      :class="$style.panels"
      class="desktop_container"
      animated
    >
      <q-tab-panel name="login">
        <div
          :class="$style.login_title"
          class="q-mb-lg q-mt-md"
        >
          Для курсантов и сотрудников
        </div>
        <q-input
          v-model="login"
          type="email"
          ref="login"
          label-slot
          bottom-slots
          class="input"
          :rules="[val => !!val || 'Введите email', isValidEmail]"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Почта
            </div>
          </template>
        </q-input>
        <q-input
          v-model="password"
          type="password"
          ref="password"
          label-slot
          class="input"
          :rules="[val => val.length >= 6 || 'Введите пароль']"
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
        <UiPopUp
          @close="closeSwiper"
          :visible="isSliderVisible"

        >
          <template #label>Под кем заходим ?</template>
          <template #content>
            <UiButton
              v-if="roles.find(role => role.url === 'teacher')"
              class="q-mt-lg"
              fluid
              theme="outline-brand"
              @click="() => openProfileSwiper('teacher')"
            >
              Преподаватель
            </UiButton>
            <UiButton
              class="q-mt-md"
              @click="() => openProfileSwiper('student')"
              fluid
              theme="outline-brand"
              v-if="roles.find(role => role.url === 'student')"
            >
              Курсант
            </UiButton>
            <UiButton
              v-if="roles.find(role => role.url === 'instructor')"
              @click="() => openProfileSwiper('instructor')"
              class="q-mt-md"
              fluid
              theme="outline-brand"
            >
              Инструктор
            </UiButton>

            <UiButton
              v-if="roles.find(role => role.url === 'examinator')"
              class="q-mt-md"
              fluid
              theme="outline-brand"
              @click="() => openProfileSwiper('examinator')"
            >
              Экзаменатор
            </UiButton>
          </template>
        </UiPopUp>

        <UiPopUp
          @close="closeSwiper"
          :visible="isProfileSliderVisible"
        >
          <template #label>Какой профиль выбираем ?</template>
          <template #content>
            <div   v-for="(profile, index) in roles.filter(role => role.type.toLowerCase() === roleType.toLowerCase()) "
                   :key="index"  class="q-mt-lg q-mb-md flex flex-center" >
              <div :class="$style.profile_button__wrap" >
            <UiButton

              fluid
              theme="outline-brand"
              @click="selectRoleHandler (profile)"
            >
              <UiIcon
                :color-inheritance="true"
                :class="$style.profile_icon"
                :name="profile.category"
              >
              </UiIcon>
              {{profile.name}}
            </UiButton>
              </div>
            </div>

          </template>
        </UiPopUp>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

  import UiButton from '../../components/UiButton';
  import UiIcon from '../../components/UiIcon';
  import UiPopUp from '../../components/UiPopUp';

  export default {
    name: 'MainLayout',
    components: {
      UiPopUp,
      UiButton,
      UiIcon,
    },
    data() {
      return {
        isSliderVisible: false,
        isProfileSliderVisible: false,
        tab: 'register',
        login: 'toster@mail.ru',
        password: '123123',
        roleType: '',
        roles: [],
      };
    },
    mounted() {
      this.$store.commit('instructorInfo/resetData');
      if (window.device) {
        StatusBar.overlaysWebView(true);
        FCM.onNotification(object => {
          this.$eventBus.$emit('error', {
            head: ' ',
            text: JSON.stringify(object),
          });
        });
      }
    },

    methods: {
      async loginButtonHandler() {
        //    const fcmToken = await FCM.getToken();
        // this.$eventBus.$emit ('error', {head:' ',text: fcmToken})
        this.$refs.login.validate();
        this.$refs.password.validate();
        if (!(this.$refs.login.hasError || this.$refs.password.hasError)) {
          let payload = {
            login: this.login,
            password: this.password,
          };

          await this.$store.dispatch('authInfo/login', payload).then(this.getRoles);
        }
      },

      async getRoles(isAuth) {

        if (isAuth) {
          this.roles = this.$store.state.authInfo.roles;

          if (this.roles.length > 1) this.openSwiper();
          else if (this.roles.length === 1) {
            this.selectRoleHandler(this.roles[0]);
          }
        }
      },

      closeSwiper() {
        this.$emit('blockToggle', false);
        this.isSliderVisible = false;
        this.isProfileSliderVisible = false;
      },

      openSwiper() {
        this.$emit('blockToggle', true);
        this.isSliderVisible = true;
      },
      openProfileSwiper(type) {
        this.roleType = type;
        if (this.roles.filter(role => role.type.toLowerCase() === this.roleType.toLowerCase()).length === 1) {
          this.selectRoleHandler(this.roles.find(role => role.type.toLowerCase() === this.roleType.toLowerCase()));
        }
        this.$emit('blockToggle', true);
        this.isProfileSliderVisible = true;

      },


      isValidPhone() {
        const phonePattern = /^9/;
        return phonePattern.test(this.phone) || 'Проверьте правильность ввода номера телефона';
      },
      isValidEmail() {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return (
          emailPattern.test(this.login) || 'Проверьте правильность ввода почты'
        );
      },

      async selectRoleHandler(profile) {

        if (
          await this.$store.dispatch(
            'authInfo/selectRole',
            profile,
          )
        ) {
          await this.$router.push('/' + profile.url);
        }
      },
    },
  };
</script>
<style
  lang="scss"
  module
>
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
  .profile_icon{
    color:#0661B2;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .profile_button__wrap {
    width: 90%;
  }
</style>
