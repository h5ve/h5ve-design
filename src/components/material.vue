<template>
  <!--选择素材-->
  <el-dialog
    @close="$emit('cancel')"
    :title="$t('plugin.selectFootage')"
    append-to-body
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form inline ref="queryForm" :model="material" size="small">
      <el-form-item label="分组" prop="groupId">
        <tree-select
          placeholder="请选择素材分组"
          :data="groupOptions"
          :props="defaultProps"
          :clearable="true"
          :accordion="true"
          @getValue="getValue"/>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input circle v-model="material.name" placeholder="请输入素材名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getListMaterial" type="primary">{{ $t('plugin.search') }}</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">{{ $t('plugin.rest') }}</el-button>
      </el-form-item>
    </el-form>
    <el-radio-group
      @change="changeType"
      v-if="typeList.length > 1"
      style="margin-bottom: 8px;"
      v-model="material.type" size="small">
      <el-radio
        border
        :label="item"
        style="margin-right: 5px;"
        v-for="item in typeList">
        <span>{{ item | filterType }}</span>
      </el-radio>
    </el-radio-group>
    <el-row :gutter="20" v-loading="material.loading">
      <el-col :span="6" v-for="(item, index) in material.list">
        <label>
          <div style="background-color: #fff; width: 167px; font-weight: 400; border: 2px solid transparent;"
               :class="{'active-material': currentIndex.some(s => s.id == item.id)}" class="choose-file"
               @click="rowClick(item)">
            <span v-show="Number(item.duration)" class="duration">{{ item.duration }} {{ $t('plugin.second') }}</span>
            <span class="resolution">{{ item.resolution }}</span>
            <img v-if="item.type === 'image'"
                 style="width: 100%; height: 120px;"
                 :src="filterUrl(item)"/>
            <img v-if="item.type === 'file'"
                 style="width: 100%; height: 120px;"
                 :src="filterUrl(item)"/>
            <div v-if="item.type === 'audio'" style="height: 120px; width: 100%; background-color: #ecf4ff;">
              <svg-icon style="color: #86baff; font-size: 36px; margin: 10px;" icon-class="audio"/>
            </div>
            <video v-if="item.type === 'media'"
                   style="height: 120px; width: 100%; object-fit: fill; vertical-align: bottom;"
                   :disabled="true"
                   :autoplay="false"
                   :controls="false"
                   :src="filterUrl(item)">
              {{ $t('tips.canvas') }}
            </video>
            <div class="bottom line-clamp1">
              <span style="margin: 0 5px;">{{ item.name }}</span>
            </div>
          </div>
        </label>
      </el-col>
    </el-row>
    <el-pagination
      style="margin-top: 16px;"
      @size-change="getListMaterial"
      @current-change="getListMaterial"
      :current-page.sync="material.current"
      :page-size="material.size"
      layout="total, prev, pager, next"
      :total="material.total">
    </el-pagination>
    <div style="text-align: right; margin-top: 16px;">
      <el-button size="small" @click="$emit('cancel')">{{ $t('tips.cancel') }}</el-button>
      <el-button size="small" :disabled="!currentIndex.length" type="primary" @click="confirm"> {{
          $t('tips.confirm')
        }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import treeSelect from "./TreeSelect/index"
import {request} from "@/config";
import Cookies from "js-cookie";

const {getMaterialList, groupTree} = request;
export default {
  name: "material",
  inject: ['equipment'],
  components: {
    treeSelect
  },
  watch: {
    visible: {
      handler() {
        this.currentIndex = [];
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    mode: {
      type: String,
      default: "single"
    }, // single、multiple
    ids: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: "选择素材"
    },
    visible: {
      type: Boolean,
      default: false
    },
    typeList: {
      type: Array,
      default() {
        return ["image"]
      }
    }
  },
  filters: {
    filterType(data) {
      const typeList = [
        {label: "图片", name: "image"},
        {label: "视频", name: "media"},
        {label: "音频", name: "audio"}];
      const vo = typeList.find(item => data === item.name);
      const {label, name} = vo;
      const language = Cookies.get('language') || "zh"
      return language === 'zh' ? label : name;
    }
  },
  computed: {
    currentType() {
      return this.typeList.length ? this.typeList[0] : ""
    }
  },
  data() {
    const type = this.typeList[0]
    return {
      defaultProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      groupOptions: [],
      empty: require("@/assets/images/empty-img.png"),
      currentIndex: [],
      material: {
        name: "",
        groupId: "",
        type: type,
        list: [],
        current: 1,
        total: 0,
        size: 20,
        loading: false,
        data: []
      },
      baseUrl: sessionStorage.getItem('baseUrl')
    }
  },
  methods: {
    getValue(value) {
      this.material.groupId = value;
      this.getListMaterial();
    },
    getTree() {
      groupTree({type: '0'}).then(response => {
        this.groupOptions = response.data
      })
    },
    changeType() {
      this.material.current = 1;
      this.getListMaterial();
    },
    filterUrl(data) {
      const {decodedUrl, originalUrl} = data;
      return data ? `${this.baseUrl}${decodedUrl || originalUrl}` : this.empty;
    },
    rowClick(data) {
      if (this.mode === "multiple") {
        if (this.currentIndex.some(item => item.id == data.id)) {
          this.currentIndex = this.currentIndex.filter(item => item.id !== data.id);
        } else {
          this.currentIndex.push(data)
        }
      } else {
        this.currentIndex = [data]
      }
    },
    confirm() {
      let array = JSON.parse(JSON.stringify(this.currentIndex));
      this.material.data = [];
      let flag = false;
      array.forEach(data => {
        const {decodedUrl, originalUrl} = data;
        data.url = `${this.baseUrl}${decodedUrl || originalUrl}`
        if (data.addition) {
          data.addition = data.addition.split(",").map(item => this.baseUrl + item);
        } else {
          flag = true;
        }
        this.material.data.push(data);
      })
      if (flag && this.currentType === 'file') {
        return this.$notify.warning("当前文档未转换成功")
      }
      if (this.mode === "multiple") {
        this.$emit("confirm", this.material.data);
      } else {
        const data = this.material.data;
        this.$emit("confirm", data.length ? data[0] : {});
      }
    },
    getListMaterial() {
      this.material.loading = true;
      if (!Number(this.material.groupId)) {
        this.material.groupId = "";
      }
      getMaterialList({
        name: this.material.name,
        groupId: this.material.groupId,
        type: this.material.type,
        current: this.material.current,
        size: this.material.size
      }).then(response => {
        const {total, data} = response;
        if (data) {
          data.forEach((item, index) => {
            if (item.type === 'file') {
              const list = item.addition ? item.addition.split(",") : [""]
              data[index].decodedUrl = list[0];
            }
          })
          this.material.list = data;
          this.material.total = total;
        }
        this.material.loading = false;
      })
    },
    resetQuery() {
      this.$refs.queryForm.resetFields();
      this.material.current = 1;
      this.material.groupId = "";
      this.getListMaterial();
    }
  },
  created() {
    if (!this.equipment) {
      this.getListMaterial();
      this.getTree();
    }
  }
}
</script>

<style>
.active-material {
  transition: .3s;
  background-color: #ecf4ff !important;
  border: 3px solid #409eff !important;
}
</style>
