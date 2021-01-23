<template>
  <div class="rightPanel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件属性" name="first"></el-tab-pane>
      <el-tab-pane label="表单属性" name="second"></el-tab-pane>
    </el-tabs>
    <el-scrollbar class="right-scrollbar">
      <el-form
        v-if="
          activeName === 'first' &&
            showOptions &&
            activeData.__config__ !== undefined
        "
        ref="form"
        label-position="left"
        size="mini"
        label-width="90px"
      >
        <el-form-item
          label="标题"
          v-if="
            activeData.__config__ && activeData.__config__.label !== undefined
          "
        >
          <el-input v-model="activeData.__config__.label"></el-input>
        </el-form-item>
        <el-form-item label="字段值" v-if="activeData.keyName !== undefined">
          <el-input v-model="activeData.keyName"></el-input>
        </el-form-item>
        <el-form-item
          label="标签宽度"
          v-if="activeData.__config__.labelWidth !== undefined"
        >
          <el-input
            type="number"
            v-model="activeData.__config__.labelWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认值" v-if="activeData.keyName !== undefined">
          <el-input
            :value="getDefaultValue(activeData.__config__.defaultValue)"
            @input="setDefaultValue"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="标题内容"
          v-if="activeData.props && activeData.props.content !== undefined"
        >
          <el-input v-model="activeData.props.content"></el-input>
        </el-form-item>
        <el-form-item
          label="对齐方式"
          v-if="
            activeData.props && activeData.style['text-align'] !== undefined
          "
        >
          <el-radio-group v-model="activeData.style['text-align']">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="标题标签"
          v-if="activeData.props && activeData.props['level'] !== undefined"
        >
          <el-select v-model="activeData.props['level']">
            <el-option
              v-for="item in 5"
              :key="item + 'h'"
              :label="'h' + item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="提示语"
          v-if="activeData.placeholder !== undefined"
        >
          <el-input v-model="activeData.placeholder"></el-input>
        </el-form-item>
        <el-form-item
          label="表单栅格"
          v-if="activeData.__config__.span !== undefined"
        >
          <el-slider
            v-model="activeData.__config__.span"
            :min="1"
            :max="24"
          ></el-slider>
        </el-form-item>
        <el-form-item
          label="组件宽度"
          v-if="activeData.style && activeData.style.width !== undefined"
        >
          <el-input v-model="activeData.style.width"></el-input>
        </el-form-item>
        <el-form-item
          label="最多输入"
          v-if="activeData.maxlength !== undefined"
        >
          <el-input-number
            controls-position="right"
            v-model="activeData.maxlength"
            :min="1"
          ></el-input-number>
          <span> 个字符</span>
        </el-form-item>
        <el-form-item
          label="最小行数"
          v-if="
            activeData.autosize && activeData.autosize.minRows !== undefined
          "
        >
          <el-input-number
            v-model="activeData.autosize.minRows"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="最大行数"
          v-if="
            activeData.autosize && activeData.autosize.maxRows !== undefined
          "
        >
          <el-input-number
            v-model="activeData.autosize.maxRows"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="是否必填"
          v-if="activeData.__config__.required !== undefined"
        >
          <el-switch v-model="activeData.__config__.required"></el-switch>
        </el-form-item>
        <el-form-item label="是否只读" v-if="activeData.readonly !== undefined">
          <el-switch v-model="activeData.readonly"></el-switch>
        </el-form-item>
        <el-form-item label="是否禁用" v-if="activeData.disabled !== undefined">
          <el-switch
            @change="handleChageDisabled"
            v-model="activeData.disabled"
          ></el-switch>
        </el-form-item>
        <el-form-item label="可清空" v-if="activeData.clearable !== undefined">
          <el-switch v-model="activeData.clearable"></el-switch>
        </el-form-item>
        <el-form-item
          label="字数统计"
          v-if="activeData['show-word-limit'] !== undefined"
        >
          <el-switch v-model="activeData['show-word-limit']"></el-switch>
        </el-form-item>
        <el-form-item
          label="开启颜色"
          v-if="activeData['active-color'] !== undefined"
        >
          <el-color-picker
            v-model="activeData['active-color']"
          ></el-color-picker>
        </el-form-item>
        <el-form-item
          label="关闭颜色"
          v-if="activeData['inactive-color'] !== undefined"
        >
          <el-color-picker
            v-model="activeData['inactive-color']"
          ></el-color-picker>
        </el-form-item>
        <el-form-item
          label="开启的值"
          v-if="activeData['active-value'] !== undefined"
        >
          <el-input v-model="activeData['active-value']"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="关闭的值"
          v-if="activeData['inactive-value'] !== undefined"
        >
          <el-input v-model="activeData['inactive-value']"></el-input>
        </el-form-item>
        <el-form-item
          label="开启描述"
          v-if="activeData['active-text'] !== undefined"
        >
          <el-input v-model="activeData['active-text']"></el-input>
        </el-form-item> -->
        <el-form-item
          label="关闭描述"
          v-if="activeData['inactive-text'] !== undefined"
        >
          <el-input v-model="activeData['inactive-text']"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮位置"
          v-if="activeData['controls-position'] !== undefined"
        >
          <el-radio-group v-model="activeData['controls-position']">
            <el-radio-button label="right">右边</el-radio-button>
            <el-radio-button label="left">两边</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组件尺寸" v-if="activeData.size !== undefined">
          <el-radio-group v-model="activeData.size">
            <el-radio-button label="medium">大</el-radio-button>
            <el-radio-button label="small">中</el-radio-button>
            <el-radio-button label="mini">小</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组件步长" v-if="activeData.step !== undefined">
          <el-input-number v-model="activeData.step" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="最大值" v-if="activeData.max !== undefined">
          <el-input-number v-model="activeData.max"></el-input-number>
        </el-form-item>
        <el-form-item label="最小值" v-if="activeData.min !== undefined">
          <el-input-number v-model="activeData.min"></el-input-number>
        </el-form-item>
        <el-form-item
          label="数值精度"
          v-if="activeData.precision !== undefined"
        >
          <el-input-number
            v-model="activeData.precision"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="显示输入框"
          v-if="activeData['show-input'] !== undefined && !activeData.range"
        >
          <el-switch v-model="activeData['show-input']"></el-switch>
        </el-form-item>
        <el-form-item label="范围选择" v-if="activeData.range !== undefined">
          <el-switch v-model="activeData.range"></el-switch>
        </el-form-item>
        <el-form-item
          label="显示标签"
          v-if="activeData.__config__.showLabel !== undefined"
        >
          <el-switch v-model="activeData.__config__.showLabel"></el-switch>
        </el-form-item>
        <el-form-item
          label="面板联动"
          v-if="activeData['unlink-panels'] !== undefined"
        >
          <el-switch v-model="activeData['unlink-panels']"></el-switch>
        </el-form-item>
        <el-form-item
          label="显示间断"
          v-if="activeData['show-stops'] !== undefined"
        >
          <el-switch v-model="activeData['show-stops']"></el-switch>
        </el-form-item>
        <el-form-item label="可搜索" v-if="activeData.filterable !== undefined">
          <el-switch v-model="activeData.filterable"></el-switch>
        </el-form-item>
        <el-form-item label="带边框" v-if="activeData.border !== undefined">
          <el-switch v-model="activeData.border"></el-switch>
        </el-form-item>
        <el-form-item
          label="是否半选"
          v-if="activeData['allow-half'] !== undefined"
        >
          <el-switch v-model="activeData['allow-half']"></el-switch>
        </el-form-item>
        <el-form-item
          label="显示分值"
          v-if="activeData['show-score'] !== undefined"
        >
          <el-switch v-model="activeData['allow-half']"></el-switch>
        </el-form-item>
        <el-form-item
          label="开始占位"
          v-if="activeData['start-placeholder'] !== undefined"
        >
          <el-input v-model="activeData['start-placeholder']"></el-input>
        </el-form-item>
        <el-form-item
          label="结束占位"
          v-if="activeData['end-placeholder'] !== undefined"
        >
          <el-input v-model="activeData['end-placeholder']"></el-input>
        </el-form-item>
        <el-form-item
          label="间隔符号"
          v-if="activeData['range-separator'] !== undefined"
        >
          <el-input v-model="activeData['range-separator']"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮文字"
          v-if="activeData.__slot__ && activeData.__slot__.text !== undefined"
        >
          <el-input v-model="activeData.__slot__.text"></el-input>
        </el-form-item>
        <el-form-item
          label="日期类型"
          v-if="
            activeData.type !== undefined &&
              activeData.__config__.tag.includes('date')
          "
        >
          <el-select
            v-model="activeData.type"
            placeholder="请选择"
            @change="handleDateChange"
          >
            <el-option
              v-for="item in dateOptions"
              :key="item.value + item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="按钮类型"
          v-if="
            activeData.type !== undefined &&
              activeData.__config__.tag === 'el-button'
          "
        >
          <el-select v-model="activeData.type" placeholder="请选择">
            <el-option
              v-for="item in btnTypes"
              :key="item.value + item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期格式" v-if="activeData.format !== undefined">
          <el-input v-model="activeData.format"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮样式"
          v-if="activeData.__config__.optionType !== undefined"
        >
          <el-radio-group v-model="activeData.__config__.optionType">
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="button">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <template v-if="activeData.__config__.tag === 'comRadio'">
          <el-divider>选项</el-divider>
          <span class="options-title">标签</span>
          <span class="options-title">值</span>
          <div
            v-for="(item, index) in activeData.props.options"
            :key="item.value + index"
            class="options-item"
          >
            <el-input
              class="options-input"
              v-model="item.label"
              placeholder="标签"
              size="small"
            />
            <el-input
              class="options-input"
              v-model="item.value"
              placeholder="值"
              size="small"
            />
            <template v-if="item.remark !== undefined">
              <br />
              <span class="options-title hot">是否备注</span
              ><el-switch v-model="item.remark"></el-switch>
              <br />
              <template v-if="item.remark">
                <span class="options-title hot">备注内容</span
                ><el-input
                  style="width:60%"
                  size="mini"
                  v-model="item.content"
                ></el-input>
              </template>
              <div style="marginTop:10px" v-if="item.remark">
                <span class="options-title hot">是否必填</span
                ><el-switch v-model="item.required"></el-switch>
              </div>
              <br />
            </template>
            <el-button
              size="mini"
              @click="handleDelOptions(index, 'props')"
              type="primary"
              icon="el-icon-delete"
            ></el-button>
            <el-divider></el-divider>
          </div>
          <el-button type="text" @click="handleAddOptions('props')"
            >添加选项</el-button
          >
        </template>
        <template
          v-if="
            [
              'el-select',
              'el-radio-group',
              'el-checkbox-group',
              'el-cascader'
            ].includes(activeData.__config__.tag)
          "
        >
          <el-divider>选项</el-divider>
          <el-tabs v-model="optionsName">
            <el-tab-pane
              v-if="
                activeData.__config__.tag != 'el-cascader' &&
                  activeData.__slot__.options !== undefined
              "
              label="静态数据"
              name="static"
            >
              <span class="options-title">标签</span>
              <span class="options-title">值</span>
              <div
                v-for="(item, index) in activeData.__slot__.options"
                :key="item.value + index"
                class="options-item hot"
              >
                <el-input
                  class="options-input"
                  v-model="item.label"
                  placeholder="标签"
                  size="small"
                />
                <el-input
                  class="options-input"
                  v-model="item.value"
                  placeholder="值"
                  size="small"
                />
                <el-button
                  size="mini"
                  @click="handleDelOptions(index, '__slot__')"
                  type="primary"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <el-button type="text" @click="handleAddOptions('__slot__')"
                >添加选项</el-button
              >
            </el-tab-pane>
            <el-tab-pane
              v-if="activeData.__config__.tag === 'el-cascader'"
              label="静态数据"
              name="static"
            >
              <el-button
                size="mini"
                type="primary"
                @click="$emit('editor-show', activeData.options)"
                plain
                >设置数据</el-button
              >
            </el-tab-pane>
            <el-tab-pane label="动态数据" name="dynamic">
              <el-form
                size="mini"
                ref="form"
                v-if="activeData.__config__.dataType === 'dynamic'"
                label-width="80px"
              >
                <el-form-item label="接口地址">
                  <el-input
                    v-model="activeData.__config__.url"
                    @blur="$emit('fetch-data', activeData)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="请求方式">
                  <el-select
                    v-model="activeData.__config__.methods"
                    @change="$emit('fetch-data', activeData)"
                  >
                    <el-option label="get" value="get"></el-option>
                    <el-option label="post" value="post"></el-option>
                    <el-option label="put" value="put"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据位置">
                  <el-input v-model="activeData.__config__.dataPath"></el-input>
                </el-form-item>
              </el-form>
              <span v-else>未设置动态数据获取功能</span>
            </el-tab-pane>
          </el-tabs>
        </template>
        <template
          v-if="
            activeData.keyName !== undefined &&
              activeData.__config__.rules !== undefined
          "
        >
          <el-divider>校验规则</el-divider>
          <el-form-item
            label="校验规则"
            v-if="activeData.__config__.rules !== undefined"
          >
            <el-select v-model="activeData.__config__.rules" clearable>
              <el-option
                v-for="item in rulesList"
                :value="item.value"
                :key="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="校验提示"
            v-if="
              activeData.__config__.rules &&
                activeData.__config__.rulesMsg !== undefined
            "
          >
            <el-input v-model="activeData.__config__.rulesMsg"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <el-form
        v-if="activeName === 'second'"
        ref="formSecond"
        size="mini"
        labelPosition="top"
        label-width="80px"
      >
        <el-form-item label="表单数据字段">
          <el-input v-model="formConf.formModel"></el-input>
        </el-form-item>
        <el-form-item label="校验数据字段">
          <el-input v-model="formConf.formRules"></el-input>
        </el-form-item>
        <el-form-item label="标签宽度">
          <el-input v-model="formConf.labelWidth"></el-input>
        </el-form-item>
        <el-form-item label="栅格间距">
          <el-input v-model="formConf.gutter"></el-input>
        </el-form-item>
        <el-form-item label="表单尺寸">
          <el-radio-group v-model="formConf.size">
            <el-radio-button label="medium">大</el-radio-button>
            <el-radio-button label="small">中</el-radio-button>
            <el-radio-button label="mini">小</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签位置">
          <el-radio-group v-model="formConf.labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否禁用"
          v-if="formConf['disabled'] !== undefined"
        >
          <el-switch v-model="formConf['disabled']"></el-switch>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
