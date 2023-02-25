<template>
  <div
    class="swiper-plugin-container"
    :style="style">
    <vab-player-mp4
      v-if="currentVo.type === 'media'"
      :config="videoConfig(currentVo)"
      @player="$vabPlayerMp4 = $event"
    />
    <img
      v-else
      :src="url(currentVo.src)" alt="图片">
  </div>
</template>

<script>
import {VabPlayerMp4} from '../../depend/VabPlayer.js'
import {mapGetters} from "vuex";

export default {
  name: "picturePlugin",
  inject: ["url"],
  components: {
    VabPlayerMp4,
  },
  props: {
    attribute: {},
    preview: false,
  },
  computed: {
    ...mapGetters(["duration"]),
    style() {
      const style = this.attribute.style;
      if (this.preview) {
        style.position = "absolute";
      } else {
        delete style.position;
      }
      return this.$utils.formatStyle(this.attribute.style);
    },
    attr() {
      return this.attribute.attr;
    }
  },
  data() {
    return {
      setTimeout: [],
      $vabPlayerMp4: null,
      swiperList: [],
      list: [],
      currentVo: {}
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
      this.timer && clearInterval(this.timer);
      this.swiperList = JSON.parse(JSON.stringify(this.attr.list));
      if(this.swiperList.length) {
        this.durationList = this.swiperList.map(item => Number(item.duration));
        const countTime = this.durationList.reduce((pre, current) => pre + current, 0);
        const duration = this.duration;
        if (countTime > duration) {
          this.$store.commit("UPDATE_DURATION", {
            duration: countTime
          })
        }
        this.durationSwiper();
        if (this.attr.loop) {
          this.timer = setInterval(this.durationSwiper, countTime * 1000)
        }
      }
    },
    durationSwiper() {
      const list = JSON.parse(JSON.stringify(this.swiperList));
      if(list.length) {
        this.setTimeout.forEach(item => {
          item && clearTimeout(item);
        });
        this.setTimeout = [];
        this.currentVo = list[0];
        let duration = 0;
        list.forEach((option, index, arr) => {
          duration += Number(option.duration);
          if (arr.length - 1 !== index) {
            this.setTimeout[index] = setTimeout(() => {
              this.currentVo = arr[index + 1];
            }, duration * 1000)
          }
        })
      }
    },
    videoConfig(data) {
      return {
        id: this.$utils.uuid(),
        url: this.url(data.src, true),
        volume: data.mute ? 0 : 1,
        autoplay: true,
        fluid: true,
        loop: "loop",
        screenShot: false,
        pip: false,
        controls: ""
      }
    }
  }
}
</script>


<style scoped lang="scss">
.swiper-plugin-container {
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

.swiper-plugin-container > * {
  width: inherit !important;
  height: inherit !important;
}
</style>
