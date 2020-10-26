<template>
  <div :class="$style.cabinet_wrap">
    <div
      class="text-white"
      :class="$style.cabinet_header"
    >
      <div
        class="flex q-mb-md"
        :class="$style.student_wrap"
      >
        <q-avatar
          size="86px"
          class="q-mr-md"
          :class="$style.student_avatar"
        >
          <img src="../../assets/avatar.png" />
        </q-avatar>

        <div
          class="flex column"
          :class="$style.student_info"
        >
          <span
            class="q-mb-xs"
            :class="$style.student_name"
          >
            Константиненко Константин
          </span>

          <span :class="$style.student_department">
            ул. Республики, 164/2, офис 416 <br />
            «B» Стандарт, №00000000
          </span>
        </div>
      </div>

      <div
        class="flex"
        :class="$style.instructor_wrap"
      >
        <span
          class="q-mr-sm"
          :class="$style.instructor_trips"
        >
          <UiIcon
            :class="$style.instructor_icon"
            :color-inheritance="true"
            :em-size="false"
            name="car"
          />
          6
        </span>

        <span :class="$style.instructor">
          Инструктор: Терещенко Дмитрий
        </span>
      </div>
    </div>

    <div class="flex column">
      <div :class="$style.body_header">
        <div :class="$style.debt_wrap">
          <span class="q-mr-sm">Долг: 14900</span>
          <span
            :class="$style.link"
            @click="openPopup"
          >Оплатить</span>
        </div>
        <span :class="$style.link">Редактировать данные</span>
      </div>

      <div :class="$style.body_content">
        <div
          class="flex column"
          :class="$style.next_step"
        >
          <span class="q-mb-xs">Скоро потребуется:</span>
          <span
            class="q-mb-xs"
            :class="$style.body_title"
          >Подготовить справки</span
          >
          <span :class="$style.link">Подробнее</span>
        </div>
      </div>

      <ul :class="$style.body_ul">
        <li
          class="flex"
          :class="$style.body_li"
        >
          Магазин
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
        <li
          class="flex"
          :class="$style.body_li"
        >
          Частые вопросы
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
        <li
          class="flex"
          :class="$style.body_li"
        >
          Обратная связь
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
        <li
          class="flex"
          :class="$style.body_li"
        >
          Докупить вождение
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
        <li
          class="flex"
          :class="$style.body_li"
        >
          Купить ещё пакет обучения
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
        <li
          class="flex"
          :class="$style.body_li"
        >
          История уведомлений
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>
      </ul>

      <div  :class="$style.exit">
        <span @click="$router.push('/guest/login')" :class="$style.link"> Выйти </span>
      </div>


    </div>
    <UiPopUp
      @close="closePopup"
      :visible="isPopupVisible"
    >
      <template #label>
        <div class="q-mb-lg">Долг 14 900 ₽</div>
      </template>
      <template #content>
        <span
          class="q-mb-lg"
          :class="$style.popup_content"
        >   Оплатить можно полностью, либо частично.
        Всю сумму рассрочки необходимо погасить до даты внутр. экзамена</span>
        <q-input
          v-model="paymentAmount"
          label-slot
          type="number"
          class="input"
          :rules="[val => val.length || 'Сумма не введена']"
        >
          <template v-slot:label>
            <div
              class="row items-center all-pointer-events input_label"
              :class="$style.input_placeholder"
            >
              Введите сумму
            </div>
          </template>
        </q-input>
        <UiButton
          @click="openPopup"
          fluid
          theme="background-brand"
          :class="$style.btn_pay"
        >
          Оплатить
        </UiButton>
      </template>
    </UiPopUp>

  </div>
</template>

<script>
  import UiIcon from '../../components/UiIcon';
  import UiPopUp from '../../components/UiPopUp';
  import UiButton from '../../components/UiButton';

  export default {
    name: 'Cabinet',
    components: {
      UiIcon,
      UiPopUp,
      UiButton,
    },
    data() {
      return {
        isPopupVisible: false,
        paymentAmount: "",
      };
    },
    methods: {
      closePopup() {
        this.$emit('blockToggle', false);
        this.isPopupVisible = false;
      },
      openPopup() {
        this.$emit('blockToggle', true);
        this.isPopupVisible = true;
      },

    },
  };
</script>

<style
  lang="scss"
  module
>
  //$
  $tab_panel_height: 170px;

  .cabinet_header {
    @include gradientBrand;
    height: $tab_panel_height;
    padding: 28px 16px 24px;
    color: $colorWhite;

    .student_wrap {
      flex-wrap: nowrap !important;
    }
  }

  .student_name,
  .body_title {
    @include title-mini_18-22_semibold;
    color: inherit;
  }

  .instructor,
  .instructor_trips,
  .student_department,
  .body_header,
  .body_content {
    @include signature_12-16_semibold;
    font-weight: 600;
    color: inherit;
  }

  .student_department {
    font-weight: normal;
  }

  .instructor_icon {
    color: inherit;

    & svg {
      transform: translate(4px, -3px) scale(0.6);
    }
  }

  .body_header {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px 40px;
  }

  .link {
    color: $colorInteractive;
    font-weight: 600;
    cursor: pointer;
  }

  .body_content {
    padding: 0 16px 40px;
  }

  .body_header,
  .body_content {
    font-weight: normal;
  }

  .body_ul {
    border: 0.5px solid $colorGray4;
    border-left: none;
    border-right: none;
    padding: 0 0 0 16px;
  }

  .body_li {
    @include text_16-22_medium;
    list-style-type: none;
    padding: 11px 0;
  }

  .popup_content {
    @include text_16-22_medium;
  }

  .body_icon {
    color: rgba(60, 60, 67, 0.3);
    transform: rotate(180deg) scale(0.7);
    margin: 0 16px 0 auto;
  }

  .body_li:not(:last-child) {
    border-bottom: 0.5px solid $colorGray4;
  }

  .exit {
    padding: 24px 16px 90px;
  }

  .input_placeholder {
    @include signature_12-16_semibold;
    font-weight: 400;
  }

  .btn_pay {
    margin: 32px 0 66px;
  }
</style>
