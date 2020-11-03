<template>
  <div class="avatar-cropper">
    <div
      class="avatar-cropper-overlay"
      v-if="dataUrl"
    >
      <div class="avatar-cropper-container">
        <div class="avatar-cropper-image-container">
          <img :src="dataUrl" @load.stop="createCropper" alt ref="img" />
        </div>
        <div class="avatar-cropper-footer">

          <UiButton
            @click.stop.prevent="submit"
            fluid
            class="avatar-cropper-btn"
            theme="background-brand"
          >
            Готово
          </UiButton>
        </div>
      </div>
    </div>
    <input
      :accept="mimes"
      class="avatar-cropper-img-input"
      ref="input"
      type="file"
    />
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import UiButton from "./UiButton";
export default {
  props: {
    photo: {
      required: true
    },
    trigger: {
      type: [String, Element],
      required: false
    },
    uploadHandler: {
      type: Function
    },
    uploadUrl: {
      type: String
    },
    requestMethod: {
      type: String,
      default: "POST"
    },
    uploadHeaders: {
      type: Object
    },
    uploadFormName: {
      type: String,
      default: "file"
    },
    uploadFormData: {
      type: Object,
      default() {
        return {};
      }
    },
    cropperOptions: {
      type: Object,
      default() {
        return {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 1,
          movable: false,
          zoomable: false
        };
      }
    },
    outputOptions: {
      type: Object
    },
    outputMime: {
      type: String,
      default: null
    },
    outputQuality: {
      type: Number,
      default: 0.9
    },
    mimes: {
      type: String,
      default: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  components: { UiButton },

  data() {
    return {
      cropper: undefined,
      dataUrl: undefined,
      filename: undefined
    };
  },
  methods: {
    destroy() {
      this.cropper.destroy();
      this.$refs.input.value = "";
      this.dataUrl = undefined;
    },
    submit() {
      this.$emit("submit");
      if (this.uploadUrl) {
        this.uploadImage();
      } else if (this.uploadHandler) {
        this.uploadHandler(this.cropper);
      } else {
        this.$emit("error", "No upload handler found.", "user");
      }
      this.destroy();
    },
    cancel() {
      this.$emit("cancel");
      this.destroy();
    },
    createCropper() {
      this.cropper = new Cropper(this.$refs.img, this.cropperOptions);
    },
    uploadImage() {
      this.cropper.getCroppedCanvas(this.outputOptions).toBlob(
        blob => {
          let form = new FormData();
          let xhr = new XMLHttpRequest();
          let data = Object.assign({}, this.uploadFormData);
          xhr.withCredentials = this.withCredentials;
          for (let key in data) {
            form.append(key, data[key]);
          }
          form.append(this.uploadFormName, blob, this.filename);
          this.$emit("uploading", form, xhr);
          xhr.open(this.requestMethod, this.uploadUrl, true);
          for (let header in this.uploadHeaders) {
            xhr.setRequestHeader(header, this.uploadHeaders[header]);
          }
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              let response = "";
              try {
                response = JSON.parse(xhr.responseText);
              } catch (err) {
                response = xhr.responseText;
              }
              this.$emit("completed", response, form, xhr);
              if ([200, 201, 204].indexOf(xhr.status) > -1) {
                this.$emit("uploaded", response, form, xhr);
              } else {
                this.$emit("error", "Image upload fail.", "upload", xhr);
              }
            }
          };
          xhr.send(form);
        },
        this.outputMime,
        this.outputQuality
      );
    },
    b64toBlob(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }
  },
  mounted() {
    let reader = new FileReader();
    this.dataUrl = this.photo;
    reader.readAsDataURL(this.b64toBlob(this.dataUrl.split(";base64,")[1]));

    // this.filename = fileInput.files[0].name || 'unknown'
    // this.mimeType = this.mimeType || fileInput.files[0].type
  }
};
</script>

<style lang="scss">
.avatar-cropper {
  .avatar-cropper-overlay {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-cropper-img-input {
    display: none;
  }
  .avatar-cropper-container {
    .avatar-cropper-image-container {
      margin: 0 auto;
      position: relative;
      max-width: 400px;
      height: 300px;
    }
    img {
      max-width: 100%;
      height: 100%;
    }
    .avatar-cropper-footer {
      display: flex;
      align-items: stretch;
      align-content: stretch;
      justify-content: space-between;
      .avatar-cropper-btn {
        width: 100%;
        padding: 15px 0;
        cursor: pointer;
        margin-top: 32px;
        margin-bottom: 64px;
      }
    }
    .cropper-point {
      height: 7px !important;
      width: 7px !important;
    }
  }

  .cropper-drag-box, .cropper-bg , .cropper-wrap-box{
    border-radius: 14px;
  }

}

</style>
