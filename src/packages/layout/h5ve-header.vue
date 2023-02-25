<template>
  <div class="h5ve-header-container">
    <!--logo-->
    <div class="header-left">
      <span class="el-icon-data-board"></span>
      <label>{{ config.title || $t('header.InformationPublishingDesigner') }}</label>
    </div>

    <!--导航栏-->
    <div class="header-nav">
      <ul class="flex-row nav-item project-name">
        <li>
          <span style="font-size: 15px;">{{ $t("program.name") }}</span>
          <input v-model="project.name"></input>
        </li>
      </ul>

      <!--控制画布大小-->
      <ul class="flex-row nav-item control-canvas">
        <li class="pointer" @click="shrink">
          <span style="font-weight: 700;" class="el-icon-minus"></span>
        </li>
        <li class="pointer">
          <el-dropdown placement="bottom" @command="commandZoom">
          <span style="color: #4092ff;">
            {{ zoom }}%
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="400">400%</el-dropdown-item>
              <el-dropdown-item :command="200">200%</el-dropdown-item>
              <el-dropdown-item :command="150">150%</el-dropdown-item>
              <el-dropdown-item :command="100">100%</el-dropdown-item>
              <el-dropdown-item :command="50">50%</el-dropdown-item>
              <el-dropdown-item :command="20">20%</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="pointer" @click="magnify">
          <span style="font-weight: 700;" class="el-icon-plus"></span>
        </li>
      </ul>

      <!--菜单列表-->
      <ul class="flex-row nav-item menu-list">
        <li v-for="(item,index) in $t('header.menuList')"
            @click="handleMenuList(item)"
            :key="'menu_list' + index">
          <label>
            <span style="font-weight: 700;" :class="item.icon"></span>
            <span> {{ item.name }}</span>
          </label>
        </li>
      </ul>
    </div>

    <!--导出-->
    <el-dialog
      :title="$t('tips.export')"
      top="5vh"
      :close-on-click-modal="false"
      :visible.sync="exportVisible">
      <div style="margin-bottom: 10px;">
        <el-button size="small" type="primary" @click="exportJson">{{ $t('tips.download') }}JSON</el-button>
        <el-button size="small" @click="exportVisible = false">{{ $t('tips.cancel') }}</el-button>
      </div>
      <code-editor :code="code" :readonly="true"/>
    </el-dialog>

    <!--导入-->
    <el-dialog
      :title="$t('tips.import')"
      top="5vh"
      :close-on-click-modal="false"
      :visible.sync="importVisible">
      <div class="flex-row-between" style="margin-bottom: 10px;">
        <div>
          <el-button size="small" @click="confirmImport" type="primary">{{ $t('tips.confirm') }}</el-button>
          <el-button size="small" @click="importVisible = false">{{ $t('tips.cancel') }}</el-button>
        </div>
        <el-switch
          v-model="isJsonFile"
          :active-text="$t('tips.import') + 'JSON' + $t('tips.file')"
          :inactive-text="$t('tips.import') + 'JSON' + $t('tips.data')">
        </el-switch>
      </div>
      <el-upload v-if="isJsonFile" drag action="">
        <i style="font-size: 40px; margin: 39px 0 20px 0;" class="el-icon-document"></i>
        <div class="el-upload__text">{{ $t('tips.upload') }}<em>{{ $t('tips.clickUpload') }}</em></div>
      </el-upload>
      <code-editor @input="inputCode" v-else :code="code"/>
    </el-dialog>

    <preview-dialog @close-preview="previewVisible = false" :visible="previewVisible"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import codeEditor from "@/components/code-editor";
import previewDialog from "./preview-dialog";

