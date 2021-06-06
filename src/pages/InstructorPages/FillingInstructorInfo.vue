<template>
  <div :class="[modalMode?'':$style.container]" class="flex column">
    <span v-if="!modalMode" class="q-mt-lg" :class="$style.title">
      Заполним данные для карточки инструктора </span
    >
    <div v-if="!isPhotoSeted" class="flex" :class="$style.photo_wrap">
      <q-avatar size="86px" class="q-mr-md">
        <img src="../../assets/emptyavatar.png" />
      </q-avatar>
      <div class=" flex column">
        <span :class="$style.photo_label">Фото</span>
        <span class="q-mt-sm" :class="$style.photo_description"
          >К карточке  обязательно нужно привязать фотографию</span
        >
        <div class="q-mt-sm">
          <span
            @click="getPhotoFromCamera"
            class="q-mr-md"
            :class="$style.photo_buttons"
            >Сделать селфи
          </span>
          <span @click="getPhotoFromGallery" :class="$style.photo_buttons"
            >Выбрать фото
          </span>
        </div>
      </div>
    </div>
    <div v-else :class="$style.photo_wrap" class="flex">
      <q-avatar :class="$style.photo" size="86px" class="q-mr-md">
        <img :src="data.avatar" />
      </q-avatar>

      <div class="flex column">
        <span :class="$style.photo_label">Фото</span>
        <div class="flex column">
          <span
            @click="getPhotoFromCamera"
            class="q-mt-sm"
            :class="$style.photo_buttons"
            >Сделать новое селфи
          </span>
          <span
            @click="getPhotoFromGallery"
            class="q-mt-sm"
            :class="$style.photo_buttons"
            >Выбрать другое фото
          </span>
        </div>
      </div>
    </div>
    <div class="q-mt-lg" :class="$style.registerForm">
      <q-input
        v-model="data.name"
        :rules="[val => val.length || 'Введите имя']"
        label-slot
        class="input"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Имя
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.surname"
        class="input"
        label-slot
        :rules="[val => val.length || 'Введите фамилию']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Фамилия
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.phone"
        label-slot
        type="tel"
        class="input"
        @focusin="maskVisible = true"
        :fill-mask="maskVisible"
        mask="+7(###) ### - ## - ##"
        :rules="[val => val.length || 'Введите телефон']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Телефон
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.email"
        type="email"
        label-slot
        class="input"
        :rules="[val => val.length || 'Введите почту']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Почта
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.birthDate"
        :rules="[val => val.length || 'Введите дату рождения']"
        label-slot
        class="input"
        fill-mask
        mask="##.##.####"
      >
        <template v-slot:label>
          <div  class="row items-center all-pointer-events input_label">
            Дата рождения
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.passportNumber"
        class="input"
        label-slot
        fill-mask
        mask="## ## ######"
        :rules="[val => val.length || 'Введите серию и номер паспорта']"
      >
        <template v-slot:label>
          <div id = "test" class="row items-center all-pointer-events input_label">
            Серия и номер паспорта
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.passportDate"
        label-slot
        class="input"
        fill-mask
        mask="##.##.####"
        :rules="[val => val.length || 'Введите дату выдачи паспорта']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Дата выдачи паспорта
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.passportPlace"
        label-slot
        class="input"
        :rules="[val => val.length || 'Введите место выдачаи паспорта']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Кем выдан
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.passportCode"
        label-slot
        class="input"
        :rules="[val => val.length || 'Введите код подразделения']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Код подразделения
          </div>
        </template>
      </q-input>
      <q-input
        v-model="data.passportAddress"
        label-slot
        class="input"
        :rules="[val => val.length || 'Введите адрес регистрации']"
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events input_label">
            Адрес регистрации, как в паспорте
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

    <UiPopup @close="closeSwiper" :visible="isSliderVisible">
      <template #content>
        <ui-cropper
          class="q-mt-lg q-pt-sm"
          :upload-handler="cropperHandler"
          :photo="imageSrc"
          @submit="closeSwiper"
          @cancel="closeSwiper"
          :output-options="outoptions"
          :output-quality="0.7"
          :cropper-options="{
            aspectRatio: 1,
            guides: false,
            center: false,
            movable: false,
            zoomable: false,
            viewMode: 3
          }"
        >
        </ui-cropper>
      </template>
    </UiPopup>
  </div>
</template>

<script>
import Vue from 'vue';
import UiCropper from "../../components/UiCropper";
import UiPopup from "../../components/UiPopUp";
import UiButton from "../../components/UiButton";

export default {
  name: "FillingStudentInfo",
  components: {
    UiCropper,
    UiPopup,
    UiButton
  },
  props: {
    modalMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imageSrc: "",
      isPhotoSeted: undefined,
      maskVisible: false,
      isSliderVisible: false,
      outoptions: { width: 33, height: 33 },
      data : {
        avatar:'',
        name:'',
        surname:'',
        phone:'',
        email:'',
        birthDate:'',
        passportNumber:'',
        passportDate:'',
        passportPlace:'',
        passportCode:'',
        passportAddress:''
      }
    };
  },
  async created() {
    await this.$store.dispatch("instructorInfo/fetchInstructorProfile");
    this.data = JSON.parse(JSON.stringify(this.$store.state.instructorInfo));
    this.isPhotoSeted = Boolean(this.data.avatar);
  },



  methods: {
    getPhotoFromCamera() {
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.openSwiper();
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          destinationType: 0,
          correctOrientation: true,
          sourceType: 1,
          cameraDirection: 1
        }
      );
    },
    getPhotoFromGallery() {

      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.openCropper();
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: 0,
          correctOrientation: true,
          allowEdit: true
        }
      );
    },

    cropperHandler(cropper) {
      this.data.avatar = cropper
        .getCroppedCanvas()
        .toDataURL(this.cropperOutputMime);
      this.imageSrc = undefined;
      this.isPhotoSeted = true;
    },
    closeSwiper() {
      this.$emit("blockToggle", false);
      this.isSliderVisible = false;
    },
    openSwiper() {
      this.$emit("blockToggle", true);
      this.isSliderVisible = true;
    },
   async saveButtonHandler() {


     if ( await   this.$store.dispatch("instructorInfo/saveInstructorProfile", this.data)) {
       Vue.prototype.$eventBus.$emit("error", {
         header: "",
         text: "Успешно сохранено"
       });
       this.$emit("saved");
     }
    }
  }
};
</script>

<style lang="scss" module>
//$

.title {
  @include title_20-24_bold;
}
  .photo{
  box-shadow: 0 0 0 2px $colorWhite;

}
  .container {
    padding: 16px;
  }
.photo_buttons {
  @include signature_12-16_semibold;
  font-weight: 600;
  color: $colorInteractive;
}
.photo_wrap {
  flex-wrap: nowrap;
  margin-top: 32px;
}
.photo_description {
  @include signature_12-16_semibold;
  color: $colorGray;
}
.photo_label {
  @include text_16-22_medium;
}
.btn_save {
  margin-bottom: 80px;
  margin-top: 32px;
}
</style>
