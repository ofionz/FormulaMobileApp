<template>
  <div>
    <div class="flex column">
      <div class="flex" :class="$style.header">
        <UiIcon
          @click="$router.go(-1)"
          :class="$style.icon_back"
          :color-inheritance="true"
          :em-size="false"
          name="arrow"
        />
        <span :class="$style.title">В каком филиале?</span>
        <span v-if="mapMode" @click="mapMode =false" :class="$style.showMap">Список</span>
        <span v-else @click="mapMode =true" :class="$style.showMap">Карта</span>
      </div>
      <div v-if="mapMode">
      </div>
      <div v-else>
      <div v-for="(group, index) in allDepartments" :key="index" :class="$style.group_wrap">
      <span  :class="$style.group_name"
        >{{group.groupName}}</span
      >
      <ul  :class="$style.row_list">
        <li
          v-for="(department, index) in group.departments"
          :key="index"
          class="flex"
          :class="$style.row"
          @click="setDepartmentInUserInfo(department, $event)"
        >
          <span :class="$style.row_name">{{ department }}</span>
          <span v-if="department === currentdepartment" class="q-mr-md">     <UiIcon
            :class="$style.icon_checked"
            :color-inheritance="true"
            :em-size="false"
            name="check"
          />
          </span>
        </li>
      </ul>
      </div>
      </div>


      <div class="q-mr-md q-ml-md">
        <UiButton @click="nextButtonHandler" fluid theme="background-brand" :class="$style.btn_next">
        Хочу права!
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script>
import UiIcon from "../../components/UiIcon";
import UiButton from "../../components/UiButton";

export default {
  name: "Details",
  components: {
    UiIcon,
    UiButton
  },

  data() {
    return {
      allDepartments: {},
      currentdepartment:'',
      mapMode: false,
    };
  },
  mounted() {
    this.allDepartments = this.$store.state.departments.departmentsList
  },
  methods:{
    nextButtonHandler(){
      this.$store.commit('registerUserInfo/setUserDepartment', department)
    },
    setDepartmentInUserInfo(department){
    this.currentdepartment = department;

    }
  }
};
</script>

<style lang="scss" module>
//$
.header {
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
.icon_checked {
  transform: scale(1.7);
  color: $colorInteractive;
}

.title {
  @include title-subscreen_16-20_semibold;
}
.showMap {
  @include signature_12-16_semibold
  font-weight: 600;
  color: $colorInteractive;
  position: absolute;
  right: 16px;
}
.row_list {
  border: 0.5px solid $colorGray4;
  border-left: none;
  border-right: none;
  padding: 0 0 0 16px;
  margin: 8px 0 0;
}

.row {
  @include text_16-22_medium;
  list-style-type: none;
  padding: 11px 0;
  justify-content: space-between;
}

.row:not(:last-child) {
  border-bottom: 0.5px solid $colorGray4;
}

.group_name {
  @include signature_12-16_semibold;
  color: $colorGray;
  padding: 0px 16px;
}
.group_wrap{
  margin-bottom: 32px;
}
.btn_next {
  margin-top: 56px;
  margin-bottom: 80px;
}

</style>
