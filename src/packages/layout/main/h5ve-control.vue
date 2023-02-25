<template>
  <div class="h5ve-control-container">
    <ul class="control-list">
      <li class="control-item" v-for="(item, index) in $t('setting.controlRulerList')"
          :class="{'active': ruler.includes(item.type)}"
          :key="'control_ruler_list' + index">
        <label @click="changeRuler(item)">
          <div>{{ item.name }}</div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "h5veControl",
  computed: {
    ...mapGetters(["ruler"]),
  },
  methods: {
    changeRuler(data) {
      if(data.type === "ruler") {
        return;
      }
      this.$store.commit("UPDATE_RULER", {
        value: data.type
      })
    }
  }
}
</script>

<style scoped lang="scss">
.h5ve-control-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25px;
}

.control-list {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .control-item {
    font-size: 12px;
    display: inline-block;
    line-height: 25px;
    padding: 0 10px;
    border-right: 1px solid #fff;

    &:last-child {
      border: 0;
    }
  }

  .control-item:hover {
    transition: .3s;
    color: #4092ff;
  }

  .active {
    color: #4092ff;
    background-color: rgba(64, 146, 255, .15);
  }
}
</style>
