<template>
  <div>
    <div class="flex column desktop_container">
      <ui-page-title
        :class="$style.title"
        @backward="backward"
        title="Данные покупателя"
      >
      </ui-page-title>

      <div
        class="q-mr-md q-ml-md"
        :class="$style.registerForm"
      >
        <q-input
          v-model="name"
          ref='clientname'
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
          v-model="lastName"
          ref='clientlastName'
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
          ref='clientphone'
          unmasked-value
          fill-mask
          type="tel"
          class="input"
          mask="+7(###) ### - ####"
          :rules="[val => val.length>9 || 'Введите номер телефона', isValidPhone]"
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
               Аккаунт в приложении будет привязан к телефону
              </span>
          </template>
        </q-input>
        <q-input
          v-model="email"
          type="email"
          ref='clientmail'
          label-slot
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

        <UiCheckbox
          @change="(val)=>this.license=val"
          label="Я согласен на обработку моих персональных данных"
          :rules="[val => val===true || 'Необходимо подтвердить согласие на обработку персональных данных']"
          :checked='this.license'
          ref='license'
          class="q-mt-xl q-mb-lg"
        ><span
          :class="$style.checkbox_label"
        >Я согласен на обработку моих персональных данных</span
        ></UiCheckbox
        >


        <UiButton
          @click="nextButtonHandler"
          class="q-mt-xl"
          fluid
          theme="background-brand"
        >
          Выбрать филиал
        </UiButton>
        <!--<UiButton-->
        <!--  @click="skipNextStep"-->
        <!--  fluid-->
        <!--  theme="outline-brand"-->
        <!--  :class="$style.btn_later"-->
        <!--&gt;-->
        <!--  Выберу позже-->
        <!--</UiButton>-->

      </div>


    </div>
  </div>
</template>

<script>
  import UiButton from '../../components/UiButton';
  import UiCheckbox from '../../components/UiCheckbox';
  import UiPageTitle from '../../components/UiPageTitle';

  export default {
    name: 'Details',
    components: {
      UiPageTitle,
      UiButton,
      UiCheckbox,
    },

    computed: {

      license: {
        get() {
          return this.$store.state.registerUserInfo.license;
        },
        set(value) {

          this.$store.commit('registerUserInfo/setLicense', value);
        },
      },
      name: {
        get() {
          return this.$store.state.registerUserInfo.name;
        },
        set(value) {
          this.$store.commit('registerUserInfo/setName', value);
        },
      },
      lastName: {
        get() {
          return this.$store.state.registerUserInfo.lastName;
        },
        set(value) {
          this.$store.commit('registerUserInfo/setLastName', value);
        },
      },
      phone: {
        get() {
          return this.$store.state.registerUserInfo.phone;
        },
        set(value) {
          this.$store.commit('registerUserInfo/setPhone', value);
        },
      },
      email: {
        get() {
          return this.$store.state.registerUserInfo.email;
        },
        set(value) {
          this.$store.commit('registerUserInfo/setEmail', value);
        },
      },

    },


    methods: {
      isValidEmail () {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(this.email) || 'Проверьте правильность ввода почты';
      },
      backward() {
        if (!this.$store.state.registerUserInfo.tariffId) {
          this.$router.push({ name: 'prices' });
        } else this.$router.push({
          name: 'details',
          params: { id: this.$store.state.registerUserInfo.tariffId },
        });
        this.$store.commit('registerUserInfo/setTariffId', '');
      },
      isValidPhone() {
        const phonePattern = /^9/;
        return phonePattern.test(this.phone) || 'Проверьте правильность ввода номера телефона';
      },
      isFormValid() {


        return !(!this.$refs.license.validate()
          | !this.$refs.clientname.validate()
          | !this.$refs.clientlastName.validate()
          | !this.$refs.clientphone.validate()
          | !this.$refs.clientmail.validate())
          ;
      },

      nextButtonHandler() {

        if (this.isFormValid()) {
          this.$router.push({ name: 'set_department' });
        }
      },
      skipNextStep() {
        if (this.isFormValid()) {
          this.$store.commit('registerUserInfo/setUserDepartment', '');
          this.$router.push({ name: 'confirm_payment' });
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

  .title {
    margin: 58px 16px 40px;
  }

  .title_wrap {
    @include title-subscreen_16-20_semibold;
    padding: 23px 16px 60px;
    color: $colorBlack;
    justify-content: center;
    position: relative;
  }

  .icon_back {
    position: absolute;
    left: 16px;
    transform: scale(0.9);
  }

  .title {
    @include title-subscreen_16-20_semibold;
  }

  .checkbox_label,
  {
    @include text_16-22_medium;
  }

  .btn_later {
    margin-top: 16px;
    margin-bottom: 120px;
  }

  .registerForm {
    display: flex;
    flex-direction: column;
    height: 100%;
  }


</style>
