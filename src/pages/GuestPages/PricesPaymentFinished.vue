<template>
  <div  :class="$style.container" class="flex column" >
    <div v-if="type==='installment'"  :class="$style.wrap" class="flex column">
      <UiIcon
        :color-inheritance="false"
        name="hand_ok"
        :em-size="false"
      />
      <span :class="$style.icon_message"
        >Заявка принята</span
      >
      <span :class="$style.welcoming_text"
      >В ближайшее время с вами свяжется администратор</span
      >
    </div>
    <div v-else :class="$style.wrap" class="flex column">
      <UiIcon
        :color-inheritance="false"
        name="creditcard"
        :em-size="false"
      />
      <span :class="$style.icon_message"
      >Платёж принят. Спасибо за покупку!</span
      >
    </div>

    <div :class="$style.wrap" class="flex column">
      <span :class="$style.welcoming_text"
        >Начнём пользоваться супер-приложением автошколы «Формула»</span
      >
      <UiButton @click="toRegisterButtonHandler" fluid theme="background-brand">
        Регистрация
      </UiButton>

    </div>
    <span :class="$style.reminder"
    >Если планируете зарегистрироваться позже, используйте почту, указанную
        в оплате</span
    >
  </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";
import UiButton from "../../components/UiButton";

export default {
  name: "PricesPaymentFinished",
  components: {
    UiIcon,
    UiButton
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    toRegisterButtonHandler() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style lang="scss" module>
//$
.container {
  height: 100vh;
  text-align: center;
}
.wrap {
  overflow: hidden;
  align-items: center;
  text-align: center;
  padding: 55px 16px 0;
}
.icon_message {
  @include title-big_30-38_bold;
  margin-top: 32px;
}
.welcoming_text {
  @include text_16-22_medium;
  margin-bottom: 16px;
  margin-top: 8px;
}
.reminder {
  @include signature_12-16_semibold;
  margin: auto 16px 100px;
}
</style>
