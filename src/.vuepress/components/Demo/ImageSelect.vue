<template>
  <div class="s-wrapper">
    <input class="s-imagePicker" type="file" accept="image/jpg,image/png" />
    <div class="s-previewImage">
      <img :src="selectedImage" />
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
    methods: {
      setImage(newImage) {
        this.selectedImage = newImage
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