<template>
  <div class="video-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.chooseVideo')">
        <div class="choose-file">
          <span v-show="file.duration" class="duration">{{ file.duration }} 秒</span>
          <span class="resolution">{{ file.resolution }}</span>
          <video style="height: 120px; width: 100%;object-fit: fill; vertical-align: bottom;"
                 :disabled="true"
                 :autoplay="false"
                 :controls="false"
                 :src="url(plugin.attr.src)">
            {{ $t('tips.video') }}
          </video>
          <p @click="visible = true" class="title line-clamp1">{{ file.name || $t('plugin.chooseVideo') }}</p>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plugin.config')">
        <el-checkbox v-model="plugin.attr.autoplay">{{ $t('plugin.autoplay') }}</el-checkbox>
        <el-checkbox v-model="plugin.attr.controls">{{ $t('plugin.controls') }}</el-checkbox>
        <el-checkbox v-model="plugin.attr.loop">{{ $t('plugin.loopPlay') }}</el-checkbox>
        <el-checkbox v-model="plugin.attr.mute">{{ $t('plugin.mute') }}</el-checkbox>
      </el-form-item>
      <el-form-item :label="$t('plugin.volume')">
        <el-input-number
            :min="0"
            :max="100"
            :step="1"
            step-strictly
            style="width: 100%;"
            controls-position="right"
            v-model="plugin.attr.volume"/>
      </el-form-item>
      <el-form-item :label="$t('plugin.color')">
        <div class="flex-row">
          {{ $t('plugin.backgroundColor') }}
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
    </el-form>

    <material :type-list="['media']" :visible="visible" @cancel="visible = false" @confirm="confirm"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "videoConfig",
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
  watch: {
    plugin:{
      deep: true,
      immediate: true,
      handler() {
        if(this.plugin && this.plugin.attr) {
          const {src, id, duration, resolution, name} = JSON.parse(JSON.stringify(this.plugin.attr));
          const obj = {
            url: src,
            name: name,
            resolution: resolution,
            duration: duration,
            id: id
          }
          this.file = obj;
          this.$forceUpdate();
        }
      }
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
        this.plugin.attr.name = data.name;
        this.plugin.attr.resolution = data.resolution;
        this.plugin.attr.duration = data.duration;
      }
      this.file = data;
      const {duration} = data;
      if (duration > this.duration) {
        this.$store.commit("UPDATE_DURATION", {
          duration
        })
      }
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

  .duration {
    position: absolute;
    top: 5px;
    left: 10px;
    padding: 0 5px;
    border-radius: 3px;
    color: #4092ff;
    z-index: 100;
    background-color: #fff;
    line-height: 20px;
  }

  .resolution {
    position: absolute;
    right: 10px;
    top: 8px;
    z-index: 100;
    padding: 0 5px;
    border-radius: 3px;
    color: #4092ff;
    background-color: #fff;
    line-height: 20px;
  }
}
</style>

