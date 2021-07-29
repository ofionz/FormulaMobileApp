<template>
  <div :class="$style.container" class="q-px-md">
    <ui-page-title :class="$style.title" @backward="$router.go(-1)" title="КНД">
    </ui-page-title>
    <div v-for="(document, index) in documents" :key="index">
      <div class="flex" :class="$style.header">
        <span :class="$style.header_text">{{ document.name }}</span>
        <UiIcon
          @click="openPopup(document)"
          :class="$style.header_icon"
          :color-inheritance="true"
          :em-size="false"
          name="photo"
        />
      </div>
      <q-input
        v-model="document.value"
        :error="
          (document.inputType === 'date' &&
            !(document.photo && document.value)) ||
            (document.inputType === 'checker' && !document.photo)
        "
        label-slot
        input-style="font-weight: 500"
        :mask="document.inputType === 'date' ? '##.##.####' : ''"
        :readonly="document.inputType === 'checker'"
        class="input"
      >
        <template v-slot:label>
          <div
            v-if="document.inputType === 'date'"
            class="row items-center all-pointer-events input_label"
          >
            Срок до
          </div>
          <div
            v-else-if="document.inputType === 'checker' && !document.photo"
            style="color: black"
            class="row items-center all-pointer-events"
          >
            Нет
          </div>
          <div
            v-else-if="document.inputType === 'checker' && document.photo"
            style="color: black"
            class="row items-center all-pointer-events"
          >
            Есть
          </div>
        </template>
      </q-input>
    </div>

    <UiPopUp @close="closePopup" :visible="isPopupVisible">
      <template #label>
        Фото
      </template>
      <template #content>
        <img
          v-if="currentDocument && currentDocument.photo"
          :class="$style.photo"
          class="q-mt-lg"
          :src="currentDocument.photo"
        />
        <UiPopUp @close="closeCropper" :visible="isCropperVisible">
          <template #label>
            Обрежьте фото
          </template>
          <template #content>
            <ui-cropper
              class="q-mt-lg q-pt-sm"
              :upload-handler="cropperHandler"
              :photo="imageSrc"
              @submit="closeCropper"
              @cancel="closeCropper"
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
        </UiPopUp>
        <div class="q-my-lg">
          <UiButton
            @click="getPhotoFromCamera"
            theme="background-brand"
            class="q-mb-md"
            >Сделать фото
          </UiButton>
          <UiButton
            @click="getPhotoFromGallery"
            theme="outline-brand"
            class="q-mb-md"
            >Выбрать из галереи
          </UiButton>
        </div>
      </template>
    </UiPopUp>
    <UiButton
      @click="saveButtonHandler"
      fluid
      theme="background-brand"
      :class="$style.btn_save"
    >
      Сохранить
    </UiButton>
  </div>
</template>

<script>
import Vue from "vue";
import UiPageTitle from "../../components/UiPageTitle";
import UiIcon from "../../components/UiIcon";
import UiPopUp from "../../components/UiPopUp";
import UiButton from "../../components/UiButton";
import UiCropper from "../../components/UiCropper";

export default {
  name: "CabinetKND",
  components: {
    UiPageTitle,
    UiIcon,
    UiPopUp,
    UiButton,
    UiCropper
  },
  data() {
    return {
      documents: [],
      currentDocument: undefined,
      imageSrc: "",
      isPopupVisible: false,
      isCropperVisible: false,
      outoptions: { width: 300, height: 300 }
    };
  },

  async created() {

    if (!this.$store.state.instructorInfo.kndDocs.length) await this.$store.dispatch("instructorInfo/fetchKndDocs");
    this.documents = JSON.parse(JSON.stringify(this.$store.state.instructorInfo.kndDocs));
  },

  methods: {
    async saveButtonHandler() {
      if (
        await this.$store.dispatch("instructorInfo/saveKndDocs", this.documents)
      )
        Vue.prototype.$eventBus.$emit("message", {
          header: "",
          text: "Успешно сохранено"
        });
    },
    getPhotoFromCamera() {

      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.openCropper();
        },
        () => {
          // on fail
          Vue.prototype.$eventBus.$emit("error", {
            header: "Error",
            text: "Could not access device camera."
          });
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
      // this.imageSrc = this.testphoto;
      // this.openCropper();
      // document.getElementsByClassName('cordova-camera-select')[0].onchange();


      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.openCropper();
        },
        () => {
          // on fail
          Vue.prototype.$eventBus.$emit("error", {
            header: "Error",
            text: "Could not access device files."
          });
        },
        {
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: 0,
          correctOrientation: true,
          allowEdit: true
        }
      );

      document.getElementsByClassName('cordova-camera-select')[0].click()
    },
    closePopup() {
      this.currentDocument = undefined;
      this.$emit("blockToggle", false);
      this.isPopupVisible = false;
    },
    openPopup(document) {
      this.currentDocument = document;
      this.$emit("blockToggle", true);
      this.isPopupVisible = true;
    },
    cropperHandler(cropper) {
      this.currentDocument.photo = cropper
        .getCroppedCanvas()
        .toDataURL(this.cropperOutputMime);
      this.imageSrc = undefined;
      this.isPhotoSeted = true;
    },
    closeCropper() {
      this.$emit("blockToggle", false);
      this.isCropperVisible = false;
    },
    openCropper() {
      this.$emit("blockToggle", true);
      this.isCropperVisible = true;
    }
  }
};
</script>

<style lang="scss" module>
//$
.title {
  margin: 54px 0 26px;
}

.container {
  margin-bottom: 90px;
}

.header {
  margin-bottom: -10px;

  &_text {
    @include signature_12-16_semibold;
  }

  &_icon {
    color: $colorInteractive;
    position: absolute;
    right: 8px;
    width: 30px;
    height: 30px;
    z-index: 1;
  }
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.btn_save {
  margin-bottom: 80px;
  margin-top: 18px;
}
</style>
