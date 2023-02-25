<template>
  <el-dialog
    destroy-on-close
    :show-close="false"
    width="800px"
    :title="'名称：' + projectName"
    class="dialog-container"
    @close="$emit('close-preview')"
    :visible.sync="visible">
    <div :style="{height: height + 'px'}">
      <h5ve-publish id="box" :show="visible"/>
    </div>
    <div slot="footer">
      <span style="float:left;">
         <el-button size="medium" @click="previous">上一页</el-button>
         <el-button size="medium" @click="next">下一页</el-button>
      </span>
      <el-button size="medium" @click="$emit('close-preview')">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import h5vePublish from "./h5ve-publish"
import {mapGetters} from "vuex";

export default {
  name: "previewDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      project: null,
      projectName: "",
      height: 0
    }
  },
  computed: {
    ...mapGetters(["projectViews", "entrance"]),
    views() {
      return this.projectViews[this.entrance];
    }
  },
  components: {
    h5vePublish
  },
  watch: {
    "visible": {
      deep: true,
      immediate: true,
      handler() {
        const jsonStr = sessionStorage.getItem("PREVIEW_INFO");
        this.project = JSON.parse(jsonStr);
        this.projectName = this.project ? this.project.name : null;
        this.$nextTick(() => {
          const height = document.getElementById("box")?.offsetHeight
          const scale = 800 / this.views.width;
          this.height = height * scale;
        })
      }
    }
  },
  methods: {
    previous() {
      const length = this.projectViews.length;
      if (length === 2 && this.entrance === 1) {
        this.$store.commit("UPDATE_INFO", {
          key: "entrance",
          value: 0
        })
      } else {
        return this.$notify.warning("当前是第一页");
      }
    },
    next() {
      const length = this.projectViews.length;
      if (length === 2 && this.entrance === 0) {
        this.$store.commit("UPDATE_INFO", {
          key: "entrance",
          value: 1
        })
      } else {
        return this.$notify.warning("当前是最后一页");
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.dialog-container {
  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header,
  .el-dialog__footer {
    padding: 10px;
  }
}
</style>
