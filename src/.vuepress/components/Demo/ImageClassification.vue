<template>
  <div class="s-classificationWrapper">
    <Demo-ImageSelect
      :disabled="isLoading"
      @imageSelected="imageSelected" />
    <div
      class="s-classList"
      :class="{
        '-loading': isLoading,
      }">
      <div
        v-if="isLoading"
        class="s-classList__loader">
        Running prediction...
      </div>
      <div
        v-else
        class="s-classList__item"
        :key="className"
        v-for="className in classes">
        {{ className }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../logic/Api'
  export default {
    data() {
      return {
        classes: [],
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
  .s-classificationWrapper {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }

  .s-classList {
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

    &__item {
      border: 2px solid #426fa7;
      border-radius: 4px;
      padding: 5px 10px;
      margin-bottom: 5px;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }
  }
</style>