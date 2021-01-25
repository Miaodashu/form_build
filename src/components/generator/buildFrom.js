/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
let globalConfig; // 全局表单配置数据
let someSpanIsNot24; // 是否有节点栅格化不为24

export const vueTemplate = (str) => {
    return `<template>
    <div>
        ${str}
    </div>
</template>\n`
}
export const vueStyle = () => {
    return "<style lang='less' scoped></style>"
}
export const vueScript = (str) => {
    return `<script>
    export default ${str}
</script>\n`
}

// 标签解析器
const nodeTagContorl = {
    "el-input": element => {
        let config = element.__config__;
        let { placeholder, clearable, readonly, disabled, vModel, style } = attrBuilder(element)
        let showWordLimit = element["show-word-limit"] ? `show-word-limit` : '';
        let showPassword = element["show-password"] ? `show-password` : '';
        let maxlength = element.maxlength || element.maxlength == 0 ? `:maxlength='${element.maxlength}'` : '';
        let type = element.type ? `type='${element.type}'` : ''
        let autosize = element.autosize ? `:autosize='${JSON.stringify(element.autosize)}'` : '';
        return `<el-input ${showPassword} ${autosize} ${vModel} ${style} ${type} ${readonly} ${disabled} ${showWordLimit} ${maxlength} ${placeholder} ${clearable}></el-input>`
    },
    "el-input-number": element => {
        let { placeholder, readonly, disabled, vModel } = attrBuilder(element)
        let min = element.min || element.min === 0 ? `:min='${element.min}'` : ""
        let max = element.max || element.max === 0 ? `:max='${element.max}'` : ""
        let step = element.step || element.step === 0 ? `:step='${element.step}'` : ""
        let size = element.size ? `size='${element.size}'` : ""
        let controlsPosition = element["controls-position"] ? `controls-position='${element["controls-position"]}'` : ""
        let stepStrictly = element["step-strictly"] ? `step-strictly` : ""
        let precision = element.precision || element.precision === 0 ? `:precision='${element.precision}'` : ""
        return ` <el-input-number ${vModel} ${placeholder} ${readonly} ${disabled} ${min} ${max} ${step} ${size} ${controlsPosition} ${stepStrictly} ${precision} ></el-input-number>`
    },
    "el-switch": element => {
        let { readonly, disabled, vModel } = attrBuilder(element);
        let activeText = element["active-text"] ? `active-text='${element["active-text"]}'` : ""
        let inactiveText = element["inactive-text"] ? `inactive-text='${element["inactive-text"]}'` : ""
        let activeColor = element["active-color"] ? `active-color='${element["active-color"]}'` : ""
        let inactiveColor = element["inactive-color"] ? `inactive-color='${element["inactive-color"]}'` : ""
        return `<el-switch ${vModel} ${readonly} ${disabled} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor}></el-switch>`
    },
    "el-slider": element => {
        let { readonly, disabled, vModel } = attrBuilder(element);
        let min = element.min || element.min === 0 ? `:min='${element.min}'` : ""
        let max = element.max || element.max === 0 ? `:max='${element.max}'` : ""
        let step = element.step || element.step === 0 ? `:step='${element.step}'` : ""
        let showInput = element["show-input"] ? `show-input` : '';
        let showStops = element["show-stops"] ? `show-stops` : '';
        let showTooltip = element["show-tooltip"] ? `show-tooltip` : '';
        let range = element["range"] ? `range` : '';
        return `<el-slider ${vModel} ${range} ${readonly} ${disabled} ${min} ${max} ${step} ${showInput} ${showStops} ${showTooltip}></el-slider>`
    },
    "el-rate": element => {
        let { readonly, disabled, vModel } = attrBuilder(element);
        let max = element.max || element.max === 0 ? `:max='${element.max}'` : ""
        let allowHalf = element["allow-half"] ? `allow-half` : '';
        let showScore = element["show-score"] ? `show-score` : '';
        return `<el-rate ${readonly} ${disabled} ${vModel} ${max} ${allowHalf} ${showScore}></el-rate>`
    },
    "el-button": element => {
        let { readonly, disabled, vModel } = attrBuilder(element);
        let child = ''
        if (element.__slot__) {
            child = element.__slot__.text
        }
        return `<el-button ${readonly} ${disabled} ${vModel}>${child}</el-button>`
    },
    "el-select": element => {
        let { placeholder, readonly, disabled, vModel, style } = attrBuilder(element);
        let filterable = element["filterable"] ? `filterable` : '';
        let clearable = element["clearable"] ? `clearable` : '';
        let child = [];
        if (element.__slot__ && element.__slot__.options) {
            child.push(`<el-option v-for="node in ${element.keyName}Options" :key="node.value" :label="node.label" :value="node.value"></el-option>`)

        }
        child = child.join('\n')
        return `<el-select ${clearable} ${style} ${placeholder} ${readonly} ${disabled} ${vModel} ${filterable}>${child}</el-select>`
    },
    "el-radio-group": element => {
        let optionType = element.__config__;
        let { placeholder, readonly, disabled, vModel, style } = attrBuilder(element);
        let border = element["border"] ? `border` : '';
        let size = element.size ? `size='${element.size}'` : ""
        let child = [];
        if (element.__slot__ && element.__slot__.options) {
            if (optionType.optionType === "default") {
                child.push(`<el-radio v-for="node in ${element.keyName}Options" ${border} :key="node.value" :label="node.value">node.label}</el-radio>`)
            } else {
                child.push(`<el-radio-button ${border} v-for="node in ${element.keyName}Options" :key="node.value" :label="node.value">node.label</el-radio-button>`)
            }
        }
        child = child.join('\n')
        return `<el-radio-group ${size} ${style} ${placeholder} ${readonly} ${disabled} ${vModel}>${child}</el-radio-group>`
    },
    "el-checkbox-group": element => {
        let { placeholder, readonly, disabled, vModel, style } = attrBuilder(element);
        let border = element["border"] ? `border` : '';
        let size = element.size ? `size='${element.size}'` : ""
        let child = [];
        if (element.__slot__ && element.__slot__.options) {
            child.push(`<el-checkbox v-for="node in ${element.keyName}Options" ${border} :key="node.value" :label="node.value">node.label</el-checkbox>`)

        }
        child = child.join('\n')
        return `<el-checkbox-group ${size} ${style} ${placeholder} ${readonly} ${disabled} ${vModel}>${child}</el-checkbox-group>`
    },
    "el-date-picker": element => {
        let { clearable, placeholder, readonly, disabled, vModel, style } = attrBuilder(element);
        let type = element.type ? `type='${element.type}'` : ''
        let format = element.format ? `format='${element.format}'` : ''
        let valueFormat = element["value-format"] ? `type='${element["value-format"]}'` : ''
        let startPlaceholder = element["start-placeholder"] ? `start-placeholder='${element["start-placeholder"]}'` : ''
        let endPlaceholder = element["end-placeholder"] ? `end-placeholder='${element["end-placeholder"]}'` : ''
        let rangeSeparator = element["range-separator"] ? `range-separator='${element["range-separator"]}'` : ''
        let unlinkPanels = element["unlink-panels"] ? `unlink-panels` : ''
        return `<el-date-picker ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${unlinkPanels} ${clearable} ${type} ${format} ${valueFormat} ${style} ${placeholder} ${readonly} ${disabled} ${vModel}></el-date-picker>`
    },
    "el-time-picker": element => {
        let { clearable, placeholder, readonly, disabled, vModel, style } = attrBuilder(element);
        let format = element.format ? `format='${element.format}'` : ''
        let valueFormat = element["value-format"] ? `type='${element["value-format"]}'` : ''
        let startPlaceholder = element["start-placeholder"] ? `start-placeholder='${element["start-placeholder"]}'` : ''
        let endPlaceholder = element["end-placeholder"] ? `end-placeholder='${element["end-placeholder"]}'` : ''
        let rangeSeparator = element["range-separator"] ? `range-separator='${element["range-separator"]}'` : ''
        let isRange = element["is-range"] ? `is-range` : ''
        let arrowControl = element["arrow-control"] ? `arrow-control` : ''
        return `<el-time-picker ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${isRange} ${clearable} ${arrowControl} ${format} ${valueFormat} ${style} ${placeholder} ${readonly} ${disabled} ${vModel}></el-time-picker>`
    },
    "uploadImg": element => {
        let size = element.size ? `:size='${element.size}'` : '';
        let limit = element.limit ? `:limit='${element.limit}'` : '';
        return `<uploadImg ${size} ${limit} @uploadSuccess="uploadSuccess"></uploadImg>`
    },
    "comRadio": element => {
        let { vModel } = attrBuilder(element);
        return `<comRadio :options="${element.keyName}Options" ${vModel} @customEvent="customEvent"></comRadio>`
    },
    "titleCom": element => {
        return `<titleCom :styleOptions='${JSON.stringify(element.style)}' content="${element.props.content}" :level="${element.props.level}"></titleCom>`
    },
    "tinymce": element => {
        let { vModel } = attrBuilder(element);
        return `<tinymce ${vModel}></tinymce>`
    }

};

