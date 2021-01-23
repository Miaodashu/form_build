/* eslint-disable vue/valid-v-for */ /* eslint-disable vue/valid-v-for */
<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-box">
        <!-- <img class="logo" src="../assets/logo.png" alt="" /> -->
        <span class="title">可视化表单设计器</span>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="component-list">
          <div v-for="(item, index) in leftComponents" :key="index">
            <div class="components-title">
              <i class="el-icon-s-ticket"></i>
              <span>{{ item.title }}</span>
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <!-- <svg-icon :icon-class="element.__config__.tagIcon" /> -->
                  <i class="el-icon-setting"></i>
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="conter-board">
      <div class="action-bar">
        <el-button type="text" icon="el-icon-tickets" @click="handlePreviewJSON"
          >查看JSON</el-button
        >
        <el-button type="text" icon="el-icon-view" @click="handlePreview"
          >预览</el-button
        >
        <el-button type="text" icon="el-icon-download" @click="handleDownLoad"
          >导出</el-button
        >
        <el-button type="text" icon="el-icon-delete" @click="handleDel"
          >删除</el-button
        >
      </div>
      <el-scrollbar class="conter-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :label-position="formConf.labelPosition"
            :label-width="formConf.labelWidth + 'px'"
            :size="formConf.size"
            :disabled="formConf.disabled"
          >
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
              ghostClass="ghost"
            >
              <draggable-item
                v-for="(item, index) in drawingList"
                :key="item.renderKey"
                :drawing-list="drawingList"
                :current-item="item"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeItem"
                @copyItem="copyItem"
                @delItem="delItem"
              />
            </draggable>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>
    <div class="right-board">
      <right-panel
        :active-data="activeData"
        :form-conf="formConf"
        :show-options="showOptions"
        @fetch-data="fetchData"
        @editor-show="editorShow"
      ></right-panel>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="dialogTableVisible"
      :with-header="false"
      size="50%"
    >
      <ace-editor
        ref="aceEditor"
        lang="javascript"
        @init="editorInit"
        :options="editorOptions"
        theme="tomorrow_night_blue"
        :value="ace_content"
        :height="ace_btn ? `calc(100% - 70px)` : '100%'"
      ></ace-editor>
      <div class="drawer-group" v-if="ace_btn">
        <el-button type="primary" @click="handleGetEditor">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { deepClone } from "@/utils/index";
