<template>
  <div class="s-wrapper">
    <input ref="imagePicker" class="s-imagePicker" type="file" accept="image/jpg,image/png" />
    <div @click="openImagePicker" class="s-previewImage">
      <img ref="preview" :src="selectedImage" />
    </div>
    <div class="s-sampleImages">
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
    data() {
      return {
        selectedImage: null,
        sampleImages: [
          '/images/demo/elephant.jpg',
          '/images/demo/car.jpg',
          '/images/demo/dough.jpg',
          '/images/demo/flower.jpg',
        ]
      }
    },
    created() {
      this.setImage(this.sampleImages[0])
    },
    mounted() {
      this.setupImagePicker()
    },
    methods: {
      setImage(newImage) {
        this.selectedImage = newImage
      },
      setupImagePicker() {
        const reader = new FileReader()
        const fileInput = this.$refs.imagePicker
        reader.onload = e => {
          this.selectedImage = e.target.result
          Resizer.resize(this.$refs.preview, 256, 256)
        }
        fileInput.addEventListener('change', e => {
          const f = e.target.files[0]
          reader.readAsDataURL(f)
        })
      },
      openImagePicker() {
        const fileInput = this.$refs.imagePicker
        fileInput.click()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-wrapper {
    display: flex;
    flex-direction: column;
  }
  .s-previewImage {
    width: 230px;
    height: 230px;
  }
  .s-sampleImages {
    display: flex;
    flex-direction: row;
    margin: 10px -5px 0 -5px;
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
</style>