<template>
  <div class="h5ve-config-container">
    <div class="config-section">
      <component :is="disposition" />
    </div>
    <div class="config-control">
      <ul class="control-list">
        <li class="control-item pointer"
            v-for="(item, index) in $t('setting.controlList')"
            :class="{'active': item.type === disposition}"
            @click="handoff(item)"
            :key="index">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import attribute from "@/packages/layout/config/attribute";
import layer from "@/packages/layout/config/layer";
import screen from "packages/layout/config/screen";
export default {
  name: "h5veConfig",
  components: {attribute, layer, screen},
  computed: {
    ...mapGetters(["disposition", "projectViews", "entrance", "active"]),
    canvas() {
      return this.projectViews[this.entrance].plugins;
    },
    plugin() {
      return this.canvas[this.active.plugin];
    }
  },
  methods: {
    handoff(data) {
      this.$store.commit("UPDATE_SETTING", {
        key: "disposition",
        value: data.type
      })
    }
  }
}
</script>

<style scoped lang="scss">
.h5ve-config-container {
  position: absolute;
  right: 0;
  bottom: 25px;
  top: 44px;
  z-index: 10;
  display: flex;
  background-color: #fff;
}

.config-section {
  width: 270px;
  border-left: 1px solid #f0f0f0;
  .section-nav {
    height: 25px;
    border-bottom: 1px solid #f0f0f0;
  }
}

.config-control {
  width: 20px;
  height: 100%;
  border-left: 1px solid #f0f0f0;

  .control-list {
    &::-webkit-scrollbar {
      display: none;
    }

    .control-item {
      padding: 16px 0 11px 0;
      color: #333;

      span {
        text-align: center;
        font-size: 12px;
        line-height: 19px;
        writing-mode: tb;
      }
    }

    .active,
    .control-item:hover {
      transition: .3s;
      color: #4092ff;
      background-color: #f9f9f9;
    }

    .active {
      background-color: rgba(64, 146, 255, .15);
    }
  }
}

</style>
