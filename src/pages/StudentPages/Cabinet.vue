<template>
  <div>
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
          :class="$style.avatar"
          class="q-mr-md"
        >
          <img :src="avatar" />
        </q-avatar>

        <div
          class="flex column"
          :class="$style.student_info"
        >
          <span
            class="q-mb-xs"
            :class="$style.student_name"
          >
            {{lastName}} {{name}}
          </span>

          <span :class="$style.student_department">
            {{department}} <br />
            {{tariff}},  №{{deal_number}}
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
          {{lessonsLeft}}
        </span>
        <span
          v-if="instructor"
          :class="$style.instructor"
        >
              Инструктор: {{instructor.full_name}}
        </span>
        <span
          v-else
          :class="$style.instructor"
        >
                Инструктор не назначен

        </span>
      </div>
    </div>

    <div class="flex column desktop_container">
      <div :class="$style.body_header">
        <div
          v-if="debt>0"
          :class="$style.debt_wrap"
        >
          <span class="q-mr-sm">Долг: {{debt|withCurrencySymbol}}</span>
          <span
            :class="$style.link"
            @click="openPopup"
          >Оплатить</span>
        </div>

        <div
          v-else
          :class="$style.debt_wrap"
        >
          <span class="q-mr-sm">Задолженности нет</span>

        </div>


        <span
          @click="openPopupEdit"
          :class="$style.link"
        >Редактировать данные</span>
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
          <span
            @click="openPopupTimeline"
            :class="$style.link"
          >Подробнее</span>
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
          @click="$router.push({name: 'faq'})"
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
          @click="$router.push({name: 'feedback'})"
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
          @click="$router.push({name: 'history'})"
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

      <div
        :class="$style.admin"
        v-if="assigned"
      ><span>{{assigned.full_name}}</span>

        <span v-if="assigned.phone">{{assigned.phone}}</span>
        <a
          :href="'tel:'+assigned.phone"
          v-if="assigned.phone"
          :class="$style.admin_button"
        >
          <UiButton theme="outline-brand">Позвонить</UiButton>
        </a></div>

      <div :class="$style.exit">
        <span
          @click="$router.push('/guest/login')"
          :class="$style.link"
        > Выйти из аккаунта </span>
      </div>


    </div>
    <UiPopUp
      @close="closePopup"
      :visible="isPopupVisible"
    >
      <template #label>
        <div class="q-mb-lg">Долг {{debt|withCurrencySymbol}}</div>
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
          :rules="[val => val.length || 'Сумма не введена', val => val>1000|| 'Сумма не может быть меньше 1000 руб.']"
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
          @click="payButtonHandler"
          fluid
          theme="background-brand"
          :class="$style.btn_pay"
        >
          Оплатить
        </UiButton>
      </template>
    </UiPopUp>
    <UiPopUp
      @close="closePopupTimeline"
      :visible="isPopupTimelineVisible"
    >
      <template #label>
        Процесс обучения
      </template>
      <template #content>
        <UiTimeline
          :completed='timeline.completed'
          :current="timeline.current"
          :futures="timeline.futures"
        />
      </template>
    </UiPopUp>
    <UiPopUp
      @close="closePopupEdit"
      :visible="isPopupEditVisible"
    >
      <template #label>
        Редактировать данные
      </template>
      <template #content>
        <FillingStudentInfo
          modal-mode
          @saved="closePopupEdit"
        ></FillingStudentInfo>
      </template>
    </UiPopUp>
  </div>
</template>

