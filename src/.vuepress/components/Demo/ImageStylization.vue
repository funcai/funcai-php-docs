<template>
  <div class="s-stylizationWrapper">
    <Demo-ImageSelect
      :disabled="isLoading"
      @imageSelected="imageSelected" />
    <Demo-ImageSelect
      class="s-styleSelector"
      :disabled="isLoading"
      @imageSelected="styleSelected" />
    <div
      class="s-output"
      :class="{
        '-loading': isLoading,
      }">
      <div
        v-if="isLoading"
        class="s-output__loader">
        Running prediction...
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../logic/Api'
  export default {
    data() {
      return {
        isLoading: false,
        cacheKey: null,
      }
    },
    methods: {
      imageSelected(base64) {
        if(this.isLoading) {
          return
        }
        this.isLoading = true
        Api.post('/demo/image-classification', {
          image: base64,
        }).then(res => {
          this.handleServerResponse(res)
        }).catch(() => {
          alert('Sorry, we couldn\'t process that image. Please try again later.')
          this.isLoading = false
        })
      },
      styleSelected(base64) {

      },
      updateStatus() {
        window.setTimeout(() => {
          Api.get('/demo/image-classification/status/' + this.cacheKey).then(res => {
            this.handleServerResponse(res)
          }).catch(() => {
            alert('Sorry, we couldn\'t process that image. Please try again later.')
            this.isLoading = false
          })
        }, 1000)
      },
      handleServerResponse(res) {
        if(res.status === 'done') {
          this.classes = res.result
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
  }

  .s-styleSelector {
    margin: 0 10px;
  }

  .s-output {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;

    &__loader {
      background: #e4e4e4;
      flex: 1;
      align-self: stretch;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>