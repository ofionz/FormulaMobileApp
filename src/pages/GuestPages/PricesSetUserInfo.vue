<template>
  <div>
    <div class="flex column">
      <ui-page-title
        :class="$style.title"
        @backward="backward"
        title="Данные покупателя"
      >
      </ui-page-title>

      <div class="q-mr-md q-ml-md" :class="$style.registerForm">
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
          :rules="[val => val.length || 'Введите почту']"
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
               Аккаунт в приложении будет привязан к почте, на неё отправим чек об оплате
              </span>
          </template>
        </q-input>

        <UiCheckbox @change="(val)=>this.license=val" class="q-mt-xl q-mb-lg"
        ><span :class="$style.checkbox_label"
        >Я согласен на обработку моих персональных данных</span
        ></UiCheckbox
        >


          <UiButton @click="nextButtonHandler" class="q-mt-xl" fluid theme="background-brand">
            Выбрать филиал
          </UiButton>
          <UiButton @click="skipNextStep" fluid theme="outline-brand" :class="$style.btn_later">
            Выберу позже
          </UiButton>

      </div>





    </div>
  </div>
</template>

<script>
import UiButton from "../../components/UiButton";
import UiCheckbox from '../../components/UiCheckbox';
import UiPageTitle from '../../components/UiPageTitle';

export default {
  name: "Details",
  components: {
    UiPageTitle,
    UiButton,
    UiCheckbox
  },

  data() {
    return {
      maskVisible: false,
      license: false,
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
    backward(){
      this.$router.go(-1)
    },
    nextButtonHandler(){
      this.$router.push({name: 'set_department'})
    },
    skipNextStep(){
      this.$store.commit('registerUserInfo/setUserDepartment', '');
      this.$router.push({name: 'confirm_payment'})
    }
  },

};
</script>

<style lang="scss" module>
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