export default {
  name: "h5veHeader",
  components: {
    codeEditor,
    previewDialog
  },
  inject: ["config"],
  computed: {
    ...mapGetters(["projectViews", "entrance", "visual", "quash", "recover", "project"]),
    plugins() {
      return this.projectViews[this.entrance].plugins;
    },
    views() {
      return this.projectViews[this.entrance];
    },
    title() {
      return this.projectViews[this.entrance].name;
    },
    code() {
      const project = this.$store.state.project;
      return JSON.stringify(project, null, "\t");
    },
    zoom() {
      return this.visual.zoom[this.entrance];
    },
    style() {
      const scale = document.body.clientWidth / this.views.width;
      return {
        width: this.views.width + 'px',
        height: this.views.height + 'px',
        transform: `scale(${scale})`
      }
    }
  },
  data() {
    return {
      templateVisible: false,
      previewVisible: false,
      exportVisible: false,
      importVisible: false,
      isJsonFile: false,
      fullScreen: false,
    }
  },
  methods: {
    templateConfirm(data) {
      const project = JSON.parse(JSON.stringify(this.$store.state.project));
      const layout = JSON.parse(data.layout);
      project.views = layout.views;
      project.entrance = layout.entrance;
      this.$store.commit("IMPORT_PROJECT", {
        value: project
      })
      this.templateVisible = false;
    },
    templateImport() {
      this.templateVisible = true;
    },
    commandZoom(data) {
      this.$store.commit("UPDATE_VISUAL", {
        index: this.entrance,
        number: 1,
        key: "zoom",
        value: data
      })
    },
    magnify() {
      const zoom = this.zoom + 20;
      this.$store.commit("UPDATE_VISUAL", {
        index: this.entrance,
        number: 1,
        key: "zoom",
        value: zoom < 400 ? zoom : 400
      })
    },
    shrink() {
      const zoom = this.zoom - 20;
      this.$store.commit("UPDATE_VISUAL", {
        index: this.entrance,
        number: 1,
        key: "zoom",
        value: zoom > 20 ? zoom : 20
      })
    },
    handleMenuList(data) {
      if (data.type) {
        this[data.type] = true;
      } else if (data.method === 'save') {
        this.$emit("emit", data.method);
      } else if (data.method === 'import') {
        this.$emit("emit", data.method);
      }else if (data.method === 'fullScreen') {
        this.fullScreen ? this.$window.exitFull() : this.$window.fullScreen();
        this.fullScreen = !this.fullScreen;
      } else if (data.method === 'preview') {
        this.previewVisible = true;
      } else if (data.method === 'close') {
        this.$emit("emit", data.method);
      }
    },
    inputCode(data) {
      try {
        this.jsonStr = JSON.parse(data);
      } catch (e) {
        this.jsonStr = null;
        this.$notify({
          title: '系统提示',
          message: 'JSON格式错误',
          type: 'warning'
        })
      }
    },
    confirmImport() {
      if (this.jsonStr) {
        this.$store.commit("IMPORT_PROJECT", {
          value: this.jsonStr
        })
        this.importVisible = false;
      } else {
        this.$notify({
          title: '系统提示',
          message: 'JSON格式错误',
          type: 'warning'
        })
      }
    },
    exportJson() {
      const encodedData = encodeURIComponent(this.code)
      const filename = Date.now() + '.json';
      const href = 'data:application/json;charset=UTF-8,' + encodedData;
      const aLabel = document.createElement('a');
      aLabel.download = filename;
      aLabel.href = href;
      aLabel.click();
      URL.revokeObjectURL(aLabel.href);
    }
  }
}
</script>

<style scoped lang="scss">
.h5ve-header-container {
  position: absolute;
  width: 100%;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}

.header-left {
  width: 240px;
  text-align: center;
  font-size: 17px;
  line-height: 44px;
}

.header-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 240px;
  right: 0;


  .nav-item {
    height: 44px;

    li {
      padding: 3px 10px;
      transition: .3s;

      &:hover {
        color: #4092ff;
        border-radius: 3px;
        transition: .3s;
        background-color: rgba(64, 146, 255, .1);
      }
    }
  }

  .project-name {
    li {
      input {
        padding: 6px 13px;
        background-color: #ecf4ff;
        border: 0;
        color: #4092ff;
        border-radius: 3px;
      }

      &:hover {
        color: #4092ff;
        border-radius: 3px;
        transition: .3s;
        background-color: transparent;
      }
    }
  }

  .control-quash {
    position: absolute;
    top: 7px;
    left: 0;
    height: 30px;
    color: #4092ff;
    border-radius: 3px;
    background-color: rgba(64, 146, 255, .1);

    &:hover {
      background-color: transparent;
    }
  }

  .layout-list {
    position: absolute;
    top: 0;
    left: 150px;
  }

  .control-canvas {
    position: absolute;
    top: 7px;
    left: 40%;
    height: 30px;
    color: #4092ff;
    border-radius: 3px;
    transform: translateX(-50%);
    background-color: rgba(64, 146, 255, .1);

    &:hover {
      background-color: transparent;
    }
  }

  .menu-list {
    position: absolute;
    top: 0;
    right: 20px;
  }
}
</style>
