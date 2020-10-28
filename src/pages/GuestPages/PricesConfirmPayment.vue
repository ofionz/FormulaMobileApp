<template>
  <div>
    <div class="flex column">
      <div class="flex column" :class="$style.title_wrapper">
        <div class="flex" :class="$style.title_wrap">
          <UiIcon
            @click="backward"
            :class="$style.icon_back"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
          <span :class="$style.title">Оплата</span>
        </div>
        <span v-if="tariff" :class="$style.total"
          >{{ tariff.groupName }}, пакет {{ tariff.name }}, {{ department }}.
          Цена: {{ tariff.price }}</span
        >
      </div>

      <div class="q-mr-md q-ml-md" :class="$style.registerForm">
        <div :class="$style.registerForm_header">
          <span :class="$style.registerForm_buyer">
            Покупатель
          </span>
          <span @click="backToEdit" :class="$style.registerForm_edit">
            Изменить данные
          </span>
        </div>

        <q-input v-model="name" label-slot readonly class="input">
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Имя
            </div>
          </template>
        </q-input>
        <q-input readonly v-model="surname" class="input" label-slot>
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Фамилия
            </div>
          </template>
        </q-input>
        <q-input
          readonly
          v-model="phone"
          label-slot
          type="tel"
          class="input"
          @focusin="maskVisible = true"
          :fill-mask="maskVisible"
          mask="+7(###) ### - ## - ##"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Телефон
            </div>
          </template>
        </q-input>
        <q-input readonly v-model="email" type="email" label-slot class="input">
          <template v-slot:label>
            <div class="row items-center all-pointer-events input_label">
              Почта
            </div>
          </template>
        </q-input>

        <UiCheckbox class="q-mt-xs q-mb-md"
          ><span :class="$style.checkbox_label"
            >Покупаю в подарок</span
          ></UiCheckbox
        >
      </div>
    </div>

    <div :class="$style.to_pay" class="flex column q-mt-lg q-pa-md">
      <div v-if="installmentPaymentAmount" class="flex">
        <span :class="$style.to_pay_label">К оплате с рассрочкой: </span>

        <span :class="$style.to_pay_price">{{ installmentPaymentAmount }}</span>
      </div>
      <div v-else class="flex">
        <span :class="$style.to_pay_label"> К оплате: </span>
        <span v-if="tariff" :class="$style.to_pay_price">{{ tariff.price }}</span>
      </div>

      <div :class="$style.to_pay_block" class="flex column">
        <span
          v-if="!installmentPaymentAmount"
          :class="$style.to_pay_installments"
          >Можно оплатить в рассрочку, первый взнос от 1000 ₽</span
        >
        <span
          v-if="installmentPaymentAmount"
          @click="cancelInstallment"
          :class="$style.to_pay_installments_btn"
          >Отменить рассрочку
        </span>
        <span v-else @click="openPopup" :class="$style.to_pay_installments_btn"
          >Применить рассрочку
        </span>
      </div>

      <UiButton
        @click="nextButtonHandler"
        class=" q-mt-lg "
        fluid
        theme="background-brand"
      >
        Оплатить картой
      </UiButton>
      <span :class="$style.to_pay_later">Оплатить в филиале</span>
    </div>

    <UiPopUp @close="closePopup" :visible="isPopupVisible">
      <template #label>
        <div class="q-mb-sm">Рассрочка</div>
      </template>
      <template #content>
        <q-input
          v-model="installmentPaymentAmount"
          label-slot
          type="number"
          class="input"
          bottom-slots
          :rules="[val => val.length || 'Сумма не введена',
          val => val > 1000 || 'Сумма меньше 1000 руб']"
        >
          <template v-slot:label>
            <div
              class="row items-center all-pointer-events input_label"
              :class="$style.input_placeholder"
            >
              Введите сумму первого взноса
            </div>
          </template>
          <template v-slot:hint>
            <div
              class="row items-center all-pointer-events"
              :class="$style.input_placeholder"
            >
              Не меньше 1000 ₽
            </div>
          </template>
        </q-input>
        <span class="q-mb-lg q-mt-xl" :class="$style.popup_content">
          Рассрочка предоставляется от автошколы, без привлечения банков, на
          весь период обучения. Сумму следующих взносов с вами согласует
          администратор.</span
        >
        <UiButton
          @click="setInstallment"
          fluid
          theme="background-brand"
          class="q-mb-xl"
        >
          Отлично
        </UiButton>
      </template>
    </UiPopUp>
  </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";
