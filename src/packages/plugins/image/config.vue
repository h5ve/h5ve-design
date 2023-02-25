<template>
  <div class="image-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item label="选择图片">
        <div class="choose-file">
          <span class="resolution">{{file.resolution}}</span>
          <img style="width: 100%; height: 120px;"
               :src="url(plugin.attr.src) || empty"/>
          <p @click="visible = true" class="title line-clamp1">{{ file.name || "选择图片" }}</p>
        </div>
      </el-form-item>
      <el-form-item label="颜色">
        <div class="flex-row">
          背景：
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
    </el-form>
    <material :visible="visible" @cancel="visible = false" @confirm="confirm"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "imageConfig",
  inject: ["url"],
  computed: {
    ...mapGetters(["projectViews", "entrance", "active"]),
    canvas() {
      return this.projectViews[this.entrance].plugins;
    },
    plugin() {
      return this.canvas[this.active.plugin];
    }
  },
  data() {
    return {
      file: {},
      empty: require("@/assets/images/empty-img.png"),
      visible: false
    }
  },
  methods: {
    confirm(data) {
      if (data) {
        this.plugin.attr.src = data.url;
        this.plugin.attr.id = data.id;
      }
      this.file = data;
      this.visible = false;
    }
  }
}
</script>
<style lang="scss">
.choose-file {
  position: relative;
  width: 100%;
  background-color: #ecf4ff;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;

  .title {
    padding: 0 10px;
    color: #4092ff;
    line-height: 30px;
    background-color: #f9f9f9;
  }
  .resolution {
    position: absolute;
    top: 5px;
    right: 10px;
  }
}
</style>
