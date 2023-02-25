<template>
  <div class="h5ve-aside-container">
    <div class="aside-nav">
      <ul>
        <li @click="currentTarget = index" v-for="(item, index) in $t('header.pluginType')"
            :key="'plugin_type' + index">
          <label :class="{'active': currentTarget === index}">
            <span style="font-size: 20px;" :class="item.icon"></span>
            <p style="font-size: 14px;word-break:break-all;">{{ item.name }}</p>
          </label>
        </li>
      </ul>
    </div>
    <div class="aside-section">
      <ul>
        <draggable v-model="$t('header.plugins')[currentTarget]"
                   :options="{name: 'asidePlugin',sort: false, draggable:'.plugin-item', animation: 300}">
          <li class="plugin-item" @click="pushPlugin(item)" v-for="(item, index) in $t('header.plugins')[currentTarget]"
              :key="'aside-section' + index">
            <label>
              <span style="font-size: 20px;" :class="item.icon"></span>
              <div style="font-size: 14px; margin-left: 10px;">{{ item.name }}</div>
            </label>
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>

<script>
import plugins from "@/packages/data/plugins";

export default {
  name: "h5veAside",
  data() {
    return {
      currentTarget: 0,
    }
  },
  methods: {
    pushPlugin(data) {
      if (!data.disabled) {
        this.$store.commit("UPDATE_VIEW_PLUGIN", {
          value: data.attribute
        })
        this.$store.commit("UPDATE_SETTING", {
          key: "disposition",
          value: "attribute"
        })
      } else {
        this.$notify({
          title: '系统提示',
          message: '该组件正在开发中',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.h5ve-aside-container {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 25px;
  width: 240px;
  display: flex;
}

.aside-nav,
.aside-section {
  width: 50px;
  height: 100%;
  border-right: 1px solid #f0f0f0;

  li {
    text-align: center;
    padding: 10px 0;

    label {
      transition: .3s;
    }

    .active {
      transition: .3s;
      color: #4092ff;
    }
  }
}

.aside-section {
  width: 190px;
  height: 100%;

  li {
    padding: 20px 0;
    margin: 5px;
    border-radius: 5px;

    &:hover {
      background-color: #f9f9f9;
      color: #4092ff;
    }

    label {
      display: flex;
      align-items: center;
      margin-left: 16px;
    }
  }
}
</style>