// attrBuilder 公共属性解析器  比如只读 禁用 placeholder  v-model等
function attrBuilder(element) {
    return {
        placeholder: element.placeholder ? `placeholder="${element.placeholder}"` : '',
        clearable: element.clearable ? `clearable` : '',
        readonly: element.readonly ? `readonly` : '',
        disabled: element.disabled ? `disabled` : '',
        vModel: `v-model="${globalConfig.formModel}.${element.keyName}"`,
        style: element.style ? `style='${JSON.stringify(element.style)}'` : ''
    }
}
// 布局外城盒子渲染解析器
const layouts = {
    colFormItem(element) {
        let config = element.__config__;
        let labelWidth = "", label = "";
        label = `label='${config.label}'`;
        if (config.labelWidth) {
            labelWidth = `label-width='${config.labelWidth}px'`;
        }
        if (!config.showLabel) {
            labelWidth = "";
            label = "";
        }
        let tag = nodeTagContorl[config.tag](element);
        let required = config.required ? 'required' : ''
        let str = `<el-form-item ${labelWidth} ${label} prop='${element.keyName}' ${required}>
    ${tag}
</el-form-item>`
        str = colWrapper(element, str)
        return str;
    },
    raw(element){
        let config = element.__config__;
        let tag = nodeTagContorl[config.tag](element);
        let str = colWrapper(element, tag)
        return str;
    }

}

