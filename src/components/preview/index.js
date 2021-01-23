/* eslint-disable prettier/prettier */
// import preview from "./preview.vue";
import Vue from "vue";
// let previewCon = Vue.extend(preview);

// function init(options) {
//     options = options || {};
//     if(Object.prototype.toString(options) !== "[object Object]") return;
//     const previewInstence = new previewCon(options);
//     previewInstence.$mount("#preview")
// }
function init(html, js, el) {
    let jsCode = eval(`(${js})`);
    jsCode.template = `<div>${html}</div>`
    console.log('jsCode', jsCode);
    var Profile = Vue.extend({
        template: `<div><child/></div>`,
        components: {
            child: jsCode
        }
      })
    new Profile().$mount(el)
}

export default init;