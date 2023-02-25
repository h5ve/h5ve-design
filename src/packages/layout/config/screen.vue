<template>
  <div class="screen-container">
    <div class="general-form">
      <el-form size="mini" label-position="top">
        <el-form-item :label="$t('plugin.name')">
          <el-input v-model="views.name" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('plugin.size')">
          <div class="flex-row">
            <el-input-number
                :min="0"
                style="margin-right: 16px;"
                controls-position="right"
                v-model="views.width"/>
            <el-input-number
                :min="0"
                controls-position="right"
                v-model="views.height"/>
          </div>
        </el-form-item>
        <el-form-item :label="$t('plugin.transparency')">
          <el-input-number
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              style="width: 100%;"
              controls-position="right"
              v-model="views.style.opacity"/>
        </el-form-item>
        <el-form-item :label="$t('plugin.duration')">
          <el-input-number
              :min="0"
              :step="1"
              step-strictly
              style="width: 100%;"
              controls-position="right"
              v-model="views.duration"/>
        </el-form-item>
        <el-form-item :label="$t('plugin.backgroundColor')">
          <el-color-picker v-model="views.style.backgroundColor" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('plugin.backgroundImage')">
          <div class="choose-file">
            <span class="resolution">{{file.resolution}}</span>
            <img style="width: 100%; height: 120px;"
                 :src="url(views.attr.src) || empty"/>
            <p  @click="visible = true" class="title line-clamp1">{{ file.name || $t('plugin.chooseImage')}}</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <material :visible="visible" @cancel="visible = false" @confirm="confirm"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "screen",
  inject: ["url"],
  computed: {
    ...mapGetters(["projectViews", "entrance"]),
    views() {
      return this.projectViews[this.entrance];
    }
  },
  data() {
    return {
      visible: false,
      file: {},
      empty: require("@/assets/images/empty-img.png")
    }
  },
  methods: {
    confirm(data) {
      if (data) {
        this.views.attr.src = data.url;
        this.views.attr.id = data.id;
      }
      this.file = data;
      this.visible = false;
    }
  }
}
</script>


<style scoped lang="scss">
.screen-container {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.general-form {
  margin: 16px;

  .el-form-item__label {
    padding-bottom: 0 !important;
  }
}
</style>

<style>
.el-form-item__label {
  padding-bottom: 0 !important;
}
</style>
