import { deepClone } from "@/utils/index";
/**
 * 将./slots中的文件挂载到对象modudulesObj上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 * require.context 主要用来实现自动化导入模块
 * https://webpack.js.org/guides/dependency-management/#requirecontext
 * modudulesObj:{el-select:{options:(){}}} 结构示意
 * 主要是为了组件内部插槽部分的自定义和添加
 */
const modulesFiles = require.context("./slots", true, /\.js$/);
const modudulesObj = {};
modulesFiles.keys().forEach(el => {
  let key = getModulesName(el);
  let val = modulesFiles(el);
  modudulesObj[key] = val.default;
});
// 获取slots文件夹内的所有文件名称
function getModulesName(str) {
  let name = str.split(".")[1];
  name = name.slice(1);
  return name;
}
function makeDataObject() {
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true
  };
}
function buildChild(h, config, child) {
  let childSlotObj = modudulesObj[config.__config__.tag];
  if (childSlotObj) {
    Object.keys(childSlotObj).forEach(key => {
      let childFun = childSlotObj[key];
      if (config.__slot__ && config.__slot__[key]) {
        child.push(childFun(h, config));
      }
    });
  }
}
/**
 * @param {*} confClone 传递的参数
 * @param {*} dataObject 数据对象
 * 如果自定义的属性的key存在于数据对象上，则进行类型判断赋值
 * 如果不存在，绑定的就是普通的 HTML attribute，则给数据对象的attr赋值
 */
function buildDataObject(confClone, dataObject) {
  Object.keys(confClone).forEach(el => {
    let val = confClone[el];
    if (el === "keyName") {
      dataObject.props.value = confClone.__config__.defaultValue;
      // 监听input事件  完成v-model实现
      dataObject.on.input = val => {
        this.$emit("input", val);
      };
      // 监听自定义组件中的自定义事件
      dataObject.on.customEvent = (event, index, customKey, obj, key) => {
        // console.log('inputs',val, index);
        this.$emit("customEmit", event, index, customKey, obj, key);
      };
    }
    if (dataObject[el] !== undefined) {
      if (
        dataObject[el] !== null ||
        dataObject[el] instanceof RegExp ||
        ["boolean", "string", "number", "function"].includes(
          typeof dataObject[el]
        )
      ) {
        dataObject[el] = val;
      } else if (Array.isArray(dataObject[el])) {
        dataObject[el] = [...dataObject[el], ...val];
      } else {
        dataObject[el] = { ...dataObject[el], ...val };
      }
    } else {
      dataObject.attrs[el] = val;
    }
  });
  clearAttrs(dataObject);
}
// 清理没用的属性
function clearAttrs(dataObject) {
  delete dataObject.attrs.__config__;
  delete dataObject.attrs.__slot__;
  delete dataObject.attrs.__methods__;
}
// 将组件的自定义事件列表挂载到
// eslint-disable-next-line no-unused-vars
function emitEvents(confClone) {
  ["on", "nativeOn"].forEach(el => {
    const eventKeys = Object.keys(confClone[el] || {});
    eventKeys.forEach(key => {
      if (typeof confClone[el][key] === "string") {
        confClone[el][key] = event => {
          this.$emit(confClone[el][key], event);
        };
      }
    });
  });
}
export default {
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  render(h) {
    const dataObject = makeDataObject();
    const cloneData = deepClone(this.conf);
    const child = this.$slots.default || [];
    // 将字符串类型的事件，发送为消息
    // emitEvents.call(this, cloneData);
    // 如果组件内部有插槽或者子组件 ，则将自定义的slot文件内容插入到内容中
    buildChild.call(this, h, cloneData, child);
    // 将自定义的属性配置合并到数据对象中
    buildDataObject.call(this, cloneData, dataObject);
    return h(this.conf.__config__.tag, dataObject, child);
  }
};