// col 栅格化布局包裹，如果是span=24  就不需要包裹了el-col了 简化代码
function colWrapper(element, str) { 
    if (someSpanIsNot24 || (element.__config__.span !== undefined && element.__config__.span === 24)) {
        return str
    } else {
        return `<el-col :span="${element.__config__.span}">
    ${str}
</el-col>`
    }
}
// vue template模板解析器
function buildFormTemplate(globalConfig, str) {
    let labelPosition = globalConfig.labelPosition ? `labelPosition="${globalConfig.labelPosition}"`: '';
    let disabled = globalConfig.disabled ? 'disabled':''
    let formStr = `<el-form 
            ref="${globalConfig.formRef}"
            ${disabled}
            ${labelPosition}
            :rules="${globalConfig.formRules}"
            :model="${globalConfig.formModel}"
            label-width="${globalConfig.labelWidth}px">
                ${str}
                ${buildFromBtns(globalConfig)}
        </el-form>`
    if (someSpanIsNot24) {
        formStr = `<el-row :gutter="${globalConfig.gutter}">
                        ${formStr}
                    </el-row>`
    }
    return  `${formStr}`
}
// 最后的时候添加底部提交按钮
function buildFromBtns(scheme) {
    let str = ''
    if (scheme.formBtns) {
      str = `<el-form-item size="large">
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
</el-form-item>`
      if (someSpanIsNot24) {
        str = `<el-col :span="24">
    ${str}
</el-col>`
      }
    }
    return str
  }

// 暴漏出去的总方法
export function formBuild(formData) {
    const htmlList = []
    // 全局form配置
    globalConfig = formData.formConf
    // JSON数据列表
    let cofigList = formData.comList
    // 判断节点是否存在span不为24得，如果等于24就不包裹el-col了 简化组件
    someSpanIsNot24 = cofigList.some(el => (el.__config__.span !== undefined && el.__config__.span !== 24))
    cofigList.forEach(el => {
        htmlList.push(layouts[el.__config__.layout](el))
    });
    let htmlStr = htmlList.join('\n')
    let templateStr = buildFormTemplate(globalConfig, htmlStr)
    return templateStr
}


