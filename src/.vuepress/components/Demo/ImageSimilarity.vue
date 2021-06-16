<template>
  <div class="s-stylizationWrapper">
    <Demo-ImageSelect
      :disabled="isLoading"
      label="Image 1"
      show-try-it
      :sample-images="[
          '/images/demo/batowl1.jpg',
          '/images/demo/dog.jpg',
          '/images/demo/car.jpg',
          '/images/demo/dough.jpg',
        ]"
      @imageSelected="image1Selected" />
    <Demo-ImageSelect
      class="s-styleSelector"
      label="Image 2"
      :disabled="isLoading"
      :sample-images="[
          '/images/demo/batowl2.jpg',
          '/images/demo/dog.jpg',
          '/images/demo/car.jpg',
          '/images/demo/dough.jpg',
        ]"
      @imageSelected="image2Selected" />
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
        <div class="s-scoreWrapper">
          <div class="s-score">
            {{ score }}
          </div>
          <div class="s-muted">similarity</div>
        </div>
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
        image1: null,
        image2: null,
        output: null,
      }
    },
    computed: {
      score() {
        if(!this.output) {
          return ''
        }
        if(this.output === 1) {
          return '100%'
        }
        return this.output.toFixed(2).split('.')[1] + '%'
      },
    },
    methods: {
      image1Selected(base64, userInteraction) {
        if(this.isLoading) {
          return
        }
        this.image1 = base64
        this.submit()
        if(userInteraction) {
          this.scrollToOutput()
        }
      },
      image2Selected(base64, userInteraction) {
        if(this.isLoading) {
          return
        }
        this.image2 = base64
        this.submit()
        if(userInteraction) {
          this.scrollToOutput()
        }
      },
      scrollToOutput() {
        this.$refs.output.scrollIntoView({behavior: "smooth", block: "nearest"})
      },
      submit() {
        if(!this.image1 || !this.image2) {
          return
        }
        this.isLoading = true
        Api.post('/demo/image-similarity', {
          image1: this.image1,
          image2: this.image2,
        }).then(res => {
          this.handleServerResponse(res)
        }).catch(() => {
          alert('Sorry, we couldn\'t process that image. Please try again later.')
          this.isLoading = false
        })
      },
      updateStatus() {
        window.setTimeout(() => {
          Api.get('/demo/image-similarity/status/' + this.cacheKey).then(res => {
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

  .s-scoreWrapper {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .s-score {
    font-size: 60px;
  }

  .s-muted {
    color: #8e8e8e;
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