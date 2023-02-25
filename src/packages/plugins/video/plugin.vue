<template>
  <div class="video-plugin-container"
       :style="style">
    <vab-player-mp4
      v-if="mp4Config"
      :config="mp4Config"
      @player="$vabPlayerMp4 = $event"
    />
    <img v-if="!mp4Config && !hideVideo" class="image-plugin-container" :style="style" :src="url(attr.src)">
  </div>
</template>

<script>
import {VabPlayerMp4} from '../../depend/VabPlayer.js'

export default {
  name: "videoPlugin",
  inject: ["url", "urls", "equipment", "pageNumber"],
  components: {
    VabPlayerMp4,
  },
  props: {
    attribute: {},
    preview: false,
  },
  data() {
    return {
      hideVideo: this.equipment,
      $vabPlayerMp4: null,
      mp4Config: null
    }
  },
  watch: {
    "attr": {
      deep: true,
      immediate: true,
      handler() {
        this.initData();
      }
    }
  },
  methods: {
    initData() {
      this.mp4Config = null;
      this.$nextTick(() => {
        if (this.attr.src) {
          this.mp4Config = {
            id: this.$utils.uuid(),
            url: this.url(this.attr.src, true),
            volume: this.attr.mute ? 0 : this.attr.volume / 100,
            autoplay: this.attr.autoplay,
            fluid: true,
            loop: this.attr.loop,
            screenShot: false,
            controls: this.attr.controls ? "controls" : "",
            pip: false,
          }
        }
      })
    }
  },
  beforeDestroy() {
    try {

    } catch (e) {
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
    styleVo() {
      return this.attribute.style;
    },
    attr() {
      return this.attribute.attr;
    }
  }
}
</script>

<style scoped lang="scss">
.video-plugin-container {
  overflow: hidden;

  &:after {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    z-index: 1000;
  }
}

</style>

<style>
video {
  object-fit: fill;
}

.video-plugin-container > * {
  width: inherit !important;
  height: inherit !important;
}
</style>
