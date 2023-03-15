<template>
  <div class="h5ve-canvas-container" id="wrapper">
    <!--重置画布位置-->
    <span
        class="homing-icon el-icon-aim pointer"
        @click="reposition"/>
    <sketch-rule
        :lang="lang"
        :thick="thick"
        :scale="scale"
        :width="width"
        :height="height"
        :startX="startX"
        :startY="startY"
        :shadow="shadow"
        :palette="palette"
        :horLineArr="lines.h"
        :verLineArr="lines.v"
        :isShowReferLine="referLineStatus"
        :cornerActive="true"
        v-if="rulerStatus"
        @handleLine="handleLine">
    </sketch-rule>
    <div
        ref="screensRef"
        id="screens"
        @mousedown.stop="dragMousedown"
        @mouseup="dragMouseup"
        @mousemove="dragMousemove"
        @wheel="handleWheel"
        @scroll="handleScroll">
      <div ref="containerRef" id="screen-container">
        <div id="wrapperCanvas" :style="canvasStyle">
          <!--横向辅助线-->
          <span class="ref-line v-line"
                v-for="item in vLine"
                :key="item.id"
                v-show="item.display"
                :style="{ left: item.position, top: item.origin, height: item.lineLength}"
          />
          <!--纵向辅助线-->
          <span class="ref-line h-line"
                v-for="item in hLine"
                :key="item.id"
                v-show="item.display"
                :style="{ top: item.position, left: item.origin, width: item.lineLength}"
          />
          <!--可拖动组件-->
          <draggable-resizable
              class="canvas-item"
              v-for="(component, index) in plugins"
              @contextmenu.prevent="openMenu($event,component, index)"
              :parent="true"
              :x="component.style.left"
              :y="component.style.top"
              :w="component.style.width"
              :h="component.style.height"
              :id="component.plugin + '.' + index"
              :key="'canvas_plugin_' + index"
              @update:active="active"
              :snapTolerance="5"
              @click="clickComp(index, component)"
              @dragging="onDrag($event, {component, index})"
              @resizing="onResize($event, {component, index})"
              @refLineParams="getRefLineParams">
            <component :is="component.plugin" :attribute="component"/>
          </draggable-resizable>
        </div>
      </div>
    </div>

    <ul v-show="visible"
        style="position: fixed; transition: .3s; z-index: 1000;"
        id="canvasContextmenu"
        class="contextmenu el-dropdown-menu el-dropdown-menu--small">
      <li class="el-dropdown-menu__item" @click="copyPlugin">
        <span class="el-icon-copy-document"></span>
        <span> {{ $t('tips.copy') }}</span>
      </li>
      <li class="el-dropdown-menu__item" @click="fullScreenPlugin">
        <span class="el-icon-full-screen"></span>
        <span> {{ $t('tips.full') }}</span>
      </li>
      <li class="el-dropdown-menu__item" @click="removePlugin">
        <span class="el-icon-delete"></span>
        <span> {{ $t('tips.delete') }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import sketchRule from "vue-sketch-ruler";
import {mapGetters} from "vuex";

export default {
  name: "h5veCanvas",
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      keys: {
        ctrl: false,
      },
      vLine: [],
      hLine: [],
      startX: 0,
      startY: 0,
      thick: 20,
      width: 500,
      height: 800,
      lang: "zh-CN",
    }
  },
  components: {
    sketchRule
  },
  watch: {
    visible(value) {
      if (value) document.body.addEventListener('click', this.closeMenu)
      else document.body.removeEventListener('click', this.closeMenu)
    }
  },
  computed: {
    ...mapGetters(["projectViews", "entrance", "rulerStatus", "referLineStatus", "visual"]),
    plugins() {
      return this.projectViews[this.entrance].plugins;
    },
    views() {
      return this.projectViews[this.entrance];
    },
    lines() {
      return this.visual.lines[this.entrance];
    },
    scale() {
      this.handleWheel({})
      return this.visual.zoom[this.entrance] / 100;
    },
    // 刻度尺样式
    palette() {
      return {
        bgColor: '#2b2b2b', // 刻度尺背景颜色
        longfgColor: '#fff', // 每个数字对应的刻度颜色
        shortfgColor: '#4092ff ', // 刻度尺刻度颜色
        fontColor: '#fff', // 刻度尺数字颜色
        shadowColor: 'rgba(64, 146, 255, .1)', // 画布映射的刻度尺背景
        lineColor: 'rgba(64, 146, 255, .5)', // 辅助线颜色
        borderColor: '#f0f0f0', // 重叠部分的边框线条颜色
        cornerActiveColor: '#4092ff' // 角活动颜色
      }
    },
    shadow() {
      return {
        x: 0,
        y: 0,
        width: this.views.width,
        height: this.views.height
      }
    },
    canvasStyle() {
      return {
        width: this.views.width + 'px',
        height: this.views.height + 'px',
        transform: `scale(${this.scale})`,
        backgroundSize: "60% auto",
        opacity: this.views.style.opacity / 100,
        background: `url(${this.views.attr.src}) no-repeat 50% ${this.views.style.backgroundColor}`
      }
    },
    screen() {
      return {
        width: (this.views.width * 4) + 1000,
        height: (this.views.height * 4) + 1000
      }
    }
  },
  methods: {
    reposition() {
      let canvas = document.getElementById("wrapperCanvas");
      let width = (this.screen.width - this.views.width) / 2;
      let height = (this.screen.height - this.views.height) / 2;
      //canvas.style.left = width + "px";
      canvas.style.top = height + "px";

      const {scrollWidth, offsetWidth, scrollHeight, offsetHeight} = this.$refs.screensRef;
      let scrollLeft = (scrollWidth - offsetWidth) / 2;
      let scrollTop = (scrollHeight - offsetHeight) / 2;

      //this.$refs.screensRef.scrollLeft = scrollLeft;
      let left = canvas.getBoundingClientRect().left;
      //让画布横向居中
      canvas.style.left = offsetWidth / 2 - this.views.width / 2 + "px";

      this.$refs.screensRef.scrollTop = scrollTop;
      let top = canvas.getBoundingClientRect().top;
      this.$refs.screensRef.scrollTop = scrollTop + top - 190;
    },
    copyPlugin() {
      const plugin = sessionStorage.getItem("pluginInfo");
      this.$store.commit("UPDATE_VIEW_PLUGIN", {
        value: JSON.parse(plugin)
      })
    },
    removePlugin() {
      this.$store.commit("UPDATE_VIEW_PLUGIN", {
        index: sessionStorage.getItem("pluginInfoIndex"),
        number: 1
      })
    },
    fullScreenPlugin() {
      const plugins = JSON.parse(JSON.stringify(this.plugins));
      plugins[sessionStorage.getItem("pluginInfoIndex")].style.left = 0;
      plugins[sessionStorage.getItem("pluginInfoIndex")].style.top = 0;
      plugins[sessionStorage.getItem("pluginInfoIndex")].style.width = this.views.width;
      plugins[sessionStorage.getItem("pluginInfoIndex")].style.height = this.views.height;
      this.$store.commit("UPDATE_VIEW_PLUGIN", {
        draggable: true,
        value: plugins
      })
    },
    openMenu(e, component, index) {
      const ptr = document.getElementById("canvasContextmenu");
      const ev = event || window.event;
      let {clientX, clientY} = ev;
      ptr.setAttribute("style",
          ptr.getAttribute("style") +
          `left: ${Math.round(clientX - 2)}px; top: ${Math.round(clientY - 8)}px;`)
      this.visible = true;
      sessionStorage.setItem("pluginInfoIndex", index);
      sessionStorage.setItem("pluginInfo", JSON.stringify(component));
    },
    closeMenu() {
      this.visible = false;
    },
    clickComp(index, data) {
      this.$store.commit("UPDATE_SETTING", {
        key: "disposition",
        value: "attribute"
      })
      this.$store.commit("UPDATE_ACTIVE", {
        key: "plugin",
        value: index
      })
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      const {vLine, hLine} = params;
      let id = 0;
      this.vLine = vLine.map(item => {
        item['id'] = ++id;
        return item;
      })
      this.hLine = hLine.map(item => {
        item['id'] = ++id;
        return item;
      })
    },
    onResize(event, data) {
      const {component, index} = JSON.parse(JSON.stringify(data));
      const plugin = component;
      Object.assign(plugin.style, event);
      this.$store.commit("UPDATE_PLUGIN", {
        viewIndex: this.entrance,
        pluginIndex: index,
        key: "style",
        value: plugin.style
      })
    },
    // 组件拖动事件
    onDrag(event, data) {
      const parameter = JSON.parse(JSON.stringify(data));
      const plugin = parameter.component;
      Object.assign(plugin.style, event);
      this.$store.commit("UPDATE_PLUGIN", {
        viewIndex: this.entrance,
        pluginIndex: data.index,
        key: "style",
        value: plugin.style
      })
    },
    active() {

    },
    handleLine(lines) {
      if(this.referLineStatus) {
        this.$store.commit("SET_LINES", lines);
      }
    },
    handleScroll() {
      const screensRect = document.querySelector("#screens").getBoundingClientRect();
      const canvasRect = document.querySelector("#wrapperCanvas").getBoundingClientRect();
      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
            Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.$store.commit("UPDATE_VISUAL", {
          index: this.entrance,
          number: 1,
          key: "zoom",
          value: parseInt(nextScale * 100 >= 400 ? 400 : nextScale * 100)
        })
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    initSize() {
      const wrapperRect = document.querySelector("#wrapper").getBoundingClientRect();
      const borderWidth = 1;
      this.width = wrapperRect.width - this.thick - borderWidth;
      this.height = wrapperRect.height - this.thick - borderWidth;
    },
    dragMousedown(e) {
      // 如果按下了空格键,且按下鼠标左键,那么鼠标变抓手,开启滚动条随鼠标拖动的操作
      if (this.keys.space) {
        this.dragSlide = true
        window.stardragEvent = e
        window.startSlideX = this.$refs.screensRef.scrollLeft
        window.startSlideY = this.$refs.screensRef.scrollTop
      }
    },
    //鼠标抬起
    dragMouseup() {
      this.dragSlide = false
      this.keys.space = false
    },
    // 鼠标移动
    dragMousemove(e) {
      if (this.dragSlide) {
        let x = e.clientX - window.stardragEvent.clientX
        let y = e.clientY - window.stardragEvent.clientY
        this.$refs.screensRef.scrollLeft = window.startSlideX - x
        this.$refs.screensRef.scrollTop = window.startSlideY - y
      }
    },
    listen() {
      document.onkeydown = (e) => {
        this.keys.ctrl = e.keyCode === 17;
        if (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT') return;
        // 按下空格键
        if (e.keyCode == 32) {
          e.preventDefault();
          this.keys.space = true
        }
      }
      document.onkeyup = () => {
        this.keys.ctrl = false;
      }
    },
    initScreens() {
      // 定义视图
      let screen = document.getElementById("screen-container");
      screen.style.width = this.screen.width + "px";
      screen.style.height = this.screen.height + "px";
      // 初始画布位置
      this.reposition();
    }
  },
  mounted() {
    this.initScreens();
    this.listen();
    this.initSize();
  }
}
</script>

<style scoped lang="scss">
.h5ve-canvas-container {
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  bottom: 25px;

  ::-webkit-scrollbar {
    width: 12px !important;
    height: 12px !important;
    background-color: #fff !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #dddee0 !important;
    border-radius: 5px !important;
  }
}

.homing-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  color: #4092ff;
  text-align: center;
  line-height: 20px;
  background-color: #323232;
}

#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

#screen-container {
  position: absolute;
  background-position: 0 0, 5px 5px !important;
  background-size: 10px 10px !important;
  background-image: linear-gradient(
          45deg,
          #eee 25%,
          transparent 25%,
          transparent 75%,
          #eee 75%,
          #eee 100%),
  linear-gradient(
          45deg,
          #eee 25%,
          #fff 25%,
          #fff 75%,
          #eee 75%,
          #eee 100%) !important;
  overflow: hidden;
}

.scale-value {
  position: absolute;
  left: 0;
  bottom: 100%;
}

.button {
  position: absolute;
  left: 100px;
  bottom: 100%;
}

.button-ch {
  position: absolute;
  left: 200px;
  bottom: 100%;
}

.button-en {
  position: absolute;
  left: 230px;
  bottom: 100%;
}

#wrapperCanvas {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 160px;
  height: 200px;
  background-color: #fff;
  transform-origin: 50% 0;
}
</style>

<style>
.v-container {
  border-right: 1px solid #f0f0f0;
}

.ruler {
  border-bottom: 1px solid #f0f0f0;
}
</style>
