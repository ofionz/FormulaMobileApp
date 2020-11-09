<template
  ><div>
  <ui-page-title
    :class="$style.title"
    @backward="$router.go(-1)"
    title="Курсант"
  >
  </ui-page-title>
    <div class="text-white" :class="$style.cabinet_header">
      <div class="flex q-mb-md" :class="$style.student_wrap">
        <q-avatar size="86px" :class="$style.avatar" class="q-mr-md">
          <img :src="avatar" />
        </q-avatar>

        <div class="flex column" :class="$style.student_info">
          <span class="q-mb-xs" :class="$style.student_name">
            {{ surname }} {{ name }}
          </span>

          <span :class="$style.student_department">
            {{ department.name }} <br />
            «B» Стандарт, №00000000
          </span>
        </div>
      </div>

      <div class="flex" :class="$style.instructor_wrap">
        <span class="q-mr-sm" :class="$style.instructor_trips">
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
      <span class="q-mt-sm" :class="$style.link">Смотреть данные</span>
      <ul :class="$style.body_ul">
        <li class="flex" :class="$style.body_li">
          История внутр. экзаменов
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
          Расписание вождения
          <UiIcon
            :class="$style.body_icon"
            :color-inheritance="true"
            :em-size="false"
            name="arrow"
          />
        </li>

      </ul>

      <div class="q-mx-md q-mt-lg q-pt-sm">
      <q-input
        :rules="[val => val.length || 'Введите комментарий']"
        label-slot
        class="input"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Комментарий
          </div>
        </template>
      </q-input>
      <UiButton  theme="outline-brand"> Отправить</UiButton>
        <div :class="$style.records">
        <div class="flex column q-mt-lg">
          <span :class="$style.record_header">18.09.2020, инстр. Ежов Александр</span>
          <span  :class="$style.record_text">Не слушает, сидит в телефоне</span>
        </div>
        <div class="flex column q-mt-lg">
          <span :class="$style.record_header">18.09.2020, инстр. Ежов Александр</span>
          <span  :class="$style.record_text">Не слушает, сидит в телефоне</span>
        </div>
        <div class="flex column q-mt-lg">
          <span :class="$style.record_header">18.09.2020, инстр. Ежов Александр</span>
          <span  :class="$style.record_text">Не слушает, сидит в телефоне</span>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import UiButton from '../../components/UiButton';
import UiIcon from "../../components/UiIcon";
import UiPageTitle from '../../components/UiPageTitle';

export default {
  name: "DrivingStudentCabinet",
  components: { UiIcon, UiPageTitle, UiButton },
  computed: {
    department() {
      return this.$store.state.studentInfo.department;
    },
    avatar: {
      get() {
        return this.$store.state.studentInfo.avatar;
      },
      set(value) {
        this.$store.commit("studentInfo/setAvatar", value);
      }
    },
    name: {
      get() {
        return this.$store.state.studentInfo.name;
      },
      set(value) {
        this.$store.commit("studentInfo/setName", value);
      }
    },
    surname: {
      get() {
        return this.$store.state.studentInfo.surname;
      },
      set(value) {
        this.$store.commit("studentInfo/setSurname", value);
      }
    }
  }
};
</script>

<style lang="scss" module>
  //$
  $tab_panel_height: 170px;
  .title {
    margin: 54px 16px 26px;
  }
  .cabinet_header {
    @include gradientBrand;
    height: $tab_panel_height;
    padding: 28px 16px 24px;
    color: $colorWhite;
    border-radius: 14px 14px 0 0;

    .student_wrap {
      flex-wrap: nowrap !important;
    }
  }

.student_name,
 {
  @include title-mini_18-22_semibold;
  color: inherit;
}

.instructor,
.instructor_trips,
.student_department,
.record_header{
  @include signature_12-16_semibold;
  font-weight: 600;
  color: inherit;
}

.records {
  margin-bottom: 95px;
}
.record_header {
  font-weight: 400;
  color: $colorGray;
}
  .record_text{
    @include text_16-22_medium;
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

.link {
  color: $colorInteractive;
  font-weight: 600;
  cursor: pointer;
  align-self: center;
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

.avatar {
  box-shadow: 0 0 0 2px $colorWhite;
}
</style>
