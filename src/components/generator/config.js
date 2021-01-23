/* 表单属性配置 【右侧面版】*/
export const formConf = {
  formRef: "elForm", // 表单的ref
  formModel: "formData", // 表单数据对象
  size: "medium", // 表单的尺寸
  labelPosition: "right", // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置label-width
  labelWidth: 100, // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。
  formRules: "rules", // 表单验证规则
  gutter: 15, //栅格化后每列间距值
  disabled: false, // 是否禁用该表单内的所有组件。
  span: 24, // 栅格化
  formBtns: true // 最后预览的时候需不需要一个底部提交按钮
};

// 基础组件 【左面板】
export const baseComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: "单行文本", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题

      tag: "el-input", // 组件name
      tagIcon: "input", // 左边面板的展示icon
      defaultValue: undefined,
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    maxlength: 15,
    "show-word-limit": false,
    readonly: false,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "多行文本", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-input", // 组件name
      tagIcon: "textarea", // 左边面板的展示icon
      defaultValue: undefined,
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    type: "textarea",
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    autosize: { minRows: 2, maxRows: 4 },
    style: { width: "100%" },
    clearable: true,
    maxlength: null,
    "show-word-limit": false,
    readonly: false,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "标题组件", // 标题
      tag: "titleCom", // 组件name
      tagIcon: "title", // 左边面板的展示icon
      defaultValue: "我是标题",
      custom: true, // 是否是自定义组件
      layout: "raw" // 组件的布局容器属性
    },
    // 其余的为可直接写在组件标签上的属性
    style: { width: "100%", "text-align": "center" },
    props: {
      level: 2,
      content: "我是标题"
    }
  },
  {
    __config__: {
      label: "计数器",
      showLabel: true,
      labelWidth: null,
      tag: "el-input-number",
      tagIcon: "number",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    placeholder: "",
    min: 0,
    max: 100,
    step: 1,
    size: "medium",
    "step-strictly": false,
    precision: null,
    "controls-position": "left",
    disabled: false
  },
  {
    __config__: {
      label: "密码",
      showLabel: true,
      labelWidth: null,
      tag: "el-input",
      tagIcon: "password",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    placeholder: "",
    "show-password": true,
    disabled: false,
    clearable: true,
    style: { width: "50%" }
  },
  {
    __config__: {
      label: "开关",
      showLabel: true,
      labelWidth: null,
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    disabled: false,
    "active-text": "", // switch 打开时的文字描述
    "inactive-text": "", // switch 关闭时的文字描述
    "active-color": "#409EFF", // switch 打开时的背景色
    "inactive-color": "#C0CCDA" // switch 关闭时的背景色
  },
  {
    __config__: {
      label: "滑块",
      showLabel: true,
      labelWidth: null,
      tag: "el-slider",
      tagIcon: "slider",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 10,
    "show-input": false, // 是否显示输入框，仅在非范围选择时有效
    "show-stops": false, // 是否显示间断点
    "show-tooltip": true, // 是否显示 tooltip
    range: false // 是否为范围选择
  },
  {
    __config__: {
      label: "评分",
      showLabel: true,
      labelWidth: null,
      tag: "el-rate",
      tagIcon: "rate",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    disabled: false,
    max: 5,
    "allow-half": false, // 是否半选
    "show-score": false // 显示分支
  },
  {
    __config__: {
      label: "富文本",
      showLabel: true,
      labelWidth: null,
      custom: true, // 是否是自定义组件
      tag: "tinymce",
      tagIcon: "tinymce",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    }
  },
  {
    __config__: {
      label: "按钮",
      showLabel: true,
      labelWidth: null,
      tag: "el-button",
      tagIcon: "button",
      defaultValue: undefined,
      span: 24,
      layout: "colFormItem",
      required: true,
      rules: "",
      rulesMsg: ""
    },
    disabled: false,
    __slot__: {
      text: "默认按钮"
    },
    type: "primary"
  }
];

// 选择性组件 【左面板】 需要配置数据源的组件

export const selectComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: "下拉框", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-select", // 组件name
      tagIcon: "select", // 左边面板的展示icon
      defaultValue: undefined,
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: "",
      methods: "get", // 接口请求方式
      url: "https://www.xxx.cn/api", //接口地址
      dataPath: "list", // 接口返回数据所在的自字段
      //   dataConsumer: "options", // 定义数据的存在哪的字段，下拉框，单选组 多选组  存在数据与插槽相关的
      // 所以放在__slot__里面，其他的就放在自定义字段的里面比如级联选择器
      dataType: "dynamic" // 表示数据是异步动态获取，如果没有设置该字段或为其他(static)  则表示是静态数据
    },
    // 组件的插槽属性
    __slot__: {
      options: [
        {
          value: "值1",
          label: "选项1"
        },
        {
          value: "值2",
          label: "选项2"
        }
      ]
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "50%" },
    clearable: true,
    readonly: false,
    disabled: false,
    filterable: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "单选框", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      optionType: "default",
      tag: "el-radio-group", // 组件name
      tagIcon: "radio", // 左边面板的展示icon
      defaultValue: "值1",
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 组件的插槽属性
    __slot__: {
      options: [
        {
          value: "值1",
          label: "备选项1",
          remark: false,
          required: false
        },
        {
          value: "值2",
          label: "备选项2",
          remark: false,
          required: false
        }
      ]
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "50%" },
    disabled: false,
    border: false,
    size: "medium"
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "单选框(特)", // 标题
      labelWidth: null, // 标签宽度
      custom: true, // 是否是自定义组件
      showLabel: true, // 展示标题
      tag: "comRadio", // 组件name
      tagIcon: "radio", // 左边面板的展示icon
      defaultValue: "值1",
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 自定义组件的props
    props: {
      defaultValue: "值1",
      options: [
        {
          value: "值1",
          label: "备选项1",
          remark: true,
          required: false,
          content: ""
        },
        {
          value: "值2",
          label: "备选项2",
          remark: false,
          required: false,
          content: ""
        }
      ]
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "50%" },
    clearable: true,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "多选框", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      optionType: "default",
      tag: "el-checkbox-group", // 组件name
      tagIcon: "checkbox", // 左边面板的展示icon
      defaultValue: [],
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 组件的插槽属性
    __slot__: {
      options: [
        {
          value: "值1",
          label: "备选项1"
        },
        {
          value: "值2",
          label: "备选项2"
        }
      ]
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "50%" },
    readonly: false,
    disabled: false,
    border: false,
    size: "medium"
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "级联选择器", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-cascader", // 组件name
      tagIcon: "cascader", // 左边面板的展示icon
      defaultValue: [],
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      methods: "get", // 接口请求方式
      url: "https://www.xxx.cn/api", //接口地址
      dataPath: "list", // 接口返回数据所在的自字段
      dataConsumer: "options", // 定义数据的存在哪的字段，下拉框，单选组 多选组  存在数据与插槽相关的
      // 所以放在__slot__里面，其他的就放在自定义字段的里面比如级联选择器
      dataType: "dynamic", // 表示数据是异步动态获取，如果没有设置该字段或为其他(static)  则表示是静态数据
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    options: [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      }
    ],
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "50%" },
    readonly: false,
    disabled: false,
    clearable: true
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "日期选择器", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-date-picker", // 组件name
      tagIcon: "datePicker", // 左边面板的展示icon
      defaultValue: "",
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    type: "date",
    format: "yyyy-MM-dd",
    "value-format": "yyyy-MM-dd",
    readonly: false,
    disabled: false,
    clearable: true
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "日期范围", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-date-picker", // 组件name
      tagIcon: "datePicker", // 左边面板的展示icon
      defaultValue: [],
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 其余的为可直接写在组件标签上的属性
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    type: "daterange",
    "range-separator": "至",
    "unlink-panels": false,
    readonly: false,
    disabled: false,
    clearable: true
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "时间选择", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-time-picker", // 组件name
      tagIcon: "timePicker", // 左边面板的展示icon
      defaultValue: "",
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请选择时间",
    "value-format": "HH:mm:ss",
    readonly: false,
    disabled: false,
    clearable: true
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "时间范围", // 标题
      labelWidth: null, // 标签宽度
      showLabel: true, // 展示标题
      tag: "el-time-picker", // 组件name
      tagIcon: "timePicker", // 左边面板的展示icon
      defaultValue: [],
      required: true,
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    },
    // 其余的为可直接写在组件标签上的属性
    "start-placeholder": "开始时间",
    "end-placeholder": "结束时间",
    "range-separator": "至",
    "is-range": true,
    "value-format": "HH:mm:ss",
    "arrow-control": true,
    readonly: false,
    disabled: false,
    clearable: true
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "图片上传", // 标题
      labelWidth: null, // 标签宽度
      custom: true, // 是否是自定义组件
      showLabel: true, // 展示标题
      tag: "uploadImg", // 组件name
      tagIcon: "upload", // 左边面板的展示icon
      defaultValue: [],
      required: true,
      fileSize: 1024, //上传文件限制大小
      layout: "colFormItem", // 组件的布局容器属性
      span: 24, // 表单栅格
      // 正则校验规则
      rules: "",
      rulesMsg: ""
    }
  }
];