import DraggableItem from "./DraggableItem.vue";
import RightPanel from "./RightPanel";
import AceEditor from "vue2-ace-editor";
import {
  baseComponents,
  formConf,
  selectComponents
} from "@/components/generator/config.js";
// import { formBuild } from "@/components/generator/buildFrom.js";
let tempActiveData;
export default {
  name: "Home",
  components: { draggable, DraggableItem, RightPanel, AceEditor },
  data() {
    return {
      formConf,
      leftComponents: [
        {
          title: "基础组件",
          list: baseComponents
        },
        {
          title: "选择型组件",
          list: selectComponents
        }
      ],
      drawingList: [], // 已经在画布中的组件集合
      activeData: {}, // 当前选中的组件对象
      activeId: "", // 当前选中的组件ID
      globalId: 100, // 生成唯一key使用的基数
      ace_content: "", // json数据展示内容
      ace_btn: true, //显示ace底部按钮
      dialogTableVisible: false,
      editorOptions: {
        // 设置代码编辑器的样式
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 16,
        showPrintMargin: false //去除编辑器里的竖线
      }
    };
  },
  computed: {
    showOptions() {
      return this.drawingList.length > 0;
    }
  },
  methods: {
    // 中间组件  拖拽item点击事件
    activeItem(item) {
      this.activeData = item;
      this.activeId = item.__config__.formId;
    },
    delItem(item, index) {
      this.drawingList.splice(index, 1);
      if (this.drawingList.length == 0) return;
      this.activeData = this.drawingList[index];
      this.activeId = this.drawingList[index].__config__.formId;
    },
    copyItem(item) {
      let cloneData = this.cloneComponent(item);
      this.drawingList.push(cloneData);
      this.activeData = cloneData;
      this.activeId = this.activeData.__config__.formId;
    },
    // 清空组件列表
    handleDel() {
      this.drawingList = [];
      this.activeData = {};
      this.activeId = "";
      this.globalId = "";
    },
    // 预览
    handlePreview() {
      // this.$bus.$emit("templateData", this.drawingList);
      sessionStorage.setItem(
        "templateData",
        JSON.stringify(this.drawingList, null, 2)
      );
      // let options = {
      //   comList: this.drawingList,
      //   formConf: this.formConf
      // };
      // let strArr = formBuild(options);
      // console.log(JSON.stringify(strArr.join("\n"), null, 2));
      this.$router.push("/Demo");
    },
    // 查看JSON
    handlePreviewJSON() {
      this.ace_content = JSON.stringify(this.drawingList, null, 2);
      this.ace_btn = false;
      this.dialogTableVisible = true;
    },
    // 导出
    handleDownLoad() {
      // ss
      console.log(555);
      this.$router.push("/Demo");
    },
    // 拖拽结束
    onEnd(obj) {
      if (obj.from !== obj.to) {
        // this.fetchData(tempActiveData)
        this.activeData = tempActiveData;
        this.activeId = tempActiveData.__config__.formId;
      }
    },
    // 获取远程数据
    fetchData(data) {
      let { dataType, url, method, dataPath = "list" } = data.__config__;
      if (dataType === "dynamic" && method && url) {
        this.$axios({
          method,
          url
        }).then(resp => {
          this.setRespData(data, resp.data[dataPath]);
        });
      }
    },
    // 将远程获取的数据设置到当前组件对象中
    setRespData(component, data) {
      const { dataType, renderKey, dataConsumer } = component.__config__;
      if (!dataType && dataType != "dynamic") return;
      if (dataConsumer !== undefined) {
        component[dataConsumer] = data;
      } else {
        component.__slot__.options = data;
      }
      let index = this.drawingList.findIndex(
        item => item.__config__.renderKey === renderKey
      );
      if (index > -1) {
        this.$set(this.drawingList, index, component);
      }
    },
    addComponent(element) {
      // 深拷贝，生成唯一key
      const cloneData = this.cloneComponent(element);
      // this.fetchData(element) // 远程获取选项数据
      this.drawingList.push(cloneData);
      this.activeData = cloneData;
      this.activeId = cloneData.__config__.formId;
    },
    // 深拷贝选中的组件对象，生成唯一ID，渲染的key等操作
    cloneComponent(origin) {
      const clone = deepClone(origin);
      // const config = clone.__config__;
      // config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone);
      tempActiveData = clone;
      return tempActiveData;
    },
    // 生成组件对象数据的唯一标记以及唯一渲染Key,用于强制更新render组件
    createIdAndKey(data) {
      const config = data.__config__;
      config.formId = config.tag + ++this.globalId;
      config.renderKey = `${config.formId}${+new Date()}`; // 改变renderKey后可以实现强制更新组件
      // 只有layout为colFormItem的，才用设置keyName（字段名称），其他layout为容器性质 而不是组件性质
      if (config.layout === "colFormItem") {
        data.keyName = "field" + this.globalId;
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem =>
          this.createIdAndKey(childItem)
        );
      }
      return data;
    },
    // Ace编辑器初始化
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/yaml");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/tomorrow_night_blue");
      require("brace/snippets/javascript");
    },
    // 右边部分 设置数据源显示抽屉
    // eslint-disable-next-line no-unused-vars
    editorShow(options) {
      this.ace_content = JSON.stringify(options, null, 2);
      this.dialogTableVisible = true;
    },
    handleGetEditor() {
      let data = this.$refs.aceEditor._data.contentBackup;
      this.$set(this.activeData, "options", JSON.parse(data));
      this.dialogTableVisible = false;
    }
  }
};
</script>
<style lang="less">
@import "../style/home.less";
</style>
