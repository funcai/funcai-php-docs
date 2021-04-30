<template>
<div class="s-progress__wrapper">
  <div class="s-progress">
    <span class="s-progress__bar" :style="{width: width}"></span>
  </div>
</div>
</template>

<script>

export default {
  props: {
    duration: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      width: '0%',
      start: null,
    }
  },
  created() {
    this.animate()
  },
  methods: {
    animate() {
      if(!this.start) {
        this.start = (new Date()).getTime()
      }
      window.requestAnimationFrame(() => {
        const timeDiff = (new Date()).getTime() - this.start
        const progress = ((timeDiff / 1000) / this.duration)
        this.width = Math.min(100, progress * 100) + '%'
        if(progress < 1) {
          this.animate()
        }
      })
    },
  },
}

</script>


<style lang="scss" scoped>
.s-progress {
  width: 100%;
  height: 6px;
  background: #e1e4e8;
  border-radius: 3px;
  overflow: hidden;
  padding: 1px;
  border: 1px solid #757575;
}

.s-progress__bar {
  display: block;
  height: 100%;
  background: linear-gradient(90deg,#d7f27e,#7959E3 17%,#7959E3 34%,#01feff 51%,#d7f27e 68%,#7959E3 85%,#7959E3);
  background-size: 300% 100%;
  animation: progress-animation 2s linear infinite;
  overflow: hidden;
  border-radius: 1px;
}

.s-progress__wrapper {
  width: 100%;
  margin: 10px 0;
}
    
@keyframes progress-animation {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: 0;
  }
}
</style>