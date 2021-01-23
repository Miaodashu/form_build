/* eslint-disable no-unused-vars */
import ruleTrigger from "./ruleTrigger";
import { dataCheck } from "@/utils/dataCheck.js";
let globalConfig; // 全局表单配置数据
export function buildJs(formData) {
  // 全局form配置
  globalConfig = formData.formConf;
  // JSON数据列表
  let cofigList = formData.comList;
  const dataList = [];
  const ruleList = [];
  const optionsList = [];
  const methodList = [];
  const created = [];
  const otherData = [];
  const importList = [];
  const componentList = [];
  setMethods(globalConfig, methodList);
  cofigList.forEach(el => {
    buildAttributes(
      el,
      dataList,
      ruleList,
      optionsList,
      methodList,
      created,
      otherData,
      importList,
      componentList
    );
  });
  // z组装js模板
  let script = buildExport(
    globalConfig,
    dataList.join("\n"),
    ruleList.join("\n"),
    optionsList.join(","),
    methodList.join(","),
    created.join("\n"),
    otherData,
    importList.join("\n"),
    componentList.join(",")
  );
  return script;
}
// 构建各个属性
function buildAttributes(
  el,
  dataList,
  ruleList,
  optionsList,
  methodList,
  created,
  importList,
  componentList
) {
  let config = el.__config__;
  buildImport(el, importList, componentList);
  buildData(el, dataList);
  buildRule(el, ruleList);
  buildEmit(el, methodList);
  if (
    el.options ||
    (el.slot && el.slot.options && el.slot.options.length) ||
    (el.props && el.props.options && el.props.options.length)
  ) {
    buildOptions(el, optionsList);
  }
  if (config.dataType === "dynamic") {
    const modelName = `${el.keyName}Options`;
    const methodName = `handleGet${modelName}`;
    buildOptionMethod(methodName, modelName, methodList, el);
    callInCreated(methodName, created);
  }
}
// 构建自定义组件的自定义事件
function buildEmit(el, methodList) {
  let config = el.__config__;
  let strArr = [];
  if (config.tag === "uploadImg") {
    strArr.push(`uploadSuccess(list){
            this.${globalConfig.formModel}.${el.keyName} = list;
        }`);
  }
  //   此处逻辑还需跟后台协商具体字段
  if (config.tag === "comRadio") {
    strArr.push(
      `customEvent(event, index, customKey){ this.${globalConfig.formModel}.${el.keyName} = {id:this.${el.keyName}Options[index].value,remark:event };}`
    );
  }
  methodList.push(...strArr);
}
// 构建引入的组件包
function buildImport(el, importList, componentList) {
  if (el.__config__.custom) {
    componentList.push(`${el.__config__.tag}`);
    importList.push(
      `import ${el.__config__.tag} from "@/components/${el.__config__.tag}/index.vue";`
    );
  }
}

// 构建data
function buildData(el, dataList) {
  if (el.keyName === undefined) return;
  const defaultValue = JSON.stringify(el.__config__.defaultValue);
  dataList.push(`${el.keyName}: ${defaultValue},`);
}

// 构建rule
function buildRule(el, ruleList) {
  const config = el.__config__;
  const rules = [];
  if (el.keyName === undefined) return;
  if (ruleTrigger[config.tag]) {
    let type = Array.isArray(config.defaultValue) ? "array" : "string";
    let trigger = ruleTrigger[config.tag];
    let message = `${config.label}不能为空`;
    if (config.required) {
      // if (["",""].includes(config.tag)) {
      //     type = "date"
      // }
      rules.push(JSON.stringify(dataCheck["required"](type, message, trigger)));
    }
    if (config.rules) {
      rules.push(
        JSON.stringify(dataCheck[`${config.rules}`](type, message, trigger))
      );
    }
  }
  let str = rules.join(",");
  return ruleList.push(`${el.keyName}: [${str}],`);
}

// 构建options  比如下拉框  单选复选的数据源
function buildOptions(el, optionsList) {
  if (el.keyName === undefined) return;
  let { options } = el;
  if (!options) {
    //   兼容自定义组件的options
    if (el.__slot__ && el.__slot__.options) {
      options = el.__slot__.options;
    }
    if (el.props && el.props.options) {
      options = el.props.options;
    }
  }
  // 如果是异步获取动态数据  则以接口返回的为准
  if (el.__config__.dataType === "dynamic") {
    options = [];
  }
  optionsList.push(`${el.keyName}Options: ${JSON.stringify(options)}`);
}

// 构建基础提交重置方法
function setMethods(globalConfig, methodList) {
  let methods = null;
  if (globalConfig.formBtns) {
    methods = {
      submitForm: `submitForm() {
                this.$refs['${globalConfig.formRef}'].validate((valid) => {
                  if (valid) {
                    console.log('submit!');
                  }
                });
              }`,
      resetForm: `resetForm() {
                this.$refs['${globalConfig.formRef}'].resetFields();
              }`
    };
  }
  if (methods) {
    Object.keys(methods).forEach(key => {
      methodList.push(methods[key]);
    });
  }
  return methodList;
}

// 构建获取options的方法
function buildOptionMethod(methodName, modelName, methodList, el) {
  let config = el.__config__;
  let str = `${methodName}(){
        this.$http(methods:"${config.methods}", url: "${config.url}").then(res=>{
            this.${modelName} = res.data["${config.dataPath}"]
        })
    }`;
  methodList.push(str);
}

// 添加方法到created钩子函数中
function callInCreated(methodName, created) {
  created.push(`this.${methodName}();`);
}
// 拼接完整数据结构 js整体拼接
function buildExport(
  globalConfig,
  dataList,
  ruleList,
  optionsList,
  methodList,
  created,
  importList,
  componentList
) {
  //   let str = `<script>
  //     ${importList}
  //     export default {
  //         components: {${componentList}},
  //         data(){
  //             return {
  //                 ${globalConfig.formModel}: {
  //                     ${dataList}
  //                 },
  //                 ${globalConfig.formRules}: {
  //                     ${ruleList}
  //                 },
  //                 ${optionsList}
  //             }
  //         },
  //         created(){
  //             ${created}
  //         },
  //         methods:{
  //             ${methodList}
  //         }
  //     }
  // </script>`;
  let str = `{
    data(){
        return {
            ${globalConfig.formModel}: {
                ${dataList}
            },
            ${globalConfig.formRules}: {
                ${ruleList}
            },
            ${optionsList}
        }
    },
    created(){
        ${created}
    },
    methods:{
        ${methodList}
    }
}`;
  return str;
}