import UiButton from "../../components/UiButton";
import UiCheckbox from "../../components/UiCheckbox";
import UiPopUp from "../../components/UiPopUp";

export default {
  name: "Details",
  components: {
    UiIcon,
    UiButton,
    UiCheckbox,
    UiPopUp
  },

  data() {
    return {
      tariff: {},
      maskVisible: false,
      isPopupVisible: false,
      installmentPaymentAmount: ""
    };
  },

  computed: {
    name() {
      return this.$store.state.registerUserInfo.name;
    },
    surname() {
      return this.$store.state.registerUserInfo.surname;
    },
    phone() {
      return this.$store.state.registerUserInfo.phone;
    },
    email() {
      return this.$store.state.registerUserInfo.email;
    },
    department() {
      return this.$store.state.registerUserInfo.department;
    },
    firstPayment: {
      get() {
        return this.$store.state.registerUserInfo.firstPayment;
      },
      set(value) {
        this.$store.commit("registerUserInfo/setFirstPayment", value);
      }
    }
  },
  mounted() {
    const id = this.$store.state.registerUserInfo.tariffId;
    if (!id) this.$router.push({ name: "prices" });
    this.tariff = this.$store.getters["prices/getTariffById"](id);
    this.firstPayment = this.tariff?.price;
  },
  methods: {
    backward() {
      this.$router.push({ name: "set_department"});
    },
    backToEdit() {
      this.$router.push({ name: "set_user_info"});
    },
    nextButtonHandler() {
      if(this.installmentPaymentAmount)
      this.$router.push({ name: "payment_finished", params: {type: 'installment'}});
      else this.$router.push({ name: "payment_finished", params: {type: 'paid'}});
    },
    cancelInstallment() {
      this.firstPayment = this.tariff.price;
      this.installmentPaymentAmount = "";
    },
    setInstallment() {
      this.firstPayment = this.installmentPaymentAmount;
      this.closePopup();
    },
    closePopup() {
      this.$emit("blockToggle", false);
      this.isPopupVisible = false;
    },
    openPopup() {
      this.$emit("blockToggle", true);
      this.isPopupVisible = true;
    }
  }
};
</script>

<style lang="scss" module>
//$
.title_wrapper {
  @include title-subscreen_16-20_semibold;
  padding: 23px 16px 60px;
  color: $colorBlack;
}
.title_wrap {
  justify-content: center;
  position: relative;
}

.total {
  @include title_20-24_bold;
  margin-top: 30px;
  align-self: center;
}

.registerForm_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.registerForm_edit,
.to_pay_later {
  @include signature_12-16_semibold;
  font-weight: 600;
  color: $colorInteractive;
}

.registerForm_buyer {
  @include title_20-24_bold;
}

.icon_back {
  position: absolute;
  left: 0;
  transform: scale(0.9);
}

.title {
  @include title-subscreen_16-20_semibold;
}

.checkbox_label,
.to_pay_label,
.popup_content {
  @include text_16-22_medium;
}

.input_placeholder {
  @include signature_12-16_semibold;
  font-weight: 400;
  color: $colorGray;
}

.btn_later {
  margin-top: 16px;
  margin-bottom: 80px;
}

.registerForm {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.to_pay {
  background-color: $colorGray2;
  border-top: 5px solid #333333;
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAYAAAC3OK7NAAAAUElEQVQIW3WOQQ7AIAgEF2zV/3+2FQUkHoxp0rnOLIHwoUl3NUPNN4ho23R2bxOXPmDmGKq4Eu94TSzM0zo05AkzoZaMxDEIGZGsK3+UeGMCR/QnxDOhJnAAAAAASUVORK5CYII=")
    50 0 round round;
  border-image-outset: 4px;
  justify-content: space-between;
  &_later {
    margin: 30px auto 100px;
  }
  &_block {
    text-align: end;
  }

  &_price {
    @include title-mini_18-22_semibold;
    margin-left: auto;
    margin-right: 0;
    margin-bottom: 8px;
  }
  &_installments {
    @include signature_12-16_semibold;
    color: $colorGray;
    width: 60%;
    margin-left: auto;
    margin-right: 0;
    margin-bottom: 8px;
    &_btn {
      font-weight: 600;
      color: $colorInteractive;
      margin-bottom: 8px;
    }
  }
}
</style>