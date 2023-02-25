<template>
  <div class="layer-container">
    <ul class="layer-list">
      <draggable v-model="plugins" :options="{name: 'layerPlugin', draggable:'.layer-item', animation: 300}">
        <li class="layer-item"
            v-for="(item, index) in plugins"
            @click="changeLayer(item, index)"
            @contextmenu.prevent="openMenu(item, index)"
            :class="{'active': index === active.plugin}">
          <label>
            <div class="line-clamp1">{{ item.name }} {{ item.type }}</div>
          </label>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "layer",
  computed: {
    ...mapGetters(["projectViews", "entrance", "active"]),
    plugins: {
      set(value) {
        this.$store.commit("UPDATE_VIEW_PLUGIN", {
          draggable: true,
          value: value
        })
      },
      get() {
        return this.projectViews[this.entrance].plugins;
      }
    }
  },
  methods: {
    changeLayer(data, index) {
      this.$store.commit("UPDATE_ACTIVE", {
        key: "plugin",
        value: index
      })
      const ref = document.getElementById(data.plugin + '.' + index);
      const e = document.createEvent("MouseEvents");
      e.initEvent("touchstart", false, false);
      ref.dispatchEvent(e);
      e.initEvent("mousedown", false, false);
      ref.dispatchEvent(e);
      e.initEvent("touchend", false, false);
      ref.dispatchEvent(e);
      e.initEvent("click", false, false);
      ref.dispatchEvent(e);
    },
    openMenu(data, index) {
      sessionStorage.setItem("pluginInfoIndex", index);
      sessionStorage.setItem("pluginInfo", JSON.stringify(data));
      const ptr = document.getElementById("canvasContextmenu");
      const ev = event || window.event;
      let {clientX, clientY} = ev;
      if (clientX > document.body.clientWidth - 100) {
        clientX = document.body.clientWidth - 100
      }
      if (clientY > document.body.clientHeight - 100) {
        clientY = document.body.clientHeight - 100
      }
      ptr.setAttribute("style",
          ptr.getAttribute("style") +
          `left: ${Math.round(clientX - 2)}px; top: ${Math.round(clientY - 8)}px; display: block;`)
    },
    closeMenu() {
      const ptr = document.getElementById("canvasContextmenu");
      ptr.style.display = "none"
    }
  },
  mounted() {
    document.body.addEventListener('click', this.closeMenu)
  }
}
</script>

<style scoped lang="scss">
.layer-container {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.layer-item {
  padding: 13px 16px;
  background-color: #fefefe;
}

.active {
  color: #4092ff;
  border-left: 3px solid #4092ff;
  background-color: #f9f9f9;
}
</style>
