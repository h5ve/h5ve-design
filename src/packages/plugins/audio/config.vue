<template>
  <div class="audio-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.path')">
        <el-input v-model="plugin.attr.src" type="input" :placeholder="$t('plugin.audioPlaceholder')">
          <template slot="append">
            <el-button @click="visible = true">{{ $t('plugin.choose') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('plugin.config')">
        <el-checkbox v-model="plugin.attr.default">{{ $t('plugin.defaultAudio') }}</el-checkbox>
        <el-checkbox v-model="plugin.attr.autoplay">{{ $t('plugin.autoplay') }}</el-checkbox>
        <el-checkbox v-show="plugin.attr.default" v-model="plugin.attr.controls">{{$t('plugin.controls')}}</el-checkbox>
        <el-checkbox v-model="plugin.attr.loop">{{ $t('plugin.loopPlay') }}</el-checkbox>
      </el-form-item>
      <el-form-item :label="$t('plugin.color')">
        <div class="flex-row">
          <span v-show="!plugin.attr.default">{{ $t('plugin.icon') }}：</span>
          <el-color-picker v-show="!plugin.attr.default" v-model="plugin.style.color" show-alpha></el-color-picker>
          <span>{{ $t('plugin.background') }}：</span>
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
    </el-form>
    <material :type-list="['audio']" :visible="visible" @cancel="visible = false" @confirm="confirm"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "audioConfig",
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(["projectViews", "entrance", "active"]),
    canvas() {
      return this.projectViews[this.entrance].plugins;
    },
    plugin() {
      return this.canvas[this.active.plugin];
    }
  },
  methods: {
    confirm(data) {
      if (data) {
        this.plugin.attr.src = data.url;
        this.plugin.attr.id = data.id;
      }
      this.visible = false;
    }
  }
}
</script>
