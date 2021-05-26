<template>
  <div>
    <div class="flex column">
      <div
        class="flex"
        :class="$style.title"
      >
        <UiIcon
          @click="backward"
          :class="$style.icon_back"
          :color-inheritance="true"
          :em-size="false"
          name="arrow"
        />
        <span :class="$style.header">В каком филиале?</span>
        <span
          v-if="mapMode"
          @click="mapMode = false"
          :class="$style.showMap"
        >Список</span
        >
        <span
          v-else
          @click="mapMode = true"
          :class="$style.showMap"
        >Карта</span
        >

      </div>
      <div
        v-if="mapMode"
        :class="$style.marker_wrap"
        class="flex"
      >
        <UiIcon
          :class="$style.marker"
          :color-inheritance="true"
          :em-size="false"
          name="selectedMapMarker"
        />
        <span
          :class="$style.marker_name"
          v-if="currentdepartment"
        >{{currentdepartment}}</span>
        <span
          :class="$style.marker_name"
          v-else
        >Выберите метку на карте</span>
      </div>
      <div v-if="mapMode">
        <yandex-map
          :coords.sync="currentCoords"
          :class="$style.map"
          :show-all-markers="isShowAllMarkers"
          :controls="[]"
          :settings="mapSettings"
        >
          <ymap-marker
            v-for="(department, index) in flatDepartmentsList"
            :key="index"
            @click="selectOnMap(department)"
            :marker-id="index"
            :coords="department.coords"
            :icon="(currentdepartment===department.name?regularIcon:selectedIcon)"
          />

        </yandex-map>
      </div>
      <div
        v-else
        class="q-mb-xl"
      >
        <div
          v-for="(group, index) in allDepartments"
          :key="index"
          :class="$style.group_wrap"
        >
          <span :class="$style.group_name">{{ group.groupName }}</span>
          <ul :class="$style.row_list">
            <li
              v-for="(department, index) in group.departments"
              :key="index"
              class="flex"
              :class="$style.row"
              @click="selectDepartment(department)"
            >
              <span :class="$style.row_name">{{ department.name }}</span>
              <span
                v-if="department.name === currentdepartment"
                class="q-mr-md"
              >
                <UiIcon
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

      <div>
        <UiButton
          v-if="currentdepartment"
          @click="nextButtonHandler"
          fluid
          theme="background-brand"
          :class="[mapMode ? $style.map_button : $style.list_button]"
        >
          Хочу права!
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script>
  import UiIcon from '../../components/UiIcon';
  import UiButton from '../../components/UiButton';
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';

  export default {
    name: 'Details',
    components: {
      UiIcon,
      UiButton,
      yandexMap,
      ymapMarker,
    },

    data() {
      return {
        allDepartments: {},
        flatDepartmentsList: {},
        isShowAllMarkers: true,
        currentdepartment: '',
        currentCoords: [57.154676538919546, 65.55730381664308],
        mapMode: false,
        mapSettings: {
          apiKey: '5ab84185-4b15-4ffc-9ab7-320e7770c5c4',
          lang: 'ru_RU',
          coordorder: 'latlong',
          version: '2.1',
        },
        regularIcon:
          {
            layout: 'default#image',
            imageHref: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHdpZHRoPSIzMyIgaGVpZ2h0PSI0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9kKSI+PHBhdGggZD0iTTE0LjUgMTguMjVhMy43NSAzLjc1IDAgMTEwLTcuNSAzLjc1IDMuNzUgMCAwMTAgNy41ek0xNC41IDRBMTAuNSAxMC41IDAgMDA0IDE0LjVDNCAyMi4zNzUgMTQuNSAzNCAxNC41IDM0UzI1IDIyLjM3NSAyNSAxNC41QTEwLjUgMTAuNSAwIDAwMTQuNSA0eiIgZmlsbD0iIzM0N0FEOCIvPjxjaXJjbGUgY3g9IjE0LjUiIGN5PSIxNC40OTkiIHI9IjQuNSIgZmlsbD0iI2ZmZiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgMSkiIGQ9Ik0wIDBoMzJ2NDRIMHoiLz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjMzIiBoZWlnaHQ9IjQyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
            imageSize: [50, 62],
          },
        selectedIcon: {
          layout: 'default#image',
          imageHref:
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHdpZHRoPSIyOSIgaGVpZ2h0PSIzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9kKSI+PHBhdGggZD0iTTEyLjQgMTUuNGEzIDMgMCAxMTAtNiAzIDMgMCAwMTAgNnptMC0xMS40QTguNCA4LjQgMCAwMDQgMTIuNEM0IDE4LjcgMTIuNCAyOCAxMi40IDI4czguNC05LjMgOC40LTE1LjZBOC40IDguNCAwIDAwMTIuNCA0eiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjEyLjQiIGN5PSIxMi40IiByPSIzLjYiIGZpbGw9IiMzNDdBRDgiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDEpIiBkPSJNMCAwaDI1djM1SDB6Ii8+PC9jbGlwUGF0aD48ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjAiIHk9IjAiIHdpZHRoPSIyOC44IiBoZWlnaHQ9IjM2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
          imageSize: [50, 62],
        },
      };


    },
    async mounted() {
      this.currentdepartment = this.$store.state.registerUserInfo.department;
      await this.$store.dispatch('departments/fetchBranches');
      this.allDepartments = this.$store.getters['departments/getDefaultCityDepartmentsList'];
      this.flatDepartmentsList = this.$store.getters[
        'departments/getDefaultCityFlatDepartmentsList'
        ];


    },
    methods: {
      backward() {
        this.$router.push({
          name: 'set_user_info'
        });
      },
      selectOnMap(department) {
        this.isShowAllMarkers = false;
        this.selectDepartment(department);
      },
      selectDepartment(department) {
        this.currentCoords = department.coords;
        this.currentdepartment = department.name;
        this.$store.commit('registerUserInfo/setUserDepartment', this.currentdepartment);
      },
      nextButtonHandler() {
        {
          this.$router.push({ name: 'confirm_payment' });
        }
      },
    },
  };
</script>

<style
  lang="scss"
  module
>
  //$

  .title {
    margin: 58px 16px 40px;
    color: $colorBlack;
    justify-content: center;
    position: relative;
  }

  .icon_back {
    position: absolute;
    left: 0;
    transform: scale(0.9);
  }

  .icon_checked {
    transform: scale(1.7);
    color: $colorInteractive;
  }

  .header {
    @include title-subscreen_16-20_semibold;
  }

  .showMap {
    @include signature_12-16_semibold;
    font-weight: 600;
    color: $colorInteractive;
    position: absolute;
    right: 16px;
  }

  .map {
    width: 100vw;
    height: 80vh;
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

  .group_wrap {
    margin-bottom: 32px;
  }

  .list_button {

    position: fixed;
    bottom: 90px;
    width: 90%;
    left: 50%;
    margin-left: -45%;

  }

  .marker_wrap {
    padding: 0 16px 20px;
    align-items: center;
  }

  .marker {
    margin-right: 14px;
    width: 21px;
    height: 30px;
    color: $colorInteractive;
  }

  .marker_name {
    @include text_16-22_medium;
    font-size: 17px;
  }

  .map_button {

    position: absolute;
    bottom: 90px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;

  }

</style>
