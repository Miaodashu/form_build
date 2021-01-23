<template>
  <div class="about">
    <div id="preview"></div>
  </div>
</template>
<script>
import { formConf } from "@/components/generator/config.js";
import { formBuild } from "@/components/generator/buildFrom.js";
import { buildJs } from "@/components/generator/js.js";
import init from "@/components/preview/index.js";
export default {
  name: "Demo",
  data() {
    return {
      jsonList: [],
      formConf,
      htmlList: ""
    };
  },
  methods: {},
  mounted() {
    this.jsonList = JSON.parse(sessionStorage.getItem("templateData"));
    let options = {
      comList: this.jsonList,
      formConf: this.formConf
    };
    let htmlCode = formBuild(options);
    let jsCode = buildJs(options);
    // console.log(init);
    init(htmlCode, jsCode, "#preview");
    // console.log(buildJs(options));
    // formBuild(options);
  },
  beforeDestroy() {
    sessionStorage.removeItem("templateData");
  }
};
</script>
<style lang="less" scoped>
.about {
  padding: 20px;
}
/deep/ .el-rate {
  line-height: 47px;
}
</style>