let id = 1000;
import rulesList from "@/utils/rulesList.js";
export default {
  name: "rightPanel",
  props: ["formConf", "activeData", "showOptions"],
  data() {
    return {
      activeName: "first",
      optionsName: "static",
      dialogTableVisible: false,
      dateTypeOptions: [
        {
          label: "日",
          value: "date"
        },
        {
          label: "周",
          value: "week"
        },
        {
          label: "月",
          value: "month"
        },
        {
          label: "年",
          value: "year"
        },
        {
          label: "日期时间",
          value: "datetime"
        },
        {
          label: "多个日期",
          value: "datetime"
        }
      ],
      dateRangeTypeOptions: [
        {
          label: "月份范围",
          value: "monthrange"
        },
        {
          label: "日期范围",
          value: "daterange"
        },
        {
          label: "时间日期范围",
          value: "datetimerange"
        }
      ],
      btnTypes: [
        {
          label: "默认按钮",
          value: ""
        },
        {
          label: "主要按钮",
          value: "primary"
        },
        {
          label: "成功按钮",
          value: "success"
        },
        {
          label: "信息按钮",
          value: "info"
        },
        {
          label: "警告按钮",
          value: "warning"
        },
        {
          label: "危险按钮",
          value: "danger"
        },
        {
          label: "文字按钮",
          value: "text"
        }
      ],
      rulesList //校验规则集合
    };
  },
  computed: {
    dateOptions() {
      if (
        this.activeData.type !== undefined &&
        this.activeData.__config__.tag === "el-date-picker"
      ) {
        if (this.activeData["start-placeholder"] === undefined) {
          return this.dateTypeOptions;
        }
        return this.dateRangeTypeOptions;
      }
      return [];
    }
  },
  methods: {
    // 处理不同类型得默认值，级联选择器是数组  开关是Boolean  还有是字符串数字等类型
    getDefaultValue(value) {
      if (Array.isArray(value)) {
        return value.join(",");
      } else if (typeof value === "boolean") {
        return `${value}`;
      }
      return value;
    },
    // 处理不同类型得默认值
    setDefaultValue(value) {
      if (Array.isArray(this.activeData.__config__.defaultValue)) {
        this.$set(this.activeData.__config__, "defaultValue", value.split(","));
      } else if (["true", "false"].indexOf(value) > -1) {
        this.$set(
          this.activeData.__config__,
          "defaultValue",
          JSON.parse(value)
        );
      } else {
        let result = Number(value).toString() === "NaN" ? value : Number(value);
        this.$set(this.activeData.__config__, "defaultValue", result);
      }
      //    如果是自定义组件有特殊需求 需要设置值 就在后面添加判断
      //   下面是单选框（特）组件的特殊处理
      if (
        this.activeData.props &&
        this.activeData.props.defaultValue !== undefined
      ) {
        this.$set(this.activeData.props, "defaultValue", value);
      }
    },
    handleTabChange() {},
    // 给静态数据源添加数据
    handleAddOptions(key) {
      if (key === "__slot__") {
        this.activeData[key].options.push({
          value: "",
          label: ""
        });
      } else {
        this.activeData[key].options.push({
          value: "",
          label: "",
          remark: false,
          required: false,
          content: ""
        });
      }
    },
    // 删除选中的静态数据
    handleDelOptions(index, key) {
      if (key === "__slot__") {
        this.activeData.__slot__.options.splice(index, 1);
      } else {
        this.activeData[key].options.splice(index, 1);
      }
    },
    // 树状结构  新增节点数据
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    // 树状结构 删除节点数据
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleNodeChange(val, node, data) {
      console.log(data);
      node.label = val;
    },
    // 日期选择器的type改变事件  日期类型
    handleDateChange(type) {
      let format = "";
      switch (type) {
        case "date":
          format = "yyyy-MM-dd";
          break;
        case "week":
          format = "yyyy 第 WW 周";
          break;
        case "month":
          format = "yyyy-MM";
          break;
        case "year":
          format = "yyyy";
          break;
        case "datetime":
          format = "yyyy-MM-dd HH:mm:ss";
          break;
        case "daterange":
          format = "yyyy-MM-dd";
          break;
        case "monthrange":
          format = "yyyy-MM";
          break;
        case "datetimerange":
          format = "yyyy-MM-dd HH:mm:ss";
          break;
        default:
          format = "yyyy-MM-dd";
          break;
      }
      let valueFormat = type === "week" ? "yyyy-MM-dd" : format;
      this.$set(this.activeData.__config__, "defaultValue", null);
      this.$set(this.activeData, "format", format);
      this.$set(this.activeData, "value-format", valueFormat);
    },
    handleChageDisabled(val) {
      if (this.activeData.__config__.tag === "tinymce") {
        this.activeData.readonly = val;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.rightPanel {
  height: 100%;
  /deep/ .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 50%;
      text-align: center;
    }
  }
  .el-form {
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .options-item {
    margin-bottom: 15px;
    &.hot {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .options-input {
    width: 40%;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .options-title {
    width: 40%;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    &.hot {
      width: fit-content;
      margin-right: 10px;
    }
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .label-input {
    width: 40%;
    /deep/ .el-input--mini .el-input__inner {
      height: 22px;
      line-height: 22px;
    }
  }
}
</style>
