<template>

  <div :class="$style.container" class="q-px-md">
    <ui-page-title :class="$style.title" @backward="$router.go(-1)" title="Смена пароля">
    </ui-page-title>
    <div v-if="firstStep">
      <q-input
        ref="password"
        v-model="password"
        :rules="[val =>  val.length>=6 || 'Введите пароль']"
        label-slot
        type="password"
        class="input"
      >
        <template v-slot:label>
          <div
            class="row items-center all-pointer-events input_label"
          >
            Старый пароль
          </div>
        </template>
      </q-input>
      <UiButton
        @click="nextStep()"
        fluid
        theme="background-brand"
        :class="$style.btn_save"
      >
        Далее
      </UiButton>
    </div>
    <div v-else>
      <q-input
        ref="newPassword"
        v-model="newPassword"
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
        ref="newPasswordCopy"
        v-model="newPasswordCopy"
        class="input"
        label-slot
        type="password"
        :rules="[val => !!val || 'Введите пароль еще раз' , val => val === this.newPassword || 'Введённые пароли не совпадают']"
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
        @click="saveButtonHandler"
        fluid
        theme="background-brand"
        :class="$style.btn_save"
      >
        Сохранить
      </UiButton>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import UiPageTitle from "../../components/UiPageTitle";
import UiButton from "../../components/UiButton";

export default {
  name: "CabinetKND",
  components: {

    UiButton,
    UiPageTitle
  },
  data() {
    return {
      password: '',
      newPassword: '',
      newPasswordCopy: '',
      firstStep: true,

    };
  },


  methods: {
    nextStep() {
      this.$refs.password.validate();
      if (!this.$refs.password.hasError) {
        this.firstStep= false
      }

    },
    async saveButtonHandler() {
      this.$refs.newPassword.validate();
      this.$refs.newPasswordCopy.validate();
      if (!this.$refs.newPassword.hasError && !this.$refs.newPasswordCopy.hasError) {
        Vue.prototype.$eventBus.$emit("error", {
          header: "",
          text: "Успешно сохранено"
        });
        this.$router.push({name: 'instructorCabinet'})
      }



    },


  }
};
</script>

<style lang="scss" module>
//$
.title {
  margin: 54px 0 26px;
}

.container {
  margin-bottom: 90px;
}




.btn_save {
  margin-bottom: 80px;
  margin-top: 18px;
}
</style>
