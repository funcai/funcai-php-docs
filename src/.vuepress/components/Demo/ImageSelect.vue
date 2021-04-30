<template>
  <div
    class="s-wrapper"
    :class="{
      '-disabled': disabled,
    }">
    <div
      v-if="label"
      class="s-label">
      {{ label }}
    </div>
    <input ref="imagePicker" class="s-imagePicker" type="file" accept="image/jpeg,image/png" />
    <div @click="openImagePicker" class="s-previewImage">
      <img ref="preview" :src="selectedImage" />
      <div
        v-if="!disabled"
        class="s-uploadYourOwn">
        <div>
          <strong>Click</strong><br> to select your own image
        </div>
      </div>
    </div>
    <div class="s-sampleImages">
      <div v-if="showTryIt" class="s-tryIt" />
      <img
        v-for="image in sampleImages"
        :key="image"
        :src="image"
        class="s-sampleImage"
        @click="setImage(image)"
        :class="{
          '-active': image === selectedImage,
        }" />
    </div>
  </div>
</template>

<script>
  import Resizer from '../../logic/Resizer'
  export default {
    props: {
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      showTryIt: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: '',
      },
      sampleImages: {
        type: Array,
        required: false,
        default() {
          return [
            '/images/demo/flower.jpg',
            '/images/demo/dog.jpg',
            '/images/demo/car.jpg',
            '/images/demo/dough.jpg',
          ]
        },
      },
    },
    data() {
      return {
        selectedImage: null,
      }
    },
    mounted() {
      this.setupImagePicker()
      this.setImage(this.sampleImages[0], false)
    },
    methods: {
      setImage(newImage, userInteraction = true) {
        if(this.disabled) {
          return
        }
        this.selectedImage = newImage
        this.emitNewImage(userInteraction)
      },
      setupImagePicker() {
        const reader = new FileReader()
        const fileInput = this.$refs.imagePicker
        reader.onload = e => {
          Resizer.resize(e.target.result, 256, 256).then(canvas => {
            this.setImage(canvas.toDataURL())
          })
        }
        fileInput.addEventListener('change', e => {
          const f = e.target.files[0]
          reader.readAsDataURL(f)
        })
      },
      openImagePicker() {
        if(this.disabled) {
          return
        }
        const fileInput = this.$refs.imagePicker
        fileInput.click()
      },
      emitNewImage(userInteraction) {
        const img = this.$refs.preview
        img.onload = () => {
          let canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 80);
          canvas = null;
          this.$emit('imageSelected', dataURL, userInteraction)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-wrapper {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 820px) {
      align-items: center;
      margin-bottom: 20px;
    }
  }
  .s-previewImage {
    width: 230px;
    height: 230px;
    position: relative;
    cursor: pointer;

    .s-uploadYourOwn {
      display: flex;
      opacity: 0;
      position: absolute;
      color: white;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(5px);
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      transition: opacity ease 0.1s;
    }

    &:hover {
      .s-uploadYourOwn {
        opacity: 1;
      }
    }
  }
  .s-sampleImages {
    display: flex;
    flex-direction: row;
    margin: 10px -5px 0 -5px;
    position: relative;
  }
  .s-tryIt {
    position: absolute;
    background-image: url('/images/try-it.svg');
    background-repeat: no-repeat;
    width: 131px;
    height: 178px;
    left: -131px;
    top: -134px;
  }

  @media screen and (max-width: 1350px) and (min-width: 821px) {
    .s-tryIt {
      display: none;
    }
  }

  @media screen and (max-width: 490px) {
    .s-tryIt {
      display: none;
    }
  }

  .s-sampleImage {
    width: 50px;
    height: 50px;
    margin: 0 5px;
    cursor: pointer;

    &.-active {
      box-shadow: 0 0 0 2px #3d6eaa;
    }
  }

  .s-imagePicker {
    display: none;
  }

  .s-label {
    text-align: center;
    margin-bottom: 10px;
    color: #545454;
    font-size: 14px;
  }
</style>