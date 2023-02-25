<template>
  <div>
    <textarea v-if="focus"
              id="textarea"
              @input="input"
              @blur="focus = false"
              :style="style"> {{ attr.text }}
    </textarea>
    <div v-else
         class="text-plugin-container line-clamp"
         @dblclick="dblclick"
         :style="style">
      <span :style="{...animation, display: attr.animation.animationName ? 'block' : 'inline'}" :class="attr.animation.animationName">{{ attr.text }}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "textPlugin",
  props: {
    attribute: {
      type: Object,
      default() {
        return {}
      }
    },
    preview: false,
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    ...mapGetters(["entrance", "active"]),
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
    },
    animation() {
      return {animationDuration: this.attr.animation.animationDuration + 's'};
    }
  },
  watch: {
    "attr.readAloud": {
      deep: true,
      immediate: true,
      handler(n) {
        if (n) {
          this.sound = window.speechSynthesis;
          const text = new SpeechSynthesisUtterance(this.attr.text);
          this.sound.speak(text);
        } else {
          this.sound && this.sound.cancel();
        }
      }
    }
  },
  methods: {
    dblclick() {
      this.focus = true;
      this.$nextTick(() => {
        document.getElementById('textarea').focus();
      })
    },
    input() {
      const value = document.getElementById("textarea").value;
      const attr = JSON.parse(JSON.stringify(this.attr));
      attr.text = String(value);
      this.$store.commit("UPDATE_PLUGIN", {
        viewIndex: this.entrance,
        pluginIndex: this.active.plugin,
        key: "attr",
        value: attr
      })
    }
  }
}
</script>

<style scoped lang="scss">
.text-plugin-container {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;

  &:after {
    display: inline-block;
    width: 100%;
    content: "";
  }

  & span {
    display: block;
    height: 100%;
  }

  & .toTop {
    animation: toTop 3s infinite ease-in;
  }

  & .toLeft {
    animation: toLeft 3s infinite ease-in;
  }

  & .toBottom {
    animation: toBottom 3s infinite ease-in;
  }

  & .toRight {
    animation: toRight 3s infinite ease-in;
  }

}


@keyframes toLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
    display: none;
  }
}

@keyframes toRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
    display: none;
  }
}

@keyframes toTop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
    display: none;
  }
}

@keyframes toBottom {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
    display: none;
  }
}
</style>
