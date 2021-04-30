<template>
  <div class="s-stylizationWrapper">
    <Demo-ImageSelect
      :disabled="isLoading"
      label="Input image"
      show-try-it
      @imageSelected="imageSelected" />
    <Demo-ImageSelect
      class="s-styleSelector"
      label="Input style"
      :disabled="isLoading"
      :sample-images="[
          '/images/demo/style1.jpg',
          '/images/demo/style2.jpg',
          '/images/demo/style3.jpg',
          '/images/demo/style4.jpg',
        ]"
      @imageSelected="styleSelected" />
    <div
      class="s-output"
      ref="output"
      :class="{
        '-loading': isLoading,
      }">
      <div
        v-if="isLoading"
        class="s-output__loader">
        <div>Running prediction...</div>
        <ProgressBar
          style="width: 80%"
          :duration="6"
          />
      </div>
      <template v-else-if="output">
        <div class="s-label">Output: Stylization</div>
        <img
          class="s-output__image"
          :src="output" />
      </template>
    </div>
  </div>
</template>

<script>
import Api from '../../logic/Api'
import ProgressBar from '../ProgressBar.vue'
  export default {
  components: { ProgressBar },
    data() {
      return {
        isLoading: false,
        cacheKey: null,
        image: null,
        style: null,
        output: null,
      }
    },
    methods: {
      imageSelected(base64, userInteraction) {
        if(this.isLoading) {
          return
        }
        this.image = base64
        this.submit()
        if(userInteraction) {
          this.scrollToOutput()
        }
      },
      styleSelected(base64, userInteraction) {
        if(this.isLoading) {
          return
        }
        this.style = base64
        this.submit()
        if(userInteraction) {
          this.scrollToOutput()
        }
      },
      scrollToOutput() {
        this.$refs.output.scrollIntoView({behavior: "smooth", block: "nearest"})
      },
      submit() {
        if(!this.image || !this.style) {
          return
        }
        this.isLoading = true
        Api.post('/demo/image-stylization', {
          image: this.image,
          style: this.style,
        }).then(res => {
          this.handleServerResponse(res)
        }).catch(() => {
          alert('Sorry, we couldn\'t process that image. Please try again later.')
          this.isLoading = false
        })
      },
      updateStatus() {
        window.setTimeout(() => {
          Api.get('/demo/image-stylization/status/' + this.cacheKey).then(res => {
            this.handleServerResponse(res)
          }).catch(() => {
            alert('Sorry, we couldn\'t process that image. Please try again later.')
            this.isLoading = false
          })
        }, 1000)
      },
      handleServerResponse(res) {
        if(res.status === 'done') {
          this.output = res.result
          this.isLoading = false
        } else if(res.status === 'processing') {
          this.cacheKey = res.key
          this.updateStatus()
        } else {
          alert('Sorry, we couldn\'t process that image. Please try again later.')
          this.isLoading = false
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .s-stylizationWrapper {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    @media screen and (max-width: 820px) {
      flex-direction: column;
    }
  }

  .s-styleSelector {
    margin: 0 20px;
  }

  .s-output {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 230px;

    &__loader {
      background: #e4e4e4;
      flex: 1;
      align-self: stretch;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 50px;
      flex-direction: column;
    }

    &__image {
      width: 230px;
      height: 230px;
    }

    @media screen and (max-width: 820px) {
      align-items: center;
      margin-bottom: 20px;
      width: 100%;
    }
  }
  
  .s-label {
    text-align: center;
    margin-bottom: 10px;
    color: #545454;
    font-size: 14px;
    width: 100%;
  }
</style>