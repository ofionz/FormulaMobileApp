<template>
  <div :class="$style.cabinet_wrap">
    <div class="text-white" :class="$style.cabinet_header">
      <div class="flex q-mb-md" :class="$style.instructor_wrap">
        <div class="q-mr-md flex column" :class="$style.avatar_wrap">
        <q-avatar size="86px" :class="$style.avatar" >
          <img :src="avatar" />
        </q-avatar>
          <!--<span :class="$style.avatar_money">{{'14001'|withCurrencySymbol}}</span>-->
        </div>
        <div class="flex column">
          <span class="q-mb-xs" :class="$style.instructor_name">
            {{ lastName }} {{ name }}
          </span>

          <!--<span :class="$style.instructor_description">-->
          <!--  Старший инструктор,-->
          <!--  стаж 2 года,-->
          <!--  118 учеников обучено,-->
          <!--  71% сдача автодрома,-->
          <!--  69% сдача города.-->
          <!--</span>-->
          <span v-if="auto" class="q-mt-sm" :class="$style.instructor_car">
            {{ auto.name }}
            </span>
          <span  :class="$style.car_number__wrap">
              <span :class="$style.car_number">
                <span :class="$style.car_number__letter">  {{ auto.number.substr(0,1).toUpperCase()}}</span>
                  {{ auto.number.substr(1,3)}}
                <span :class="$style.car_number__letter">{{ auto.number.substr(4,2).toUpperCase()}}</span>&nbsp;
               {{ auto.number.substr(6,3)}}
              </span>
          </span>
        </div>
      </div>
    </div>

    <div class="flex column">
      <div :class="$style.body_header">
        <span @click="openPopupEdit" :class="$style.link"
          >Редактировать данные</span
        >
      </div>

      <ul :class="$style.body_ul">
        <li    @click="$router.push({  name: 'knd'})" class="flex" :class="$style.body_li">
          КНД
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>

        <li class="flex"  @click="$router.push({  name: 'changePassword'})" :class="$style.body_li">
          Сменить пароль
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>


        <!--<li-->
        <!--  class="flex"-->
        <!--  :class="$style.body_li"-->
        <!--  @click="$router.push({ name: 'history' })"-->
        <!--&gt;-->
        <!--  История уведомлений-->
        <!--  <UiIcon-->
        <!--    :class="$style.body_icon"-->
        <!--    :color-inheritance="true"-->
        <!--    :em-size="false"-->
        <!--    name="arrow"-->
        <!--  />-->
        <!--</li>-->
        <!--<li class="flex" :class="$style.body_li">-->
        <!--  Сменить роль-->
        <!--  <UiIcon-->
        <!--    :class="$style.body_icon"-->
        <!--    :color-inheritance="true"-->
        <!--    :em-size="false"-->
        <!--    name="arrow"-->
        <!--  />-->
        <!--</li>-->
      </ul>

      <div :class="$style.exit">
        <span @click="logoutHandler()" :class="$style.link">
          Выйти
        </span>
      </div>
    </div>

    <UiPopUp @close="closePopupEdit()" :visible="isPopupEditVisible">
      <template #label>
        Редактировать данные
      </template>
      <template #content>
        <FillingInstructorInfo
          modal-mode
          @saved="closePopupEdit()"
        ></FillingInstructorInfo>
      </template>
    </UiPopUp>
  </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";
import UiPopUp from "../../components/UiPopUp";
import FillingInstructorInfo from "../InstructorPages/FillingInstructorInfo";
import withCurrencySymbol from "../../filters/money.filter";

export default {
  name: "Cabinet",
  components: {
    UiIcon,
    UiPopUp,
    FillingInstructorInfo
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
      paymentAmount: ""
    };
  },
  async created() {
    await this.$store.dispatch('instructorInfo/fetchInstructorProfile')
  },
  computed: {
    department() {
      return this.$store.state.instructorInfo.department;
    },
    avatar: {
      get() {
        return this.$store.state.instructorInfo.avatar;
      }
    },
    name: {
      get() {
        return this.$store.state.instructorInfo.name;
      }
    },
    lastName: {
      get() {
        return this.$store.state.instructorInfo.lastName;
      }
    },

    auto: {
      get() {
        return this.$store.state.instructorInfo.auto;
      }
    },

  },
  methods: {
    logoutHandler () {
      this.$store.commit('instructorInfo/resetData');
      this.$router.push('/guest/login')
    },
    closePopupEdit() {
      this.$emit("blockToggle", false);
      this.isPopupEditVisible = false;
    },
    openPopupEdit() {
      this.$emit("blockToggle", true);

      this.isPopupEditVisible = true;
    },

  }
};
</script>

<style lang="scss" module>
//$
$tab_panel_height: 200px;

.cabinet_header {
  @include gradientBrand;
  height: $tab_panel_height;
  padding: 62px 16px 24px;
  color: $colorWhite;

  .instructor_wrap {
    flex-wrap: nowrap !important;
  }
}

.instructor_name,
.body_title {
  @include title-mini_18-22_semibold;
  color: inherit;
}

.instructor_car,
.instructor_trips,
.instructor_description,
.body_header,
.body_content {
  @include signature_12-16_semibold;
  font-weight: 600;
  color: inherit;
}

.instructor_description {
  font-weight: normal;
}
.car_number__wrap {
  padding: 0 1px;

  width: fit-content;
  height: fit-content;
  background: #FFFFFF;
  border-radius: 4px;
  margin-top: 8px;
}
.car_number {
  background: #ffffff;
  border: 1px solid #333333;
  color: #333333;
  box-sizing: border-box;
  border-radius: 3px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.8px;
  padding: 0 4px;
  &__letter {
    font-weight: 700;
    font-size: 8px;
  }
}
.avatar_wrap{
  align-items: center;
}
.avatar_money {
  @include signature_12-16_semibold;
  font-weight: 600;
  color: $colorWhite;
  margin-top: 4px;
}

.body_header {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 40px;
}

.link {
  color: $colorInteractive;
  font-weight: 600;
  cursor: pointer;
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

.avatar {
  box-shadow: 0 0 0 2px $colorWhite;
}

</style>