<script>
  import UiIcon from '../../components/UiIcon';
  import UiPopUp from '../../components/UiPopUp';
  import UiTimeline from '../../components/UiTimeline';
  import UiButton from '../../components/UiButton';
  import FillingStudentInfo from './FillingStudentInfo';
  import withCurrencySymbol from '../../filters/money.filter';

  export default {
    name: 'Cabinet',
    components: {
      UiIcon,
      UiPopUp,
      UiButton,
      UiTimeline,
      FillingStudentInfo,
    },
    filters: {
      withCurrencySymbol,
    },
    data() {
      return {
        timeline: {},
        isPopupTimelineVisible: false,
        isPopupEditVisible: false,
        isPopupVisible: false,
        paymentAmount: '',
      };
    },
    async created() {
      await this.$store.dispatch('studentInfo/fetchStudentProfile');
    },
    computed: {
      department() {
        return this.$store.state.studentInfo.department;
      },
      deal_number() {
        return this.$store.state.studentInfo.deal_number;
      },
      avatar: {
        get() {
          return this.$store.state.studentInfo.avatar;
        },
        set(value) {
          this.$store.commit('studentInfo/setAvatar', value);
        },
      },
      name: {
        get() {
          return this.$store.state.studentInfo.name;
        },
        set(value) {
          this.$store.commit('studentInfo/setName', value);
        },
      },
      lastName: {
        get() {
          return this.$store.state.studentInfo.lastName;
        },
        set(value) {
          this.$store.commit('studentInfo/setLastName', value);
        },
      },
      phone: {
        get() {
          return this.$store.state.studentInfo.phone;
        },
        set(value) {
          this.$store.commit('studentInfo/setPhone', value);
        },
      },
      email: {
        get() {
          return this.$store.state.studentInfo.email;
        },
        set(value) {
          this.$store.commit('studentInfo/setEmail', value);
        },
      },
      birthDate: {
        get() {
          return this.$store.state.studentInfo.birthDate;
        },
        set(value) {
          this.$store.commit('studentInfo/setBirthDate', value);
        },
      },
      passportNumber: {
        get() {
          return this.$store.state.studentInfo.passportNumber;
        },
        set(value) {
          this.$store.commit('studentInfo/setPassportNumber', value);
        },
      },
      passportDate: {
        get() {
          return this.$store.state.studentInfo.passportDate;
        },
        set(value) {
          this.$store.commit('studentInfo/setPassportDate', value);
        },
      },
      passportPlace: {
        get() {
          return this.$store.state.studentInfo.passportPlace;
        },
        set(value) {
          this.$store.commit('studentInfo/setPassportPlace', value);
        },
      },
      passportCode: {
        get() {
          return this.$store.state.studentInfo.passportCode;
        },
        set(value) {
          this.$store.commit('studentInfo/setPassportCode', value);
        },
      },
      passportAddress: {
        get() {
          return this.$store.state.studentInfo.passportAddress;
        },
        set(value) {
          this.$store.commit('studentInfo/setPassportAddress', value);
        },
      },
      debt: {
        get() {
          return this.$store.state.studentInfo.debt;
        },
      },
      instructor: {
        get() {
          return this.$store.state.studentInfo.instructor;
        },
      },
      assigned: {
        get() {
          return this.$store.state.studentInfo.assigned;
        },
      },

      lessonsLeft: {
        get() {
          return this.$store.state.studentInfo.lessonsLeft;
        },
      },
      tariff: {
        get() {
          return this.$store.state.studentInfo.tariff;
        },
      },
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
      closePopupEdit() {
        this.$emit('blockToggle', false);
        this.isPopupEditVisible = false;
      },
      openPopupEdit() {
        this.$emit('blockToggle', true);
        this.isPopupEditVisible = true;
      },
      closePopupTimeline() {
        this.$emit('blockToggle', false);
        this.isPopupTimelineVisible = false;
      },
      openPopupTimeline() {
        this.$emit('blockToggle', true);
        this.timeline = this.$store.state.studentInfo.timeline;
        this.isPopupTimelineVisible = true;
      },
      payButtonHandler() {
        let parent = this;

        ipayCheckout({
            amount: this.paymentAmount,
            currency: 'RUB',
            order_number: '',
            // description: this.tariff.name,
          },
          function (paymentInfo) {
            parent.$store.dispatch('studentInfo/studentBuy', paymentInfo);
            parent.closePopup();
          },
          function (e = '') {
            Vue.prototype.$eventBus.$emit('error', {
              header: 'Ошибка оплаты',
              text: 'Произошла ошибка во время оплаты.\n' + e,
            });
          });

      },

    },
  };
</script>

<style
  lang="scss"
  module
>
  //$
  $tab_panel_height: 200px;

  .cabinet_header {
    @include gradientBrand;
    height: $tab_panel_height;
    padding: 20px 16px 0;
    color: $colorWhite;

    .student_wrap {
      flex-wrap: nowrap !important;
      width: 80%;
      @media (min-width: 1200px) {
        width: 50%;
      }
    }

    .instructor_wrap {
      width: 80%;
      @media (min-width: 1200px) {
        width: 50%;
      }
    }

    @media (min-width: 1200px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 58px 16px 0;
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
    padding: 0 16px 30px;
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

  .popup_content, .admin {
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
    padding: 42px 16px 90px;
    text-align: center;
  }

  .input_placeholder {
    @include signature_12-16_semibold;
    font-weight: 400;
  }

  .avatar {
    box-shadow: 0 0 0 2px $colorWhite;

  }

  .admin {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    padding: 0 16px;
    margin-top: 20px;
    width: 100%;

    &_button {
      margin-top: 8px;
      text-decoration: none;
      width: 100%;
    }
  }

  .btn_pay {
    margin: 32px 0 66px;
  }
</style>
