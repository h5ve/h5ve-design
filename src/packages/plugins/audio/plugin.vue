<template>
  <div class="audio-plugin-container" :style="style">
    <audio style="width: 100%; height: 100%;"
           v-if="attr.default"
           :loop="attr.loop"
           :autoplay="attr.autoplay"
           :src="url(attr.src)"
           :controls="attr.controls">
      您的浏览器不支持 audio 标签
    </audio>
    <svg-icon
        v-else
        :style="{width: style.width, height: style.height}"
        icon-class="audio"/>
  </div>
</template>

<script>
export default {
  name: "audioPlugin",
  inject: ["url"],
  props: {
    attribute: {},
    preview: false,
  },
  data() {
    return {
      audio: null
    }
  },
  computed: {
    style() {
      const style = this.attribute.style;
      if (this.preview) {
        style.position = "absolute"
      } else {
        delete style.position
      }
      return this.$utils.formatStyle(this.attribute.style);
    },
    attr() {
      return this.attribute.attr;
    }
  },
  watch: {
    "attr.default": {
      deep: true,
      immediate: true,
      handler() {
        this.playAudio();
      }
    },
    "attr.loop": {
      deep: true,
      immediate: true,
      handler() {
        this.playAudio();
      }
    },
    "attr.autoplay": {
      deep: true,
      immediate: true,
      handler() {
        this.playAudio();
      }
    }
  },
  methods: {
    playAudio() {
      if (this.attr.autoplay) {
        if (!this.audio) {
          this.audio = document.createElement("audio");
        }
        this.audio.src = this.url(this.attr.src);
        this.audio.loop = this.attr.loop;
        this.audio.autoplay = this.attr.autoplay;
        if (this.attr.autoplay) {
          this.audio && this.audio.play();
        }
      } else {
        this.audio && this.audio.pause();
      }
    }
  },
  beforeDestroy() {
    this.audio && this.audio.pause();
  }
}
</script>

<style scoped lang="scss">
.audio-plugin-container {
  overflow: hidden;
}
</style>
