<template>
  <div class="about">
    <el-form
      :label-position="formConf.labelPosition"
      :label-width="formConf.labelWidth + 'px'"
      :size="formConf.size"
      :disabled="formConf.disabled"
    >
      <preview-item
        v-for="item in jsonList"
        :key="item.renderKey"
        :drawing-list="jsonList"
        :current-item="item"
      />
    </el-form>
  </div>
</template>
<script>
import PreviewItem from "./PreviewItem.vue";
import { formConf } from "@/components/generator/config.js";
export default {
  name: "Demo",
  components: { PreviewItem },
  data() {
    return {
      jsonList: [],
      formConf
    };
  },
  methods: {},
  mounted() {
    this.jsonList = JSON.parse(sessionStorage.getItem("templateData"));
  },
  beforeDestroy() {
    sessionStorage.removeItem("templateData");
  }
};
</script>
