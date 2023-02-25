<template>
  <div class="large-screen-design">
    <h5ve-header v-if="!publish" @emit="emitChange"/>
    <h5ve-aside v-if="!publish"/>
    <h5ve-main v-if="!publish"/>
    <h5ve-config v-if="!publish"/>
    <h5ve-footer v-if="!publish"/>
    <h5ve-publish v-if="equipment"/>
    <preview-dialog v-if="!equipment" @close-preview="closePreview" :visible="publish"/>
  </div>
</template>

<script>
import "./depend/index.js"
import i18n from '../i18n'
import store from "@/store"
import h5veHeader from "./layout/h5ve-header"
import h5veAside from "./layout/h5ve-aside"
import h5veMain from "./layout/main/h5ve-main"
import h5veConfig from "./layout/config/h5ve-config"
import h5veFooter from "./layout/h5ve-footer"
import h5vePublish from "./layout/h5ve-publish"
import previewDialog from "./layout/preview-dialog"
import Cookies from 'js-cookie';
export default {
  store,
  i18n,
  name: "design",
  components: {
    h5veHeader,
    h5veAside,
    h5veMain,
    h5veConfig,
    h5veFooter,
    h5vePublish,
    previewDialog
  },
  filters: {},
  props: {
    once: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: Cookies.get('language') || 'zh'
    },
    pageNumber: {
      type: Number,
      default: 0
    },
    publish: {
      type: Boolean,
      default: false
    },
    equipment: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      default: null
    },
    config: {
      type: Object,
      default() {
        return {
          title: ""
        }
      }
    }
  },
  provide() {
    return {
      pageNumber: this.pageNumber,
      publish: this.publish,
      config: this.config,
      url: this.url,
      urls: this.urls,
      equipment: this.equipment,
      once: this.once
    }
  },
  watch: {
    "project": {
      immediate: true,
      deep: true,
      handler() {
        this.importProject();
      }
    },
    language: {
      immediate: true,
      deep: true,
      handler(n) {
        this.$i18n.locale = n;
      }
    }
  },
  methods: {
    closePreview() {
      this.publish = false;
      this.$emit("close-preview");
    },
    importProject() {
      if (this.project) {
        if (this.project.views.length > 1) {
          this.$store.commit("UPDATE_VISUAL", {
            key: "lines",
            value: {h: [0, 200], v: [0, 200]}
          })
          this.$store.commit("UPDATE_VISUAL", {
            key: "zoom",
            value: 100
          })
        }
        this.$store.commit("IMPORT_PROJECT", {
          value: this.project
        })
      }
    },
    emitChange(data) {
      const project = this.$store.state.project;
      this.$emit(data, {
        type: data,
        value: JSON.stringify(project)
      })
    },
    url(src, isNotVideo) {
      if (src && this.equipment && this.publish) {
        const srcArray = src.split("/");
        if (!isNotVideo) {
          const length = srcArray.length;
          if (srcArray[length - 1].charAt(0) === 'c') {
            srcArray[length - 1] = srcArray[length - 1].slice(1);
          }
        }
        const path = "./" + this.pageNumber + "/" + srcArray[srcArray.length - 1];
        return path;
      } else  {
        return src || require("@/assets/images/empty-img.png");
        // return src;
      }
    },
    urls(src, isNotVideo) {
      if (src && this.equipment && this.publish) {
        const srcArray = src.split("/");
        if (!isNotVideo) {
          const length = srcArray.length;
          if (srcArray[length - 1].charAt(0) === 'c') {
            srcArray[length - 1] = srcArray[length - 1].slice(1);
          }
        }
        return "./" + srcArray[srcArray.length - 1];
      } else  {
        return src || require("@/assets/images/empty-img.png");
        // return src;
      }
    }
  },
  created() {
    // this.$window.cacheVuex(this);
    this.$window.forbidZoom();
  }
}
</script>

<style scoped>

.large-screen-design {
  position: relative;
  width: 100%;
  height: 100vh;
}

</style>
