<template>
  <div class="swiper-config-container">
    <el-form size="mini" label-position="top">
      <el-form-item :label="$t('plugin.color')">
        <div class="flex-row">
          {{ $t('plugin.backgroundColor') }}：
          <el-color-picker v-model="plugin.style.backgroundColor" show-alpha></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('plugin.list')">
        <ul class="image-list">
          <draggable
              v-model="plugin.attr.list"
              :options="{name: 'chooseFile',
              draggable:'.swiper-item-info',
              animation: 300}">
            <li class="swiper-item-info" v-for="(item, index) in plugin.attr.list">
              <div class="choose-file" style="cursor: auto;">
                <span class="el-icon-sort"></span>
                <el-popover
                    placement="top"
                    trigger="click">
                  <el-input-number
                      :min="0"
                      controls-position="right"
                      v-model="item.duration"/>
                  <span slot="reference" class="duration">{{ item.duration }} {{ $t('plugin.second') }}</span>
                </el-popover>
                <span class="resolution">{{ item.resolution }}</span>
                <img v-if="item.type === 'image'" style="width: 100%; height: 120px;"
                     :src="url(item.src) || empty"/>
                <video v-else
                       style="height: 120px; width: 100%;object-fit: fill; vertical-align: bottom;"
                       :disabled="true"
                       :autoplay="false"
                       :controls="false"
                       :src="url(item.src)">
                  {{ $t('plugin.video') }}
                </video>
                <div class="bottom">
                  <span v-if="item.type !== 'image'"
                        @click.stop="volume(index)"
                        style="cursor: pointer;"
                        :class="item.mute ? 'el-icon-close-notification' : 'el-icon-bell'"
                        class="volume">
                  </span>
                  <span @click.stop="choose" style="cursor: pointer;"
                        class="name line-clamp1">{{ item.name || $t('plugin.choose') }}</span>
                  <div class="button">
                    <span style="margin-right: 5px;cursor: pointer;" class="el-icon-plus"
                          @click.stop="addHandleIndex(index)"></span>
                    <span style="cursor: pointer;" class="el-icon-delete" v-show="plugin.attr.list.length"
                          @click.stop="deleteHandle(index)"></span>
                  </div>
                </div>
              </div>
            </li>
          </draggable>
          <el-button
              style="width: 100%;"
              class="el-icon-plus"
              @click="addHandle">
            {{ $t('plugin.add') }}
          </el-button>
        </ul>
      </el-form-item>
      <el-form-item :label="$t('plugin.swiper')">
        <el-checkbox v-model="plugin.attr.loop">{{ $t('plugin.loopPlay') }}</el-checkbox>
      </el-form-item>
    </el-form>
    <material mode="multiple" :ids="ids" :type-list="['image']" :visible="visible" @cancel="visible = false"
              @confirm="confirm"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "pictureConfig",
  inject: ["url"],
  data() {
    return {
      empty: require("@/assets/images/empty-img.png"),
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
    },
    ids() {
      return this.plugin.attr.list.map(item => item.id);
    }
  },
  methods: {
    choose() {
      this.visible = true;
    },
    volume(index) {
      const plugin = this.plugin.attr.list[index];
      plugin.mute = !plugin.mute;
      const list = JSON.parse(JSON.stringify(this.plugin.attr.list));
      this.$set(this.plugin.attr, "list", list);
    },
    confirm(list) {
      const arrayList = JSON.parse(JSON.stringify(list));
      const array = arrayList.map(data => {
        data.duration = Number(data.duration) || 10;
        data.src = data.url;
        return data;
      })
      let arr = JSON.parse(JSON.stringify(this.plugin.attr.list));
      this.$set(this.plugin.attr, "list", arr.concat(array));
      this.visible = false;
    },
    addHandle() {
      this.visible = true;
      // this.plugin.attr.list.push({
      //   id: this.$utils.uuid(),
      //   type: "image",
      //   src: "",
      //   mute: false,
      //   duration: 10
      // });
    },
    addHandleIndex(index) {
      this.visible = true;
      // this.plugin.attr.list.splice(index + 1, 0, {
      //   id: this.$utils.uuid(),
      //   type: "image",
      //   src: "",
      //   mute: false,
      //   duration: 10
      // });
    },
    deleteHandle(index) {
      this.plugin.attr.list.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
.image-list {
  li {
    margin-bottom: 8px;

    .el-icon-sort {
      position: absolute;
      top: 9px;
      left: 10px;
      padding: 3px 7px;
      background-color: #fff;
      font-size: 13px;
      border-radius: 3px;
    }

    .duration {
      top: 8px;
      left: 44px;
      padding: 0 5px;
      border-radius: 3px;
      color: #4092ff;
      z-index: 100;
      background-color: #fff;
      line-height: 20px;
    }

    .bottom {
      position: relative;
      padding-left: 10px;

      .volume {
        position: absolute;
        right: 6px;
        bottom: 29px;
        background-color: #fff;
        padding: 3px 7px;
        font-size: 13px;
        border-radius: 3px;
        color: #409aff;
      }

      .name {
        width: calc(100% - 75px);
        color: #409aff;
      }

      .button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 70px;
        text-align: center;
        background-color: #ecf4ff;
        color: #409aff;

        span {
          padding: 3px 7px;
          background-color: #fff;
          font-size: 13px;
          border-radius: 3px;
        }
      }
    }
  }
}

</style>
