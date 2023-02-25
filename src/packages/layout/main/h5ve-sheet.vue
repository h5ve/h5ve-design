<template>
  <div class="h5ve-sheet-container" id="canvas-sheet">
    <div>
      <ul class="canvas-sheet-list">
        <li class="canvas-sheet-item pointer"
            @contextmenu.prevent="openMenu($event, item, index)"
            @click="handoffView(item, index)"
            :class="{active: index === entrance}"
            v-for="(item, index) in projectViews" :key="index">
          <span style="font-size: 16px;" class="el-icon-monitor"></span>
          <span style="margin: 0 5px">{{ item.name }}</span>
          <span v-if="projectViews.length !== 1" @click.stop="deleteView(item, index)"
                class="el-icon-close el-icon-item"></span>
        </li>
<!--        <li class="canvas-sheet-item pointer">-->
<!--          <span class="el-icon-plus el-icon-item" @click="newView"></span>-->
<!--        </li>-->
      </ul>
    </div>
    <ul v-if="visible"
        style="transition: .3s;"
        class="contextmenu el-dropdown-menu el-dropdown-menu--small"
        :style="{ left: left + 'px', top: top + 'px' }">
      <li class="el-dropdown-menu__item" @click="modify">
        <span class="el-icon-edit"></span>
        <span> 修改</span>
      </li>
      <li class="el-dropdown-menu__item" @click="copy">
        <span class="el-icon-copy-document"></span>
        <span> 复制</span>
      </li>
      <li class="el-dropdown-menu__item" @click="empty">
        <span class="el-icon-delete"></span>
        <span> 清空</span>
      </li>
    </ul>
    <el-dialog
        :title="viewForm.name || '新建页面'"
        width="520px"
        :close-on-click-modal="false"
        :visible.sync="visibleView">
      <el-form size="small" :model="viewForm" :rules="rules" ref="viewForm" label-width="120px">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="viewForm.name"></el-input>
        </el-form-item>
        <el-form-item label="页面宽（px）" prop="width">
          <el-input-number style="width: 100%;" :min="200" controls-position="right" v-model.number="viewForm.width"/>
        </el-form-item>
        <el-form-item label="页面高（px）" prop="height">
          <el-input-number style="width: 100%;" :min="200" controls-position="right" v-model.number="viewForm.height"/>
        </el-form-item>
        <el-form-item label="时长（秒）" prop="duration">
          <el-input-number style="width: 100%;" :min="0" controls-position="right" v-model.number="viewForm.duration"/>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="cancelForm('viewForm')">取 消</el-button>
          <el-button @click="resetForm('viewForm')">重 置</el-button>
          <el-button type="primary" @click="submitForm('viewForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "h5veSheet",
  computed: {
    ...mapGetters(["projectViews", "entrance"]),
  },
  watch: {
    visible(value) {
      if (value) document.body.addEventListener('click', this.closeMenu)
      else document.body.removeEventListener('click', this.closeMenu)
    }
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      rules: {
        name: [
          {required: true, message: '请输入页面名称', trigger: 'blur'}
        ],
        width: [
          {required: true, message: '请输入页面宽', trigger: 'blur'}
        ],
        height: [
          {required: true, message: '请输入页面高', trigger: 'blur'}
        ]
      },
      visibleView: false,
      viewForm: {
        name: "",
        width: 800,
        height: 500,
        duration: 10
      }
    }
  },
  methods: {
    handoffView(data, index) {
      this.$store.commit("UPDATE_INFO", {
        key: "entrance",
        value: index
      })
    },
    deleteView(data, index) {
      this.$confirm(`确定永久删除【${data.name}】页面吗?`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit("UPDATE_VIEW", {index, number: 1})
      })
    },
    empty() {
      this.$store.commit("UPDATE_VIEW_PLUGIN", {})
    },
    copy() {
      this.$store.commit("UPDATE_VIEW", {
        index: this.entrance,
        number: 0,
        value: this.projectViews[this.entrance]
      })
      this.$store.commit("UPDATE_VISUAL", {
        key: "lines",
        value: {h: [0, 200], v: [0, 200]}
      })
      this.$store.commit("UPDATE_VISUAL", {
        key: "zoom",
        value: 100
      })
      this.$store.commit("UPDATE_INFO", {
        key: "entrance",
        value: this.entrance + 1
      })
    },
    modify() {
      this.visibleView = true;
      this.isModify = true;
    },
    newView() {
      this.isModify = false;
      this.visibleView = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const view = {
            name: this.viewForm.name,
            width: this.viewForm.width,
            height: this.viewForm.height,
            duration: this.viewForm.duration,
            plugins: this.isModify ? this.viewForm.plugins : [],
            style: {
              opacity: 100,
              backgroundColor: "#fff"
            },
            attr: {
              src: ""
            }
          }
          if (this.isModify) {
            this.$store.commit("UPDATE_VIEW", {
              index: this.entrance,
              number: this.viewIndex,
              value: view
            })
          } else {
            this.$store.commit("UPDATE_VISUAL", {
              key: "lines",
              value: {h: [0, 200], v: [0, 200]}
            })
            this.$store.commit("UPDATE_VISUAL", {
              key: "zoom",
              value: 100
            })
            this.$store.commit("UPDATE_INFO", {
              key: "entrance",
              value: this.entrance + 1
            })
            this.$store.commit("UPDATE_VIEW", {
              value: view
            })
          }
          this.cancelForm('viewForm');
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.visibleView = false;
    },
    openMenu(e, item, index) {
      // const offsetLeft = this.$el.getBoundingClientRect().left;
      // const offsetWidth = this.$el.offsetWidth;
      // const maxLeft = Math.round(offsetWidth);
      // const left = Math.round(e.clientX - offsetLeft);
      // if (left > maxLeft) this.left = maxLeft;
      // else this.left = left;
      // this.top = Math.round(e.clientY - 50);
      // this.visible = true;
      // this.viewForm = JSON.parse(JSON.stringify(item));
      // this.viewIndex = index;
    },
    closeMenu() {
      this.visible = false;
    }
  }
}
</script>

<style scoped lang="scss">
.h5ve-sheet-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  border-bottom: 1px solid #f0f0f0;

  .canvas-sheet-list {
    height: 25px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }

    .canvas-sheet-item {
      display: inline-block;
      height: 25px;
      padding: 0 8px;
      line-height: 25px;
      font-size: 13px;

      &:hover {
        color: #4092ff;
      }

      .el-icon-item {
        padding: 3px;
        font-weight: 700;

        &:hover {
          border-radius: 5px;
          background-color: rgba(64, 146, 255, .1);
        }
      }
    }

    .active {
      color: #4092ff;
      background-color: rgba(64, 146, 255, .1);
      border-bottom: 2px solid #4092ff;
    }
  }
}
</style>
