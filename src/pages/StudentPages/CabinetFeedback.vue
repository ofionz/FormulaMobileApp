<template>
  <div class="q-pa-md">
    <ui-page-title :class="$style.title" @backward = backward title="Обратная связь"> </ui-page-title>
      <div  :class="$style.content_wrap">
        <span  :class="$style.content"
          >Здесь вы можете описать проблему по приложению, процессу обучения,
          похвалить сотрудника, преподавателя, инструктора, пожаловаться на них.
          Предложить что-то новое. <br />
          <br />Очень ждём от вас обратной связи, любой! <br />
          <br />Сообщения обрабатывает заведующий учебной частью.</span
        >

        <q-input
          v-model="theme"
          :rules="[val => val.length || 'Введите тему']"
          label-slot
          class="input"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Тема
            </div>
          </template>
        </q-input>
        <q-input
          v-model="message"
          class="input"
          label-slot
          :rules="[val => val.length || 'Введите текст сообщения']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Текст сообщения
            </div>
          </template>
        </q-input>

        <UiCheckbox label="Отправить анонимно" @change="(val)=>this.anon=val" class="q-mt-lg q-mb-lg"
          ></UiCheckbox
        >

        <UiButton
          @click="sendtButtonHandler"
          class="q-mt-xl"
          fluid
          theme="background-brand"
        >
          Отправить
        </UiButton>
      </div>
    </div>
</template>

<script>
import UiPageTitle from "../../components/UiPageTitle";
import UiButton from "../../components/UiButton";
import UiCheckbox from "../../components/UiCheckbox";

export default {
  name: "CabinetFeedback",
  components: {
    UiButton,
    UiCheckbox,
    UiPageTitle
  },
  data() {
    return { theme: "", message: "", anon: false   };
  },
  methods: {
    backward() {
      this.$router.go(-1);
    },
    sendtButtonHandler() {

    }
  }
};
</script>
<style lang="scss" module>
//$
.title {
  margin: 38px 0 26px;
}
.checkbox_label {
  @include text_16-22_medium;
}

.content_wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
  .content {
    @include signature_12-16_semibold;
    color: $colorGray;
    margin-bottom: 32px;
  }
</style>
